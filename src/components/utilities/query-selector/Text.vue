<template>
  <div>
    <fieldset class="dvs-fieldset">
      <label>{{value.label}}</label>
      <input
        type="text"
        class="dvs-w-full"
        :placeholder="value.label"
        @keyup="updateValue"
      >
    </fieldset>
  </div>
</template>

<script>

export default {
  name: 'DeviseQuerySelectorText',
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  methods: {
    updateValue (e) {
      const newValue = this.value
      newValue.value = e.target.value
      this.$emit('input', newValue)
    },
  }
}
</script>