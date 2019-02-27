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
      <span
        v-if="url === null || url === ''"
        class="dvs-italic"
      >Currently No Value</span>
      <img
        :src="url"
        class="dvs-max-w-2xs"
        :alt="url"
      >
      <br>
    </template>

    <template slot="editor">
      <label class="dvs-mb-2 dvs-block">Image Tool To Use:</label>
      <div class="dvs-flex dvs-mb-2">
        <label>
          <input
            type="radio"
            class="dvs-w-auto dvs-mr-2"
            v-model="mode"
            value="media"
          >
          Media Manager
        </label>
      </div>
      <div class="dvs-flex dvs-mb-8">
        <label>
          <input
            type="radio"
            class="dvs-w-auto dvs-mr-2"
            v-model="mode"
            value="manual"
          >
          Manual URL
        </label>
      </div>
      <fieldset
        class="dvs-fieldset"
        v-if="mode === 'manual'"
      >
        <label>URL</label>
        <div class="dvs-flex dvs-items-center">
          <input
            type="text"
            v-model="url"
          >
        </div>
      </fieldset>
      <fieldset
        class="dvs-fieldset"
        v-else
      >
        <div class="flex">
          <div
            v-if="value.url"
            @click="launchMediaEditor($event)"
            class="dvs-mb-8 dvs-mr-4"
          >
            <button
              class="dvs-btn"
              :style="theme.actionButton"
            >Edit Current Media</button>
          </div>
          <div
            @click="launchMediaManager($event)"
            class="dvs-mb-8 dvs-mr-4"
          >
            <button
              class="dvs-btn"
              :style="theme.actionButton"
            >Select New Media</button>
          </div>
        </div>
        <div class="dvs-flex dvs-items-center">
          <div v-if="hasMedia">
            <div class="dvs-mb-4 uppercase font-bold text-sm">Media sizes</div>

            <div class="dvs-flex dvs-flex-wrap">
              <div
                v-for="(media, size) in media"
                :key="size"
                class="dvs-uppercase dvs-text-center dvs-mr-4 dvs-mb-4 dvs-p-4"
                :style="theme.panelCard"
              >
                <img
                  :src="media + '?buster=' +new Date().getTime()"
                  class="mb-2"
                  style="width:100px; height:auto"
                >
                <div class="dvs-text-xs">{{ size }} {{ getDimensions(size) }}</div>
              </div>
            </div>
          </div>
        </div>
      </fieldset>
      <fieldset class="dvs-fieldset">
        <label class="dvs-mt-4">Alt Tag</label>
        <input
          type="text"
          v-model="alt"
        >
      </fieldset>
    </template>
  </field-editor>
</template>

<script>
import Field from '../../../mixins/Field';

export default {
  name: 'ImageEditor',
  data () {
    return {
      originalValue: null,
      showEditor: false,
    };
  },
  mounted () {
    this.originalValue = Object.assign({}, this.value);
  },
  methods: {
    toggleEditor () {
      if (this.mode !== 'manual') {
        this.$set(this, 'mode', 'media');
      }
      this.showEditor = !this.showEditor;
    },
    cancel () {
      this.url = this.originalValue.url;
      this.alt = this.originalValue.alt;
      this.media = this.originalValue.media;
      this.settings = this.originalValue.settings;
      this.enabled = this.originalValue.enabled;
      this.mode = this.originalValue.mode;

      this.toggleEditor();
    },
    resetValue () {
      this.url = null;
      this.enabled = false;
      this.alt = null;
      this.media = [];
      this.settings = {};
      this.mode = 'media';
    },
    launchMediaManager () {
      this.options.type = 'image';
      window.deviseSettings.$bus.$emit('devise-launch-media-manager', {
        callback: this.mediaSelected,
        options: this.options,
      });
    },
    mediaSelected (imagesAndSettings) {
      if (typeof imagesAndSettings === 'object') {
        this.url = imagesAndSettings.images.orig_optimized;
        this.media = imagesAndSettings.images;
        this.settings = imagesAndSettings.settings;
      } else {
        this.url = imagesAndSettings;
      }
    },
    launchMediaEditor () {
      this.options.type = 'image';
      window.deviseSettings.$bus.$emit('devise-launch-media-editor', {
        callback: this.mediaSelected,
        options: this.options,
        image: this.value.media.original,
        settings: this.settings,
      });
    },
    getDimensions (size) {
      if (this.value.sizes && this.value.sizes[size])
        return `(${this.value.sizes[size].w} x ${this.value.sizes[size].h})`;

      return null;
    },
  },
  computed: {
    url: {
      get () {
        return this.value.url;
      },
      set (value) {
        const valueObj = Object.assign(this.value, { url: value });
        this.$emit('input', valueObj);
        this.$emit('change', valueObj);
      },
    },
    alt: {
      get () {
        return this.value.alt;
      },
      set (value) {
        const valueObj = Object.assign(this.value, { alt: value });
        this.$emit('input', valueObj);
        this.$emit('change', valueObj);
      },
    },
    mode: {
      get () {
        if (this.value.mode !== 'media' && this.value.mode !== 'manual') {
          const valueObj = Object.assign(this.value, { mode: 'media' });
          this.$emit('input', valueObj);
          this.$emit('change', valueObj);
        }
        return this.value.mode;
      },
      set (value) {
        const valueObj = Object.assign(this.value, { mode: value });
        this.$emit('input', valueObj);
        this.$emit('change', valueObj);
      },
    },
    media: {
      get () {
        return this.value.media;
      },
      set (value) {
        const valueObj = Object.assign(this.value, { media: value });
        this.$emit('input', valueObj);
        this.$emit('change', valueObj);
      },
    },
    settings: {
      get () {
        return this.value.settings;
      },
      set (value) {
        const valueObj = Object.assign(this.value, { settings: value });
        this.$emit('input', valueObj);
        this.$emit('change', valueObj);
      },
    },
    hasMedia () {
      if (this.media) {
        return Object.keys(this.media).length > 0;
      }
      return false
    },
  },
  props: ['value', 'options'],
  components: {
    FieldEditor: () => import(/* webpackChunkName: "devise-editors" */ './Field'),
  },
  mixins: [Field],
};
</script>
