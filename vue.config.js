const WebpackAssetsManifest = require('webpack-assets-manifest');
const CopyPlugin = require('copy-webpack-plugin');

const pagesObject = {
  main: {
    // entry for the *public* page
    entry: 'src/devise-app.js',
    // the source template
    template: 'public/index.html',
    // output as dist/index.html
    filename: 'index.html',
  },
  styles: {
    // entry for the *public* page
    entry: 'src/styles.js',
    // the source template
    template: 'public/index.html',
    // output as dist/index.html
    filename: 'styles.html',
  },
};

module.exports = {
  outputDir: './dist',
  publicPath: '/devise',
  runtimeCompiler: false,
  filenameHashing: process.env.NODE_ENV === 'production',
  configureWebpack: {
    plugins: [
      new WebpackAssetsManifest(),
      new CopyPlugin([
        {
          from: 'node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css',
          to: 'css/prism-line-numbers.css',
        },
        {
          from: 'node_modules/prismjs/themes/prism-okaidia.css',
          to: 'css/themes/prism-okaidia.css',
        },
      ]),
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
