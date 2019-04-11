<template>
  <devise-installer-item
    :item="item"
    id="nav-slices"
    title="Authentication (required)"
  >
    <template slot="instructions">
      <p>Devise pages are made up of slices and they live inside /resources/views/slices directory. Make this directory and you'll be on your way.</p>
    </template>
  </devise-installer-item>
</template>

<script>

export default {
  components: {
    DeviseInstallerItem: () => import(/* webpackChunkName: "devise-installer" */ "../Item.vue"),
  },
  props: {
    item: {
      required: true
    }
  }
};
</script>
