<template>
  <div class="dvs-flex dvs-flex-col dvs-items-center">
    <div class="dvs-relative" :style="{width: currentWidth}">
      <doughnut
        :chart-data="{
          datasets: [{
            data: chartData,
            backgroundColor: [theme.panel.color],
            borderWidth: 0
          }],
          labels: [``, ``]
        }"
        :options="doughnutOptions"
      ></doughnut>
      <div class="dvs-absolute dvs-absolute-center dvs-text-lg">{{ yesterday }}</div>
    </div>
    <div class="dvs-mt-4 dvs-text-center dvs-text-xs dvs-uppercase">
      <strong>{{ stat }}</strong>
      : {{ change }}%
      <i :class="changeIcon"></i>
    </div>
  </div>
</template>

<script>
import Doughnut from './Doughnut.vue';

export default {
  computed: {
    doughnutOptions() {
      return {
        cutoutPercentage: 88,
        legend: false,
      };
    },
    chartData() {
      const weekAgoKey = Object.keys(this.analytics)[0];
      const yesterdayKey = Object.keys(this.analytics)[1];
      const sumOfSample =
        this.analytics[yesterdayKey][this.stat] + this.analytics[weekAgoKey][this.stat];
      let yesterday = this.analytics[yesterdayKey][this.stat] / sumOfSample;
      let weekAgo = this.analytics[weekAgoKey][this.stat] / sumOfSample;

      /* eslint-disable-line */ if (isNaN(yesterday)) {
        yesterday = 0;
      }

      /* eslint-disable-line */ if (isNaN(weekAgo)) {
        weekAgo = 1;
      }

      if (yesterday / weekAgo > 1) {
        yesterday = 0;
        weekAgo = 1;
      }

      return [weekAgo, yesterday];
    },
    yesterday() {
      const yesterdayKey = Object.keys(this.analytics)[1];
      return this.analytics[yesterdayKey][this.stat];
    },
    change() {
      const weekAgoKey = Object.keys(this.analytics)[0];
      const yesterdayKey = Object.keys(this.analytics)[1];

      let change = Math.round(
        (this.analytics[yesterdayKey][this.stat] / this.analytics[weekAgoKey][this.stat]) * 100 -
          100
      );

      /* eslint-disable-line */ if (isNaN(change)) {
        change = 0;
      }

      return change;
    },
    changeIcon() {
      if (this.change < 0) {
        return 'ion-arrow-down-b';
      }

      return 'ion-arrow-up-b';
    },
    currentWidth() {
      return '50px';
    },
  },
  components: {
    Doughnut,
  },
  props: ['analytics', 'stat'],
};
</script>
