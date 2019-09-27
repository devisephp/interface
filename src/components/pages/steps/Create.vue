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
          v-model="newPage.published"
          type="checkbox"
        >
      </div>
    </fieldset>

    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>Go to page after creation?</label>
      <div class="dvs-flex">
        <input
          v-model="redirect"
          type="checkbox"
        >
      </div>
    </fieldset>

    <button
      class="dvs-btn dvs-btn-primary dvs-text-xs mr-4"
      :disabled="createInvalid"
      @click="requestCreatePage"
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
      redirect: true,
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
        published: true,
      },
    };
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
        if (this.redirect) {
          setTimeout(() => {
            window.location.href = this.newPage.slug
          }, 1000);
        } else {
          this.$emit('done')
        }
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

};
</script>
