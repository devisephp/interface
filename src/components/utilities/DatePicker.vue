<template>
  <flat-pickr
    ref="picker"
    v-model="localDateTime"
    :config="config"
    class="w-full"
    :placeholder="placeholder"
  />
</template>

<script>
// eslint-disable-next-line no-undef
const dayjs = require(/* webpackChunkName: "dayjs" */ 'dayjs');

export default {
  components: {
    flatPickr: () => import(/* webpackChunkName: "devise-flatpickr" */ 'vue-flatpickr-component'),
  },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    value: {
      required: true,
    },
    settings: {
      type: Object,
      default: () => {
        return {
          date: true,
          time: true,
        };
      },
    },
    placeholder: {
      type: String,
      default: 'Please select from the calendar',
    },
  },
  data() {
    return {
      config: {
        noCalendar: !this.settings.date,
        enableTime: this.settings.time,
        onChange: this.updateValue,
      },
    };
  },
  computed: {
    localDateTime: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
        this.$emit('change', value);
      },
    },
  },
  methods: {
    updateValue(value) {
      value = this.formatValue(value);
      this.localDateTime = value;
    },
    formatValue(value) {
      if (this.settings.format) {
        return dayjs(value).format(this.settings.format);
      }

      // 2018-04-27 13:34:00
      if (this.settings.date && this.settings.time) {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
      }
      // 2018-04-27
      if (this.settings.date && !this.settings.time) {
        return dayjs(value).format('YYYY-MM-DD');
      }
      // 13:34:00
      if (!this.settings.date && this.settings.time) {
        return dayjs(value).format('HH:mm:ss');
      }

      return null;
    },
  },
};
</script>
