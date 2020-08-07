<template>
  <div class="dvs-flex dvs-items-center dvs-bg-gray-200 dvs-p-2">
    <div class="dvs-uppercase dvs-text-xs dvs-font-bold dvs-ml-8 dvs-mr-4 dvs-text-gray-600">
      Edits for {{ activeImage.name }}
    </div>
    <editor-control v-model="edits">
      <template v-slot:button>
        <image-icon></image-icon>
      </template>
      <template v-slot:control>
        <fieldset class="dvs-fieldset dvs-mb-4">
          <label>Select a different image for {{ activeImage.name }}</label>
          <button class="dvs-btn dvs-btn-primary" @click="selectSizeImage">
            Select image
          </button>
        </fieldset>
      </template>
    </editor-control>

    <editor-control v-model="edits">
      <template v-slot:button>
        <maximize-icon></maximize-icon>
      </template>
      <template v-slot:control>
        <fieldset class="dvs-fieldset dvs-mb-4">
          <label>Width</label>
          <input v-model.number="edits.w" type="text" class="dvs-w-full" />
        </fieldset>
        <fieldset class="dvs-fieldset dvs-mb-4">
          <label>Height</label>
          <input v-model.number="edits.h" type="text" class="dvs-w-full" />
        </fieldset>
        <fieldset>
          <div class="flex">
            <button
              class="dvs-btn dvs-w-full dvs-btn-sm dvs-mr-2"
              :class="{
                'dvs-bg-green-500 dvs-text-white': lockAspectRatio,
                'dvs-bg-gray-200': !lockAspectRatio,
              }"
              @click="lockAspectRatio = !lockAspectRatio"
            >
              <lock-icon v-show="lockAspectRatio"></lock-icon>
              <unlock-icon v-show="!lockAspectRatio"></unlock-icon>
            </button>
            <button
              class="dvs-btn dvs-w-full dvs-btn-secondary dvs-btn-sm"
              @click="setCustomSizeToOriginal"
            >
              Reset Dimensions
            </button>
          </div>
        </fieldset>
      </template>
    </editor-control>

    <editor-control v-model="edits">
      <template v-slot:button>
        <crop-icon></crop-icon>
      </template>
      <template v-slot:control="slotProps">
        <fieldset v-if="edits.fit === 'custom'" class="dvs-fieldset dvs-mb-4">
          <label>Toggle Cropping</label>
          <button
            class="dvs-btn"
            :class="croppingButtonStyle"
            @click="startCropping(slotProps.toggleShowControl)"
          >
            <crop-icon></crop-icon>
          </button>
        </fieldset>
        <fieldset class="dvs-fieldset">
          <label>Fitting</label>
          <select v-model="edits.fit">
            <option :value="null">No Crop</option>
            <option value="custom">Custom</option>
            <option value="max">Fit</option>
            <option value="fill">Fill</option>
            <option value="stretch">Stretch</option>
            <option value="crop">Crop Center (Most Used)</option>
            <option value="crop-left">Crop Center Left</option>
            <option value="crop-right">Crop Center Right</option>
            <option value="crop-top">Crop Bottom</option>
            <option value="crop-top-left">Crop Bottom Left</option>
            <option value="crop-top-right">Crop Bottom Right</option>
            <option value="crop-bottom">Crop Top</option>
            <option value="crop-bottom-left">Crop Top Left</option>
            <option value="crop-bottom-right">Crop Top Right</option>
          </select>
        </fieldset>

        <fieldset v-if="edits.fit === 'fill'" class="dvs-fieldset">
          <label>Background Color</label>
          <color-picker v-model="editorColor" @cancel="edits.bg = null" />
        </fieldset>
      </template>
    </editor-control>

    <editor-control v-model="edits">
      <template v-slot:button>
        <star-icon></star-icon>
      </template>
      <template v-slot:control>
        <fieldset class="dvs-fieldset">
          <label>Quality</label>
          <div class="dvs-flex">
            <input
              v-model="edits.q"
              type="range"
              min="0"
              max="100"
              step="5"
              @dblclick="edits.q = null"
            />
            <div class="dvs-font-bold dvs-text-xs dvs-pl-2">{{ edits.q }}</div>
          </div>
        </fieldset>
      </template>
    </editor-control>

    <editor-control v-model="edits">
      <template v-slot:button>
        <aperture-icon></aperture-icon>
      </template>
      <template v-slot:control>
        <fieldset class="dvs-fieldset">
          <label>Sharpen</label>
          <div class="dvs-flex">
            <input
              v-model="edits.sharp"
              type="range"
              min="0"
              max="100"
              step="1"
              @dblclick="edits.sharp = null"
            />
            <div class="dvs-font-bold dvs-text-xs dvs-pl-2">{{ edits.sharp }}</div>
          </div>
        </fieldset>
      </template>
    </editor-control>

    <editor-control v-model="edits">
      <template v-slot:button>
        <rotation-icon></rotation-icon>
      </template>
      <template v-slot:control>
        <fieldset class="dvs-fieldset">
          <label>Rotation</label>
          <select v-model="edits.or">
            <option :value="null">No Rotation</option>
            <option value="90">90&deg; Counter Clockwise</option>
            <option value="180">180&deg;</option>
            <option value="270">270&deg; Counter Clockwise</option>
            <option value="auto">Auto (Reads EXIF Data)</option>
          </select>
        </fieldset>
      </template>
    </editor-control>

    <editor-control v-model="edits">
      <template v-slot:button>
        <flip-icon></flip-icon>
      </template>
      <template v-slot:control>
        <fieldset class="dvs-fieldset">
          <label>Rotation</label>
          <select v-model="edits.flip">
            <option :value="null">No Flip</option>
            <option value="v">Vertical</option>
            <option value="h">Horizontal</option>
            <option value="both">Vertical &amp; Horizontal</option>
          </select>
        </fieldset>
      </template>
    </editor-control>

    <editor-control v-model="edits">
      <template v-slot:button>
        <zap-icon></zap-icon>
      </template>
      <template v-slot:control>
        <fieldset class="dvs-fieldset">
          <label>Effects</label>
          <select v-model="edits.filt">
            <option :value="null">No Effect</option>
            <option value="greyscale">Greyscale</option>
            <option value="sepia">Sepia</option>
          </select>
        </fieldset>
      </template>
    </editor-control>

    <editor-control v-model="edits">
      <template v-slot:button>
        <sliders-icon></sliders-icon>
      </template>
      <template v-slot:control>
        <fieldset class="dvs-fieldset">
          <label>Brightness</label>
          <div class="dvs-flex">
            <input
              v-model="edits.bri"
              type="range"
              min="-100"
              max="100"
              step="1"
              @dblclick="edits.bri = null"
            />
            <div class="dvs-font-bold dvs-text-xs dvs-pl-2">{{ edits.bri }}</div>
          </div>
        </fieldset>
        <fieldset class="dvs-fieldset">
          <label>Contrast</label>
          <div class="dvs-flex">
            <input
              v-model="edits.con"
              type="range"
              min="-100"
              max="100"
              step="1"
              @dblclick="edits.con = null"
            />
            <div class="dvs-font-bold dvs-text-xs dvs-pl-2">{{ edits.con }}</div>
          </div>
        </fieldset>
        <fieldset class="dvs-fieldset">
          <label>Gamma</label>
          <div class="dvs-flex">
            <input
              v-model="edits.gam"
              type="range"
              min="0.1"
              max="9.99"
              step="0.01"
              @dblclick="edits.gam = null"
            />
            <div class="dvs-font-bold dvs-text-xs dvs-pl-2">{{ edits.gam }}</div>
          </div>
        </fieldset>
        <fieldset class="dvs-fieldset">
          <label>Pixelate</label>
          <div class="dvs-flex">
            <input
              v-model="edits.pixel"
              type="range"
              min="0"
              max="20"
              step="1"
              @dblclick="edits.pixel = null"
            />
            <div class="dvs-font-bold dvs-text-xs dvs-pl-2">{{ edits.pixel }}</div>
          </div>
        </fieldset>
      </template>
    </editor-control>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

// eslint-disable-next-line no-undef
const Chrome = require(/* webpackChunkName: "vue-color" */ 'vue-color/src/components/Chrome.vue')
  .default;
// eslint-disable-next-line no-undef
const tinycolor = require(/* webpackChunkName: "tinycolor" */ 'tinycolor2');

export default {
  name: 'MediaEditorControls',
  components: {
    'color-picker': Chrome,
    EditorControl: () => import(/* webpackChunkName: "devise-media" */ './EditorControl'),
    CropIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/CropIcon'),
    LockIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/LockIcon'),
    UnlockIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/UnlockIcon'),
    StarIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/StarIcon'),
    ApertureIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/ApertureIcon'),
    RotationIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/RotateCwIcon'),
    FlipIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/ColumnsIcon'),
    ZapIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/ZapIcon'),
    SlidersIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/SlidersIcon'),
    ImageIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/ImageIcon'),
    MaximizeIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/MaximizeIcon'),
  },
  props: {
    value: {
      required: true,
      type: Object,
    },
    activeImage: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      lockAspectRatio: false,
    };
  },

  computed: {
    ...mapState('devise', ['isCropping']),
    edits() {
      return this.value;
    },
    editorColor: {
      get() {
        if (this.edits.bg === null) {
          return '#ffffff';
        }
        return tinycolor(this.edits.bg).toRgb();
      },
      set(newValue) {
        this.edits.bg = newValue.hex;
      },
    },
    croppingButtonStyle() {
      if (this.isCropping) {
        return 'dvs-btn-primary';
      }
      return 'dvs-btn-ghost';
    },
    width() {
      return this.edits.w;
    },
    height() {
      return this.edits.h;
    },
  },

  watch: {
    width(newValue, oldValue) {
      if (this.lockAspectRatio) {
        const aspectRatio = this.height / oldValue;
        this.edits.h = Math.round(aspectRatio * newValue);
      }
    },
  },

  methods: {
    ...mapMutations('devise', ['toggleCropping']),
    selectSizeImage() {
      this.$emit('selectsizeimage');
    },
    setCustomSizeToOriginal() {
      this.lockAspectRatio = false;
      this.$emit('settooriginal');
    },
    startCropping(toggle) {
      this.toggleCropping();
      toggle();
    },
  },
};
</script>
