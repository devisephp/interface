<template>
  <field-editor
    :options="options"
    v-model="value"
    :showEditor="showEditor"
    @toggleShowEditor="toggleEditor"
    @cancel="cancel"
    @resetvalue="resetValue"
    @change="update"
  >
    <template slot="preview">
      <span v-if="value.text === null || value.text === ''" class="dvs-italic">Currently No Value</span>
      <div>{{ clipString(value.text, 300, true) }}</div>
    </template>

    <template slot="editor">
      <fieldset class="dvs-fieldset">
        <textarea ref="focusInput" type="text" v-model="text" :maxlength="getMaxLength"></textarea>
      </fieldset>
    </template>
  </field-editor>
</template>

<script>
import Strings from './../../../mixins/Strings';
import Field from './../../../mixins/Field';

export default {
  name: 'TextAreaEditor',
  data() {
    return {
      originalValue: null,
      showEditor: false
    };
  },
  mounted() {
    this.originalValue = Object.assign({}, this.value);
  },
  methods: {
    toggleEditor() {
      this.showEditor = !this.showEditor;
      this.focusForm();
    },
    focusForm() {
      if (this.showEditor) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.focusInput.focus();
          }, 200);
        });
      }
    },
    cancel() {
      this.text = this.originalValue.text;
      this.enabled = this.originalValue.enabled;
      this.toggleEditor();
    },
    updateValue: function() {
      // Emit the number value through the input event
      this.$emit('input', this.localValue);
      this.$emit('change', this.localValue);
    },
    resetValue() {
      this.text = null;
      this.enabled = false;
    }
  },
  computed: {
    getMaxLength: function() {
      if (typeof this.settings !== 'undefined' && typeof this.settings.maxlength !== 'undefined') {
        return this.settings.maxlength;
      }
      return '';
    },
    text: {
      get() {
        return this.value.text;
      },
      set(value) {
        let valueObj = Object.assign(this.value, { text: value });
        this.$emit('input', valueObj);
        this.$emit('change', valueObj);
      }
    }
  },
  props: ['value', 'options'],
  mixins: [Strings, Field],
  components: {
    FieldEditor: () => import(/* webpackChunkName: "js/devise-editors" */ './Field')
  }
};
</script>
