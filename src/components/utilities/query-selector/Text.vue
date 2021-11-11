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

  // watch: {
  //   value(newValue) {
  //     console.log(typeof newValue[0]);
  //     if (newValue && newValue.length > 0 && typeof newValue[0] === 'number') {
  //       this.requestLegacySelected();
  //     }
  //   },
  // },

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
