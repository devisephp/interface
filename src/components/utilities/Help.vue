<template>
  <span class="dvs-text-base">
    <div
      v-if="!compact"
      class="dvs-text-base dvs-flex dvs-rounded dvs-overflow-hidden"
      :class="{
        'dvs-text-gray-200 dvs-bg-gray-800': subtle,
        'dvs-text-admin-highlight-fg dvs-bg-admin-highlight-bg': !subtle,
      }"
    >
      <div
        class="dvs-text-admin-highlight-bg dvs-bg-admin-highlight-fg dvs-flex dvs-items-center dvs-justify-center dvs-px-4 dvs-text-xl"
      >
        <help-circle-icon></help-circle-icon>
      </div>

      <div class="dvs-p-4">
        <p>
          <slot></slot>
        </p>
      </div>
    </div>
    <span
      v-else
      class="relative"
      @mouseenter="showHelp = true"
      @mouseleave="showHelp = false"
      @click="toggleKeepHelp"
    >
      <span class="dvs-cursor-pointer" :class="{ 'dvs-text-admin-highlight-bg': keepHelp }">
        <help-circle-icon></help-circle-icon>
      </span>
      <div
        v-show="showHelp || keepHelp"
        class="dvs-not-italic dvs-normal-case dvs-font-normal dvs-text-xl dvs-fixed dvs-bottom-0 dvs-left-0 dvs-ml-4 dvs-mb-4 dvs-z-30 dvs-text-admin-highlight-fg dvs-bg-admin-highlight-bg dvs-p-8 dvs-rounded dvs-shadow-lg"
        style="width: 400px"
      >
        <p>
          <slot></slot>
        </p>
        <div class="dvs-text-xs">
          <strong>Note</strong> You can keep this window up by clicking on the hint you are mousing
          over
        </div>
      </div>
    </span>
  </span>
</template>

<script>
export default {
  name: 'DeviseHelp',
  components: {
    HelpCircleIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/HelpCircleIcon'),
  },
  props: {
    compact: {
      type: Boolean,
      default: false,
    },
    subtle: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showHelp: false,
      keepHelp: false,
    };
  },
  methods: {
    toggleKeepHelp() {
      this.keepHelp = !this.keepHelp;
    },
  },
};
</script>
