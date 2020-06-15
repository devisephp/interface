<template>
  <admin-container class="dvs-mt-16">
    <template v-slot:message>
      This allows you to copy slice (field data and all!) to another page.
    </template>
    <template v-slot:content>
      <div class="dvs-p-8 dvs-text-admin-fg">
        <div class="dvs-mb-8">
          <fieldset class="dvs-fieldset dvs-mb-4">
            <label>Site to copy to</label>
            <select v-model="siteToCopyTo" class="dvs-w-full" @change="clearSearch">
              <option v-for="site in sites.data" :key="site.id" :value="site.id">{{
                site.name
              }}</option>
            </select>
          </fieldset>

          <fieldset class="dvs-fieldset">
            <label>Search for Page</label>
            <input v-model="searchTerm" type="text" class="dvs-w-full" @keyup="requestSearch" />
          </fieldset>

          <div class="dvs-fixed dvs-z-10 dvs-w-1/3">
            <ul
              class="dvs-bg-white dvs-absolute dvs-text-black dvs-rounded-sm dvs-mt-2 dvs-text-sm"
            >
              <li
                v-for="result in searchResults"
                :key="result.id"
                class="dvs-px-4 dvs-py-2 dvs-border-b dvs-border-gray-500dvs-cursor-pointer"
                @click="selectPage(result)"
              >
                {{ result.site }}: {{ result.title }} - {{ result.verison_name }} ({{
                  result.language
                }})
              </li>
            </ul>
          </div>
        </div>
        <div v-if="pageToCopyTo.site" class="dvs-mb-8">
          Copying to: {{ pageToCopyTo.site }} {{ pageToCopyTo.title }}
          {{ pageToCopyTo.verison_name }} ({{ pageToCopyTo.language }})
        </div>
        <button
          class="dvs-btn dvs-btn-primary dvs-mr-2"
          :disabled="!pageToCopyTo.site"
          @click="confirmCopy"
        >
          Confirm
        </button>
        <button class="dvs-btn dvs-btn-secondary" @click="close">Cancel</button>
      </div>
    </template>
  </admin-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'CopySliceToPage',
  components: {
    AdminContainer: () =>
      import(/* webpackChunkName: "devise-administration" */ '../../admin/ui/AdminContainer'),
  },
  props: {
    slice: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      searchTerm: '',
      searchResults: [],
      siteToCopyTo: null,
      pageToCopyTo: {},
    };
  },
  computed: {
    ...mapState('devise', ['sites']),
  },
  mounted() {
    this.siteToCopyTo = this.currentPage.site.id;
  },
  methods: {
    ...mapActions('devise', ['searchPageVersions', 'copyPageSlice']),
    requestSearch() {
      this.searchPageVersions({ term: this.searchTerm, site_id: this.siteToCopyTo }).then(
        results => {
          this.searchResults = [];
          for (const id in results.data) {
            if (results.data[id]) {
              const result = results.data[id];
              if (result.site_id === this.siteToCopyTo) {
                this.searchResults.push(result);
              }
            }
          }
        }
      );
    },
    selectPage(page) {
      this.pageToCopyTo = Object.assign({}, page);
      this.clearSearch();
    },
    confirmCopy() {
      this.copyPageSlice({
        copy_slice_id: this.slice.metadata.instance_id,
        page_version_id: this.pageToCopyTo.id,
      }).then(() => {
        this.close();
      });
    },
    clearSearch() {
      this.searchResults = [];
      this.searchTerm = '';
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>
