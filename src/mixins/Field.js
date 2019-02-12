export default {
  methods: {
    update(value) {
      this.$emit('input', value);
      this.$emit('change', value);
    },
  },
  computed: {
    enabled: {
      get() {
        return this.value.enabled;
      },
      set(enabled) {
        const valueObj = Object.assign(this.value, { enabled });
        this.update(valueObj);
      },
    },
  },
};
