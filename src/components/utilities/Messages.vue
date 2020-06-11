<template>
  <div></div>
</template>

<script>
import Strings from '../../mixins/Strings';

export default {
  name: 'DeviseMessages',
  mixins: [Strings],
  data() {
    return {
      title: null,
    };
  },
  computed: {
    mainTitle() {
      if (this.title === null) {
        return 'There was a Problem';
      }
      return this.title;
    },
    activeErrors() {
      return this.errors.filter(error => error.active === true);
    },
    activeMessages() {
      return this.messages.filter(message => message.active === true);
    },
  },
  mounted() {
    const self = this;
    window.deviseSettings.$bus.$on('showError', error => {
      self.addError(error);
    });

    window.deviseSettings.$bus.$on('showMessage', payload => {
      self.addMessage(payload);
    });
  },
  methods: {
    addError(error) {
      const self = this;
      // Error came from axios most likely
      if (
        typeof error.response !== 'undefined' &&
        typeof error.response.data !== 'undefined' &&
        typeof error.response.data.errors !== 'undefined'
      ) {
        this.title = error.response.data.message;
        for (const property in error.response.data.errors) {
          if (Object.prototype.hasOwnProperty.call(error.response.data.errors, 'property')) {
            const e = error.response.data.errors[property];
            self.appendError({
              id: this.genUniqueKey(error),
              code: error.response.status,
              title: error.response.statusText,
              message: e[0],
            });
          }
        }
      } else if (
        typeof error.response !== 'undefined' &&
        typeof error.response.data !== 'undefined' &&
        error.response.data !== null &&
        error.response.data.message !== null
      ) {
        const title = error.response.data.exception
          ? error.response.data.exception
          : error.response.data.message;
        self.appendError({
          id: this.genUniqueKey(error),
          code: error.response.status,
          title: `${error.response.status}: ${title}`,
          message: error.response.data.message,
        });
      } else if (typeof error.data !== 'undefined' && error.data !== null) {
        self.appendError({
          id: this.genUniqueKey(error),
          code: error.status,
          title: error.data.error,
          message: error.data.message,
        });
      } else if (typeof error === 'string') {
        self.appendError({
          id: this.genUniqueKey(error),
          code: '',
          title: 'Uh-Oh!',
          message: error,
        });
      } else if (typeof error.message !== 'undefined' && error.message !== null) {
        self.appendError({
          id: this.genUniqueKey(error),
          code: '',
          title: 'Uh-Oh!',
          message: error.message,
        });
      } else {
        self.appendError({
          id: this.genUniqueKey(error),
          code: error.code,
          title: `${error.code}: ${error.title}`,
          message: error.message,
        });
      }
    },
    appendError(payload) {
      const title = payload.title ? payload.title : 'Unknown Error';
      const message = payload.message
        ? payload.message
        : 'We do not have any details on this error';
      this.showErrorMsg({ title, message });
    },
    addMessage(payload) {
      this.showSuccessMsg({ title: payload.title, message: payload.message });
    },
  },
};
</script>
