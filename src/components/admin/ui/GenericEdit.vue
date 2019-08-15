<template>
  <div
    id="dvs-admin-main"
    style="padding-left:250px;"
    v-if="this.record"
  >
    <h3
      class="dvs-mb-10"
      :style="{color: theme.panel.color}"
    >Edit {{ config.name }}</h3>
    <component
      :is="config.editFormComponent"
      v-on:change-active-record="requestChangeActiveRecord"
      v-model="record"
      mode="edit"
    ></component>

    <div>
      <button
        class="dvs-btn dvs-mr-2"
        @click="requestEditRecord"
        :disabled="editInvalid"
        :style="theme.actionButton"
      >Edit</button>
      <button
        class="dvs-btn"
        @click="goToIndex"
        :style="theme.actionButtonGhost"
      >Cancel</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable operator-linebreak */

// import DeviseWysiwyg from 'devisephp-interface/src/components/utilities/Wysiwyg.vue';
// import DatePicker from 'devisephp-interface/src/components/utilities/DatePicker.vue';
// import ImageField from 'devisephp-interface/src/components/utilities/images/ImageField.vue';
import { mapActions } from 'vuex';

export default {
  name: 'GenericEdit',
  methods: {
    ...mapActions(['updateGeneric']),
    requestEditRecord() {
      if (typeof this.config.edit === 'function') {
        this.config.edit({ config: this.config, record: this.record });
      } else {
        this.updateGeneric({ config: this.config, record: this.record });
      }
    },
    requestChangeActiveRecord(record) {
      this.$emit('change-active-record', record);
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
