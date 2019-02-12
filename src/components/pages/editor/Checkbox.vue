<template>
  <field-editor
    :no-reset="true"
    :options="options"
    :value="value"
    :showEditor="showEditor"
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
        <toggle v-model="checked" :id="randomString(8)"></toggle>
      </div>
    </template>
  </field-editor>
</template>

<script>
import Strings from '../../../mixins/Strings';
import Field from '../../../mixins/Field';

export default {
  name: 'CheckboxEditor',
  data() {
    return {
      originalValue: null,
      showEditor: false,
    };
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
      this.toggleEditor();
    },
  },
  computed: {
    checked: {
      get() {
        return this.value.checked;
      },
      set(value) {
        const valueObj = Object.assign({}, this.value, { checked: value });
        this.$emit('input', valueObj);
        this.$emit('change', valueObj);
      },
    },
  },
  props: ['value', 'options'],
  mixins: [Strings, Field],
  components: {
    FieldEditor: () => import(/* webpackChunkName: "devise-editors" */ './Field'),
    Toggle: () => import(/* webpackChunkName: "devise-utilities" */ '../../utilities/Toggle'),
  },
};
</script>
