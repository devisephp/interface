<template>
  <div>
    <div>
      <ul>
        <li
          v-for="(suggestion, key) in results.data"
          :key="key"
          class="dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-shadow hover:dvs-shadow-lg dvs-rounded dvs-my-4 dvs-p-4 dvs-cursor-pointer"
          @click="selectSuggestion(suggestion)"
        >
          <div class="dvs-text-lg dvs-mb-2 dvs-font-light">{{ suggestion[mainLabelField] }}</div>
          <ul class="dvs-flex">
            <li
              v-for="(subField, subkey) in subLabelFields"
              :key="subkey"
              class="dvs-mr-4 dvs-text-xs dvs-leading-tight dvs-w-1/4 dvs-bg-admin-bg dvs-text-admin-fg dvs-rounded dvs-p-3 opacity-75"
            >
              <div class="dvs-uppercase dvs-text-xs">{{ subField.label }}</div>
              <div>{{ format(subField, suggestion[subField.field]) }}</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div
      v-if="searchTerm !== '' && results.data && results.data.length < 1"
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
  name: 'DeviseWorkflowIndex',
  props: {
    step: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      results: {
        data: [],
      },
    };
  },
  computed: {
    mainLabelField() {
      return this.step.resultsDisplayFields[0].field;
    },
    subLabelFields() {
      const secondaryFields = JSON.parse(JSON.stringify(this.step.resultsDisplayFields));
      secondaryFields.shift();
      return secondaryFields;
    },
  },
  mounted() {
    this.requestData();
  },
  methods: {
    ...mapActions('devise', ['getGeneric']),
    requestData() {
      const isApp =
        this.step.app === true || typeof this.step.app === 'undefined' ? true : this.step.app;
      this.getGeneric({
        config: { apiendpoint: this.step.apiendpoint, app: isApp },
      }).then(results => {
        this.results = results.data;
      });
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
