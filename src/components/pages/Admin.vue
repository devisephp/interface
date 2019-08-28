<template>
  <devise-workflow :workflow="workflow"></devise-workflow>
</template>

<script>
export default {
  name: 'DevisePagesAdmin',
  components: {
    DeviseWorkflow: () =>
      import(/* webpackChunkName: "devise-administration" */ '../admin/workflow/Workflow'),
  },
  data () {
    return {
      workflow: [
        {
          index: true,
          key: 'pages-main-menu',
          component: 'workflow-menu',
          message: 'Managing <strong>Pages</strong> huh?! Nice!<br> What would you like to do?',
          options: [
            {
              label: 'Create a Page',
              nextStep: 'create-page',
            },
            {
              label: 'Copy a Page',
              nextStep: 'search-for-page',
              stepAfterNext: 'copy-page',
            },
            {
              label: 'Translate a Page',
              nextStep: 'search-for-page',
              stepAfterNext: 'translate-page',
            },
            {
              label: 'Edit a Page',
              nextStep: 'search-for-page',
              stepAfterNext: 'edit-page-index',
            },
            {
              label: 'Remove a Page',
              nextStep: 'search-for-page',
              stepAfterNext: 'delete-page',
            }
          ]
        },
        {
          key: 'create-page',
          component: 'devise-page-create',
          message: 'Fill out the fields below to create the page. All fields are required.',
          end: true
        },
        {
          key: 'copy-page',
          component: 'devise-page-copy',
          message: 'Fill out the fields below to create the page. All fields are required.',
          end: true
        },
        {
          key: 'translate-page',
          component: 'devise-page-translate',
          message: 'This will create a translated version of the page you selected.',
          end: true
        },
        {
          key: 'edit-page-index',
          component: 'workflow-menu',
          message: 'Below are all the things you can manage on this page.',
          options: [
            {
              label: 'Global Page Settings',
              nextStep: 'edit-page-settings',
              stepAfterNext: 'edit-page-index',
            },
            {
              label: 'Manage Versions',
              nextStep: 'edit-page-versions',
              stepAfterNext: 'edit-page-index',
            }
          ],
        },
        {
          key: 'edit-page-settings',
          component: 'devise-page-settings',
          message: 'These are the global settings that effect all versions of this page.',
        },
        {
          key: 'edit-page-versions',
          component: 'devise-page-versions',
          message: 'Page versions allow you to work on and publish a new version of a page without interruption.',
        },
        {
          key: 'delete-page',
          component: 'devise-page-delete',
          message: 'This will permenenty delete this page from the system. Are you sure you want to do this?',
          end: true
        },
        {
          key: 'search-for-page',
          component: 'workflow-search',
          message: 'Use the form below to search for the page you wish to manage',
          apiendpoint: 'pages/search',
          app: false,
          searchPropertyName: 'term',
          resultsDisplayFields: [
            {
              label: 'Title',
              field: 'title'
            },
            {
              label: 'Slug',
              field: 'slug',
            },
            {
              label: 'Created At',
              field: 'created_at',
              dateFormat: 'MMMM D, YYYY @ h:mm a'
            },
          ],
        }
      ]
    }
  }
}
</script>