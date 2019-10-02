<template>
  <div
    id="dvs-admin-content-container"
    ref="admin-route-wrapper"
    class="dvs-relative dvs-ml-16 dvs-max-w-1/2 dvs-self-center dvs-shadow-lg dvs-bg-admin-bg dvs-text-admin-fg dvs-rounded dvs-pointer-events-auto"
    style="min-width:400px"
  >
    <vue-scrollbar
      ref="Scrollbar"
      class="dvs-max-h-screenpad"
    >

      <div>
        <div>
          <div
            v-if="can('manage slices')"
            class="dvs-pt-8 dvs-pb-16 dvs-relative"
          >
            <div class="dvs-absolute dvs-pin-t dvs-pin-r dvs-mt-4 dvs-mr-4">
              <toggle
                :id="randomString(8)"
                :mini="true"
                @change="setDevMode"
              ></toggle>
            </div>

            <div class="dvs-px-8 dvs-mb-8 dvs-text-xl dvs-font-sans">

              <div
                class="dvs-cursor-pointer dvs-flex dvs-items-center"
                @click="goToEditPage()"
              >
                <span class="dvs-text-xs dvs-mr-2">
                  <edit-icon></edit-icon>
                </span>
                {{ currentPage.title }}
              </div>
            </div>

            <div class="dvs-p-8 dvs-pt-0">
              <fieldset
                v-if="!showTimeTravel"
                class="dvs-fieldset"
              >
                <div class="flex flex-col items-stretch">
                  <label class="dvs-opacity-75">Page Version</label>
                  <select
                    class="dvs-small dvs-bg-admin-bg dvs-text-admin-fg"
                    @change="selectVersion"
                  >
                    <option
                      v-for="version in currentPage.versions"
                      :key="version.id"
                      :value="version.id"
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
                v-else
                class="dvs-fieldset"
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
                    class="dvs-rounded dvs-btn dvs-btn-primary dvs-btn-sm dvs-flex dvs-justify-center dvs-items-center dvs-uppercase dvs-text-xs dvs-font-bold"
                    @click="timeTravel"
                  >Go</button>
                </div>
              </fieldset>
            </div>

            <div class="dvs-px-8">
              <fieldset class="dvs-fieldset">
                <label class="dvs-opacity-75">Page Slices</label>
              </fieldset>
            </div>

            <div class="dvs-flex dvs-flex-col dvs-items-center">
              <draggable
                v-bind="{
                  group: {name: 'slices'},
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
                    :key="randomString(8, key)"
                    v-model="currentPageSlices[key]"
                    :depth="1"
                    @opened="openSlice(slice)"
                    @addSlice="addSlice"
                    @editSlice="editSlice"
                    @removeSlice="removeSlice"
                    @copySlice="copySlice"
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

            <div class="dvs-relative dvs-flex dvs-flex-col dvs-items-center dvs-px-8">
              <manage-slice
                v-if="createSlice === true"
                ref="manageSlice"
                mode="inserting"
                @addSlice="addSlice"
                @cancel="createSlice = false"
              />


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

          <div v-if="can('manage slices')" class="dvs-absolute dvs-pin-b dvs-pin-l dvs-pin-r dvs-mb-3 dvs-flex dvs-justify-around dvs-p-2 dvs-px-8">
            <button
              class="dvs-btn dvs-btn-sm dvs-btn-primary dvs-w-3/5 dvs-mr-2"
              @click.prevent="requestSavePage()"
            >
              <refresh-icon
                v-if="saving"
                w="15"
                h="15"
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
    </vue-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import DatePicker from '../utilities/DatePicker.vue';
import Strings from '../../mixins/Strings';

// eslint-disable-next-line no-undef
const queryString = require('query-string');

export default {
  name: 'PageEditor',
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
    EditIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/EditIcon'),
  },
  mixins: [Strings],
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
        this.recalculateScroll();
      });
    },

    goToEditPage () {
      this.$router.push({ name: 'devise-pages-admin', params: { workflowKey: 'jumpto-edit-page', pageId: this.currentPage.id } });
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
    },
    recalculateScroll () {
      this.$nextTick(() => {
        if (typeof this.$refs.Scrollbar !== 'undefined') {
          this.$refs.Scrollbar.calculateSize()
          this.$refs.Scrollbar.scrollToY(0)
        }
      })
    }
  },

};
</script>
