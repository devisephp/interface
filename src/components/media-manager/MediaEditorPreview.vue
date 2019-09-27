<template>
  <div class="dvs-flex-grow dvs-relative">

    <div class="dvs-border-l dvs-border-grey-lighter">

      <div class="dvs-p-8">

        <template v-if="!isCropping">
          <template>
            <div class="dvs-flex dvs-justify-center dvs-items-center">
              <transition name="dvs-fade">
                <img
                  v-show="loaded"
                  :src="activeImage.url"
                  class=" dvs-shadow-lg dvs-border dvs-border-white"
                  @load="loaded = true"
                >
              </transition>

              <loading-screen
                v-show="!loaded"
                :inline="true"
                inline-message="Loading Image"
              ></loading-screen>

            </div>
          </template>
        </template>
        <div
          v-if="isCropping"
          class="dvs-blocker dvs-z-30"
        ></div>
        <div
          v-if="isCropping"
          class="dvs-relative dvs-z-40 dvs-bg-black dvs-rounded dvs-shadow-lg"
        >
          <div class="dvs-flex dvs-bg-grey-darkest dvs-p-4 dvs-rounded-t">
            <button
              class="dvs-btn dvs-btn-primary dvs-btn-sm dvs-mr-2"
              @click="applyCrop"
            >
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
            <img
              ref="croppingimage"
              :src="activeImage.baseImageUrl"
              style="max-height:500px"
            >
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
      default: null
    },
    customSize: {
      type: Object,
      default: null
    },
    activeImage: {
      type: Object,
      required: true,
    },
    encodeEdits: {
      type: Function,
      required: true,
    }
  },
  data () {
    return {
      cropper: null,
      loaded: false
    }
  },
  computed: {
    ...mapState('devise', ['isCropping']),
    aspectRatio () {
      const size = this.activeImage.name;
      if (this.sizes && this.sizes[size]) {
        return this.sizes[size].w / this.sizes[size].h;
      } if (this.customSize) {
        return this.customSize.w / this.customSize.h;
      }
      return 1;
    },
  },
  watch: {
    isCropping (newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.initializeCropper()
        })
      }
    }
  },
  methods: {
    ...mapMutations('devise', ['toggleCropping']),
    initializeCropper () {
      const image = this.$refs.croppingimage;

      this.cropper = new Cropper(image, {
        aspectRatio: this.aspectRatio,
        maxContainerHeight: '500px',
      });
    },
    applyCrop () {
      const cropData = this.cropper.getData(true);

      this.$emit('applycrop', cropData)
      this.toggleCropping()
    },
    cancelCrop () {
      this.$emit('removecrop')
      this.toggleCropping()
    }
  }
}
</script>
