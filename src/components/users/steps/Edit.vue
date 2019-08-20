<template>
  <form @submit.prevent="">
    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>Name of User</label>
      <input
        type="text"
        autocomplete="off"
        v-model="localValue.name"
        placeholder="Name of the User"
      >
    </fieldset>

    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>Email</label>
      <input
        type="text"
        autocomplete="off"
        v-model="localValue.email"
        placeholder="Email of the User"
      >
    </fieldset>

    <fieldset
      class="dvs-fieldset dvs-mb-4"
      v-if="!showPassword"
    >
      <button
        class="dvs-btn dvs-btn-secondary "
        @click="showPassword = !showPassword"
      >Edit Password</button>
    </fieldset>

    <template v-if="showPassword">
      <fieldset class="dvs-fieldset dvs-mb-4">
        <label>Password</label>
        <input
          type="password"
          autocomplete="off"
          v-model="localValue.password"
        >
      </fieldset>

      <fieldset class="dvs-fieldset dvs-mb-4">
        <label>Password Confirm</label>
        <input
          type="password"
          autocomplete="off"
          v-model="localValue.password_confirmation"
        >
      </fieldset>
    </template>

    <button
      class="dvs-btn dvs-btn-primary dvs-text-xs mr-2"
      @click="requestEditUser"
      :disabled="editInvalid"
    >Edit User</button>
    <button
      class="dvs-btn dvs-btn-secondary dvs-text-xs"
      @click="cancel"
    >Cancel</button>
  </form>
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
  data () {
    return {
      localValue: {},
      showPassword: false,
    };
  },
  mounted () {
    this.localValue = { ...this.values }
  },
  methods: {
    ...mapActions('devise', ['updateGeneric']),
    requestEditUser () {
      this.updateGeneric({
        config: {
          apiendpoint: 'users',
          recordLabel: 'name'
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
        this.localValue.name === null ||
        this.localValue.email === null ||
        this.localValue.password === null ||
        this.localValue.password_confirmation === null ||
        this.localValue.password !== this.localValue.password_confirmation
      );
    },
  },
};
</script>
