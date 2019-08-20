<template>
  <div
    id="devise-admin"
    :class="[deviseOptions.adminClass]"
  >
    <panel
      class="dvs-m-8 dvs-fixed dvs-pin dvs-z-9980 dvs-flex dvs-pointer-events-none "
      v-tuck
    >
      <div class="dvs-flex dvs-shadow dvs-flex-col dvs-relative dvs-rounded dvs-bg-admin-bg dvs-pointer-events-auto">
        <preview-mode />

        <template v-for="(menuItem, key) in allowedAdminMenu">
          <button
            :key="key"
            :class="checkActivePanelSidebar(menuItem)"
            class="dvs-outline-none dvs-transitions-hover-slow dvs-cursor-pointer dvs-border-b dvs-text-admin-fg"
            @click.prevent="loadAdminPage(menuItem)"
          >
            <component
              v-bind:is="menuItem.icon"
              class="dvs-m-4"
              w="25"
              h="25"
            ></component>
          </button>
        </template>
        <a
          href="/logout}"
          class="dvs-outline-none dvs-transitions-hover-slow dvs-cursor-pointer"
          onclick="event.preventDefault(); document.getElementById('dvs-logout-form').submit();"
        >
          <power-icon
            class="dvs-m-4"
            w="25"
            h="25"
          />
        </a>

        <form
          id="dvs-logout-form"
          action="/logout"
          method="POST"
          style="display: none;"
        >
          <input
            type="hidden"
            name="_token"
            :value="csrf_field"
          >
        </form>
      </div>
      <div class="dvs-flex dvs-w-full">

        <transition
          name="dvs-fade"
          mode="out-in"
        >
          <router-view name="devise"></router-view>
        </transition>
      </div>
    </panel>

    <portal-target
      class="dvs-fixed dvs-pin dvs-z-9999"
      v-show="!hideDeviseRootPortal"
      name="devise-root"
      @change="deviseRootPortalContentChanged"
    ></portal-target>
    <media-manager class="dvs-z-9999" />
    <slice-settings />
    <loadbar class="dvs-relative dvs-z-9999" />
    <loading-screen class="dvs-relative dvs-z-9999" />
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';
import { setInterval } from 'timers';

export default {
  name: 'Administration',
  data () {
    return {
      everythingIsLoaded: false,
      hideDeviseRootPortal: true
    };
  },
  mounted () {
    Vue.component('help', () =>
      import(/* webpackChunkName: "devise-utilities" */ '../utilities/Help')
    );

    setTimeout(() => {
      this.everythingIsLoaded = true;
    }, 2000);

    setInterval(() => {
      this.pollIfLoggedIn()
    }, 30000);
  },
  methods: {
    ...mapActions('devise', ['getLanguages']),
    loadAdminPage (menuItem) {
      if (menuItem.routeName === 'media-manager') {
        window.deviseSettings.$bus.$emit('devise-launch-media-manager', {});
      } else if (typeof menuItem.routeParams !== 'undefined') {
        this.goToPage(menuItem.routeName, menuItem.routeParams);
      } else {
        this.goToPage(menuItem.routeName);
      }
    },
    checkActivePanelSidebar (menuItem) {
      if (this.$route.meta && this.$route.meta.parentRouteName) {
        if (
          this.$route.name === 'devise-pages-view' &&
          this.$route.params.pageId === this.currentPage.id &&
          menuItem.routeName === 'devise-pages-view'
        ) {
          return [' dvs-bg-admin-highlight dvs-bg-fg']
        }

        if (
          menuItem.routeName === this.$route.meta.parentRouteName &&
          (this.$route.name !== 'devise-pages-view' ||
            this.$route.params.pageId !== this.currentPage.id)
        ) {
          return [' dvs-bg-admin-highlight dvs-bg-fg']
        }
      }

      return [];
    },
    pollIfLoggedIn () {
      this.getLanguages().then(() => { }, (error) => {
        window.location.reload(true)
      })
    },
    deviseRootPortalContentChanged (content) {
      console.log(content)
      if (!content.passengers) {
        this.hideDeviseRootPortal = true
      } else {
        this.hideDeviseRootPortal = false
      }
    }
  },
  computed: {
    ...mapState('devise', ['adminMenu']),
    allowedAdminMenu () {
      return Object.keys(this.adminMenu)
        .filter((menuItem) => {
          if (!this.adminMenu[menuItem].permissions) {
            return true
          }
          return this.can(this.adminMenu[menuItem].permissions)
        })
        .reduce((obj, key) => {
          obj[key] = this.adminMenu[key];
          return obj;
        }, {});
    },
    user () {
      return window.deviseSettings.$user;
    },
    csrf_field () {
      return window.axios.defaults.headers.common['X-CSRF-TOKEN'];
    },
  },
  components: {
    Loadbar: () => import(/* webpackChunkName: "devise-utilities" */ '../utilities/Loadbar.vue'),
    LoadingScreen: () =>
      import(/* webpackChunkName: "devise-utilities" */ '../utilities/LoadingScreen.vue'),
    MediaEditor: () =>
      import(/* webpackChunkName: "devise-media" */ '../media-manager/MediaEditor.vue'),
    MediaManager: () =>
      import(/* webpackChunkName: "devise-media" */ '../media-manager/MediaManager.vue'),
    PreviewMode: () =>
      import(/* webpackChunkName: "devise-previewmode" */ '../pages/PreviewMode.vue'),
    BackIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/ArrowLeftIcon'),
    CogIcon: () => import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/SettingsIcon'),
    CreateIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/EditIcon'),
    CubeIcon: () => import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/BoxIcon'),
    DocumentIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/ClipboardIcon'),
    ImageIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/ImageIcon'),
    Panel: () => import(/* webpackChunkName: "devise-utilities" */ '../utilities/Panel.vue'),
    PowerIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/PowerIcon'),
    SaveIcon: () => import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/SaveIcon'),
    SliceSettings: () =>
      import(/* webpackChunkName: "devise-slices" */ '../slices/SliceSettings.vue'),
  },
};
</script>
