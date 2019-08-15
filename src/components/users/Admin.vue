<template>
  <devise-workflow :workflow="workflow"></devise-workflow>
</template>

<script>
export default {
  name: 'UserAdmin',
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
          message: 'Cool! We are working on <strong>Users.</strong>.<br> What would you like to do?',
          options: [
            {
              label: 'Create a User',
              stepKey: 'create-user'
            },
            {
              label: 'Edit a User',
              stepKey: 'edit-user'
            },
            {
              label: 'Remove a User',
              stepKey: 'delete-user'
            }
          ]
        },
        {
          key: 'create-user',
          component: 'devise-user-create',
          message: 'Cool! We are working on <strong>Users.</strong>.<br> What would you like to do?',
          options: [
            {
              label: 'Create a User',
              stepKey: 'create-user'
            },
            {
              label: 'Edit a User',
              stepKey: 'edit-user'
            },
            {
              label: 'Remove a User',
              stepKey: 'delete-user'
            }
          ]
        }
      ]
    }
  }
}
</script>