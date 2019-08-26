<template>
  <form @submit.prevent="">
    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>Title</label>
      <input
        type="text"
        v-model="localValue.title"
        placeholder="Title of the Page"
        class="w-full"
      >
    </fieldset>

    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>Slug</label>
      <input
        type="text"
        v-model="localValue.slug"
        placeholder="Url of the Page"
        class="w-full"
      >
    </fieldset>

    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>Meta Title</label>
      <input
        type="text"
        v-model="localValue.meta_title"
        placeholder="Meta title of the Page"
        class="w-full"
      >
    </fieldset>

    <fieldset class="dvs-fieldset dvs-mb-8">
      <label>
        Canonical
        <help :compact="true">The canonical link element helps webmasters make clear to the search engines which page should be credited as the original.<br><br><a
            href="https://en.wikipedia.org/wiki/Canonical_link_element"
            target="_blank"
          >Wikipedia Entry</a></help>
      </label>
      <input
        type="text"
        v-model="localValue.canonical"
        placeholder="Canonical"
        class="w-full"
      >
    </fieldset>

    <fieldset class="dvs-fieldset">
      <label>Additional Meta Tags</label>
      <meta-form
        v-model="localValue.meta"
        :global-form="false"
        @request-create-meta="requestCreateMeta"
        @request-update-meta="requestUpdateMeta"
        @request-delete-meta="requestDeleteMeta"
      />
    </fieldset>

    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>Middleware</label>
      <input
        type="text"
        class="dvs-w-full"
        v-model="localValue.middleware"
      >
    </fieldset>

    <fieldset class="dvs-fieldset dvs-mb-8">
      <label>A/B Testing Enabled</label>
      <input
        type="checkbox"
        v-model="localValue.ab_testing_enabled"
      >
    </fieldset>

    <button
      class="dvs-btn dvs-btn-primary dvs-text-xs mr-4"
      @click="requestEditPage"
      :disabled="editInvalid"
    >Edit Page</button>
    <button
      class="dvs-btn dvs-btn-secondary dvs-text-xs"
      @click="cancel"
    >Cancel</button>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'DevisePagesEditSettings',
  components: {
    MetaForm: () => import(/* webpackChunkName: "devise-meta" */ '../../meta/MetaForm'),
  },
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
    this.$set(this.localValue, 'meta', []);
  },
  methods: {
    ...mapActions('devise', ['updateGeneric']),
    requestEditPage () {
      this.updateGeneric({
        config: {
          apiendpoint: 'pages',
          recordLabel: 'title'
        },
        record: this.localValue
      }).then(() => {
        this.$emit('done')
      });
    },
    requestCreateMeta (newMeta) {
      this.localValue.meta.push(newMeta);
    },
    requestUpdateMeta (meta) {
      meta.edit = false;
    },
    requestDeleteMeta (meta) {
      this.localValue.meta.splice(this.localValue.meta.indexOf(meta), 1);
    },
    cancel () {
      this.$emit('cancel')
    }
  },
  computed: {
    ...mapState('devise', ['languages']),
    editInvalid () {
      return (
        this.localValue.name === null ||
        this.localValue.email === null ||
        this.localValue.password === null ||
        this.localValue.password_confirmation === null ||
        this.localValue.password !== this.localValue.password_confirmation
      );
    },
    layouts () {
      return window.deviseSettings.$config.layouts;
    },
  },
};
</script>
