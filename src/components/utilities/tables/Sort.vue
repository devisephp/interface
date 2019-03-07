<template>
  <div class="dvs-flex dvs-px-4 dvs-py-8">
    <fieldset class="dvs-mr-4 dvs-flex">
      <div class="dvs-flex dvs-items-center">
        <label class="dvs-pr-2">Ascending</label>
        <input
          type="radio"
          v-model="sortDirection"
          value="asc"
        >
      </div>
    </fieldset>
    <fieldset class="dvs-ml-4">
      <div class="dvs-flex dvs-items-center">
        <label class="dvs-pr-2">Descending</label>
        <input
          type="radio"
          v-model="sortDirection"
          value="desc"
        >
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'SuperTableSort',
  computed: {
    sortDirection: {
      get () {
        if (this.value[this.column]) {
          return this.value.sort
        }
        return null
      },
      set (newValue) {
        console.log(newValue, this.$set(this.value, this.column, newValue))
        this.$emit('update', this.$set(this.value, this.column, newValue))
      }
    }
  },
  props: ['type', 'column', 'value'],
};
</script>
