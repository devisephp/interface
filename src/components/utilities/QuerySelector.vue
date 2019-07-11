<template>
  <div>
    <h3 class="dvs-uppercase dvs-mb-4">Select A Data Set</h3>
    <div>
      <div
        v-for="mq in modelQueries"
        :key="mq.key"
        class="dvs-p-4 dvs-rounded dvs-mb-2 dvs-flex dvs-justify-between"
        :style="theme.panelCard"
        @click="selectModelQuery(mq)"
      >
        <div>
          {{ mq.description }}
        </div>

        <div
          class="dvs-text-xs dvs-uppercase dvs-text-right"
          v-if="mq.params.length > 0"
        >
          Parameters
          <fieldset
            v-for="(param, key) in mq.params"
            :key="key"
            class="dvs-fieldset dvs-mt-2"
          >
            <label>{{ param }}</label>
            <input type="text">
          </fieldset>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'QuerySelector',
  props: {

  },
  computed: {
    ...mapState('devise', ['modelQueries'])
  },
  methods: {
    selectModelQuery (query) {

    }
  }
}
</script>