<template>
  <div class="dvs-flex-grow dvs-relative dvs-bg-gray-200">
    <div class="dvs-border-l dvs-border-gray-300">
      <div class="dvs-p-8">
        <div
          v-if="warning"
          class="dvs-fixed dvs-bottom-0 dvs-left-0 dvs-mb-2 dvs-ml-2 dvs-shadow-lg"
        >
          <div
            class="dvs-bg-red-500 dvs-text-center dvs-rounded dvs-text-white dvs-shadow-lg"
            style="max-width:500px; background: repeating-linear-gradient(45deg, #f6ba52, #f6ba52 10px, #ffd180 10px, #ffd180 20px)"
          >
            <h3
              class="dvs-p-4 dvs-px-8 dvs-uppercase  dvs-border-b dvs-border-white dvs-pb-4 dvs-text-red"
            >
              Warning
            </h3>
            <div class="dvs-p-4 dvs-px-8 dvs-rounded-b" style="background-color:#f6ba52">
              <p>
                The size of your image may not fit the intended location of your developer. If you
                have chosen "best fit" for your crop or changed the cropping size images may not
                appear as intended.
              </p>
            </div>
          </div>
        </div>

        <template v-if="!isCropping">
          <div
            class="dvs-flex dvs-justify-center dvs-items-center"
            :class="{ 'dvs-p-16': warning }"
            style="background: repeating-linear-gradient(45deg, #606dbc, #606dbc 10px, #465298 10px, #465298 20px)"
          >
            <transition name="dvs-fade">
              <img
                v-show="loaded"
                :src="activeImage.url"
                class=" dvs-shadow-lg"
                @load="loaded = true"
              />
            </transition>

            <loading-screen
              v-show="!loaded"
              :inline="true"
              inline-message="Loading Image"
            ></loading-screen>
          </div>
        </template>
        <div v-if="isCropping" class="dvs-blocker dvs-z-30"></div>
        <div
          v-if="isCropping"
          class="dvs-relative dvs-z-40 dvs-bg-black dvs-rounded dvs-shadow-lg"
        >
          <div class="dvs-flex dvs-bg-gray-900 dvs-p-4 dvs-rounded-t">
            <button class="dvs-btn dvs-btn-primary dvs-btn-sm dvs-mr-2" @click="applyCrop">
              Apply Crop
            </button>
            <button
              class="dvs-btn dvs-mr-2 dvs-btn-ghost dvs-btn-sm dvs-text-white"
              @click="cancelCrop"
            >
              Remove Crops
            </button>
          </div>
          <div class="dvs-flex dvs-justify-center dvs-w-full">
            <img ref="croppingimage" :src="activeImage.baseImageUrl" style="max-height:500px" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Cropper from 'cropperjs';

export default {
  name: 'MediaEditorPreview',
  components: {
    LoadingScreen: () =>
      import(/* webpackChunkName: "devise-utilities" */ '../utilities/LoadingScreen.vue'),
  },
  props: {
    sizes: {
      type: Object,
      default: null,
    },
    customSize: {
      type: Object,
      default: null,
    },
    activeImage: {
      type: Object,
      required: true,
    },
    encodeEdits: {
      type: Function,
      required: true,
    },
    warning: {
      type: Boolean,
      default: false,
    },
    active: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      cropper: null,
      loaded: false,
    };
  },
  computed: {
    ...mapState('devise', ['isCropping']),
    aspectRatio() {
      const size = this.activeImage.name;
      if (this.sizes && this.sizes[size]) {
        return this.sizes[size].w / this.sizes[size].h;
      }
      if (this.customSize) {
        return this.customSize.w / this.customSize.h;
      }
      return 1;
    },
  },
  watch: {
    isCropping(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.initializeCropper();
        });
      }
    },
  },
  methods: {
    ...mapMutations('devise', ['toggleCropping']),
    initializeCropper() {
      const image = this.$refs.croppingimage;

      this.cropper = new Cropper(image, {
        aspectRatio: this.aspectRatio,
        maxContainerHeight: '500px',
      });
    },
    applyCrop() {
      const cropData = this.cropper.getData(true);

      this.$emit('applycrop', cropData);
      this.toggleCropping();
    },
    cancelCrop() {
      this.$emit('removecrop');
      this.toggleCropping();
    },
  },
};
</script>
