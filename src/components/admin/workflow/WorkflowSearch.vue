<template>
  <div>
    <div class="dvs-flex dvs-justify-center">
      <div class="dvs-relative dvs-flex dvs-justify-center dvs-items-center dvs-mt-8 dvs-relative">
        <input
          v-model="searchTerm"
          type="text"
          class="dvs-bg-transparent dvs-bg-admin-secondary-bg dvs-px-12 dvs-py-4 dvs-text-admin-fg dvs-outline-none dvs-placeholder-admin-fg dvs-text-center"
          placeholder="Type to begin searching"
        />
        <div
          class="dvs-cursor-pointer dvs-absolute dvs-right-0 dvs-top-0 dvs-mt-3 dvs-mr-2"
          :class="{ 'dvs-opacity-50': searchTerm === '' }"
          @click="searchTerm = ''"
        >
          <x-icon></x-icon>
        </div>
      </div>
    </div>
    <div class="dvs-mb-8 dvs-flex dvs-justify-center dvs-mt-2">
      <button
        v-if="step.allRecordsApiendpoint"
        class="dvs-btn dvs-btn-secondary dvs-btn-sm dvs-m4-6"
        @click="requestAll"
      >
        Load All Records
      </button>
    </div>

    <pagination
      v-if="autosuggest.meta"
      :meta="autosuggest.meta"
      @changePage="changePage"
    ></pagination>

    <ul>
      <li
        v-for="(suggestion, key) in autosuggest.data"
        :key="key"
        class="dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-shadow hover:dvs-shadow-lg dvs-rounded dvs-my-4 dvs-p-4 dvs-cursor-pointer"
        @click="selectSuggestion(suggestion)"
      >
        <div class="dvs-text-lg dvs-mb-2 dvs-font-light">{{ suggestion[mainLabelField] }}</div>
        <ul class="dvs-flex">
          <li
            v-for="(subField, subkey) in subLabelFields"
            :key="subkey"
            class="dvs-mr-4 dvs-text-xs dvs-leading-tight dvs-w-1/4 dvs-bg-admin-bg dvs-text-admin-fg dvs-rounded dvs-p-3 dvs-opacity-75 dvs-break-words"
          >
            <div class="dvs-uppercase dvs-text-xs">{{ subField.label }}</div>
            <div>{{ format(subField, suggestion[subField.field]) }}</div>
          </li>
        </ul>
      </li>
    </ul>
    <div
      v-if="searchTerm !== '' && autosuggest.data && autosuggest.data.length < 1"
      class="dvs-text-center"
    >
      No search results found
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import dayjs from 'dayjs';

export default {
  name: 'DeviseWorkflowSearch',
  components: {
    XIcon: () => import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/XIcon'),
    Pagination: () =>
      import(/* webpackChunkName: "devise-utilities" */ '../../utilities/Pagination.vue'),
  },
  props: {
    step: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      searchDelay: 1000,
      searchTerm: '',
      autosuggest: {
        data: [],
      },
    };
  },
  computed: {
    options() {
      return this.step.options;
    },
    mainLabelField() {
      return this.step.resultsDisplayFields[0].field;
    },
    subLabelFields() {
      const secondaryFields = JSON.parse(JSON.stringify(this.step.resultsDisplayFields));
      secondaryFields.shift();
      return secondaryFields;
    },
  },
  watch: {
    searchTerm(newValue) {
      this.requestSearch(newValue);
    },
  },
  methods: {
    ...mapActions('devise', ['searchGeneric']),
    requestSearch(term) {
      if (term !== '') {
        const isApp =
          this.step.app === true || typeof this.step.app === 'undefined' ? true : this.step.app;
        const searchData = {};
        searchData[this.step.searchPropertyName] = term;

        this.searchGeneric({
          config: { apiendpoint: this.step.apiendpoint, app: isApp },
          filters: searchData,
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
    requestAll(filters) {
      const isApp =
        this.step.app === true || typeof this.step.app === 'undefined' ? true : this.step.app;

      this.searchGeneric({
        config: { apiendpoint: this.step.allRecordsApiendpoint, app: isApp },
        filters,
      }).then(results => {
        this.autosuggest = results.data;
      });
    },
    changePage(page) {
      this.requestAll({ page });
    },
    selectSuggestion(suggestion) {
      this.$emit('done', suggestion);
    },
    format(field, data) {
      if (field.dateFormat) {
        return dayjs(data).format(field.dateFormat);
      }
      return data;
    },
  },
};
</script>
