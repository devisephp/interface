"use strict";(self["webpackChunkdevisephp_interface"]=self["webpackChunkdevisephp_interface"]||[]).push([[648],{9659:function(e,t,s){s.r(t),s.d(t,{default:function(){return d}});var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("devise-workflow",{attrs:{workflow:e.workflow}})},a=[],n=(s(1539),s(8783),s(3948),{name:"DeviseSitesAdmin",components:{DeviseWorkflow:function(){return Promise.all([s.e(90),s.e(737)]).then(s.bind(s,1858))}},data:function(){return{workflow:[{index:!0,key:"pages-main-menu",component:"workflow-menu",message:"Managing <strong>Sites</strong>?! That's exciting! Two sites at the same time!",options:[{label:"Manage a Site",nextStep:"search-for-site",stepAfterNext:"edit-site"},{label:"Create a Site",nextStep:"create-site"},{label:"Delete a Site",nextStep:"search-for-site",stepAfterNext:"create-site"}]},{key:"create-site",component:"devise-site-create",message:"Fill out the fields below to create the site. All fields are required.",end:!0},{key:"edit-site",component:"devise-site-edit",message:"Manage the site settings using the fields below.",end:!0},{key:"delete-site",component:"devise-site-delete",message:"Are you sure you want to delete this site? This will delete all related information and cannot be undone.",end:!0},{key:"search-for-site",component:"workflow-search",message:"Use the form below to search for the site you wish to manage",apiendpoint:"sites",searchPropertyName:"name",app:!1,resultsDisplayFields:[{label:"Name",field:"name"},{label:"Domain",field:"domain"},{label:"Created At",field:"created_at",dateFormat:"MMMM D, YYYY @ h:mm a"}]}]}}}),o=n,r=s(1001),l=(0,r.Z)(o,i,a,!1,null,null,null),d=l.exports}}]);
//# sourceMappingURL=devise-sites-legacy.ed8c9360.js.map