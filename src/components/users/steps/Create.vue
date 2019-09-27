<template>
  <form @submit.prevent="">
    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>Name</label>
      <input
        v-model="newUser.name"
        type="text"
        placeholder="Name of the User"
        class="dvs-w-full"
      >
    </fieldset>

    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>Email</label>
      <input
        v-model="newUser.email"
        type="text"
        placeholder="Email of the User"
        class="dvs-w-full"
      >
    </fieldset>

    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>Password</label>
      <input
        v-model="newUser.password"
        type="password"
        class="dvs-w-full"
      >
    </fieldset>

    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>Confirm Password</label>
      <input
        v-model="newUser.password_confirmation"
        type="password"
        class="dvs-w-full"
      >
    </fieldset>

    <button
      class="dvs-btn dvs-btn-primary dvs-text-xs mr-2"
      :disabled="createInvalid"
      @click="requestCreateUser"
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
  name: 'DeviseUsersCreate',
  data () {
    return {
      modulesToLoad: 1,
      showCreate: false,
      newUser: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
      },
    };
  },
  computed: {
    createInvalid () {
      return (
        this.newUser.name === null ||
        this.newUser.email === null ||
        this.newUser.password === null ||
        this.newUser.password_confirmation === null ||
        this.newUser.password !== this.newUser.password_confirmation
      );
    },
  },
  methods: {
    ...mapActions('devise', ['createGeneric']),
    requestCreateUser () {
      this.createGeneric({
        config: {
          apiendpoint: 'users',
          recordLabel: 'name'
        },
        record: this.newUser
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
