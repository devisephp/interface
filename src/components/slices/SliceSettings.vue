<template>
  <div class="dvs-fixed dvs-z-9999" style="top: 30px; right: 30px">
    <div
      v-if="showEditor"
      class="dvs-z-50 dvs-min-w-96 dvs-z-50 dvs-rounded dvs-bg-gray-800 dvs-text-gray-200 dvs-shadow-lg dvs-flex dvs-items-stretch"
      style="height: calc(100vh - 50px)"
    >
      <div
        id="dvs-admin-sidebar"
        class="dvs-left-0 dvs-z-10 dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg"
        :style="{
          position: 'relative',
          bottom: 'auto',
          width: '175px',
          margin: 0,
        }"
      >
        <ul>
          <li class="dvs-cursor-pointer" @click="showType = 'desktop'">Desktop</li>
          <li class="dvs-cursor-pointer" @click="showType = 'tablet'">Tablet</li>
          <li class="dvs-cursor-pointer" @click="showType = 'mobile'">Mobile</li>
        </ul>

        <div class="dvs-absolute dvs-text-xs dvs-left-0 dvs-right-0 dvs-bottom-0 dvs-p-4">
          <button class="dvs-btn dvs-btn-primary dvs-w-full dvs-mb-2" @click="closeEditor">
            Done
          </button>
        </div>
      </div>
      <div class="dvs-p-8 dvs-overflow-y-scroll">
        <div>
          <div>
            <div>
              <slice-settings-section
                v-if="showType === 'desktop'"
                :value="slice.settings"
                :background-color="backgroundColor"
                :color="color"
                responsive-mode="desktop"
                @resetstyles="resetStyles"
                @setmarginpadding="setMarginPadding"
                @setbackground="setBackground"
                @setforeground="setForeground"
              ></slice-settings-section>

              <slice-settings-section
                v-if="showType === 'tablet'"
                :value="slice.settings"
                :background-color="backgroundColor"
                :color="color"
                responsive-mode="tablet"
                @resetstyles="resetStyles"
                @setmarginpadding="setMarginPadding"
                @setbackground="setBackground"
                @setforeground="setForeground"
              ></slice-settings-section>

              <slice-settings-section
                v-if="showType === 'mobile'"
                :value="slice.settings"
                :background-color="backgroundColor"
                responsive-mode="mobile"
                @resetstyles="resetStyles"
                @setmarginpadding="setMarginPadding"
                @setbackground="setBackground"
                @setforeground="setForeground"
              ></slice-settings-section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Vue from 'vue';
import Strings from '../../mixins/Strings';
import SliceSettingsSection from './SliceSettingsSection.vue';

// eslint-disable-next-line no-undef
const tinycolor = require(/* webpackChunkName: "tinycolor" */ 'tinycolor2');

export default {
  name: 'SliceSettings',
  components: {
    SliceSettingsSection,
  },
  mixins: [Strings],
  data() {
    return {
      showEditor: false,
      backgroundColor: null,
      color: null,
      slice: {},
      controlStyles: {
        right: null,
        top: null,
      },
      showType: 'desktop',
    };
  },
  computed: {
    ...mapGetters('devise', ['component', 'sliceConfig']),
  },

  created() {
    this.backgroundColor = tinycolor('#fff').toRgb();
    this.color = tinycolor('#000').toRgb();
  },
  mounted() {
    this.addListeners();
  },
  methods: {
    addListeners() {
      window.deviseSettings.$bus.$on('open-slice-settings', (slice) => {
        this.showEditor = true;
        Vue.set(this, 'slice', slice);
        if (this.slice.settings.backgroundColor) {
          this.backgroundColor = tinycolor(this.slice.settings.backgroundColor).toRgb();
        } else {
          this.backgroundColor = tinycolor('#fff').toRgb();
        }
      });

      window.deviseSettings.$bus.$on('devise-close-sidebar', () => {
        this.closeEditor();
      });
    },
    closeEditor() {
      this.showEditor = false;
      this.showType = 'desktop';
      Vue.set(this, 'slice', {});
    },
    resetStyles() {
      this.$set(this.slice, 'settings', {});
      this.backgroundColor = tinycolor('#fff').toRgb();
    },
    setMarginPadding(payload) {
      if (payload.responsiveMode === 'desktop') {
        this.setDesktopMarginPadding(payload);
      }

      if (payload.responsiveMode === 'tablet') {
        this.setTabletMarginPadding(payload);
      }

      if (payload.responsiveMode === 'mobile') {
        this.setMobileMarginPadding(payload);
      }
    },
    setDesktopMarginPadding(payload) {
      if (payload.type === 'margin' && typeof this.slice.settings.margin === 'undefined') {
        this.$set(this.slice.settings, 'margin', {});
      }

      if (payload.type === 'padding' && typeof this.slice.settings.padding === 'undefined') {
        this.$set(this.slice.settings, 'padding', {});
      }

      this.$set(this.slice.settings[payload.type], payload.position, payload.value);
    },
    setTabletMarginPadding(payload) {
      if (payload.type === 'margin' && typeof this.slice.settings.tablet_margin === 'undefined') {
        this.$set(this.slice.settings, 'tablet_margin', {});
      }

      if (
        payload.type === 'padding' &&
        typeof this.slice.settings.tablet_padding === 'undefined'
      ) {
        this.$set(this.slice.settings, 'tablet_padding', {});
      }

      this.$set(this.slice.settings[`tablet_${payload.type}`], payload.position, payload.value);
    },
    setMobileMarginPadding(payload) {
      if (payload.type === 'margin' && typeof this.slice.settings.mobile_margin === 'undefined') {
        this.$set(this.slice.settings, 'mobile_margin', {});
      }

      if (
        payload.type === 'padding' &&
        typeof this.slice.settings.mobile_padding === 'undefined'
      ) {
        this.$set(this.slice.settings, 'mobile_padding', {});
      }

      this.$set(this.slice.settings[`mobile_${payload.type}`], payload.position, payload.value);
    },
    setBackground(color) {
      this.$set(
        this.slice.settings,
        'backgroundColor',
        `rgba(${color.rgba.r},${color.rgba.g},${color.rgba.b},${color.rgba.a})`
      );
    },
    setForeground(color) {
      this.$set(
        this.slice.settings,
        'color',
        `rgba(${color.rgba.r},${color.rgba.g},${color.rgba.b},${color.rgba.a})`
      );
    },
  },
};
</script>
