(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["devise-users"],{"88c6":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("devise-workflow",{attrs:{workflow:e.workflow}})},o=[],n=(a("d3b7"),a("3ca3"),a("ddb0"),{name:"DeviseUserAdmin",components:{DeviseWorkflow:function(){return Promise.all([a.e("devise-pages"),a.e("devise-administration")]).then(a.bind(null,"66ed"))}},data:function(){return{workflow:[{index:!0,key:"user-main-menu",component:"workflow-menu",message:"Cool! We are working on <strong>Users</strong>.<br> What would you like to do?",options:[{label:"Create a User",nextStep:"create-user"},{label:"Edit a User",nextStep:"search-for-user",stepAfterNext:"edit-user"},{label:"Remove a User",nextStep:"search-for-user",stepAfterNext:"delete-user"}]},{key:"create-user",component:"devise-user-create",message:"Fill out the fields below and create the user. All fields are required.",end:!0},{key:"edit-user",component:"devise-user-edit",message:'Edit what you like. If you wish to change the passwords click "Edit Password"',end:!0},{key:"delete-user",component:"devise-user-delete",message:"This will permenenty delete this user from the system. Are you sure you want to do this?",end:!0},{key:"search-for-user",component:"workflow-search",message:"Use the form below to search for the user you wish to edit",apiendpoint:"users",searchPropertyName:"name",app:!1,resultsDisplayFields:[{label:"Name",field:"name"},{label:"Email",field:"email"},{label:"Created At",field:"created_at",dateFormat:"MMMM D, YYYY @ h:mm a"}]}]}}}),r=n,i=a("2877"),l=Object(i["a"])(r,s,o,!1,null,null,null);t["default"]=l.exports},b36c:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("devise-workflow",{attrs:{workflow:e.workflow}})},o=[],n=(a("d3b7"),a("3ca3"),a("ddb0"),{name:"DevisePagesAdmin",components:{DeviseWorkflow:function(){return Promise.all([a.e("devise-pages"),a.e("devise-administration")]).then(a.bind(null,"66ed"))}},data:function(){return{workflow:[{index:!0,key:"pages-main-menu",component:"workflow-menu",message:"Managing <strong>Pages</strong> huh?! Nice!<br> What would you like to do?",options:[{label:"Create a Page",nextStep:"create-page"},{label:"Copy a Page",nextStep:"search-for-page",stepAfterNext:"copy-page"},{label:"Translate a Page",nextStep:"search-for-page",stepAfterNext:"translate-page"},{label:"Edit a Page",nextStep:"search-for-page",stepAfterNext:"edit-page-index"},{label:"Remove a Page",nextStep:"search-for-page",stepAfterNext:"delete-page"}]},{key:"create-page",component:"devise-page-create",message:"Fill out the fields below to create the page. All fields are required.",end:!0},{key:"copy-page",component:"devise-page-copy",message:"Fill out the fields below to create the page. All fields are required.",end:!0},{key:"translate-page",component:"devise-page-translate",message:"This will create a translated version of the page you selected.",end:!0},{key:"edit-page-index",component:"workflow-menu",message:"Below are all the things you can manage on this page.",options:[{label:"Global Page Settings",nextStep:"edit-page-settings",stepAfterNext:"edit-page-index"},{label:"Manage Versions",nextStep:"edit-page-versions",stepAfterNext:"edit-page-index"}]},{key:"jumpto-edit-page",component:"devise-page-jump-to-edit",message:"Juuuuust a moment. Loading page data.",nextStep:"edit-page-index"},{key:"edit-page-settings",component:"devise-page-settings",message:"These are the global settings that effect all versions of this page."},{key:"edit-page-versions",component:"devise-page-versions",message:"Page versions allow you to work on and publish a new version of a page without interruption."},{key:"delete-page",component:"devise-page-delete",message:"This will permenenty delete this page from the system. Are you sure you want to do this?",end:!0},{key:"search-for-page",component:"workflow-search",message:"Find the page you wish to manage",apiendpoint:"pages/admin-search",allRecordsApiendpoint:"pages/admin-search",app:!1,searchPropertyName:"term",resultsDisplayFields:[{label:"Title",field:"title"},{label:"Slug",field:"slug"},{label:"Created At",field:"created_at",dateFormat:"MMMM D, YYYY @ h:mm a"}]}]}}}),r=n,i=a("2877"),l=Object(i["a"])(r,s,o,!1,null,null,null);t["default"]=l.exports}}]);
//# sourceMappingURL=devise-users.51659cef.js.map