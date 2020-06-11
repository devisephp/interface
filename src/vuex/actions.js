import commonUtils from './utils/common';

const actions = {
  // Generic
  getGeneric(context, payload) {
    let root = false;
    let url = `${context.state.api.baseUrl}${
      payload.config.apiendpoint
    }/?${commonUtils.buildFilterParams(payload.filters)}`;

    if (payload.config.app) {
      root = true;
      url = `${payload.config.apiendpoint}/?${commonUtils.buildFilterParams(payload.filters)}`;
    }

    return new Promise(resolve => {
      window.axios
        .get(url)
        .then(response => {
          context.commit('devise/setGeneric', { config: payload.config, response }, { root });
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  getGenericRecord(context, payload) {
    let url = `${context.state.api.baseUrl}${payload.config.apiendpoint}/${payload.id}`;

    if (payload.config.app) {
      url = `${payload.config.apiendpoint}/${payload.id}`;
    }

    return new Promise(resolve => {
      window.axios
        .get(url)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  searchGeneric(context, payload) {
    let url = `${context.state.api.baseUrl}${
      payload.config.apiendpoint
    }/?${commonUtils.buildFilterParams(payload.filters)}`;

    if (payload.config.app) {
      url = `${payload.config.apiendpoint}/?${commonUtils.buildFilterParams(payload.filters)}`;
    }

    return new Promise(resolve => {
      window.axios
        .get(url)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  createGeneric(context, payload) {
    let url = '';
    if (payload.config.app) {
      url = payload.config.apiendpoint;
    } else {
      url = `${context.state.api.baseUrl}${payload.config.apiendpoint}`;
    }

    return new Promise(resolve => {
      window.axios
        .post(url, payload.record)
        .then(response => {
          window.deviseSettings.$bus.$emit('showMessage', {
            title: 'Success!',
            message: `${payload.record[payload.config.recordLabel]} has been created.`,
          });
          resolve(response);
        })

        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  updateGeneric(context, payload) {
    let url = `${context.state.api.baseUrl}${payload.config.apiendpoint}/${payload.record.id}`;

    if (payload.config.app) {
      url = `${payload.config.apiendpoint}/${payload.record.id}`;
    }

    return new Promise(resolve => {
      window.axios
        .put(url, payload.record)
        .then(response => {
          window.deviseSettings.$bus.$emit('showMessage', {
            title: 'Success!',
            message: `${payload.record[payload.config.recordLabel]} has been saved.`,
          });
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  deleteGeneric(context, payload) {
    let url = `${context.state.api.baseUrl}${payload.config.apiendpoint}/${payload.record.id}`;

    if (payload.config.app) {
      url = `${payload.config.apiendpoint}/${payload.record.id}`;
    }

    return new Promise(resolve => {
      window.axios
        .delete(url)
        .then(response => {
          window.deviseSettings.$bus.$emit('showMessage', {
            title: 'Success!',
            message: `${payload.record[payload.config.recordLabel]} has been deleted.`,
          });
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  appGenericSearch(context, payload) {
    return new Promise(resolve => {
      window.axios
        .get(`${payload.config.apiendpoint}/?${commonUtils.buildFilterParams(payload.filters)}`)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  /*
   * Breakpoint
   */
  setBreakpoint(context, data) {
    return new Promise(resolve => {
      context.commit('setBreakpoint', data);
      resolve(data);
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  /*
   * Captions
   */

  saveCaption(context, payload) {
    return new Promise(resolve => {
      window.axios
        .post(`${context.state.api.baseUrl}media/alts`, payload)
        .then(response => {
          window.deviseSettings.$bus.$emit('showMessage', {
            title: 'Success!',
            message: 'Your caption has been saved.',
          });
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  /*
   * Devmode
   */
  setDevMode(context, data) {
    return new Promise(resolve => {
      context.commit('setDevMode', data);
      resolve(data);
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  /*
   * Languages
   */
  getLanguages(context) {
    return new Promise((resolve, reject) => {
      window.axios
        .get(`${context.state.api.baseUrl}languages/`)
        .then(response => {
          context.commit('setLanguages', response.data);
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
          reject(error);
        });
    });
  },

  createLanguage(context, language) {
    return new Promise(resolve => {
      window.axios
        .post(`${context.state.api.baseUrl}languages/`, language)
        .then(response => {
          window.deviseSettings.$bus.$emit('showMessage', {
            title: 'Success!',
            message: 'Your new language has been added.',
          });
          context.commit('createLanguage', response.data.data);
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  updateLanguage(context, language) {
    return new Promise(resolve => {
      window.axios
        .put(`${context.state.api.baseUrl}languages/${language.id}`, language)
        .then(response => {
          window.deviseSettings.$bus.$emit('showMessage', {
            title: 'Success!',
            message: 'Your new language has been updated.',
          });
          context.commit('updateLanguage', { language, data: response.data });
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  /*
   * Media Manager
   */

  setCurrentDirectory(context, directory) {
    return new Promise(resolve => {
      context.commit('setCurrentDirectory', directory);
      resolve();
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  generateImages(context, payload) {
    return new Promise((resolve, reject) => {
      window.axios.put(`${context.state.api.baseUrl}media-styles`, payload).then(
        response => {
          context.commit('setFiles', response.data);
          resolve(response);
        },
        error => {
          window.deviseSettings.$bus.$emit('showError', error);
          reject(error);
        }
      );
    });
  },

  regenerateMedia(context, payload) {
    context.commit('addToMediaRegenerationRequests', payload);

    return new Promise(resolve => {
      window.axios
        .put(
          `${context.state.api.baseUrl}media-styles/${payload.instanceId}/${payload.fieldName}`,
          payload
        )
        .then(response => {
          context.commit('setFiles', response.data);
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  mediaSearch(context, query) {
    return new Promise(resolve => {
      window.axios
        .get(`${context.state.api.baseUrl}media-search?q=${query}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  getCurrentFiles(context, options) {
    let imagesOnly = '';
    if (options && options.type === 'image') {
      imagesOnly = '?type=image';
    }
    return new Promise(resolve => {
      window.axios
        .get(`${context.state.api.baseUrl}media/${context.state.currentDirectory}${imagesOnly}`)
        .then(response => {
          context.commit('setFiles', response.data);
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  getCurrentDirectories(context) {
    return new Promise(resolve => {
      window.axios
        .get(`${context.state.api.baseUrl}media-directories/${context.state.currentDirectory}`)
        .then(response => {
          context.commit('setDirectories', response.data);
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  toggleFile(context, theFile) {
    const match = context.state.files.find(file => file.name === theFile.name);

    const onOff = typeof match.on === 'undefined' || match.on === false;
    context.commit('toggleFileOnOff', { file: match, on: onOff });
  },

  deleteFile(context, file) {
    return new Promise(resolve => {
      window.axios
        .delete(`${context.state.api.baseUrl}media${file.url}`)
        .then(response => {
          window.deviseSettings.$bus.$emit('showMessage', {
            title: 'File Deleted',
            message: 'The file was successfully deleted from the server.',
          });
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  createDirectory(context, payload) {
    return new Promise(resolve => {
      window.axios
        .post(`${context.state.api.baseUrl}media-directories`, {
          directory: payload.directory,
          name: payload.name,
        })
        .then(response => {
          window.deviseSettings.$bus.$emit('showMessage', {
            title: 'Directory Created',
            message: 'The directory was successfully created.',
          });
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  deleteDirectory(context, directory) {
    return new Promise(resolve => {
      window.axios
        .delete(`${context.state.api.baseUrl}media-directories`, {
          params: { directory },
        })
        .then(response => {
          window.deviseSettings.$bus.$emit('showMessage', {
            title: 'Directory Deleted',
            message: 'The directory was successfully deleted from the server.',
          });
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  /*
   * Meta
   */
  getMeta(context) {
    return new Promise(resolve => {
      window.axios
        .get(`${context.state.api.baseUrl}meta/`)
        .then(response => {
          context.commit('setMeta', response.data);
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  createMeta(context, meta) {
    return new Promise(resolve => {
      window.axios
        .post(`${context.state.api.baseUrl}meta/`, meta)
        .then(response => {
          window.deviseSettings.$bus.$emit('showMessage', {
            title: 'Success!',
            message: 'Your new meta has been added.',
          });
          context.commit('createMeta', response.data.data);
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  updateMeta(context, meta) {
    return new Promise(resolve => {
      window.axios
        .put(`${context.state.api.baseUrl}meta/${meta.id}`, meta)
        .then(response => {
          window.deviseSettings.$bus.$emit('showMessage', {
            title: 'Success!',
            message: 'Your new meta has been updated.',
          });
          context.commit('updateMeta', { meta, data: response.data });
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  deleteMeta(context, meta) {
    return new Promise(resolve => {
      window.axios
        .delete(`${context.state.api.baseUrl}meta/${meta.id}`)
        .then(response => {
          window.deviseSettings.$bus.$emit('showMessage', {
            title: 'Success!',
            message: 'The meta has been deleted.',
          });
          context.commit('deleteMeta', meta);
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  /*
   * Models
   */
  getModels(context) {
    return new Promise(resolve => {
      window.axios
        .get(`${context.state.api.baseUrl}models/`)
        .then(response => {
          context.commit('setModels', response.data);
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  getModelQueries(context) {
    return new Promise(resolve => {
      window.axios
        .get(`${context.state.api.baseUrl}model-queries/`)
        .then(response => {
          context.commit('setModelQueries', response.data);
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  getModelSettings(context, modelQuery) {
    return new Promise(resolve => {
      window.axios
        .get(`${context.state.api.baseUrl}models/settings?${modelQuery}`)
        .then(response => {
          context.commit('setModelSettings', response.data);
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  getModelRecords(context, { model, filters }) {
    return new Promise(resolve => {
      window.axios
        .get(
          `${context.state.api.baseUrl}models/query?class=${model}&${commonUtils.buildFilterParams(
            filters
          )}`
        )
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  // Pages
  getPages(context, filters) {
    return new Promise(resolve => {
      window.axios
        .get(`${context.state.api.baseUrl}pages/?${commonUtils.buildFilterParams(filters)}`)
        .then(response => {
          context.commit('setPages', response.data);
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  getPagesList(context, filters) {
    return new Promise(resolve => {
      const params =
        filters && Object.prototype.hasOwnProperty.call(filters, 'language_id')
          ? `language_id=${filters.language_id}`
          : {};
      window.axios
        .get(`${context.state.api.baseUrl}routes?${params}`)
        .then(response => {
          context.commit('setPagesList', response.data.data);
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  getPage(context, id) {
    return new Promise(resolve => {
      window.axios
        .get(`${context.state.api.baseUrl}pages/${id}`)
        .then(response => {
          context.commit('appendPage', response.data);
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  searchPages(context, payload) {
    return new Promise(resolve => {
      window.axios
        .get(`${context.state.api.baseUrl}pages-suggest/`, {
          params: {
            term: payload.term,
          },
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  searchPageVersions(context, payload) {
    return new Promise(resolve => {
      window.axios
        .get(`${context.state.api.baseUrl}page-versions/`, {
          params: {
            term: payload.term,
            site_id: payload.site_id,
          },
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  copyPage(context, payload) {
    return new Promise(resolve => {
      window.axios
        .put(`${context.state.api.baseUrl}pages/${payload.page.id}/copy`, payload.data)
        .then(response => {
          window.deviseSettings.$bus.$emit('showMessage', {
            title: 'Success!',
            message: `${payload.data.title} has been copied from ${payload.page.title}.`,
          });
          context.commit('createPage', response.data);
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  translatePage(context, payload) {
    return new Promise(resolve => {
      window.axios
        .put(`${context.state.api.baseUrl}pages/${payload.page.id}/copy`, payload.data)
        .then(response => {
          window.deviseSettings.$bus.$emit('showMessage', {
            title: 'Success!',
            message: `${payload.data.title} has been copied for translation from ${payload.page.title}.`,
          });
          context.commit('createPage', response.data);
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  // Page versions
  copyPageVersion(context, payload) {
    return new Promise(resolve => {
      window.axios
        .post(`${context.state.api.baseUrl}page-versions`, {
          page_version_id: payload.version.id,
          name: `${payload.version.name} Copy`,
        })
        .then(response => {
          window.deviseSettings.$bus.$emit('showMessage', {
            title: 'Success!',
            message: `${payload.version.name} has been copied.`,
          });
          context.commit('createPageVersion', { page: payload.page, data: response.data.data });
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  deletePageVersion(context, payload) {
    return new Promise(resolve => {
      window.axios
        .delete(`${context.state.api.baseUrl}page-versions/${payload.version.id}`)
        .then(response => {
          window.deviseSettings.$bus.$emit('showMessage', {
            title: 'Success!',
            message: `${payload.version.name} has been deleted.`,
          });
          context.commit('deletePageVersion', { page: payload.page, version: payload.version });
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  updatePageVersion(context, payload) {
    return new Promise(resolve => {
      window.axios
        .put(`${context.state.api.baseUrl}page-versions/${payload.version.id}`, payload.version)
        .then(response => {
          context.commit('updatePageVersion', {
            page: payload.page,
            version: payload.version,
            data: response.data,
          });
          window.deviseSettings.$bus.$emit('showMessage', {
            title: 'Success!',
            message: `${payload.version.name} has been saved.`,
          });
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  // This is the save used from the page editor
  savePage(context, payload) {
    const { page } = payload;
    const { forceSave } = payload;
    const currentVersion = page.versions.find(version => version.current === true);

    let url = `${context.state.api.baseUrl}pages/${page.id}?version_id=${currentVersion.id}`;
    if (forceSave) {
      url = `${context.state.api.baseUrl}pages/${page.id}?version_id=${currentVersion.id}&force=1`;
    }

    return new Promise((resolve, reject) => {
      window.axios
        .put(url, page)
        .then(response => {
          window.deviseSettings.$bus.$emit('showMessage', {
            title: 'Success!',
            message: `${page.title} has been saved.`,
          });
          window.deviseSettings.$bus.$emit('devise-page-saved');
          context.commit('setCurrentPageVersionLastUpdate', response.data.data);
          resolve(response);
        })
        .catch(error => {
          // If the page was saved after another person saved
          if (error.response.status === 480) {
            resolve(480);
          } else {
            window.deviseSettings.$bus.$emit('showError', error);
            reject(error);
          }
        });
    });
  },

  setPreviewModeInCurrentPage(context, payload) {
    context.commit('setPreviewModeInCurrentPage', payload);
  },

  // Slices
  getSlicesDirectories(context) {
    return new Promise(resolve => {
      window.axios
        .get(`${context.state.api.baseUrl}slices-directories/`)
        .then(response => {
          context.commit('setSlicesDirectories', response.data);
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  createSlice(context, slice) {
    return new Promise(resolve => {
      window.axios
        .post(`${context.state.api.baseUrl}slices/`, slice)
        .then(response => {
          window.deviseSettings.$bus.$emit('showMessage', {
            title: 'Success!',
            message: `${slice.name} has been created.`,
          });
          context.commit('createSlice', response.data.data);
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  updateSlice(context, payload) {
    return new Promise(resolve => {
      window.axios
        .put(`${context.state.api.baseUrl}slices/${payload.slice.id}`, payload.data)
        .then(response => {
          window.deviseSettings.$bus.$emit('showMessage', {
            title: 'Success!',
            message: `${payload.data.name} has been saved.`,
          });
          context.commit('updateSlice', { slice: payload.slice, data: response.data.data });
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  deleteSlice(context, slice) {
    return new Promise(resolve => {
      window.axios
        .delete(`${context.state.api.baseUrl}slices/${slice.id}`)
        .then(response => {
          window.deviseSettings.$bus.$emit('showMessage', {
            title: 'Success!',
            message: `${slice.name} has been deleted.`,
          });
          context.commit('deleteSlice', slice);
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  copyPageSlice(context, payload) {
    return new Promise(resolve => {
      window.axios
        .post(`${context.state.api.baseUrl}page-versions/${payload.page_version_id}/slices`, {
          copy_slice_id: payload.copy_slice_id,
        })
        .then(response => {
          window.deviseSettings.$bus.$emit('showMessage', {
            title: 'Success!',
            message: `Slice was copied.`,
          });
          resolve(response);
        })
        .catch(error => {
          window.deviseSettings.$bus.$emit('showError', error);
        });
    }).catch(error => {
      window.deviseSettings.$bus.$emit('showError', error);
    });
  },

  // Checklist
  refreshChecklist(context) {
    return new Promise(resolve => {
      window.axios
        .get(`${context.state.api.baseUrl}install-checklist/`)
        .then(response => {
          context.commit('updateChecklist', response.data);
          resolve(response);
        })
        .catch(() => {
          window.deviseSettings.$bus.$emit('showError', 'Error in retrieving checklist');
        });
    }).catch(() => {
      window.deviseSettings.$bus.$emit('showError', 'Error in retrieving checklist');
    });
  },

  // Install Complete
  completeInstall(context) {
    return new Promise(resolve => {
      window.axios
        .post(`${context.state.api.baseUrl}install-complete/`)
        .then(response => {
          resolve(response);
        })
        .catch(() => {
          window.deviseSettings.$bus.$emit(
            'showError',
            'Error in completing the install. You can add DVS_MODE=active to your .env to manually complete'
          );
        });
    }).catch(() => {
      window.deviseSettings.$bus.$emit(
        'showError',
        'Error in completing the install.  You can add DVS_MODE=active to your .env to manually complete'
      );
    });
  },

  login(context, payload) {
    return new Promise(resolve => {
      window.axios
        // default laravel auth login endpoint
        .post(`/login`, payload)
        .then(response => {
          resolve(response);
        })
        .catch(() => {
          window.deviseSettings.$bus.$emit(
            'showError',
            'Error logging the new user in. Check database to ensure user was inserted correctly.'
          );
        });
    }).catch(() => {
      window.deviseSettings.$bus.$emit(
        'showError',
        'Error logging the new user in. Check database to ensure user was inserted correctly.'
      );
    });
  },
};

export default actions;
