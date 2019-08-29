/* eslint-disable no-shadow,no-unused-vars */
const tinycolor = require(/* webpackChunkName: "tinycolor2" */ 'tinycolor2');

const getters = {
  breakpoint: state => state.breakpoint.breakpoint,

  breakpointAndDimensions: state => state.breakpoint,

  // This takes a component name and returns the corresponding component from
  // window.deviseSettings.$deviseComponents. This contains the name, template, and field
  // configuration.
  component: state => name => window.deviseSettings.$deviseComponents[name],

  componentFromView: state => view => {
    for (const component in window.deviseSettings.$deviseComponents) {
      if (window.deviseSettings.$deviseComponents[component].view === `slices.${view}`) {
        return window.deviseSettings.$deviseComponents[component];
      }
    }
    return false;
  },

  deviseInterface: () => window.deviseSettings.$interface,

  sliceConfig: () => slice =>
    window.deviseSettings.$deviseComponents[slice.metadata.name]
      ? window.deviseSettings.$deviseComponents[slice.metadata.name]
      : window.deviseSettings.$deviseComponents[slice.name],

  fieldConfig: (state, getters) => ({ fieldKey, slice }) => {
    const sliceConfig = getters.sliceConfig(slice);
    if (typeof sliceConfig.config[fieldKey] !== 'undefined') {
      return sliceConfig.config[fieldKey];
    }
    return false;
  },

  // Languages
  languages: state => state.languages,

  lang: state => window.deviseSettings.$lang,

  // Media Regeneration
  mediaAlreadyRequested: state => newRequest =>
    state.mediaRegenerationRequests.find(
      request =>
        request.component === newRequest.component && request.fieldName === newRequest.fieldName
    ),

  // Media manager

  files: state => state.files,

  directories: state => state.directories,

  searchableMedia: state => state.searchableMedia,

  currentDirectory: state => state.currentDirectory,

  // Meta
  meta: state => state.meta,

  // Models
  storeModels: state => state.models,

  modelSettings: state => state.modelSettings,

  // Mothership API
  mothershipUrl: state => {
    if (state.mothership) {
      return state.mothership.url;
    }
    return null;
  },
  mothershipApiKey: state => {
    if (state.mothership) {
      return state.mothership['api-key'];
    }
    return null;
  },

  changes: state => state.changes,

  // Pages
  pages: state => state.pages,

  pagesList: state => state.pagesList,

  page: (state, getters, rootState) => {
    const id = parseInt(rootState.route.params.pageId, 0);
    return state.pages.data.find(page => page.id === id);
  },

  currentPage: state => state.currentPage,

  // Sites
  sites: state => state.sites,

  site: (state) => {
    if (window.deviseSettings.$sites) {
      return window.deviseSettings.$sites.find(site => site.current)
    }
    return []
  },

  siteByRouteParam: (state, getters, rootState) => {
    const id = parseInt(rootState.route.params.siteId, 0);
    if (state.sites.data) {
      return state.sites.data.find(site => site.id === id);
    }
    return null
  },

  additionalSiteSettings: (state, getters, rootState) => {
    const id = parseInt(getters.site.id, 0);
    // Cause... why not
    const ass = window.deviseSettings.$config.additionalSiteSettings
    if (ass) {
      return ass.find(setting => {
        return setting.id === id
      })
    }
    return null;
  },

  siteById: state => id => {
    if (state.sites.data) {
      return state.sites.data.find(site => site.id === id);
    }
    return false;
  },

  theme: (state, getters, rootState) => {
    // chartColor1: {color: 'rgba(54, 162, 235, 1)'},
    // chartColor2: {color: 'rgba(75, 192, 192, 1)'},
    // chartColor3: {color: 'rgba(255, 206, 86, 1)'},
    // chartColor4: {color: 'rgba(255,99,132,1)'},
    // chartColor5: {color: 'rgba(153, 102, 255, 1)'},
    // chartColor6: {color: 'rgba(255, 159, 64, 1)'}

    const defaultColors = {
      // Used by the admin panels
      panel: {
        background: 'radial-gradient(ellipse at top, #2C3858 , #182039)',
        color: '#cdc9f1',
        secondaryColor: '#979797',
      },
      panelCard: {
        background: '#12182d',
        color: '#eee',
      },
      panelSidebar: {
        background: '#182039',
        color: '#eee',
        secondaryColor: 'rgb(101, 139, 239)',
        borderColor: tinycolor('#182039')
          .lighten(10)
          .toString(),
      },
      panelIcons: {
        color: '#658BEF',
      },
      actionButton: {
        color: '#ffffff',
        background: '#EB8F89',
      },
      actionButtonGhost: {
        color: '#EB8F89',
        borderColor: '#EB8F89',
        borderWidth: '2px',
      },
      secondaryButton: {
        color: '#ffffff',
        background: '#EB8F89',
      },
      secondaryButtonGhost: {
        color: '#EB8F89',
        borderColor: '#EB8F89',
        borderWidth: '2px',
      },
      help: {
        color: '#EB8F89',
        borderColor: '#EB8F89',
        backgroundColor: '#ffe5e4',
      },
      chartColor1: { color: 'rgba(54, 162, 235, 1)' },
      chartColor2: { color: 'rgba(75, 192, 192, 1)' },
      chartColor3: { color: 'rgba(255, 206, 86, 1)' },
      chartColor4: { color: 'rgba(255, 99, 132, 1)' },
      chartColor5: { color: 'rgba(153, 102, 255, 1)' },
      chartColor6: { color: 'rgba(255, 159, 64, 1)' },
    };

    let colors = defaultColors;

    if (state.currentPage) {
      const site = getters.siteById(state.currentPage.site_id);

      // The last part of this if is checking for new initial color scheme to accommodate
      // older instances of alpha Devise 2
      if (site && site.settings && site.settings.colors) {
        const sc = site.settings.colors;

        if (sc.panelTop && sc.panelBottom) {
          colors.panel = {
            background: `radial-gradient(ellipse at top, ${sc.panelTop.color}, ${
              sc.panelBottom.color
              })`,
            color: sc.panelText.color,
            secondaryColor: '#979797',
          };
        }

        if (sc.panelpanelSidebarBackgroundTop && sc.panelSidebarText) {
          colors.panelCard = {
            background: sc.panelSidebarBackground.color,
            color: sc.panelSidebarText.color,
          };
        }

        if (
          sc.penalSidebarBackground &&
          sc.panelSidebarText &&
          sc.panelSidebarAction &&
          sc.panelSidebarBackground
        ) {
          colors.panelSidebar = {
            background: sc.panelSidebarBackground.color,
            color: sc.panelSidebarText.color,
            secondaryColor: sc.panelSidebarAction.color,
            borderColor: tinycolor(sc.panelSidebarBackground.color)
              .lighten(10)
              .toString(),
          };
        }

        if (sc.panelAction) {
          colors.panelIcons = {
            color: sc.panelAction.color,
          };
        }

        if (sc.buttonsActionBackground && sc.buttonsActionText) {
          colors.actionButton = {
            background: sc.buttonsActionBackground.color,
            color: sc.buttonsActionText.color,
          };
        }

        if (sc.buttonsActionBackground) {
          colors.actionButtonGhost = {
            border: `2px solid ${sc.buttonsActionBackground.color}`,
            color: sc.buttonsActionBackground.color,
          };
        }

        if (sc.buttonsSecondaryBackground && sc.buttonsSecondaryText) {
          colors.secondaryButton = {
            background: sc.buttonsSecondaryBackground.color,
            color: sc.buttonsSecondaryText.color,
          };
        }

        if (sc.buttonsSecondaryBackground) {
          colors.secondaryButtonGhost = {
            border: `2px solid ${sc.buttonsSecondaryBackground.color}`,
            color: sc.buttonsSecondaryBackground.color,
          };
        }

        if (sc.helpBackground && sc.helpText) {
          colors.help = {
            background: sc.helpBackground.color,
            border: `1px solid ${sc.helpBackground.color}`,
            color: sc.helpText.color,
          };
        }

        if (
          sc.chartColor1 &&
          sc.chartColor2 &&
          sc.chartColor3 &&
          sc.chartColor4 &&
          sc.chartColor5 &&
          sc.chartColor6
        )
          colors.chartColor1 = { color: sc.chartColor1.color };
        colors.chartColor2 = { color: sc.chartColor2.color };
        colors.chartColor3 = { color: sc.chartColor3.color };
        colors.chartColor4 = { color: sc.chartColor4.color };
        colors.chartColor5 = { color: sc.chartColor5.color };
        colors.chartColor6 = { color: sc.chartColor6.color };
      }
    }

    colors = Object.assign({}, defaultColors, colors);

    return colors;
  },

  // Slices
  slicesList: state => state.slices,

  slicesDirectories: state => state.slicesDirectories,

  // Templates
  templates: state => state.templates,

  template: (state, getters, rootState) => {
    const id = parseInt(rootState.route.params.templateId, 0);
    return state.templates.data.find(template => template.id === id);
  },

  // Redirects
  redirects: state => state.redirects,

  redirect: (state, getters, rootState) => {
    const id = parseInt(rootState.route.params.redirectId, 0);
    return state.redirects.data.find(redirect => redirect.id === id);
  },

  currentRedirect: state => window.deviseSettings.$redirect,

  // Users
  users: state => state.users,

  user: (state, getters, rootState) => {
    const id = parseInt(rootState.route.params.userId, 0);
    return state.users.data.find(user => user.id === id);
  },

  currentUser: state => window.deviseSettings.$user,
};

export default getters;
