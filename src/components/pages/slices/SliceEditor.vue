<template>
  <!-- eslint-disable vue/valid-v-for -->
  <!-- eslint-disable vue/no-v-html -->
  <li class="dvs-collapsable dvs-mb-4" :class="{ 'dvs-open': sliceOpen }">
    <strong
      class="dvs-block dvs-mb-2 dvs-switch-sm dvs-text-sm dvs-flex dvs-justify-between dvs-items-center dvs-w-full"
    >
      <div class="dvs-flex dvs-items-center dvs-justify-between dvs-w-full dvs-px-4">
        <div class="dvs-flex dvs-items-center dvs-w-full">
          <div class="handle dvs-mr-2 dvs-cursor-move dvs-text-gray-200 dvs-opacity-50">
            <menu-icon />
          </div>
          <div
            dusk="slice-label"
            class="dvs-relative dvs-w-full dvs-cursor-pointer dvs-text-gray-200"
            :class="{ 'dvs-opacity-75': !sliceHasFieldsOrSlices }"
            @click="toggleSlice()"
            @mouseenter="markSlice(true, slice)"
            @mouseleave="markSlice(false, slice)"
            v-html="editorLabel"
          ></div>
        </div>
      </div>
    </strong>

    <portal to="devise-root">
      <copy-slice-to-page
        v-if="showCopyToAnotherPage"
        :slice="slice"
        @close="showCopyToAnotherPage = false"
      ></copy-slice-to-page>
    </portal>

    <manage-slice
      v-if="manageSlice === true"
      ref="manageslice"
      v-model="sliceToManage"
      :mode="manageSliceMode"
      @cancel="manageSlice = false"
      @addSlice="addSlice"
      @editSlice="editSlice"
      @removeSlice="removeSlice"
    />

    <div v-if="sliceOpen" class="dvs-collapsed dvs-px-4">
      <div class="dvs-pt-2 dvs-flex dvs-items-end dvs-flex-wrap">
        <div>
          <div
            class="dvs-opacity-50 hover:dvs-opacity-100 dvs-text-xs dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-mr-1 dvs-items-center dvs-flex dvs-flex-col dvs-mb-2 dvs-rounded-sm dvs-p-2"
            style="width: 50px"
            :class="{
              'dvs-cursor-pointer': hasChildSlot,
              'dvs-cursor-not-allowed dvs-opacity-50': !hasChildSlot,
            }"
            @click="requestInsertSlice()"
          >
            <add-icon w="25" h="25" />
            <div class="dvs-text-2xs dvs-text-center dvs-leading-none dvs-pt-2">Slice</div>
          </div>
        </div>

        <div>
          <div
            class="dvs-opacity-50 hover:dvs-opacity-100 dvs-text-xs dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-mr-1 dvs-cursor-pointer dvs-items-center dvs-flex dvs-flex-col dvs-mb-2 dvs-rounded-sm dvs-p-2"
            style="width: 50px"
            @click="jumpToSlice()"
          >
            <locate-icon w="25" h="25" />
            <div class="dvs-text-2xs dvs-text-center dvs-leading-none dvs-pt-2">Find</div>
          </div>
        </div>

        <div>
          <div
            class="dvs-opacity-50 hover:dvs-opacity-100 dvs-text-xs dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-cursor-pointer dvs-mr-1 dvs-items-center dvs-flex dvs-flex-col dvs-mb-2 dvs-rounded-sm dvs-p-2"
            style="width: 50px"
            @click="copySlice(slice, false)"
          >
            <copy-icon w="25" h="25" />
            <div class="dvs-text-2xs dvs-text-center dvs-leading-none dvs-pt-2">Duplicate</div>
          </div>
        </div>

        <div>
          <div
            class="dvs-opacity-50 hover:dvs-opacity-100 dvs-text-xs dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-cursor-pointer dvs-mr-1 dvs-items-center dvs-flex dvs-flex-col dvs-mb-2 dvs-rounded-sm dvs-p-2"
            style="width: 50px"
            @click="sliceSettings()"
          >
            <cog-icon w="25" h="25" />
            <div class="dvs-text-2xs dvs-text-center dvs-leading-none dvs-pt-2">Settings</div>
          </div>
        </div>

        <div>
          <div
            class="dvs-opacity-50 hover:dvs-opacity-100 dvs-text-xs dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-cursor-pointer dvs-mr-1 dvs-items-center dvs-flex dvs-flex-col dvs-mb-2 dvs-rounded-sm dvs-p-2"
            style="width: 50px"
            @click="requestEditSlice()"
          >
            <create-icon w="25" h="25" />
            <div class="dvs-text-2xs dvs-text-center dvs-leading-none dvs-pt-2">Edit</div>
          </div>
        </div>

        <div>
          <div
            class="dvs-opacity-50 hover:dvs-opacity-100 dvs-text-xs dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-cursor-pointer dvs-mr-1 dvs-items-center dvs-flex dvs-flex-col dvs-mb-2 dvs-rounded-sm dvs-p-2"
            style="width: 50px"
            @click="removeSlice()"
          >
            <remove-icon w="25" h="25" />
            <div class="dvs-text-2xs dvs-text-center dvs-leading-none dvs-pt-2">Remove</div>
          </div>
        </div>

        <div class="dvs-relative">
          <div
            v-if="can('capture slice image')"
            class="dvs-opacity-50 hover:dvs-opacity-100 dvs-text-xs dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-cursor-pointer dvs-mr-1 dvs-items-center dvs-flex dvs-flex-col dvs-mb-2 dvs-rounded-sm dvs-p-2"
            style="width: 50px"
            @click="requestGenerateScreenshotFromSlice()"
          >
            <image-icon w="25" h="25" />
            <div class="dvs-text-2xs dvs-text-center dvs-leading-none dvs-pt-2">Capture</div>
          </div>
          <div
            v-show="screenshotGenerating"
            class="dvs-absolute dvs-z-10 dvs-inset-0 dvs-flex dvs-justify-center dvs-items-center"
          >
            <svg
              class="dvs-animate-spin dvs-w-6 dvs-h-6 dvs-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
          </div>
        </div>

        <div>
          <div
            class="dvs-opacity-50 hover:dvs-opacity-100 dvs-text-xs dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-cursor-pointer dvs-mr-1 dvs-items-center dvs-flex dvs-flex-col dvs-mb-2 dvs-rounded-sm dvs-p-2"
            style="width: 50px"
            @click="requestCopyToAnotherPage()"
          >
            <copy-icon w="25" h="25" />
            <div class="dvs-text-2xs dvs-text-center dvs-leading-none dvs-pt-2">Copy</div>
          </div>
        </div>
      </div>

      <slice-editor-fields
        v-if="slice.metadata.type !== 'model' && sliceConfig(slice).fields"
        v-model="theFields"
        :the-fields="sliceConfig(slice).fields"
        @editfield="editField"
      />
    </div>

    <div v-if="slice.metadata.type === 'model'" class="dvs-collapsed dvs-px-6 dvs-text-sm">
      <div class="dvs-mb-8">
        <help
          >Be aware that these entries are model entries. That means they are managed in your
          database by another tool or by an admin section in your adminitration.</help
        >
      </div>

      <div
        v-for="(record, key) in pageSlices"
        :key="key"
        class="dvs-px-4 dvs-flex dvs-items-center"
      >
        <div
          v-if="record.settings && record.settings.admin && record.settings.admin.route"
          class="dvs-cursor-pointer"
          @click="goToModel(record)"
        >
          <link-icon></link-icon>
        </div>
        <div class="dvs-mb-2 dvs-ml-4" v-html="buildEditorLabelForModel(record, null)"></div>
      </div>
    </div>
    <div
      v-if="hasChildSlot"
      class="dvs-collapsed dvs-px-4 dvs-pl-6 dvs-mt-6"
      :style="{
        minHeight: '15px',
      }"
    >
      <draggable
        v-if="slice.metadata.type !== 'model'"
        v-devise-opacity.background="0.5"
        :list="sliceSlices"
        tag="ul"
        class="dvs-rounded-lg dvs-py-8 dvs-pt-3 dvs-mt-1 dvs-mb-6"
        v-bind="{
          group: { name: 'slices' },
          animation: 200,
          ghostClass: 'dvs-ghost',
          handle: '.handle',
          dragClass: 'dvs-chosen-drag-slice',
          emptyInsertThreshold: 10,
          removeCloneOnHide: false,
        }"
      >
        <template v-for="(s, k) in sliceSlices">
          <slice-editor
            :key="randomString(8, k)"
            v-model="sliceSlices[k]"
            :child="true"
            @addSlice="addSlice"
            @editSlice="editSlice"
            @removeSlice="removeSlice"
            @copySlice="copySlice"
          />
        </template>
      </draggable>
      <div v-if="sliceSlices.length < 1" class="px-4 text-center text-sm">
        Drag and Drop slices or click the add slice button above.
      </div>
    </div>
  </li>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Strings from '../../../mixins/Strings';

export default {
  name: 'SliceEditor',
  components: {
    AddIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/PlusCircleIcon'),
    CogIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/SettingsIcon'),
    CopyIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/CopyIcon'),
    CreateIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/Edit3Icon'),
    draggable: () => import(/* webpackChunkName: "devise-editors" */ 'vuedraggable'),
    LocateIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/TargetIcon'),
    LinkIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/LinkIcon'),
    ManageSlice: () => import(/* webpackChunkName: "devise-editors" */ './ManageSlice'),
    MenuIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/MenuIcon'),
    RemoveIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/TrashIcon'),
    ImageIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/ImageIcon'),
    SliceEditor: () => import(/* webpackChunkName: "devise-editors" */ './SliceEditor'),
    SliceEditorFields: () =>
      import(/* webpackChunkName: "devise-editors" */ './SliceEditorFields'),
    CopySliceToPage: () => import(/* webpackChunkName: "devise-editors" */ './CopySliceToPage'),
    Help: () => import(/* webpackChunkName: "devise-utilities" */ '../../utilities/Help'),
  },
  mixins: [Strings],
  props: {
    value: {
      type: Object,
      required: true,
    },
    child: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showDropZone: false,
      manageSlice: false,
      manageSliceMode: 'inserting',
      pageSlices: [],
      sliceOpen: false,
      showCopyToAnotherPage: false,
      screenshotGenerating: false,
    };
  },
  computed: {
    ...mapGetters('devise', ['component', 'fieldConfig', 'sliceConfig']),
    ...mapState('devise', ['devMode']),
    slice: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
    },
    sliceSlices: {
      get() {
        return this.value.slices ? this.value.slices : [];
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
    },
    sliceToManage: {
      get() {
        if (this.manageSliceMode === 'editing') {
          // Edit
          return this.value;
        }
        // Insert
        return {};
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
    },
    theFields() {
      const fields = {};
      for (const potentialField in this.slice) {
        if (
          this.slice[potentialField] &&
          potentialField !== 'slices' &&
          potentialField !== 'metadata' &&
          potentialField !== 'settings' &&
          typeof this.slice[potentialField] === 'object'
        ) {
          fields[potentialField] = this.slice[potentialField];
          if (typeof fields[potentialField].enabled === 'undefined') {
            this.$set(fields[potentialField], 'enabled', true);
          }
        }
      }
      return fields;
    },
    sliceHasFieldsOrSlices() {
      let count = Object.keys(this.theFields).length;
      if (this.slice.slices) {
        count += this.slice.slices.length;
      }

      return count > 0;
    },
    hasChildSlot() {
      const component = this.component(this.slice.metadata.name);

      if (component.has_child_slot) {
        return true;
      }

      return false;
    },
    editorLabel() {
      return this.buildEditorLabel(this.theFields, this.slice.metadata.instance_id);
    },
  },

  mounted() {
    if (this.slice.slices) {
      this.pageSlices = this.slice.slices;
    }
  },
  methods: {
    toggleSlice() {
      this.sliceOpen = !this.sliceOpen;
    },
    toggleSliceTools() {
      this.slice.metadata.tools = !this.slice.metadata.tools;
    },

    // Marking Slice
    markSlice(on) {
      window.deviseSettings.$bus.$emit('markSlice', this.slice, on);
    },
    jumpToSlice() {
      window.deviseSettings.$bus.$emit('jumpToSlice', this.slice);
    },
    sliceSettings() {
      window.deviseSettings.$bus.$emit('openSliceSettings', this.slice);
    },

    // Navigating Models
    goToModel(model) {
      this.$router.push({ name: model.settings.admin.route, params: model.settings.admin.params });
    },

    // Adding, Editing and Removing Slices
    requestInsertSlice() {
      if (this.hasChildSlot) {
        this.manageSliceMode = 'inserting';
        this.manageSlice = true;
      }
    },
    addSlice(slice, referringSlice) {
      if (typeof referringSlice === 'undefined') {
        referringSlice = this.slice;
      }
      this.$emit('addSlice', slice, referringSlice);
      this.manageSlice = false;
    },
    requestEditSlice() {
      this.manageSliceMode = 'editing';
      this.manageSlice = true;
      this.$nextTick(() => {
        if (this.$refs.manageslice) {
          this.$refs.manageslice.action = 'edit';
        }
      });
    },
    editSlice(slice) {
      this.slice = Object.assign({}, slice);
      this.manageSlice = false;
    },

    requestGenerateScreenshotFromSlice() {
      this.screenshotGenerating = true;
      window.deviseSettings.$bus.$emit('screenshotSlice', this.slice);
      window.deviseSettings.$bus.$on('screenshotDone', (slice) => {
        if (slice.id === this.slice.id) {
          this.screenshotGenerating = false;
        }
      });
    },

    copySlice(slice, referringSlice) {
      if (referringSlice === null) {
        referringSlice = Object.assign({}, this.slice);
      }

      if (referringSlice === false) {
        referringSlice = null;
      }

      this.$emit('copySlice', slice, referringSlice);
    },
    removeSlice(slice, referringSlice) {
      if (typeof slice === 'undefined') {
        slice = this.slice; // eslint-disable-line
      } else if (typeof referringSlice === 'undefined') {
        referringSlice = this.slice;
      }
      this.$emit('removeSlice', slice, referringSlice);
      this.manageSlice = false;
    },
    requestCopyToAnotherPage() {
      this.showCopyToAnotherPage = true;
    },
    editField(payload) {
      const { key, field, value } = payload;
      // Update the slice field
      this.slice[key] = Object.assign({}, value);

      // Send out the notification
      window.deviseSettings.$bus.$emit('devise-field-edited', { field, value });
    },
    buildEditorLabel(fields, instanceId) {
      const acceptedFieldTypes = {
        text: 'text',
        number: 'text',
        datetime: 'text',
        image: 'url',
        link: 'text',
        select: 'value',
      };

      let devMode = '';
      if (this.devMode) {
        devMode = `<div class="dvs-text-sm dvs-uppercase dvs-opacity-75">Instance Id: ${instanceId}</div>`;
      }

      for (const field in fields) {
        if (fields['field']) {
          const f = fields[field];

          if (f && f.editorLabel && f[acceptedFieldTypes[f.type]]) {
            let label = f[acceptedFieldTypes[f.type]];

            if (f.type === 'image') {
              label = `<div class="dvs-rounded dvs-bg-cover" style="background-image: url('${label}'); height:100px; width:200px;"></div>`;
            } else if (f.type !== 'number') {
              label = `${label.toLowerCase()}`;
            }

            if (label) {
              return `${devMode}<div class="dvs-text-xs dvs-opacity-25 dvs-uppercase dvs-leading-tight">${this.slice.metadata.label}</div>
                <div class="dvs-capitalize">${label}</div>`;
            }
          }
        }
      }

      return `${devMode}<div class="dvs-capitalize">${this.slice.metadata.label}</div>`;
    },

    buildEditorLabelForModel(record) {
      // It's a model slice instance
      for (const property in record) {
        if (property === 'title' || property === 'name') {
          // eslint-disable-next-line no-prototype-builtins
          if (record.hasOwnProperty(property) && record[property]) {
            return `<div class="dvs-capitalize">${this.slice.metadata.label}: ${record[property].text}</div>`;
          }
        }
      }

      return `<div class="dvs-capitalize">${this.slice.metadata.label}</div>`;
    },
  },
};
</script>
