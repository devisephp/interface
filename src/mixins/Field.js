export default {
  methods: {
    update(value) {
      this.$emit('input', value);
      this.$emit('change', value);
    }
  },
  computed: {
    enabled: {
      get() {
        return this.value.enabled;
      },
      set(enabled) {
        let valueObj = Object.assign(this.value, { enabled: enabled });
        this.update(valueObj);
      }
    }
  }
};
