<template>
  <devise-workflow :workflow="workflow"></devise-workflow>
</template>

<script>
export default {
  name: 'DeviseRedirectsAdmin',
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
          message: 'Managing <strong>Redirects</strong> huh?! Nice!<br> What would you like to do?',
          options: [
            {
              label: 'Create a 301 Redirect',
              nextStep: 'create-redirect',
            },
            {
              label: 'Manage a 301 Redirect',
              nextStep: 'search-for-redirect',
              stepAfterNext: 'edit-redirect',
            },
            {
              label: 'Delete a 301 Redirect',
              nextStep: 'search-for-redirect',
              stepAfterNext: 'delete-redirect',
            },
          ]
        },
        {
          key: 'create-redirect',
          component: 'devise-redirect-create',
          message: 'Fill out the fields below to create the redirect. All fields are required.',
          end: true
        },
        {
          key: 'edit-redirect',
          component: 'devise-redirect-edit',
          message: 'Manage the redirect settings using the fields below.',
          end: true
        },
        {
          key: 'delete-redirect',
          component: 'devise-redirect-delete',
          message: 'Are you sure you want to delete this redirect? This will delete all related information and cannot be undone.',
          end: true
        },
        {
          key: 'search-for-redirect',
          component: 'workflow-search',
          message: 'Use the form below to search for the redirect you wish to manage',
          apiendpoint: 'redirects',
          searchPropertyName: 'term',
          resultsDisplayFields: [
            {
              label: 'From URL',
              field: 'from_url'
            },
            {
              label: 'To URL',
              field: 'to_url',
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