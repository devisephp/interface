<template>
  <div>
    <transition name="fast-fade">
      <div
        v-if="localFile"
        class="dvs-flex dvs-p-4 dvs-overflow-hidden dvs-fixed dvs-absolute-center dvs-z-50 dvs-bg-white dvs-rounded dvs-shadow-lg"
      >
        <div
          class="dvs-absolute z-10 dvs-top-0 dvs-right-0 dvs-mt-4 dvs-mr-4 dvs-cursor-pointer"
          @click.stop.prevent="closeFile(localFile)"
        >
          <close-icon w="30" h="30" />
        </div>

        <div class="dvs-w-1/2 dvs-mr-8 dvs-flex dvs-flex-col dvs-justify-between">
          <div>
            <transition name="dvs-fade" mode="out-in">
              <img
                v-show="localFile.loaded"
                :src="`/styled/preview/${localFile.url}?w=500&h=500`"
                class="dvs-cursor-pointer dvs-mb-4"
                @load="imageLoaded"
              />
            </transition>

            <loading-screen
              v-if="!localFile.loaded"
              key="loadingscreen"
              :inline="true"
              inline-message="Loading Large Preview"
            ></loading-screen>
          </div>

          <div class="dvs-flex dvs-justify-between">
            <div class="dvs-flex">
              <div
                v-devise-alert-confirm="{
                  callback: confirmedDeleteFile,
                  arguments: localFile,
                  message: 'Are you sure you want to delete this media?',
                }"
                class="dvs-mr-4 dvs-cursor-pointer dvs-text-gray-800"
              >
                <trash-icon h="20" w="20" />
              </div>
              <a
                class="dvs-mr-4 dvs-text-gray-800"
                :href="`/styled/preview/${localFile.url}`"
                target="_blank"
              >
                <link-icon h="20" w="20" />
              </a>
              <a
                :href="`/styled/preview/${localFile.url}`"
                target="_blank"
                class="dvs-text-gray-800"
                download
              >
                <download-icon h="20" w="20" />
              </a>
            </div>

            <div class="dvs-text-gray-600 dvs-text-sm dvs-uppercase dvs-font-bold">
              {{ width }} x {{ height }}
            </div>
          </div>
        </div>
        <div class="dvs-w-1/2">
          <h6 class="dvs-text-xs dvs-uppercase dvs-mb-1">Filename</h6>
          <p class="dvs-text-sm">{{ localFile.name }}</p>

          <fieldset class="dvs-fieldset dvs-mb-4">
            <label class="dvs-text-xs dvs-uppercase dvs-mb-1">URL</label>
            <input type="text" class="w-full" :value="localFile.url" readonly />
          </fieldset>

          <fieldset class="dvs-fieldset dvs-mb-4">
            <label class="dvs-text-xs dvs-uppercase dvs-mb-1">Global Caption</label>
            <div class="dvs-flex">
              <input v-model="localFile.alt" type="text" class="dvs-mr-4" />
              <button
                class="dvs-btn dvs-btn-sm dvs-btn-primary"
                @click="requestSaveCaption(localFile)"
              >
                Save Caption
              </button>
            </div>
          </fieldset>

          <p>
            <button
              class="dvs-btn dvs-btn-sm dvs-btn-primary"
              @click="selectSourceFile(localFile)"
            >
              Select
            </button>
          </p>

          <template v-if="isActive(localFile)">
            <h6 class="dvs-my-2 dvs-text-sm">Appears On</h6>
            <ul>
              <li v-for="field in localFile.fields" :key="field.id" class="dvs-py-2">
                <a :href="field.page_slug" target="_blank" class="dvs-btn dvs-btn-sm"
                  >{{ field.page_title }} - {{ field.field_name }}</a
                >
              </li>
            </ul>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'DeviseOpenMediaFile',
  components: {
    LoadingScreen: () =>
      import(/* webpackChunkName: "devise-utilities" */ '../../utilities/LoadingScreen.vue'),
    TrashIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/TrashIcon'),
    CloseIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/XIcon'),
    LinkIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/LinkIcon'),
    DownloadIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/DownloadCloudIcon'),
  },

  props: {
    value: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      width: 0,
      height: 0,
    };
  },

  computed: {
    localFile: {
      get() {
        return this.value;
      },
      set(file) {
        this.$emit('input', file);
      },
    },
  },

  methods: {
    ...mapActions('devise', ['saveCaption', 'deleteFile']),
    selectSourceFile(file) {
      this.$emit('selectSourceFile', file);
    },
    requestSaveCaption(file) {
      const payload = {
        image: file.url,
        alt_text: file.alt,
      };
      this.saveCaption(payload);
    },
    confirmedDeleteFile(file) {
      this.deleteFile(file).then(() => {
        this.$emit('fileDeleted');
      });
    },
    closeFile() {
      this.$emit('close');
    },
    isActive(file) {
      return file.used_count > 0;
    },

    imageLoaded() {
      this.localFile.loaded = true;
      this.calculateImageSize();
    },

    calculateImageSize() {
      const img = new Image();
      img.src = `/styled/preview/${this.localFile.url}`;
      img.onload = () => {
        this.width = img.width;
        this.height = img.height;
      };
    },
  },
};
</script>
