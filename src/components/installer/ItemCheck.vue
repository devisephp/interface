<template>
  <div>
    <close-circle-icon
      v-if="!item"
      :w="size.toString()"
      :h="size.toString()"
    />
    <div
      v-else
      class="dvs-text-green"
    >
      <checkmark-icon
        :w="size.toString()"
        :h="size.toString()"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: 'DeviseItemCheck',

  components: {
    CheckmarkIcon: () => import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/CheckCircleIcon'),
    CloseCircleIcon: () => import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/CircleIcon'),
  },
  
  props: {
    item: {
      type: Boolean,
      default: null
    },
    size: {
      type: Number,
      default: 50
    }
  }
};
</script>

<style>
</style>
