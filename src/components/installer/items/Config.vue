<template>
  <devise-installer-item
    :item="item"
    id="nav-config"
    title="Devise Configuration (Optional)"
  >
    <template slot="instructions">
      <p>Devise will run with or without a config file in your Laravel config directory. However, you may want to override some default settings. In those cases you'll need to publish the devise config file with the following command.</p>
    </template>

    <template slot="example">
      <p>From the root of your project on the command line run the following command</p>
      <pre
        class="lang-bash"
        data-start="1"
      >
          <code>
            php artisan vendor:publish --tag=dvs-config
          </code>
        </pre>
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
      required: false
    }
  }
};
</script>
