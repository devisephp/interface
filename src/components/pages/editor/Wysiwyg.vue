<template>
  <!-- eslint-disable vue/no-v-html -->
  <div>
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
        <div v-html="clipString(value.text, 200, false)"></div>
      </template>
      <template slot="editor">
        <wysiwyg
          ref="editor"
          v-model="text"
          style="min-height:300px;"
        ></wysiwyg>
      </template>
    </field-editor>
  </div>
</template>

<script>
import Strings from '../../../mixins/Strings';
import Field from '../../../mixins/Field';

export default {
  name: 'WysiwygEditor',
  components: {
    FieldEditor: () => import(/* webpackChunkName: "devise-editors" */ './Field'),
    Wysiwyg: () => import(/* webpackChunkName: "devise-wysiwyg" */ '../../utilities/Wysiwyg'),
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
    nameKey: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localValue: {},
      originalValue: null,
      showEditor: false,
    };
  },
  computed: {
    text: {
      get () {
        return this.value.text;
      },
      set (value) {
        const valueObj = Object.assign(this.value, { text: value });
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
    },
    cancel () {
      this.text = this.originalValue.text;
      this.enabled = this.originalValue.enabled;

      this.toggleEditor();
    },
    resetValue () {
      this.enabled = false;
      this.$refs.editor.empty();
    }
  },
};
</script>
