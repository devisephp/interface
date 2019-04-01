<template>
  <div class="dvs-fixed dvs-pin dvs-z-9999">
    <div
      class="dvs-absolute dvs-pin dvs-bg-black dvs-opacity-75 dvs-bg-blocker"
      @click="close"
    ></div>
    <div class="dvs-absolute dvs-absolute-center dvs--mt-2 z-10 dvs-text-center">
      <fieldset class="dvs-fieldset dvs-mb-4">
        <label :style="{color: theme.panel.color}">Site to copy to</label>
        <select
          v-model="siteToCopyTo"
          @change="clearSearch"
        >
          <option
            v-for="site in sites.data"
            :key="site.id"
            :value="site.id"
          >{{ site.name }}</option>
        </select>
      </fieldset>

      <fieldset class="dvs-fieldset">
        <label :style="{color: theme.panel.color}">Search for Page Version</label>
        <input
          type="text"
          v-model="searchTerm"
          @keyup="requestSearch"
        >
      </fieldset>

      <div class="dvs-relative">
        <ul class="dvs-list-reset dvs-bg-white dvs-absolute dvs-text-black dvs-rounded-sm dvs-mt-2 dvs-text-sm">
          <li
            v-for="result in searchResults"
            :key="result.id"
            class="dvs-px-4 dvs-py-2 dvs-border-b dvs-border-grey dvs-cursor-pointer"
            @click="selectPage(result)"
          >
            {{ result.site }}: {{result.title}} - {{ result.verison_name }} ({{ result.language }})
          </li>
        </ul>
      </div>
    </div>
    <panel
      :panel-style="theme.panel"
      class="dvs-absolute dvs-absolute-center dvs-p-8"
      v-bar
    >
      <div class="dvs-p-8 dvs-text-center">
        <h3 class="dvs-mb-20">Copy this slice to another page</h3>
        <div
          v-if="pageToCopyTo.site"
          class="dvs-mb-4"
        >
          {{ pageToCopyTo.site }}: {{pageToCopyTo.title}} - {{ pageToCopyTo.verison_name }} ({{ pageToCopyTo.language }})
        </div>
        <button
          class="dvs-btn dvs-mt-16"
          :style="theme.actionButton"
          @click="confirmCopy"
          :disabled="!pageToCopyTo.site"
        >Confirm</button>
      </div>
    </panel>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: "CopySliceToPage",
  props: {
    slice: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState('devise', ['sites'])
  },
  components: {
    Panel: () => import(/* webpackChunkName: "devise-utilities" */ "../../utilities/Panel")
  },
  data () {
    return {
      searchTerm: '',
      searchResults: [],
      siteToCopyTo: null,
      pageToCopyTo: {}
    }
  },
  mounted () {
    this.siteToCopyTo = this.currentPage.site.id
  },
  methods: {
    ...mapActions('devise', ['searchPageVersions', 'copyPageSlice']),
    requestSearch () {
      this.searchPageVersions({ term: this.searchTerm }).then((results) => {
        this.searchResults = []
        for (const id in results.data) {
          if (results.data.hasOwnProperty(id)) {
            const result = results.data[id];
            if (result.site_id === this.siteToCopyTo) {
              this.searchResults.push(result)
            }
          }
        }
      })
    },
    selectPage (page) {
      this.pageToCopyTo = Object.assign({}, page)
      this.clearSearch()
    },
    confirmCopy () {
      this.copyPageSlice({ copy_slice_id: this.slice.metadata.instance_id, page_version_id: this.pageToCopyTo.id }).then(() => {
        this.close()
      })
    },
    clearSearch () {
      this.searchResults = [];
      this.searchTerm = ''
    },
    close () {
      this.$emit('close')
    }
  },
}
</script>
