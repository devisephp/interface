<template>
  <span class="dvs-text-base">
    <div
      class="dvs-text-base dvs-flex dvs-rounded dvs-overflow-hidden"
      :class="{
        'dvs-text-admin-fg dvs-bg-admin-bg': subtle,
        'dvs-text-admin-highlight-fg dvs-bg-admin-highlight-bg': !subtle
      }"
      v-if="!compact"
    >
      <div class="dvs-text-admin-highlight-bg dvs-bg-admin-highlight-fg dvs-flex dvs-items-center dvs-justify-center dvs-px-4 dvs-text-xl ">
        <help-circle-icon></help-circle-icon>
      </div>

      <div class=" dvs-p-4 ">
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
    >
      <help-circle-icon></help-circle-icon>
      <div
        class="dvs-roman dvs-normal-case dvs-font-normal dvs-text-xl dvs-fixed dvs-pin-b dvs-pin-l dvs-ml-4 dvs-mb-4 dvs-z-30 dvs-text-admin-highlight-fg dvs-bg-admin-highlight-bg dvs-p-8 dvs-rounded dvs-shadow-lg"
        style="width:400px;"
        v-show="showHelp"
      >
        <p>
          <slot></slot>
        </p>
      </div>
    </span>
  </span>
</template>

<script>
export default {
  name: 'DeviseHelp',
  props: {
    compact: {
      type: Boolean,
      default: false
    },
    subtle: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showHelp: false
    }
  },
  components: {
    HelpCircleIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/HelpCircleIcon'),
  }
}
</script>
