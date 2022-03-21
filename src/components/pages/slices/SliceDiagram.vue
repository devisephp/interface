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
        :src="`storage/slice-previews/${sliceComponent.name}.png`"
        alt="Preview Image"
        @load="loaded = true"
        @click="zoom = true"
      />
    </div>

    <div v-if="loaded && zoom" class="dvs-fixed dvs-inset-0 dvs-z-9999">
      <div
        class="dvs-absolute dvs-inset-0 dvs-backdrop-blur dvs-flex dvs-justify-center dvs-items-center"
        @click="zoom = false"
      >
        <div style="height: 500px; width: 500px">
          <img
            :src="`storage/slice-previews/${sliceComponent.name}.png`"
            alt="Preview Image"
            width="500"
            height="500"
            class="dvs-w-full dvs-h-full dvs-object-contain rounded-lg"
          />
        </div>
      </div>
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
  },

  data() {
    return {
      zoom: false,
      loaded: false,
    };
  },

  computed: {
    ...mapGetters('devise', ['componentFromView']),
  },
};
</script>
