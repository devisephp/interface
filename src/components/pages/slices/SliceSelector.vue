<template>
  <div class="dvs-relative dvs-mb-8">
    <div class="dvs-flex dvs-justify-center dvs-p-4 dvs-pb-8  dvs-text-admin-fg  dvs-w-full">
      <input
        type="text"
        v-model="filter"
        ref="filter"
        class="dvs-bg-transparent dvs-border-b-2 dvs-px-12 dvs-py-2 dvs-text-admin-fg dvs-outline-none dvs-placeholder-admin-fg dvs-text-center"
        placeholder="Type to begin searching"
      >
      <div
        class="dvs-cursor-pointer"
        :class="{'dvs-opacity-50': filter === ''}"
        @click="filter = ''"
      >
        <x-icon></x-icon>
      </div>
    </div>
    <div v-if=" this.allDirectories.length > 0">

      <div>
        <slice-selector-directory
          v-for="(directory, n) in this.allDirectories"
          :allowed-views="allowedViews"
          :key="n"
          :directory="directory"
          :value="value"
          @input="update"
        ></slice-selector-directory>
        <div class="dvs-h-32">&nbsp;</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import SliceSelectorDirectory from './SliceSelectorDirectory.vue';

export default {
  data () {
    return {
      directoryStack: [],
      filter: null,
    };
  },
  mounted () {
    this.$refs.filter.focus();
  },
  methods: {
    getDirectoryFiles (directories, directory) {
      directory = directories.find(dir => dir.dirName === directory);
      return directory;
    },
    getDirectories (directories) {
      let dirs = [];

      directories.map(dir => {
        dirs.push(dir);

        if (dir.directories && dir.directories.length > 0) {
          dirs = dirs.concat(this.getDirectories(dir.directories));
        }
        return dir;
      });

      return dirs;
    },
    filteredFiles (directory) {
      const filter = this.filter.toLowerCase();
      return directory.files.filter(file => {
        if (file.name.toLowerCase().includes(filter)) {
          return true;
        }
        return false;
      });
    },
    update (newValue) {
      this.$emit('input', newValue);
    },
  },
  computed: {
    ...mapState('devise', ['modelQueries']),
    ...mapGetters('devise', ['slicesDirectories']),
    allDirectories () {
      if (this.filter !== null && this.filter !== '') {
        return this.filteredDirectories;
      }
      if (this.slicesDirectories.directories && this.slicesDirectories.directories.length > 0) {
        return this.getDirectories(
          JSON.parse(JSON.stringify(this.slicesDirectories.directories)),
          0
        );
      }
      return [];
    },
    allowedViews () {
      if (this.modelQuery.key !== null) {
        const mqc = this.modelQueries.find(mq => {
          return mq.key === this.modelQuery.key
        })
        return mqc.views
      }
      return null;
    },
    filteredDirectories () {
      const filters = this.filter.toLowerCase().split(' ');
      const directories = this.getDirectories(
        JSON.parse(JSON.stringify(this.slicesDirectories.directories)),
        0
      ).filter(directory => {
        if (
          filters.every(filter => {
            return directory.path.toLowerCase().includes(filter);
          })
        ) {
          return true;
        }
        let { files } = directory;
        files = files.filter(file => {
          return filters.every(filter => {
            return file.value.toLowerCase().includes(filter);
          });
        });
        if (files.length) {
          directory.files = files;
          return true;
        }
        return false;
      });
      return directories;
    },
  },
  props: {
    value: {
      type: Object,
    },
    modelQuery: {
      type: Object
    }
  },
  components: {
    SliceSelectorDirectory,
    XIcon: () => import(/* webpackChunkName: "devise-icons" */ 'vue-feather-icons/icons/XIcon'),
  },
};
</script>
