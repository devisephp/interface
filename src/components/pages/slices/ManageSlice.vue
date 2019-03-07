<template>
  <div>
    <portal to="devise-root">
      <div class="dvs-fixed dvs-pin dvs-flex dvs-justify-center dvs-items-center">
        <div
          class="dvs-blocker"
          @click="cancelManageSlice"
        ></div>
        <panel
          class="dvs-w-4/5 dvs-relative dvs-z-40 "
          :panel-style="theme.panel"
        >
          <div class="dvs-p-8">
            <!-- Choose the type of the slice -->
            <h3
              class="dvs-mb-8 dvs-uppercase"
              v-if="insertSlice.type === null"
              :style="{color: theme.panel.color}"
            >Choose Type of New Slice</h3>
            <transition name="dvs-fade">
              <!-- Choose the type of the slice -->
              <div
                class="dvs-flex dvs-justify-between dvs-items-stretch"
                v-if="insertSlice.type === null"
              >
                <div
                  class="dvs-btn dvs-text-base dvs-mr-4 dvs-p-8 dvs-w-1/2"
                  :style="theme.actionButtonGhost"
                  @click="insertSlice.type = 'single'"
                >
                  <h4
                    class="dvs-border-b dvs-pb-2 dvs-mb-6 dvs-mx-8"
                    :style="{borderColor: theme.actionButtonGhost.color, color: theme.actionButtonGhost.color}"
                  >Single Slice</h4>

                  <p class="dvs-normal-case dvs-font-normal">A single slice-type is just one instance of the slice you're choosing to insert</p>
                </div>

                <div
                  class="dvs-btn dvs-text-base dvs-ml-4 dvs-p-8 dvs-w-1/2"
                  :style="theme.actionButtonGhost"
                  @click="insertSlice.type = 'model'"
                >
                  <h4
                    class="dvs-border-b dvs-pb-2 dvs-mb-6 dvs-mx-8"
                    :style="{borderColor: theme.actionButtonGhost.color, color: theme.actionButtonGhost.color}"
                  >Repeats from Database</h4>
                  <p class="dvs-normal-case dvs-font-normal">Slices will repeat on the page based data you define in the next steps.</p>
                </div>
              </div>

              <!-- Slice Selector -->
              <div v-else>
                <fieldset class="dvs-fieldset dvs-mb-4">
                  <slice-selector v-model="insertSlice.slice" />
                </fieldset>

                <div
                  class="dvs-mb-4"
                  v-if="insertSlice.type === 'model'"
                >
                  <query-builder v-model="insertSlice.data"></query-builder>
                </div>

                <div
                  class="dvs-absolute dvs-z-10 dvs-pin-b dvs-pin-l dvs-pin-r dvs-p-4 dvs-px-6"
                  :style="theme.panelCard"
                >
                  <button
                    class="dvs-btn dvs-mr-2"
                    :style="theme.actionButton"
                    @click="addSlice"
                  >Insert</button>
                  <button
                    class="dvs-btn"
                    :style="theme.actionButtonGhost"
                    @click="cancelManageSlice"
                  >Cancel</button>
                </div>
              </div>
            </transition>
          </div>
        </panel>
      </div>
    </portal>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SlicesMixin from '../../../mixins/Slices';

const defaultInsertSlice = {
  type: null,
  slice: null,
  data: {
    name: 'modelData',
    model: null,
    modelQuery: null,
  },
};

export default {
  data () {
    return {
      insertSlice: Object.assign({}, defaultInsertSlice),
    };
  },
  mounted () {
    this.getSlicesDirectories();

    this.$nextTick(() => {
      // If slice is set it's an edit
      if (this.slice) {
        this.insertSlice.type = this.slice.metadata.type;
      }
    });
  },
  methods: {
    ...mapActions('devise', ['getSlicesDirectories', 'getModelSettings']),
    cancelManageSlice () {
      this.$set(this, 'insertSlice', defaultInsertSlice);
      this.$emit('cancel');
    },
    buildSlice () {
      const component = this.componentFromView(this.insertSlice.slice.value);
      const finalSlice = {
        settings: {
          enabled: true,
        },
        metadata: {
          instance_id: 0,
          label: this.insertSlice.slice.name,
          model_query: this.insertSlice.data.modelQuery
            ? `class=${this.insertSlice.data.modelQuery}`
            : null,
          name: component.name,
          type: this.insertSlice.type,
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
  },
  props: {
    slice: {
      type: Object | String /* eslint-disable-line */,
    },
  },
  components: {
    Panel: () => import(/* webpackChunkName: "devise-utilities" */ '../../utilities/Panel.vue'),
    QueryBuilder: () =>
      import(/* webpackChunkName: "devise-utilities" */ '../../utilities/QueryBuilder.vue'),
    SliceSelector: () => import(/* webpackChunkName: "devise-slices" */ './SliceSelector.vue'),
  },
  mixins: [SlicesMixin],
};
</script>
