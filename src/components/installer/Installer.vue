<template>
  <div class="dvs-flex">
    <installer-finish
      ref="finshline"
      :finished="finished"
      class="dvs-fixed dvs-pin-t dvs-pin-l dvs-pin-r dvs-z-50"
      :style="finishedStyles"
    ></installer-finish>

    <main-menu
      :checklist="checklist"
      :style="bodyFinishedStyles"
    ></main-menu>

    <div
      id="content"
      class="dvs-absolute dvs-pin dvs-overflow-scroll"
      :style="bodyFinishedStyles"
    >
      <section
        id="nav-welcome"
        name="nav-welcome"
      >
        <div>
          <div class="dvs-w-1/2 dvs-mb-4">
            <devise-logo color="#222" />
          </div>

          <p class="dvs-text-xl dvs-mb-16">We are very excited that you are giving Devise 2 a spin. We are still in the early beta stages of this product but we do believe we have settled on the final structure of things. We encourage you to send us any feedback via Github issues, submit any PR's or just let us know what you think of the project on Twitter @devisephp.</p>

          <div class="dvs-mb-16 dvs-flex dvs-flex-wrap">
            <a
              href="https://devise.gitbook.io/cms/"
              target="_blank"
              class="dvs-btn dvs-bg-blue dvs-text-white dvs-m-2"
            >Documentation</a>
            <a
              href="https://devisephp.com"
              target="_blank"
              class="dvs-btn dvs-bg-blue dvs-text-white dvs-m-2"
            >Website</a>
            <a
              href="https://github.com/devisephp/cms"
              target="_blank"
              class="dvs-btn dvs-bg-blue dvs-text-white dvs-m-2"
            >Github</a>
          </div>

          <div class="dvs-text-left dvs-w-full">
            <h2 class="dvs-mb-4">Installation</h2>

            <p class="dvs-mb-4">Below we have setup an interactive installer that will continually poll to see if you have correctly configured your server and application for Devise. Once you have turned all the items in "Required Setup" green you are good to go. However, we have also provided some helpful items in "Non-required Setup" that you may want to take a look at.</p>
          </div>
        </div>
        <div></div>
      </section>

      <div id="nav-required"></div>

      <template>
        <database :item="checklist.database"></database>

        <migrations :item="checklist.migrations"></migrations>

        <auth :item="checklist.auth"></auth>

        <user :item="checklist.user"></user>

        <site :item="checklist.site"></site>

        <page :item="checklist.page"></page>

        <slices :item="checklist.slices"></slices>

        <image-library :item="checklist.image_library"></image-library>

        <div id="nav-suggested"></div>

        <optional-extras></optional-extras>

        <image-optimization :checklist="checklist"></image-optimization>
      </template>
    </div>

    <messages />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import Prism from 'prismjs';
import 'prismjs/components/prism-clike.min';
import 'prismjs/components/prism-markup-templating.min';
import 'prismjs/components/prism-php.min';
import 'prismjs/components/prism-ini.min';
import 'prismjs/components/prism-javascript.min';
import 'prismjs/components/prism-bash.min';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
import 'prismjs/plugins/line-numbers/prism-line-numbers';

export default {
  mounted () {
    this.getLanguages();
    this.startChecker();

    setTimeout(() => {
      this.codeHighlighting();
    }, 1000);
  },
  methods: {
    ...mapActions('devise', ['refreshChecklist', 'getLanguages']),
    startChecker () {
      this.refreshChecklist();
      setInterval(() => {
        this.refreshChecklist();
      }, 5000);
    },
    codeHighlighting () {

      Prism.highlightAll();

      Prism.plugins.NormalizeWhitespace.setDefaults({
        'remove-trailing': true,
        'remove-indent': true,
        'left-trim': true,
        'right-trim': true
        /* 'break-lines': 80,
        'indent': 2,
        'remove-initial-line-feed': false,
        'tabs-to-spaces': 4,
        'spaces-to-tabs': 4 */
      });
    }
  },

  computed: {
    ...mapState('devise', {
      checklist: state => state.checklist,
      languages: state => state.languages.data
    }),
    finished () {
      for (const task in this.checklist) {
        if (this.checklist.hasOwnProperty(task)) {
          if (!this.checklist[task]) {
            return false;
          }
        }
      }

      return true;
    },
    finishedStyles () {
      if (this.finished) {
        return { top: 0 };
      }

      return { top: '-200px' };
    },
    bodyFinishedStyles () {
      if (this.finished) {
        return { marginTop: '200px' };
      }

      return { marginTop: '0' };
    }
  },
  components: {
    Messages: () => import(/* webpackChunkName: "devise-installer" */ './Messages.vue'),
    MainMenu: () => import(/* webpackChunkName: "devise-installer" */ './MainMenu.vue'),
    DeviseLogo: () => import(/* webpackChunkName: "devise-installer" */ "../utilities/DeviseLogo.vue"),
    Database: () => import(/* webpackChunkName: "devise-installer" */ './items/Database.vue'),
    Migrations: () => import(/* webpackChunkName: "devise-installer" */ './items/Migrations.vue'),
    Auth: () => import(/* webpackChunkName: "devise-installer" */ './items/Auth.vue'),
    User: () => import(/* webpackChunkName: "devise-installer" */ './items/User.vue'),
    Site: () => import(/* webpackChunkName: "devise-installer" */ './items/Site.vue'),
    Slices: () => import(/* webpackChunkName: "devise-installer" */ './items/Slices.vue'),
    Page: () => import(/* webpackChunkName: "devise-installer" */ './items/Page.vue'),
    ImageLibrary: () => import(/* webpackChunkName: "devise-installer" */ './items/ImageLibrary.vue'),
    ImageOptimization: () => import(/* webpackChunkName: "devise-installer" */ './items/ImageOptimization.vue'),
    OptionalExtras: () => import(/* webpackChunkName: "devise-installer" */ './items/OptionalExtras.vue'),
    InstallerFinish: () => import(/* webpackChunkName: "devise-utilities" */ './InstallerFinish.vue'),
  }
};
</script>

<style lang="scss">
#sidebar {
  width: 300px;
}

#content {
  left: 300px;
}

section {
  display: flex;

  p {
    margin-bottom: 1rem;
    line-height: 1.5em;

    &:last-child {
      margin-bottom: 0;
    }
  }

  > div {
    &:first-child {
      width: 50%;
      color: rgb(72, 82, 91);
      background-color: #f8fafc;
      padding: 3em;
    }

    &:last-child {
      width: 50%;
      background-color: #22292f;
      color: #f8fafc;
      padding: 3em;
      font-size: 0.8em;
    }
  }
}

a {
  text-decoration: none;
  font-weight: normal;
  color: #3490dc;

  &.is-active {
    font-weight: bold;
  }
}

#menu {
  font-size: 0.9em;

  ul {
    padding-bottom: 1em;

    > li:first-child {
      margin-top: 0.5em;
    }
  }
  li {
    padding-top: 0.5em;
    padding-bottom: 0.5em;
  }
}
</style>