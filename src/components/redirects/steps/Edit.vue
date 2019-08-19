<template>
  <form @submit.prevent="">
    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>From URL</label>
      <input
        type="text"
        v-model="localValue.from_url"
      >
    </fieldset>

    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>To URL</label>
      <input
        type="text"
        v-model="localValue.to_url"
      >
    </fieldset>

    <button
      class="dvs-btn dvs-btn-primary mr-4"
      @click="requestEditRedirect"
      :disabled="editInvalid"
    >Edit 301 Redirect</button>
    <button
      class="dvs-btn dvs-btn-secondary"
      @click="cancel"
    >Cancel</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'DeviseRedirectsEdit',
  props: {
    values: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      localValue: {}
    };
  },
  mounted () {
    this.localValue = { ...this.values }
  },
  methods: {
    ...mapActions('devise', ['updateGeneric']),
    requestEditRedirect () {
      this.updateGeneric({
        config: {
          apiendpoint: 'redirects',
          recordLabel: 'from_url'
        },
        record: this.localValue
      }).then(() => {
        this.$emit('done')
      });
    },
    cancel () {
      this.$emit('cancel')
    }
  },
  computed: {
    editInvalid () {
      return (
        !this.localValue.from_url ||
        !this.localValue.to_url
      );
    },
  },
};
</script>
