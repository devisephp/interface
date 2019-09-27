<template>
  <div>
    <div class="dvs-flex dvs-items-center">
      <input
        v-model="value"
        type="text"
        :maxlength="getMaxLength"
        disabled
      >
      <div @click="showMediaManager()">
        <document-icon
          class="dvs-ml-4 dvs-cursor-pointer"
          w="30px"
          h="30px"
        />
      </div>
      <div
        :class="{ ' dvs-opacity-25': !previewEnabled }"
        @click="loadPreview"
      >
        <search-icon
          class="dvs-ml-4 dvs-cursor-pointer"
          w="30px"
          h="30px"
        />
      </div>
    </div>

    <div v-if="showPreview">
      <portal to="devise-root">
        <div
          class="dvs-blocker"
          :style="{backgroundColor: 'transparent'}"
          @click="showPreview = false"
        ></div>
        <div class="dvs-modal dvs-fixed dvs-pin-b dvs-pin-r dvs-mx-8 dvs-mb-8 dvs-z-40 dvs-w-1/2">
          <img :src="value">
          <h6 class="dvs-text-base dvs-mb-4 dvs-mt-4">
            <span>{{ fileName }}</span>
            <br>
            <small class="dvs-text-xs">
              Location:
              <span class="dvs-italic dvs-font-normal">{{ value }}</span>
            </small>
          </h6>
          <div class="dvs-flex dvs-items-center dvs-mt-4 dvs-justify-between">
            <div>
              <button
                class="dvs-btn dvs-mr-2 dvs-btn-secondary"
                @click="showPreview = false"
              >Close</button>
            </div>
          </div>
        </div>
      </portal>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageField',
  components: {
    DocumentIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/ClipboardIcon'),
    SearchIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/SearchIcon'),
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showPreview: false,
    };
  },
  computed: {
    file: {
      get () {
        return this.value;
      },
      set (newValue) {
        this.$emit('input', newValue);
        this.$emit('change', newValue);
      },
    },
    fileName () {
      const parts = this.value.split('/');
      return parts[parts.length - 1];
    },
    previewEnabled () {
      return this.value !== '' && this.value !== null;
    },
    getMaxLength () {
      if (typeof this.settings !== 'undefined' && typeof this.settings.maxlength !== 'undefined') {
        return this.settings.maxlength;
      }
      return '';
    },
  },
  methods: {
    showMediaManager () {
      window.deviseSettings.$bus.$emit('devise-launch-media-manager', {
        callback: this.mediaSelected,
        options: {
          type: 'file',
        },
      });
    },
    mediaSelected (url) {
      this.file = url;
    },
    loadPreview () {
      if (this.previewEnabled) this.showPreview = true;
    },
  },
};
</script>
