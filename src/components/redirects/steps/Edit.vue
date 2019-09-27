<template>
  <form @submit.prevent="">
    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>From URL</label>
      <input
        v-model="localValue.from_url"
        type="text"
      >
    </fieldset>

    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>To URL</label>
      <input
        v-model="localValue.to_url"
        type="text"
      >
    </fieldset>

    <button
      class="dvs-btn dvs-btn-primary dvs-text-xs mr-2"
      :disabled="editInvalid"
      @click="requestEditRedirect"
    >Edit 301 Redirect</button>
    <button
      class="dvs-btn dvs-btn-secondary dvs-text-xs"
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
  computed: {
    editInvalid () {
      return (
        !this.localValue.from_url ||
        !this.localValue.to_url
      );
    },
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

};
</script>
