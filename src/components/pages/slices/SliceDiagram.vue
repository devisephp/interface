<template>
  <!-- eslint-disable vue/no-v-html -->
  <div>
    <div
      class="dvs-relative dvs-w-full dvs-rounded-sm dvs-overflow-hidden dvs-bg-gray-700 dvs-text-gray-600"
      style="height: 250px"
    >
      <div class="dvs-absolute dvs-z-0 dvs-inset-0 dvs-flex dvs-items-center dvs-justify-center">
        <svg
          v-if="!loaded"
          class="w-16 h-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          ></path>
        </svg>
      </div>

      <img
        class="dvs-relative dvs-z-10 dvs-w-full dvs-h-full dvs-object-contain dvs-transition-opacity dvs-duration-1000"
        :class="{
          'dvs-opacity-0': !loaded,
          'dvs-opacity-100': loaded,
        }"
        :src="`${thumbnailBase}/${sliceComponent.name}.png`"
        alt="Preview Image"
        @load="loaded = true"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    sliceComponent: {
      type: Object,
      required: true,
    },
    thumbnailBase: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      loaded: false,
    };
  },

  computed: {
    ...mapGetters('devise', ['componentFromView']),
  },
};
</script>
