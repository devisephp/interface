<template>
  <div class="dvs-relative dvs-w-full dvs-flex dvs-justify-center dvs-items-start dvs-mt-10">
    <div
      class="dvs-z-[9999] dvs-bg-white dvs-text-gray-800 dvs-max-w-2xl dvs-w-1/2 dvs-rounded-lg dvs-shadow-xl dvs-absolute dvs-inset-0-t dvs--mt-10 dvs-px-8 dvs-py-4 dvs-font-light dvs-text-center dvs-leading-tight dvs-text-sm dvs-pointer-events-auto"
    >
      <slot name="message"></slot>
    </div>
    <div
      class="dvs-relative dvs-z-[9998] dvs-bg-gray-800 dvs-rounded dvs-shadow-lg dvs-max-w-5xl dvs-min-w-1/2 dvs-w-full dvs-py-10 dvs-px-16 dvs-mx-8 dvs-pointer-events-auto dvs-overflow-y-scroll"
      style="max-height: 70vh; min-width: 800px"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeviseAdminContainer',
  data() {
    return {
      maxHeight: 300,
    };
  },
  mounted() {
    const windowHeight = window.innerHeight;
    this.maxHeight = windowHeight * 0.7;

    window.deviseSettings.$bus.$on('dvs-admin-container-content-changed', () => {
      this.$nextTick(() => {
        if (typeof this.$refs.Scrollbar !== 'undefined') {
          this.$refs.Scrollbar.calculateSize();
          this.$refs.Scrollbar.scrollToY(0);
        }
      });
    });
  },
};
</script>
