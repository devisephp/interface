<template>
  <admin-container>
    <template v-slot:message>
      Global Meta are the meta tags that will be attached to every page of this site. They can be overridden on a page level but this gives you to the opportunity to set the
      <span class="dvs-fonts-mono">&lt;meta&gt;</span> across
      <strong>all</strong> pages.
    </template>
    <template v-slot:content>

      <meta-form
        v-model="localValue.data"
        class="dvs-mt-8"
        @request-create-meta="requestCreateMeta"
        @request-update-meta="requestUpdateMeta"
        @request-delete-meta="requestDeleteMeta"
      />
    </template>

  </admin-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'MetaManage',
  
  components: {
    MetaForm: () => import(/* webpackChunkName: "devise-meta" */ './MetaForm'),
    AdminContainer: () =>
      import(/* webpackChunkName: "devise-administration" */ '../admin/ui/AdminContainer'),
  },

  data () {
    return {
      localValue: {
        data: [],
      },
      modulesToLoad: 1,
    };
  },

  computed: {
    ...mapGetters('devise', ['meta']),
  },
  
  mounted () {
    this.retrieveAllMeta();
  },
  methods: {
    ...mapActions('devise', ['getMeta', 'createMeta', 'updateMeta', 'deleteMeta']),
    requestCreateMeta (newMeta) {
      this.createMeta(newMeta);
    },
    requestUpdateMeta (meta) {
      this.updateMeta(meta).then(() => {
        meta.edit = false;
      });
    },
    requestDeleteMeta (meta) {
      this.deleteMeta(meta);
    },
    retrieveAllMeta () {
      const self = this;
      this.getMeta().then(() => {
        self.localValue = Object.assign({}, self.localValue, self.meta);

        /* eslint-disable array-callback-return */
        self.localValue.data.map(meta => {
          self.$set(meta, 'edit', false);
        });
        window.deviseSettings.$bus.$emit('incrementLoadbar', self.modulesToLoad);
      });
    },
  },

};
</script>
