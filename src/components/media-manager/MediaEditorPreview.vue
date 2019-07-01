<template>
  <div class="dvs-flex-grow dvs-relative">

    <div class="dvs-border-l dvs-border-grey-lighter">

      <div class="dvs-p-8">

        <template v-if="!isCropping">
          <template v-if="sizes">
            <div class="dvs-flex dvs-justify-center dvs-items-center">
              <img
                :src="activeImage.url"
                class=" dvs-shadow-lg dvs-border dvs-border-white"
              >
            </div>
          </template>

          <template v-else>
            <h3 class="dvs-mb-4">Image</h3>

            <help
              class="dvs-mb-4"
              v-if="!customSize.w || !customSize.h"
            >Please provide a width and height for this image</help>

            <div class="dvs-flex dvs-mb-8 dvs-items-center">
              <fieldset class="dvs-fieldset dvs-mr-4">
                <label>Width</label>
                <input
                  type="number"
                  v-model="customSize.w"
                >
              </fieldset>
              <fieldset class="dvs-fieldset dvs-mr-4">
                <label>Height</label>
                <input
                  type="number"
                  v-model="customSize.h"
                >
              </fieldset>
              <fieldset>
                <button
                  class="btn btn-sm"
                  :style="theme.actionButton"
                  @click="setCustomSizeToOriginal"
                >Original Dimensions</button>
              </fieldset>
            </div>
            <img
              v-if="customSize.w && customSize.h"
              :src="`/styled/preview/${source}?${encodedEdits}`"
            >
          </template>
        </template>

        <div v-if="isCropping">
          <div class="dvs-flex dvs-justify-center w-full">
            <img
              :src="activeImage.url"
              ref="croppingimage"
              class="w-full"
            >
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Cropper from 'cropperjs';

export default {
  name: 'MediaEditorPreview',
  props: {
    sizes: {
      type: Object,
      required: true,
    },
    activeImage: {
      type: Object,
      required: true,
    },
    encodeEdits: {
      type: Function,
      required: true,
    },
  },
  computed: {
    ...mapState('devise', ['isCropping']),
    aspectRatio () {
      const size = this.activeImage.name;
      return this.sizes[size].w / this.sizes[size].h;
    }
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
    initializeCropper () {
      const image = this.$refs.croppingimage;

      new Cropper(image, {
        aspectRatio: this.aspectRatio,
        autoCropArea: 1,
        minContainerWidth: '100%',
        minContainerHeight: '100%',
        // crop (event) {
        // console.log(event.detail.x);
        // console.log(event.detail.y);
        // console.log(event.detail.width);
        // console.log(event.detail.height);
        // console.log(event.detail.rotate);
        // console.log(event.detail.scaleX);
        // console.log(event.detail.scaleY);
        // },
      });
    }
  }
}
</script>
