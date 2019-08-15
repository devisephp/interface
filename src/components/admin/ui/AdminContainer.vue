<template>
  <div class="dvs-w-full flex justify-center dvs-mt-10">
    <div class="dvs-bg-white dvs-text-admin-bg dvs-rounded-lg dvs-shadow-xl dvs-absolute dvs-pin-t dvs-px-8 dvs-py-4 dvs-font-light dvs-text-center dvs-leading-tight dvs-text-sm">
      <slot name="message"></slot>
    </div>
    <div class="dvs-bg-admin-bg dvs-rounded dvs-shadow-lg dvs-max-w-3/4 dvs-min-w-1/2 dvs-px-10 dvs-py-10">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeviseAdminContainer'
}
</script>