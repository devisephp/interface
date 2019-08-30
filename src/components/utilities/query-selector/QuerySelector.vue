<template>
  <div class="dvs-text-admin-fg">
    <fieldset class="dvs-fieldset">
      <label for="querykey">Data Set Query</label>
      <select
        name="querykey"
        id="querykey"
        v-model="query"
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
      handler (newValue, oldValue) {
        const finalParams = []
        newValue.params.forEach(param => {
          finalParams.push(param.value)
        })
        const finalModelQuery = {
          key: newValue.key,
          params: finalParams
        }

        // If it's the first time 
        if (!oldValue) {
          finalModelQuery.params = this.loadPreviousParams()
        }

        this.$emit('input', finalModelQuery)
      },
      deep: true
    }
  },
  computed: {
    ...mapState('devise', ['modelQueries']),
    selectedModelQuery () {
      return this.modelQueries.find(mq => mq.key === this.query)
    },
  },
  data () {
    return {
      query: '',
      initialParams: []
    }
  },
  mounted () {
    if (this.value && this.value.key) {
      this.loadPreviousState()
    }
  },
  methods: {
    loadPreviousState () {
      this.query = this.value.key
      this.initialParams = this.value.params
    },
    loadPreviousParams () {
      const params = []
      this.selectedModelQuery.params.forEach((p, key) => {
        const param = Object.assign({}, p);
        this.$set(param, 'value', this.initialParams[key])
        this.selectedModelQuery.params[key] = Object.assign({}, param)
      })
      return params
    }
  }
}
</script>