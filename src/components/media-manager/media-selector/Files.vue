<template>
  <!-- Files -->
  <ul
    class="dvs-items-start dvs-justify-center grid"
    :class="{
      'lg:dvs-grid-cols-2  xl:dvs-grid-cols-3 dvs-gap-8': mode === 'thumbnails',
      'dvs-grid-cols-2 md:dvs-grid-cols-4 lg:dvs-grid-cols-6 xl:dvs-grid-cols-8 2xl:dvs-grid-cols-12 dvs-gap-6':
        mode === 'contactSheet',
      'lg:dvs-grid-cols-2 dvs-gap-6': mode === 'list',
    }"
  >
    <li
      v-for="file in currentFiles"
      :key="file.id"
      class="dvs-relative dvs-bg-white dvs-h-full dvs-w-full"
      :class="{
        'dvs-cursor-pointer': !file.on,
        'dvs-w-full': mode === 'list',
      }"
      @click="openFile(file)"
    >
      <!-- Closed File -->
      <div class="dvs-overflow-hidden dvs-w-full dvs-h-full dvs-rounded">
        <!-- Contact Sheet -->
        <div v-if="mode === 'contactSheet'">
          <div class="dvs-overflow-hidden dvs-rounded dvs-h-full dvs-w-full">
            <img
              :src="`/styled/preview/${file.url}?w=200&h=200&fit=crop`"
              style="min-width: 100px; height: 100px"
              class="dvs-object-cover dvs-object-center dvs-w-full dvs-h-full"
            />
          </div>
        </div>

        <!-- Thumbnails Mode -->
        <img
          v-else-if="mode === 'thumbnails'"
          :src="`${`/styled/preview/${file.url}?w=300&h=300&q=100&sharp=2`}`"
          class="dvs-object-cover dvs-object-center dvs-w-full dvs-h-full"
        />

        <!-- List Mode -->
        <div v-else class="dvs-flex dvs-items-center dvs-mt-6">
          <div class="dvs-overflow-hidden dvs-rounded dvs-w-1/3" style="height: 100px">
            <img
              :src="`/styled/preview/${file.url}?w=100&h=100`"
              class="dvs-object-cover dvs-object-center dvs-w-full dvs-h-full"
            />
          </div>
          <div class="dvs-px-4 dvs-font-bold dvs-w-1/2">{{ file.name }}</div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'DeviseMediaSelectorFiles',
  props: {
    currentFiles: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Object | Array,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
  },
  methods: {
    openFile(file) {
      this.$emit('openFile', file);
    },
    selectSourceFile(file) {
      this.$emit('selectedfile', file);
    },
  },
};
</script>

<style lang="scss" scoped></style>
