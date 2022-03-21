"use strict";(self["webpackChunkdevisephp_interface"]=self["webpackChunkdevisephp_interface"]||[]).push([[91],{6858:function(e,t,a){a.r(t),a.d(t,{default:function(){return r}});var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.languages.data.length?a("admin-container",{scopedSlots:e._u([{key:"message",fn:function(){return[e._v(" When you add a language to this site it is immediately enabled. Afterwards you can create translated versions of pages that will be linked to one another allowing you to provide ways to switch languages on your front-end. We "),a("a",{staticClass:"dvs-font-bold",attrs:{href:"https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes",target:"_blank"}},[e._v("highly suggest using the ISO 639-1 2 letter codes")]),e._v(" but you can technically use whatever you want. ")]},proxy:!0},{key:"content",fn:function(){return[a("div",{staticClass:"dvs-flex dvs-items-end dvs-mt-20 dvs-mb-6"},[a("fieldset",{staticClass:"dvs-fieldset dvs-mr-8 dvs-flex-grow"},[a("label",[e._v("New Language Code")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.newLanguage.code,expression:"newLanguage.code"}],staticClass:"dvs-w-full",attrs:{type:"text",maxlength:"2"},domProps:{value:e.newLanguage.code},on:{input:function(t){t.target.composing||e.$set(e.newLanguage,"code",t.target.value)}}})]),a("button",{staticClass:"dvs-btn dvs-btn-primary dvs-text-xs",attrs:{disabled:null===e.newLanguage.code},on:{click:e.requestCreateLanguage}},[e._v(" Add New Language ")])]),a("div",{staticClass:"dvs-flex dvs-flex-col"},e._l(e.localValue.data,(function(t,n){return a("div",{key:n,staticClass:"dvs-flex dvs-justify-between dvs-items-center dvs-mb-2"},[a("div",{staticClass:"dvs-text-xl dvs-font-bold dvs-mb-4 dvs-p-2 dvs-px-4 dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-rounded dvs-shadow dvs-flex-grow"},[t.editCode?e._e():[e._v(e._s(t.code))],a("fieldset",{staticClass:"dvs-fieldset"},[a("input",{directives:[{name:"show",rawName:"v-show",value:t.editCode,expression:"language.editCode"},{name:"model",rawName:"v-model",value:e.localValue.data[n].code,expression:"localValue.data[key].code"}],attrs:{type:"text"},domProps:{value:e.localValue.data[n].code},on:{input:function(t){t.target.composing||e.$set(e.localValue.data[n],"code",t.target.value)}}})])],2),a("div",{staticClass:"dvs-flex dvs-justify-between dvs-ml-2 dvs-mb-4 dvs-items-center"},[t.editCode?e._e():a("button",{staticClass:"dvs-btn dvs-btn-ghost dvs-text-gray-200 dvs-btn-xs dvs-ml-4",on:{click:function(e){t.editCode=!t.editCode}}},[a("CreateIcon")],1),t.editCode?a("button",{staticClass:"dvs-btn dvs-btn-primary dvs-text-xs dvs-mr-2",on:{click:function(t){e.localValue.data[n].editCode=e.requestUpdateLanguage(e.localValue.data[n])}}},[e._v(" Save Language Code ")]):e._e(),t.editCode?a("button",{staticClass:"dvs-btn dvs-btn-secondary dvs-text-xs",on:{click:function(e){t.editCode=!1}}},[e._v(" Cancel ")]):e._e()])])})),0)]},proxy:!0}],null,!1,2135236296)}):e._e()},s=[],d=a(4367),o=(a(1539),a(8783),a(3948),a(1249),a(629)),l={name:"LanguagesManage",components:{CreateIcon:function(){return a.e(952).then(a.bind(a,3180))},AdminContainer:function(){return Promise.all([a.e(90),a.e(737)]).then(a.bind(a,4361))}},data:function(){return{localValue:{data:[]},modulesToLoad:1,newLanguage:{code:null}}},computed:(0,d.Z)({},(0,o.Se)("devise",["languages"])),mounted:function(){this.retrieveAllLanguages()},methods:(0,d.Z)((0,d.Z)({},(0,o.nv)("devise",["getLanguages","createLanguage","updateLanguage"])),{},{requestCreateLanguage:function(){this.createLanguage(this.newLanguage)},requestUpdateLanguage:function(e){this.updateLanguage(e).then((function(){return!1}))},retrieveAllLanguages:function(){var e=this;this.getLanguages().then((function(){e.localValue=Object.assign({},e.localValue,e.languages),e.localValue.data.map((function(t){return e.$set(t,"editCode",!1),t})),window.deviseSettings.$bus.$emit("incrementLoadbar",e.modulesToLoad)}))}})},i=l,u=a(1001),c=(0,u.Z)(i,n,s,!1,null,null,null),r=c.exports}}]);
//# sourceMappingURL=devise-languages-legacy.4db936e0.js.map