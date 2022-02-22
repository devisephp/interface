import axios from 'axios';
export default () => {
  window.axios = axios;

  window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  window.axios.defaults.headers.xsrfHeaderName = 'X-XSRF-TOKEN2';
  window.axios.defaults.headers.xsrfCookieName = 'XSRF-TOKEN2';

  /**
   * CSRF Token as a common header with Axios so that
   * all outgoing HTTP requests automatically have it attached. This is just
   * a simple convenience so we don't have to attach every token manually.
   */

  const token = document.head.querySelector('meta[name="csrf-token"]');

  if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
  }
};
