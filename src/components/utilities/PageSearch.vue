<template>
  <fieldset class="dvs-fieldset">
    <input
      v-model.lazy="searchTerm"
      v-debounce="searchDelay"
      type="text"
      :placeholder="placeholder"
    >
    <div class="dvs-relative">
      <ul class="dvs-list-reset dvs-bg-white dvs-text-black dvs-absolute dvs-shadow-lg">
        <li
          v-for="(suggestion, key) in autosuggest.data"
          :key="key"
          class="dvs-border-b dvs-border-grey-lighter dvs-p-4 dvs-cursor-pointer"
          @click="updateValue(index, key, suggestion)"
        >{{ suggestion }}</li>
      </ul>
    </div>
  </fieldset>
</template>

<script>
import debounce from 'v-debounce';

import { mapActions } from 'vuex';

export default {
  name: 'PageSearch',
  directives: {
    debounce,
  },
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: 0,
    },
    multisite: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      searchDelay: 1000,
      searchTerm: '',
      autosuggest: {
        data: [],
      },
    };
  },
  watch: {
    searchTerm(newValue) {
      this.requestSearch(newValue);
    },
  },
  methods: {
    ...mapActions('devise', ['searchPages']),
    updateValue(i, id, title) {
      this.searchTerm = '';
      this.autosuggest.data = [];
      this.$emit('selected', {
        index: i,
        id,
        title,
      });
    },
    requestSearch(term) {
      const self = this;
      if (term !== '') {
        this.searchPages({ term, 'multi-site': this.multisite }).then((data) => {
          self.autosuggest = data;
          if (data.data.length < 1) {
            window.deviseSettings.$bus.$emit('showMessage', {
              title: 'No Suggestions Found',
              message: `We couldn't find any values with the term: "${term}".`,
            });
          }
        });
      } else {
        this.autosuggest = Object.assign({}, {});
      }
    },
  },

};
</script>
