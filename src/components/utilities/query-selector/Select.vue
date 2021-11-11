<template>
  <div>
    <fieldset class="dvs-fieldset">
      <label>Please Select</label>
      <select v-model="localValue" type="text" class="dvs-w-full" :value="value">
        <option :value="null">Please Select from the Following</option>
        <option v-for="(option, key) in options" :key="key" :value="key">
          {{ option }}
        </option>
      </select>
    </fieldset>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'DeviseQuerySelectorSelect',
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
  data() {
    return {
      apiOptions: [],
    };
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

    options() {
      if (this.modelQuerySettings.options) {
        return this.modelQuerySettings.options;
      }
      return this.apiOptions;
    },
  },
  mounted() {
    if (this.modelQuerySettings.api) {
      this.requestOptions();
    }
  },
  methods: {
    ...mapActions('devise', ['getGeneric']),

    updateValue(e) {
      const newValue = e.target.value;
      this.$emit('input', newValue);
    },

    requestOptions() {
      this.getGeneric({
        config: { app: true, apiendpoint: this.modelQuerySettings.api },
      }).then(results => {
        this.apiOptions = results.data;
      });
    },
  },
};
</script>
