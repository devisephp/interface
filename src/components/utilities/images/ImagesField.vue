<template>
  <div class="dvs-mb-8 dvs-w-full">
    <div class="dvs-flex dvs-items-center dvs-mb-4 dvs-text-admin-fg">
      <h3>{{ labelText }}</h3>
      <div @click="showMediaManager">
        <images-icon class="dvs-ml-4 dvs-cursor-pointer" w="30px" h="30px" />
      </div>
    </div>

    <div class="dvs-flex dvs-flex-wrap dvs-items-stretch dvs-w-full">
      <div
        v-for="(image, key) in images"
        :key="key"
        class="dvs-w-1/5 dvs-max-w-1/4 dvs-pr-4 dvs-pb-4 dvs-flex"
      >
        <div
          class="dvs-p-4 dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-text-xs dvs-overflow-hidden dvs-bg-admin-bg dvs-text-admin-fg"
        >
          <div
            class="dvs-flex dvs-justify-center dvs-bg-cover dvs-rounded-lg dvs-relative"
            :style="{ height: '100px', backgroundImage: `url('${getPreviewImage(image)}')` }"
            @click="loadPreview(image)"
          >
            <search-icon
              class="dvs-cursor-pointer dvs-absolute dvs-bottom-0 dvs-right-0 dvs-mr-2 dvs-mb-2"
            />
          </div>
          <p class="dvs-mt-2">
            {{ getName(image) }}
            <br />
            <a
              href="#"
              class="dvs-btn dvs-btn-primary dvs-btn-ghost dvs-btn-sm dvs-mt-1 dvs-block"
              @click.prevent="removeImage(key)"
              >Remove</a
            >
          </p>
        </div>
      </div>
    </div>

    <help v-if="value === null || value.length === 0">
      <p>No images found. Add images using the button above.</p>
    </help>

    <div v-if="showPreview">
      <portal to="devise-root">
        <div
          class="dvs-blocker"
          :style="{ backgroundColor: 'transparent' }"
          @click="showPreview = false"
        ></div>
        <div
          v-for="(image, key) in images"
          :key="key"
          class="dvs-modal dvs-fixed dvs-bottom-0 dvs-right-0 dvs-mx-8 dvs-mb-8 dvs-z-40 dvs-bg-admin-bg dvs-text-admin-fg"
        >
          <img :src="previewImagePath" />
          <h6 class="dvs-text-base dvs-mb-4 dvs-mt-4">
            <span>{{ previewImageName }}</span>
            <br />
            <small class="dvs-text-xs">
              Location:
              <span class="dvs-italic dvs-font-normal truncate">{{ previewImagePath }}</span>
            </small>
          </h6>
          <div class="dvs-flex dvs-items-center dvs-mt-4 dvs-justify-between">
            <div>
              <button class="dvs-btn dvs-mr-2 dvs-btn-secondary" @click="showPreview = false">
                Close
              </button>
            </div>
          </div>
        </div>
      </portal>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImagesField',
  components: {
    ImagesIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/CameraIcon'),
    SearchIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/SearchIcon'),
    Help: () => import(/* webpackChunkName: "devise-utilities" */ '../Help'),
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      },
    },
    label: {
      type: String,
      default: 'Images',
    },
    sizes: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      showPreview: false,
      previewImageName: '',
      previewImagePath: '',
    };
  },
  computed: {
    images: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
        this.$emit('change', newValue);
      },
    },
    labelText() {
      return this.label ? this.label : 'Images';
    },
  },
  methods: {
    showMediaManager() {
      window.deviseSettings.$bus.$emit('devise-launch-media-manager', {
        callback: this.mediaSelected,
        options: {
          sizes: this.sizes,
        },
      });
    },

    mediaSelected(imagesAndSettings) {
      console.log('images and settings', imagesAndSettings);
      const value = {};

      if (typeof imagesAndSettings === 'object') {
        value.alt = imagesAndSettings.images.alt;
        value.url = imagesAndSettings.images.defaultImage;
        value.defaultImage = imagesAndSettings.images.defaultImage;
        value.media = imagesAndSettings.images.media;
        value.settings = imagesAndSettings.settings;
      } else {
        value.url = imagesAndSettings;
      }
      this.images.push(value);
    },
    removeImage(index) {
      this.images.splice(index, 1);
    },
    getName(image) {
      if (image.url) {
        const parts = image.url.split('/');
        return parts[parts.length - 1];
      }

      return '';
    },
    loadPreview(image) {
      this.showPreview = true;
      this.previewImageName = this.getName(image);
      this.previewImagePath = this.getPreviewImage(image);
    },

    getPreviewImage(image) {
      return image.url;
    },
  },
};
</script>
