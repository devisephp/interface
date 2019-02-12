<template>
  <field-editor
    :options="options"
    :value="value"
    :showEditor="showEditor"
    @toggleShowEditor="toggleEditor"
    @cancel="cancel"
    @resetvalue="resetValue"
    @change="update"
  >
    <template slot="preview">
      <span v-if="value.text === null || value.text === ''" class="dvs-italic">Currently No Value</span>
      <div>{{value.text}}</div>
    </template>

    <template slot="editor">
      <fieldset class="dvs-fieldset">
        <date-picker ref="datepicker" v-model="text" :settings="settings"/>
      </fieldset>
    </template>
  </field-editor>
</template>

<script>
import DatePicker from '../../utilities/DatePicker.vue';
import Field from '../../../mixins/Field';

export default {
  name: 'DatetimeEditor',
  data() {
    return {
      showEditor: false,
      settings: { date: true, time: false },
      originalValue: {},
    };
  },
  mounted() {
    this.setSettings();
  },
  methods: {
    setSettings() {
      if (this.options && this.options.settings) {
        const { settings } = this.options;
        if (settings.date) {
          this.settings.date = settings.date;
        }

        if (settings.time) {
          this.settings.time = settings.time;
        }

        if (settings.format) {
          this.settings.format = settings.format;
        }
      }
    },
    toggleEditor() {
      this.originalValue = Object.assign({}, this.value);
      this.showEditor = !this.showEditor;
    },
    cancel() {
      this.text = this.originalValue.text;
      this.enabled = this.originalValue.enabled;
      this.toggleEditor();
    },
    resetValue() {
      this.enabled = false;
      this.text = null;
    },
  },
  computed: {
    text: {
      get() {
        return this.value.text;
      },
      set(value) {
        const valueObj = Object.assign(this.value, { text: value });
        this.$emit('input', valueObj);
        this.$emit('change', valueObj);
      },
    },
    getMaxLength() {
      if (typeof this.settings !== 'undefined' && typeof this.settings.maxlength !== 'undefined') {
        return this.settings.maxlength;
      }
      return '';
    },
  },
  props: ['value', 'options'],
  components: {
    FieldEditor: () => import(/* webpackChunkName: "/devise-editors" */ './Field'),
    DatePicker,
  },
  mixins: [Field],
};
</script>
