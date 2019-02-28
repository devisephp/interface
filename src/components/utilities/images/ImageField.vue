<template>
  <div>
    <div class="dvs-flex dvs-items-center">
      <fieldset class="dvs-fieldset">
        <input
          v-if="typeof image === 'object'"
          type="text"
          :value="image.url"
          disabled
        >
        <input
          v-else
          type="text"
          :value="image"
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
            class="dvs-uppercase dvs-text-center dvs-mr-4 dvs-mb-4 dvs-p-4"
            :style="theme.panelCard"
          >
            <img
              :src="media + '?buster=' +new Date().getTime()"
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
        <div
          class="dvs-modal dvs-fixed dvs-pin-b dvs-pin-r dvs-mx-8 dvs-mb-8 dvs-z-40 dvs-w-1/2"
          :style="theme.panel"
        >
          <img :src="value.url">
          <h6
            class="dvs-text-base dvs-mb-4 dvs-mt-4"
            :style="{color: theme.panel.color}"
          >
            <span>{{ fileName }}</span>
            <br>
            <small class="dvs-text-xs">
              Location:
              <span class="dvs-italic dvs-font-normal">{{ value.url }}</span>
            </small>
          </h6>
          <div class="dvs-flex dvs-items-center dvs-mt-4 dvs-justify-between">
            <div>
              <button
                class="dvs-btn dvs-mr-2"
                @click="showPreview = false"
                :style="theme.actionButtonGhost"
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
      const value = {
        url: imagesAndSettings.images.orig_optimized,
      };

      if (typeof imagesAndSettings === 'object') {
        value.media = imagesAndSettings.images;
        value.settings = imagesAndSettings.settings;
      }

      this.image = Object.assign({}, value);
    },
    getSizeName (size) {
      if (size === 'orig_optimized') return `Optimized`;

      return size;
    },
    getDimensions (size) {
      if (this.value.sizes && this.value.sizes[size])
        return `(${this.value.sizes[size].w} x ${this.value.sizes[size].h})`;

      if (this.sizes && this.sizes[size]) return `(${this.sizes[size].w} x ${this.sizes[size].h})`;

      if (size !== 'original' && this.value.settings.w)
        return `(${this.value.settings.w} x ${this.value.settings.h})`;

      return null;
    },
    loadPreview () {
      if (this.previewEnabled) this.showPreview = true;
    },
  },
  computed: {
    image: {
      get () {
        if (typeof this.value === 'undefined' || this.value === null) {
          return {
            url: null,
          };
        }
        return this.value;
      },
      set (newValue) {
        this.$emit('input', newValue);
        this.$emit('change', newValue);
      },
    },
    hasMedia () {
      if (this.image.media) {
        return Object.keys(this.image.media).length > 0;
      }
      return false;
    },
    fileName () {
      const parts = this.value.url.split('/');
      return parts[parts.length - 1];
    },
    previewEnabled () {
      return this.value !== '' && this.value !== null;
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
