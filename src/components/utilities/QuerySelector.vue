<template>
  <div>
    Query Selector
    <div
      v-for="modelQuery in modelQueries"
      :key="modelQuery.id"
    >
      {{ modelQuery }}
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'QuerySelector',
  computed: {
    ...mapState('devise', ['modelQueries'])
  },
  mounted () {
    this.getModelQueries()
  },
  methods: {
    ...mapActions('devise', ['getModelQueries'])
  }
}
</script>