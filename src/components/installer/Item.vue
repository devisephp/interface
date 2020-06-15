<template>
  <section>
    <div class="dvs-relative dvs-px-16 dvs-w-1/2 dvs-mb-16">
      <item-check
        v-if="item !== null"
        :item="item"
        class="dvs-absolute dvs-top-0 dvs-left-0 dvs-ml-6 dvs-mt-8 dvs-pt-2 dvs-text-2xl"
      ></item-check>
      <div class="dvs-pl-8 dvs-text-sm dvs-text-gray-900 dvs-leading-normal">
        <h3 class="dvs-mb-4 dvs-text-xl">{{ title }}</h3>
        <slot name="instructions" />
      </div>
    </div>

    <div
      class="dvs-w-1/2 dvs-text-sm dvs-bg-black dvs-text-white dvs-px-8 dvs-pb-16 dvs-leading-normal"
    >
      <slot name="example"></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: 'DeviseInstallerItem',
  components: {
    ItemCheck: () => import(/* webpackChunkName: "devise-installer" */ './ItemCheck.vue'),
  },
  props: {
    item: {
      type: Boolean,
      default: null,
    },
    title: {
      required: true,
      type: String,
    },
  },
};
</script>
