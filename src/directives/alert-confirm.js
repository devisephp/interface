import Vue from 'vue';

export default {
  bind (el, binding) {
    const clickHandler = function clickHandler () {
      const deviseAdmin = document.querySelector('#devise-admin');
      const newEl = document.createElement('devise-confirm');
      const insertedElement = deviseAdmin.parentNode.insertBefore(newEl, deviseAdmin.nextSibling);

      const Confirm = Vue.extend({
        data () {
          return {
            clicks: 0,
            show: true,
          };
        },
        methods: {
          ok () {
            binding.value.callback(binding.value.arguments);
            this.close();
          },
          cancel () {
            this.close();
          },
          close () {
            this.show = false;
            el.removeEventListener('click', clickHandler, true);
            insertedElement.remove();
          },
        },
        template: `
        <div v-if="show" class="dvs-fixed dvs-inset-0 dvs-z-9999">
          <div class="dvs-blocker"></div>
          <div class="dvs-fixed dvs-absolute-center dvs-z-50 dvs-p-8 dvs-rounded dvs-shadow-lg dvs-bg-admin-bg dvs-text-admin-fg">
            <h3 class="dvs-mb-8 dvs-text-white">Please Confirm</h3>
            <div class="dvs-mb-8 dvs-text-white">${binding.value.message}</div>

            <button class="dvs-btn dvs-btn-primary" @click="ok">Confirm</button>
            <button class="dvs-btn dvs-btn-secondary" @click="cancel">Cancel</button>
            </div>
          </div>
        </div>
        `,
      });

      new Confirm().$mount(insertedElement);
    };

    el.addEventListener('click', clickHandler);
  },
};
