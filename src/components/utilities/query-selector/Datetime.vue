<template>
  <div>
    <fieldset class="dvs-fieldset">
      <label>{{value.label}}</label>
      <date-picker
        ref="datepicker"
        @change="updateValue"
        :settings="{
          date: true,
          time: true  
        }"
      />
    </fieldset>
  </div>
</template>

<script>

export default {
  name: 'DeviseQuerySelectorText',
  components: {
    DatePicker: () => import(/* webpackChunkName: "devise-editors" */ '../DatePicker'),
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  methods: {
    updateValue (value) {
      const newValue = this.value
      newValue.value = value
      this.$emit('input', newValue)
    },
  }
}
</script>