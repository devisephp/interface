<template>
  <form @submit.prevent="">
    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>Title</label>
      <input
        v-model="localValue.title"
        type="text"
        placeholder="Title of the Page"
        class="w-full"
      >
    </fieldset>

    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>Slug</label>
      <input
        v-model="localValue.slug"
        type="text"
        placeholder="Url of the Page"
        class="w-full"
      >
    </fieldset>

    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>Meta Title</label>
      <input
        v-model="localValue.meta_title"
        type="text"
        placeholder="Meta title of the Page"
        class="w-full"
      >
    </fieldset>

    <fieldset class="dvs-fieldset dvs-mb-8">
      <label>
        Canonical
        <help :compact="true">The canonical link element helps webmasters make clear to the search engines which page should be credited as the original.<br><br>
          <a
            href="https://en.wikipedia.org/wiki/Canonical_link_element"
            target="_blank"
            class="dvs-underline dvs-text-admin-highlight-fg dvs-font-bold"
          >Wikipedia Entry</a></help>
      </label>
      <input
        v-model="localValue.canonical"
        type="text"
        placeholder="Canonical"
        class="w-full"
      >
    </fieldset>

    <fieldset class="dvs-fieldset dvs-mb-8">
      <label>Additional Meta Tags</label>
      <meta-form
        v-model="localValue.meta"
        :global-form="false"
        @request-create-meta="requestCreateMeta"
        @request-update-meta="requestUpdateMeta"
        @request-delete-meta="requestDeleteMeta"
      />
    </fieldset>

    <fieldset class="dvs-fieldset dvs-mb-8">
      <label>
        Additional code in &lt;head&gt;
        <help :compact="true">Code will be output exactly as you place it in here so you need to wrap JavaScript with &lg;script&gt; tags.</help>
      </label>
      <textarea
        v-model="localValue.head"
        class="dvs-w-full"
      ></textarea>
    </fieldset>

    <fieldset class="dvs-fieldset dvs-mb-8">
      <label>
        Additional code at the bottom of the page code?
        <help :compact="true">Code will be output exactly as you place it in here so you need to wrap JavaScript with &lg;script&gt; tags.</help>
      </label>
      <textarea
        v-model="localValue.footer"
        class="dvs-w-full"
      ></textarea>
    </fieldset>

    <fieldset class="dvs-fieldset dvs-mb-4">
      <label>Middleware</label>
      <input
        v-model="localValue.middleware"
        type="text"
        class="dvs-w-full"
      >
    </fieldset>

    <!-- <fieldset class="dvs-fieldset dvs-mb-8">
      <label>A/B Testing Enabled</label>
      <input
        type="checkbox"
        v-model="localValue.ab_testing_enabled"
      >
    </fieldset> -->

    <button
      class="dvs-btn dvs-btn-primary dvs-text-xs mr-4"
      :disabled="editInvalid"
      @click="requestEditPage"
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
    Help: () => import(
      // eslint-disable-next-line max-len
      /* webpackChunkName: "devise-utilities" */ '../../utilities/Help.vue'),
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
  mounted () {
    this.localValue = { ...this.values }
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
      }).then((results) => {
        this.localValue = Object.assign({}, results.data.data)
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

};
</script>
