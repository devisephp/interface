(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["devise-languages"],{f5b6:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.languages.data.length?a("div",[a("div",{attrs:{id:"devise-admin-content"}},[a("h3",{staticClass:"dvs-mb-8 dvs-pr-16",style:{color:e.theme.panel.color}},[e._v("Add Language")]),a("help",{staticClass:"dvs-mb-8"},[e._v("\n      When you add a language to this site it is immediately enabled. Afterwards you can create translated versions of pages that will be linked to one another allowing you to provide ways to switch languages on your front-end. We\n      "),a("a",{staticClass:"dvs-font-bold",attrs:{href:"https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes",target:"_blank"}},[e._v("highly suggest using the ISO 639-1 2 letter codes")]),e._v(" but you can technically use whatever you want.\n    ")]),a("fieldset",{staticClass:"dvs-fieldset dvs-mb-4"},[a("label",[e._v("New Language Code")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.newLanguage.code,expression:"newLanguage.code"}],attrs:{type:"text",maxlength:"2"},domProps:{value:e.newLanguage.code},on:{input:function(t){t.target.composing||e.$set(e.newLanguage,"code",t.target.value)}}})]),a("button",{staticClass:"dvs-btn dvs-mb-8",style:e.theme.actionButton,attrs:{disabled:null===e.newLanguage.code},on:{click:e.requestCreateLanguage}},[e._v("Save New Language")]),a("h3",{staticClass:"dvs-mb-8 dvs-pr-16",style:{color:e.theme.panel.color}},[e._v("Existing Languages")]),a("div",{staticClass:"dvs-mb-12 dvs-flex dvs-flex-col"},e._l(e.localValue.data,function(t,n){return a("div",{key:n,staticClass:"dvs-flex dvs-justify-between dvs-items-center dvs-mb-2"},[a("div",{staticClass:"dvs-text-xl dvs-font-bold dvs-mb-4"},[t.editCode?e._e():[e._v(e._s(t.code))],a("fieldset",{staticClass:"dvs-fieldset"},[a("input",{directives:[{name:"show",rawName:"v-show",value:t.editCode,expression:"language.editCode"},{name:"model",rawName:"v-model",value:e.localValue.data[n].code,expression:"localValue.data[key].code"}],attrs:{type:"text"},domProps:{value:e.localValue.data[n].code},on:{input:function(t){t.target.composing||e.$set(e.localValue.data[n],"code",t.target.value)}}})])],2),a("div",{staticClass:"dvs-flex dvs-justify-between dvs-items-center"},[t.editCode?e._e():a("button",{staticClass:"dvs-btn dvs-btn-xs dvs-ml-4",style:e.theme.actionButtonGhost,on:{click:function(e){t.editCode=!t.editCode}}},[a("CreateIcon")],1),t.editCode?a("button",{staticClass:"dvs-btn dvs-mr-2",style:e.theme.actionButton,on:{click:function(t){e.localValue.data[n].editCode=e.requestUpdateLanguage(e.localValue.data[n])}}},[e._v("Save Language Code")]):e._e(),t.editCode?a("button",{staticClass:"dvs-btn",style:e.theme.actionButtonGhost,on:{click:function(e){t.editCode=!1}}},[e._v("Cancel")]):e._e()])])}),0)],1)]):e._e()},s=[],o=a("5176"),d=a.n(o),l=a("cebc"),i=a("2f62"),u={name:"LanguagesManage",data:function(){return{localValue:{data:[]},modulesToLoad:1,newLanguage:{code:null}}},mounted:function(){this.retrieveAllLanguages()},methods:Object(l["a"])({},Object(i["b"])("devise",["getLanguages","createLanguage","updateLanguage"]),{requestCreateLanguage:function(){this.createLanguage(this.newLanguage)},requestUpdateLanguage:function(e){this.updateLanguage(e).then(function(){return!1})},retrieveAllLanguages:function(){var e=this;this.getLanguages().then(function(){e.localValue=d()({},e.localValue,e.languages),e.localValue.data.map(function(t){return e.$set(t,"editCode",!1),t}),window.deviseSettings.$bus.$emit("incrementLoadbar",e.modulesToLoad)})}}),computed:Object(l["a"])({},Object(i["c"])("devise",["languages","settingsMenu"])),components:{CreateIcon:function(){return a.e("devise-icons").then(a.bind(null,"3483"))}}},c=u,g=a("0c7c"),r=Object(g["a"])(c,n,s,!1,null,null,null);t["default"]=r.exports}}]);
//# sourceMappingURL=devise-languages.js.map