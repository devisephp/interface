<template>
  <div class="dvs-w-full dvs-flex dvs-flex-wrap dvs-items-center">
    <template v-if="currentDirectory !== ''">
      <div class="dvs-cursor-pointer dvs-mr-1 dvs-mb-1" @click="goToHome()">Home</div>
      <template v-for="(dir, key) in directoriesObj">
        <div :key="key">
          <span class="dvs-mr-1 dvs-mb-1">&gt;</span>
          <span class="dvs-cursor-pointer dvs-mr-1 dvs-mb-1" @click="chooseDirectory(key)">{{ dir }}</span>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  methods: {
    chooseDirectory(directory) {
      this.$emit('chooseDirectory', directory);
    },
    goToHome() {
      this.chooseDirectory('');
    },
  },
  computed: {
    directoriesObj() {
      const directoriesObj = {};
      let directoriesStr = '';
      const directoriesArr = this.currentDirectory.split('.');

      for (let i = 0; i < directoriesArr.length; i += 1) {
        directoriesStr += directoriesArr[i];
        directoriesObj[directoriesStr] = directoriesArr[i];
        directoriesStr += '.';
      }

      return directoriesObj;
    },
  },
  props: ['currentDirectory'],
};
</script>
