<template>
  <div>
    <fieldset class="dvs-fieldset">
      <label>{{ value.label }}</label>
      <select
        type="text"
        class="dvs-w-full"
        :placeholder="value.label"
        :value="value.value"
        @change="updateValue"
      >
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
      const newValue = this.value;
      newValue.value = e.target.value;
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
