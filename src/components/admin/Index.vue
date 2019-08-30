<template>
  <admin-container>
    <template v-slot:message>
      Welcome Back!<br>
      What are you looking to work on?
    </template>
    <template v-slot:content>
      <ul class="dvs-list-reset dvs-flex dvs-flex-wrap dvs-justify-between">
        <li
          class="dvs-py-6 dvs-mr-8"
          v-for="menuItem in currentMenuItems"
          :key="menuItem.id"
        >
          <div
            v-if="menuItem.routeName"
            @click="goToPage(menuItem.routeName, menuItem.parameters)"
            class="dvs-block dvs-switch-sm dvs-flex dvs-justify-between dvs-items-center dvs-cursor-pointer"
          >{{ menuItem.label }}</div>
          <div
            v-else
            class="dvs-uppercase dvs-text-xs dvs-text-admin-secondary-fg"
          >{{ menuItem.label }}</div>
          <ul
            class="dvs-list-reset dvs-text-sm"
            v-if="menuItem.children"
          >
            <li
              class="dvs-pt-3"
              v-for="(childMenuItem) in menuItem.children"
              :key="childMenuItem.id"
            >
              <div
                v-if="childMenuItem.routeName"
                @click="goToPage(childMenuItem.routeName, childMenuItem.parameters)"
                class="dvs-block dvs-switch-sm dvs-flex dvs-justify-between dvs-items-center dvs-cursor-pointer"
              >{{ childMenuItem.label }}</div>
            </li>
          </ul>
        </li>
      </ul>
    </template>
  </admin-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'DeviseIndex',
  components: {
    AdminContainer: () =>
      import(/* webpackChunkName: "devise-administration" */ './ui/AdminContainer'),
  },
  methods: {
    findMenu (menu) {
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
  },
  computed: {
    ...mapState('devise', ['adminMenu']),
    currentMenu () {
      return this.findMenu(this.adminMenu)
    },
    currentMenuItems () {
      return this.currentMenu.menu.filter((menuItem) => {
        if (!menuItem.permissions) {
          return true
        }
        return this.can(menuItem.permissions)
      });
    }
  },
};
</script>
