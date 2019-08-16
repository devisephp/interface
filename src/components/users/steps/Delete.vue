<template>
  <div class="flex justify-center">

    <button
      class="dvs-btn dvs-btn-primary dvs-btn-lg mr-4"
      @click="requestDeleteUser"
    >Remove User</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'DeviseUsersEdit',
  props: {
    values: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions('devise', ['deleteGeneric']),
    requestDeleteUser () {
      this.deleteGeneric({
        config: {
          apiendpoint: 'users',
          recordLabel: 'name'
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
