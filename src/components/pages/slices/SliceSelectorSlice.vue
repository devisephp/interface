<template>
  <div class="dvs-flex dvs-flex-col dvs-justify-between dvs-w-full dvs-bg-gray-700 dvs-border-box">
    <slice-diagram
      :slice-component="sliceComponent"
      :thumbnail-base="thumbnailBase"
    ></slice-diagram>
    <div
      class="dvs-flex dvs-flex-col dvs-justify-between dvs-p-4 dvs-bg-gray-500 dvs-text-gray-100"
    >
      <div class="dvs-cursor-pointer dvs-text-sm dvs-font-bold">{{ file.name }}</div>
      <div class="flex-none">
        <div class="dvs-text-2xs dvs-mb-2 dvs-opacity-75">
          {{ description ? description : 'No description' }}
        </div>
        <div v-if="childSlot" class="dvs-text-xs dvs-flex dvs-items-align dvs-opacity-75">
          <information-circle-icon class="dvs-mr-1" />Can contain sub-slices
        </div>
        <div v-if="database" class="dvs-text-xs dvs-flex dvs-items-align dvs-opacity-75">
          <cube-icon class="dvs-mr-1" />Database driven
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SliceDiagram from './SliceDiagram.vue';

export default {
  name: 'DeviseSliceSelectorSlice',

  components: {
    CubeIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/BoxIcon'),
    InformationCircleIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/InfoIcon'),
    SliceDiagram,
  },

  props: {
    file: {
      required: true,
      type: Object,
    },
    thumbnailBase: {
      type: String,
      default: null,
    },
  },

  computed: {
    ...mapGetters('devise', ['componentFromView']),
    sliceComponent() {
      return this.componentFromView(this.file.value);
    },
    description() {
      if (this.sliceComponent && this.sliceComponent.description) {
        return this.sliceComponent.description;
      }
      return false;
    },
    childSlot() {
      if (this.sliceComponent) {
        return this.sliceComponent.has_child_slot;
      }
      return false;
    },
    database() {
      if (this.sliceComponent) {
        return this.sliceComponent.database;
      }
      return false;
    },
    preview() {
      if (this.sliceComponent && this.sliceComponent.preview) {
        return true;
      }

      return false;
    },
  },
};
</script>
