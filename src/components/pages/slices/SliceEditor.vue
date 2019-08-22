<template>
  <!-- eslint-disable vue/valid-v-for -->
  <li
    class="dvs-collapsable dvs-mb-4"
    :class="{'dvs-open': sliceOpen}"
  >
    <strong class="dvs-block dvs-mb-2 dvs-switch-sm dvs-text-sm dvs-flex dvs-justify-between dvs-items-center dvs-w-full">
      <div class="dvs-flex dvs-items-center dvs-justify-between dvs-w-full dvs-px-4">
        <div class="dvs-flex dvs-items-center dvs-w-full">
          <div class="handle dvs-mr-2 dvs-cursor-move dvs-text-admin-fg dvs-opacity-50">
            <menu-icon />
          </div>
          <div
            dusk="slice-label"
            class="dvs-relative dvs-w-full dvs-cursor-pointer dvs-text-admin-fg"
            :class="{'dvs-opacity-75': !sliceHasFieldsOrSlices}"
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
        :slice="slice"
        @close="showCopyToAnotherPage = false"
        v-if="showCopyToAnotherPage"
      ></copy-slice-to-page>
    </portal>

    <manage-slice
      ref="manageslice"
      v-if="manageSlice === true"
      @cancel="manageSlice = false"
      @addSlice="addSlice"
      @editSlice="editSlice"
      @removeSlice="removeSlice"
      :slice="slice"
      :mode="manageSliceMode"
    />

    <div
      class="dvs-collapsed dvs-px-4"
      v-if="sliceOpen"
    >
      <div class="dvs-pt-2 dvs-flex dvs-items-end dvs-flex-wrap">
        <div>
          <div
            class="dvs-opacity-50 hover:dvs-opacity-100 dvs-text-xs dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-rounded dvs-mr-1 dvs-items-center dvs-flex dvs-flex-col dvs-mb-2 dvs-rounded-sm dvs-p-2"
            style="width:50px;"
            :class="{'dvs-cursor-pointer': hasChildSlot, 'dvs-cursor-not-allowed dvs-opacity-50': !hasChildSlot}"
            @click="requestInsertSlice()"
          >
            <add-icon
              w="25"
              h="25"
            />
            <div class="dvs-text-xs dvs-text-center dvs-leading-none dvs-pt-2">Slice</div>
          </div>
        </div>

        <div>
          <div
            class="dvs-opacity-50 hover:dvs-opacity-100 dvs-text-xs dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-rounded dvs-mr-1 dvs-cursor-pointer dvs-items-center dvs-flex dvs-flex-col dvs-mb-2 dvs-rounded-sm dvs-p-2"
            style="width:50px;"
            @click="jumpToSlice()"
          >
            <locate-icon
              w="25"
              h="25"
            />
            <div class="dvs-text-xs dvs-text-center dvs-leading-none dvs-pt-2">Find</div>
          </div>
        </div>

        <div>
          <div
            class="dvs-opacity-50 hover:dvs-opacity-100 dvs-text-xs dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-rounded dvs-cursor-pointer dvs-mr-1 dvs-items-center dvs-flex dvs-flex-col dvs-mb-2 dvs-rounded-sm dvs-p-2"
            style="width:50px;"
            @click="copySlice(slice, false)"
          >
            <copy-icon
              w="25"
              h="25"
            />
            <div class="dvs-text-xs dvs-text-center dvs-leading-none dvs-pt-2">Duplicate</div>
          </div>
        </div>

        <div>
          <div
            class="dvs-opacity-50 hover:dvs-opacity-100 dvs-text-xs dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-rounded dvs-cursor-pointer dvs-mr-1 dvs-items-center dvs-flex dvs-flex-col dvs-mb-2 dvs-rounded-sm dvs-p-2"
            style="width:50px;"
            @click="sliceSettings()"
          >
            <cog-icon
              w="25"
              h="25"
            />
            <div class="dvs-text-xs dvs-text-center dvs-leading-none dvs-pt-2">Settings</div>
          </div>
        </div>

        <div>
          <div
            class="dvs-opacity-50 hover:dvs-opacity-100 dvs-text-xs dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-rounded dvs-cursor-pointer dvs-mr-1 dvs-items-center dvs-flex dvs-flex-col dvs-mb-2 dvs-rounded-sm dvs-p-2"
            style="width:50px;"
            @click="requestEditSlice()"
          >
            <create-icon
              w="25"
              h="25"
            />
            <div class="dvs-text-xs dvs-text-center dvs-leading-none dvs-pt-2">Edit</div>
          </div>
        </div>

        <div>
          <div
            class="dvs-opacity-50 hover:dvs-opacity-100 dvs-text-xs dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-rounded dvs-cursor-pointer dvs-mr-1 dvs-items-center dvs-flex dvs-flex-col dvs-mb-2 dvs-rounded-sm dvs-p-2"
            style="width:50px;"
            @click="removeSlice()"
          >
            <remove-icon
              w="25"
              h="25"
            />
            <div class="dvs-text-xs dvs-text-center dvs-leading-none dvs-pt-2">Remove</div>
          </div>
        </div>

        <div v-if="!child">
          <div
            class="dvs-opacity-50 hover:dvs-opacity-100 dvs-text-xs dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-rounded dvs-cursor-pointer dvs-mr-1 dvs-items-center dvs-flex dvs-flex-col dvs-mb-2 dvs-rounded-sm dvs-p-2"
            style="width:50px;"
            @click="requestCopyToAnotherPage()"
          >
            <copy-icon
              w="25"
              h="25"
            />
            <div class="dvs-text-xs dvs-text-center dvs-leading-none dvs-pt-2">Copy</div>
          </div>
        </div>
      </div>

      <slice-editor-fields
        v-if="slice.metadata.type !== 'model'"
        :the-fields="sliceConfig(slice).fields"
        v-model="theFields"
        @editfield="editField"
      />
    </div>

    <div class="dvs-collapsed dvs-px-6 dvs-text-sm">
      <help v-if="slice.metadata.type === 'model'">Be aware that these entries are model entries. That means they are managed in your database by another tool or by an admin section in your adminitration.</help>
    </div>
    <div
      class="dvs-collapsed dvs-px-4 dvs-pl-10"
      v-if="hasChildSlot"
      :style="{
          minHeight: '15px'
        }"
    >
      <draggable
        v-model="slice.slices"
        tag="ul"
        class="dvs-list-reset dvs-bg-admin-secondary-bg dvs-rounded-lg dvs-py-1 dvs-pt-3 dvs-mt-1 dvs-mb-6"
        v-if="slice.metadata.type !== 'model'"
        v-bind="{
          handle: '.handle', 
          filter: '.dvs-instructions',
          group: {name: 'g1'},
          animation:200,
          ghostClass: 'dvs-ghost',
        }"
      >
        <div
          class="dvs-p-4 dvs-text-xs dvs-leading-normal dvs-instructions"
          v-if="sliceSlices.length < 1"
        >
          You can add child slices by dragging them here or by using the dot menu on the right and selecting "Insert Slice"
        </div>
        <template v-for="s in sliceSlices">
          <slice-editor
            :key="randomString(8)"
            :devise="s"
            :child="true"
            @addSlice="addSlice"
            @editSlice="editSlice"
            @removeSlice="removeSlice"
            @copySlice="copySlice"
          />
        </template>
      </draggable>
    </div>
  </li>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Strings from '../../../mixins/Strings';

export default {
  name: 'SliceEditor',
  data () {
    return {
      showDropZone: false,
      manageSlice: false,
      manageSliceMode: 'inserting',
      pageSlices: [],
      sliceOpen: false,
      showCopyToAnotherPage: false,
    };
  },
  mounted () {
    if (this.slice.slices) {
      this.pageSlices = this.slice.slices;
    }
  },
  methods: {
    toggleSlice () {
      this.sliceOpen = !this.sliceOpen;
    },
    toggleSliceTools () {
      this.slice.metadata.tools = !this.slice.metadata.tools;
    },

    // Marking Slice
    markSlice (on) {
      window.window.deviseSettings.$bus.$emit('markSlice', this.devise, on);
    },
    jumpToSlice () {
      window.window.deviseSettings.$bus.$emit('jumpToSlice', this.slice);
    },
    sliceSettings () {
      window.window.deviseSettings.$bus.$emit('openSliceSettings', this.slice);
    },

    // Adding, Editing and Removing Slices
    requestInsertSlice () {
      if (this.hasChildSlot) {
        this.manageSliceMode = 'inserting';
        this.manageSlice = true;
      }
    },
    addSlice (slice, referringSlice) {
      if (typeof referringSlice === 'undefined') {
        referringSlice = this.slice;
      }
      this.$emit('addSlice', slice, referringSlice);
      this.manageSlice = false;
    },
    requestEditSlice () {
      this.manageSliceMode = 'editing';
      this.manageSlice = true;
      this.$nextTick(() => {
        if (this.$refs.manageslice) {
          this.$refs.manageslice.action = 'edit';
        }
      });
    },
    editSlice (slice, referringSlice) {
      if (typeof referringSlice === 'undefined') {
        referringSlice = this.slice;
      }
      this.$emit('editSlice', slice, referringSlice);
      this.manageSlice = false;
    },
    copySlice (slice, referringSlice) {
      if (referringSlice === null) {
        referringSlice = Object.assign({}, this.slice);
      }

      if (referringSlice === false) {
        referringSlice = null;
      }

      this.$emit('copySlice', slice, referringSlice);
    },
    removeSlice (slice, referringSlice) {
      if (typeof slice === 'undefined') {
        slice = this.slice; // eslint-disable-line
      } else if (typeof referringSlice === 'undefined') {
        referringSlice = this.slice;
      }
      this.$emit('removeSlice', slice, referringSlice);
      this.manageSlice = false;
    },
    requestCopyToAnotherPage () {
      this.showCopyToAnotherPage = true
    },
    editField (payload) {
      const { key, field, value } = payload
      // Update the slice field
      this.slice[key] = Object.assign({}, value);

      // Send out the notification
      window.deviseSettings.$bus.$emit('devise-field-edited', { field, value });
    },
  },
  computed: {
    ...mapGetters('devise', ['component', 'fieldConfig', 'sliceConfig']),
    ...mapState('devise', ['devMode']),
    slice () {
      return this.devise;
    },
    sliceSlices () {
      return (this.slice.slices) ? this.slice.slices : []
    },
    theFields () {
      const fields = {};
      for (const potentialField in this.slice) {
        if (
          this.slice.hasOwnProperty(potentialField) &&
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
    sliceHasFieldsOrSlices () {
      let count = Object.keys(this.theFields).length;
      if (this.slice.slices) {
        count += this.slice.slices.length;
      }

      return count > 0;
    },
    hasChildSlot () {
      const component = this.component(this.slice.metadata.name);

      if (component.has_child_slot) {
        return true;
      }

      return false;
    },
    editorLabel () {
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
        devMode = `<div class="dvs-text-sm dvs-uppercase dvs-opacity-75">Instance Id: ${
          this.slice.metadata.instance_id
          }</div>`;
      }

      for (const field in this.theFields) {
        if (this.theFields.hasOwnProperty(field)) {
          const f = this.theFields[field];

          if (f.editorLabel && f[acceptedFieldTypes[f.type]]) {
            let label = f[acceptedFieldTypes[f.type]];

            if (f.type === 'image') {
              label = `<div class="dvs-rounded dvs-bg-cover" style="background-image: url('${label}'); height:100px; width:200px;"></div>`;
            } else {
              label = `${label.toLowerCase()}`;
            }

            if (label) {
              return `${devMode}<div class="dvs-text-xs dvs-opacity-25 dvs-uppercase dvs-leading-tight">${
                this.slice.metadata.label
                }</div>
                <div class="dvs-capitalize">${label}</div>`;
            }
          }
        }
      }
      return `${devMode}<div class="dvs-capitalize">${
        this.slice.metadata.label
        }</div>`;
    },
  },
  props: {
    child: {
      default: false,
    },
  },
  mixins: [Strings],
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
    ManageSlice: () => import(/* webpackChunkName: "devise-editors" */ './ManageSlice'),
    MenuIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/MenuIcon'),
    RemoveIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/TrashIcon'),
    SliceEditor: () => import(/* webpackChunkName: "devise-editors" */ './SliceEditor'),
    SliceEditorFields: () => import(/* webpackChunkName: "devise-editors" */ './SliceEditorFields'),
    CopySliceToPage: () => import(/* webpackChunkName: "devise-editors" */ './CopySliceToPage'),
  },
};
</script>
