<template>
  <div>
    <div
      v-for="(option, key) in options"
      :key="key"
      class="dvs-bg-white dvs-cursor-pointer dvs-text-admin-bg dvs-text-center dvs-py-3 dvs-px-8 dvs-my-4 dvs-shadow dvs-rounded"
      v-html="option.label"
      @click="chooseOption(option)"
    >
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeviseWorkflowMenu',
  props: {
    step: {
      type: Object,
      required: true
    }
  },
  computed: {
    options () {
      return this.step.options
    }
  },
  methods: {
    chooseOption (option) {
      this.$emit('done', option)
    }
  }
}
</script>