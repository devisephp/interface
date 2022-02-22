const WebpackAssetsManifest = require('webpack-assets-manifest');

const { defineConfig } = require('@vue/cli-service');
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

module.exports = defineConfig({
  transpileDependencies: false,
  outputDir: './dist',
  publicPath: '/devise',
  runtimeCompiler: true,
  pages: pagesObject,
  css: {
    extract: false,
  },
  configureWebpack: {
    plugins: [
      new WebpackAssetsManifest({
        output: 'manifest.json',
      }),
    ],
  },
});
