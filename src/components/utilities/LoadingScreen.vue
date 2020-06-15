<template>
  <div>
    <transition v-if="!inline" name="dvs-fade">
      <div v-if="show" class="dvs-fixed dvs-inset-0">
        <div class="dvs-fixed dvs-inset-0 dvs-blocker"></div>
        <div
          class="dvs-absolute dvs-absolute-center dvs-bg-white dvs-z-50 dvs-p-8 dvs-rounded dvs-shadow dvs-text-sm dvs-uppercase dvs-font-bold dvs-text-center"
        >
          <img src="./../../imgs/loader.gif" class="dvs-mb-2" />
          <div class="dvs-text-black">
            <p>{{ message }}</p>
          </div>
        </div>
      </div>
    </transition>

    <transition v-if="inline" name="dvs-fade">
      <div
        class="dvs-flex dvs-flex-col dvs-justify-center dvs-items-center dvs-bg-white dvs-text-gray-800 dvs-rounded dvs-shadow dvs-p-4"
      >
        <img src="./../../imgs/loader.gif" class="dvs-mb-2" />
        <div class="dvs-text-black dvs-uppercase dvs-text-xs dvs-font-bold">{{ message }}</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    inline: {
      type: Boolean,
      default: false,
    },
    inlineMessage: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      show: false,
      message: null,
    };
  },
  mounted() {
    if (!this.inline) {
      window.deviseSettings.$bus.$on('showLoadScreen', message => {
        this.message = message;
        this.show = true;

        setTimeout(() => {
          this.message = 'We had issues loading';
          this.show = false;
        }, 15000);
      });

      window.deviseSettings.$bus.$on('hideLoadScreen', () => {
        this.show = false;
        this.message = null;
      });
    } else {
      this.message = this.inlineMessage;
    }
  },
};
</script>
