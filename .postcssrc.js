const purgecss = require('@fullhuman/postcss-purgecss');
const glob = require('glob-all');
const path = require('path');

module.exports = {
  plugins: [
    require('tailwindcss')('./tailwind.config.js'),
    require('autoprefixer')(),
    process.env.NODE_ENV === 'production'
      ? purgecss({
          content: ['./src/**/*.vue', './../resources/**/*.blade.php'],
          extractors: [
            {
              extractor: class {
                static extract(content) {
                  return content.match(/[a-zA-Z0-9-:_/]+/g) || [];
                }
              },
              extensions: ['vue', 'html', 'php'],
            },
          ],
          paths: glob.sync([
            path.join(__dirname, 'node_modules/tiny-slider/**/*.js'),
            path.join(__dirname, 'node_modules/tiny-slider/**/*.css'),
            path.join(__dirname, 'node_modules/v-calendar/**/*.js'),
            path.join(__dirname, 'node_modules/v-calendar/**/*.vue'),
            path.join(__dirname, 'node_modules/v-calendar/**/*.css'),
          ]),
          whitelistPatterns: [
            /mobile/,
            /tablet/,
            /desktop/,
            /largeDesktop/,
            /ultraWideDesktop/,
            /headroom-*/,
            /direction-top/,
            /popover-*/,
            /interactive/,
            /c-*/,
            /tns-*/,
            /checkboxes/,
            /fade-*/,
            /slide-*/,
            /fast-*/,
            /sub-navigation-*/,
            /\/*-admin-*/,
            /vue-scrollbar*/,
            /scrollbar/,
            /dvs-pointer-events-*/,
          ],
        })
      : '',
  ],
};
