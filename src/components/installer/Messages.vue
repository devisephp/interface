<template>
  <!-- eslint-disable vue/no-v-html -->
  <div>
    <ul id="messages" class="dvs-fixed dvs-left-0 dvs-bottom-0 dvs-right-0">
      <li
        v-for="message in messages"
        :key="getHash(message)"
        class="dvs-p-4 dvs-text-white"
        :class="{
          'dvs-bg-red': message.type === 'error',
          'dvs-bg-green': message.type === 'message',
        }"
        v-html="message.content"
      ></li>
    </ul>
  </div>
</template>

<script>
// eslint-disable-next-line no-undef
const hash = require('object-hash');

export default {
  data() {
    return {
      messages: [],
    };
  },
  mounted() {
    window.deviseSettings.$bus.$on('showMessage', this.addMessage);
    window.deviseSettings.$bus.$on('showError', this.addError);
  },
  methods: {
    addMessage(message) {
      if (!message.content) {
        message = {
          content: 'Success!',
        };
      }
      const messageObj = {
        content: `<p>${message.content}</p>`,
        type: 'message',
      };
      this.messages.push(messageObj);

      setTimeout(() => {
        this.messages.splice(this.messages.indexOf(messageObj), 1);
      }, 4000);
    },
    addError(error) {
      const errorMessage = {
        content: this.buildError(error.response),
        type: 'error',
      };
      this.messages.push(errorMessage);

      setTimeout(() => {
        this.messages.splice(this.messages.indexOf(errorMessage), 1);
      }, 6000);
    },
    getHash(message) {
      message.date = new Date();
      return hash(message);
    },
    buildError(error) {
      // API Error
      if (error.data && error.data.message) {
        return this.buildValidationErrorMessage(error.data);
      }
      // Laravel Error
      if (error.exception) {
        return this.buildLaravelErrorMessage(error);
      }

      return '<p>There was an error with your request</p>';
    },
    buildValidationErrorMessage(errorData) {
      let errorString = `<p>${errorData.message}</p>`;

      if (errorData.errors) {
        errorString += `<ul>`;

        for (const key in errorData.errors) {
          if (errorData.errors[key]) {
            errorString += `<li>${errorData.errors[key]}</li>`;
          }
        }

        errorString += `</ul>`;
      }

      return errorString;
    },
    buildLaravelErrorMessage() {
      const errorString = '';

      return errorString;
    },
  },
};
</script>

<style lang="scss"></style>
