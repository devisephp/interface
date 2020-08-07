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
      <span v-if="url === null || url === ''" class="dvs-italic">Currently No Value</span>
      <img :src="url" class="dvs-max-w-2xs" :alt="url" />
      <br />
    </template>

    <template slot="editor">
      <label class="dvs-mb-2 dvs-block dvs-font-bold">Image Tool To Use:</label>
      <div class="dvs-flex dvs-mb-2">
        <label>
          <input v-model="mode" type="radio" class="dvs-w-auto dvs-mr-2" value="media" />
          Media Manager
        </label>
      </div>
      <div class="dvs-flex dvs-mb-8">
        <label>
          <input v-model="mode" type="radio" class="dvs-w-auto dvs-mr-2" value="manual" />
          Manual URL
        </label>
      </div>
      <fieldset v-if="mode === 'manual'" class="dvs-fieldset">
        <label>URL</label>
        <div class="dvs-flex dvs-items-center">
          <input v-model="url" type="text" />
        </div>
      </fieldset>
      <fieldset v-else class="dvs-fieldset">
        <div class="flex">
          <div
            v-if="value.url && Object.keys(media).length > 0"
            class="dvs-mb-8 dvs-mr-4"
            @click="launchMediaEditor($event)"
          >
            <button class="dvs-btn dvs-btn-sm dvs-btn-primary">Edit Current Media</button>
          </div>
          <div class="dvs-mb-8 dvs-mr-4" @click="launchMediaManager($event)">
            <button class="dvs-btn dvs-btn-sm dvs-btn-primary">Select New Media</button>
          </div>
        </div>
        <div class="dvs-flex dvs-items-center">
          <div v-if="hasMedia">
            <div class="dvs-mb-4 uppercase font-bold text-sm">Media sizes</div>

            <div class="dvs-flex dvs-flex-wrap">
              <div
                v-for="(m, size) in media"
                :key="size"
                class="dvs-uppercase dvs-text-center dvs-mr-4 dvs-mb-4 dvs-p-4 dvs-bg-admin-secondary-bg"
              >
                <image-preview :src="`${m}`" :name="size"></image-preview>
              </div>
            </div>
          </div>
          <div v-if="hasSingleImage">
            <img :src="value.url" style="max-width:200px;" />
          </div>
        </div>
      </fieldset>
      <fieldset class="dvs-fieldset">
        <label class="dvs-mt-4">Alt Tag</label>
        <input v-model="value.alt" type="text" class="dvs-w-full" />
      </fieldset>
    </template>
  </field-editor>
</template>

<script>
import Field from '../../../mixins/Field';
import ImagePreview from './ImagePreview.vue';

export default {
  name: 'ImageEditor',
  components: {
    FieldEditor: () => import(/* webpackChunkName: "devise-editors" */ './Field'),
    ImagePreview,
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
      originalValue: null,
      showEditor: false,
    };
  },
  computed: {
    defaultImage: {
      get() {
        return this.value.defaultImage;
      },
      set(value) {
        const valueObj = Object.assign(this.value, { defaultImage: value });
        this.$emit('input', valueObj);
        this.$emit('change', valueObj);
      },
    },
    url: {
      get() {
        return this.value.url;
      },
      set(value) {
        const valueObj = Object.assign(this.value, { url: value });
        this.$emit('input', valueObj);
        this.$emit('change', valueObj);
      },
    },
    alt: {
      get() {
        return this.value.alt;
      },
      set(value) {
        const valueObj = Object.assign(this.value, { alt: value });
        this.$emit('input', valueObj);
        this.$emit('change', valueObj);
      },
    },
    mode: {
      get() {
        if (this.value.mode !== 'media' && this.value.mode !== 'manual') {
          const valueObj = Object.assign(this.value, { mode: 'media' });
          this.$emit('input', valueObj);
          this.$emit('change', valueObj);
        }
        return this.value.mode;
      },
      set(value) {
        const valueObj = Object.assign(this.value, { mode: value });
        this.$emit('input', valueObj);
        this.$emit('change', valueObj);
      },
    },
    media: {
      get() {
        return this.value.media;
      },
      set(value) {
        const valueObj = Object.assign(this.value, { media: value });
        this.$emit('input', valueObj);
        this.$emit('change', valueObj);
      },
    },
    settings: {
      get() {
        return this.value.settings;
      },
      set(value) {
        const valueObj = Object.assign(this.value, { settings: value });
        this.$emit('input', valueObj);
        this.$emit('change', valueObj);
      },
    },
    hasMedia() {
      if (this.media) {
        return Object.keys(this.media).length > 0;
      }
      return false;
    },
    hasSingleImage() {
      if (this.media || (this.url && this.url.length > 0)) {
        return Object.keys(this.media).length < 1;
      }
      return false;
    },
  },
  mounted() {
    this.originalValue = Object.assign({}, this.value);
  },
  methods: {
    toggleEditor() {
      if (this.mode !== 'manual') {
        this.$set(this, 'mode', 'media');
      }
      this.showEditor = !this.showEditor;
    },
    cancel() {
      this.url = this.originalValue.url;
      this.defaultImage = this.originalValue.defaultImage;
      this.alt = this.originalValue.alt;
      this.media = this.originalValue.media;
      this.settings = this.originalValue.settings;
      this.enabled = this.originalValue.enabled;
      this.mode = this.originalValue.mode;
    },
    resetValue() {
      this.url = null;
      this.defaultImage = null;
      this.enabled = false;
      this.alt = null;
      this.media = [];
      this.settings = {};
      this.mode = 'media';
    },
    launchMediaManager() {
      this.options.type = 'image';
      window.deviseSettings.$bus.$emit('devise-launch-media-manager', {
        callback: this.mediaSelected,
        options: this.options,
      });
    },
    mediaSelected(imagesAndSettings) {
      if (typeof imagesAndSettings === 'object') {
        this.alt = imagesAndSettings.images.alt;
        this.url = imagesAndSettings.images.defaultImage;
        this.defaultImage = imagesAndSettings.images.defaultImage;
        this.media = imagesAndSettings.images.media;
        this.settings = imagesAndSettings.settings;
      } else {
        this.url = imagesAndSettings;
      }
    },
    launchMediaEditor() {
      this.options.type = 'image';
      const image = this.value.defaultImage ? this.value.defaultImage : this.value.url;

      window.deviseSettings.$bus.$emit('devise-launch-media-editor', {
        callback: this.mediaSelected,
        options: this.options,
        image,
        settings: this.settings,
      });
    },
  },
};
</script>
