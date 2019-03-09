
<template>
  <!-- eslint-disable vue/valid-v-for -->
  <div class="dvs-pb-16">
    <div class="dvs-absolute dvs-pin-t dvs-pin-r dvs-mt-4 dvs-mr-4">
      <toggle
        :mini="true"
        @change="setDevMode"
        :id="randomString(8)"
      ></toggle>
    </div>

    <div class="dvs-p-8">
      <fieldset class="dvs-fieldset">
        <div class="flex flex-col items-stretch">
          <label>Page Version</label>
          <select
            @change="selectVersion"
            class="dvs-small"
            :style="theme.panelCard"
          >
            <option
              :value="version.id"
              v-for="version in currentPage.versions"
              :key="version.id"
              :selected="version.current"
            >
              {{ version.name }}
              <template v-if="version.current">(Currently Viewing)</template>
              <template v-if="version.is_live"> (Live)</template>
            </option>
          </select>
        </div>
      </fieldset>
    </div>

    <div class="dvs-px-8">
      <fieldset class="dvs-fieldset">
        <label>Page Slices</label>
      </fieldset>
    </div>

    <div class="dvs-flex dvs-flex-col dvs-items-center dvs-px-8 dvs-pb-8">
      <draggable
        :options="{
          group: {name: 'g1'},
          animation:200,
          ghostClass: 'dvs-ghost'
        }"
        :list="currentPageSlices"
        element="ul"
        class="dvs-list-reset dvs-w-full"
        @start="draggingStart"
        @end="draggingStop"
      >

        <template v-for="slice in currentPageSlices">
          <slice-editor
            @opened="openSlice(slice)"
            :key="randomString(8)"
            :devise="slice"
            @addSlice="addSlice"
            @editSlice="editSlice"
            @removeSlice="removeSlice"
            @copySlice="copySlice"
            :depth="1"
          />
        </template>
      </draggable>

      <manage-slice
        ref="manageSlice"
        v-if="createSlice === true"
        @addSlice="addSlice"
        @cancel="createSlice = false"
      />

      <div
        class="dvs-absolute dvs-pin-b dvs-pin-l dvs-pin-r dvs-flex dvs-justify-around dvs-p-2"
        :style="theme.panelSidebar"
      >

        <div
          :style="theme.actionButton"
          class="dvs-btn dvs-btn-sm dvs-flex-grow dvs-flex dvs-justify-center dvs-items-center"
          @click.prevent="requestSavePage()"
        >
          <refresh-icon
            w="15"
            h="15"
            v-if="saving"
            animate="rotate"
          />
          <span class="dvs-ml-2">Save Page</span>
        </div>

        <div class="dvs-flex dvs-justify-center">
          <button
            :style="{color: theme.actionButtonGhost.color}"
            class="dvs-rounded dvs-btn dvs-btn-sm dvs-flex dvs-justify-center dvs-items-center dvs-uppercase dvs-text-xs dvs-font-bold"
            @click.prevent="requestAddSlice"
          >
            <add-icon class="text-xl mr-1" />Add Slice
          </button>
        </div>
      </div>
    </div>

    <portal to="devise-root">
      <analytic-totals />
    </portal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Strings from '../../mixins/Strings';

export default {
  name: 'PageEditor',
  data () {
    return {
      saving: false,
      createSlice: false,
    };
  },
  mounted () {
    setTimeout(() => {
      this.$watch(
        'currentPage',
        () => {
          window.onbeforeunload = () => 'Changes you made may not be saved';
        },
        { deep: true }
      );
    }, 1000);
  },
  methods: {
    ...mapActions('devise', ['savePage', 'setDevMode']),
    requestSavePage () {
      this.saving = true;
      this.savePage(this.currentPage).then(() => {
        this.saving = false;
        window.onbeforeunload = null;
      });
    },
    toggleSlice (slice) {
      if (slice.metadata.open) {
        this.closeSlice(slice);
      } else {
        this.openSlice(slice);
      }
    },
    openSlice (sliceToOpen) {
      this.currentPage.slices.map(s => this.closeSlice(s));
      this.$set(sliceToOpen.metadata, 'open', true);
    },
    closeSlice (slice) {
      this.$set(slice.metadata, 'open', false);
    },
    // Drag & Drop
    draggingStart () {
      window.deviseSettings.$bus.$emit('devise-editor-dragging')
    },
    draggingStop () {
      window.deviseSettings.$bus.$emit('devise-editor-not-dragging')
    },
    requestAddSlice () {
      this.createSlice = true;
    },
    addSlice (newSlice, referenceSlice) {
      if (typeof referenceSlice !== 'undefined') {
        const config = this.sliceConfig(referenceSlice);
        if (config.has_child_slot === true) {
          if (typeof referenceSlice.slices === 'undefined') {
            this.$set(referenceSlice, 'slices', []);
          }
          referenceSlice.slices.push(newSlice);
        }
      } else {
        this.currentPage.slices.push(newSlice);
      }

      this.createSlice = false;
    },
    findReferenceSliceInSlices (slices, referenceSlice) {
      /* eslint-disable array-callback-return,consistent-return */
      return slices.find(slice => {
        if (slice === referenceSlice) return slice;
        if (slice.slices) return this.findReferenceSliceInSlices(slice.slices, referenceSlice);
      });
      // this.currentPage.slices[this.currentPage.slices.indexOf(referenceSlice)]
    },
    editSlice (editedSlice, referenceSlice) {
      this.currentPage.slices.splice(
        this.currentPage.slices.indexOf(referenceSlice),
        1,
        editedSlice
      );
    },
    setSubSliceInstaceToZero (slices) {
      for (let i = 0; i < slices.length; i += 1) {
        slices[i].metadata.instance_id = 0;

        if (typeof slices[i].slices === 'object' && slices[i].slices.length > 0) {
          slices[i].slices = this.setSubSliceInstaceToZero(slices[i].slices);
        }
      }

      return slices;
    },
    copySlice (sliceToCopy, referenceSlice) {
      if (referenceSlice === null) {
        referenceSlice = this.currentPage;
      }

      const newSlice = JSON.parse(JSON.stringify(sliceToCopy));
      newSlice.metadata.instance_id = 0;

      if (typeof newSlice.slices === 'object' && newSlice.slices.length > 0) {
        newSlice.slices = this.setSubSliceInstaceToZero(newSlice.slices);
      }

      referenceSlice.slices.push(newSlice);
    },
    removeSlice (deletingSlice, referenceSlice) {
      if (typeof referenceSlice === 'undefined') {
        referenceSlice = this.currentPage;
      }
      referenceSlice.slices.splice(referenceSlice.slices.indexOf(deletingSlice), 1);
    },
    selectVersion (e) {
      const versionId = parseInt(e.target.value, 0)
      const currentHref = document.location.href

      let newHref = ''

      if (currentHref.includes('version_id')) {
        newHref = currentHref.replace(/(version_id=[0-9]*)/g, `version_id=${versionId}`);
        document.location.href = newHref
        return true
      }
      newHref = currentHref
      newHref = (newHref.includes('?')) ? `${newHref}&` : `${newHref}?`
      document.location.href = `${newHref}version_id=${versionId}`
      return true
    },
  },
  computed: {
    ...mapGetters('devise', ['currentPage', 'sliceConfig']),
    currentPageSlices: {
      get () {
        return this.currentPage.slices
      },
      set (newValue) {
        console.log(newValue)
      }
    }
  },
  mixins: [Strings],
  components: {
    AddIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/PlusCircleIcon'),
    RefreshIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/RefreshCcwIcon'),
    AnalyticTotals: () => import(/* webpackChunkName: "devise-pages" */ './AnalyticTotals'),
    draggable: () => import(/* webpackChunkName: "devise-editors" */ 'vuedraggable'),
    ManageSlice: () => import(/* webpackChunkName: "devise-editors" */ './slices/ManageSlice'),
    SliceEditor: () => import(/* webpackChunkName: "devise-editors" */ './slices/SliceEditor'),
    Toggle: () => import(/* webpackChunkName: "devise-utilities" */ '../utilities/Toggle'),
  },
};
</script>
