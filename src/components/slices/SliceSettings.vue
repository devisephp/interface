<template>
  <div
    class="dvs-fixed dvs-z-9999"
    style="top:30px; right:30px;"
  >
    <div
      class="dvs-z-50 dvs-min-w-96 dvs-z-50 dvs-rounded dvs-shadow-lg dvs-flex dvs-items-stretch"
      :style="theme.panel"
      v-if="showEditor"
    >
      <div
        id="dvs-admin-sidebar"
        class="dvs-pin-l dvs-z-10"
        :style="{
          position:'relative',
          bottom: 'auto',
          width:'175px',
          margin:0,
          borderColor:theme.panelCard.background,
          background:theme.panelCard.background
        }"
      >
        <ul>
          <li
            class="dvs-cursor-pointer"
            @click="showType = 'desktop'"
          >Desktop</li>
          <li
            class="dvs-cursor-pointer"
            @click="showType = 'tablet'"
          >Tablet</li>
          <li
            class="dvs-cursor-pointer"
            @click="showType = 'mobile'"
          >Mobile</li>
        </ul>

        <div class="dvs-absolute dvs-pin-l dvs-pin-r dvs-pin-b dvs-p-4">
          <button
            class="dvs-btn dvs-w-full dvs-mb-2"
            :style="theme.actionButton"
            @click="closeEditor"
          >Done</button>
        </div>
      </div>
      <div class="dvs-p-8">
        <div
          v-bar
          style="height: calc(100vh - 150px);"
        >
          <div>
            <div>
              <slice-settings-section
                v-if="showType === 'desktop'"
                :value="slice.settings"
                :backgroundColor="backgroundColor"
                responsive-mode="desktop"
                @resetstyles="resetStyles"
                @setmarginpadding="setMarginPadding"
                @setbackground="setBackground"
              ></slice-settings-section>

              <slice-settings-section
                v-if="showType === 'tablet'"
                :value="slice.settings"
                :backgroundColor="backgroundColor"
                responsive-mode="tablet"
                @resetstyles="resetStyles"
                @setmarginpadding="setMarginPadding"
                @setbackground="setBackground"
              ></slice-settings-section>

              <slice-settings-section
                v-if="showType === 'mobile'"
                :value="slice.settings"
                :backgroundColor="backgroundColor"
                responsive-mode="mobile"
                @resetstyles="resetStyles"
                @setmarginpadding="setMarginPadding"
                @setbackground="setBackground"
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

const tinycolor = require('tinycolor2');

export default {
  name: 'SliceSettings',
  data () {
    return {
      showEditor: false,
      backgroundColor: null,
      slice: {},
      controlStyles: {
        right: null,
        top: null,
      },
      showType: 'desktop',
    };
  },
  created () {
    this.backgroundColor = tinycolor('#fff').toRgb();
  },
  mounted () {
    this.addListeners();
  },
  methods: {
    addListeners () {
      window.deviseSettings.$bus.$on('open-slice-settings', slice => {
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
    closeEditor () {
      this.showEditor = false;
      this.showType = 'desktop';
      Vue.set(this, 'slice', {});
    },
    resetStyles () {
      this.$set(this.slice, 'settings', {});
      this.backgroundColor = tinycolor('#fff').toRgb();
    },
    setMarginPadding (payload) {
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
    setDesktopMarginPadding (payload) {
      if (typeof this.slice.settings.margin === 'undefined') {
        this.$set(this.slice.settings, 'margin', {});
      }

      if (typeof this.slice.settings.padding === 'undefined') {
        this.$set(this.slice.settings, 'padding', {});
      }
      this.$set(this.slice.settings[payload.type], payload.position, payload.value);
    },
    setTabletMarginPadding (payload) {
      if (typeof this.slice.settings.tablet_margin === 'undefined') {
        this.$set(this.slice.settings, 'tablet_margin', {});
      }

      if (typeof this.slice.settings.tablet_padding === 'undefined') {
        this.$set(this.slice.settings, 'tablet_padding', {});
      }

      this.$set(this.slice.settings[`tablet_${payload.type}`], payload.position, payload.value);
    },
    setMobileMarginPadding (payload) {
      if (typeof this.slice.settings.mobile_margin === 'undefined') {
        this.$set(this.slice.settings, 'mobile_margin', {});
      }

      if (typeof this.slice.settings.mobile_padding === 'undefined') {
        this.$set(this.slice.settings, 'mobile_padding', {});
      }

      this.$set(this.slice.settings[`mobile_${payload.type}`], payload.position, payload.value);
    },
    setBackground (color) {
      this.$set(
        this.slice.settings,
        'backgroundColor',
        `rgba(${color.rgba.r},${color.rgba.g},${color.rgba.b},${color.rgba.a})`
      );
    },
  },
  computed: {
    ...mapGetters('devise', ['component', 'sliceConfig']),
  },
  mixins: [Strings],
  components: {
    SliceSettingsSection,
  },
};
</script>
