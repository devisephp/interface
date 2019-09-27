<template>
  <label :class="{'dvs-toggle': !mini, 'dvs-mini-toggle': mini}" :for="id">
    <input :id="id" v-model="localValue" type="checkbox" @change="updateValue">
    <div class="dvs-toggle-slider"></div>
  </label>
</template>

<script>
export default {
  name: 'DeviseToggle',
  props: {
    value: {
      type: Boolean,
      required: false,
      default: false
    },
    id: {
      type: String,
      required: true
    },
    mini: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      localValue: true,
    };
  },
  watch: {
    value() {
      this.localValue = this.value;
    },
  },
  mounted() {
    this.localValue = this.value;
  },
  methods: {
    updateValue() {
      // Emit the number value through the input event
      this.$emit('input', this.localValue);
      this.$emit('change', this.localValue);
    },
  },
};
</script>
