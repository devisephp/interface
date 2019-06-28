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
    >
      <media-thumbnails
        :primaryFile="primaryFile"
        :encoded-edits="encodedEdits"
        :sizes="sizes"
        :encodedSize="encodedSize"
        :active="active"
        @select="setActive"
        v-if="sizes"
      ></media-thumbnails>

      <div
        class="dvs-flex-grow"
        v-bar
      >
        <div class="dvs-relative">
          <media-controls
            :active-image="activeImage"
            v-model="sizeEdits"
            @selectsizeimage="selectSizeImage()"
          ></media-controls>

          <media-editor-preview
            :sizes="sizes"
            :active-image="activeImage"
            :encodedSize="encodedSize"
          ></media-editor-preview>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
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
      // this.loadImageSettings();
      this.setCustomSizeToOriginal();
    });
  },
  methods: {
    done () {
      this.$emit('done');
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
      const file = `/styled/preview/${this.primaryFile}`;
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
    encodedSize (size) {
      let encodedString = '';
      if (this.encodedEdits.length > 0) {
        encodedString += '&';
      }

      return `${encodedString}w=${size.w}&h=${size.h}`;
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
    // loadImageSettings () {
    //   Object.entries(this.sizes).forEach(([name, size]) => {
    //     this.sizeEdits[name] = Object.assign({}, this.defaultEdits, this.imageSettings[name])
    //     this.sizeEdits[name].w = size.w
    //     this.sizeEdits[name].h = size.h
    //     if (this.sizeEdits[name].url === null) {
    //       this.sizeEdits[name].url = this.primaryFile
    //     }
    //   })
    // },
    selectSizeImage () {
      this.$emit('selectsizeimage')
    }
  },
  computed: {
    // Primary model
    imageSettings: {
      get () {
        return this.value
      },
      set () {
        const sizeEdits = Object.assign({}, this.sizeEdits);
        const cleanEdits = this.clean(sizeEdits);

        this.$emit('input', cleanEdits)
      }
    },
    activeImage () {
      if (this.active !== 'original') {
        return {
          url: `/styled/preview/${this.primaryFile}?${this.encodedEdits}${this.encodedSize(this.sizes[this.active])}`,
          name: `${this.active}`,
          sizeLabel: `(${this.sizes[this.active].w}x${this.sizes[this.active].h})`
        }
      }
      return {
        url: `/styled/preview/${this.primaryFile}`,
        name: 'Original'
      }
    },
    encodedEdits () {
      let encodedString = '';

      for (const property in this.sizeEdits) {
        if (this.sizeEdits[property] !== null) {
          if (encodedString !== '') {
            encodedString += '&';
          }

          let propertyValue = this.sizeEdits[property];

          // Chop off the hash for Glide
          if (property === 'bg') {
            propertyValue = propertyValue.substring(1);
          }

          encodedString += `${property}=${propertyValue}`;
        }
      }

      return encodedString;
    },
  },
  props: {
    primaryFile: {
      type: String,
      required: true,
    },
    sizes: {
      type: Object,
      required: false,
    },
    value: {
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
