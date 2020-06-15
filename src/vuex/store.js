import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  // Application State
  api: {
    baseUrl: '/api/devise/',
  },
  // Admin Menu can be overridden in your own store
  // Note: routeName property take precidence over url property
  // Possible Configuration Example
  // adminMenu: [
  //   {
  //     icon: 'CogIcon',
  //     label: 'Link Label',
  //     routeName: 'devise-page-editor',
  //     parameters: {type: 'blog'},
  //     url: 'http://google.com',
  //     target: '_blank',
  //     menu: []
  //   }
  // ],
  adminMenu: [
    {
      icon: 'CreateIcon',
      routeName: 'devise-page-editor',
    },
    {
      icon: 'ImageIcon',
      label: 'Settings',
      routeName: 'media-manager',
      permissions: 'manage media',
    },
    {
      icon: 'CogIcon',
      label: 'Settings',
      routeName: 'devise-settings',
      permissions: 'manage settings',
      menu: [
        {
          label: 'Site Settings',
          children: [
            {
              label: 'Pages',
              routeName: 'devise-pages-admin',
              permissions: 'manage pages',
            },
            {
              label: 'Users',
              routeName: 'devise-users-admin',
              permissions: 'manage users',
            },
            {
              label: 'Global Meta',
              routeName: 'devise-meta-manage',
              permissions: 'manage meta',
            },
            {
              label: 'Sites',
              routeName: 'devise-sites-admin',
              permissions: 'manage sites',
            },
            {
              label: 'Languages',
              routeName: 'devise-languages-manage',
              permissions: 'manage languages',
            },
            {
              label: '301 Redirects',
              routeName: 'devise-redirects-admin',
              permissions: 'manage redirects',
            },
          ],
        },
      ],
    },
  ],
  breakpoint: {
    breakpoint: null,
    diminsions: {
      width: null,
      height: null,
    },
  },
  // DevMode
  devMode: false,
  // Mothership
  changes: [],
  // Media Manager
  currentDirectory: '.',
  directories: [],
  files: [],
  searchableMedia: {
    data: [],
  },
  // Media Editor
  isCropping: false,
  // Languages
  languages: {
    data: [],
  },
  layouts: [],
  mediaRegenerationRequests: [],
  meta: {
    data: [],
  },
  models: {
    data: [],
  },
  modelQueries: [],
  modelSettings: {},
  mothership: null,
  currentPage: {
    languages: [],
    slices: [],
    meta: [],
    versions: [],
    previewMode: 'desktop',
  },
  pages: {
    data: [],
  },
  pagesList: {
    data: [],
  },
  site: {},
  sites: {
    data: [],
  },
  slices: [],
  slicesDirectories: [],
  templates: {
    data: [],
  },
  redirects: {
    data: [],
  },
  users: {
    data: [],
  },
  checklist: {
    database: false,
    migrations: false,
    auth: false,
    user: false,
    site: false,
    page: false,
    image_library: false,
    optional: {
      config: false,
    },
    image_optimization: {
      jpegoptim: false,
      optipng: false,
      pngquant: false,
      svgo: false,
      gifsicle: false,
    },
  },
};

// A Vuex instance is created by combining the state, the actions,
// and the mutations. Because the actions and mutations are just
// functions that do not depend on the instance itself, they can
// be easily tested or even hot-reloaded (see counter-hot example).
//
// You can also provide middlewares, which is just an array of
// objects containing some hooks to be called at initialization
// and after each mutation.
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
