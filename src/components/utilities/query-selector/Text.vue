<template>
  <div>
    <fieldset class="dvs-fieldset">
      <label>{{ modelQuerySettings.label }}</label>
      <input
        type="text"
        class="dvs-w-full"
        :placeholder="modelQuerySettings.label"
        @keyup="updateValue"
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
  methods: {
    updateValue(e) {
      this.$emit('input', e.target.value);
    },
  },
};
</script>
