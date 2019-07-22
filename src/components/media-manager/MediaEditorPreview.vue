<template>
  <div class="dvs-flex-grow dvs-relative">

    <div class="dvs-border-l dvs-border-grey-lighter">

      <div class="dvs-p-8">

        <template v-if="!isCropping">
          <template>
            <div class="dvs-flex dvs-justify-center dvs-items-center">
              <img
                :src="activeImage.url"
                class=" dvs-shadow-lg dvs-border dvs-border-white"
              >
            </div>
          </template>
        </template>
        <div
          class="dvs-blocker dvs-z-30"
          v-if="isCropping"
        ></div>
        <div
          v-if="isCropping"
          class="dvs-relative dvs-z-40 dvs-bg-black dvs-rounded dvs-shadow-lg"
        >
          <div class="dvs-flex dvs-bg-grey-darkest dvs-p-4 dvs-rounded-t">
            <button
              class="dvs-btn dvs-mr-2"
              :style="theme.actionButton"
              @click="applyCrop"
            >
              Apply Crop
            </button>
            <button
              class="dvs-btn dvs-mr-2"
              :style="theme.actionButtonGhost"
              @click="cancelCrop"
            >
              Remove Crops
            </button>
          </div>
          <div class="dvs-flex dvs-justify-center dvs-w-full">
            <img
              :src="activeImage.baseImageUrl"
              ref="croppingimage"
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
  props: {
    sizes: {
      type: Object,
      required: false,
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
      cropper: null
    }
  },
  computed: {
    ...mapState('devise', ['isCropping']),
    aspectRatio () {
      const size = this.activeImage.name;
      return this.sizes[size].w / this.sizes[size].h;
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
