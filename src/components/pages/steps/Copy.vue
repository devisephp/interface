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
      <label>Published?</label>
      <div class="dvs-flex">
        <input
          type="checkbox"
          v-model="newPage.published"
        >
      </div>
    </fieldset>

    <button
      class="dvs-btn dvs-bg-admin-highlight dvs-text-admin-highlight-fg mr-4"
      @click="requestCopyPage"
      :disabled="createInvalid"
    >Create</button>
    <button
      class="dvs-btn dvs-bg-admin-bg dvs-text-admin-fg"
      @click="cancel"
    >Cancel</button>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'DevisePagesCopy',
  props: {
    values: {
      type: Object,
      required: true
    }
  },
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
        published: true,
        copy_page_id: 0,
      },
    };
  },
  mounted () {
    this.loadLanguages()
  },
  methods: {
    ...mapActions('devise', ['createGeneric', 'getGeneric']),
    requestCopyPage () {
      this.newPage.copy_page_id = this.values.id
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
    cancel () {
      this.$emit('cancel')
    }
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
  }
};
</script>
