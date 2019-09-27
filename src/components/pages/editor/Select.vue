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
        v-if="value.value === null || value.value === ''"
        class="dvs-italic"
      >Currently No Value</span>
    </template>
    <template slot="editor">
      <fieldset class="dvs-fieldset">
        <select
          ref="focusInput"
          v-model="selectValue"
          class="dvs-w-full"
        >
          <option
            v-if="options.allowNull"
            :value="null"
          >No Selection</option>
          <option
            v-for="(option, key) in options.options"
            :key="key"
            :value="key"
          >{{ option }}</option>
        </select>
      </fieldset>
    </template>
  </field-editor>
</template>

<script>
import Strings from '../../../mixins/Strings';
import Field from '../../../mixins/Field';

export default {
  name: 'SelectEditor',
  components: {
    FieldEditor: () => import(/* webpackChunkName: "devise-editors" */ './Field'),
  },
  mixins: [Strings, Field],
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
      localValue: {
        label: null,
        value: null,
      },
      originalValue: null,
      showEditor: false,
    };
  },
  computed: {
    label: {
      get () {
        if (this.selectValue !== null) {
          return this.options.options[this.selectValue];
        }
        return 'Select';
      },
      set (value) {
        const valueObj = Object.assign(this.value, { text: value });
        this.$emit('input', valueObj);
        this.$emit('change', valueObj);
      },
    },
    selectValue: {
      get () {
        if (this.value.value === '' || !this.value.value) {
          return null;
        }
        return this.value.value;
      },
      set (newSelectValue) {
        const valueObj = Object.assign(this.value, { value: newSelectValue });
        this.$emit('input', valueObj);
        this.$emit('change', valueObj);
      },
    },
  },
  mounted () {
    this.originalValue = Object.assign({}, this.value);
    this.localValue = this.value;
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
      this.selectValue = this.originalValue.value;
      this.label = this.originalValue.label;
      this.enabled = this.originalValue.enabled;
      this.toggleEditor();
    },
    resetValue () {
      this.enabled = false;
      this.label = null;
      this.selectValue = null;
    },
  },
};
</script>
