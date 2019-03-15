<template>
  <div class="dvs-relative dvs-mt-8 dvs-mb-8">
    <div
      class="dvs-fixed dvs-pin-t dvs-pin-l dvs-pin-r dvs-p-4  dvs-px-6 z-10"
      :style="theme.panelCard"
    >
      <fieldset class="dvs-fieldset">
        <div class="dvs-flex">
          <input
            type="text"
            ref="filter"
            placeholder="Filter Slices"
            v-model="filter"
          >
          <button
            class="dvs-btn dvs-ml-2 dvs-min-w-64"
            @click="filter=null"
            :style="theme.actionButton"
          >Clear Filter</button>
        </div>
      </fieldset>
    </div>
    <div
      style="height:70vh"
      v-if=" this.allDirectories.length > 0"
      v-bar="{preventParentScroll: true}"
    >
      <div>
        <slice-selector-directory
          v-for="(directory, n) in this.allDirectories"
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
import { mapGetters } from 'vuex';
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
    filteredDirectories () {
      const filters = this.filter.toLowerCase().split(' ');
      const directories = this.getDirectories(
        JSON.parse(JSON.stringify(this.slicesDirectories.directories)),
        0
      ).filter(directory => {
        if (
          filters.every(filter => {
            // console.log(directory.path, filter, directory.path.toLowerCase().includes(filter));
            return directory.path.toLowerCase().includes(filter);
          })
        ) {
          return true;
        }
        let { files } = directory;
        files = files.filter(file => {
          return filters.every(filter => {
            // console.log(file.value.toLowerCase().includes(filter));
            return file.value.toLowerCase().includes(filter);
          });
        });
        if (files.length) {
          // console.log(files);
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
  },
  components: {
    SliceSelectorDirectory,
  },
};
</script>
