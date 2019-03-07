<template>
  <div class="dvs-fixed dvs-pin dvs-flex dvs-justify-center dvs-items-center">

    <div
      class="dvs-blocker dvs-fixed dvs-pin"
      @click="close"
    ></div>
    <div class="dvs-z-50 dvs-min-w-2/3 dvs-max-h-screen">
      <panel
        class="dvs-w-full"
        :panel-style="theme.panel"
        v-bar
      >
        <div class="dvs-p-8">
          <div
            class="dvs-absolute dvs-pin-t dvs-pin-r dvs-mt-4 dvs-mr-8 dvs-cursor-pointer z-10"
            @click="close"
          >
            <close-icon
              w="40"
              h="40"
              :style="{color: theme.panel.color }"
            />
          </div>
          <slot></slot>
        </div>
      </panel>
    </div>
  </div>
</template>

<script>
import Panel from './Panel.vue';

export default {
  methods: {
    close () {
      this.$emit('close');
    },
  },
  components: {
    CloseIcon: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/XIcon'),
    Panel,
  },
};
</script>
