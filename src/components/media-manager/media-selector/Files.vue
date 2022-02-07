<template>
  <!-- Files -->
  <ul class="dvs-flex dvs-items-start dvs-justify-center dvs-flex-wrap">
    <li
      v-for="file in currentFiles"
      :key="file.id"
      class="dvs-relative dvs-bg-white"
      :class="{
        'dvs-cursor-pointer': !file.on,
        'dvs-p-0 dvs-mx-0 dvs-w-1/4 dvs-flex-grow': mode === 'thumbnails',
        'dvs-p-0 dvs-mb-4 dvs-mt-2': mode !== 'thumbnails',
        'dvs-mx-2 dvs-card': mode === 'contactSheet',
        'dvs-w-full': mode === 'list',
      }"
      :style="indexStyles"
      @click="openFile(file)"
    >
      <!-- Closed File -->
      <div class="dvs-overflow-hidden">
        <!-- Contact Sheet -->
        <div
          v-if="mode === 'contactSheet'"
          class="dvs-overflow-hidden dvs-text-center"
          style="width:100px;height:105px"
        >
          <img
            :src="`/styled/preview/${file.url}?w=100&h=100&fit=crop`"
            style="min-width:75px;height:75px"
          />
          <div class="dvs-text-xs dvs-font-bold dvs-px-2">{{ file.name }}</div>
        </div>

        <!-- Thumbnails Mode -->
        <div v-else-if="mode === 'thumbnails'" class="p-1 flex-grow">
          <div :style="`width:300px;height: 300px;`">
            <img :src="`${`/styled/preview/${file.url}?w=300&h=300&q=100&sharp=2`}`" />
          </div>
        </div>

        <!-- List Mode -->
        <div v-else class="dvs-w-full dvs-flex dvs-items-center">
          <img
            :src="`/styled/preview/${file.url}?w=100&h=100`"
            style="min-width:75px;height:75px"
          />
          <div class="dvs-px-4 dvs-font-bold">{{ file.name }}</div>
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
  computed: {
    indexStyles() {
      if (this.mode === 'thumbnails') {
        return { minWidth: '300px' };
      }
      return {};
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
