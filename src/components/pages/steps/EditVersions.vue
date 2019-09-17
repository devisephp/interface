<template>
  <form @submit.prevent="">
    <div class="dvs-mb-8">
      <help>Page versions allow your team to create alternate versions of a page for devlopment, historical purposes, and for A/B testing which allow you to run two pages at once to test user success rates</help>
    </div>

    <div class="dvs-flex dvs-justify-around dvs-flex-wrap">
      <div
        v-for="(version, key) in localValue.versions"
        :key="key"
        class="dvs-rounded dvs-shadow-lg dvs-mb-4 dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-w-2/5"
      >
        <div
          class="dvs-text-admin-highlight-fg dvs-bg-admin-highlight-bg dvs-text-sm dvs-uppercase dvs-p-2 dvs-font-bold dvs-text-center"
          v-if="version.is_live"
        >(Currently Live)</div>
        <div class=" dvs-p-6">
          <div class="dvs-text-base dvs-font-bold dvs-mb-4 dvs-flex dvs-justify-between">
            {{ version.name }}
          </div>
          <div>
            <div>
              <fieldset class="dvs-fieldset dvs-mb-4">
                <label>Version Name</label>
                <input
                  type="text"
                  v-model="localValue.versions[key].name"
                  class="dvs-w-full"
                >
              </fieldset>

              <fieldset class="dvs-fieldset dvs-mb-4">
                <label>Layout</label>
                <select
                  v-model="localValue.versions[key].layout"
                  class="dvs-w-full"
                >
                  <option
                    :value="layout"
                    v-for="(layout, layoutName) in layouts"
                    :key="layout"
                  >{{ layoutName }}</option>
                </select>
              </fieldset>

              <fieldset class="dvs-fieldset dvs-mb-4">
                <label>Start Date</label>
                <date-picker
                  v-model="localValue.versions[key].starts_at"
                  :settings="{date: true, time: true}"
                  placeholder="Start Date"
                  title="The date in which this version will begin appearing."
                />
              </fieldset>

              <fieldset class="dvs-fieldset dvs-mb-4">
                <label>End Date</label>
                <date-picker
                  v-model="localValue.versions[key].ends_at"
                  :settings="{date: true, time: true}"
                  placeholder="End Date"
                  title="The date when this page version will stop appearing. This page will either fall back to another page version or produce a 404: Page Not Found if a user attempts to load it."
                />
              </fieldset>

              <fieldset
                class="dvs-fieldset dvs-mb-8"
                v-if="localValue.ab_testing_enabled"
              >
                <label>A/B Testing Amount</label>
                <input
                  type="number"
                  v-model.number="localValue.versions[key].ab_testing_amount"
                  title="This is the weight in which a page will show up. The number can be any number you want and is divided by the total weights of all other page versions."
                >
              </fieldset>
            </div>

            <div class="dvs-flex dvs-flex-wrap">
              <button
                class="dvs-btn dvs-btn-primary dvs-text-sm dvs-px-4 dvs-mr-2"
                @click="requestSaveVersion(version)"
                title="Save Version Settings"
              >
                <checkmark-icon
                  w="30"
                  h="30"
                />
              </button>
              <button
                class="dvs-btn dvs-bg-admin-bg dvs-text-admin-fg dvs-text-sm dvs-px-4 dvs-mr-2"
                @click="requestCopyVersion(version)"
                title="Copy Version"
              >
                <copy-icon
                  w="30"
                  h="30"
                />
              </button>
              <button
                class="dvs-btn dvs-bg-admin-bg dvs-text-admin-fg dvs-text-sm dvs-px-4"
                v-devise-alert-confirm="{callback: requestDeleteVersion, arguments:version, message: 'Are you sure you want to delete this version?'}"
                title="Delete Version"
              >
                <trash-icon
                  w="30"
                  h="30"
                />
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
    Help: () => import(
      // eslint-disable-next-line max-len
      /* webpackChunkName: "devise-utilities" */ '../../utilities/Help.vue'),
  },
  computed: {
    layouts () {
      return window.deviseSettings.$config.layouts;
    },
  },
  props: {
    values: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      localValue: {},
      showPassword: false,
    };
  },
  mounted () {
    this.localValue = { ...this.values }
  },
  methods: {
    ...mapActions('devise', ['updatePageVersion', 'copyPageVersion', 'deletePageVersion']),
    requestSaveVersion (version) {
      this.updatePageVersion({ page: this.localValue, version })
    },
    requestCopyVersion (version) {
      this.copyPageVersion({ page: this.localValue, version });
    },
    requestDeleteVersion (version) {
      this.deletePageVersion({ page: this.localValue, version });
    },
    done () {
      this.$emit('done')
    }
  }
};
</script>
