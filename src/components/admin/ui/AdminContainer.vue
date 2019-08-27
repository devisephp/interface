<template>
  <div class="dvs-relative dvs-w-full dvs-flex dvs-justify-center dvs-items-start dvs-mt-10">
    <div class="dvs-z-10 dvs-bg-white dvs-text-admin-bg dvs-max-w-1/3 dvs-rounded-lg dvs-shadow-xl dvs-absolute dvs-pin-t dvs--mt-10 dvs-px-8 dvs-py-4 dvs-font-light dvs-text-center dvs-leading-tight dvs-text-sm dvs-pointer-events-auto">
      <slot name="message"></slot>
    </div>
    <div class="dvs-relative dvs-bg-admin-bg dvs-rounded dvs-shadow-lg dvs-max-w-3/4 dvs-min-w-1/2 dvs-py-10 dvs-pointer-events-auto">
      <vue-scrollbar
        ref="Scrollbar"
        class=" dvs-px-10"
        :style="{maxHeight: `${maxHeight}px`}"
      >
        <slot name="content"></slot>
      </vue-scrollbar>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DeviseAdminContainer',
  data () {
    return {
      maxHeight: 300
    }
  },
  mounted () {
    const windowHeight = window.innerHeight;
    this.maxHeight = windowHeight * 0.7;

    window.deviseSettings.$bus.$on('dvs-admin-container-content-changed', () => {
      this.$nextTick(() => {
        if (typeof this.$refs.Scrollbar !== 'undefined') {
          this.$refs.Scrollbar.calculateSize()
          this.$refs.Scrollbar.scrollToY(0)
        }
      })
    });
  }
}
</script>