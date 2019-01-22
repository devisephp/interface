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
      <span v-if="value.url === null || value.url === ''" class="dvs-italic">Currently No Value</span>
      <img :src="value.url" class="dvs-max-w-2xs" :alt="value.url">
      <br>
    </template>

    <template slot="editor">
      <fieldset class="dvs-fieldset">
        <div class="dvs-flex dvs-items-center">
          <input type="text" v-model="url">
          <div @click="launchMediaManager($event)">
            <document-icon class="dvs-ml-4 dvs-cursor-pointer" w="30px" h="30px"/>
          </div>
        </div>
      </fieldset>
    </template>
  </field-editor>
</template>

<script>
import Field from './../../../mixins/Field';

export default {
  name: 'FileEditor',
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
    },
    cancel() {
      this.url = this.originalValue.url;
      this.enabled = this.originalValue.enabled;
      this.toggleEditor();
    },
    launchMediaManager(event) {
      devise.$bus.$emit('devise-launch-media-manager', {
        callback: this.mediaSelected,
        options: this.options
      });
    },
    mediaSelected(url) {
      this.url = url;
    },
    resetValue() {
      this.enabled = false;
      this.url = null;
    }
  },
  computed: {
    url: {
      get() {
        return this.value.url;
      },
      set(value) {
        let valueObj = Object.assign(this.value, { url: value });
        this.$emit('input', valueObj);
        this.$emit('change', valueObj);
      }
    }
  },
  props: ['value', 'options'],
  components: {
    CreateIcon: () =>
      import(/* webpackChunkName: "js/devise-icons" */ 'vue-ionicons/dist/ios-create.vue'),
    FieldEditor: () => import(/* webpackChunkName: "js/devise-editors" */ './Field'),
    DocumentIcon: () =>
      import(/* webpackChunkName: "js/devise-icons" */ 'vue-ionicons/dist/ios-document.vue')
  },
  mixins: [Field]
};
</script>
