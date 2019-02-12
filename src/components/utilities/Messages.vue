<template>
  <div>
    <transition name="dvs-fade">
      <div class="dvs-alert-message dvs-error" v-show="messageErrors.length > 0">
        <div @click="closeErrors()" class="dvs-absolute dvs-pin-t dvs-pin-r dvs-mr-4 dvs-mt-4">
          <close-icon class="dvs-cursor-pointer" w="20" h="20"/>
        </div>
        <ul>
          <transition-group name="list" tag="div">
            <li
              v-for="error in messageErrors"
              :key="error.id"
              :style="`border-bottom-color:${theme.panel.color}`"
            >
              <h6 :style="`color:${theme.panel.color}`">{{ error.title }}</h6>
              <p :style="`color:${theme.panel.color}`">{{ error.message }}</p>
              <p
                :style="`color:${theme.panel.color}`"
                class="dvs-text-sm"
                v-if="error.code"
              >Error Code: {{ error.code }}</p>
            </li>
          </transition-group>
        </ul>
      </div>
    </transition>
    <transition name="dvs-fade">
      <div class="dvs-alert-message dvs-bg-black" v-show="messages.length > 0">
        <i @click="closeMessages()" class="cursor-pointer ion-icon ion-android-close"></i>
        <ul>
          <transition-group name="list" tag="div">
            <li
              v-for="message in messages"
              :key="message.id"
              :style="`border-bottom-color:${theme.panel.color}`"
            >
              <h6 class="dvs-text-base" :style="`color:${theme.panel.color}`">{{ message.title }}</h6>
              <p :style="`color:${theme.panel.color}`">{{ message.message }}</p>
            </li>
          </transition-group>
        </ul>
      </div>
    </transition>
  </div>
</template>


<script>
import debounce from 'lodash.debounce';
import Strings from '../../mixins/Strings';

export default {
  data() {
    return {
      title: null,
      messages: [],
      messageErrors: [],
    };
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
          if (error.response.data.errors.hasOwnProperty(property)) {
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
        self.appendError({
          id: this.genUniqueKey(error),
          code: error.response.status,
          title: error.response.data.exception,
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
          code: error.status,
          title: 'Unable to reach server',
          message: 'Please check your internet connection',
        });
      }
    },
    appendError(payload) {
      const self = this;
      const existingError = this.messageErrors.find(error => error.message === payload.message);

      if (!existingError) {
        const error = {
          id: this.genUniqueKey(payload),
          code: payload.code,
          title: payload.title,
          message: payload.message,
          active: true,
        };
        this.messageErrors.unshift(error);

        debounce(() => {
          error.active = false;

          setTimeout(() => {
            self.messageErrors.pop();
          }, 2000);
        }, 5000)();
      }
    },
    closeErrors() {
      this.messageErrors.splice(0);
    },
    addMessage(payload) {
      const self = this;
      const existingMessage = this.messages.find(message => message.message === payload.message);

      if (!existingMessage) {
        const message = {
          id: this.genUniqueKey(payload),
          title: payload.title,
          message: payload.message,
          active: true,
        };
        this.messages.unshift(message);

        debounce(() => {
          message.active = false;

          setTimeout(() => {
            self.messages.pop();
          }, 2000);
        }, 5000)();
      }
    },
    closeMessages() {
      this.messages.splice(0);
    },
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
  mixins: [Strings],
  components: {
    CloseIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-ionicons/dist/ios-close.vue'),
  },
};
</script>
