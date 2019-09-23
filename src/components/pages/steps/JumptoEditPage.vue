<template>
  <div>Loading Page Data</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    step: {
      type: Object,
      required: true
    },
    values: {
      type: Object,
      required: true
    }
  },
  mounted () {
    if (this.step.jumpedTo) {
      this.requestPage()
    } else {
      this.$emit('cancel')
    }
  },
  methods: {
    ...mapActions('devise', [
      'getPage',
    ]),
    requestPage () {
      this.getPage(this.step.jumpedToParams.pageId).then(response => {
        this.$emit('done', response.data.page)
      })
    }
  },
}
</script>