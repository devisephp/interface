<template>
  <div>
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
  data () {
    return {
      localValue: {},
      originalValue: null,
      showEditor: false,
    };
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
  props: ['value', 'options', 'namekey'],
  mixins: [Strings, Field],
  components: {
    FieldEditor: () => import(/* webpackChunkName: "devise-editors" */ './Field'),
    Wysiwyg: () => import(/* webpackChunkName: "devise-wysiwyg" */ '../../utilities/Wysiwyg'),
  },
};
</script>
