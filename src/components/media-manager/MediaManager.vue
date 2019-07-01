<template>
  <div
    class="dvs-min-h-screen dvs-fixed dvs-pin dvs-flex dvs-justify-center dvs-items-center dvs-z-60 dvs-text-grey-darker"
    v-if="show"
  >
    <div
      class="dvs-blocker dvs-z-30"
      @click="close"
    ></div>

    <div class="media-manager dvs-min-w-4/5">

      <media-selector
        v-if="defaultImage === null || selectingFile !== null"
        @selectedfile="selectedFile"
      >
      </media-selector>

      <template v-else-if="defaultImage && defaultImage.type === 'image'">
        <div v-if="typeof options !== 'undefined' && options.sizes">
          <media-editor
            :imageSettings="imageSettings"
            :default-image="defaultImage.url"
            :sizes="options.sizes"
            @selectsizeimage="selectSizeImage"
            @cancel="defaultImage = null"
            @done="close"
          />
        </div>

        <div v-else>
          <media-editor
            :imageSettings="imageSettings"
            :default-image="defaultImage.url"
            @cancel="defaultImage = null"
            @done="close"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

const Cookies = require('js-cookie');

export default {
  data () {
    return {
      show: false,
      mode: 'list',
      directoryToCreate: '',
      target: null,
      callback: null,
      searchTerms: null,
      searchResults: [],
      defaultImage: null,
      selectingFile: null,
      searchResultsLimit: 100,
      currentlyOpenFile: null,
      options: null,
      cookieSettings: false,
      imageSettings: {},
    };
  },
  mounted () {
    this.startOpenerListener();
  },
  methods: {

    selectedFile (file) {
      if (this.defaultImage === null) {
        this.defaultImage = file
      }
      console.log(this.options.sizes)
    },
    startOpenerListener () {
      window.deviseSettings.$bus.$on(
        'devise-launch-media-manager',
        ({ target, callback, options }) => {
          this.callback = callback;
          this.target = target;
          this.options = options;

          this.show = true;
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

    close () {
      this.show = false;
      this.imageSettings = Object.assign({});
      this.$set(this, 'defaultImage', null);
    },
    selectSizeImage () {
      this.selectingFile = true
    }
  },
  computed: {
    ...mapGetters('devise', ['files', 'directories', 'currentDirectory', 'searchableMedia']),
    currentFiles () {
      if (this.searchResults.length > 0) {
        return this.searchResults;
      }
      return this.files;
    },
    uploadHeaders () {
      const token = document.head.querySelector('meta[name="csrf-token"]');
      return {
        'X-CSRF-TOKEN': token.content,
      };
    },
  },
  watch: {
    loaded (newValue) {
      if (newValue === true) {
        this.$nextTick(() => {
          if (this.$refs.search) {
            this.$refs.search.focus()
          }
        })
      }
    },
    cookieSettings: newValue => {
      if (!newValue) {
        Cookies.remove('devise-mediamanager-location');
        Cookies.remove('devise-mediamanager-mode');
      }
    },
    mode (newValue) {
      if (this.cookieSettings) {
        Cookies.set('devise-mediamanager-mode', newValue);
      }
    },
  },
  components: {
    MediaEditor: () => import(/* webpackChunkName: "devise-media" */ './MediaEditor.vue'),
    MediaSelector: () => import(/* webpackChunkName: "devise-media" */ './MediaSelector.vue'),
  },
};
</script>
