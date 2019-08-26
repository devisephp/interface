<template>
  <form @submit.prevent="">
    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>Name</label>
      <input
        type="text"
        v-model="localValue.name"
        placeholder="Name of the Site"
        class="w-full"
      >
    </fieldset>

    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>
        Domain
        <help
          class="dvs-mb-8"
          :compact="true"
        >The domain should not include the http or https:// protocol identifier. So your site entry could be "my-super-awesome-site.com" or "sub-domain.my-super-awesome-site.com". To Support development environments you can override these values in your .env file in the root of your project with something like "SITE_1_DOMAIN=my-super-awesome-site.test" for your local development or staging.</help>

      </label>
      <input
        type="text"
        v-model="localValue.domain"
        placeholder="Domain of the Site"
        class="w-full"
      >
    </fieldset>

    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>Language</label>
      <select
        type="text"
        v-model="localValue.language_id"
        class="w-full"
      >
        <option
          :value="null"
          disabled
        >Select a Default Language</option>
        <option
          v-for="language in languages.data"
          :key="language.id"
          :value="language.id"
        >{{ language.code }}</option>
      </select>
    </fieldset>

    <button
      class="dvs-btn dvs-btn-primary dvs-text-xs mr-2"
      @click="requestEditSite"
      :disabled="editInvalid"
    >Edit Site</button>
    <button
      class="dvs-btn dvs-btn-secondary dvs-text-xs"
      @click="cancel"
    >Cancel</button>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'DeviseSitesEdit',
  props: {
    values: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      localValue: {}
    };
  },
  mounted () {
    this.localValue = { ...this.values }
    this.loadLanguages()
  },
  methods: {
    ...mapActions('devise', ['updateGeneric', 'getGeneric']),
    requestEditSite () {
      this.updateGeneric({
        config: {
          apiendpoint: 'sites',
          recordLabel: 'name'
        },
        record: this.localValue
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
          const defaultLanguage = response.data.data.find(lang => {
            return lang.default === 1
          })
          this.localValue.language_id = defaultLanguage.id
        }
      })
    },
    cancel () {
      this.$emit('cancel')
    },

  },
  computed: {
    ...mapState('devise', ['languages']),
    editInvalid () {
      return (
        !this.localValue.name ||
        !this.localValue.domain ||
        !this.localValue.language_id
      );
    },
  },
};
</script>
