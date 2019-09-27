<template>
  <form @submit.prevent="">
    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>Page Title</label>
      <input
        v-model="newPage.title"
        type="text"
        placeholder="Title of the Page"
        class="dvs-w-full"
      >
    </fieldset>

    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>Language</label>
      <select
        v-model="newPage.language_id"
        class="dvs-w-full"
      >
        <option :value="null">Please select a language</option>
        <option
          v-for="language in languages.data"
          :key="language.id"
          :value="language.id"
        >
          {{
            language.code }}
        </option>
      </select>
    </fieldset>

    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>Slug</label>
      <div>
        <input
          v-model="newPage.slug"
          type="text"
          placeholder="Url of the Page"
          class="dvs-w-full"
        >
      </div>
    </fieldset>

    <button
      class="dvs-btn dvs-btn-primary mr-4"
      :disabled="createInvalid"
      @click="requestTranslatePage"
    >Create</button>
    <button
      class="dvs-btn dvs-btn-secondary"
      @click="cancel"
    >Cancel</button>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'DevisePagesTranslate',
  props: {
    values: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      newPage: {
        language_id: null,
        title: null,
        slug: null,
      },
    };
  },
  computed: {
    ...mapState('devise', ['languages']),
    createInvalid () {
      return (
        this.newPage.title === null ||
        this.newPage.language_id === null ||
        this.newPage.slug === null
      );
    },
    layouts () {
      return window.deviseSettings.$config.layouts;
    },
  },
  mounted () {
    this.loadLanguages()
  },
  methods: {
    ...mapActions('devise', ['translatePage', 'getGeneric']),
    requestTranslatePage () {
      this.translatePage({
        data: this.newPage,
        page: this.values
      }).then(() => {
        this.$emit('done')
      });
    },
    loadLanguages () {
      this.getGeneric({
        config: {
          apiendpoint: 'languages',
          store: 'languages',
        }
      }).then(response => {
        if (response.data && response.data.data && response.data.data.length > 0) {
          this.newPage.language_id = response.data.data[0].id
        }
      })
    },
    cancel () {
      this.$emit('cancel')
    }
  },

};
</script>
