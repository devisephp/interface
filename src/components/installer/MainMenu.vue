<template>
  <div
    id="sidebar"
    class="dvs-absolute dvs-left-0 dvs-top-0 dvs-bottom-0 dvs-bg-gray-300 dvs-p-4 dvs-font-sans"
  >
    <ul>
      <li class="dvs-mb-4">
        <a href="#nav-welcome" class="dvs-no-underline dvs-text-gray-800 dvs-font-bold">Welcome</a>
      </li>
      <li>
        <a
          href="#nav-required"
          class="dvs-no-underline dvs-text-gray-800 dvs-mb-4  dvs-font-bold dvs-block"
          >Required</a
        >
        <ul class="dvs-ml-4">
          <li class="dvs-flex dvs-mb-4">
            <item-check :item="checklist.database" :size="15" class="dvs-mr-2"></item-check>
            <a href="#nav-database-connection" class="dvs-no-underline dvs-text-gray-800"
              >Database Connection</a
            >
          </li>
          <li class="dvs-flex dvs-mb-4">
            <item-check :item="checklist.migrations" :size="15" class="dvs-mr-2"></item-check>
            <a href="#nav-database-migration" class="dvs-no-underline dvs-text-gray-800"
              >Database Migration</a
            >
          </li>
          <li class="dvs-flex dvs-mb-4">
            <item-check :item="checklist.auth" :size="15" class="dvs-mr-2"></item-check>
            <a href="#nav-auth" class="dvs-no-underline dvs-text-gray-800">Authentication</a>
          </li>
          <li class="dvs-flex dvs-mb-4">
            <item-check :item="checklist.user" :size="15" class="dvs-mr-2"></item-check>
            <a href="#nav-user" class="dvs-no-underline dvs-text-gray-800">First User</a>
          </li>
          <li class="dvs-flex dvs-mb-4">
            <item-check :item="checklist.site" :size="15" class="dvs-mr-2"></item-check>
            <a href="#nav-site" class="dvs-no-underline dvs-text-gray-800">First Site</a>
          </li>
          <li class="dvs-flex dvs-mb-4">
            <item-check :item="checklist.page" :size="15" class="dvs-mr-2"></item-check>
            <a href="#nav-page" class="dvs-no-underline dvs-text-gray-800">First Page</a>
          </li>
          <li class="dvs-flex dvs-mb-4">
            <item-check :item="checklist.slices" :size="15" class="dvs-mr-2"></item-check>
            <a href="#nav-slices" class="dvs-no-underline dvs-text-gray-800">Slices Directory</a>
          </li>
          <li class="dvs-flex dvs-mb-4">
            <item-check :item="checklist.image_library" :size="15" class="dvs-mr-2"></item-check>
            <a href="#nav-image-library" class="dvs-no-underline dvs-text-gray-800"
              >Image Library</a
            >
          </li>
        </ul>
      </li>
      <li>
        <a
          href="#nav-suggested"
          class="dvs-no-underline dvs-text-gray-800 dvs-font-bold dvs-mb-4 dvs-block"
          >Suggested</a
        >
        <ul class="dvs-ml-4">
          <li class="dvs-flex dvs-mb-4">
            <a href="#nav-config" class="dvs-no-underline dvs-text-gray-800">Devise Config</a>
          </li>
          <li class="dvs-flex">
            <a
              href="#nav-remove-laravel-route"
              class="dvs-no-underline dvs-text-gray-800 dvs-mb-4 dvs-block"
              >Remove Laravel Routes</a
            >
          </li>
          <li>
            <a
              href="#nav-image-optimization"
              class="dvs-no-underline dvs-text-gray-800 dvs-mb-4 dvs-block"
              >Image Optimization</a
            >
            <ul>
              <li class="dvs-flex dvs-mb-4">
                <item-check
                  :item="checklist.image_optimization.gifsicle"
                  :size="15"
                  class="dvs-mr-2"
                ></item-check>
                <a href="#nav-image-optimization" class="dvs-no-underline dvs-text-gray-800"
                  >Gifsicle</a
                >
              </li>
              <li class="dvs-flex dvs-mb-4">
                <item-check
                  :item="checklist.image_optimization.jpegoptim"
                  :size="15"
                  class="dvs-mr-2"
                ></item-check>
                <a href="#nav-image-optimization" class="dvs-no-underline dvs-text-gray-800"
                  >Jpegoptim</a
                >
              </li>
              <li class="dvs-flex dvs-mb-4">
                <item-check
                  :item="checklist.image_optimization.optipng"
                  :size="15"
                  class="dvs-mr-2"
                ></item-check>
                <a href="#nav-image-optimization" class="dvs-no-underline dvs-text-gray-800"
                  >Optipng</a
                >
              </li>
              <li class="dvs-flex dvs-mb-4">
                <item-check
                  :item="checklist.image_optimization.pngquant"
                  :size="15"
                  class="dvs-mr-2"
                ></item-check>
                <a href="#nav-image-optimization" class="dvs-no-underline dvs-text-gray-800"
                  >Pngquant</a
                >
              </li>
              <li class="dvs-flex dvs-mb-4">
                <item-check
                  :item="checklist.image_optimization.svgo"
                  :size="15"
                  class="dvs-mr-2"
                ></item-check>
                <a href="#nav-image-optimization" class="dvs-no-underline dvs-text-gray-800"
                  >Svgo</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {
    ItemCheck: () => import(/* webpackChunkName: "devise-installer" */ './ItemCheck.vue'),
  },
  props: {
    checklist: {
      type: Object,
      required: true,
    },
  },
};
</script>
