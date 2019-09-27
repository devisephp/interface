<template>
  <div
    v-if="show"
    class="dvs-h-screen dvs-fixed dvs-pin dvs-flex dvs-justify-center dvs-items-center dvs-z-60 dvs-text-grey-darker"
  >
    <div
      class="dvs-blocker dvs-z-30"
      @click="show = false"
    ></div>

    <admin-container class="dvs-z-40 dvs-text-admin-fg">
      <template v-slot:message>
        Uh-oh! There was an error saving your page.<br>
        There were two editors at the same time...
      </template>
      <template v-slot:content>
        <div class="mb-8">
          Ok, don't panic. However, it appears that someone else has edited this page as you were editing the page. You need to decide what you want to do. You can either abandon changes, refresh the page and try again. Or, you can go ahead and force save <strong>which will overwrite the other editor's changes</strong>.
        </div>
        <div>
          <button
            class="dvs-btn dvs-btn-danger dvs-mr-2"
            @click="forceSavePage"
          >Yes, force save my changes</button>
          <button
            class="dvs-btn dvs-btn-secondary"
            @click="refreshPage"
          >Refresh the page and lose my changes</button>
        </div>

      </template>
    </admin-container>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'DeviseForceSave',
  
  components: {
    AdminContainer: () =>
      import(/* webpackChunkName: "devise-utilities" */ '../admin/ui/AdminContainer.vue'),
  },

  data () {
    return {
      show: false
    }
  },

  computed: {
    ...mapGetters('devise', ['currentPage']),
  },

  mounted () {
    window.deviseSettings.$bus.$on('showForceSave', () => {
      this.show = true;
    });
  },
  methods: {
    ...mapActions('devise', ['savePage']),
    forceSavePage () {
      this.savePage({ page: this.currentPage, forceSave: true }).then(() => {
        this.show = false
      })
    },
    refreshPage () {
      window.location.reload();
    }
  }
}
</script>