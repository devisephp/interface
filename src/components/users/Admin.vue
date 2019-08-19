<template>
  <devise-workflow :workflow="workflow"></devise-workflow>
</template>

<script>
export default {
  name: 'DeviseUserAdmin',
  components: {
    DeviseWorkflow: () =>
      import(/* webpackChunkName: "devise-administration" */ '../admin/workflow/Workflow'),
  },
  data () {
    return {
      workflow: [
        {
          index: true,
          key: 'user-main-menu',
          component: 'workflow-menu',
          message: 'Cool! We are working on <strong>Users</strong>.<br> What would you like to do?',
          options: [
            {
              label: 'Create a User',
              nextStep: 'create-user'
            },
            {
              label: 'Edit a User',
              nextStep: 'search-for-user',
              stepAfterNext: 'edit-user',
            },
            {
              label: 'Remove a User',
              nextStep: 'search-for-user',
              stepAfterNext: 'delete-user',
            }
          ]
        },
        {
          key: 'create-user',
          component: 'devise-user-create',
          message: 'Fill out the fields below and create the user. All fields are required.',
          end: true
        },
        {
          key: 'edit-user',
          component: 'devise-user-edit',
          message: 'Edit what you like. If you wish to change the passwords click "Edit Password"',
          end: true
        },
        {
          key: 'delete-user',
          component: 'devise-user-delete',
          message: 'This will permenenty delete this user from the system. Are you sure you want to do this?',
          end: true
        },
        {
          key: 'search-for-user',
          component: 'workflow-search',
          message: 'Use the form below to search for the user you wish to edit',
          apiendpoint: 'users',
          searchPropertyName: 'name',
          resultsDisplayFields: [
            {
              label: 'Name',
              field: 'name'
            },
            {
              label: 'Email',
              field: 'email',
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