import PortalVue from 'portal-vue';
import { mapGetters } from 'vuex';
import Vuebar from 'vuebar';
import VueNotifications from 'vue-notifications';
import iziToast from 'izitoast'; // https://github.com/dolce/iziToast
import Devise from './Devise.vue';
import DeviseStore from './vuex/store';
import DeviseBus from './event-bus';
import EditPage from './components/pages/Editor.vue';
import Help from './components/utilities/Help.vue';
import Image from './directives/image';
import Link from './directives/link';
import routes from './router/route.config';
import Slices from './components/slices/Slices.vue';
import Tuck from './directives/tuck';
import alertConfirm from './directives/alert-confirm';

const DevisePlugin = {
  install(Vue, { store, router, bus, options }) {
    // Register tuck directive
    Vue.directive('tuck', Tuck);

    if (typeof store === 'undefined') {
      throw new Error('Please provide a vuex store.');
    }

    if (typeof router === 'undefined') {
      throw new Error('Please provide a vue router.');
    }

    // Set the devise route to Edit Page for any application routes
    // that aren't setup to take over the admin. This allows us to see the
    // page editor even if you are navigating around the application routes.
    router.options.routes.map(route => {
      if (!route.hasOwnProperty('components')) {
        route.components = {};
      }
      if (!route.components.hasOwnProperty('devise')) {
        route.components.devise = EditPage;
      }

      return route;
    });

    for (const route in routes) {
      if (routes.hasOwnProperty(route)) {
        const routeToCheck = routes[route];
        let canAdd = true;

        for (const customRoute in router.options.routes) {
          if (router.options.routes.hasOwnProperty(customRoute)) {
            const routeToCheckAgainst = router.options.routes[customRoute];
            if (routeToCheckAgainst.name === routeToCheck.name) {
              canAdd = false;
            }
          }
        }

        if (canAdd) {
          router.addRoutes([routeToCheck]);
        }
      }
    }

    if (typeof window.deviseSettings === 'undefined') {
      window.deviseSettings = () => {};
    }

    // If the bus isn't set we'll use our own bus
    if (typeof bus === 'undefined') {
      window.deviseSettings.$bus = DeviseBus;
    } else {
      window.deviseSettings.$bus = bus;
    }

    // Portals to render items outside of their component
    Vue.use(PortalVue);

    // VueBar - custom scrollbars
    Vue.use(Vuebar);

    // Register global components

    Vue.component('devise', Devise);
    Vue.component('slices', Slices);

    // Vue.component('Sidebar', Sidebar);

    if (typeof store.state.adminMenu !== 'undefined') {
      DeviseStore.state.adminMenu = Object.assign({}, store.state.adminMenu);
    }

    if (typeof store.state.settingsMenu !== 'undefined') {
      DeviseStore.state.settingsMenu = Object.assign({}, store.state.settingsMenu);
    }

    // Setup the currentPage and Sites arrays in the store b/c they are necessary in
    // some apps to be ready to go right away
    DeviseStore.state.currentPage = Object.assign(
      {},
      DeviseStore.state.currentPage,
      window.deviseSettings.$page
    );
    DeviseStore.state.sites = Object.assign({}, DeviseStore.state.sites, {
      data: window.deviseSettings.$sites,
    });

    // Register devise vuex module and sync it with the store
    store.registerModule('devise', DeviseStore);

    // Register image directive
    Vue.directive('devise-image', Image);

    // Register link directive
    Vue.directive('devise-link', Link);

    // Register link directive
    Vue.directive('devise-alert-confirm', alertConfirm);

    // Register Help component
    Vue.component('help', Help);

    const deviseOptions = Object.assign(
      {
        breakpoints: {
          mobile: 575,
          tablet: 768,
          desktop: 991,
          largeDesktop: 1199,
        },
      },
      options
    );

    // Register Messages
    function toast({ title, message, type, timeout }) {
      if (type === VueNotifications.types.warn) type = 'warning';
      return iziToast[type]({ title, message, timeout });
    }

    const vueNotificationsOptions = {
      success: toast,
      error: toast,
      info: toast,
      warn: toast,
    };

    Vue.use(VueNotifications, vueNotificationsOptions);

    // enables passive event listeners by default for some events
    // require('default-passive-events');

    // We call Vue.mixin() here to inject functionality into all components.
    Vue.mixin({
      data() {
        return {
          deviseOptions,
          tippyConfiguration: {
            interactive: true,
            animation: 'shift-toward',
            arrow: true,
            inertia: true,
            interactiveBorder: 20,
            maxWidth: '300px',
            theme: 'devise',
            trigger: 'mouseenter focus',
          },
        };
      },
      notifications: {
        showSuccessMsg: {
          type: VueNotifications.types.success,
          title: 'Success',
          message: 'Your Request was successful',
        },
        showErrorMsg: {
          type: VueNotifications.types.error,
          title: 'Wow-wow',
          message: "That's the error",
        },
      },
      methods: {
        // Convienience method to push things into the router from templates
        goToPage(pageName, params) {
          this.$router.push({ name: pageName, params });
        },
        href(url) {
          window.open(url, '_self');
        },
        launchMediaManager(callbackObject, callbackProperty) {
          window.deviseSettings.$bus.$emit('devise-launch-media-manager', {
            callback(media) {
              callbackObject[callbackProperty] = media.url;
            },
          });
        },
        can(permission) {
          const toCheck = !Array.isArray(permission) ? [permission] : permission;
          const allowed = window.deviseSettings.$user.permissions_list
            ? window.deviseSettings.$user.permissions_list
            : [];
          for (let i = 0; i < toCheck.length; i += 1) {
            const found = allowed.find(perm => perm === toCheck[i]);

            if (found) return true;
          }
          return false;
        },
      },
      computed: {
        ...mapGetters('devise', ['breakpoint', 'currentPage', 'currentUser', 'lang', 'theme']),
      },
      // This sets a prop to be accepted by all components in a custom Vue
      // app that resides within Devise. Makes it a little easier to pass
      // down any data to custom child components
      props: ['devise', 'slices', 'models'],
      store,
    });

    if (
      window.deviseSettings.$config &&
      typeof window.deviseSettings.$config.mothership !== 'undefined' &&
      window.deviseSettings.$config.mothership !== null
    ) {
      store.commit('devise/setMothership', window.deviseSettings.$config.mothership);
    }

    if (
      window.deviseSettings.$config &&
      typeof window.deviseSettings.$config.layouts !== 'undefined'
    ) {
      store.commit('devise/setLayouts', window.deviseSettings.$config.layouts);
    }
  },
};

export default DevisePlugin;
