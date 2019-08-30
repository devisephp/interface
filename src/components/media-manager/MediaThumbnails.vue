<template>
  <div
    class="dvs-border-r dvs-border-lighter dvs-bg-grey dvs-p-2 dvs-py-4 "
    style="width:118px;min-width:118px;"
  >
    <div>
      <div class="dvs-flex dvs-flex-col">
        <div
          v-for="(size, key) in sizeEdits"
          :key="key"
          class="dvs-text-center dvs-cursor-pointer dvs-mb-3 dvs-rounded"
          style="width:100px"
          :class="{
            'dvs-bg-black dvs-text-grey-light': active === key,
            'dvs-bg-grey-light': active !== key
          }"
        >
          <div
            class=" dvs-relative"
            v-if="getWarning(key)"
            @click="showWarning = key"
          >
            <div class="dvs-absolute dvs-pin-t dvs-pin-r dvs-rounded-full dvs-p-2 dvs-flex dvs-justify-center dvs-items-center dvs-text-xs dvs-mr-1 dvs-mt-1 dvs-btn-sm dvs-btn-primary">
              <alert-triangle-icon></alert-triangle-icon>
            </div>
          </div>

          <transition
            name="dvs-fade"
            v-if="getWarning(key)"
          >
            <devise-modal
              @close="showWarning = false"
              class="dvs-z-50 dvs-mx-16"
              v-if="showWarning === key"
            >
              <h4 class="dvs-mb-4">Warning</h4>

              <div
                class="dvs-mb-8"
                v-html="getWarning(key)"
              ></div>

              <button
                class="dvs-btn dvs-btn-sm dvs-btn-primary"
                @click="showWarning = false"
              >Got It</button>
            </devise-modal>
          </transition>

          <div
            class="dvs-overflow-hidden dvs-rounded-t dvs-flex dvs-justify-center dvs-items-center dvs-bg-white"
            style="width:100px;height:100px;line-height:0px;"
            @click="setActive(key)"
          >
            <transition name="dvs-fade">
              <img
                :src="`/styled/preview/${size.url}?${encodeEdits(key)}`"
                @load="loaded = true"
                v-show="loaded"
              >
            </transition>

            <loading-screen
              v-show="!loaded"
              :inline="true"
              inline-message="Loading Image"
            ></loading-screen>

          </div>

          <div
            class="dvs-pb-3 dvs-pt-2 dvs-uppercase dvs-w-full"
            @click="setActive(key)"
          >
            <div class="dvs-font-bold dvs-text-xs dvs-mb-1">{{ key }} </div>
            <div class="dvs-text-2xs">({{ size.w }}x{{ size.h }})</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MediaEditorThumbnails',
  props: {
    defaultImage: {
      type: String,
      required: true
    },
    sizeEdits: {
      type: Object,
      required: true
    },
    sizes: {
      type: Object
    },
    encodeEdits: {
      type: Function,
      required: true
    },
    active: {
      type: String,
      required: true
    },
  },
  components: {
    DeviseModal: () => import(/* webpackChunkName: "devise-utilities" */ '../utilities/Modal'),
    LoadingScreen: () =>
      import(/* webpackChunkName: "devise-utilities" */ '../utilities/LoadingScreen.vue'),
    AlertTriangleIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/AlertTriangleIcon'),
  },
  data () {
    return {
      showWarning: false,
      loaded: false,
    }
  },
  methods: {
    getWarning (name) {
      if (this.sizes) {
        const { warning } = this.sizes[name]

        if (warning) {
          if (typeof warning === 'boolean') {
            return '<div class="dvs-flex dvs-flex-col dvs-align-center"><div style="max-width:300px"><p>This image may be presented in a way that this editor cannot clearly represent. Commonly, your developer has placed this warning because however you crop / size this image it will be used as a background image which may need to cover a particular area thereby "hiding" parts of the image.</p></div><p><img src="/devise/img/image-overflow-example.png"></div>'
          }
          return warning
        }
      }
      return false
    },
    setActive (activeSelection) {
      this.$emit('select', activeSelection)
    },
  },

}
</script>