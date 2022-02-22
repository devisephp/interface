"use strict";(self["webpackChunkdevisephp_interface"]=self["webpackChunkdevisephp_interface"]||[]).push([[761],{1865:function(e,s,t){t.r(s),t.d(s,{default:function(){return u}});var a=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("form",{on:{submit:function(e){e.preventDefault()}}},[t("fieldset",{staticClass:"dvs-fieldset dvs-mb-4"},[t("label",[e._v("Name")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.newUser.name,expression:"newUser.name"}],staticClass:"dvs-w-full",attrs:{type:"text",placeholder:"Name of the User"},domProps:{value:e.newUser.name},on:{input:function(s){s.target.composing||e.$set(e.newUser,"name",s.target.value)}}})]),t("fieldset",{staticClass:"dvs-fieldset dvs-mb-4"},[t("label",[e._v("Email")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.newUser.email,expression:"newUser.email"}],staticClass:"dvs-w-full",attrs:{type:"text",placeholder:"Email of the User"},domProps:{value:e.newUser.email},on:{input:function(s){s.target.composing||e.$set(e.newUser,"email",s.target.value)}}})]),t("fieldset",{staticClass:"dvs-fieldset dvs-mb-4"},[t("label",[e._v("Password")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.newUser.password,expression:"newUser.password"}],staticClass:"dvs-w-full",attrs:{type:"password"},domProps:{value:e.newUser.password},on:{input:function(s){s.target.composing||e.$set(e.newUser,"password",s.target.value)}}})]),t("fieldset",{staticClass:"dvs-fieldset dvs-mb-4"},[t("label",[e._v("Confirm Password")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.newUser.password_confirmation,expression:"newUser.password_confirmation"}],staticClass:"dvs-w-full",attrs:{type:"password"},domProps:{value:e.newUser.password_confirmation},on:{input:function(s){s.target.composing||e.$set(e.newUser,"password_confirmation",s.target.value)}}})]),t("button",{staticClass:"dvs-btn dvs-btn-primary dvs-text-xs mr-2",attrs:{disabled:e.createInvalid},on:{click:e.requestCreateUser}},[e._v("Create")]),t("button",{staticClass:"dvs-btn dvs-btn-secondary dvs-text-xs",on:{click:e.cancel}},[e._v("Cancel")])])},l=[],n=t(4367),o=(t(8309),t(629)),r={name:"DeviseUsersCreate",data:function(){return{modulesToLoad:1,showCreate:!1,newUser:{name:null,email:null,password:null,password_confirmation:null}}},computed:{createInvalid:function(){return null===this.newUser.name||null===this.newUser.email||null===this.newUser.password||null===this.newUser.password_confirmation||this.newUser.password!==this.newUser.password_confirmation}},methods:(0,n.Z)((0,n.Z)({},(0,o.nv)("devise",["createGeneric"])),{},{requestCreateUser:function(){var e=this;this.createGeneric({config:{apiendpoint:"users",recordLabel:"name"},record:this.newUser}).then((function(){e.$emit("done")}))},cancel:function(){this.$emit("cancel")}})},i=r,d=t(1001),c=(0,d.Z)(i,a,l,!1,null,null,null),u=c.exports},4243:function(e,s,t){t.r(s),t.d(s,{default:function(){return u}});var a=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"flex justify-center"},[t("button",{staticClass:"dvs-btn dvs-btn-primary dvs-btn-lg mr-4",on:{click:e.requestDeleteUser}},[e._v("Remove User")])])},l=[],n=t(4367),o=(t(1539),t(3948),t(629)),r={name:"DeviseUsersDelete",props:{values:{type:Object,required:!0}},methods:(0,n.Z)((0,n.Z)({},(0,o.nv)("devise",["deleteGeneric"])),{},{requestDeleteUser:function(){var e=this;this.deleteGeneric({config:{apiendpoint:"users",recordLabel:"name"},record:this.values}).then((function(){e.$emit("done")}))},cancel:function(){this.$emit("cancel")}})},i=r,d=t(1001),c=(0,d.Z)(i,a,l,!1,null,null,null),u=c.exports},9721:function(e,s,t){t.r(s),t.d(s,{default:function(){return u}});var a=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("form",{on:{submit:function(e){e.preventDefault()}}},[t("fieldset",{staticClass:"dvs-fieldset dvs-mb-4"},[t("label",[e._v("Name of User")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.localValue.name,expression:"localValue.name"}],attrs:{type:"text",autocomplete:"off",placeholder:"Name of the User"},domProps:{value:e.localValue.name},on:{input:function(s){s.target.composing||e.$set(e.localValue,"name",s.target.value)}}})]),t("fieldset",{staticClass:"dvs-fieldset dvs-mb-4"},[t("label",[e._v("Email")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.localValue.email,expression:"localValue.email"}],attrs:{type:"text",autocomplete:"off",placeholder:"Email of the User"},domProps:{value:e.localValue.email},on:{input:function(s){s.target.composing||e.$set(e.localValue,"email",s.target.value)}}})]),e.showPassword?e._e():t("fieldset",{staticClass:"dvs-fieldset dvs-mb-4"},[t("button",{staticClass:"dvs-btn dvs-btn-secondary ",on:{click:function(s){e.showPassword=!e.showPassword}}},[e._v("Edit Password")])]),e.showPassword?[t("fieldset",{staticClass:"dvs-fieldset dvs-mb-4"},[t("label",[e._v("Password")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.localValue.password,expression:"localValue.password"}],attrs:{type:"password",autocomplete:"off"},domProps:{value:e.localValue.password},on:{input:function(s){s.target.composing||e.$set(e.localValue,"password",s.target.value)}}})]),t("fieldset",{staticClass:"dvs-fieldset dvs-mb-4"},[t("label",[e._v("Password Confirm")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.localValue.password_confirmation,expression:"localValue.password_confirmation"}],attrs:{type:"password",autocomplete:"off"},domProps:{value:e.localValue.password_confirmation},on:{input:function(s){s.target.composing||e.$set(e.localValue,"password_confirmation",s.target.value)}}})])]:e._e(),t("button",{staticClass:"dvs-btn dvs-btn-primary dvs-text-xs mr-2",attrs:{disabled:e.editInvalid},on:{click:e.requestEditUser}},[e._v("Edit User")]),t("button",{staticClass:"dvs-btn dvs-btn-secondary dvs-text-xs",on:{click:e.cancel}},[e._v("Cancel")])],2)},l=[],n=t(4367),o=(t(8309),t(1539),t(3948),t(629)),r={name:"DeviseUsersEdit",props:{values:{type:Object,required:!0}},data:function(){return{localValue:{},showPassword:!1}},computed:{editInvalid:function(){return null===this.localValue.name||null===this.localValue.email||null===this.localValue.password||null===this.localValue.password_confirmation||this.localValue.password!==this.localValue.password_confirmation}},mounted:function(){this.localValue=(0,n.Z)({},this.values)},methods:(0,n.Z)((0,n.Z)({},(0,o.nv)("devise",["updateGeneric"])),{},{requestEditUser:function(){var e=this;this.updateGeneric({config:{apiendpoint:"users",recordLabel:"name"},record:this.localValue}).then((function(){e.$emit("done")}))},cancel:function(){this.$emit("cancel")}})},i=r,d=t(1001),c=(0,d.Z)(i,a,l,!1,null,null,null),u=c.exports}}]);
//# sourceMappingURL=devise-administration-users-legacy.79777718.js.map