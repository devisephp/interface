<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    class="dvs-border-r dvs-border-lighter dvs-bg-gray-200 dvs-p-2 dvs-py-4 dvs-flex-none"
    style="width: 125px"
  >
    <div>
      <div class="dvs-flex dvs-flex-col">
        <div
          v-for="(size, key) in sizeEdits"
          :key="key"
          class="dvs-text-center dvs-cursor-pointer dvs-mb-3 dvs-rounded"
          style="width: 100px"
          :class="{
            'dvs-bg-black dvs-text-gray-400': active === key,
            'dvs-bg-gray-400': active !== key,
          }"
        >
          <div v-if="getWarning(key)" class="dvs-relative" @click="showWarning = key">
            <div
              class="dvs-absolute dvs-top-0 dvs-right-0 dvs-rounded-full dvs-p-2 dvs-flex dvs-justify-center dvs-items-center dvs-text-xs dvs-mr-1 dvs-mt-1 dvs-btn-sm dvs-btn-primary"
            >
              <alert-triangle-icon></alert-triangle-icon>
            </div>
          </div>

          <transition v-if="getWarning(key)" name="dvs-fade">
            <devise-modal
              v-if="showWarning === key"
              class="dvs-z-50 dvs-mx-16"
              @close="showWarning = false"
            >
              <h4 class="dvs-mb-4">Warning</h4>

              <div class="dvs-mb-8" v-html="getWarning(key)"></div>

              <button class="dvs-btn dvs-btn-sm dvs-btn-primary" @click="showWarning = false">
                Got It
              </button>
            </devise-modal>
          </transition>

          <div
            class="dvs-overflow-hidden dvs-rounded-t dvs-flex dvs-justify-center dvs-items-center dvs-bg-white"
            style="width: 100px; height: 100px; line-height: 0px"
            @click="setActive(key)"
          >
            <transition name="dvs-fade">
              <img
                v-show="loaded"
                :src="`/styled/preview/${size.url}?${encodeEdits(key)}`"
                @load="loaded = true"
              />
            </transition>

            <loading-screen
              v-show="!loaded"
              :inline="true"
              inline-message="Loading Image"
            ></loading-screen>
          </div>

          <div class="dvs-pb-3 dvs-pt-2 dvs-uppercase dvs-w-full" @click="setActive(key)">
            <div class="dvs-font-bold dvs-text-xs dvs-mb-1">{{ key }}</div>
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
  components: {
    DeviseModal: () => import(/* webpackChunkName: "devise-utilities" */ '../utilities/Modal'),
    LoadingScreen: () =>
      import(/* webpackChunkName: "devise-utilities" */ '../utilities/LoadingScreen.vue'),
    AlertTriangleIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/AlertTriangleIcon'),
  },
  props: {
    defaultImage: {
      type: String,
      required: true,
    },
    sizeEdits: {
      type: Object,
      required: true,
    },
    sizes: {
      type: Object,
      default: null,
    },
    encodeEdits: {
      type: Function,
      required: true,
    },
    active: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showWarning: false,
      loaded: false,
    };
  },
  methods: {
    getWarning(name) {
      if (this.sizes) {
        const { warning } = this.sizes[name];

        if (warning) {
          if (typeof warning === 'boolean') {
            return '<div class="dvs-flex dvs-flex-col dvs-align-center"><div style="max-width:300px"><p>This image may be presented in a way that this editor cannot clearly represent. Commonly, your developer has placed this warning because however you crop / size this image it will be used as a background image which may need to cover a particular area thereby "hiding" parts of the image.</p></div><p><img src="/devise/img/image-overflow-example.png"></div>';
          }
          return warning;
        }
      }
      return false;
    },
    setActive(activeSelection) {
      this.$emit('select', activeSelection);
    },
  },
};
</script>
