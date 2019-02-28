<template>
  <div :class="`
    ${prefix}flex
    ${prefix}items-stretch`">
    <div
      v-for="(column, index) in columns"
      :key="index"
      :class="`
        ${prefix}flex 
        ${prefix}flex-col 
        ${prefix}justify-between 
        ${prefix}w-full 
        ${prefix}items-stretch`"
    >
      <div
        :class="`
          ${prefix}font-bold 
          ${prefix}text-center 
          ${prefix}mb-2 
          ${prefix}pb-2 
          ${prefix}px-4 
          ${prefix}border-b 
          ${prefix}cursor-pointer 
          ${prefix}whitespace-no-wrap`"
        :style="{borderColor: theme.panel.color}"
        @click="sortByColumn(column)"
      >
        {{ column.name }}
        <template v-if="column === sortBy">
          <arrow-down v-if="sortDir === 'desc'" />
          <arrow-up v-else />
        </template>
      </div>
      <div
        v-for="(record, dataKey) in sortedData"
        :key="dataKey"
        :class="`
          ${prefix}overflow-hidden 
          ${prefix}px-2 
          ${prefix}flex 
          ${prefix}flex-grow 
          ${prefix}items-center 
          ${prefix}text-center`"
      >
        <template v-if="!column.property">{{ record[0] }}</template>
        <template v-else>
          <div
            :class="`
              ${prefix}text-center 
              ${prefix}w-full`"
            v-html="record[1][column.property]"
          ></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SimpleTable',
  data () {
    return {
      sortBy: null,
      sortDir: null,
    };
  },
  methods: {
    getColumnProperty (record, column) {
      const value = record[column.property]
      if (column.type === 'image') {
        return ``
      }
      return value
    },
    sortByColumn (column) {
      // Toggling same column
      if (this.sortBy === column) {
        if (this.sortDir === 'desc') {
          this.sortDir = null;
          this.sortBy = null;
        } else if (this.sortDir === 'asc') {
          this.sortDir = 'desc';
        } else {
          this.sortDir = 'asc';
        }
      } else {
        this.sortBy = column;
        this.sortDir = 'asc';
      }
    },
    sortNumber (a, b, direction) {
      if (direction === 'desc') {
        return b - a;
      }
      return a - b;
    },
    sortString (a, b, direction) {
      const A = a.toUpperCase(); // ignore upper and lowercase
      const B = b.toUpperCase(); // ignore upper and lowercase

      if (A < B) {
        return direction === 'desc' ? -1 : 1;
      }

      return direction === 'desc' ? 1 : -1;
    },
  },
  computed: {
    sortedData () {
      const self = this;
      const sortable = [];
      for (const record in this.data) {
        if (this.data.hasOwnProperty(record)) {
          sortable.push([record, this.data[record]]);
        }
      }

      if (this.sortBy !== null) {
        sortable.sort((a, b) => {
          if (self.sortBy.property) {
            if (typeof a[1][self.sortBy.property] === 'string') {
              return self.sortString(
                a[1][self.sortBy.property],
                b[1][self.sortBy.property],
                self.sortDir
              );
            }
            return self.sortNumber(
              a[1][self.sortBy.property],
              b[1][self.sortBy.property],
              self.sortDir
            );
          }
          if (typeof a[0] === 'string') {
            return self.sortString(a[0], b[0], self.sortDir);
          }
          return self.sortNumber(a[0], b[0], self.sortDir);
        });
      }

      return sortable;
    },
  },
  props: {
    columns: {
      required: true,
      type: Array,
    },
    data: {
      required: true
    },
    prefix: {
      type: String,
      default: 'dvs-'
    }
  },
  components: {
    ArrowDown: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/ArrowDownIcon'),
    ArrowUp: () =>
      import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/ArrowUpIcon'),
  },
};
</script>
