<template>
  <div>
    <div class="dvs-flex dvs-justify-center dvs-p-4 dvs-pb-8  dvs-text-admin-fg  dvs-w-full">
      <input
        type="text"
        v-model="filter"
        ref="filter"
        class="dvs-bg-transparent dvs-border-b-2 dvs-px-12 dvs-py-2 dvs-text-admin-fg dvs-outline-none dvs-placeholder-admin-fg dvs-text-center"
        :placeholder="value.label"
        @keyup="requestSearch"
      >
      <div
        class="dvs-cursor-pointer"
        :class="{'dvs-opacity-50': filter === ''}"
        @click="filter = ''"
      >
        <x-icon></x-icon>
      </div>
    </div>
    <ul class="dvs-list-reset">
      <li
        v-for="(suggestion, key) in filteredSuggestions"
        :key="key"
        class="dvs-bg-admin-bg dvs-shadow hover:dvs-shadow-lg dvs-rounded dvs-my-4 dvs-p-2 dvs-cursor-pointer"
        @click="selectSuggestion(suggestion)"
      >
        <div class="dvs-text-lg dvs-mb-2">{{ suggestion.displayFields[0].value }}</div>
        <ul class="dvs-list-reset dvs-flex">
          <li
            v-for="(subField, subkey) in subLabelFields(suggestion.displayFields)"
            :key="subkey"
            class="dvs-mr-4 dvs-text-xs dvs-leading-tight"
          >
            <div class="dvs-uppercase dvs-text-xs dvs-text-admin-secondary-fg">{{ subField.label }}</div>
            <div>{{ format(subField) }}</div>
          </li>
        </ul>
      </li>
    </ul>
    <draggable
      v-bind="{
          group: {name: 'g1'},
          animation:200,
          ghostClass: 'dvs-ghost',
          handle: '.handle',
          dragClass: 'dvs-chosen-drag-slice',
          emptyInsertThreshold: 10,
          removeCloneOnHide: false
        }"
      @change="update"
      :list="selected"
      tag="ul"
      class="dvs-list-reset"
    >
      <li
        v-for="(suggestion, key) in selected"
        :key="key"
        class="dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-shadow hover:dvs-shadow-lg dvs-rounded dvs-my-4 dvs-p-4 dvs-cursor-pointer"
      >
        <div
          class="dvs-mr-4 handle"
          v-if="value.allowSort"
        >
          <menu-icon></menu-icon>
        </div>
        <div class="dvs-w-full">
          <div class="dvs-text-lg dvs-mb-2">{{ suggestion.displayFields[0].value }}</div>

          <ul class="dvs-list-reset dvs-flex">
            <li
              v-for="(subField, subkey) in subLabelFields(suggestion.displayFields)"
              :key="subkey"
              class="dvs-mr-4 dvs-text-xs dvs-leading-tight dvs-w-1/4 dvs-bg-admin-bg dvs-text-admin-fg dvs-rounded dvs-p-3 opacity-75"
            >
              <div class="dvs-uppercase dvs-text-xs">{{ subField.label }}</div>
              <div>{{ format(subField) }}</div>
            </li>
          </ul>
        </div>
        <div
          class="dvs-cursor-pointer"
          @click="removeSuggestion(suggestion)"
        >
          <x-icon></x-icon>
        </div>
      </li>
    </draggable>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapActions } from 'vuex'

export default {
  name: 'DeviseQuerySelectorSearch',
  components: {
    draggable: () => import(/* webpackChunkName: "devise-editors" */ 'vuedraggable'),
    XIcon: () => import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/XIcon'),
    MenuIcon: () => import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/MenuIcon'),
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  computed: {
    filteredSuggestions () {
      if (this.autosuggest.data) {
        return this.autosuggest.data.filter(suggestion => {
          return !this.selected.find(select => {
            return suggestion === select
          })
        })
      }
      return [];
    }
  },
  data () {
    return {
      filter: null,
      autosuggest: {
        data: [],
      },
      selected: []
    }
  },
  mounted () {
    if (this.value.value && Object.keys(this.value.value).length > this.selected.length) {
      this.requestLegacySelected()
    }
  },
  methods: {
    ...mapActions('devise', ['appGenericSearch', 'getGeneric']),
    update () {
      const newValue = this.value
      newValue.value = []

      this.selected.forEach(selection => {
        newValue.value.push(selection.value)
      })
      this.$emit('input', newValue)
    },
    selectSuggestion (suggestion) {
      this.selected.push(suggestion)
      this.update()
    },
    removeSuggestion (suggestion) {
      this.resetSearch()
      this.selected.splice(this.selected.indexOf(suggestion), 1)
    },
    resetSearch () {
      this.filter = null
      this.autosuggest.data = []
    },
    requestSearch (e) {
      const term = e.target.value;

      if (term !== '') {
        const selectedIds = []

        this.selected.forEach(s => {
          selectedIds.push(s.id)
        })

        const searchData = {
          searchterm: term,
          selected: selectedIds
        };

        this.appGenericSearch({
          config: { apiendpoint: this.value.api },
          filters: searchData
        }).then(results => {
          this.autosuggest = results.data;
          if (results.data.length < 1) {
            window.deviseSettings.$bus.$emit('showMessage', {
              title: 'No Suggestions Found',
              message: `We couldn't find any data with the term: "${term}".`,
            });
          }
        });
      } else {
        this.autosuggest = Object.assign({}, {});
      }
    },
    subLabelFields (displayFields) {
      const secondaryFields = JSON.parse(JSON.stringify(displayFields));
      secondaryFields.shift()
      return secondaryFields;
    },
    format (field) {
      if (field.dateFormat) {
        return dayjs(field.value).format(field.dateFormat)
      }
      return field.value
    },
    requestLegacySelected () {
      if (this.value.editApi) {
        this.getGeneric({
          config: {
            apiendpoint: this.value.editApi,
            app: true
          },
          filters: {
            ids: this.value.value.join(',')
          }
        }).then(response => {
          this.selected = [...response.data.data]
        })
      } else {
        console.warn('Devise: You must have an editApi endpoint configured AppServiceProvider ModelQuery::set to edit model slices')
      }
    }
  }
}
</script>