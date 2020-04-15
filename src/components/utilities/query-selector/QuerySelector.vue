<template>
  <div class="dvs-text-admin-fg">
    <fieldset class="dvs-fieldset">
      <label for="querykey">Data Set Query</label>
      <select id="querykey" v-model="query" name="querykey" class="w-full">
        <option :value="null" disabled>
          Please Select a Data Set Query
        </option>
        <option v-for="mq in modelQueries" :key="mq.key" :value="mq.key">{{
          mq.description
        }}</option>
      </select>
    </fieldset>

    <div v-if="selectedModelQuery && selectedModelQuery.params.length > 0" class="dvs-mt-6">
      <div v-for="(param, key) in selectedModelQuery.params" :key="key">
        <param-search
          v-if="param.type === 'search'"
          v-model="finalModelQuery.params[key]"
          :model-query="selectedModelQuery"
          :model-query-settings="param"
        ></param-search>

        <param-text
          v-if="param.type === 'text'"
          v-model="finalModelQuery.params[key]"
          class="dvs-mb-4"
          :model-query="selectedModelQuery"
          :model-query-settings="param"
        ></param-text>

        <param-select
          v-if="param.type === 'select'"
          v-model="finalModelQuery.params[key]"
          class="dvs-mb-4"
          :model-query="selectedModelQuery"
          :model-query-settings="param"
        ></param-select>

        <param-datetime
          v-if="param.type === 'datetime'"
          v-model="finalModelQuery.params[key]"
          class="dvs-mb-4"
          :model-query="selectedModelQuery"
          :model-query-settings="param"
        ></param-datetime>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'QuerySelector',
  components: {
    ParamDatetime: () => import(/* webpackChunkName: "devise-query-selector" */ './Datetime.vue'),
    ParamSearch: () => import(/* webpackChunkName: "devise-query-selector" */ './Search.vue'),
    ParamSelect: () => import(/* webpackChunkName: "devise-query-selector" */ './Select.vue'),
    ParamText: () => import(/* webpackChunkName: "devise-query-selector" */ './Text.vue'),
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      query: '',
      params: [],
    };
  },

  computed: {
    ...mapState('devise', ['modelQueries']),
    finalModelQuery: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
      deep: true,
    },
    selectedModelQuery() {
      return this.modelQueries.find(mq => mq.key === this.query);
    },
  },

  watch: {
    selectedModelQuery: {
      handler(newValue) {
        newValue.params.forEach(() => {
          // may have to change the push data type based on param.type
          this.finalModelQuery.params.push('');
        });
        this.finalModelQuery.key = newValue.key;
      },
      deep: true,
    },
  },

  mounted() {
    if (this.value && this.value.key) {
      this.loadPreviousState();
      this.loadPreviousParams();
    }
  },
  methods: {
    loadPreviousState() {
      this.$set(this, 'query', this.value.key);
      this.params = Object.assign({}, this.value.params);
    },
    loadPreviousParams() {
      const params = [];
      this.selectedModelQuery.params.forEach((p, key) => {
        const param = Object.assign({}, p);
        this.$set(param, 'value', this.params[key]);
        this.selectedModelQuery.params[key] = Object.assign({}, param);
      });
      return params;
    },
  },
};
</script>
