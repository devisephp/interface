<template>
  <devise-workflow :workflow="workflow"></devise-workflow>
</template>

<script>
export default {
  name: 'DeviseSitesAdmin',
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
          message: 'Managing <strong>Sites</strong>?! That\'s exciting! Two sites at the same time!',
          options: [
            {
              label: 'Manage a Site',
              nextStep: 'search-for-site',
              stepAfterNext: 'edit-site',
            },
            {
              label: 'Create a Site',
              nextStep: 'create-site',
            },
            {
              label: 'Delete a Site',
              nextStep: 'search-for-site',
              stepAfterNext: 'create-site',
            },
          ]
        },
        {
          key: 'create-site',
          component: 'devise-site-create',
          message: 'Fill out the fields below to create the site. All fields are required.',
          end: true
        },
        {
          key: 'edit-site',
          component: 'devise-site-edit',
          message: 'Manage the site settings using the fields below.',
          end: true
        },
        {
          key: 'delete-site',
          component: 'devise-site-delete',
          message: 'Are you sure you want to delete this site? This will delete all related information and cannot be undone.',
          end: true
        },
        {
          key: 'search-for-site',
          component: 'workflow-search',
          message: 'Use the form below to search for the site you wish to manage',
          apiendpoint: 'sites',
          searchPropertyName: 'name',
          app: false,
          resultsDisplayFields: [
            {
              label: 'Name',
              field: 'name'
            },
            {
              label: 'Domain',
              field: 'domain',
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