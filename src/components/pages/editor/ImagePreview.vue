<template>
  <div
    v-if="image"
    class="dvs-text-2xs"
  >
    <div
      class="dvs-bg-cover dvs-bg-center dvs-mb-2"
      :style="{width: `100px`, height: `100px`, backgroundImage: `url(${image.src})`}"
    ></div>
    <div class="dvs-text-lg dvs-font-bold dvs-mb-1">{{ formattedName }}</div>
    <div class="mb-1">{{ dimensions }}</div>
    {{ formattedFilesize }}
  </div>
</template>

<script>
import filesize from 'filesize'

export default {
  props: {
    src: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      image: null,
      width: null,
      height: null,
      filesize: null
    }
  },
  computed: {
    dimensions () {
      return `${this.width} x ${this.height}`;
    },
    formattedFilesize () {
      return filesize(this.filesize)
    },
    formattedName () {
      if (this.name === "orig_optimized") {
        return "optimized"
      }
      return this.name
    }
  },
  watch: {
    src () {
      this.initialize()
    }
  },
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
      this.loadImage()
      this.getFileSize()
    },
    getImage (path) {
      const img = new Image();
      img.src = path

      this.loadImage(img).then(() => {
        return img
      })
    },
    loadImage () {
      this.image = new Image();
      this.image.src = this.src;

      this.image.onload = () => {
        this.$nextTick(() => {
          this.getDimensions()
        })
      }
    },
    getDimensions () {
      this.width = this.image.naturalWidth
      this.height = this.image.naturalHeight
    },
    getFileSize () {
      const xhr = new XMLHttpRequest();
      xhr.open('HEAD', this.src, true);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            this.filesize = xhr.getResponseHeader('Content-Length')
          }
        }
      };
      xhr.send(null);
    }
  }
}
</script>
