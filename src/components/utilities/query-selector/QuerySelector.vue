<template>
  <div class="dvs-text-admin-fg">
    <fieldset class="dvs-fieldset">
      <label for="querykey">Data Set Query</label>
      <select
        name="querykey"
        id="querykey"
        v-model="query.key"
        class="w-full"
      >
        <option
          :value="null"
          disabled
        >
          Please Select a Data Set Query
        </option>
        <option
          :value="mq.key"
          v-for="mq in modelQueries"
          :key="mq.key"
        >{{ mq.description }}</option>
      </select>
    </fieldset>

    <div
      class="dvs-mt-6"
      v-if="selectedModelQuery && selectedModelQuery.params.length > 0"
    >
      <div
        v-for="(param, key) in selectedModelQuery.params"
        :key="key"
      >
        <param-search
          v-if="param.type === 'search'"
          v-model="selectedModelQuery.params[key]"
        ></param-search>
        <param-text
          class="dvs-mb-4"
          v-if="param.type === 'text'"
          v-model="selectedModelQuery.params[key]"
        ></param-text>
        <param-select
          class="dvs-mb-4"
          v-if="param.type === 'select'"
          v-model="selectedModelQuery.params[key]"
        ></param-select>

        <param-datetime
          class="dvs-mb-4"
          v-if="param.type === 'datetime'"
          v-model="selectedModelQuery.params[key]"
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
    ParamDatetime: () =>
      import(/* webpackChunkName: "devise-query-selector" */ './Datetime.vue'),
    ParamSearch: () =>
      import(/* webpackChunkName: "devise-query-selector" */ './Search.vue'),
    ParamSelect: () =>
      import(/* webpackChunkName: "devise-query-selector" */ './Select.vue'),
    ParamText: () =>
      import(/* webpackChunkName: "devise-query-selector" */ './Text.vue'),
  },
  props: {
    value: {}
  },
  watch: {
    selectedModelQuery: {
      handler (newValue) {
        const finalParams = []
        newValue.params.forEach(param => {
          finalParams.push(param.value)
        })
        const finalModelQuery = {
          key: newValue.key,
          params: finalParams
        }
        this.$emit('input', finalModelQuery)
      },
      deep: true
    }
  },
  computed: {
    ...mapState('devise', ['modelQueries']),
    selectedModelQuery () {
      return this.modelQueries.find(mq => mq.key === this.query.key)
    },
  },
  data () {
    return {
      query: {
        key: null,
        params: []
      },
      modelQuery: {}
    }
  },
}
</script>