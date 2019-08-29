<template>
  <div class="dvs-flex dvs-items-center dvs-bg-grey-lighter dvs-p-2">
    <div class="dvs-uppercase dvs-text-xs dvs-font-bold dvs-ml-8 dvs-mr-4 dvs-text-grey-dark">
      Edits for {{ activeImage.name }}
    </div>
    <editor-control v-model="edits">
      <template v-slot:button>
        <image-icon></image-icon>
      </template>
      <template v-slot:control>
        <fieldset class="dvs-fieldset dvs-mb-4">
          <label>Select a different image for {{ activeImage.name }}</label>
          <button
            class="dvs-btn dvs-btn-primary"
            @click="selectSizeImage"
          >
            Select image
          </button>
        </fieldset>
      </template>
    </editor-control>

    <editor-control v-model="edits">
      <template v-slot:button>
        <maximize-icon></maximize-icon>
      </template>
      <template v-slot:control="slotProps">
        <fieldset class="dvs-fieldset dvs-mb-4">
          <label>Width</label>
          <input
            type="text"
            v-model.number="edits.w"
            class="dvs-w-full"
          >
        </fieldset>
        <fieldset class="dvs-fieldset dvs-mb-4">
          <label>Height</label>
          <input
            type="text"
            v-model.number="edits.h"
            class="dvs-w-full"
          >
        </fieldset>
        <fieldset>
          <button
            class="dvs-btn dvs-w-full dvs-btn-primary dvs-btn-sm"
            @click="setCustomSizeToOriginal"
          >Original Dimensions</button>
        </fieldset>
      </template>
    </editor-control>

    <editor-control v-model="edits">
      <template v-slot:button>
        <crop-icon></crop-icon>
      </template>
      <template v-slot:control="slotProps">
        <fieldset
          class="dvs-fieldset dvs-mb-4"
          v-if="edits.fit === 'custom'"
        >
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
            <option :label="null">None</option>
            <option value="custom">Custom</option>
            <option value="crop">Contain</option>
            <option value="max">Best Fit</option>
            <option value="fill">Fill</option>
            <option value="stretch">Stretch</option>
            <option value="crop">Crop Center</option>
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

        <fieldset
          class="dvs-fieldset"
          v-if="edits.fit === 'fill'"
        >
          <label>Background Color</label>
          <sketch-picker
            v-model="editorColor"
            @cancel="edits.bg = null"
          />
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
              type="range"
              @dblclick="edits.q = null"
              v-model="edits.q"
              min="0"
              max="100"
              step="5"
            >
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
              type="range"
              @dblclick="edits.sharp = null"
              v-model="edits.sharp"
              min="0"
              max="100"
              step="1"
            >
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
              type="range"
              @dblclick="edits.bri = null"
              v-model="edits.bri"
              min="-100"
              max="100"
              step="1"
            >
            <div class="dvs-font-bold dvs-text-xs dvs-pl-2">{{ edits.bri }}</div>
          </div>
        </fieldset>
        <fieldset class="dvs-fieldset">
          <label>Contrast</label>
          <div class="dvs-flex">
            <input
              type="range"
              @dblclick="edits.con = null"
              v-model="edits.con"
              min="-100"
              max="100"
              step="1"
            >
            <div class="dvs-font-bold dvs-text-xs dvs-pl-2">{{ edits.con }}</div>
          </div>
        </fieldset>
        <fieldset class="dvs-fieldset">
          <label>Gamma</label>
          <div class="dvs-flex">
            <input
              type="range"
              @dblclick="edits.gam = null"
              v-model="edits.gam"
              min="0.1"
              max="9.99"
              step="0.01"
            >
            <div class="dvs-font-bold dvs-text-xs dvs-pl-2">{{ edits.gam }}</div>
          </div>
        </fieldset>
        <fieldset class="dvs-fieldset">
          <label>Pixelate</label>
          <div class="dvs-flex">
            <input
              type="range"
              @dblclick="edits.pixel = null"
              v-model="edits.pixel"
              min="0"
              max="20"
              step="1"
            >
            <div class="dvs-font-bold dvs-text-xs dvs-pl-2">{{ edits.pixel }}</div>
          </div>
        </fieldset>
      </template>
    </editor-control>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

const { Sketch } = import(/* webpackChunkName: "vue-color" */ 'vue-color')

const tinycolor = require(/* webpackChunkName: "tinycolor2" */ 'tinycolor2');

export default {
  name: 'MediaEditorControls',
  props: {
    value: {
      required: true,
      type: Object
    },
    activeImage: {
      required: true,
      type: Object
    }
  },
  computed: {
    ...mapState('devise', ['isCropping']),
    edits () {
      return this.value
    },
    editorColor: {
      get () {
        if (this.edits.bg === null) {
          return '#ffffff';
        }
        return tinycolor(this.edits.bg).toRgb();
      },
      set (newValue) {
        this.edits.bg = newValue.hex;
      },
    },
    croppingButtonStyle () {
      if (this.isCropping) {
        return 'dvs-btn-primary'
      }
      return 'dvs-btn-ghost'
    },
  },
  components: {
    'sketch-picker': Sketch,
    EditorControl: () => import(/* webpackChunkName: "devise-media" */ './EditorControl'),
    CropIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/CropIcon'),
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
  methods: {
    ...mapMutations('devise', ['toggleCropping']),
    selectSizeImage () {
      this.$emit('selectsizeimage')
    },
    setCustomSizeToOriginal () {
      this.$emit('settooriginal')
    },
    startCropping (toggle) {
      this.toggleCropping()
      toggle()
    }
  }
}
</script>
