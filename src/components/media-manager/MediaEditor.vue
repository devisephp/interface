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
        :sizes="sizes"
        :encode-edits="encodeEdits"
        :active="active"
        @select="setActive"
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
            @settooriginal="setCustomSizeToOriginal"
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
        crop: null,
        w: null,
        h: null,
        originalw: null,
        originalh: null
      },
      sizeEdits: {},
      originalDims: {
        w: null,
        h: null,
      },
    };
  },
  mounted () {
    this.setInitialActive()
    this.loadImageSettings();
  },
  methods: {
    ...mapActions('devise', [
      'generateImages',
    ]),
    done () {
      this.generateAndSaveImages().then(() => {
        this.$emit('done');
      })
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

      this.setActive('custom');
      return false;
    },
    getOriginalDimentions () {
      const file = `/styled/preview/${this.defaultImage}`;
      const img = new Image();

      img.onerror = () => {
        alert(`not a valid file: ${file.type}`); // eslint-disable-line
      };

      img.src = file;
      return new Promise((resolve) => {
        img.onload = () => {
          this.$nextTick(() => {
            resolve(img)
          })
        }
      })
    },
    setCustomSizeToOriginal () {
      const activeImage = this.sizeEdits[this.active]
      activeImage.w = activeImage.originalw;
      activeImage.h = activeImage.originalh;
    },
    clean (obj) {
      for (const propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
          delete obj[propName];
        } else if (propName === 'bg') {
          obj[propName] = obj[propName].substring(1);
        }
      }

      return obj;
    },

    setImage (file) {
      this.sizeEdits[this.active].url = file.url
    },

    generateAndSaveImages () {
      return new Promise(() => {
        window.deviseSettings.$bus.$emit('showLoadScreen', 'Images being generated');

        this.generateImages({ defaultImage: this.defaultImage, sizes: this.sizeEdits }).then(() => {
          this.$emit('generatedImages')
          return true;
        }).then(() => {
          window.deviseSettings.$bus.$emit('hideLoadScreen');
        }, () => {
          window.deviseSettings.$bus.$emit('hideLoadScreen');
        });
      })
    },
    loadImageSettings () {
      if (this.sizes) {
        Object.entries(this.sizes).forEach(([name, size]) => {
          if (name !== 'custom') {
            this.createSizeEdit(name, size)
          }
        })
      } else {
        this.createSizeEdit('custom')
      }
    },
    createSizeEdit (name, size) {
      // Create the size
      this.$set(this.sizeEdits, name, {})

      // Set the defaults and override those with anything loaded from the database
      this.sizeEdits[name] = Object.assign({}, this.defaultEdits, this.imageSettings[name])

      // If there is no url use the default image
      if (!this.sizeEdits[name].url) {
        this.sizeEdits[name].url = this.defaultImage
      }

      // If there is a size specified by the slice then use that for the initial
      // size but only if there isn't a size set already by the database
      if (size) {
        if (this.sizeEdits[name].w === null || !this.sizeEdits[name].h === null) {
          this.sizeEdits[name].w = size.w
          this.sizeEdits[name].h = size.h
        }
        this.sizeEdits[name].originalw = size.w
        this.sizeEdits[name].originalh = size.h
        // If there is no size we know it's non-slice set size - probably a custom
        // from the admin. Let's get the sizes from the selected image and populate
        // those if they aren't already loaded from the db.
      } else if (this.sizeEdits[name].w === null || !this.sizeEdits[name].h === null) {
        this.getOriginalDimentions().then(img => {
          this.sizeEdits[name].w = img.width
          this.sizeEdits[name].h = img.height
          this.sizeEdits[name].originalw = img.width
          this.sizeEdits[name].originalh = img.height
        })
      }
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

      // eslint-disable-next-line guard-for-in
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
      if (this.active && typeof this.sizeEdits !== 'undefined' && this.sizeEdits[this.active]) {
        return {
          url: `/styled/preview/${this.sizeEdits[this.active].url}?${this.encodeEdits(this.active)}`,
          baseImageUrl: `/styled/preview/${this.sizeEdits[this.active].url}`,
          name: `${this.active}`,
          sizeLabel: `(${this.sizeEdits[this.active].w}x${this.sizeEdits[this.active].h})`
        }
      }
      return {
        url: `/styled/preview/${this.defaultImage}`,
        name: 'Original'
      }
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
