<template>
  <div class="dvs-panel">
    <div class="dvs-panel-contents dvs-max-h-screenpad dvs-w-full" :style="panelStyle">
      <div class="dvs-flex dvs-items-start">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    panelStyle: {
      default: null,
      type: Object,
    },
  },
};
</script>
