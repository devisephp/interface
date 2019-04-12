<template>
  <component
    v-if="sliceComponent !== null"
    :style="styles"
    :is="currentView"
    :devise="deviseForSlice"
    :breakpoint="breakpoint"
    :slices="devise.slices"
    :models="currentPage"
    :component="sliceComponent"
    ref="component"
    v-on="$listeners"
    v-bind="$attrs"
  ></component>
</template>

<script>
import ResizeObserver from 'resize-observer-polyfill'; // eslint-disable-line
import { Sketch } from 'vue-color';

import mezr from 'mezr';

import { mapGetters, mapActions } from 'vuex';

import Strings from '../../mixins/Strings';
import Slice from './Slice.vue'; // eslint-disable-line

const tinycolor = require('tinycolor2');

export default {
  /* eslint-disable camelcase */
  name: 'DeviseSlice',
  data () {
    return {
      backgroundColor: null,
      mounted: false,
      showEditor: false,
      sliceEl: null,
      sliceComponent: null,
      resizeObserver: null,
    };
  },
  created () {
    this.hydrateMissingProperties();
    this.checkDefaults();
    this.backgroundColor = tinycolor('#fff').toRgb();
    this.sliceComponent = this.component(this.devise.metadata.name);
  },
  mounted () {
    this.mounted = true;
    this.sliceEl = this.$refs.component.$el;

    if (typeof this.devise.settings === 'undefined') {
      this.$set(this.devise, 'settings', {});
    }

    if (typeof this.devise.settings.backgroundColor !== 'undefined') {
      this.backgroundColor = tinycolor(this.devise.settings.backgroundColor).toRgb();
    }

    this.addListeners();

    if (this.can('manage slices')) {
      this.checkMediaSizesForRegeneration();
    }
  },
  methods: {
    ...mapActions('devise', ['regenerateMedia']),
    addListeners () {
      window.deviseSettings.$bus.$on('jumpToSlice', this.attemptJumpToSlice);
      window.deviseSettings.$bus.$on('openSliceSettings', this.attemptOpenSliceSettings);
      window.deviseSettings.$bus.$on('markSlice', this.markSlice);

      this.addVisibilityScrollListeners();
    },
    hydrateMissingProperties () {
      const { fields } = this.sliceConfig(this.devise);

      if (fields) {
        // Loop through the fields for this slice and check to see that all the
        // fields are present. If they aren't it's just because they haven't been
        // hydrated via the editor yet.
        for (const field in fields) {
          if (fields.hasOwnProperty(field)) {
            // Ok, so the property is missing from the slice.fields object so we're
            // going to add in a stub for the render.
            this.addMissingProperty(field);

            // The property is present but we need to make sure all the custom set properties are moved over
            this.addFieldConfigurations(fields, field);
          }
        }
      }
    },
    addMissingProperty (field) {
      // We just add all the properties to ensure there are not undefined props down the line
      const defaultProperties = {
        text: null,
        url: null,
        media: {},
        target: null,
        color: null,
        checked: null,
        enabled: false,
      };

      const mergedData = Object.assign({}, defaultProperties, this.deviseForSlice[field]);
      this.$set(this.deviseForSlice, field, mergedData);
    },
    checkDefaults () {
      const { fields } = this.sliceConfig(this.devise);

      if (fields) {
        // Loop through the fields for this slice and check to see that all the
        // fields are present. If they aren't it's just because they haven't been
        // hydrated via the editor yet.
        for (const field in fields) {
          if (this.deviseForSlice.hasOwnProperty(field)) {
            // If defaults are set then set them on top of the placeholder missing properties
            if (fields[field].default) {
              this.setDefaults(field, fields[field].default);
            }
          }
        }
      }
    },
    addFieldConfigurations (fields, field) {
      for (const pp in fields[field]) {
        if (!this.deviseForSlice[field].hasOwnProperty(pp)) {
          this.$set(this.deviseForSlice[field], pp, fields[field][pp]);
        }
      }
    },
    setDefaults (property, defaults) {
      // loop through the defaults and apply them to the field
      for (const d in defaults) {
        if (
          typeof this.deviseForSlice[property][d] === 'undefined' ||
          this.deviseForSlice[property][d] === null
        ) {
          this.$set(this.deviseForSlice[property], d, defaults[d]);
        }
      }
    },
    checkMediaSizesForRegeneration () {
      // If the current slice even has fields
      if (typeof this.currentView.fields !== 'undefined') {
        for (const fieldName in this.currentView.fields) {
          if (this.currentView.fields.hasOwnProperty(fieldName)) {
            const field = this.currentView.fields[fieldName];

            // If the field is an image
            if (field.type === 'image' && this.devise[fieldName].url !== null) {
              // If sizes are defined on the image configuration and an image has already been selected
              if (
                typeof field.sizes !== 'undefined' &&
                typeof this.devise[fieldName].media === 'object' &&
                !this.mediaAlreadyRequested({
                  component: this.devise.metadata.name,
                  fieldName,
                })
              ) {
                this.determineMediaRegenerationNeeds(field, fieldName);
              }
            }
          }
        }
      }
    },
    determineMediaRegenerationNeeds (field, fieldName) {
      // Build the sizes needed
      const mediaRequest = { sizes: {} };

      // Check if all the sizes in the configuration are present in the media property
      for (const sizeName in field.sizes) {
        if (typeof this.devise[fieldName].media[sizeName] === 'undefined') {
          mediaRequest.sizes[sizeName] = field.sizes[sizeName];
        }
      }

      // Check to see if any of the sizes have changed
      for (const sizeName in field.sizes) {
        if (field.sizes.hasOwnProperty(sizeName)) {
          const storedSize = this.devise[fieldName].sizes[sizeName];
          const fieldSize = field.sizes[sizeName];
          if (!storedSize || storedSize.w !== fieldSize.w || storedSize.h !== fieldSize.h) {
            mediaRequest.sizes[sizeName] = fieldSize;
          }
        }
      }

      // If there are any sizes needed
      if (Object.keys(mediaRequest.sizes).length > 0) {
        // Build the request payload
        const payload = {
          allSizes: field.sizes,
          sizes: mediaRequest,
          instanceId: this.devise.metadata.instance_id,
          fieldName,
          component: this.devise.metadata.name,
        };
        this.makeMediaRegenerationRequest(payload);
      }
    },
    makeMediaRegenerationRequest (payload) {
      this.regenerateMedia(payload).then(() => {
        window.deviseSettings.$bus.$emit('showMessage', {
          title: 'New Images Generated',
          message: `Pro tip: Some new sizes were generated for a slice you were working on (Field: ${
            payload.fieldName
            }) You may need to refresh.`,
        });
      });
    },
    attemptJumpToSlice (slice) {
      if (this.devise.metadata && slice.metadata) {
        if (this.devise.metadata.instance_id === slice.metadata.instance_id) {
          try {
            const offset = mezr.offset(this.sliceEl, 'margin');
            window.scrollTo({
              top: offset.top,
              behavior: 'smooth',
            });
          } catch (error) {
            /* eslint-disable no-console */
            console.warn(
              'Devise Warning: There may be a problem with this slice. Try wrapping the template in a single <div> to resolve and prevent children components to be at the root level.'
            );
          }
        }
      }
    },
    attemptOpenSliceSettings (slice) {
      if (this.devise.metadata && slice.metadata) {
        if (this.devise === slice) {
          window.deviseSettings.$bus.$emit('open-slice-settings', this.deviseForSlice);
        }
      }
    },
    markSlice (slice, on) {
      if (slice === this.devise) {
        const markers = document.getElementsByClassName('devise-component-marker');
        while (markers.length > 0) {
          markers[0].parentNode.removeChild(markers[0]);
        }

        if (on) {
          try {
            const offset = mezr.offset(this.sliceEl, 'margin');
            const width = mezr.width(this.sliceEl, 'margin');
            const height = mezr.height(this.sliceEl, 'margin');

            const marker = document.createElement('div');
            marker.innerHTML = `
            <div class="dvs-absolute-center dvs-absolute">
              <h1 class="dvs-text-grey-light dvs-font-hairline dvs-font-sans dvs-p-4 dvs-bg-abs-black dvs-rounded dvs-shadow-lg">
                ${this.devise.metadata.label}
              </h1>
            </div>`;
            marker.classList =
              'devise-component-marker dvs-absolute dvs-bg-black dvs-z-60 dvs-opacity-75';
            marker.style.cssText = `top:${offset.top}px;left:${
              offset.left
              }px;width:${width}px;height:${height}px`;
            document.body.appendChild(marker);
          } catch (error) {
            console.warn(
              'Devise Warning: There may be a problem with this slice. Try wrapping the template in a single <div> to resolve and prevent children components to be at the root level.'
            );
          }
        }
      }
    },
    addVisibilityScrollListeners () {
      if (
        (typeof this.$refs.component.isVisible !== 'undefined' ||
          typeof this.$refs.component.isHidden !== 'undefined') &&
        typeof this.$refs.component !== 'undefined'
      ) {
        window.addEventListener('scroll', () => {
          if (this.checkVisible(this.$refs.component.$el)) {
            if (this.$refs.component && typeof this.$refs.component.isVisible !== 'undefined') {
              this.$refs.component.isVisible();
            }
          } else if (
            this.$refs.component &&
            typeof this.$refs.component.isHidden !== 'undefined'
          ) {
            this.$refs.component.isHidden();
          }
        });
      }
    },
    checkVisible (elm) {
      const rect = elm.getBoundingClientRect();
      const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
      return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    },
    buildStyles (styles, margin, padding) {
      if (typeof margin !== 'undefined') {
        if (typeof margin.top !== 'undefined') {
          styles.marginTop = `${margin.top}px`;
        }
        if (typeof margin.right !== 'undefined') {
          styles.marginRight = `${margin.right}px`;
        }
        if (typeof margin.bottom !== 'undefined') {
          styles.marginBottom = `${margin.bottom}px`;
        }
        if (typeof margin.left !== 'undefined') {
          styles.marginLeft = `${margin.left}px`;
        }
      }

      if (typeof padding !== 'undefined') {
        if (typeof padding.top !== 'undefined') {
          styles.paddingTop = `${padding.top}px`;
        }
        if (typeof padding.right !== 'undefined') {
          styles.paddingRight = `${padding.right}px`;
        }
        if (typeof padding.bottom !== 'undefined') {
          styles.paddingBottom = `${padding.bottom}px`;
        }
        if (typeof padding.left !== 'undefined') {
          styles.paddingLeft = `${padding.left}px`;
        }
      }

      return styles;
    },
  },
  computed: {
    ...mapGetters('devise', ['component', 'sliceConfig', 'breakpoint', 'mediaAlreadyRequested']),
    deviseForSlice () {
      if (this.devise.config) {
        return this.devise.config;
      }
      return this.devise;
    },
    styles () {
      const styles = {};

      if (typeof this.deviseForSlice.settings === 'undefined') {
        this.$set(this.deviseForSlice, 'settings', {});
      }

      const {
        backgroundColor,
        margin,
        mobile_margin,
        tablet_margin,
        padding,
        mobile_padding,
        tablet_padding,
      } = this.deviseForSlice.settings;

      if (typeof backgroundColor !== 'undefined') {
        styles.backgroundColor = backgroundColor;
      }

      if (this.breakpoint === 'tablet') {
        return this.buildStyles(styles, tablet_margin, tablet_padding);
      }

      if (this.breakpoint === 'mobile') {
        return this.buildStyles(styles, mobile_margin, mobile_padding);
      }

      return this.buildStyles(styles, margin, padding);
    },
    currentView () {
      if (this.devise.config) {
        return window.deviseSettings.$deviseComponents[this.devise.name];
      }
      return window.deviseSettings.$deviseComponents[this.devise.metadata.name];
    },
  },
  props: ['editorMode'],
  mixins: [Strings],
  components: {
    Slice,
    SettingsIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/SettingsIcon'),
    'sketch-picker': Sketch,
  },
};
</script>
