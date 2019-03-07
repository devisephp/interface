<template>
  <div
    class="dvs-ml-4"
    v-if="shouldDisplayControls"
  >
    <div
      @click="show = true"
      class="dvs-cursor-pointer"
    >
      <settings-icon />
    </div>
    <div v-show="show">
      <div
        class="dvs-blocker dvs-z-20"
        @click.prevent="hide"
      ></div>
      <div
        v-show="show"
        :style="theme.panel"
        class="dvs-absolute dvs--mt-8 dvs-pin-l dvs-mb-1 dvs-min-w-250 dvs-z-40 dvs-shadow-lg"
      >
        <div
          class="dvs-pt-4 dvs-pb-2 dvs-px-4 dvs-flex dvs-justify-between dvs-items-center dvs-min-w-64"
          :style="{background:theme.panelCard.background}"
        >
          {{ this.column.label }}
          <div class="dvs-flex dvs-justify-between">
            <button
              class="dvs-btn dvs-btn-xs"
              :style="theme.actionButton"
              @click="clearAll()"
            >Clear</button>
            <div @click="hide">
              <close-icon
                class="dvs-pl-2 dvs-cursor-pointer"
                w="20"
                h="20"
              />
            </div>
          </div>
        </div>
        <div
          class="dvs-px-4 dvs-column-control-modules"
          :style="theme.panel"
        >
          <search
            ref="search"
            v-model="localFilters"
            @change="updateValue"
            v-if="typeof column.search !== 'undefined'"
            :column="column.search"
            :options="column.options"
            :style="{borderColor: theme.panelCard.background}"
          ></search>
          <sort
            ref="sort"
            v-if="typeof column.sort !== 'undefined'"
            :column="column.sort"
            v-model="localFilters.sort"
            @change="updateValue"
            :style="{borderColor: theme.panelCard.background}"
          ></sort>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColumnControls',
  data () {
    return {
      show: false,
      localFilters: null,
    };
  },
  mounted () {
    this.localFilters = Object.assign({}, this.localFilters, this.value);
  },
  methods: {
    updateValue (newValue) {
      this.$emit('input', newValue);
      this.$emit('change', newValue);
    },
    clearAll () {
      this.localFilters = {
        related: {},
        search: {},
        sort: {},
        dates: {},
        page: '1',
      };
      this.updateValue();
    },
    hide () {
      // hacky need to find a better way to have the column clickable
      setTimeout(() => {
        this.show = false;
      })

    },
  },
  computed: {
    shouldDisplayControls () {
      return typeof this.column.sort !== 'undefined' || typeof this.column.search !== 'undefined';
    },
  },
  props: {
    column: {
      type: Object,
      required: true,
    },
    value: {},
  },
  components: {
    CloseIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/XIcon'),
    SettingsIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/SettingsIcon'),
    Search: () =>
      import(/* webpackChunkName: "devise-tables" */ './Search.vue'),
    Sort: () =>
      import(/* webpackChunkName: "devise-tables" */ './Sort.vue'),
  },
};
</script>
