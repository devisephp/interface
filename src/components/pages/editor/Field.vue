<template>
  <!-- eslint-disable vue/no-v-html -->
  <div class="dvs-relative dvs-text-xs dvs-cursor-pointer">
    <div class="dvs-flex dvs-justify-between dvs-items-center">
      <div class="dvs-large-label dvs-flex dvs-items-center dvs-mr-2 dvs-font-bold dvs-w-full">
        <div
          class="dvs-rounded-full dvs-mr-2 dvs-w-2 dvs-h-2 dvs-mr-2"
          :class="{'dvs-bg-green': value.enabled, 'dvs-bg-white': !value.enabled, 'dvs-invisible': !options.enabler}"
          @click="toggleEnabled"
        ></div>
        <div
          class="dvs-flex dvs-items-center dvs-justify-stretch dvs-w-3/4 dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-px-4 dvs-rounded"
          @click="toggleShowEditor"
        >
          {{devLabel}} {{ options.label }}
        </div>
      </div>
    </div>

    <template v-if="showEditor">
      <portal to="devise-root">
        <div
          class="dvs-blocker"
          :style="{backgroundColor: 'transparent'}"
          @click="toggleShowEditor"
        ></div>
        <panel
          id="field-panel"
          class="dvs-fixed dvs-pin-b dvs-pin-r dvs-mx-8 dvs-mb-8 dvs-z-40 dvs-max-w-full dvs-bg-admin-bg dvs-text-admin-fg dvs-rounded"
        >
          <div class="dvs-p-8 dvs-flex dvs-flex-col">
            <h6 class="dvs-text-base dvs-mb-2 dvs-w-full uppercase">
              <span>{{ options.label }}</span>
              <br>

            </h6>

            <slot name="editor"></slot>

            <div
              v-if="options.instructions"
              class="dvs-text-sm mt-4 border-b border-t py-2"
            >
              <div class="opacity-75 uppercase mb-2 text-xs">Hint from Developer:</div>
              <span
                class="dvs-font-normal"
                v-html="options.instructions"
              ></span>
            </div>

            <div class="dvs-flex dvs-items-center dvs-mt-4 dvs-mb-4 dvs-justify-between">
              <div
                class="dvs-flex dvs-items-center dvs-w-full dvs-text-xs"
                style="max-width:300px;"
              >
                <button
                  class="dvs-btn dvs-btn-primary dvs-mr-2 dvs-w-1/2"
                  @click="toggleShowEditor"
                >Done</button>
                <button
                  class="dvs-btn dvs-btn-secondary dvs-mr-2 dvs-w-1/2"
                  @click="cancel"
                >Cancel</button>
              </div>
              <div
                v-if="options.enabler"
                class="dvs-flex dvs-items-center dvs-justify-between"
                style="min-width:175px;"
              >
                <label class="dvs-mr-2">Field Enabled</label>
                <toggle
                  :id="randomString(8)"
                  v-model="enabled"
                ></toggle>
              </div>
            </div>
            <div
              v-if="!showErase && !noReset"
              class="dvs-absolute dvs-pin-b dvs-pin-l dvs-pin-r dvs-uppercase dvs-text-center dvs-text-xs dvs-p-2 dvs-cursor-pointer dvs-bg-admin-highlight-bg dvs-text-admin-highlight-fg"
              style="height:30px;"
              @click="showErase = true"
            >reset</div>
            <div
              v-if="showErase"
              class="dvs--mb-8 dvs--ml-8 dvs--mr-8 dvs-btn-primary dvs-btn-sm"
            >
              <button
                class="dvs-btn dvs-w-full dvs-btn-primary dvs-btn-sm"
                @click="resetValue"
              >Reset Value to Nothing</button>
            </div>
          </div>
        </panel>
      </portal>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Strings from '../../../mixins/Strings';
import Field from '../../../mixins/Field';

export default {
  name: 'FieldEditor',
    components: {
    Panel: () => import(/* webpackChunkName: "devise-utilities" */ '../../utilities/Panel'),
    Toggle: () => import(/* webpackChunkName: "devise-utilities" */ '../../utilities/Toggle'),
  },
  mixins: [Strings, Field],

  props: {
    value: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: true
    },
    showEditor: {
      type: Boolean,
      default: false
    },
    noReset: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      showErase: false,
    };
  },
  computed: {
    ...mapState('devise', ['devMode']),
    /* eslint-disable */
    devLabel () {
      if (this.devMode) {
        // TO DO - NEED THE INSTANCE ID OF THE FIELD
        // return ``;
      }
    },
  },
  methods: {
    toggleShowEditor () {
      this.showErase = false;
      this.$emit('toggleShowEditor');

      this.$nextTick(() => {
        if (this.showEditor) {
          window.deviseSettings.$bus.$emit('devise-showing-field-editor')
        } else {
          window.deviseSettings.$bus.$emit('devise-hiding-field-editor')
        }
      })
    },
    cancel () {
      this.$emit('cancel');
    },
    enabledTip (enabled) {
      if (enabled) {
        return 'This field is enabled';
      }
      return 'This field is not enabled. Edit the field and toggle the enable switch to turn it on.';
    },
    toggleEnabled () {
      this.value.enabled = !this.value.enabled
    },
    resetValue () {
      this.showErase = false;
      this.$emit('resetvalue');
    },
  },
};
</script>
