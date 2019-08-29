<template>
  <div>
    <h3 class="dvs-uppercase dvs-mb-2">{{ responsiveMode }}</h3>
    <fieldset class="dvs-fieldset dvs-mb-8">
      <label>ID of Slice</label>
      <input
        type="text"
        v-model="settings.id"
      >
    </fieldset>
    <fieldset class="dvs-fieldset">
      <label>Margins and Padding</label>
    </fieldset>

    <div
      class="dvs-flex dvs-justify-center dvs-my-4"
      id="dvs-slice-manager-margins-padding"
    >
      <div class="dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg">
        <div class="dvs-flex dvs-p-2 dvs-pb-0">
          <div class="dvs-text-xs dvs-uppercase dvs-w-1/3">Margin</div>
          <div class="dvs-w-1/3 dvs-text-center">
            <input
              type="number"
              :value="getStyle('margin', 'top')"
              @keyup="setMargin('top', $event)"
              @click="setMargin('top', $event)"
            >
          </div>
        </div>
        <div class="dvs-flex dvs-items-center dvs-px-2">
          <div>
            <input
              type="number"
              :value="getStyle('margin', 'left')"
              @keyup="setMargin('left', $event)"
              @click="setMargin('left', $event)"
            >
          </div>
          <div class="dvs-p-2">
            <div class="dvs-bg-admin-highlight-bg dvs-text-admin-highlight-fg">
              <div class="dvs-flex dvs-p-2 dvs-pb-0">
                <div class="dvs-text-xs dvs-uppercase dvs-w-1/3">Padding</div>
                <div class="dvs-w-1/3 dvs-text-center">
                  <input
                    type="number"
                    :value="getStyle('padding', 'top')"
                    @keyup="setPadding('top', $event)"
                    @click="setPadding('top', $event)"
                  >
                </div>
              </div>
              <div class="dvs-flex dvs-items-center dvs-px-2">
                <div>
                  <input
                    type="number"
                    :value="getStyle('padding', 'left')"
                    @keyup="setPadding('left', $event)"
                    @click="setPadding('left', $event)"
                  >
                </div>
                <div class="dvs-p-2">
                  <div class="dvs-bg-white dvs-w-24 dvs-h-24">&nbsp;</div>
                </div>
                <div>
                  <input
                    type="number"
                    :value="getStyle('padding', 'right')"
                    @keyup="setPadding('right', $event)"
                    @click="setPadding('right', $event)"
                  >
                </div>
              </div>
              <div class="dvs-flex dvs-justify-center dvs-p-2 dvs-pt-0">
                <div class="dvs-text-center">
                  <input
                    type="number"
                    :value="getStyle('padding', 'bottom')"
                    @keyup="setPadding('bottom', $event)"
                    @click="setPadding('bottom', $event)"
                  >
                </div>
              </div>
            </div>
          </div>
          <div>
            <input
              type="number"
              :value="getStyle('margin', 'right')"
              @keyup="setMargin('right', $event)"
              @click="setMargin('right', $event)"
            >
          </div>
        </div>
        <div class="dvs-flex dvs-justify-center dvs-p-2 dvs-pt-0">
          <div class="dvs-text-center">
            <input
              type="number"
              :value="getStyle('margin', 'bottom')"
              @keyup="setMargin('bottom', $event)"
              @click="setMargin('bottom', $event)"
            >
          </div>
        </div>
      </div>
    </div>

    <div class="dvs-mb-8">
      <fieldset class="dvs-fieldset dvs-mt-8">
        <label>Background Color</label>
        <p class="dvs-mb-4 dvs-text-xs">Note: Background color effects all responsive sizes</p>
      </fieldset>
      <div v-show="showBackgroundColor">
        <sketch-picker v-model="bg" />
      </div>
      <button
        v-show="!showBackgroundColor"
        class="dvs-btn dvs-btn-primary dvs-mr-2 dvs-text-xs"
        @click="showBackgroundColor = true"
      >Set Background Color</button>
    </div>

    <div class="dvs-mb-8">
      <fieldset class="dvs-fieldset dvs-mt-8">
        <label>Text Color</label>
        <p class="dvs-mb-4 dvs-text-xs">Note: Text color effects all responsive sizes</p>
      </fieldset>
      <div v-show="showTextColor">
        <sketch-picker v-model="textColor" />
      </div>
      <button
        v-show="!showTextColor"
        class="dvs-btn dvs-btn-primary dvs-mr-2 dvs-text-xs"
        @click="showTextColor = true"
      >Set Text Color</button>
    </div>

    <button
      class="dvs-btn dvs-rounded dvs-btn-secondary dvs-text-xs"
      @click="resetStyles"
    >Reset all Settings</button>
  </div>
</template>

<script>
const { Sketch } = import(/* webpackChunkName: "vue-color" */ 'vue-color')

export default {
  data () {
    return {
      showBackgroundColor: false,
      showTextColor: false,
    };
  },
  props: ['value', 'responsiveMode', 'backgroundColor', 'color'],
  computed: {
    settings: {
      get () {
        return this.value;
      },
      set (settings) {
        this.$emit('input', settings);
      },
    },
    bg: {
      get () {
        return this.backgroundColor;
      },
      set (color) {
        this.$emit('setbackground', color);
      },
    },
    textColor: {
      get () {
        return this.color;
      },
      set (color) {
        this.$emit('setforeground', color);
      },
    },
    theId: {
      get () {
        return this.id;
      },
      set (newId) {
        this.$emit('setId', newId);
      },
    }
  },
  methods: {
    setMargin (position, event) {
      const { value } = event.target;
      this.$emit('setmarginpadding', {
        responsiveMode: this.responsiveMode,
        type: 'margin',
        position,
        value,
      });
    },
    setPadding (position, event) {
      const { value } = event.target;
      this.$emit('setmarginpadding', {
        responsiveMode: this.responsiveMode,
        type: 'padding',
        position,
        value,
      });
    },

    getStyle (type, position) {
      if (type === 'margin' || type === 'padding') {
        let prefix = '';
        if (this.responsiveMode !== 'desktop') {
          prefix = `${this.responsiveMode}_`;
        }

        if (typeof this.value[prefix + type] !== 'undefined') {
          if (typeof this.value[prefix + type][position] !== 'undefined') {
            return this.value[prefix + type][position];
          }
        }
      }
      return 0;
    },
    resetStyles () {
      this.$emit('resetstyles', this.responsiveMode);
    },
  },
  components: {
    'sketch-picker': Sketch,
  },
};
</script>
