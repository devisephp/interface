<template>
  <admin-container v-if="languages.data.length">
    <template v-slot:message>
      When you add a language to this site it is immediately enabled. Afterwards you can create translated versions of pages that will be linked to one another allowing you to provide ways to switch languages on your front-end. We
      <a
        href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes"
        class="dvs-font-bold"
        target="_blank"
      >highly suggest using the ISO 639-1 2 letter codes</a> but you can technically use whatever you want.
    </template>
    <template v-slot:content>
      <div class="dvs-flex dvs-items-end dvs-mt-20 dvs-mb-6">
        <fieldset class="dvs-fieldset dvs-mr-8 dvs-flex-grow">
          <label>New Language Code</label>
          <input
            type="text"
            maxlength="2"
            v-model="newLanguage.code"
            class="dvs-w-full"
          >
        </fieldset>

        <button
          class="dvs-btn dvs-btn-primary dvs-text-xs"
          :disabled="newLanguage.code === null"
          @click="requestCreateLanguage"
        >Add New Language</button>
      </div>

      <div class="dvs-flex dvs-flex-col">
        <div
          v-for="(language, key) in localValue.data"
          :key="key"
          class="dvs-flex dvs-justify-between dvs-items-center dvs-mb-2"
        >
          <div class="dvs-text-xl dvs-font-bold dvs-mb-4 dvs-p-2 dvs-px-4 dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-rounded dvs-shadow dvs-flex-grow">
            <template v-if="!language.editCode">{{ language.code }}</template>
            <fieldset class="dvs-fieldset">
              <input
                v-show="language.editCode"
                type="text"
                v-model="localValue.data[key].code"
              >
            </fieldset>
          </div>

          <div class="dvs-flex dvs-justify-between dvs-ml-2 dvs-mb-4  dvs-items-center">
            <button
              v-if="!language.editCode"
              class="dvs-btn dvs-btn-ghost dvs-text-admin-fg dvs-btn-xs dvs-ml-4"
              @click="language.editCode = !language.editCode"
            >
              <CreateIcon />
            </button>
            <button
              class="dvs-btn dvs-btn-primary dvs-text-xs dvs-mr-2"
              v-if="language.editCode"
              @click="localValue.data[key].editCode = requestUpdateLanguage(localValue.data[key])"
            >Save Language Code</button>
            <button
              class="dvs-btn dvs-btn-secondary dvs-text-xs"
              v-if="language.editCode"
              @click="language.editCode = false"
            >Cancel</button>
          </div>
        </div>
      </div>
    </template>
  </admin-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'LanguagesManage',
  data () {
    return {
      localValue: {
        data: [],
      },
      modulesToLoad: 1,
      newLanguage: {
        code: null,
      },
    };
  },
  mounted () {
    this.retrieveAllLanguages();
  },
  methods: {
    ...mapActions('devise', ['getLanguages', 'createLanguage', 'updateLanguage']),
    requestCreateLanguage () {
      this.createLanguage(this.newLanguage);
    },
    requestUpdateLanguage (language) {
      this.updateLanguage(language).then(() => {
        return false;
      });
    },
    retrieveAllLanguages () {
      this.getLanguages().then(() => {
        this.localValue = Object.assign({}, this.localValue, this.languages);
        this.localValue.data.map(language => {
          this.$set(language, 'editCode', false);
          return language;
        });
        window.deviseSettings.$bus.$emit('incrementLoadbar', this.modulesToLoad);
      });
    },
  },
  computed: {
    ...mapGetters('devise', ['languages']),
  },
  components: {
    CreateIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/EditIcon'),
    AdminContainer: () =>
      import(/* webpackChunkName: "devise-administration" */ '../admin/ui/AdminContainer'),
  },
};
</script>
