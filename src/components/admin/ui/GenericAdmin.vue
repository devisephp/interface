<template>
  <div>
    <div id="devise-admin-content">
      <div
        id="dvs-admin-sidebar"
        class="min-h-screen"
        :style="{
          borderColor:theme.panelCard.background,
          background:theme.panelCard.background
        }"
      >
        <button
          class="dvs-btn dvs-btn-zero dvs-btn-text dvs-mb-8"
          :style="{color: theme.actionButtonGhost.color}"
          @click="historyBack"
        >Back</button>
        <h6
          :style="{color: theme.panel.color}"
          class="dvs-mb-4"
        >Actions</h6>
        <ul>
          <li
            @click.prevent="requestChangeMode('create')"
            class="dvs-cursor-pointer"
          >Create New {{ config.name }}</li>
        </ul>
        <slot
          name="sidebar"
          v-bind:record="activeRecord"
          v-bind:mode="mode"
        ></slot>
      </div>

      <generic-index
        @changemode="requestChangeMode"
        v-if="mode === 'index'"
        :config="config"
      >
        <template v-slot:indexextras="scopeProps">
          <slot
            name="indexextras"
            :record="scopeProps.record"
          ></slot>
        </template>
      </generic-index>
      <generic-edit
        @changemode="requestChangeMode"
        @change-active-record="requestChangeActiveRecord"
        :record="activeRecord"
        v-if="mode === 'edit'"
        :config="config"
      ></generic-edit>
      <generic-create
        @changemode="requestChangeMode"
        @created="createdComplete"
        :record="activeRecord"
        v-if="mode === 'create'"
        :config="config"
      ></generic-create>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'GenericAdmin',
  data () {
    return {
      mode: 'index',
      activeRecord: null,
    };
  },
  mounted () {
    const paramId = this.$route.params.id;
    if (paramId) {
      this.getGenericRecord({ config: this.config, id: paramId }).then((response) => {
        this.requestChangeMode('edit', response.data);
      });
    }
  },
  methods: {
    ...mapActions(['getGenericRecord']),
    historyBack () {
      if (this.mode === 'index') {
        this.$router.go(-1);
      }
      this.requestChangeMode('index');
    },
    requestChangeMode (mode, activeRecord) {
      if (mode === 'create' && this.config.createTemplate) {
        this.activeRecord = Object.assign({}, this.config.createTemplate);
      } else {
        this.activeRecord = activeRecord;
      }
      this.mode = mode;
    },
    requestChangeActiveRecord (record) {
      this.activeRecord = record;
    },
    createdComplete () {
      this.requestChangeMode('index');
    },
  },
  props: {
    /*
    {
      name: 'Cobrands',
      apiendpoint: 'cobrands',
      store: 'cobrands',
      recordLabel: 'name',
      editFormComponent: 'path to form',
      createFormComponent: 'path to form',
    }
    */
    config: {
      type: Object,
      required: true,
    },
  },
  components: {
    GenericIndex: () => import(/* webpackChunkName: "app-generic-admin" */ './GenericIndex'),
    GenericEdit: () => import(/* webpackChunkName: "app-generic-admin" */ './GenericEdit'),
    GenericCreate: () => import(/* webpackChunkName: "app-generic-admin" */ './GenericCreate'),
  },
};
</script>
