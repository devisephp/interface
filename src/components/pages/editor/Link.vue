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
      <div>
        <a :href="value.href" :target="value.target">{{value.text}}</a>
      </div>
    </template>

    <template slot="editor">
      <fieldset class="dvs-fieldset">
        <label>Label</label>
        <input ref="focusInput" type="text" class="dvs-mb-4" v-model="text">
      </fieldset>

      <label>Link Mode</label>
      <div class="dvs-flex">
        <label>
          <input type="radio" class="dvs-w-auto dvs-mr-2" v-model="mode" value="url">
          URL
        </label>
      </div>
      <div class="dvs-flex dvs-mb-4">
        <label>
          <input type="radio" class="dvs-w-auto dvs-mr-2" v-model="mode" value="page">
          Page
        </label>
      </div>

      <template v-if="mode === 'url'">
        <fieldset class="dvs-fieldset dvs-mb-4">
          <label>URL</label>
          <input type="text" v-model="url">
        </fieldset>
      </template>
      <template v-if="mode === 'page'">
        <fieldset class="dvs-fieldset dvs-mb-4">
          <label>Page</label>
          <select v-model="routeName" @change="selectPage()">
            <option :value="null" disabled>Select a Page</option>
            <option
              :value="page.route_name"
              v-for="page in pagesList.data"
              :key="page.id"
            >{{page.title}}</option>
          </select>
        </fieldset>
      </template>

      <fieldset class="dvs-fieldset">
        <label>Target</label>
        <select v-model="target">
          <option value="_self">Same Window</option>
          <option value="_blank">New Tab / Window</option>
          <option value="_parent">Parent</option>
          <option value="_top">Top</option>
        </select>
      </fieldset>
    </template>
  </field-editor>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Field from '../../../mixins/Field';

export default {
  name: 'LinkEditor',
  data() {
    return {
      showEditor: false,
    };
  },
  mounted() {
    this.originalValue = Object.assign({}, this.value);
    this.retrieveAllPagesList();
  },
  methods: {
    ...mapActions('devise', ['getPagesList']),
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
    retrieveAllPagesList(loadbar = true) {
      const filters = { language_id: window.deviseSettings.$page.language.id };
      this.getPagesList(filters).then(() => {
        if (loadbar) {
          window.deviseSettings.$bus.$emit('incrementLoadbar', this.modulesToLoad);
        }
      });
    },
    selectPage() {
      const page = this.pagesList.data.find(p => p.route_name === this.routeName);
      if (page) {
        this.url = page.url;
      }
    },
    cancel() {
      this.mode = this.originalValue.mode;
      this.text = this.originalValue.text;
      this.url = this.originalValue.url;
      this.href = this.originalValue.href;
      this.target = this.originalValue.target;
      this.routeName = this.originalValue.routeName;
      this.enabled = this.originalValue.enabled;
      this.toggleEditor();
    },
    resetValue() {
      this.enabled = false;
      this.target = null;
      this.url = null;
      this.href = null;
      this.mode = null;
      this.text = null;
      this.routeName = null;
    },
  },
  computed: {
    ...mapGetters('devise', ['pagesList']),
    url: {
      get() {
        return this.value.url;
      },
      set(value) {
        const valueObj = Object.assign(this.value, { href: value, url: value });
        this.$emit('input', valueObj);
        this.$emit('change', valueObj);
      },
    },
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
    target: {
      get() {
        if (!this.value.target) {
          const valueObj = Object.assign(this.value, { target: '_self' });
          this.$emit('input', valueObj);
          this.$emit('change', valueObj);
        }
        return this.value.target;
      },
      set(value) {
        const valueObj = Object.assign(this.value, { target: value });
        this.$emit('input', valueObj);
        this.$emit('change', valueObj);
      },
    },
    routeName: {
      get() {
        return this.value.routeName;
      },
      set(value) {
        const valueObj = Object.assign(this.value, { routeName: value });
        this.$emit('input', valueObj);
        this.$emit('change', valueObj);
      },
    },
    mode: {
      get() {
        return this.value.mode;
      },
      set(value) {
        this.url = null;
        this.routeName = null;
        const valueObj = Object.assign(this.value, { mode: value });
        this.$emit('input', valueObj);
        this.$emit('change', valueObj);
      },
    },
  },
  props: ['value', 'options'],
  components: {
    FieldEditor: () => import(/* webpackChunkName: "devise-editors" */ './Field'),
  },
  mixins: [Field],
};
</script>
