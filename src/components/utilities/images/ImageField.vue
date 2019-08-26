<template>
  <div>
    <div class="dvs-flex dvs-items-center dvs-w-full">
      <fieldset class="dvs-fieldset dvs-w-full">
        <input
          v-if="typeof image === 'object'"
          type="text"
          :value="imageUrl"
          class="dvs-w-full"
          disabled
        >
        <input
          v-else
          type="text"
          :value="image"
          class="dvs-w-full"
          disabled
        >
      </fieldset>
      <div @click="showMediaManager()">
        <images-icon
          class="dvs-ml-4 dvs-cursor-pointer"
          w="30px"
          h="30px"
        />
      </div>
      <div
        @click="loadPreview"
        v-bind:class="{ ' dvs-opacity-25': !previewEnabled }"
      >
        <search-icon
          class="dvs-ml-4 dvs-cursor-pointer"
          w="30px"
          h="30px"
        />
      </div>
    </div>
    <div class="dvs-flex dvs-items-center">
      <div
        v-if="hasMedia"
        class="dvs-mt-6"
      >
        <div class="dvs-mb-4 uppercase font-bold text-sm">Media sizes</div>
        <div class="dvs-flex dvs-flex-wrap">
          <div
            v-for="(media, size) in image.media"
            :key="size"
            class="dvs-uppercase dvs-text-center dvs-mr-4 dvs-mb-4 dvs-p-4 dvs-bg-admin-bg dvs-text-admin-fg"
          >
            <img
              :src="media"
              class="mb-2"
              style="width:100px; height:auto"
            >
            <div class="dvs-text-xs">{{ getSizeName(size) }} {{ getDimensions(size) }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showPreview">
      <portal to="devise-root">
        <div
          class="dvs-blocker"
          :style="{backgroundColor: 'transparent'}"
          @click="showPreview = false"
        ></div>
        <div class="dvs-modal dvs-fixed dvs-pin-b dvs-pin-r dvs-mx-8 dvs-mb-8 dvs-z-40 dvs-w-1/2 dvs-bg-admin-bg dvs-text-admin-fg">
          <img :src="imageUrl">
          <h6 class="dvs-text-base dvs-mb-4 dvs-mt-4">
            <span>{{ fileName }}</span>
            <br>
            <small class="dvs-text-xs">
              Location:
              <span class="dvs-italic dvs-font-normal">{{ imageUrl }}</span>
            </small>
          </h6>
          <div class="dvs-flex dvs-items-center dvs-mt-4 dvs-justify-between">
            <div>
              <button
                class="dvs-btn dvs-mr-2 dvs-btn-secondary dvs-btn-sm"
                @click="showPreview = false"
              >Close</button>
            </div>
          </div>
        </div>
      </portal>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageField',
  data () {
    return {
      showPreview: false,
    };
  },
  methods: {
    showMediaManager () {
      window.deviseSettings.$bus.$emit('devise-launch-media-manager', {
        callback: this.mediaSelected,
        options: {
          sizes: this.sizes,
        },
      });
    },
    mediaSelected (imagesAndSettings) {
      if (typeof this.image !== 'object') {
        this.image = imagesAndSettings.images.defaultImage;
        return imagesAndSettings.images.defaultImage;
      }

      const value = {
        url: imagesAndSettings.images.defaultImage
      };

      if (typeof imagesAndSettings === 'object') {
        value.alt = imagesAndSettings.images.alt;
        value.url = imagesAndSettings.images.defaultImage;
        value.defaultImage = imagesAndSettings.images.defaultImage;
        value.media = imagesAndSettings.images.media;
        value.settings = imagesAndSettings.settings;
      } else {
        value.url = imagesAndSettings;
      }

      this.image = Object.assign({}, value);
      return this.image
    },
    getSizeName (size) {
      if (size === 'orig_optimized') return `Optimized`;

      return size;
    },
    getDimensions (size) {
      if (this.image.sizes && this.image.sizes[size])
        return `(${this.image.sizes[size].w} x ${this.image.sizes[size].h})`;

      if (this.sizes && this.sizes[size]) return `(${this.sizes[size].w} x ${this.sizes[size].h})`;

      if (size !== 'original' && this.image.settings.w)
        return `(${this.image.settings.w} x ${this.image.settings.h})`;

      return null;
    },
    loadPreview () {
      if (this.previewEnabled) this.showPreview = true;
    },
  },
  computed: {
    image: {
      get () {
        // It's goign to be an object folks 
        if ((typeof this.value === 'object' && this.value !== null) || this.sizes !== null) {
          const mergedValue = Object.assign(
            {},
            {
              media: {},
              settings: {},
              url: ''
            },
            this.value)
          if (this.sizes) {
            mergedValue.sizes = this.sizes
          }
          return mergedValue;
        }

        // The man just wants an image.
        if (typeof this.value === 'undefined' || this.value === null) {
          return ''
        }

        // Just gave him what he gave us
        return this.value;
      },
      set (newValue) {
        if (typeof newValue === 'object') {
          newValue.sizes = this.sizes
          // Expects an object
          this.$emit('input', newValue);
          this.$emit('change', newValue);
        } else {
          // Expects just the string
          this.$emit('input', newValue);
          this.$emit('change', newValue);
        }
      },
    },
    hasMedia () {
      if (this.image && this.image.media) {
        return Object.keys(this.image.media).length > 0;
      }
      return false;
    },
    imageUrl () {
      if (!this.image) {
        return ''
      }
      if (typeof this.image === 'object') {
        return this.image.url
      }
      return this.image
    },
    fileName () {
      const parts = this.imageUrl.split('/');
      return parts[parts.length - 1];
    },
    previewEnabled () {
      return this.imageUrl !== '' && this.imageUrl !== null;
    },
  },
  props: {
    value: {},
    sizes: {
      type: Object,
      default: null,
    },
  },
  components: {
    ImagesIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/CameraIcon'),
    SearchIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/SearchIcon'),
  },
};
</script>
