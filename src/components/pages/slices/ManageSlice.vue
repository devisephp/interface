<template>
  <div>
    <portal to="devise-root">
      <div class="dvs-fixed dvs-pin dvs-flex dvs-justify-center dvs-items-center dvs-z-40">
        <div
          class="dvs-blocker"
          @click="cancelManageSlice"
        ></div>
      </div>

      <div class="relative dvs-z-50 dvs-pt-6">
        <admin-container>
          <template v-slot:message>
            Adding new slices builds up your page. Below you will need to decide what type of slice you are adding.
          </template>
          <template v-slot:content>

            <div class="dvs-w-full dvs-relative dvs-z-40 ">
              <div class="dvs-p-8">
                <transition name="dvs-fade">
                  <!-- Choose the type of the slice -->
                  <div
                    class="dvs-flex dvs-justify-between dvs-items-stretch dvs-w-full"
                    v-if="newSlice.type === null"
                  >
                    <div
                      class="dvs-btn dvs-btn-secondary dvs-text-base dvs-mr-4 dvs-p-8 dvs-w-1/2 dvs-shadow-lg"
                      @click="newSlice.type = 'single'"
                    >
                      <div class="dvs-pb-2">Static Slice</div>
                      <div class="dvs-text-4xl dvs-mb-4">
                        <file-text-icon></file-text-icon>
                      </div>
                      <p class="dvs-normal-case dvs-text-sm dvs-font-normal">A static slice contains information that content managers enter and is presented on the site. The content does not change until a content manager chooses to edit.</p>
                    </div>

                    <div
                      v-if="modelQueries.length > 0"
                      class="dvs-btn dvs-text-base dvs-ml-4 dvs-p-8 dvs-w-1/2"
                      @click="newSlice.type = 'model'"
                    >
                      <div class="dvs-pb-2">Dynamic Slice</div>
                      <div class="dvs-text-4xl dvs-mb-4">
                        <database-icon></database-icon>
                      </div>
                      <p class="dvs-normal-case dvs-text-sm dvs-font-normal">Slices will repeat on the page based data you define in the next steps.</p>
                    </div>
                  </div>

                  <!-- Slice Selector -->
                  <div v-else>
                    <div v-if="step === 1">
                      <div class="dvs-mb-16">
                        <slice-selector v-model="newSlice.slice" />
                      </div>
                    </div>

                    <div v-if="step === 2">
                      <div class="dvs-mb-16">
                        <query-selector v-model="modelQuery" />
                      </div>
                    </div>

                    <div class="dvs-fixed dvs-text-xs dvs-z-10 dvs-pin-b dvs-pin-l dvs-p-6 dvs-m-4 dvs-bg-admin-bg dvs-text-admin-fg dvs-rounded dvs-px-6">
                      <button
                        class="dvs-btn dvs-btn-primary dvs-mr-2"
                        @click="addSlice"
                        v-if="mode === 'inserting' && newSlice.type !== 'model'"
                      >Insert</button>
                      <button
                        class="dvs-btn dvs-btn-primary dvs-mr-2"
                        @click="nextStep"
                        v-else-if="mode === 'inserting' && newSlice.type === 'model' && step === 1"
                      >Next</button>
                      <button
                        class="dvs-btn dvs-btn-primary dvs-mr-2"
                        @click="addSlice"
                        v-else-if="mode === 'inserting' && newSlice.type === 'model' && step === 2"
                      >Insert Model Slice</button>
                      <button
                        class="dvs-btn dvs-btn-primary dvs-mr-2"
                        @click="editSlice"
                        v-else
                      >Replace</button>
                      <button
                        class="dvs-btn dvs-btn-secondary"
                        @click="cancelManageSlice"
                      >Cancel</button>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </template>
        </admin-container>
      </div>
    </portal>

  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import SlicesMixin from '../../../mixins/Slices';

const defaultInsertSlice = {
  type: null,
  slice: null,
  modelQuery: null
};

export default {
  computed: {
    ...mapState('devise', ['modelQueries'])
  },
  data () {
    return {
      newSlice: Object.assign({}, defaultInsertSlice),
      step: 1,
      modelQuery: null
    };
  },
  mounted () {
    this.getModelQueries();
    this.getSlicesDirectories();

    this.$nextTick(() => {
      // If slice is set it's an edit
      if (this.slice) {
        this.newSlice.type = this.slice.metadata.type;
      }
    });
  },
  methods: {
    ...mapActions('devise', ['getModelQueries', 'getSlicesDirectories', 'getModelSettings']),
    cancelManageSlice () {
      this.$set(this, 'newSlice', defaultInsertSlice);
      this.$emit('cancel');
    },
    buildSlice () {
      const component = this.componentFromView(this.newSlice.slice.value);
      const finalSlice = {
        settings: {
          enabled: true,
        },
        metadata: {
          instance_id: 0,
          label: this.newSlice.slice.name,
          model_query: this.modelQuery,
          name: component.name,
          type: this.newSlice.type,
          view: component.view,
          has_child_slot: component.has_child_slot,
        },
      };

      for (const field in component.fields) {
        if (component.fields.hasOwnProperty(field)) {
          const defaults = component.fields[field].default;
          finalSlice[field] = {};
          this.addMissingProperty(finalSlice, field);
          this.setDefaults(finalSlice, field, defaults);
        }
      }
      return Object.assign({}, finalSlice);
    },
    addMissingProperty (slice, field) {
      // We just add all the properties because.... why not?
      this.$set(slice, field, {
        text: null,
        url: null,
        target: null,
        color: null,
        checked: null,
        enabled: null,
      });
    },
    setDefaults (slice, field, defaults) {
      // loop through the defaults and apply them to the field
      for (const d in defaults) {
        if (defaults.hasOwnProperty(d)) {
          this.$set(slice[field], d, defaults[d]);
        }
      }
    },
    nextStep () {
      this.step += 1;
    },
    addSlice () {
      this.$emit('addSlice', this.buildSlice());
    },
    editSlice () {
      this.$emit('editSlice', this.buildSlice());
    },
    removeSlice () {
      this.$emit('removeSlice');
    },
  },
  computed: {
    ...mapGetters('devise', ['componentFromView', 'slicesDirectories']),
    ...mapState('devise', ['modelQueries']),
  },
  props: {
    slice: {
      type: Object | String /* eslint-disable-line */,
    },
    mode: {
      type: String,
      required: true
    }
  },
  components: {
    AdminContainer: () =>
      import(/* webpackChunkName: "devise-administration" */ '../../admin/ui/AdminContainer'),
    QuerySelector: () =>
      import(/* webpackChunkName: "devise-utilities" */ '../../utilities/QuerySelector.vue'),
    SliceSelector: () => import(/* webpackChunkName: "devise-slices" */ './SliceSelector.vue'),
    FileTextIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/FileTextIcon'),
    DatabaseIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/DatabaseIcon'),
  },
  mixins: [SlicesMixin],
};
</script>
