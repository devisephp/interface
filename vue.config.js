const webpack = require('webpack');

const pagesObject = {
  main: {
    // entry for the *public* page
    entry: 'src/main.js',
    // the source template
    template: 'public/index.html',
    // output as dist/index.html
    filename: 'index.html',
  },
  // an admin subpage
  // when using the entry-only string format,
  // template is inferred to be `public/subpage.html`
  // and falls back to `public/index.html` if not found.
  // Output filename is inferred to be `admin.html`.
  styles: {
    // entry for the *public* page
    entry: 'src/styles.js',
    // the source template
    template: 'public/index.html',
    // output as dist/index.html
    filename: 'index.html',
  },
};

module.exports = {
  filenameHashing: false,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery',
        jQuery: 'jquery',
      }),
    ],
  },
  pages: pagesObject,
  chainWebpack: config => {
    // TODO: Remove this workaround once https://github.com/vuejs/vue-cli/issues/2463 is fixed
    // Remove preload plugins for multi-page build to prevent infinite recursion
    Object.keys(pagesObject).forEach(page => {
      config.plugins.delete(`preload-${page}`);
      config.plugins.delete(`prefetch-${page}`);
    });
  },
};
