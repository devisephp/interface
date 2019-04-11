<template>
  <devise-installer-item
    :item="item"
    id="nav-database-migration"
    title="Database Migrations (required)"
  >
    <template slot="instructions">
      <p>Now to populate the database you'll run the Laravel artisan migration command. This command will build out the tables needed for Devise to run properly.</p>
      <p>
        More information on migrations can be found
        <a href="https://laravel.com/docs/5.7/migrations">here</a>
      </p>
    </template>

    <template slot="example">
      <p>From the root of your project on the command line run the following command</p>
      <pre
        class="lang-bash"
        data-start="1"
      >
          <code>
            php artisan migrate
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
      required: true
    }
  }
};
</script>
