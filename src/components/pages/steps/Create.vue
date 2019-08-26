<template>
  <form @submit.prevent="">
    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>Page Title</label>
      <input
        type="text"
        v-model="newPage.title"
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
          type="text"
          v-model="newPage.slug"
          placeholder="Url of the Page"
          class="dvs-w-full"
        >
      </div>
    </fieldset>

    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>Layout</label>
      <select
        v-model="newPage.layout"
        class="w-full"
      >
        <option
          v-for="(path, name) in layouts"
          :key="path"
          :value="path"
        >{{ name }}</option>
      </select>
    </fieldset>

    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>Published?</label>
      <div class="dvs-flex">
        <input
          type="checkbox"
          v-model="newPage.published"
        >
      </div>
    </fieldset>

    <button
      class="dvs-btn dvs-btn-primary dvs-text-xs mr-4"
      @click="requestCreatePage"
      :disabled="createInvalid"
    >Create</button>
    <button
      class="dvs-btn dvs-btn-secondary dvs-text-xs"
      @click="cancel"
    >Cancel</button>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'DevisePagesCreate',
  data () {
    return {
      newPage: {
        layout: '',
        language_id: null,
        translated_from_page_id: 0,
        title: null,
        slug: null,
        canonical: null,
        head: null,
        footer: null,
        middleware: 'web',
        published: true
      },
    };
  },
  mounted () {
    this.loadLanguages()
    this.selectLayout()
  },
  methods: {
    ...mapActions('devise', ['createGeneric', 'getGeneric']),
    requestCreatePage () {
      this.createGeneric({
        config: {
          apiendpoint: 'pages',
          recordLabel: 'title'
        },
        record: this.newPage
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
    selectLayout () {
      // eslint-disable-next-line prefer-destructuring
      this.newPage.layout = Object.values(this.layouts)[0];
    },
    cancel () {
      this.$emit('cancel')
    }
  },
  computed: {
    ...mapState('devise', ['languages']),
    createInvalid () {
      return (
        this.newPage.title === null ||
        (this.newPage.layout === null &&
          !this.newPage.copy_page &&
          this.newPage.copy_page_id === 0) ||
        this.newPage.language_id === null ||
        this.newPage.slug === null
      );
    },
    layouts () {
      return window.deviseSettings.$config.layouts;
    },
  }
};
</script>
