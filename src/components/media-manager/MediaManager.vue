<template>
  <div
    v-if="show"
    class="dvs-min-h-screen dvs-fixed dvs-inset-0 dvs-flex dvs-justify-center dvs-items-center dvs-z-9998 dvs-text-gray-500"
  >
    <div class="dvs-blocker dvs-z-30" @click="close"></div>

    <div class="media-manager min-w-3/4 dvs-mx-8 dvs-max-h-[90vh] dvs-overflow-hidden">
      <media-selector
        v-if="defaultImage === null || selectingFile"
        @selectSourceFile="selectedFile"
      >
      </media-selector>

      <template v-if="defaultImage && defaultImage.type === 'image'">
        <div v-if="typeof options !== 'undefined' && options.sizes">
          <media-editor
            ref="sizesmediaeditor"
            :image-settings="imageSettings"
            :default-image="defaultImage.url"
            :sizes="options.sizes"
            @selectsizeimage="selectSizeImage"
            @cancel="close"
            @done="close"
            @generatedImages="setValue"
          />
        </div>

        <div v-else>
          <media-editor
            :image-settings="imageSettings"
            :default-image="defaultImage.url"
            @cancel="close"
            @done="close"
            @generatedImages="setValue"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

// eslint-disable-next-line no-undef
const Cookies = require('js-cookie');

export default {
  components: {
    MediaEditor: () => import(/* webpackChunkName: "devise-media" */ './MediaEditor.vue'),
    MediaSelector: () => import(/* webpackChunkName: "devise-media" */ './MediaSelector.vue'),
  },
  data() {
    return {
      show: false,
      mode: 'list',
      directoryToCreate: '',
      target: null,
      callback: null,
      searchTerms: null,
      searchResults: [],
      defaultImage: null,
      selectingFile: false,
      searchResultsLimit: 100,
      currentlyOpenFile: null,
      options: null,
      cookieSettings: false,
      imageSettings: {},
    };
  },
  computed: {
    ...mapGetters('devise', ['files', 'directories', 'currentDirectory', 'searchableMedia']),
    currentFiles() {
      if (this.searchResults.length > 0) {
        return this.searchResults;
      }
      return this.files;
    },
    uploadHeaders() {
      const token = document.head.querySelector('meta[name="csrf-token"]');
      return {
        'X-CSRF-TOKEN': token.content,
      };
    },
  },
  watch: {
    loaded(newValue) {
      if (newValue === true) {
        this.$nextTick(() => {
          if (this.$refs.search) {
            this.$refs.search.focus();
          }
        });
      }
    },
    cookieSettings(newValue) {
      if (!newValue) {
        Cookies.remove('devise-mediamanager-location');
        Cookies.remove('devise-mediamanager-mode');
      }
    },
    mode(newValue) {
      if (this.cookieSettings) {
        Cookies.set('devise-mediamanager-mode', newValue);
      }
    },
  },
  mounted() {
    this.startOpenerListener();
  },
  methods: {
    setValue(value) {
      if (typeof this.target !== 'undefined') {
        this.target.value = value;
      }
      if (typeof this.callback !== 'undefined') {
        this.callback(value);
      }
      this.close();
    },
    selectedFile(file) {
      if (this.defaultImage === null) {
        this.defaultImage = file;
      }
      this.selectingFile = false;

      this.$nextTick(() => {
        if (
          !this.defaultImage ||
          this.defaultImage.type !== 'image' ||
          typeof this.options === 'undefined' ||
          !this.options.sizes
        ) {
          this.setValue(file.url);
        }
      });
    },
    startOpenerListener() {
      window.deviseSettings.$bus.$on(
        'devise-launch-media-manager',
        ({ target, callback, options }) => {
          this.callback = callback;
          this.target = target;
          this.options = options;

          this.show = true;
          this.selectingFile = true;
        }
      );

      window.deviseSettings.$bus.$on(
        'devise-launch-media-editor',
        ({ target, callback, options, image, settings }) => {
          this.callback = callback;
          this.target = target;
          this.options = options;
          this.imageSettings = settings;
          this.defaultImage = {
            url: image,
            type: 'image',
          };

          this.show = true;
        }
      );
    },

    close() {
      this.selectingFile = false;
      this.$set(this, 'defaultImage', null);
      this.imageSettings = Object.assign({});
      this.show = false;
    },
    selectSizeImage() {
      this.selectingFile = true;
    },
  },
};
</script>
