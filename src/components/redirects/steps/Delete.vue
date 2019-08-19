<template>
  <div class="flex justify-center">

    <button
      class="dvs-btn dvs-btn-primary dvs-btn-lg mr-4"
      @click="requestDeleteRedirect"
    >Remove Redirect</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'DeviseRedirectsDelete',
  props: {
    values: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions('devise', ['deleteGeneric']),
    requestDeleteRedirect () {
      this.deleteGeneric({
        config: {
          apiendpoint: 'redirects',
          recordLabel: 'from_url'
        },
        record: this.values
      }).then(() => {
        this.$emit('done')
      });
    },
    cancel () {
      this.$emit('cancel')
    }
  }
};
</script>
