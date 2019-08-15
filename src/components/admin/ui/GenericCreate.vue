<template>
  <div id="dvs-admin-main" style="padding-left:250px;">
    <h3 class="dvs-mb-10" :style="{color: theme.panel.color}">Create {{ config.name }}</h3>
    <component :is="config.createFormComponent" v-model="record" mode="create"></component>

    <div>
      <button
        class="dvs-btn dvs-mr-2"
        @click="requestCreateRecord"
        :disabled="editInvalid"
        :style="theme.actionButton"
      >Save</button>
      <button class="dvs-btn" @click="goToIndex" :style="theme.actionButtonGhost">Cancel</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable operator-linebreak */

import { mapActions } from 'vuex';

export default {
  name: 'GenericCreate',
  methods: {
    ...mapActions(['createGeneric']),
    requestCreateRecord() {
      this.createGeneric({ config: this.config, record: this.record }).then(
        () => {
          this.$emit('changemode', 'index');
        },
      );
    },
    goToIndex() {
      this.$emit('changemode', 'index');
    },
  },
  props: {
    config: {
      type: Object,
      required: true,
    },
    record: {
      type: Object,
      required: true,
    },
  },
  computed: {
    editInvalid() {
      let disabled = false;
      this.config.required.forEach((field) => {
        if (
          typeof this.record[field] === 'undefined' ||
          this.record[field] === null ||
          this.record[field] === ''
        ) {
          disabled = true;
        }
      });
      return disabled;
    },
  },
};
</script>
