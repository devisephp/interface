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
            <div>{{ subField.value }}</div>
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
        class="dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-rounded dvs-my-4 dvs-p-2 dvs-flex"
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
              class="dvs-mr-4 dvs-text-xs dvs-leading-tight"
            >
              <div class="dvs-uppercase dvs-text-xs dvs-text-admin-secondary-fg">{{ subField.label }}</div>
              <div>{{ subField.value }}</div>
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
import { mapActions } from 'vuex'

export default {
  name: 'DeviseQuerySelectorSearch',
  components: {
    draggable: () => import(/* webpackChunkName: "devise-editors" */ 'vuedraggable'),
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
            return suggestion.value === select.value
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
  methods: {
    ...mapActions('devise', ['appGenericSearch']),
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
        const searchData = {
          searchterm: term
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
  }
}
</script>