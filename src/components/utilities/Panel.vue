<template>
  <div class="dvs-panel">
    <div
      class="dvs-panel-contents dvs-max-h-screenpad dvs-overflow-hidden dvs-w-full dvs-pointer-events-none"
      :style="panelStyle"
    >
      <div class="dvs-flex dvs-items-start dvs-pointer-events-none">
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
