<template>

  <div
    class="media-manager-interface dvs-shadow-lg"
    style="max-width:95vw"
  >
    <div
      style="min-height:70px;"
      class="dvs-py-4 dvs-px-8 dvs-rounded-tl dvs-rounded-tr dvs-flex dvs-justify-between dvs-items-center dvs-bg-grey-lighter dvs-border-b dvs-border-lighter dvs-relative"
    >
      <div>
        <div class="dvs-font-bold">Media Manager</div>
        <div
          class="dvs-flex dvs-mt-2 dvs-justify-between dvs-items-center dvs-font-mono dvs-text-sm dvs-tracking-tight"
          v-if="currentDirectory !== ''"
        >
          <breadcrumbs
            :currentDirectory="currentDirectory"
            @chooseDirectory="changeDirectories"
          ></breadcrumbs>
        </div>
      </div>
      <div class="dvs-flex dvs-items-center">
        <fieldset class="dvs-fieldset dvs-mr-8">
          <div class="dvs-flex dvs-items-center">
            <label class="dvs-mr-2 dvs-my-2">Remember Location?</label>
            <input
              class="dvs-my-2"
              type="checkbox"
              v-model="cookieSettings"
            >
          </div>
        </fieldset>
        <fieldset class="dvs-fieldset dvs-mr-8">
          <div class="dvs-flex dvs-items-center">
            <label class="dvs-mr-2 dvs-my-2">Contact Sheet</label>
            <input
              class="dvs-my-2"
              type="radio"
              value="contactSheet"
              v-model="mode"
            >
          </div>
        </fieldset>
        <fieldset class="dvs-fieldset dvs-mr-8">
          <div class="dvs-flex dvs-items-center">
            <label class="dvs-mr-2 dvs-my-2">Thumbnails</label>
            <input
              class="dvs-my-2"
              type="radio"
              value="thumbnails"
              v-model="mode"
            >
          </div>
        </fieldset>
        <fieldset class="dvs-fieldset">
          <div class="dvs-flex dvs-items-center">
            <label class="dvs-mr-2 dvs-my-2">List</label>
            <input
              class="dvs-my-2"
              type="radio"
              value="list"
              v-model="mode"
            >
          </div>
        </fieldset>
      </div>
    </div>

    <div
      class="dvs-flex dvs-items-stretch"
      style="max-height:80vh"
    >
      <div
        v-bar
        class="dvs-min-w-1/3"
      >
        <div>
          <div class="dvs-h-full dvs-p-8 dvs-bg-grey-lightest dvs-flex dvs-flex-col dvs-justify-between dvs-border-r dvs-border-lighter">
            <form @submit.prevent="search">
              <div class="mb-8 flex">
                <fieldset class="dvs-fieldset mr-2">
                  <input
                    type="text"
                    placeholder="Search"
                    v-model="searchTerms"
                    ref="search"
                    class="mr-2"
                  >
                </fieldset>
                <button
                  type="submit"
                  class="dvs-btn dvs-btn-sm"
                  :style="theme.actionButton"
                >Search</button>
              </div>
            </form>

            <ul class="dvs-list-reset dvs-mb-10 dvs-font-mono dvs-text-sm dvs-tracking-tight">
              <li
                v-for="directory in directories"
                :key="directory.id"
                class="dvs-cursor-pointer dvs-mt-2 dvs-text-bold"
                @click="changeDirectories(directory.path)"
              >
                <folder-icon class="dvs-mr-2"></folder-icon>
                {{ directory.name }}
              </li>
              <li v-if="directories.length < 1">No directories within this directory</li>
            </ul>

            <div class="dvs-flex dvs-flex-col">
              <fieldset class="dvs-fieldset dvs-mb-4">
                <input
                  type="text"
                  placeholder="New Directory"
                  v-model="directoryToCreate"
                  class="mr-2"
                >
              </fieldset>
              <button
                class="dvs-btn dvs-btn-sm"
                @click="requestCreateDirectory()"
                :style="theme.actionButton"
              >Create</button>
            </div>
          </div>
        </div>
      </div>

      <div
        class="dvs-flex-grow dvs-relative dvs-overflow-y-scroll dvs-p-4"
        :class="{'w-full': directories.length < 1}"
      >
        <div
          class="dvs-p-8 dvs-flex"
          v-if="searchResults.length > 0"
        >
          <h4>
            Showing up to {{ searchResultsLimit }} results for:
            <strong>{{ searchTerms }}</strong>
          </h4>
          <div @click="closeSearch">
            <close-icon
              class="dvs-ml-2 dvs-cursor-pointer"
              w="30"
              h="30"
            />
          </div>
        </div>

        <div
          class="dvs-p-8 dvs-flex"
          v-else-if="searchableMedia.data.length > 0 && searchTerms !== null && searchTerms !== ''"
        >
          <h4>
            Hit "Search" for results of:
            <strong>{{ searchTerms }}</strong>
          </h4>
          <div @click="closeSearch">
            <close-icon
              class="dvs-ml-2 dvs-cursor-pointer"
              w="30"
              h="30"
            />
          </div>
        </div>

        <!-- File uploader -->
        <uploader
          :current-directory="currentDirectory"
          @all-files-uploaded="refreshDirectory"
        ></uploader>

        <!-- Delete Directory -->
        <div
          v-if="currentFiles.length < 1 && directories.length < 1 && currentDirectory !== ''"
          class="dvs-flex dvs-justify-center dvs-items-center dvs-absolute dvs-absolute-center"
        >
          <div
            class="dvs-bg-white dvs-text-grey-dark dvs-rounded dvs-p-8 dvs--mt-15 dvs-text-center dvs-shadow dvs-cursor-pointer"
            @click="requestDeleteDirectory()"
          >
            <trash-icon
              h="40"
              w="40"
              :style="{color: theme.panel.color}"
            />
            <h6 class="dvs-mt-2 dvs-text-sm">Delete this directory</h6>
          </div>
        </div>

        <!-- Directories but no files -->
        <div
          v-if="currentFiles.length < 1 && directories.length > 0 && currentDirectory !== ''"
          class="dvs-flex dvs-justify-center dvs-items-center dvs-absolute dvs-absolute-center"
        >
          <div class="dvs-bg-white dvs-rounded dvs-p-8 dvs--mt-15 dvs-text-center dvs-shadow">
            <folder-icon
              h="40"
              w="40"
              :style="{color: theme.panel.color}"
            />
            <h6 class="dvs-mt-2 dvs-text-sm">
              <span>No files in this directory</span>
            </h6>
          </div>
        </div>

        <!-- Files -->
        <ul
          class="dvs-list-reset dvs-flex dvs-justify-center dvs-flex-wrap"
          v-else
        >
          <li
            v-for="file in currentFiles"
            :key="file.id"
            class="dvs-relative dvs-bg-white dvs-card"
            :class="{
                  'dvs-cursor-pointer': !file.on,
                  'dvs-border-b dvs-border-lighter dvs-p-0 dvs-mx-0 w-1/2': mode === 'thumbnails',
                  'dvs-p-0 dvs-mb-4 dvs-mt-2': mode !== 'thumbnails',
                  'dvs-mx-2': mode === 'contactSheet',
                  'dvs-w-full': mode === 'list'
                }"
            @click="openFile(file)"
          >
            <!-- Close File if On -->
            <div
              v-if="file === currentlyOpenFile"
              @click.stop.prevent="closeFile(file)"
              class="dvs-absolute z-10 dvs-pin-t dvs-pin-r dvs-mt-4 dvs-mr-4 dvs-cursor-pointer"
            >
              <close-icon
                w="30"
                h="30"
              />
            </div>

            <!-- Closed File -->
            <div
              class="dvs-overflow-hidden"
              v-if="file !== currentlyOpenFile"
            >
              <!-- Contact Sheet -->
              <div
                class="dvs-overflow-hidden dvs-text-center"
                style="width:100px;height:105px"
                v-if="mode === 'contactSheet'"
              >
                <img
                  :src="`/styled/preview/${file.url}?w=100&h=100`"
                  style="min-width:75px;height:75px"
                >
                <div class="dvs-text-xs dvs-font-bold dvs-px-2">{{ file.name }}</div>
              </div>

              <!-- Thumbnails Mode -->
              <div
                class="dvs-grid-preview dvs-relative"
                :style="`background-size:cover;background-image:url('${`/styled/preview/${file.url}?w=600&h=300&q=100&sharp=2`}')`"
                v-else-if="mode === 'thumbnails'"
              ></div>

              <!-- List Mode -->
              <div
                class="dvs-w-full dvs-flex dvs-items-center"
                v-else
              >
                <img
                  :src="`/styled/preview/${file.url}?w=100&h=100`"
                  style="min-width:75px;height:75px"
                >
                <div class="dvs-px-4 dvs-font-bold">{{ file.name }}</div>
              </div>
            </div>

            <!-- Open File -->
            <div
              v-else
              class="dvs-flex dvs-p-4 dvs-overflow-hidden"
            >
              <div class="dvs-w-1/2 dvs-mr-8 dvs-flex dvs-flex-col dvs-justify-between">
                <img
                  :src="`/styled/preview/${file.url}?w=500&h=500`"
                  class="dvs-cursor-pointer dvs-mb-4"
                >
                <div class="dvs-flex">
                  <div
                    class="dvs-mr-4 dvs-cursor-pointer"
                    :style="{color: theme.actionButton.background}"
                    v-devise-alert-confirm="{callback: confirmedDeleteFile, arguments: file, message: 'Are you sure you want to delete this media?'}"
                  >
                    <trash-icon
                      h="20"
                      w="20"
                    />
                  </div>
                  <a
                    class="dvs-mr-4"
                    :href="file.url"
                    target="_blank"
                    :style="{color: theme.actionButton.background}"
                  >
                    <link-icon
                      h="20"
                      w="20"
                    />
                  </a>
                  <a
                    :href="file.url"
                    target="_blank"
                    :style="{color: theme.actionButton.background}"
                    download
                  >
                    <download-icon
                      h="20"
                      w="20"
                    />
                  </a>
                </div>
              </div>
              <div class="dvs-w-1/2">
                <h6 class="dvs-text-xs dvs-uppercase dvs-mb-1">Filename</h6>
                <p class="dvs-text-sm">{{ file.name }}</p>

                <fieldset class="dvs-fieldset dvs-mb-4">
                  <label class="dvs-text-xs dvs-uppercase dvs-mb-1">URL</label>
                  <input
                    type="text"
                    :value="file.url"
                    readonly
                  >
                </fieldset>

                <fieldset class="dvs-fieldset dvs-mb-4">
                  <label class="dvs-text-xs dvs-uppercase dvs-mb-1">Global Caption</label>
                  <div class="dvs-flex">
                    <input
                      type="text"
                      v-model="file.alt"
                      class="dvs-mr-4"
                    >
                    <button
                      class="dvs-btn dvs-btn-sm"
                      :style="theme.actionButton"
                      @click="requestSaveCaption(file)"
                    >
                      Save Caption
                    </button>
                  </div>
                </fieldset>

                <p>
                  <button
                    @click="selectSourceFile(file)"
                    class="dvs-btn"
                    :style="theme.actionButton"
                  >Select</button>
                </p>

                <template v-if="isActive(file)">
                  <h6 class="dvs-my-2 dvs-text-sm">Appears On</h6>
                  <ul class="dvs-list-reset">
                    <li
                      v-for="field in file.fields"
                      :key="field.id"
                      class="dvs-py-2"
                    >
                      <a
                        :href="field.page_slug"
                        target="_blank"
                        class="dvs-btn dvs-btn-sm"
                      >{{ field.page_title }} - {{ field.field_name }}</a>
                    </li>
                  </ul>
                </template>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';

const Cookies = require('js-cookie');

export default {
  computed: {
    ...mapGetters('devise', ['files', 'directories', 'currentDirectory', 'searchableMedia']),
    currentFiles () {
      if (this.searchResults.length > 0) {
        return this.searchResults;
      }
      return this.files;
    },
    uploadHeaders () {
      const token = document.head.querySelector('meta[name="csrf-token"]');
      return {
        'X-CSRF-TOKEN': token.content,
      };
    },
  },
  data () {
    return {
      mode: 'list',
      directoryToCreate: '',
      searchTerms: null,
      searchResults: [],
      searchResultsLimit: 100,
      currentlyOpenFile: null,
      cookieSettings: false,
    };
  },
  mounted () {
    this.loadInitialLocation();
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
      'saveCaption'
    ]),
    loadInitialLocation () {
      const cookieLocation = Cookies.get('devise-mediamanager-location');
      if (cookieLocation) {
        this.changeDirectories(cookieLocation);
        this.cookieSettings = true;
      } else {
        this.changeDirectories('');
      }

      const cookieMode = Cookies.get('devise-mediamanager-mode');
      if (cookieMode) {
        this.mode = cookieMode;
      }
    },
    changeDirectories (directory) {
      this.searchTerms = null;
      this.$set(this, 'searchResults', []);

      this.setCurrentDirectory(directory).then(() => {
        this.getCurrentFiles(this.options).then(() => {
          this.getCurrentDirectories().then(() => {
            if (this.cookieSettings) {
              Cookies.set('devise-mediamanager-location', directory);
            }
          });
        });
      });
    },
    isActive (file) {
      return file.used_count > 0;
    },
    refreshDirectory () {
      this.changeDirectories(this.currentDirectory);
    },
    uploadError () {
      window.deviseSettings.$bus.$emit('showError', {
        title: 'Upload Error',
        message:
          'There was a problem uploading your file. The file may be too large to be uploaded.',
      });
    },
    getUrlParam (paramName) {
      const reParam = new RegExp(`(?:[?&]|&)${paramName}=([^&]+)`, 'i');
      const match = window.location.search.match(reParam);

      return match && match.length > 1 ? match[1] : null;
    },
    openFile (file) {
      this.$set(this, 'currentlyOpenFile', file);
    },
    closeFile () {
      this.$set(this, 'currentlyOpenFile', {});
    },
    selectSourceFile (file) {
      this.$emit('selectedfile', file)
    },
    confirmedDeleteFile (file) {
      const self = this;
      this.deleteFile(file).then(() => {
        self.changeDirectories(self.currentDirectory);
      });
    },
    requestSaveCaption (file) {
      const payload = {
        image: file.url,
        alt_text: file.alt
      }
      this.saveCaption(payload)
    },
    requestCreateDirectory () {
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
    requestDeleteDirectory () {
      const self = this;
      this.deleteDirectory(self.currentDirectory).then(() => {
        self.changeDirectories('');
      });
    },
    search () {
      this.mediaSearch(this.searchTerms).then(results => {
        this.searchResults = results;
        if (results.length < 1) {
          window.deviseSettings.$bus.$emit(
            'showError',
            {
              'title': 'Hey there',
              'message': `No search results for "${this.searchTerms}"`
            }
          )
        }
      });
    },
    closeSearch () {
      this.searchTerms = null;
      this.$set(this, 'searchResults', []);
    },
    close () {
      this.show = false;
      this.imageSettings = Object.assign({});
      this.$set(this, 'selectedFile', null);
    },
  },
  watch: {
    cookieSettings: newValue => {
      if (!newValue) {
        Cookies.remove('devise-mediamanager-location');
        Cookies.remove('devise-mediamanager-mode');
      }
    },
    mode (newValue) {
      if (this.cookieSettings) {
        Cookies.set('devise-mediamanager-mode', newValue);
      }
    },
  },
  components: {
    Breadcrumbs: () => import(/* webpackChunkName: "devise-media" */ './Breadcrumbs.vue'),
    Uploader: () => import(/* webpackChunkName: "devise-utilities" */ '../utilities/Uploader.vue'),
    FolderIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/FolderIcon'),
    TrashIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/TrashIcon'),
    CloseIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/XIcon'),
    LinkIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/LinkIcon'),
    DownloadIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/DownloadCloudIcon'),
  },
};
</script>
