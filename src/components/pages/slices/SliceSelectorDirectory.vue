<template>
  <div v-if="currentDirectoryFiles.length > 0" class="dvs-mb-8 dvs-w-full dvs-text-admin-fg">
    <div class="dvs-uppercase dvs-text-sm dvs-ml-2 dvs-mb-2 dvs-w-full dvs-pb-2 dvs-opacity-75">
      {{ name }}
    </div>
    <div class="dvs-grid dvs-grid-cols-3">
      <div
        v-for="(file, key) in currentDirectoryFiles"
        :key="key"
        class="dvs-cursor-pointer dvs-mb-1 dvs-p-2 dvs-flex"
        @click="toggleSelectSlice(file)"
      >
        <div
          class="dvs-w-full dvs-flex dvs-flex-col dvs-h-full dvs-shadow dvs-rounded"
          :class="isSelected(file)"
        >
          <slice-selector-slice :file="file" class="dvs-mr-4"></slice-selector-slice>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SliceSelectorSlice from './SliceSelectorSlice.vue';

export default {
  name: 'DeviseSliceSelectorDirectory',

  components: {
    SliceSelectorSlice,
  },

  props: {
    directory: {
      required: true,
      type: Object,
    },
    value: {
      type: Object,
      default: () => {},
    },
    allowedViews: {
      type: Array,
      default: null,
    },
  },

  computed: {
    ...mapGetters('devise', ['componentFromView']),
    currentDirectoryFiles() {
      if (this.allowedViews && this.allowedViews.length) {
        return this.directory.files.filter((file) => {
          return this.allowedViews.includes(file.value);
        });
      }
      return this.directory.files;
    },
    name() {
      return this.directory.path.trim().replace('.', ' ');
    },
  },

  methods: {
    isSelected(file) {
      if (this.value !== null) {
        if (file.value === this.value.value) {
          return ['dvs-bg-admin-highlight-bg dvs-text-admin-highlight-fg'];
        }
      }

      return ['dvs-bg-admin-fg dvs-text-admin-bg'];
    },
    toggleSelectSlice(slice) {
      if (!this.value || slice.value !== this.value.value) {
        this.$emit('input', slice);
      } else {
        this.$emit('input', null);
      }
    },
  },
};
</script>
