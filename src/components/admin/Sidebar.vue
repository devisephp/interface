<template>
  <div
    id="dvs-admin-sidebar"
    :style="{
    borderColor:theme.panelCard.background, 
    background:theme.panelCard.background
  }"
  >
    <scrollactive
      :offset="80"
      :duration="800"
      bezier-easing-value=".5,0,.35,1"
      scroll-container-selector="#dvs-admin-content-container .simplebar-scroll-content"
      id="dvs-menu"
    >
      <button
        class="dvs-btn dvs-btn-zero dvs-btn-text dvs-mb-8"
        :style="{color: theme.actionButtonGhost.color}"
        @click="historyBack"
      >Back</button>

      <slot></slot>
    </scrollactive>
  </div>
</template>

<script>
import AdministrationMixin from './../../mixins/Administration';
export default {
  mixins: [AdministrationMixin]
};
</script>
