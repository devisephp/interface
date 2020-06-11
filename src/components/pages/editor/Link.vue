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
      <span v-if="value.text === null || value.text === ''" class="dvs-italic"
        >Currently No Value</span
      >
      <div>
        <a :href="value.href" :target="value.target">{{ value.text }}</a>
      </div>
    </template>

    <template slot="editor">
      <fieldset class="dvs-fieldset">
        <label>Label</label>
        <input ref="focusInput" v-model="text" type="text" class="dvs-mb-4 dvs-w-full" />
      </fieldset>

      <label>Link Mode</label>
      <div class="dvs-flex dvs-mb-4">
        <div class="dvs-flex dvs-mr-4">
          <label>
            <input v-model="mode" type="radio" class="dvs-w-auto dvs-mr-2" value="url" />
            URL
          </label>
        </div>
        <div class="dvs-flex">
          <label>
            <input v-model="mode" type="radio" class="dvs-w-auto dvs-mr-2" value="page" />
            Page
          </label>
        </div>
      </div>

      <template v-if="mode === 'url'">
        <fieldset class="dvs-fieldset dvs-mb-4">
          <label>URL</label>
          <input v-model="url" type="text" class="dvs-w-full" />
        </fieldset>
      </template>
      <template v-if="mode === 'page'">
        <fieldset class="dvs-fieldset dvs-mb-4">
          <label>Page</label>
          <select v-model="routeName" class="dvs-w-full" @change="selectPage()">
            <option :value="null" disabled>Select a Page</option>
            <option v-for="page in pagesList.data" :key="page.id" :value="page.route_name">{{
              page.title
            }}</option>
          </select>
        </fieldset>
      </template>

      <fieldset class="dvs-fieldset dvs-mb-4">
        <label>Target</label>
        <select v-model="target" class="dvs-w-full">
          <option value="_self">Same Window</option>
          <option value="_blank">New Tab / Window</option>
          <option value="_parent">Parent</option>
          <option value="_top">Top</option>
        </select>
      </fieldset>

      <fieldset class="dvs-fieldset">
        <label>Relationship</label>
        <select v-model="rel" class="dvs-w-full">
          <option :value="null">Select a Relationship</option>
          <option value="nofollow">No Follow</option>
          <option value="noopener">No Opener</option>
          <option value="noreferrer">No Referrer</option>
          <option value="alternate">Alternate</option>
          <option value="external">External</option>
          <option value="license">License</option>
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
  data() {
    return {
      showEditor: false,
    };
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
    rel: {
      get() {
        if (!this.value.rel) {
          return null;
        }
        return this.value.rel;
      },
      set(value) {
        const valueObj = Object.assign(this.value, { rel: value });
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
        if (this.value.mode) {
          return this.value.mode;
        }
        return 'page';
      },
      set(value) {
        if (value === 'page') {
          this.url = null;
        } else {
          this.routeName = null;
        }

        const valueObj = Object.assign(this.value, { mode: value });
        this.$emit('input', valueObj);
        this.$emit('change', valueObj);
      },
    },
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
      this.rel = this.originalValue.rel;
      this.routeName = this.originalValue.routeName;
      this.enabled = this.originalValue.enabled;
    },
    resetValue() {
      this.enabled = false;
      this.target = null;
      this.rel = null;
      this.url = null;
      this.href = null;
      this.mode = null;
      this.text = null;
      this.routeName = null;
    },
  },
};
</script>
