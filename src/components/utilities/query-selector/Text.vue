<template>
  <div>
    <fieldset class="dvs-fieldset">
      <label>{{ modelQuerySettings.label }}</label>
      <input
        v-model="localValue"
        type="text"
        class="dvs-w-full"
        :placeholder="modelQuerySettings.label"
      />
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'DeviseQuerySelectorText',
  props: {
    value: {
      type: String,
      required: true,
    },
    modelQuerySettings: {
      type: Object,
      required: true,
    },
  },

  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
    },
  },
};
</script>
