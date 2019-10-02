<template>
  <field-editor
    v-model="value"
    :options="options"
    :show-editor="showEditor"
    @toggleShowEditor="toggleEditor"
    @cancel="cancel"
    @resetvalue="resetValue"
    @change="update"
  >
    <template slot="preview">
      <span
        v-if="value.text === null || value.text === ''"
        class="dvs-italic"
      >Currently No Value</span>
      <div>{{value.text}}</div>
    </template>

    <template slot="editor">
      <fieldset class="dvs-fieldset">
        <input
          ref="focusInput"
          v-model="text"
          type="number"
        >
      </fieldset>
    </template>
  </field-editor>
</template>

<script>
import Field from '../../../mixins/Field';

export default {
  name: 'NumberEditor',
  components: {
    FieldEditor: () => import(/* webpackChunkName: "devise-editors" */ './Field'),
  },
  mixins: [Field],
  props: {
    value: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      originalValue: {},
      showEditor: false,
    };
  },
  computed: {
    text: {
      get () {
        return this.value.text;
      },
      set (value) {
        const valueObj = Object.assign(this.value, { text: parseInt(value) });
        this.$emit('input', valueObj);
        this.$emit('change', valueObj);
      },
    },
  },
  mounted () {
    this.originalValue = Object.assign({}, this.value);
  },
  methods: {
    toggleEditor () {
      this.showEditor = !this.showEditor;
      this.focusForm();
    },
    focusForm () {
      if (this.showEditor) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.focusInput.focus();
          }, 200);
        });
      }
    },
    cancel () {
      this.text = this.originalValue.text;
      this.enabled = this.originalValue.enabled;
    },
    resetValue () {
      this.enabled = false;
      this.text = null;
    },
  },
};
</script>
