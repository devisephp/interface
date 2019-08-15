
<template>
  <div
    id="dvs-admin-main"
    style="padding-left:250px;"
  >
    <h3
      class="dvs-mb-10 dvs-uppercase"
      :style="{color: theme.panel.color}"
    >{{ config.name }}</h3>

    <!-- <super-table
      v-model="modelQuery"
      :model="config.model"
      :columns="config.columns"
      :showLinks="true"
    ></super-table>-->
    <div v-if="genericData.data.length < 1">
      <h6>No records found found</h6>
    </div>

    <div
      class="mb-4"
      v-for="record in genericData.data"
      :key="record.id"
    >
      <div class="dvs-flex dvs-items-center">
        <div
          class="w-2/3"
          v-for="column in config.columns"
          :key="column.name"
        >{{ record[column.property] }}</div>
        <div class="w-1/3 flex">
          <button
            class="dvs-btn dvs-btn-xs dvs-mr-2"
            @click="showEdit(record)"
            :style="theme.actionButtonGhost"
          >Edit</button>
          <button
            class="dvs-btn dvs-btn-xs"
            v-devise-alert-confirm="{
              callback: requestDeleteGeneric,
              arguments: record,
              message: `Are you sure you want to delete this ${config.name}?`
            }"
            :style="theme.actionButtonGhost"
          >Delete</button>
        </div>
      </div>
      <div>
        <slot
          name="indexextras"
          :record="record"
        ></slot>
      </div>
    </div>
    <pagination
      class="mb-8"
      v-if="genericData.data && genericData.data.length"
      :meta="genericData"
      @changePage="changePage"
    >
    </pagination>
  </div>
</template>

<script>
/* eslint-disable implicit-arrow-linebreak */
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'GenericIndex',
  data() {
    return {
      modelQuery: null,
      filters: {
        page: '1',
      },
      filterLanguage: 1,
      modulesToLoad: 1,
    };
  },
  mounted() {
    this.retrieveAllGeneric();
  },
  methods: {
    ...mapActions(['getGeneric', 'deleteGeneric']),
    showEdit(record) {
      this.$emit('changemode', 'edit', record);
    },
    showCreateCobrand() {
      this.$router.push({ name: 'devise-cobrands-create' });
    },
    requestDeleteGeneric(record) {
      this.deleteGeneric({ config: this.config, record }).then(() => {
        this.retrieveAllGeneric();
      });
    },
    retrieveAllGeneric(loadbar = true) {
      let { filters } = this;
      if (this.config.additionalFilters) {
        filters = Object.assign({}, filters, this.config.additionalFilters);
      }

      this.getGeneric({ config: this.config, filters }).then(
        () => {
          if (loadbar) {
            window.deviseSettings.$bus.$emit(
              'incrementLoadbar',
              this.modulesToLoad,
            );
          }
        },
      );
    },
    changePage(page) {
      this.filters.page = page;
      this.retrieveAllGeneric(false);
    },
  },
  computed: {
    ...mapGetters(['generic']),
    genericData() {
      return this.generic(this.config);
    },
  },
  watch: {
    config: {
      handler() {
        this.retrieveAllGeneric();
      },
      deep: true,
    },
  },
  props: {
    config: {
      type: Object,
      required: true,
    },
  },
  components: {
    Pagination: () =>
      import(/* webpackChunkName: "devise-tables" */ 'devisephp-interface/src/components/utilities/tables/Pagination'),
  },
};
</script>
