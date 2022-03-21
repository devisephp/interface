<template>
  <form @submit.prevent="">
    <div class="dvs-mb-8">
      <help
        >Page versions allow your team to create alternate versions of a page for devlopment,
        historical purposes, and for A/B testing which allow you to run two pages at once to test
        user success rates</help
      >
    </div>

    <div class="dvs-flex dvs-justify-around dvs-flex-wrap">
      <div
        v-for="(version, key) in localValue.versions"
        :key="key"
        class="dvs-rounded dvs-shadow-lg dvs-mb-4 dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-w-2/5"
      >
        <div
          v-if="version.is_live"
          class="dvs-text-admin-highlight-fg dvs-bg-admin-highlight-bg dvs-text-sm dvs-uppercase dvs-p-2 dvs-font-bold dvs-text-center"
        >
          (Currently Live)
        </div>
        <div class="dvs-p-6">
          <div class="dvs-text-base dvs-font-bold dvs-mb-4 dvs-flex dvs-justify-between">
            {{ version.name }}
          </div>
          <div>
            <div>
              <fieldset class="dvs-fieldset dvs-mb-4">
                <label>Version Name</label>
                <input v-model="localValue.versions[key].name" type="text" class="dvs-w-full" />
              </fieldset>

              <fieldset class="dvs-fieldset dvs-mb-4">
                <label>Layout</label>
                <select v-model="localValue.versions[key].layout" class="dvs-w-full">
                  <option v-for="(layout, layoutName) in layouts" :key="layout" :value="layout">
                    {{ layoutName }}
                  </option>
                </select>
              </fieldset>

              <fieldset class="dvs-fieldset dvs-mb-4">
                <label>Start Date</label>
                <date-picker
                  v-model="localValue.versions[key].starts_at"
                  :settings="{ date: true, time: true }"
                  placeholder="Start Date"
                  title="The date in which this version will begin appearing."
                />
              </fieldset>

              <fieldset class="dvs-fieldset dvs-mb-4">
                <label>End Date</label>
                <date-picker
                  v-model="localValue.versions[key].ends_at"
                  :settings="{ date: true, time: true }"
                  placeholder="End Date"
                  title="The date when this page version will stop appearing. This page will either fall back to another page version or produce a 404: Page Not Found if a user attempts to load it."
                />
              </fieldset>

              <fieldset v-if="localValue.ab_testing_enabled" class="dvs-fieldset dvs-mb-8">
                <label>A/B Testing Amount</label>
                <input
                  v-model.number="localValue.versions[key].ab_testing_amount"
                  type="number"
                  title="This is the weight in which a page will show up. The number can be any number you want and is divided by the total weights of all other page versions."
                />
              </fieldset>
            </div>

            <div class="dvs-flex dvs-flex-wrap">
              <button
                class="dvs-btn dvs-btn-primary dvs-text-sm dvs-px-4 dvs-mr-2"
                title="Save Version Settings"
                @click="requestSaveVersion(version)"
              >
                <checkmark-icon w="30" h="30" />
              </button>
              <button
                class="dvs-btn dvs-bg-gray-800 dvs-text-gray-200 dvs-text-sm dvs-px-4 dvs-mr-2"
                title="Copy Version"
                @click="requestCopyVersion(version)"
              >
                <copy-icon w="30" h="30" />
              </button>
              <button
                v-devise-alert-confirm="{
                  callback: requestDeleteVersion,
                  arguments: version,
                  message: 'Are you sure you want to delete this version?',
                }"
                class="dvs-btn dvs-bg-gray-800 dvs-text-gray-200 dvs-text-sm dvs-px-4"
                title="Delete Version"
              >
                <trash-icon w="30" h="30" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'DevisePagesEditSettings',
  components: {
    DatePicker: () =>
      import(/* webpackChunkName: "devise-utilities" */ '../../utilities/DatePicker'),
    TrashIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/TrashIcon'),
    CopyIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/CopyIcon'),
    CheckmarkIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/CheckIcon'),
    Help: () =>
      import(
        // eslint-disable-next-line max-len
        /* webpackChunkName: "devise-utilities" */ '../../utilities/Help.vue'
      ),
  },
  props: {
    values: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localValue: {},
      showPassword: false,
    };
  },
  computed: {
    layouts() {
      return window.deviseSettings.$config.layouts;
    },
  },
  mounted() {
    this.localValue = { ...this.values };
  },
  methods: {
    ...mapActions('devise', ['updatePageVersion', 'copyPageVersion', 'deletePageVersion']),
    requestSaveVersion(version) {
      this.updatePageVersion({ page: this.localValue, version });
    },
    requestCopyVersion(version) {
      this.copyPageVersion({ page: this.localValue, version });
    },
    requestDeleteVersion(version) {
      this.deletePageVersion({ page: this.localValue, version });
    },
    done() {
      this.$emit('done');
    },
  },
};
</script>
