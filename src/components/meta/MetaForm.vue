<template>
  <div v-if="value">
    <template v-if="adding">
      <div class="dvs-flex">
        <fieldset class="dvs-fieldset dvs-mb-4 dvs-mr-4">
          <label>Attribute Name</label>
          <input
            type="text"
            v-model="newMeta.attribute_name"
          >
        </fieldset>

        <fieldset class="dvs-fieldset dvs-mb-4 dvs-mr-4">
          <label>Attribute Value</label>
          <input
            type="text"
            v-model="newMeta.attribute_value"
          >
        </fieldset>

        <fieldset class="dvs-fieldset dvs-mb-4">
          <label>Content</label>
          <input
            type="text"
            v-model="newMeta.content"
          >
        </fieldset>
      </div>

      <div class="dvs-mb-4">
        <help v-if="anyNewMetaPopulated">&lt;meta {{ newMeta.attribute_name }}="{{ newMeta.attribute_value }}" content="{{ newMeta.content }}"&gt;</help>
      </div>

      <button
        class="dvs-btn dvs-btn-primary dvs-mb-11"
        :disabled="isInvalid"
        @click="requestCreateMeta"
      >Add New Meta</button>
    </template>

    <help
      v-if="value.length == 0 && !adding"
      :subtle="true"
      class="dvs-mb-8"
    >
      <p>You currently do not have any meta tags at this time.</p><button
        class="dvs-btn dvs-btn-ghost dvs-text-admin-fg dvs-btn-sm"
        @click="adding=true"
      >Add Some Now</button>
    </help>

    <div class="dvs-mb-8 dvs-flex dvs-flex-col">
      <div
        v-for="(meta, key) in value"
        :key="key"
        class="dvs-flex dvs-justify-between dvs-items-center dvs-mb-2"
      >
        <div class="dvs-font-mono dvs-p-4 leading-loose dvs-text-sm dvs-bg-admin-fg dvs-text-admin-bg dvs-rounded dvs-shadow">
          <template v-if="!meta.edit">&lt;meta {{ meta.attribute_name }}="{{ meta.attribute_value }}" content="{{ meta.content }}"&gt;</template>
          <template v-else>
            <fieldset class="dvs-fieldset">
              <div class="dvs-flex dvs-items-center">
                &lt;meta
                <input
                  v-show="meta.edit"
                  type="text"
                  class="dvs-ml-4"
                  v-model="value[key].attribute_name"
                >="
                <input
                  v-show="meta.edit"
                  type="text"
                  v-model="value[key].attribute_value"
                >"
                <span class="dvs-ml-4">content="</span>
                <input
                  v-show="meta.edit"
                  type="text"
                  v-model="value[key].content"
                >"&gt;
              </div>
            </fieldset>
          </template>
        </div>

        <div class="dvs-flex dvs-justify-between dvs-items-center">
          <div
            class="dvs-flex"
            v-if="!meta.edit"
          >
            <button
              class="dvs-btn dvs-btn-xs dvs-ml-4 dvs-btn-ghost dvs-text-admin-fg"
              @click="setEditMode(meta)"
            >
              <edit-icon
                w="20"
                h="20"
              />
            </button>
            <button
              class="dvs-btn dvs-btn-xs dvs-ml-4 dvs-btn-ghost dvs-text-admin-fg"
              v-devise-alert-confirm="{callback: requestDeleteMeta, arguments:meta, message: 'Are you sure you want to delete this meta?'}"
            >
              <trash-icon
                w="20"
                h="20"
              />
            </button>
          </div>
          <button
            class="dvs-btn dvs-mr-2"
            v-if="meta.edit"
            @click="requestUpdateMeta(value[key])"
            :style="theme.actionButton"
          >Save</button>
          <button
            class="dvs-btn"
            v-if="meta.edit"
            @click="setEditMode(meta)"
          >Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MetaForm',
  data () {
    return {
      adding: false,
      newMeta: {
        site_id: 0,
        attribute_name: null,
        attribute_value: null,
        content: null,
      },
    };
  },
  mounted () {
    this.newMeta.site_id = window.deviseSettings.$page.site_id;
  },
  methods: {
    requestCreateMeta () {
      this.$emit('request-create-meta', this.newMeta);
      this.newMeta = Object.assign({}, this.newMeta);
    },
    requestUpdateMeta (meta) {
      this.$emit('request-update-meta', meta);
    },
    requestDeleteMeta (meta) {
      this.$emit('request-delete-meta', meta);
    },
    setEditMode (meta) {
      if (typeof meta.edit === 'undefined') {
        this.$set(meta, 'edit', true);
      } else {
        meta.edit = !meta.edit;
      }
    },
  },
  computed: {
    isInvalid () {
      return (
        this.newMeta.attribute_name === null ||
        this.newMeta.attribute_value === null ||
        this.newMeta.content === null
      );
    },
    anyNewMetaPopulated () {
      return (
        this.newMeta.attribute_name !== null ||
        this.newMeta.attribute_value !== null ||
        this.newMeta.content !== null
      );
    },
  },
  props: {
    value: {},
    globalForm: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    TrashIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/TrashIcon'),
    EditIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/EditIcon'),
  },
};
</script>
