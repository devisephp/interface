<template>
  <div class="dvs-p-4 dvs-flex dvs-flex-col dvs-justify-between dvs-items-between dvs-w-full dvs-border-box">
    <slice-diagram
      v-if="preview"
      class="dvs-mb-4"
      :file="file"
      :height-of-preview="200"
    ></slice-diagram>
    <div>
      <div class="dvs-cursor-pointer">{{ file.name }}</div>
      <div
        class="dvs-text-2xs dvs-mb-2 dvs-opacity-75"
        v-if="description"
      >{{description}}</div>
      <div
        class="dvs-text-xs dvs-flex dvs-items-align dvs-opacity-75"
        v-if="childSlot"
      >
        <information-circle-icon class="dvs-mr-1" />Can contain sub-slices
      </div>
      <div
        class="dvs-text-xs dvs-flex dvs-items-align dvs-opacity-75"
        v-if="database"
      >
        <cube-icon class="dvs-mr-1" />Database driven
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SliceDiagram from './SliceDiagram.vue';

export default {
  computed: {
    ...mapGetters('devise', ['componentFromView']),
    sliceComponent () {
      return this.componentFromView(this.file.value);
    },
    description () {
      if (this.sliceComponent && this.sliceComponent.description) {
        return this.sliceComponent.description;
      }
      return false;
    },
    childSlot () {
      if (this.sliceComponent) {
        return this.sliceComponent.has_child_slot;
      }
      return false;
    },
    database () {
      if (this.sliceComponent) {
        return this.sliceComponent.database;
      }
      return false;
    },
    preview () {
      if (this.sliceComponent && this.sliceComponent.preview) {
        return true;
      }

      return false;
    },
  },
  props: {
    file: {
      required: true,
      type: Object,
    },
  },
  components: {
    CubeIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/BoxIcon'),
    InformationCircleIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/InfoIcon'),
    SliceDiagram,
  },
};
</script>
