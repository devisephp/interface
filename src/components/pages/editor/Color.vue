<template>
  <field-editor
    :options="options"
    v-model="value"
    ref="field"
    :showEditor="showEditor"
    @toggleShowEditor="toggleEditor"
    @cancel="cancel"
    @resetvalue="resetValue"
    @change="update"
  >
    <template slot="preview">
      <span v-if="color === null || color === ''" class="dvs-italic">Currently No Value</span>
      <div class="dvs-flex dvs-items-center" v-else>
        <div class="dvs-w-4 dvs-h-4 dvs-rounded-full dvs-mr-4" :style="{'background-color': color}"></div>
      </div>
    </template>
    <template slot="editor">
      <sketch-picker v-model="color" @cancel="cancel"/>
    </template>
  </field-editor>
</template>

<script>
import { Sketch } from 'vue-color';
import Field from '../../../mixins/Field';

const tinycolor = require('tinycolor2');

export default {
  name: 'ColorEditor',
  data() {
    return {
      showEditor: false,
      originalValue: null,
    };
  },
  mounted() {
    this.originalValue = this.value.color;
  },
  methods: {
    toggleEditor() {
      this.showEditor = !this.showEditor;
    },
    cancel() {
      const rgba = this.convertColor(this.originalValue);
      this.color = { rgba };
      this.enabled = this.originalValue.enabled;
      this.toggleEditor();
    },
    convertColor(color) {
      return tinycolor(color).toRgb();
    },
    resetValue() {
      this.enabled = false;
      this.color = null;
    },
  },
  computed: {
    getMaxLength() {
      if (typeof this.settings !== 'undefined' && typeof this.settings.maxlength !== 'undefined') {
        return this.settings.maxlength;
      }
      return '';
    },
    color: {
      get() {
        return tinycolor(this.value.color).toHex();
      },
      set(color) {
        let valueObj = Object.assign(this.value, { color: null });
        if (color !== null) {
          valueObj = Object.assign(this.value, {
            color: `rgba(${color.rgba.r},${color.rgba.g},${color.rgba.b},${color.rgba.a})`,
          });
        }
        this.$emit('input', valueObj);
        this.$emit('change', valueObj);
      },
    },
  },
  props: ['value', 'options'],
  components: {
    FieldEditor: () => import(/* webpackChunkName: "js/devise-editors" */ './Field'),
    'sketch-picker': Sketch,
  },
  mixins: [Field],
};
</script>
