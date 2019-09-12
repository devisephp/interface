
<template>
  <!-- eslint-disable vue/valid-v-for -->

  <div
    class="dvs-ml-16 dvs-max-w-1/2 dvs-self-center dvs-shadow-lg dvs-bg-admin-bg dvs-text-admin-fg dvs-rounded dvs-pointer-events-auto"
    id="dvs-admin-content-container"
    ref="admin-route-wrapper"
    style="min-width:400px"
  >
    <vue-scrollbar class="dvs-max-h-screenpad ">

      <div>
        <div>
          <div
            class="dvs-pt-8 dvs-pb-16 dvs-relative"
            v-if="can('manage slices')"
          >
            <div class="dvs-absolute dvs-pin-t dvs-pin-r dvs-mt-4 dvs-mr-4">
              <toggle
                :mini="true"
                @change="setDevMode"
                :id="randomString(8)"
              ></toggle>
            </div>

            <div class="dvs-p-8 dvs-pt-0">
              <fieldset
                class="dvs-fieldset"
                v-if="!showTimeTravel"
              >
                <div class="flex flex-col items-stretch">
                  <label>Page Version</label>
                  <select
                    @change="selectVersion"
                    class="dvs-small dvs-bg-admin-bg dvs-text-admin-fg"
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
                    <option value="timetravel">Time Travel Preview</option>
                  </select>
                </div>
              </fieldset>
              <fieldset
                class="dvs-fieldset"
                v-else
              >
                <label>Preview Date Time</label>
                <div class="dvs-flex">
                  <date-picker
                    ref="datepicker"
                    v-model="timeTravelDate"
                    :settings=" { date: true, time: true }"
                    class="dvs-mr-2"
                  />
                  <button
                    @click="timeTravel"
                    class="dvs-rounded dvs-btn dvs-btn-primary dvs-btn-sm dvs-flex dvs-justify-center dvs-items-center dvs-uppercase dvs-text-xs dvs-font-bold"
                  >Go</button>
                </div>
              </fieldset>
            </div>

            <div class="dvs-px-8">
              <fieldset class="dvs-fieldset">
                <label>Page Slices</label>
              </fieldset>
            </div>

            <div class="dvs-flex dvs-flex-col dvs-items-center">
              <draggable
                v-bind="{
          group: {name: 'g1'},
          animation:200,
          ghostClass: 'dvs-ghost',
          handle: '.handle',
          dragClass: 'dvs-chosen-drag-slice',
          emptyInsertThreshold: 10,
          removeCloneOnHide: false
        }"
                :list="currentPageSlices"
                tag="ul"
                class="dvs-list-reset dvs-w-full dvs-px-4"
              >

                <template v-for="(slice, key) in currentPageSlices">
                  <slice-editor
                    @opened="openSlice(slice)"
                    :key="randomString(8)"
                    v-model="currentPageSlices[key]"
                    @addSlice="addSlice"
                    @editSlice="editSlice"
                    @removeSlice="removeSlice"
                    @copySlice="copySlice"
                    :depth="1"
                  />
                </template>
              </draggable>
            </div>

            <div
              v-if="additionalPageSettings"
              class="dvs-px-8"
            >
              <fieldset class="dvs-fieldset dvs-mb-2">
                <label
                  class="dvs-mb-2 dvs-cursor-pointer"
                  @click="additionalSettingsOpen = !additionalSettingsOpen"
                >Additional Page Settings</label>
              </fieldset>

              <slice-editor-fields
                v-show="additionalSettingsOpen"
                v-model="currentPage.settings.fields"
                :the-fields="additionalPageSettings"
              />

            </div>

            <div class="dvs-flex dvs-flex-col dvs-items-center dvs-px-8">
              <manage-slice
                ref="manageSlice"
                v-if="createSlice === true"
                @addSlice="addSlice"
                @cancel="createSlice = false"
                mode="inserting"
              />

              <div class="dvs-absolute dvs-pin-b dvs-pin-l dvs-pin-r dvs-mb-3 dvs-flex dvs-justify-around dvs-p-2 dvs-px-8">

                <button
                  class="dvs-btn dvs-btn-sm dvs-btn-primary dvs-w-3/5 dvs-mr-2"
                  @click.prevent="requestSavePage()"
                >
                  <refresh-icon
                    w="15"
                    h="15"
                    v-if="saving"
                    class="dvs-mr-2 dvs-rotate-ccw"
                  />Save Page
                </button>

                <button
                  class="dvs-btn dvs-btn-sm dvs-flex dvs-justify-center dvs-items-center dvs-uppercase dvs-font-bold dvs-w-2/5 dvs-btn-secondary"
                  @click.prevent="requestAddSlice"
                >
                  <add-icon class="dvs-text-xl dvs-mr-1" />Add Slice
                </button>
              </div>
            </div>
          </div>

          <div v-else>

            <div class="dvs-p-8">
              <fieldset class="dvs-fieldset">
                <div class="dvs-flex dvs-flex-col dvs-items-stretch">
                  <h4>Administration</h4>
                  <p class="dvs-mt-4">Use the icons along the left column to navigate.</p>
                </div>
              </fieldset>
            </div>

          </div>
        </div>
      </div>
    </vue-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DatePicker from '../utilities/DatePicker.vue';
import Strings from '../../mixins/Strings';

const queryString = require('query-string');

export default {
  name: 'PageEditor',
  data () {
    return {
      saving: false,
      createSlice: false,
      showTimeTravel: false,
      timeTravelDate: null,
      additionalSettingsOpen: false,
      queryString,
    };
  },
  mounted () {
    if (this.additionalPageSettings) {
      this.currentPage.settings.fields = Object.assign({}, this.additionalPageSettings, this.currentPage.settings.fields)
    }

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
      this.savePage({ page: this.currentPage }).then((response) => {
        // If someone else saved before we saved
        if (response === 480) {
          window.deviseSettings.$bus.$emit('showForceSave');
        } else {
          window.onbeforeunload = null;
        }
      }).finally(() => {
        this.saving = false;
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
        if (newSlice.metadata.has_child_slot === true) {
          if (typeof newSlice.slices === 'undefined') {
            this.$set(newSlice, 'slices', []);
          }
        }
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
      if (editedSlice.metadata.has_child_slot) {
        editedSlice.slices = referenceSlice.slices
      }

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
      if (e.target.value === 'timetravel') {
        this.showTimeTravel = true;
        return false;
      }

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
    timeTravel () {
      const travelObj = {
        time_travel_to: this.timeTravelDate
      };
      const stringified = this.queryString.stringify(travelObj);
      document.location.search = stringified;
      return true;
    }
  },
  computed: {
    ...mapGetters('devise', ['currentPage', 'sliceConfig']),
    currentPageSlices () {
      return this.currentPage.slices
    },
    additionalPageSettings () {

      if (window.deviseSettings.$config.additionalPageSettings) {
        const site = window.deviseSettings.$config.additionalPageSettings.find(s => s.siteId === this.currentPage.site_id);
        if (site) {
          return site.fields
        }
      }
      return false
    }
  },
  mixins: [Strings],
  components: {
    DatePicker,
    AddIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/PlusCircleIcon'),
    RefreshIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/RefreshCcwIcon'),
    draggable: () => import(/* webpackChunkName: "devise-editors" */ 'vuedraggable'),
    ManageSlice: () => import(/* webpackChunkName: "devise-editors" */ './slices/ManageSlice'),
    SliceEditor: () => import(/* webpackChunkName: "devise-editors" */ './slices/SliceEditor'),
    SliceEditorFields: () => import(/* webpackChunkName: "devise-editors" */ "./slices/SliceEditorFields"),
    Toggle: () => import(/* webpackChunkName: "devise-utilities" */ '../utilities/Toggle'),
    VueScrollbar: () => import(/* webpackChunkName: "devise-administration" */ 'vue2-scrollbar'),
  },
};
</script>
