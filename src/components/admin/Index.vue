<template>
  <admin-container>
    <template v-slot:message>
      Welcome Back!<br />
      What are you looking to work on?
    </template>
    <template v-slot:content>
      <ul class="dvs-flex dvs-flex-wrap dvs-justify-between">
        <li v-for="menuItem in currentMenuItems" :key="menuItem.id" class="dvs-py-6 dvs-mr-8">
          <div
            v-if="menuItem.routeName"
            class="dvs-block dvs-switch-sm dvs-flex dvs-justify-between dvs-items-center dvs-cursor-pointer"
            @click="goToPage(menuItem.routeName, menuItem.parameters)"
          >
            {{ menuItem.label }}
          </div>
          <div v-else class="dvs-uppercase dvs-text-xs dvs-text-admin-secondary-fg">
            {{ menuItem.label }}
          </div>
          <ul v-if="menuItem.children" class="dvs-text-sm">
            <li
              v-for="childMenuItem in filteredMenu(menuItem.children)"
              :key="childMenuItem.id"
              class="dvs-pt-3"
            >
              <div
                v-if="childMenuItem.routeName"
                class="dvs-block dvs-switch-sm dvs-flex dvs-justify-between dvs-items-center dvs-cursor-pointer"
                @click="goToPage(childMenuItem.routeName, childMenuItem.parameters)"
              >
                {{ childMenuItem.label }}
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </template>
  </admin-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'DeviseIndex',
  components: {
    AdminContainer: () =>
      import(/* webpackChunkName: "devise-administration" */ './ui/AdminContainer'),
  },

  computed: {
    ...mapState('devise', ['adminMenu']),
    currentMenu() {
      return this.findMenu(this.adminMenu);
    },
    currentMenuItems() {
      return this.currentMenu.menu.filter(menuItem => {
        if (!menuItem.permissions) {
          return true;
        }
        return this.can(menuItem.permissions);
      });
    },
  },

  mounted() {
    this.loadLanguages();
  },

  methods: {
    ...mapActions('devise', ['getGeneric']),
    filteredMenu(subMenu) {
      return subMenu.filter(menuItem => {
        if (!menuItem.permissions) {
          return true;
        }
        return this.can(menuItem.permissions);
      });
    },
    findMenu(menu) {
      let safeMenu = menu;
      if (typeof menu === 'object') {
        safeMenu = Object.keys(menu).map(i => menu[i]);
      }

      for (let i = 0; i < safeMenu.length; i += 1) {
        const m = safeMenu[i];
        if (m.routeName === this.$route.name) {
          return m;
        }
        if (m.menu) {
          const foundMenu = this.findMenu(m.menu);
          if (foundMenu) {
            return foundMenu;
          }
        }
      }
      return false;
    },

    loadLanguages() {
      this.getGeneric({
        config: {
          apiendpoint: 'languages',
          store: 'languages',
        },
      });
    },
  },
};
</script>
