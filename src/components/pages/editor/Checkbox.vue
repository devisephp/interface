<template>
  <field-editor
    :no-reset="true"
    :options="options"
    :value="value"
    :show-editor="showEditor"
    @toggleShowEditor="toggleEditor"
    @cancel="cancel"
    @change="update"
  >
    <template slot="preview">
      <span v-if="checked === null || checked === ''" class="dvs-italic">Currently No Value</span>
      <div>{{ checked ? 'On' : 'Off' }}</div>
    </template>

    <template slot="editor">
      <div class="dvs-flex dvs-items-center">
        <toggle :id="randomString(8)" v-model="checked"></toggle>
      </div>
    </template>
  </field-editor>
</template>

<script>
import Strings from '../../../mixins/Strings';
import Field from '../../../mixins/Field';

export default {
  name: 'CheckboxEditor',
  components: {
    FieldEditor: () => import(/* webpackChunkName: "devise-editors" */ './Field'),
    Toggle: () => import(/* webpackChunkName: "devise-utilities" */ '../../utilities/Toggle'),
  },
  mixins: [Strings, Field],
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    options: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      originalValue: null,
      showEditor: false,
    };
  },
  computed: {
    checked: {
      get() {
        if (this.value) {
          return this.value.checked;
        }
        if (this.options && this.options.default) {
          return this.options.default.checked;
        }
        return false;
      },
      set(value) {
        const valueObj = Object.assign({}, this.value, { checked: value });
        this.$emit('input', valueObj);
        this.$emit('change', valueObj);
      },
    },
  },
  mounted() {
    this.originalValue = Object.assign({}, this.value);
  },
  methods: {
    toggleEditor() {
      this.showEditor = !this.showEditor;
    },
    cancel() {
      this.checked = this.originalValue.checked;
      this.enabled = this.originalValue.enabled;
    },
  },
};
</script>
