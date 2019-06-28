<template>
  <div class="dvs-relative">
    <div
      class="dvs-cursor-pointer dvs-text-xs dvs-border dvs-rounded dvs-flex dvs-flex-wrap dvs-justify-center dvs-items-center dvs-p-2 dvs-m-1"
      :class="{'dvs-bg-grey-light': showControl}"
      @click="toggleShowControl"
    >
      <slot name="button">Button</slot>
    </div>
    <div
      class="dvs-absolute dvs-text-sm dvs-bg-white dvs-rounded dvs-p-4 dvs-shadow dvs-z-10"
      style="min-width:200px;"
      v-if="showControl"
    >
      <slot name="control"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MediaEditorControl',
  props: {
    value: {
      required: true,
      type: Object
    }
  },
  computed: {
    edits: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  data () {
    return {
      showControl: false
    }
  },
  methods: {
    toggleShowControl () {
      this.showControl = !this.showControl;
    }
  }
}
</script>
