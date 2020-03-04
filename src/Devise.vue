<template>
  <div>
    <portal-target name="app-root"></portal-target>

    <div id="devise-container" :class="[breakpoint, isPreviewFrame ? 'preview-frame' : '']">
      <administration v-if="can('access admin') && !isPreviewFrame" />
      <messages style="position:relative; z-index:9999" />

      <div id="dvs-app-content">
        <!-- Desktop mode in editor or just viewing page -->
        <div
          v-if="
            typeof currentPage === 'undefined' ||
              currentPage.previewMode === 'desktop' ||
              isPreviewFrame
          "
          class="devise-content"
        >
          <slot name="on-top"></slot>
          <slot name="static-content"></slot>

          <template v-if="typeof currentPage !== 'undefined' && currentPage.slices">
            <slices
              v-if="timeToShow"
              :slices="currentPage.slices"
              :editor-mode="can('access admin') && !isPreviewFrame"
            ></slices>
          </template>

          <!-- Logged in - no slices yet -->
          <div
            v-if="
              isLoggedIn &&
                typeof currentPage !== 'undefined' &&
                currentPage.slices &&
                currentPage.slices.length < 1
            "
            class="dvs-text-center dvs-py-16"
          >
            <img src="./imgs/logo-devise-painted-1.jpg" class="dvs-mb-32" />
            <h1 class="dvs-font-sans dvs-font-thin dvs-text-grey-darkest dvs-uppercase dvs-mb-4">
              Let's Get to Work
            </h1>
            <p class="dvs-text-xl dvs-text-grey-darker">
              Click "Add Slice" on the admin panel to start designing this page!
            </p>
          </div>

          <slot
            name="
            static-content-bottom"
          ></slot>
          <slot name="on-bottom"></slot>
        </div>

        <div
          v-if="typeof currentPage !== 'undefined' && !isPreviewFrame && isLoggedIn"
          id="devise-iframe-editor"
        >
          <!-- Preview mode in editor -->
          <iframe
            v-if="currentPage.previewMode !== 'desktop' && isLoggedIn"
            id="devise-responsive-preview"
            :src="currentUrl"
            :class="[currentPage.previewMode]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { setTimeout } from 'timers';

export default {
  name: 'Devise',

  components: {
    Administration: () =>
      import(
        /* webpackChunkName: "devise-administration" */ './components/admin/Administration.vue'
      ),
  },

  data() {
    return {
      timeToShow: false,
    };
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

  created() {
    this.setSizeAndBreakpoint();
  },
  mounted() {
    window.devise = this;

    if (this.can('access admin')) {
      this.initDevise();
    } else {
      this.$nextTick(() => {
        setTimeout(() => {
          window.deviseSettings.$bus.$emit('devise-loaded');
        }, 10);
      });
    }

    this.$nextTick(() => {
      this.timeToShow = true;
    });

    this.addWatchers();
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
          self.showMessages();
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
    showMessages() {
      const { errors } = window.deviseSettings.$messages;
      if (errors) {
        const keys = Object.keys(errors);
        for (const key of keys) {
          errors[key].forEach(e => {
            window.deviseSettings.$bus.$emit('showError', `${key}: ${e}`);
          });
        }
      }
    },
    addWatchers() {
      window.addEventListener('resize', this.setSizeAndBreakpoint);
    },
    setSizeAndBreakpoint() {
      console.log('hereddfd');
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
};
</script>
