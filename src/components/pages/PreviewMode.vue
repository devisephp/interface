<template>
  <div
    class="dvs-relative dvs-cursor-pointer dvs-border-b dvs-border-admin-secondary-bg dvs-text-gray-200 dvs-transitions-hover-slow"
    @mouseenter="openPreviewSelector"
    @mouseleave="closePreviewSelector"
  >
    <div v-if="previewMode === 'desktop'" class="dvs-m-4 dvs-cursor-pointer">
      <desktop-icon w="25" h="25" />
    </div>
    <div v-if="previewMode === 'tablet'" class="dvs-m-4 dvs-cursor-pointer">
      <tablet-icon w="25" h="25" />
    </div>
    <div v-if="previewMode === 'mobile-portrait'" class="dvs-m-4 dvs-cursor-pointer">
      <phone-icon w="25" h="25" />
    </div>
    <div
      v-if="previewMode === 'mobile-landscape'"
      class="dvs-m-4 dvs-cursor-pointer"
      style="transform: rotate(90deg)"
    >
      <phone-icon w="25" h="25" />
    </div>
    <div
      ref="previewSelector"
      class="dvs-flex dvs-overflow-hidden dvs-flex-col dvs-rounded-sm dvs-absolute dvs-top-0 dvs-left-0 dvs-mt-2 dvs-ml-10 dvs-z-10 dvs-bg-gray-800"
    >
      <div
        class="dvs-p-3 dvs-cursor-pointer dvs-border-b dvs-border-admin-secondary-bg"
        @click="setPreviewMode('desktop')"
      >
        <desktop-icon w="20" h="20" />
      </div>
      <div
        class="dvs-p-3 dvs-cursor-pointer dvs-border-b dvs-border-admin-secondary-bg"
        @click="setPreviewMode('tablet')"
      >
        <tablet-icon w="20" h="20" />
      </div>
      <div
        class="dvs-p-3 dvs-cursor-pointer dvs-border-b dvs-border-admin-secondary-bg"
        @click="setPreviewMode('mobile-portrait')"
      >
        <phone-icon w="20" h="20" />
      </div>
      <div
        class="dvs-p-3 dvs-cursor-pointer"
        style="transform: rotate(90deg)"
        @click="setPreviewMode('mobile-landscape')"
      >
        <phone-icon w="20" h="20" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'DevisePreviewMode',

  components: {
    DesktopIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/MonitorIcon'),
    TabletIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/TabletIcon'),
    PhoneIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/SmartphoneIcon'),
  },

  data() {
    return {
      previewMode: 'desktop',
      previewSelector: null,
    };
  },
  mounted() {
    this.previewSelector = this.$refs.previewSelector;
    this.closePreviewSelector();
  },
  methods: {
    ...mapActions('devise', ['setPreviewModeInCurrentPage']),
    closePreviewSelector() {
      this.previewSelector.style.maxHeight = '0px';
    },
    openPreviewSelector() {
      this.previewSelector.style.maxHeight = '500px';
    },
    setPreviewMode(mode) {
      this.previewMode = mode;
      this.setPreviewModeInCurrentPage(mode);
    },
  },
};
</script>
