<template>
  <div v-if="value">
    <template v-if="adding">
      <div class="dvs-flex">
        <fieldset class="dvs-fieldset dvs-mb-4 dvs-mr-4">
          <label>Attribute Name</label>
          <input
            v-model="newMeta.attribute_name"
            type="text"
          >
        </fieldset>

        <fieldset class="dvs-fieldset dvs-mb-4 dvs-mr-4">
          <label>Attribute Value</label>
          <input
            v-model="newMeta.attribute_value"
            type="text"
          >
        </fieldset>

        <fieldset class="dvs-fieldset dvs-mb-4">
          <label>Content</label>
          <input
            v-model="newMeta.content"
            type="text"
          >
        </fieldset>
      </div>

      <div class="dvs-mb-2">
        <help v-if="anyNewMetaPopulated">&lt;meta {{ newMeta.attribute_name }}="{{ newMeta.attribute_value }}" content="{{ newMeta.content }}"&gt;</help>
      </div>

      <button
        class="dvs-btn dvs-btn-primary dvs-text-xs dvs-mb-11"
        :disabled="isInvalid"
        @click="requestCreateMeta"
      >Add New Meta</button>
    </template>

    <help
      v-if="value.length == 0 && !adding"
      :subtle="true"
      class="dvs-mb-8"
    >
      <p>You currently do not have any meta tags at this time.</p>

      <button
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
        <div class="dvs-font-mono dvs-p-4 leading-loose dvs-text-sm dvs-bg-admin-fg dvs-text-admin-bg dvs-rounded dvs-shadow dvs-flex-grow">
          <template>&lt;meta {{ meta.attribute_name }}="{{ meta.attribute_value }}" content="{{ meta.content }}"&gt;</template>
        </div>

        <div class="dvs-flex dvs-justify-between dvs-items-center">
          <div class="dvs-flex">
            <button
              v-devise-alert-confirm="{callback: requestDeleteMeta, arguments:meta, message: 'Are you sure you want to delete this meta?'}"
              class="dvs-btn dvs-btn-xs dvs-ml-4 dvs-btn-ghost dvs-text-admin-fg"
            >
              <trash-icon
                w="20"
                h="20"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <button
      v-if="!adding"
      class="dvs-btn dvs-btn-primary dvs-text-xs"
      @click="adding=true"
    >Add New Meta Tag</button>
  </div>
</template>

<script>
export default {
  name: 'MetaForm',
  components: {
    TrashIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/TrashIcon'),
    Help: () => import(
      // eslint-disable-next-line max-len
      /* webpackChunkName: "devise-utilities" */ '../utilities/Help.vue'),
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    globalForm: {
      type: Boolean,
      default: true,
    },
  },
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
  mounted () {
    this.newMeta.site_id = window.deviseSettings.$page.site_id;
  },
  methods: {
    requestCreateMeta () {
      this.$emit('request-create-meta', this.newMeta);
      this.newMeta = Object.assign({}, this.newMeta);
    },
    requestDeleteMeta (meta) {
      this.$emit('request-delete-meta', meta);
    },
  },
};
</script>
