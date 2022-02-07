<template>
  <div v-if="meta.last_page > 1">
    <ul v-if="listMode" class="dvs-flex">
      <li
        v-for="n in meta.last_page"
        :key="n"
        :class="{ 'dvs-current-page': isCurrentPage(n) }"
        class="dvs-btn dvs-btn-xs dvs-mr-1 dvs-cursor-pointer"
        :style="decideStyle(n)"
        @click="update(n)"
      >
        {{ n }}
      </li>
    </ul>
    <div v-else class="dvs-flex">
      <button class="dvs-btn dvs-btn-xs dvs-mr-1 dvs-btn-secondary" @click="changePage(1)">
        First
      </button>
      <button
        class="dvs-btn dvs-btn-xs dvs-mr-1 dvs-btn-secondary"
        @click="changePage(meta.current_page - 1)"
      >
        Prev
      </button>
      <select
        :value="meta.current_page"
        class="dvs-p-2 dvs-mr-1 dvs-text-xs dvs-appearance-none dvs-text-gray-800 rounded"
        @change="changePage($event.target.value)"
      >
        <option v-for="n in meta.last_page" :key="n" :value="n">
          {{ n }}
        </option>
      </select>
      <button
        class="dvs-btn dvs-btn-xs dvs-mr-1 dvs-btn-secondary"
        @click="changePage(meta.current_page + 1)"
      >
        Next
      </button>
      <button
        class="dvs-btn dvs-btn-xs dvs-mr-1 dvs-btn-secondary"
        @click="changePage(meta.last_page)"
      >
        Last
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SuperTablePagination',
  props: {
    meta: {
      type: Object,
      required: true,
    },
    listMode: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    changePage(page) {
      if (page > 0 && page <= this.meta.last_page) {
        this.$emit('changePage', page);
      }
    },
    isCurrentPage(page) {
      return page === this.meta.current_page;
    },
    decideStyle(page) {
      if (this.isCurrentPage(page)) {
        return this.theme.actionButton;
      }
      return this.theme.actionButtonGhost;
    },
  },
};
</script>
