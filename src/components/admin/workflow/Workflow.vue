<template>
  <admin-container v-if="currentStep">
    <template v-slot:message>
      <div class="flex">
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
    WorkflowMenu: () =>
      import(/* webpackChunkName: "devise-administration" */ './WorkflowMenu'),
    ArrowLeftCircleIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/ArrowLeftCircleIcon'),
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
    }
  },
  data () {
    return {
      workflowStack: []
    }
  },
  mounted () {
    if (this.index) {
      this.workflowStack.push(this.index);
    }
  },
  methods: {
    done (data) {
      if (data && data.stepKey) {
        this.loadStep(data.stepKey)
      } else {
        this.clearStack()
      }
    },
    cancel () {
      this.clearStack()
    },
    back () {
      if (this.workflowStack.length > 1) {
        this.workflowStack.splice(-1, 1)
      } else {
        this.$router.go(-1);
      }
    },
    loadStep (stepKey) {
      const nextStep = this.workflow.find((step) => {
        return step.key === stepKey
      })
      if (nextStep) {
        this.workflowStack.push(nextStep);
      } else {
        console.warn(`There is no step registered as ${stepKey}`)
      }
    },
    clearStack () {
      this.workflowStack = [this.index];
    }
  }
}
</script>