<template>
  <div>
    <portal-target name="app-root"></portal-target>

    <div id="devise-container" :class="[breakpoint, isPreviewFrame ? 'preview-frame' : '']">
      <administration v-if="isLoggedIn && !isPreviewFrame"/>

      <div id="dvs-app-content">
        <!-- Desktop mode in editor or just viewing page -->
        <div
          class="devise-content"
          v-if="typeof currentPage === 'undefined' || currentPage.previewMode === 'desktop' || isPreviewFrame"
        >
          <slot name="on-top"></slot>
          <slot name="static-content"></slot>

          <template v-if="typeof currentPage !== 'undefined' && currentPage.slices">
            <slices :slices="currentPage.slices" :editor-mode="isLoggedIn && !isPreviewFrame"></slices>
          </template>

          <slot name="static-content-bottom"></slot>
          <slot name="on-bottom"></slot>
        </div>

        <div id="devise-iframe-editor" v-if="typeof currentPage !== 'undefined' && !isPreviewFrame">
          <!-- Preview mode in editor -->
          <iframe
            v-if="currentPage.previewMode !== 'desktop' && isLoggedIn"
            :src="currentUrl"
            id="devise-responsive-preview"
            :class="[currentPage.previewMode]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Devise',
  data() {
    return {
      showLoadbar: false,
      loadbarPercentage: 0,
      pageMode: false,
    };
  },
  created() {
    this.setSizeAndBreakpoint();
  },
  mounted() {
    window.devise = this;
    window.deviseSettings.$bus = window.deviseSettings.$bus;

    this.initDevise();
  },
  methods: {
    ...mapActions('devise', ['setBreakpoint']),
    initDevise() {
      try {
        if (!this.isPreviewFrame) {
          this.currentPage.previewMode = 'desktop';
          this.page = window.deviseSettings.$page;
          this.$router.push({ name: 'devise-page-editor' });
        } else {
          this.page = window.parent.deviseSettings.$page;
        }
      } catch (e) {
        /* eslint-disable no-console */
        console.warn(
          'Devise: window.deviseSettings.$page or window.parent.deviseSettings.$page not found. Nothing to render'
        );
      }

      this.addWatchers();

      const self = this;
      this.$nextTick(() => {
        setTimeout(() => {
          self.removeBlocker();
          window.deviseSettings.$bus.$emit('devise-loaded');
        }, 10);
      });
    },
    removeBlocker() {
      const blocker = document.getElementById('devise-blocker');
      if (blocker) {
        blocker.classList.add('fade');
      }
    },
    addWatchers() {
      window.onresize = this.setSizeAndBreakpoint;
    },
    setSizeAndBreakpoint() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const breakpoint = this.findBreakpoint(width);

      this.setBreakpoint({
        breakpoint,
        diminsions: { width, height },
      });
    },
    findBreakpoint(width) {
      for (const breakpoint in this.deviseOptions.breakpoints) {
        if (this.deviseOptions.breakpoints.hasOwnProperty(breakpoint)) {
          if (width < this.deviseOptions.breakpoints[breakpoint]) {
            return breakpoint;
          }
        }
      }
      return 'ultraWideDesktop';
    },
  },
  computed: {
    ...mapGetters('devise', ['breakpoint', 'currentUser', 'currentPage']),
    currentUrl() {
      return window.location.href;
    },
    isPreviewFrame() {
      try {
        return window.self !== window.top;
      } catch (e) {
        return true;
      }
    },
    isLoggedIn() {
      return this.currentUser;
    },
  },
  components: {
    Administration: () =>
      import(/* webpackChunkName: "/devise-admin" */ './components/admin/Administration.vue'),
  },
};
</script>
