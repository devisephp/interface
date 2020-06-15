/* eslint-disable camelcase */
import Vue from 'vue';

const funcs = {
  // Build the parameters for the GET based on the filters.repertoire
  buildFilterParams(filter) {
    if (typeof filter === 'undefined') {
      return '';
    }

    const filters = JSON.parse(JSON.stringify(filter));

    Object.keys(filters).forEach(f => {
      if (filters[f] === null) {
        delete filters[f];
      }
    });

    let params = {};
    const sortParams = funcs.buildSortParams(filters.sort);
    const relatedParams = funcs.buildRelatedParams(filters.related);
    const scopeParams = funcs.buildScopeParams(filters.scopes);
    const searchParams = filters.search;
    const pageParams = filters.page;
    const { paginated, cache } = filters;

    if (paginated) {
      params.paginated = true;
      delete filters.paginated;
    }

    if (pageParams && pageParams !== '') {
      params.page = pageParams;
    }

    if (sortParams && sortParams !== '') {
      params.sort = sortParams;
    }

    if (scopeParams && scopeParams !== '') {
      params.scopes = scopeParams;
    }

    if (cache) {
      params.cache = true;
      delete filters.cache;
    }

    if (filters.dates && Object.keys(filters.dates).length > 0) {
      const datesParams = {};
      for (const param in filters.dates) {
        if (filters.dates[param].after || filters.dates[param].before) {
          datesParams[param] = `${filters.dates[param].after},${filters.dates[param].before}`;
        }
      }

      if (!params.filters) {
        Vue.set(params, 'filters', {});
      }

      Vue.set(params.filters, 'dates', datesParams);
    }

    if (relatedParams && Object.keys(relatedParams).length > 0) {
      for (const param in relatedParams) {
        if (relatedParams[param]) {
          if (relatedParams[param] === '') {
            Vue.delete(relatedParams, param);
          }
        }
      }
      if (!params.filters) {
        Vue.set(params, 'filters', {});
      }

      Vue.set(params.filters, 'related', relatedParams);
    }

    if (searchParams && Object.keys(searchParams).length > 0) {
      for (const param in searchParams) {
        if (searchParams[param]) {
          if (searchParams[param] === '') {
            Vue.delete(searchParams, param);
          }
        }
      }
      if (!params.filters) {
        Vue.set(params, 'filters', {});
      }

      Vue.set(params.filters, 'search', searchParams);
    }

    params = Object.assign({}, filters, params);
    params = funcs.serialize(params);

    return params;
  },

  // Build the sort parameters
  buildSortParams(sorts) {
    let sortString = '';

    for (const prop in sorts) {
      if (sorts[prop]) {
        sortString += sorts[prop] === 'desc' ? `-${prop}` : prop;
        sortString += ',';
      }
    }

    sortString = sortString.substr(0, sortString.length - 1);

    return sortString;
  },

  // Build the related parameters
  buildRelatedParams(related) {
    const relatedParams = {};

    for (const prop in related) {
      if (related[prop]) {
        relatedParams[prop] = related[prop].join();
      }
    }

    return relatedParams;
  },

  // Build the related parameters
  buildSearchParams(search) {
    const searchParams = {};

    for (const prop in search) {
      if (search[prop]) {
        searchParams[prop] = search[prop].join();
      }
    }

    return searchParams;
  },

  // Build the scope parameters
  buildScopeParams(scopes) {
    const scopeParams = [];

    for (const prop in scopes) {
      if (scopes[prop]) {
        const obj = {};
        obj[prop] = scopes[prop];
        scopeParams.push(obj);
      }
    }

    return scopeParams;
  },

  serialize(obj, prefix) {
    const str = [];
    let p;

    for (p in obj) {
      if (obj[p]) {
        const k = prefix ? `${prefix}[${p}]` : p;
        const v = obj[p];

        str.push(
          v !== null && typeof v === 'object'
            ? funcs.serialize(v, k)
            : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
        );
      }
    }

    return str.join('&');
  },

  formatMoney(n) {
    let j = 0;
    const c = 2;
    const d = '.';
    const t = ',';
    const s = n < 0 ? '-' : '';
    const i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)), 0));

    j = (j = i.length) > 3 ? j % 3 : 0; // eslint-disable-line

    return `$${s +
      (j ? i.substr(0, j) + t : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${t}`) +
      (c
        ? d +
          Math.abs(n - i)
            .toFixed(c)
            .slice(2)
        : '')}`;
  },

  sanitizeField(field) {
    if (field.type === 'link') {
      delete field.href;
    }
    return field;
  },

  sanitizeSlice(slice) {
    for (const property in slice) {
      if (
        slice[property] &&
        Object.prototype.hasOwnProperty.call(slice[property], 'type') &&
        property !== 'metadata'
      ) {
        slice[property] = this.sanitizeField(slice[property]);
      }
    }

    slice.slices.map(s => this.sanitizeSlice(s));
  },

  sanitizePageData(data) {
    return data.slices.map(slice => this.sanitizeSlice(slice));
  },
};

export default funcs;
