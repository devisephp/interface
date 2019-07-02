<template>
  <div class="dvs-flex dvs-flex-col dvs-items-stretch dvs-h-screen-90 dvs-overflow-hidden dvs-relative dvs-h">
    <div class="dvs-py-2 dvs-px-8 dvs-rounded-tl dvs-rounded-tr dvs-flex dvs-justify-between dvs-items-center dvs-bg-grey-lighter dvs-border-b dvs-border-lighter dvs-relative">Media Editor
      <div>
        <button
          class="dvs-btn dvs-mr-2"
          @click="done"
          :style="theme.actionButton"
        >Done</button>
        <button
          class="dvs-btn"
          @click="cancel"
          :style="theme.actionButtonGhost"
        >Cancel</button>
      </div>
    </div>
    <div
      class="dvs-flex dvs-items-stretch dvs-absolute dvs-pin"
      style="margin-top:58px"
      v-if="activeImage"
    >
      <media-thumbnails
        :defaultImage="defaultImage"
        :size-edits="sizeEdits"
        :encode-edits="encodeEdits"
        :active="active"
        @select="setActive"
        v-if="sizes && sizeEdits"
      ></media-thumbnails>

      <div
        class="dvs-flex-grow"
        v-bar
      >
        <div class="dvs-relative">
          <media-controls
            v-if="sizeEdits[activeImage.name]"
            :active-image="activeImage"
            v-model="sizeEdits[activeImage.name]"
            @selectsizeimage="selectSizeImage"
          ></media-controls>

          <media-editor-preview
            :sizes="sizes"
            :active-image="activeImage"
            :encode-edits="encodeEdits"
            @applycrop="applyCrop"
            @removecrop="removeCrop"
          ></media-editor-preview>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data () {
    return {
      active: 'original',
      defaultEdits: {
        q: 70,
        or: null,
        flip: null,
        fit: 'crop',
        bri: null,
        con: null,
        gam: null,
        sharp: 5,
        pixel: null,
        filt: null,
        bg: null,
        url: null,
        crop: null
      },
      sizeEdits: {},
      customSize: {
        w: null,
        h: null,
      },
      originalDims: {
        w: null,
        h: null,
      },
    };
  },
  mounted () {
    this.loadOriginalDimentions().then(() => {
      this.setInitialActive()
      this.loadImageSettings();
      this.setCustomSizeToOriginal();
    });
  },
  methods: {
    ...mapActions('devise', [
      'generateImages',
    ]),
    done () {
      this.generateAndSaveImages()
      // this.$emit('done');
    },
    cancel () {
      this.$emit('cancel');
    },
    setActive (selectedActive) {
      this.active = selectedActive
    },
    setInitialActive () {
      if (this.sizes) {
        const firstSize = Object.keys(this.sizes)[0];
        this.setActive(firstSize);
        return true;
      }
      this.setActive('original');
      return false;
    },
    loadOriginalDimentions () {
      const file = `/styled/preview/${this.defaultImage}`;
      const img = new Image();

      img.onerror = () => {
        alert(`not a valid file: ${file.type}`); // eslint-disable-line
      };

      img.src = file;
      return new Promise((resolve) => {
        img.onload = () => {
          this.$nextTick(() => {
            this.setOriginalDims(img)
            resolve(img)
          })
        }
      })
    },
    setOriginalDims (img) {
      this.originalDims.w = img.width;
      this.originalDims.h = img.height;

      this.setCustomSizeToOriginal();
    },
    setCustomSizeToOriginal () {
      this.customSize.w = this.originalDims.w;
      this.customSize.h = this.originalDims.h;
    },
    clean (obj) {
      for (const propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
          delete obj[propName];
        } else if (propName === 'bg') {
          obj[propName] = obj[propName].substring(1);
        }
      }

      if (this.customSize.w && this.customSize.h) {
        obj.w = this.customSize.w;
        obj.h = this.customSize.h;
      }

      return obj;
    },

    setImage (file) {
      this.sizeEdits[this.active].url = file.url
    },

    generateAndSaveImages () {
      return new Promise((resolve, reject) => {
        window.deviseSettings.$bus.$emit('showLoadScreen', 'Images being generated');

        this.generateImages({ defaultImage: this.defaultImage, sizes: this.sizeEdits }).then(response => {
          this.$emit('generatedImages')
          return true;
        }).then(() => {
          window.deviseSettings.$bus.$emit('hideLoadScreen');
        }, (error) => {
          window.deviseSettings.$bus.$emit('hideLoadScreen');
        });
      })
    },
    loadImageSettings () {
      Object.entries(this.sizes).forEach(([name, size]) => {
        this.$set(this.sizeEdits, name, {})
        this.sizeEdits[name] = Object.assign({}, this.defaultEdits, this.imageSettings[name])
        this.sizeEdits[name].w = size.w
        this.sizeEdits[name].h = size.h
        if (!this.sizeEdits[name].url) {
          this.sizeEdits[name].url = this.defaultImage
        }
      })
    },
    selectSizeImage () {
      this.$emit('selectsizeimage', this.active)
    },
    applyCrop (cropSettings) {
      this.$set(this.sizeEdits[this.activeImage.name], 'crop', {
        w: cropSettings.width,
        h: cropSettings.height,
        x: cropSettings.x,
        y: cropSettings.y,
      })
    },
    removeCrop () {
      this.$set(this.sizeEdits[this.activeImage.name], 'crop', null)
    },
    encodeEdits (size) {
      let encodedString = '';

      for (const property in this.sizeEdits[size]) {
        if (this.sizeEdits[size][property] !== null) {
          if (encodedString !== '') {
            encodedString += '&';
          }

          let propertyValue = this.sizeEdits[size][property];

          // Chop off the hash for Glide
          if (property === 'bg') {
            propertyValue = propertyValue.substring(1);
          }

          if (property === 'crop') {
            propertyValue = `${propertyValue.w},${propertyValue.h},${propertyValue.x},${propertyValue.y}`;
          }

          encodedString += `${property}=${propertyValue}`;
        }
      }

      return encodedString;
    },
  },
  computed: {
    activeImage () {
      if (this.active !== 'original') {
        return {
          url: `/styled/preview/${this.sizeEdits[this.active].url}?${this.encodeEdits(this.active)}`,
          name: `${this.active}`,
          sizeLabel: `(${this.sizes[this.active].w}x${this.sizes[this.active].h})`
        }
      }
      return {
        url: `/styled/preview/${this.defaultImage}`,
        name: 'Original'
      }
    },
    sizeEditsSummary () {
      return 'blammo'
    }
  },
  props: {
    defaultImage: {
      type: String,
      required: true,
    },
    sizes: {
      type: Object,
      required: false,
    },
    imageSettings: {
      type: Object,
      required: false,
    },
  },
  components: {
    MediaControls: () => import(/* webpackChunkName: "devise-media" */ './MediaControls'),
    MediaThumbnails: () => import(/* webpackChunkName: "devise-media" */ './MediaThumbnails'),
    MediaEditorPreview: () => import(/* webpackChunkName: "devise-media" */ './MediaEditorPreview'),
  },
};
</script>
