<template>
  <form @submit.prevent="">
    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>From URL</label>
      <input
        v-model="newRedirect.from_url"
        type="text"
      >
    </fieldset>

    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>To URL</label>
      <input
        v-model="newRedirect.to_url"
        type="text"
      >
    </fieldset>

    <button
      class="dvs-btn dvs-btn-primary dvs-text-xs mr-2"
      :disabled="createInvalid"
      @click="requestCreateSite"
    >Create</button>
    <button
      class="dvs-btn dvs-btn-secondary dvs-text-xs"
      @click="cancel"
    >Cancel</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'DeviseSiteCreate',
  data () {
    return {
      newRedirect: {
        from_url: null,
        to_url: null
      },
    };
  },
  computed: {
    createInvalid () {
      return (
        this.newRedirect.from_url === null ||
        this.newRedirect.to_url === null
      );
    },
  },
  methods: {
    ...mapActions('devise', ['createGeneric']),
    requestCreateSite () {
      this.createGeneric({
        config: {
          apiendpoint: 'redirects',
          recordLabel: 'from_url'
        },
        record: this.newRedirect
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
