<template>
  <div
    class="dvs-border-r dvs-border-lighter dvs-bg-grey dvs-p-2 dvs-py-4 "
    style="width:118px;"
    v-bar
  >
    <div>
      <div class="dvs-flex dvs-flex-col">
        <div
          v-for="(size, key) in sizeEdits"
          :key="key"
          class="dvs-text-center dvs-cursor-pointer dvs-mb-3 dvs-rounded"
          style="width:100px"
          @click="setActive(key)"
          :class="{
            'dvs-bg-black dvs-text-grey-light': active === key,
            'dvs-bg-grey-light': active !== key
          }"
        >
          <div
            class="dvs-overflow-hidden dvs-rounded-t dvs-mb-2"
            style="max-width:100px;line-height:0px;"
          >
            <img :src="`/styled/preview/${size.url}?${encodeEdits(key)}`">
          </div>

          <div class="dvs-mb-3 dvs-uppercase">
            <div class="dvs-font-bold dvs-text-xs dvs-mb-1">{{ key }} </div>
            <div class="dvs-text-2xs">({{ size.w }}x{{ size.h }})</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MediaEditorThumbnails',
  props: {
    defaultImage: {
      type: String,
      required: true
    },
    sizeEdits: {
      type: Object,
      required: true
    },
    encodeEdits: {
      type: Function,
      required: true
    },
    active: {
      type: String,
      required: true
    },
  },
  methods: {
    setActive (activeSelection) {
      this.$emit('select', activeSelection)
    },
  },

}
</script>