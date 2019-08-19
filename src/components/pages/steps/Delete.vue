<template>
  <div class="flex justify-center">

    <button
      class="dvs-btn dvs-btn-primary dvs-btn-lg mr-4"
      @click="requestDeletePage"
    >Remove Page</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'DevisePagesDelete',
  props: {
    values: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions('devise', ['deleteGeneric']),
    requestDeletePage () {
      this.deleteGeneric({
        config: {
          apiendpoint: 'pages',
          recordLabel: 'title'
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
