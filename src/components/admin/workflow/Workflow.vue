<template>
  <admin-container v-if="currentStep">
    <template v-slot:message>
      <div class="dvs-flex dvs-justify-center dvs-items-center">
        <div class="dvs-cursor-pointer dvs-flex dvs-flex-col dvs-items-center" @click="back">
          <arrow-left-circle-icon class="mb-1"></arrow-left-circle-icon>
          <span class="dvs-text-2xs dvs-uppercase">Back</span>
        </div>
        <!-- eslint-disable vue/no-v-html -->
        <div class="dvs-px-8" v-html="currentStep.message"></div>
      </div>
    </template>
    <template v-slot:content>
      <transition name="dvs-fade" mode="out-in">
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
    WorkflowIndex: () => import(/* webpackChunkName: "devise-administration" */ './WorkflowIndex'),
    WorkflowRealIndex: () =>
      import(/* webpackChunkName: "devise-administration" */ './WorkflowRealIndex'),
    WorkflowMenu: () => import(/* webpackChunkName: "devise-administration" */ './WorkflowMenu'),
    WorkflowSearch: () =>
      import(/* webpackChunkName: "devise-administration" */ './WorkflowSearch'),
  },
  props: {
    workflow: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      workflowStack: [],
    };
  },
  computed: {
    index() {
      return this.workflow.find(step => {
        return step.index;
      });
    },
    currentStep() {
      return this.workflowStack.slice(-1)[0];
    },
    values() {
      let values = {};
      this.workflowStack.forEach(step => {
        values = Object.assign(values, step.value);
      });
      return values;
    },
  },
  mounted() {
    if (this.$route.params && this.$route.params.workflowKey) {
      this.jumpToStep(this.$route.params.workflowKey);
    } else if (this.index) {
      this.workflowStack.push(this.index);
    }
  },
  methods: {
    done(data) {
      this.workflowStack[this.workflowStack.length - 1].value = data;
      this.loadStep();
    },
    cancel() {
      this.clearStack();
    },
    back() {
      if (this.workflowStack.length > 1) {
        this.workflowStack.splice(-1, 1);
        delete this.currentStep.value;
        window.deviseSettings.$bus.$emit('dvs-admin-container-content-changed');
      } else {
        this.$router.go(-1);
      }
    },
    jumpToStep(jumpToStep) {
      const stepToLoad = this.workflow.find(s => {
        return s.key === jumpToStep;
      });
      this.$set(stepToLoad, 'jumpedTo', true);
      this.$set(stepToLoad, 'jumpedToParams', this.$route.params);
      this.workflowStack.push(stepToLoad);
    },
    loadStep() {
      let stepToLoad = null;

      if (this.currentStep.end || (this.currentStep.value && this.currentStep.value.end)) {
        this.clearStack();
        return;
      }

      const lastStep = this.workflowStack[this.workflowStack.length - 2];
      let nextStep = null;
      if (typeof this.currentStep.nextStep !== 'undefined') {
        nextStep = this.currentStep.nextStep;
      } else if (typeof this.currentStep.value !== 'undefined') {
        nextStep = this.currentStep.value.nextStep;
      }

      // If a next step
      if (nextStep) {
        stepToLoad = this.workflow.find(s => {
          return s.key === nextStep;
        });
      } else if (lastStep && lastStep.value.stepAfterNext) {
        stepToLoad = this.workflow.find(s => {
          return s.key === lastStep.value.stepAfterNext;
        });
      }

      if (stepToLoad) {
        this.workflowStack.push(Object.assign({}, stepToLoad));
        window.deviseSettings.$bus.$emit('dvs-admin-container-content-changed');
      } else {
        // eslint-disable-next-line no-console
        console.warn(`There is no step registered as ${nextStep}`);
      }
    },
    clearStack() {
      this.workflowStack = [this.index];
      window.deviseSettings.$bus.$emit('dvs-admin-container-content-changed');
    },
  },
};
</script>
