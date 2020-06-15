<template>
  <div class="dvs-fixed dvs-inset-0 dvs-flex dvs-justify-center dvs-items-center">
    <div class="dvs-blocker dvs-fixed dvs-inset-0" @click="close"></div>
    <div class="dvs-z-50 dvs-min-w-2/3 dvs-max-h-screen">
      <panel class="dvs-w-full">
        <div class="dvs-p-8">
          <div
            class="dvs-absolute dvs-top-0 dvs-right-0 dvs-mt-4 dvs-mr-8 dvs-cursor-pointer z-10"
            @click="close"
          >
            <close-icon w="40" h="40" class="dvs-text-admin-fg" />
          </div>
          <slot></slot>
        </div>
      </panel>
    </div>
  </div>
</template>

<script>
import Panel from './Panel.vue';

export default {
  components: {
    CloseIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/XIcon'),
    Panel,
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>
