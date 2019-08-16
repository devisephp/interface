<template>
  <div>
    <div class="dvs-flex dvs-justify-center dvs-py-8 dvs-relative">
      <input
        type="text"
        v-model="searchTerm"
        class="dvs-bg-transparent dvs-border-b-2 dvs-px-12 dvs-py-2 dvs-text-admin-fg dvs-outline-none dvs-placeholder-admin-fg dvs-text-center"
        placeholder="Type to begin searching"
      >
      <div
        class="dvs-cursor-pointer"
        :class="{'dvs-opacity-50': searchTerm === ''}"
        @click="searchTerm = ''"
      >
        <x-icon></x-icon>
      </div>
    </div>
    <ul class="dvs-list-reset">
      <li
        v-for="(suggestion, key) in autosuggest.data"
        :key="key"
        class="dvs-bg-admin-bg dvs-shadow hover:dvs-shadow-lg dvs-rounded dvs-my-4 dvs-p-2 dvs-cursor-pointer"
        @click="selectSuggestion(suggestion)"
      >
        <div class="dvs-text-lg dvs-mb-2">{{ suggestion[mainLabelField] }}</div>
        <ul class="dvs-list-reset dvs-flex">
          <li
            v-for="(subField, subkey) in subLabelFields"
            :key="subkey"
            class="dvs-mr-4 dvs-text-xs dvs-leading-tight"
          >
            <div class="dvs-uppercase dvs-text-xs dvs-text-admin-secondary-fg">{{ subField.label }}</div>
            <div>{{ format(subField, suggestion[subField.field]) }}</div>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="dvs-text-center"
      v-if="searchTerm !== '' && autosuggest.data.length < 1"
    >
      No search results found
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import dayjs from 'dayjs'

export default {
  name: 'DeviseWorkflowSearch',
  components: {
    XIcon: () => import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/XIcon'),
  },
  props: {
    step: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      searchDelay: 1000,
      searchTerm: '',
      autosuggest: {
        data: [],
      },
    }
  },
  computed: {
    options () {
      return this.step.options
    },
    mainLabelField () {
      return this.step.resultsDisplayFields[0].field
    },
    subLabelFields () {
      const secondaryFields = JSON.parse(JSON.stringify(this.step.resultsDisplayFields));
      secondaryFields.shift()
      return secondaryFields;
    }
  },
  methods: {
    ...mapActions('devise', ['searchGeneric']),
    requestSearch (term) {
      if (term !== '') {
        const searchData = {};
        searchData[this.step.searchPropertyName] = term;

        this.searchGeneric({
          config: { apiendpoint: this.step.apiendpoint },
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
    selectSuggestion (suggestion) {
      this.$emit('done', suggestion)
    },
    format (field, data) {
      if (field.dateFormat) {
        return dayjs(data).format(field.dateFormat)
      }
      return data
    }
  },
  watch: {
    searchTerm (newValue) {
      this.requestSearch(newValue);
    },
  },
}
</script>