<template>
  <div>
    <div class="dvs-my-8 dvs-flex dvs-justify-between">
      <div class="dvs-mr-8">
        <pagination v-if="meta" :meta="meta" @changePage="changePage"></pagination>
      </div>
      <div v-if="step.links && step.links.length" class="dvs-flex justify-end dvs-space-x-2">
        <button
          v-for="link in step.links"
          :key="link.nextStep"
          class="dvs-btn dvs-btn-sm dvs-btn-primary dvs-ml-2"
          @click="$emit('done', link)"
        >
          {{ link.label }}
        </button>
      </div>
    </div>

    <table class="dvs-mt-8 dvs-w-full dvs-text-sm">
      <tr>
        <th
          v-for="column in step.columns"
          :key="column.key"
          class="dvs-px-2 dvs-pb-2 dvs-border-b-2 dvs-border-gray-700 dvs-text-left"
        >
          {{ column.label }}
        </th>
        <th
          v-if="step.actions && step.actions.length"
          class="dvs-px-2  dvs-pb-2 dvs-border-b-2 dvs-border-gray-700 dvs-text-right"
        >
          Actions
        </th>
      </tr>
      <tr v-for="(record, key) in records" :key="key" class="dvs-font-thin text-xs">
        <td
          v-for="column in step.columns"
          :key="`${key}-${column.key}`"
          class="dvs-px-2 dvs-py-2 dvs-border-b dvs-border-gray-800"
        >
          {{ getField(record, column) }}
        </td>
        <th
          v-if="step.actions && step.actions.length"
          class="dvs-px-2 dvs-border-b dvs-border-gray-800 text-right"
        >
          <a
            v-for="action in step.actions"
            :key="action.key"
            href="#"
            class="dvs-text-admin-highlight-bg pl-4 dvs-font-normal"
            @click.prevent="executeAction(action, record)"
          >
            {{ action.label }}
          </a>
        </th>
      </tr>
    </table>

    <pagination v-if="meta" :meta="meta" class="mt-4" @changePage="changePage"></pagination>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'WorkflowRealIndex',

  components: {
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
      records: [],
      meta: {},
    };
  },

  mounted() {
    this.requestData();
  },

  methods: {
    ...mapActions('devise', ['searchGeneric']),
    requestData(filters) {
      const isApp =
        this.step.app === true || typeof this.step.app === 'undefined' ? true : this.step.app;

      this.searchGeneric({
        config: { apiendpoint: this.step.apiendpoint, app: isApp },
        filters,
      }).then(results => {
        this.records = results.data.data;
        this.meta = results.data.meta;
      });
    },

    changePage(page) {
      this.requestData({ page });
    },

    executeAction(action, record) {
      this.$emit('done', Object.assign({}, action, record));
    },

    getField(record, column) {
      if (column.format) {
        return column.format(record);
      }
      return record[column.key];
    },
  },
};
</script>
