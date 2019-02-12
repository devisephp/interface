<template>
  <div class="dvs-p-8">
    <h3 class="dvs-mb-6" :style="{color: theme.panel.color}">{{ currentMenu.label }}</h3>
    <ul class="dvs-list-reset">
      <li class="dvs-mb-4" v-for="menuItem in currentMenu.menu" :key="menuItem.id">
        <div
          :style="{color: theme.panel.color}"
          @click="goToPage(menuItem.routeName, menuItem.parameters)"
          class="dvs-block dvs-mb-4 dvs-switch-sm dvs-flex dvs-justify-between dvs-items-center dvs-cursor-pointer"
        >{{ menuItem.label }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'DeviseIndex',
  methods: {
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
  },
  computed: {
    ...mapState('devise', ['adminMenu']),
    currentMenu() {
      return this.findMenu(this.adminMenu);
    },
  },
};
</script>
