<template>
  <div class="media-manager-interface dvs-text-gray-800" style="max-width:95vw">
    <div
      style="min-height:70px;"
      class="dvs-py-4 dvs-px-8 dvs-rounded-tl dvs-rounded-tr dvs-flex dvs-justify-between dvs-items-center dvs-bg-gray-300 dvs-relative"
    >
      <div class="pr-16">
        <div
          v-if="currentDirectory !== ''"
          class="dvs-flex dvs-justify-between dvs-items-center dvs-font-bold dvs-text-sm dvs-tracking-tight"
        >
          <breadcrumbs
            :current-directory="currentDirectory"
            @chooseDirectory="changeDirectories"
          ></breadcrumbs>
        </div>
      </div>
      <div class="dvs-flex dvs-items-center dvs-text-gray-600">
        <fieldset class="dvs-fieldset dvs-mr-8">
          <div class="dvs-flex dvs-items-center">
            <label class="dvs-mr-2 dvs-my-2">Remember Location?</label>
            <input
              v-model="cookieSettings"
              class="dvs-my-2"
              type="checkbox"
              @click="refreshDirectory"
            />
          </div>
        </fieldset>
        <fieldset class="dvs-fieldset dvs-mr-8">
          <div class="dvs-flex dvs-items-center">
            <label class="dvs-mr-2 dvs-my-2">Contact Sheet</label>
            <input v-model="mode" class="dvs-my-2" type="radio" value="contactSheet" />
          </div>
        </fieldset>
        <fieldset class="dvs-fieldset dvs-mr-8">
          <div class="dvs-flex dvs-items-center">
            <label class="dvs-mr-2 dvs-my-2">Thumbnails</label>
            <input v-model="mode" class="dvs-my-2" type="radio" value="thumbnails" />
          </div>
        </fieldset>
        <fieldset class="dvs-fieldset">
          <div class="dvs-flex dvs-items-center">
            <label class="dvs-mr-2 dvs-my-2">List</label>
            <input v-model="mode" class="dvs-my-2" type="radio" value="list" />
          </div>
        </fieldset>
      </div>
    </div>

    <div class="dvs-flex dvs-items-stretch" style="max-height:80vh">
      <div class="dvs-relative dvs-max-h-full dvs-flex" style="min-width:300px;">
        <div
          class="dvs-h-full dvs-p-8 dvs-bg-gray-400est dvs-flex dvs-flex-col dvs-justify-start dvs-border-r dvs-border-lighter"
        >
          <form @submit.prevent="search">
            <div class="dvs-mb-8 flex">
              <fieldset class="dvs-fieldset dvs-mr-2">
                <input
                  ref="search"
                  v-model="searchTerms"
                  type="text"
                  placeholder="Search"
                  class="mr-2"
                />
              </fieldset>
              <button type="submit" class="dvs-btn dvs-btn-primary dvs-btn-sm">Search</button>
            </div>
          </form>

          <vue-scrollbar ref="Scrollbar" class="dvs-w-full dvs-flex-grow">
            <ul class="dvs-pb-8 dvs-font-bold dvs-text-gray-600 dvs-text-sm dvs-tracking-tight">
              <li
                v-for="directory in directories"
                :key="directory.id"
                class="dvs-flex items center dvs-cursor-pointer dvs-mt-2 dvs-text-bold"
                @click="changeDirectories(directory.path)"
              >
                <folder-icon class="dvs-mr-2"></folder-icon>
                {{ directory.name }}
              </li>
              <li v-if="directories.length < 1">No directories within this directory</li>
            </ul>
          </vue-scrollbar>

          <div class="dvs-flex dvs-flex-col">
            <fieldset class="dvs-fieldset dvs-mb-4">
              <input
                v-model="directoryToCreate"
                type="text"
                placeholder="New Directory"
                class="mr-2"
              />
            </fieldset>
            <button class="dvs-btn dvs-btn-primary dvs-btn-sm" @click="requestCreateDirectory()">
              Create
            </button>
          </div>
        </div>
      </div>

      <div
        class="dvs-flex-grow dvs-relative dvs-overflow-y-scroll dvs-p-4 dvs-pl-16 dvs-max-h-full"
        :class="{ 'w-full': directories.length < 1 }"
      >
        <div v-if="searchResults.length > 0" class="dvs-p-8 dvs-flex">
          <h4>
            Showing up to {{ searchResultsLimit }} results for:
            <strong>{{ searchTerms }}</strong>
          </h4>
          <div @click="closeSearch">
            <close-icon class="dvs-ml-2 dvs-cursor-pointer" w="30" h="30" />
          </div>
        </div>

        <div
          v-else-if="searchableMedia.data.length > 0 && searchTerms !== null && searchTerms !== ''"
          class="dvs-p-8 dvs-flex"
        >
          <h4>
            Hit "Search" for results of:
            <strong>{{ searchTerms }}</strong>
          </h4>
          <div @click="closeSearch">
            <close-icon class="dvs-ml-2 dvs-cursor-pointer" w="30" h="30" />
          </div>
        </div>

        <!-- File uploader -->
        <transition mode="out-in" name="dvs-fade">
          <uploader
            v-if="!loadingDirectory"
            key="uploader"
            :current-directory="currentDirectory"
            @all-files-uploaded="refreshDirectory"
          ></uploader>
          <loading-screen
            v-else
            key="loadingscreen"
            :inline="true"
            inline-message="Loading Directory"
          ></loading-screen>
        </transition>

        <!-- Delete Directory -->
        <transition mode="out-in" name="dvs-fade">
          <div
            v-if="
              !loadingDirectory &&
                currentFiles.length < 1 &&
                directories.length < 1 &&
                currentDirectory !== ''
            "
          >
            <div
              class=" dvs-bg-gray-100 dvs-text-gray-600 dvs-rounded dvs-p-8 dvs-text-center dvs-shadow dvs-cursor-pointer dvs-flex dvs-justify-center dvs-items-center"
              @click="requestDeleteDirectory()"
            >
              <trash-icon h="60" w="60" class="dvs-mr-2" />
              <h6 class="dvs-text-sm">Delete this directory</h6>
            </div>
          </div>
        </transition>

        <!-- Directories but no files -->
        <transition mode="out-in" name="dvs-fade">
          <div v-if="!loadingDirectory">
            <div
              v-if="currentFiles.length < 1 && directories.length > 0 && currentDirectory !== ''"
              class="dvs-flex dvs-justify-center dvs-items-center dvs-absolute dvs-absolute-center"
            >
              <div class="dvs-bg-white dvs-rounded dvs-p-8 dvs--mt-15 dvs-text-center dvs-shadow">
                <folder-icon h="40" w="40" class="dvs-text-admin-bg" />
                <h6 class="dvs-mt-2 dvs-text-sm">
                  <span>No files in this directory</span>
                </h6>
              </div>
            </div>

            <media-selector-files :current-files="currentFiles" :mode="mode" @openFile="openFile">
            </media-selector-files>

            <!-- Open File -->
            <media-selector-open-file
              :file="currentlyOpenFile"
              @fileDeleted="changeDirectories(currentDirectory)"
              @close="currentlyOpenFile = null"
              @selectSourceFile="selectSourceFile"
            >
            </media-selector-open-file>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

// eslint-disable-next-line no-undef
const Cookies = require('js-cookie');

export default {
  components: {
    MediaSelectorOpenFile: () =>
      import(/* webpackChunkName: "devise-media-selector" */ './media-selector/OpenMediaFile.vue'),
    MediaSelectorFiles: () =>
      import(/* webpackChunkName: "devise-media-selector" */ './media-selector/Files.vue'),
    Breadcrumbs: () => import(/* webpackChunkName: "devise-media" */ './Breadcrumbs.vue'),
    Uploader: () => import(/* webpackChunkName: "devise-utilities" */ '../utilities/Uploader.vue'),
    LoadingScreen: () =>
      import(/* webpackChunkName: "devise-utilities" */ '../utilities/LoadingScreen.vue'),
    FolderIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/FolderIcon'),
    TrashIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/TrashIcon'),
    CloseIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/XIcon'),
    VueScrollbar: () => import(/* webpackChunkName: "devise-administration" */ 'vue2-scrollbar'),
  },
  data() {
    return {
      mode: 'thumbnails',
      directoryToCreate: '',
      searchTerms: null,
      searchResults: [],
      searchResultsLimit: 100,
      currentlyOpenFile: null,
      cookieSettings: false,
      loadingDirectory: false,
    };
  },
  computed: {
    ...mapGetters('devise', ['files', 'directories', 'currentDirectory', 'searchableMedia']),
    currentFiles() {
      if (this.searchResults.length > 0) {
        return this.searchResults;
      }
      return this.files;
    },
    uploadHeaders() {
      const token = document.head.querySelector('meta[name="csrf-token"]');
      return {
        'X-CSRF-TOKEN': token.content,
      };
    },
  },
  watch: {
    cookieSettings: newValue => {
      if (!newValue) {
        Cookies.remove('devise-mediamanager-location');
      }
    },
    mode(newValue) {
      Cookies.set('devise-mediamanager-mode', newValue);
    },
    directories() {
      if (typeof this.$refs.Scrollbar !== 'undefined') {
        this.$refs.Scrollbar.calculateSize();
        this.$refs.Scrollbar.scrollToY(0);
      }
    },
  },
  mounted() {
    this.loadInitialLocation();
    this.loadInitialMode();
  },
  methods: {
    ...mapActions('devise', [
      'setCurrentDirectory',
      'generateImages',
      'getCurrentFiles',
      'getCurrentDirectories',
      'mediaSearch',
      'deleteFile',
      'createDirectory',
      'deleteDirectory',
    ]),
    loadInitialLocation() {
      const cookieLocation = Cookies.get('devise-mediamanager-location');
      if (cookieLocation) {
        this.changeDirectories(cookieLocation);
        this.cookieSettings = true;
      } else {
        this.changeDirectories('');
      }
    },
    loadInitialMode() {
      const cookieMode = Cookies.get('devise-mediamanager-mode');
      if (cookieMode) {
        this.mode = cookieMode;
      }
    },
    changeDirectories(directory) {
      this.loadingDirectory = true;
      this.searchTerms = null;
      this.$set(this, 'searchResults', []);

      this.setCurrentDirectory(directory).then(() => {
        this.getCurrentFiles(this.options).then(() => {
          this.getCurrentDirectories().then(() => {
            this.loadingDirectory = false;
            if (this.cookieSettings) {
              Cookies.set('devise-mediamanager-location', directory);
            }
          });
        });
      });
    },
    refreshDirectory() {
      this.changeDirectories(this.currentDirectory);
    },
    uploadError() {
      window.deviseSettings.$bus.$emit('showError', {
        title: 'Upload Error',
        message:
          'There was a problem uploading your file. The file may be too large to be uploaded.',
      });
    },
    getUrlParam(paramName) {
      const reParam = new RegExp(`(?:[?&]|&)${paramName}=([^&]+)`, 'i');
      const match = window.location.search.match(reParam);

      return match && match.length > 1 ? match[1] : null;
    },
    openFile(file) {
      if (!this.currentlyOpenFile || file.url !== this.currentlyOpenFile.url) {
        this.$set(this, 'currentlyOpenFile', file);
        this.$set(this.currentlyOpenFile, 'loaded', false);
      }
    },
    closeFile() {
      this.$set(this, 'currentlyOpenFile', {});
    },
    selectSourceFile(file) {
      this.$emit('selectSourceFile', file);
    },
    requestCreateDirectory() {
      const self = this;

      // check to see if the directory already exists in the current location
      const existingMatches = this.directories.filter(dir => dir.name === self.directoryToCreate);

      if (existingMatches.length === 0) {
        this.createDirectory({
          directory: self.currentDirectory,
          name: self.directoryToCreate,
        }).then(() => {
          self.changeDirectories(self.currentDirectory);
          self.directoryToCreate = '';
        });
      } else {
        window.deviseSettings.$bus.$emit('showError', {
          title: 'Duplicate Name',
          message: 'There was already a directory with this name created in the current location.',
        });
      }
    },
    requestDeleteDirectory() {
      const self = this;
      this.deleteDirectory(self.currentDirectory).then(() => {
        self.changeDirectories('');
      });
    },
    search() {
      this.mediaSearch(this.searchTerms).then(results => {
        this.searchResults = results;
        if (results.length < 1) {
          window.deviseSettings.$bus.$emit('showError', {
            title: 'Hey there',
            message: `No search results for "${this.searchTerms}"`,
          });
        }
      });
    },
    closeSearch() {
      this.searchTerms = null;
      this.$set(this, 'searchResults', []);
    },
    close() {
      this.show = false;
      this.imageSettings = Object.assign({});
      this.$set(this, 'selectedFile', null);
    },
  },
};
</script>
