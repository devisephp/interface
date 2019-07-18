<template>
  <div>
    <h3 class="dvs-uppercase dvs-mb-4">Select A Data Set</h3>
    <div>
      <fieldset>
        <label for="querykey">Data Set Query</label>
        <select
          name="querykey"
          id="querykey"
          v-model="query.key"
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
        <fieldset
          v-for="(param, key) in selectedModelQuery.params"
          :key="key"
          class="dvs-fieldset"
        >
          <label>{{ param }}</label>
          <input
            type="text"
            v-model="query.params[key]"
          >
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'QuerySelector',
  props: {
    value: {}
  },
  watch: {
    query: {
      handler (value) {
        this.$emit('input', value)
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
      }
    }
  },
}
</script>