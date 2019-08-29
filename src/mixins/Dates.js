const dayjs = require(/* webpackChunkName: "dayjs" */ 'dayjs');

export default {

  methods: {
    formatDate (date) {
      return dayjs(date).format('YYYY-MM-DD');
    },
  },
};
