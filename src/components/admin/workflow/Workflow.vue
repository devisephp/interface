<template>
  <admin-container v-if="currentStep">
    <template v-slot:message>
      <div class="flex items-center">
        <div
          class="dvs-cursor-pointer dvs-flex dvs-flex-col dvs-items-center"
          @click="back"
        >
          <arrow-left-circle-icon class="mb-1"></arrow-left-circle-icon>
          <span class="dvs-text-2xs dvs-uppercase">Back</span>
        </div>
        <div
          v-html="
            currentStep.message"
          class="dvs-px-8"
        >
        </div>
      </div>
    </template>
    <template v-slot:content>
      <transition
        name="dvs-fade"
        mode="out-in"
      >
        <component
          :is="currentStep.component"
          :step="currentStep"
          :values="values"
          @done="done"
          @cancel="cancel"
        ></component>
      </transition>
    </template>
  </admin-container>
</template>

<script>
export default {
  name: 'DeviseWorkflow',
  components: {
    AdminContainer: () =>
      import(/* webpackChunkName: "devise-administration" */ '../ui/AdminContainer'),
    ArrowLeftCircleIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/ArrowLeftCircleIcon'),
    WorkflowMenu: () =>
      import(/* webpackChunkName: "devise-administration" */ './WorkflowMenu'),
    WorkflowSearch: () =>
      import(/* webpackChunkName: "devise-administration" */ './WorkflowSearch'),
  },
  props: {
    workflow: {
      type: Array,
      required: true
    }
  },
  computed: {
    index () {
      return this.workflow.find((step) => {
        return step.index
      })
    },
    currentStep () {
      return this.workflowStack.slice(-1)[0]
    },
    values () {
      let values = {};
      this.workflowStack.forEach(step => {
        values = Object.assign(values, step.value)
      })
      return values
    }
  },
  data () {
    return {
      workflowStack: []
    }
  },
  mounted () {
    if (this.$route.params && this.$route.params.workflowKey) {
      this.jumpToStep(this.$route.params.workflowKey)
    } else if (this.index) {
      this.workflowStack.push(this.index);
    }
  },
  methods: {
    done (data) {
      this.workflowStack[this.workflowStack.length - 1].value = data;
      this.loadStep()
    },
    cancel () {
      this.clearStack()
    },
    back () {
      if (this.workflowStack.length > 1) {
        this.workflowStack.splice(-1, 1)
        delete this.currentStep.value
      } else {
        this.$router.go(-1);
      }
    },
    jumpToStep (jumpToStep) {
      const stepToLoad = this.workflow.find((s) => {
        return s.key === jumpToStep
      })
      this.$set(stepToLoad, 'jumpedTo', true)
      this.$set(stepToLoad, 'jumpedToParams', this.$route.params)
      this.workflowStack.push(stepToLoad);
    },
    loadStep () {
      let stepToLoad = null

      if (this.currentStep.end || this.currentStep.value.end) {
        this.clearStack();
        return;
      }

      const lastStep = this.workflowStack[this.workflowStack.length - 2]
      const { nextStep } = typeof this.currentStep.nextStep !== 'undefined' ? this.currentStep : this.currentStep.value;

      // If a next step
      if (nextStep) {
        stepToLoad = this.workflow.find((s) => {
          return s.key === nextStep
        })
      } else if (lastStep && lastStep.value.stepAfterNext) {
        stepToLoad = this.workflow.find((s) => {
          return s.key === lastStep.value.stepAfterNext
        })
      }

      if (stepToLoad) {
        this.workflowStack.push(Object.assign({}, stepToLoad));
        window.deviseSettings.$bus.$emit('dvs-admin-container-content-changed')
      } else {
        // eslint-disable-next-line no-console
        console.warn(`There is no step registered as ${nextStep}`);
      }
    },
    clearStack () {
      this.workflowStack = [this.index];
      window.deviseSettings.$bus.$emit('dvs-admin-container-content-changed');
    }
  }
}
</script>