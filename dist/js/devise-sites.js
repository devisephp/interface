(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["devise-sites"],{"61e4":function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{attrs:{id:"devise-admin-content"}},[a("div",{staticClass:"devise-admin-action-bar"},[a("button",{staticClass:"dvs-btn dvs-btn-sm dvs-mx-1",style:e.theme.actionButton,on:{click:function(t){t.preventDefault(),e.showCreate=!0}}},[e._v("Create New Site")]),a("button",{staticClass:"dvs-btn dvs-btn-sm dvs-mx-1",style:e.theme.actionButton,on:{click:function(t){return t.preventDefault(),e.requestSyncSites(t)}}},[e._v("Sync Sites with Mothership")])]),a("h2",{staticClass:"dvs-mb-8",style:{color:e.theme.panel.color}},[e._v("Current Sites")]),a("help",{staticClass:"dvs-mb-10"},[e._v("Here you can add and manage sites under this application. This means that you can add new domains, change themes for those domains, and add languages to those sites to make them more impacting for your users")]),a("div",{staticClass:"dvs-flex dvs-flex-wrap"},e._l(e.sites.data,function(t){return a("div",{key:t.id,staticClass:"dvs-mb-6 dvs-flex dvs-justify-between dvs-items-center dvs-w-1/2"},[a("div",{staticClass:"dvs-p-8 dvs-text-center dvs-rounded",style:e.theme.panelCard},[a("div",{staticClass:"dvs-text-base"},[a("div",{staticClass:"dvs-mb-2 dvs-text-sm dvs-uppercase"},[e._v(e._s(t.name))]),a("div",{staticClass:"dvs-mb-4 dvs-text-sm dvs-opacity-75"},[e._v("Domain: "+e._s(t.domain))])]),a("div",{staticClass:"dvs-mb-8 dvs-flex dvs-flex-wrap dvs-justify-center"},e._l(t.languages,function(t){return a("span",{key:t.id,staticClass:"dvs-mb-2 dvs-mr-2 dvs-tag dvs-bg-grey-lighter dvs-text-black",class:{"dvs-bg-green-dark dvs-text-white":t.default}},[e._v(e._s(t.code))])}),0),a("div",{staticClass:"dvs-flex dvs-justify-center"},[a("a",{staticClass:"dvs-btn dvs-mr-2",style:e.theme.actionButtonGhost,attrs:{href:"//"+t.domain}},[e._v("Go")]),a("button",{staticClass:"dvs-btn dvs-mr-2",style:e.theme.actionButtonGhost,on:{click:function(a){return e.showEditSite(t)}}},[e._v("Edit")]),a("button",{directives:[{name:"devise-alert-confirm",rawName:"v-devise-alert-confirm",value:{callback:e.requestDeleteSite,arguments:t,message:"Are you sure you want to delete this site?"},expression:"{callback: requestDeleteSite, arguments: site, message: 'Are you sure you want to delete this site?'}"}],staticClass:"dvs-btn",style:e.theme.actionButtonGhost},[e._v("Delete")])])])])}),0)],1),a("transition",{attrs:{name:"dvs-fade"}},[a("portal",{attrs:{to:"devise-root"}},[e.showCreate?a("devise-modal",{staticClass:"dvs-z-50",on:{close:function(t){e.showCreate=!1}}},[a("h2",{staticClass:"dvs-mb-8",style:{color:e.theme.panel.color}},[e._v("Create new site")]),a("fieldset",{staticClass:"dvs-fieldset dvs-mb-4"},[a("label",[e._v("Name")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.newSite.name,expression:"newSite.name"}],attrs:{type:"text",placeholder:"Name of the Site"},domProps:{value:e.newSite.name},on:{input:function(t){t.target.composing||e.$set(e.newSite,"name",t.target.value)}}})]),a("help",{staticClass:"dvs-mb-8"},[e._v('The domain should not include the http or https:// protocol identifier. So your site entry could be "my-super-awesome-site.com" or "sub-domain.my-super-awesome-site.com". To Support development environments you can override these values in your .env file in the root of your project with something like "SITE_1_DOMAIN=my-super-awesome-site.test" for your local development or staging.')]),a("fieldset",{staticClass:"dvs-fieldset dvs-mb-4"},[a("label",[e._v("Domain")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.newSite.domain,expression:"newSite.domain"}],attrs:{type:"text",placeholder:"Domain of the Site"},domProps:{value:e.newSite.domain},on:{input:function(t){t.target.composing||e.$set(e.newSite,"domain",t.target.value)}}})]),a("fieldset",{staticClass:"dvs-fieldset dvs-mb-4"},[a("label",[e._v("Language")]),a("select",{directives:[{name:"model",rawName:"v-model",value:e.newSite.language_id,expression:"newSite.language_id"}],attrs:{type:"text"},on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.$set(e.newSite,"language_id",t.target.multiple?a:a[0])}}},[a("option",{domProps:{value:null}},[e._v("Select a Default Language")]),e._l(e.languages,function(t){return a("option",{key:t.id,domProps:{value:null}},[e._v(e._s(t.name))])})],2)]),a("button",{staticClass:"dvs-btn",style:e.theme.actionButton,attrs:{disabled:e.createInvalid},on:{click:e.requestCreateSite}},[e._v("Create")]),a("button",{staticClass:"dvs-btn",style:e.theme.actionButtonGhost,on:{click:function(t){e.showCreate=!1}}},[e._v("Cancel")])],1):e._e()],1)],1)],1)},s=[],o=(a("7f7f"),a("7514"),a("cebc")),n=a("2f62"),i={name:"SitesIndex",data:function(){return{modulesToLoad:2,showCreate:!1,showEdit:!1,editAddLanguage:null,editSite:{id:null,name:null,domain:null,languages:[]},newSite:{name:null,domain:null,language_id:null}}},mounted:function(){this.retrieveAllSites(),this.retrieveAllLanguages()},methods:Object(o["a"])({},Object(n["b"])("devise",["syncSites","getSites","getLanguages","createSite","updateSite","deleteSite"]),{requestSyncSites:function(){null!==this.mothershipApiKey&&this.syncSites(this.sites.data)},requestCreateSite:function(){var e=this;this.createSite(this.newSite).then(function(){e.newSite.name=null,e.newSite.domain=null,e.showCreate=!1,e.requestSyncSites()})},showEditSite:function(e){this.$router.push({name:"devise-sites-edit",params:{siteId:e.id}})},requestEditSite:function(){var e=this;this.updateSite({site:this.originalSite(this.editSite.id),data:this.editSite}).then(function(){e.editSite.id=null,e.editSite.name=null,e.editSite.domain=null,e.showEdit=!1})},requestDeleteSite:function(e){var t=this;this.deleteSite(e).then(function(){t.retrieveAllSites()})},retrieveAllSites:function(){var e=this,t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.getSites().then(function(){t&&window.deviseSettings.$bus.$emit("incrementLoadbar",e.modulesToLoad)})},retrieveAllLanguages:function(){var e=this,t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.getLanguages().then(function(){t&&window.deviseSettings.$bus.$emit("incrementLoadbar",e.modulesToLoad)})},addEditLanguage:function(){this.editAddLanguage.default=0,this.editSite.languages.push(this.editAddLanguage),this.editAddLanguage=null},setDefaultLanguage:function(e){this.editSite.languages.map(function(t){return t.default=0,t.id===e.id?(t.default=1,1):0})},originalSite:function(e){return this.sites.data.find(function(t){return t.id===e})}}),computed:Object(o["a"])({},Object(n["c"])("devise",["sites","languages","mothershipApiKey","settingsMenu"]),{createInvalid:function(){return null===this.newSite.name||null===this.newSite.domain},editInvalid:function(){return null===this.editSite.name||null===this.editSite.domain},languagesNotInEditSite:function(){var e=this;return this.languages.data.filter(function(t){var a=e.editSite.languages.filter(function(e){return e.id===t.id});return 0===a.length})}}),components:{DeviseModal:function(){return Promise.all([a.e("devise-editors~devise-utilities"),a.e("devise-utilities")]).then(a.bind(null,"025b"))}}},r=i,c=a("0c7c"),d=Object(c["a"])(r,l,s,!1,null,null,null);t["default"]=d.exports},bf79:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"dvs-mb-10"},[a("fieldset",{staticClass:"dvs-fieldset"},[a("label",[e._v("Presets")]),a("select",{on:{change:function(t){return e.selectPreset(t)}}},[a("option",{attrs:{value:""}},[e._v("Select a Preset")]),e._l(e.presets,function(t,l){return a("option",{key:l,domProps:{value:l}},[e._v(e._s(l))])})],2)])]),a("div",{staticClass:"dvs-flex dvs-w-full"},[a("div",{staticClass:"dvs-w-1/4 dvs-pr-8"},[a("h6",{staticClass:"dvs-mb-2",style:{color:e.theme.panel.color}},[e._v("Panel")]),a("color-editor",{staticClass:"dvs-mb-4",attrs:{options:{label:"Panel Top Color",hidePreview:!0,swatch:!0}},model:{value:e.localValue.panelTop,callback:function(t){e.$set(e.localValue,"panelTop",t)},expression:"localValue.panelTop"}}),a("color-editor",{staticClass:"dvs-mb-4",attrs:{options:{label:"Panel Bottom Color",hidePreview:!0,swatch:!0}},model:{value:e.localValue.panelBottom,callback:function(t){e.$set(e.localValue,"panelBottom",t)},expression:"localValue.panelBottom"}}),a("color-editor",{staticClass:"dvs-mb-4",attrs:{options:{label:"Panel Text Color",hidePreview:!0,swatch:!0}},model:{value:e.localValue.panelText,callback:function(t){e.$set(e.localValue,"panelText",t)},expression:"localValue.panelText"}}),a("color-editor",{staticClass:"dvs-mb-4",attrs:{options:{label:"Panel Action Color",hidePreview:!0,swatch:!0}},model:{value:e.localValue.panelAction,callback:function(t){e.$set(e.localValue,"panelAction",t)},expression:"localValue.panelAction"}}),a("color-editor",{staticClass:"dvs-mb-4",attrs:{options:{label:"Panel Sidebar Background",hidePreview:!0,swatch:!0}},model:{value:e.localValue.panelSidebarBackground,callback:function(t){e.$set(e.localValue,"panelSidebarBackground",t)},expression:"localValue.panelSidebarBackground"}}),a("color-editor",{staticClass:"dvs-mb-4",attrs:{options:{label:"Panel Sidebar Icon Color",hidePreview:!0,swatch:!0}},model:{value:e.localValue.panelSidebarText,callback:function(t){e.$set(e.localValue,"panelSidebarText",t)},expression:"localValue.panelSidebarText"}}),a("color-editor",{staticClass:"dvs-mb-4",attrs:{options:{label:"Panel Sidebar Action Color",hidePreview:!0,swatch:!0}},model:{value:e.localValue.panelSidebarAction,callback:function(t){e.$set(e.localValue,"panelSidebarAction",t)},expression:"localValue.panelSidebarAction"}}),a("color-editor",{staticClass:"dvs-mb-4",attrs:{options:{label:"Panel Card Background",hidePreview:!0,swatch:!0}},model:{value:e.localValue.panelCardBackground,callback:function(t){e.$set(e.localValue,"panelCardBackground",t)},expression:"localValue.panelCardBackground"}}),a("color-editor",{staticClass:"dvs-mb-4",attrs:{options:{label:"Panel Card Text",hidePreview:!0,swatch:!0}},model:{value:e.localValue.panelCardText,callback:function(t){e.$set(e.localValue,"panelCardText",t)},expression:"localValue.panelCardText"}}),a("h6",{staticClass:"dvs-mb-2 dvs-mt-8",style:{color:e.theme.panel.color}},[e._v("Buttons")]),a("color-editor",{staticClass:"dvs-mb-4",attrs:{options:{label:"Action Button Text",hidePreview:!0,swatch:!0}},model:{value:e.localValue.buttonsActionText,callback:function(t){e.$set(e.localValue,"buttonsActionText",t)},expression:"localValue.buttonsActionText"}}),a("color-editor",{staticClass:"dvs-mb-4",attrs:{options:{label:"Action Button Background",hidePreview:!0,swatch:!0}},model:{value:e.localValue.buttonsActionBackground,callback:function(t){e.$set(e.localValue,"buttonsActionBackground",t)},expression:"localValue.buttonsActionBackground"}}),a("color-editor",{staticClass:"dvs-mb-4",attrs:{options:{label:"Secondary Button Text",hidePreview:!0,swatch:!0}},model:{value:e.localValue.buttonsSecondaryText,callback:function(t){e.$set(e.localValue,"buttonsSecondaryText",t)},expression:"localValue.buttonsSecondaryText"}}),a("color-editor",{staticClass:"dvs-mb-4",attrs:{options:{label:"Secondary Button Background",hidePreview:!0,swatch:!0}},model:{value:e.localValue.buttonsSecondaryBackground,callback:function(t){e.$set(e.localValue,"buttonsSecondaryBackground",t)},expression:"localValue.buttonsSecondaryBackground"}}),a("h6",{staticClass:"dvs-mb-2 dvs-mt-8",style:{color:e.theme.panel.color}},[e._v("Help Blocks")]),a("color-editor",{staticClass:"dvs-mb-4",attrs:{options:{label:"Background Color",hidePreview:!0,swatch:!0}},model:{value:e.localValue.helpBackground,callback:function(t){e.$set(e.localValue,"helpBackground",t)},expression:"localValue.helpBackground"}}),a("color-editor",{staticClass:"dvs-mb-4",attrs:{options:{label:"Text Color",hidePreview:!0,swatch:!0}},model:{value:e.localValue.helpText,callback:function(t){e.$set(e.localValue,"helpText",t)},expression:"localValue.helpText"}}),a("h6",{staticClass:"dvs-mb-2 dvs-mt-8",style:{color:e.theme.panel.color}},[e._v("Chart Colors")]),a("color-editor",{staticClass:"dvs-mb-4",attrs:{options:{label:"Chart Color 1",hidePreview:!0,swatch:!0}},model:{value:e.localValue.chartColor1,callback:function(t){e.$set(e.localValue,"chartColor1",t)},expression:"localValue.chartColor1"}}),a("color-editor",{staticClass:"dvs-mb-4",attrs:{options:{label:"Chart Color 2",hidePreview:!0,swatch:!0}},model:{value:e.localValue.chartColor2,callback:function(t){e.$set(e.localValue,"chartColor2",t)},expression:"localValue.chartColor2"}}),a("color-editor",{staticClass:"dvs-mb-4",attrs:{options:{label:"Chart Color 3",hidePreview:!0,swatch:!0}},model:{value:e.localValue.chartColor3,callback:function(t){e.$set(e.localValue,"chartColor3",t)},expression:"localValue.chartColor3"}}),a("color-editor",{staticClass:"dvs-mb-4",attrs:{options:{label:"Chart Color 4",hidePreview:!0,swatch:!0}},model:{value:e.localValue.chartColor4,callback:function(t){e.$set(e.localValue,"chartColor4",t)},expression:"localValue.chartColor4"}}),a("color-editor",{staticClass:"dvs-mb-4",attrs:{options:{label:"Chart Color 5",hidePreview:!0,swatch:!0}},model:{value:e.localValue.chartColor5,callback:function(t){e.$set(e.localValue,"chartColor5",t)},expression:"localValue.chartColor5"}}),a("color-editor",{staticClass:"dvs-mb-4",attrs:{options:{label:"Chart Color 6",hidePreview:!0,swatch:!0}},model:{value:e.localValue.chartColor6,callback:function(t){e.$set(e.localValue,"chartColor6",t)},expression:"localValue.chartColor6"}})],1),a("div",{staticClass:"dvs-w-3/4 dvs-mb-8"},[a("h3",{staticClass:"dvs-mb-4",style:{color:e.theme.panel.color}},[e._v("Mini-Preview of the Editor")]),a("div",{staticClass:"dvs-bg-grey-light dvs-rounded dvs-w-full dvs-overflow-hidden dvs-p-1 dvs-flex dvs-flex-col dvs-items-stretch dvs-mb-12",staticStyle:{"min-height":"400px"}},[a("div",{staticClass:"dvs-bg-white dvs-m-4 dvs-rounded dvs-px-4 dvs-py-1 dvs-text-sm",staticStyle:{height:"30px"}},[e._v("http://"+e._s(e.domain))]),a("div",{staticClass:"dvs-relative"},[a("div",{staticClass:"dvs-absolute dvs-pin-t dvs-pin-l z-10 dvs-text-center dvs-rounded dvs-mt-8 dvs-ml-8 dvs-shadow dvs-min-w-64 dvs-flex dvs-items-stretch",style:"\n              background-image: radial-gradient(ellipse at top, "+e.localValue.panelTop.color+" 0%, "+e.localValue.panelBottom.color+" 100%);\n              color: "+e.localValue.panelText.color+"\n            "},[a("div",{staticClass:"dvs-flex dvs-flex-col dvs-items-center dvs-p-2",style:"\n                  background-color: "+e.localValue.panelSidebarBackground.color+";\n                  color: "+e.localValue.panelSidebarText.color+";\n                "},[a("div",{staticClass:"dvs-p-2"},[a("document-icon",{style:e.localValue.panelSidebarText.color,attrs:{w:"18",h:"18"}})],1),a("div",{staticClass:"dvs-p-2"},[a("cube-icon",{style:e.localValue.panelSidebarText.color,attrs:{w:"18",h:"18"}})],1),a("div",{staticClass:"dvs-p-2"},[a("cog-icon",{style:e.localValue.panelSidebarText.color,attrs:{w:"18",h:"18"}})],1),a("div",{staticClass:"dvs-p-2"},[a("power-icon",{style:e.localValue.panelSidebarText.color,attrs:{w:"18",h:"18"}})],1)]),a("div",{staticClass:"dvs-text-center dvs-w-full dvs-p-8"},[a("ul",{staticClass:"dvs-text-left dvs-text-xs dvs-list-reset dvs-font-bold"},[a("li",{staticClass:"dvs-mb-4"},[a("menu-icon",{staticClass:"dvs-mr-2 handle",style:e.theme.panelIcons,attrs:{w:"18",h:"18"}}),e._v("Lorem\n                ")],1),a("li",{staticClass:"dvs-mb-4"},[a("menu-icon",{staticClass:"dvs-mr-2 handle",style:e.theme.panelIcons,attrs:{w:"18",h:"18"}}),e._v("Lorem\n                ")],1),a("li",{staticClass:"dvs-mb-4"},[a("menu-icon",{staticClass:"dvs-mr-2 handle",style:e.theme.panelIcons,attrs:{w:"18",h:"18"}}),e._v("Lorem\n                  "),a("ul",{staticClass:"dvs-list-reset dvs-ml-8"},[a("li",{staticClass:"dvs-mt-2 dvs-mb-4 dvs-p-1 dvs-px-4 dvs-text-sm dvs-rounded-sm",style:"\n                        background-color: "+e.localValue.buttonsSecondaryBackground.color+";\n                        color: "+e.localValue.buttonsSecondaryText.color+";\n                      "},[e._v("Lorem")])])],1),a("li",{staticClass:"dvs-mb-4"},[a("menu-icon",{staticClass:"dvs-mr-2 handle",style:e.theme.panelIcons,attrs:{w:"18",h:"18"}}),e._v("Lorem\n                ")],1)]),a("button",{staticClass:"dvs-btn dvs-btn-xs dvs-mb-4 dvs-rounded-full dvs-border",style:"\n                  border-color: "+e.localValue.buttonsActionBackground.color+";\n                  color: "+e.localValue.buttonsActionBackground.color+";\n                "},[e._v("+ Add Slice")]),a("button",{staticClass:"dvs-btn dvs-btn-xs dvs-py-4 dvs-w-full",style:"\n                  background-color: "+e.localValue.buttonsActionBackground.color+";\n                  color: "+e.localValue.buttonsActionText.color+";\n                "},[e._v("Save Page")])])]),a("div",{staticClass:"dvs-bg-white dvs-w-full dvs-p-4 dvs-relative"},[a("h3",[e._v("Just an example page")]),a("p",{staticClass:"dvs-text-xs dvs-mt-4 dvs-text-black"},[e._v("Bacon ipsum dolor amet brisket porchetta doner shankle sirloin pancetta rump alcatra strip steak pig burgdoggen frankfurter cupim kevin. Bacon alcatra flank buffalo beef andouille spare ribs porchetta. Shank corned beef pork loin bacon beef pork belly frankfurter tri-tip venison tenderloin alcatra chuck prosciutto filet mignon cow. Kielbasa t-bone fatback filet mignon frankfurter burgdoggen biltong tri-tip jerky pork chop. Hamburger pork pork loin, brisket chuck beef turkey spare ribs swine.")]),a("div",{staticClass:"dvs-flex dvs-justify-between"},[a("div",{staticClass:"dvs-bg-grey dvs-rounded dvs-flex dvs-justify-center dvs-items-center dvs-w-1/3 dvs-mr-4",staticStyle:{height:"150px"}},[a("images-icon",{attrs:{w:"40",h:"40"}})],1),a("div",{staticClass:"dvs-bg-grey dvs-rounded dvs-flex dvs-justify-center dvs-items-center dvs-w-2/3",staticStyle:{height:"150px"}},[a("images-icon",{attrs:{w:"40",h:"40"}})],1)]),a("p",{staticClass:"dvs-text-xs dvs-mt-4 dvs-text-black"},[e._v("Bacon ipsum dolor amet brisket porchetta doner shankle sirloin pancetta rump alcatra strip steak pig burgdoggen frankfurter cupim kevin. Bacon alcatra flank buffalo beef andouille spare ribs porchetta. Shank corned beef pork loin bacon beef pork belly frankfurter tri-tip venison tenderloin alcatra chuck prosciutto filet mignon cow. Kielbasa t-bone fatback filet mignon frankfurter burgdoggen biltong tri-tip jerky pork chop. Hamburger pork pork loin, brisket chuck beef turkey spare ribs swine.")]),a("p",{staticClass:"dvs-text-xs dvs-mt-4 dvs-text-black"},[e._v("Bacon ipsum dolor amet brisket porchetta doner shankle sirloin pancetta rump alcatra strip steak pig burgdoggen frankfurter cupim kevin. Bacon alcatra flank buffalo beef andouille spare ribs porchetta. Shank corned beef pork loin bacon beef pork belly frankfurter tri-tip venison tenderloin alcatra chuck prosciutto filet mignon cow. Kielbasa t-bone fatback filet mignon frankfurter burgdoggen biltong tri-tip jerky pork chop. Hamburger pork pork loin, brisket chuck beef turkey spare ribs swine.")]),a("div",{staticClass:"dvs-absolute dvs-pin-l dvs-pin-r dvs-pin-b dvs-flex dvs-justify-between dvs-items-end dvs-m-8 dvs-p-8 dvs-rounded",style:"\n                  background-color: "+e.localValue.helpBackground.color+");\n                  color: "+e.localValue.panelText.color+";\n                "},[a("div",[e._v("Analytics")]),a("div",{staticClass:"dvs-rounded-full dvs-border dvs-border-white dvs-flex dvs-justify-center dvs-align-center dvs-p-8 dvs-text-xl dvs-font-bold",staticStyle:{width:"100px",height:"100px"},style:"\n                  border-color: "+e.localValue.panelText.color+";\n                "},[e._v("90M")]),a("div",{staticClass:"dvs-rounded-full dvs-border dvs-border-white dvs-flex dvs-justify-center dvs-align-center dvs-p-8 dvs-text-xl dvs-font-bold",staticStyle:{width:"100px",height:"100px"},style:"\n                  border-color: "+e.localValue.panelText.color+";\n                "},[e._v("90M")]),a("div",{staticClass:"dvs-rounded-full dvs-border dvs-border-white dvs-flex dvs-justify-center dvs-align-center dvs-p-8 dvs-text-xl dvs-font-bold",staticStyle:{width:"100px",height:"100px"},style:"\n                  border-color: "+e.localValue.panelText.color+";\n                "},[e._v("10K")])])])])])])])])},s=[],o={data:{labels:["May 16","May 17","May 18","May 19","May 20","May 21","May 22","May 23"],datasets:[{label:"Page Views",data:[33,41,19,5,4,23,30,11]},{label:"Sessions",data:[25,24,14,4,4,10,17,9]},{label:"Avg. Time On Page",data:[64,38,155,10,7,26,145,6]},{label:"Bounce Rate",data:[48,45,57,50,25,10,47,22]}]},releases:["Apr 25","Apr 24","May 2"]},n={name:"AdminDesigner",data:function(){return{localValue:{panelTop:{color:null},panelBottom:{color:null},panelText:{color:null},panelAction:{color:null},panelSidebarBackground:{color:null},panelSidebarText:{color:null},panelSidebarAction:{color:null},panelCardBackground:{color:null},panelCardText:{color:null},buttonsActionText:{color:null},buttonsActionBackground:{color:null},buttonsSecondaryText:{color:null},buttonsSecondaryBackground:{color:null},helpBackground:{color:null},helpText:{color:null},chartColor1:{color:null},chartColor2:{color:null},chartColor3:{color:null},chartColor4:{color:null},chartColor5:{color:null},chartColor6:{color:null}},presets:{Default:{panelTop:{color:"rgb(44, 56, 88)"},panelBottom:{color:"rgb(24, 32, 57)"},panelText:{color:"#A7A9E2"},panelAction:{color:"rgb(101, 139, 239)"},panelSidebarBackground:{color:"#182039"},panelSidebarText:{color:"rgb(243, 243, 243)"},panelSidebarAction:{color:"rgb(101, 139, 239)"},panelCardBackground:{color:"#12182d"},panelCardText:{color:"#eeeeee"},buttonsActionText:{color:"rgb(243, 243, 243)"},buttonsActionBackground:{color:"#FF8889"},buttonsSecondaryText:{color:"rgb(243, 243, 243)"},buttonsSecondaryBackground:{color:"rgb(24, 32, 57)"},helpBackground:{color:"#ffe5e4"},helpText:{color:"#FF8889"},chartColor1:{color:"rgba(54, 162, 235, 1)"},chartColor2:{color:"rgba(75, 192, 192, 1)"},chartColor3:{color:"rgba(255, 206, 86, 1)"},chartColor4:{color:"rgba(255,99,132,1)"},chartColor5:{color:"rgba(153, 102, 255, 1)"},chartColor6:{color:"rgba(255, 159, 64, 1)"}}},chartColors:[{background:"rgba(54, 162, 235, 0.5)",border:"rgba(54, 162, 235, 1)"},{background:"rgba(75, 192, 192, 0.2)",border:"rgba(75, 192, 192, 1)"},{background:"rgba(255, 206, 86, 0.2)",border:"rgba(255, 206, 86, 1)"},{background:"rgba(255, 99, 132, 0.2)",border:"rgba(255,99,132,1)"},{background:"rgba(153, 102, 255, 0.2)",border:"rgba(153, 102, 255, 1)"},{background:"rgba(255, 159, 64, 0.2)",border:"rgba(255, 159, 64, 1)"}],placeholderLineData:o}},mounted:function(){var e=this;this.setLineGraphStyles(),this.$nextTick(function(){"undefined"!==typeof e.value.panelTop?e.applyStyles(e.value):e.applyStyles(e.presets.Default)})},methods:{applyStyles:function(e){for(var t in e)if("undefined"!==typeof this.localValue[t])for(var a in e[t])"undefined"!==typeof this.localValue[t][a]&&(this.localValue[t][a]=e[t][a])},selectPreset:function(e){if(""!==e.target.value){var t=e.target.value;this.applyStyles(this.presets[t]),e.target.value=""}},setLineGraphStyles:function(){var e=this;this.placeholderLineData.data.datasets.map(function(t,a){return t.backgroundColor=[e.chartColors[a].background],t.fontColor=e.localValue.panelText.color,t.borderColor=[e.chartColors[a].border],t.pointRadius=4,t.pointHoverRadius=10,t.fill=!1,t})}},computed:{options:function(){return{width:"8000px",legend:{labels:{fontColor:this.localValue.panelText.color,fontSize:14}},scales:{yAxes:[{ticks:{fontColor:this.localValue.panelText.color,fontSize:12}}],xAxes:[{ticks:{fontColor:this.localValue.panelText.color,fontSize:12}}]}}}},watch:{localValue:{handler:function(){this.$emit("input",this.localValue)},deep:!0}},components:{ColorEditor:function(){return Promise.all([a.e("devise-editors~devise-utilities"),a.e("devise-editors")]).then(a.bind(null,"4ccd"))},CogIcon:function(){return a.e("devise-icons").then(a.bind(null,"6f86"))},CubeIcon:function(){return a.e("devise-icons").then(a.bind(null,"2e10"))},DocumentIcon:function(){return a.e("devise-icons").then(a.bind(null,"e18a"))},MenuIcon:function(){return a.e("devise-icons").then(a.bind(null,"40a8"))},PowerIcon:function(){return a.e("devise-icons").then(a.bind(null,"75e7"))},ImagesIcon:function(){return a.e("devise-icons").then(a.bind(null,"0554"))}},props:["value","domain"]},i=n,r=a("0c7c"),c=Object(r["a"])(i,l,s,!1,null,null,null);t["default"]=c.exports},c66c:function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{attrs:{id:"devise-admin-content"}},[a("h3",{staticClass:"dvs-mb-8"},[a("span",{staticClass:"dvs-uppercase"},[e._v(e._s(e.localValue.name))]),e._v(" Settings\n    ")]),e.loadedSettings?a("div",{staticClass:"dvs-mb-12"},[a("form",[a("div",{staticClass:"dvs-flex dvs-mb-4"},[a("fieldset",{staticClass:"dvs-fieldset dvs-mr-4"},[a("label",[e._v("Name")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.localValue.name,expression:"localValue.name"}],attrs:{type:"text",placeholder:"Name of the Site"},domProps:{value:e.localValue.name},on:{input:function(t){t.target.composing||e.$set(e.localValue,"name",t.target.value)}}})]),a("fieldset",{staticClass:"dvs-fieldset dvs-mr-4"},[a("label",[e._v("Domain")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.localValue.domain,expression:"localValue.domain"}],attrs:{type:"text",placeholder:"Domain of the Site"},domProps:{value:e.localValue.domain},on:{input:function(t){t.target.composing||e.$set(e.localValue,"domain",t.target.value)}}})]),a("fieldset",{staticClass:"dvs-fieldset"},[a("label",[e._v('Google Analytics UA ID. Include the "UA-" in your entry')]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.localValue.settings.googleAnalytics,expression:"localValue.settings.googleAnalytics"}],attrs:{type:"text",placeholder:"UA-XXXXXXX"},domProps:{value:e.localValue.settings.googleAnalytics},on:{input:function(t){t.target.composing||e.$set(e.localValue.settings,"googleAnalytics",t.target.value)}}})])]),a("help",{staticClass:"dvs-mb-10"},[e._v('The domain should not include the http or https:// protocol identifier. So your site entry could be "my-super-awesome-site.com" or "sub-domain.my-super-awesome-site.com". To Support development environments you can override these values in your .env file in the root of your project with something like "SITE_1_DOMAIN=my-super-awesome-site.test" for your local development or staging.')]),e.languages.data&&e.languages.data.length>0&&e.localValue.languages?a("fieldset",{staticClass:"dvs-fieldset dvs-mb-4"},[a("label",[e._v("Languages")]),a("select",{directives:[{name:"model",rawName:"v-model",value:e.editAddLanguage,expression:"editAddLanguage"}],on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.editAddLanguage=t.target.multiple?a:a[0]},function(t){return e.addEditLanguage()}]}},[a("option",{domProps:{value:null}},[e._v("Add a Language")]),e._l(e.languagesNotInEditSite,function(t){return a("option",{key:t.id,domProps:{value:t}},[e._v(e._s(t.code))])})],2)]):e._e(),e.localValue.languages?a("fieldset",{staticClass:"dvs-fieldset dvs-mb-10"},[a("label",[e._v("Current Languages")]),a("help",{staticClass:"dvs-mb-4"},[e._v("Green indicates the default language. Click on the language tags below to set a new default.")]),e._l(e.localValue.languages,function(t){return a("span",{key:t.id,staticClass:"dvs-mr-2 dvs-tag dvs-bg-grey-darker dvs-cursor-pointer",class:{"dvs-bg-green-dark dvs-text-white":t.default},on:{click:function(a){return e.setDefaultLanguage(t)}}},[e._v(e._s(t.name))])}),e.localValue.languages.length<1?a("span",[e._v("No Languages")]):e._e()],2):e._e(),e.languages.data&&e.languages.data.length>0&&e.localValue.languages?a("fieldset",{staticClass:"dvs-fieldset dvs-mb-4"},[a("label",[e._v("Default Layout")]),a("select",{directives:[{name:"model",rawName:"v-model",value:e.localValue.settings.defaultLayout,expression:"localValue.settings.defaultLayout"}],on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.$set(e.localValue.settings,"defaultLayout",t.target.multiple?a:a[0])}}},e._l(e.layouts,function(t,l){return a("option",{key:l,domProps:{value:t}},[e._v(e._s(l))])}),0)]):e._e(),a("query-builder-interface",{model:{value:e.localValue.model_queries,callback:function(t){e.$set(e.localValue,"model_queries",t)},expression:"localValue.model_queries"}}),a("fieldset",{staticClass:"dvs-fieldset dvs-mb-10"},[a("label",[e._v("Admin Styles")]),a("help",{staticClass:"dvs-mb-8"},[e._v("You can change the styles of the admin to more closely match the brand of the site.")]),e.localValue.settings.colors?a("admin-designer",{model:{value:e.localValue.settings.colors,callback:function(t){e.$set(e.localValue.settings,"colors",t)},expression:"localValue.settings.colors"}}):e._e()],1),a("div",{staticClass:"dvs-flex"},[a("button",{staticClass:"dvs-btn mr-2",style:e.theme.actionButton,attrs:{disabled:e.editInvalid},on:{click:e.requestEditSite}},[e._v("Edit")]),a("button",{staticClass:"dvs-btn",style:e.theme.actionButtonGhost,on:{click:function(t){e.showEdit=!1}}},[e._v("Cancel")])])],1)]):e._e()])])},s=[],o=(a("7f7f"),a("5176")),n=a.n(o),i=a("cebc"),r=a("2f62"),c=a("29ec"),d={name:"SitesEdit",data:function(){return{localValue:{languages:[],model_queries:null,settings:{defaultLayout:"",colors:{},googleAnalytics:""}},loadedSettings:!1,modulesToLoad:2,editAddLanguage:null}},mounted:function(){this.retrieveAllSites(),this.retrieveAllLanguages()},methods:Object(i["a"])({},Object(r["b"])("devise",["getLanguages","getSites","updateSite"]),{requestEditSite:function(){this.updateSite({site:this.site,data:this.localValue}).then(function(){})},addEditLanguage:function(){this.editAddLanguage.default=0,this.localValue.languages.push(this.editAddLanguage),this.editAddLanguage=null},setDefaultLanguage:function(e){this.localValue.languages.map(function(t){return t.default=0,t.id===e.id?(t.default=1,1):0})},retrieveAllSites:function(){var e=this,t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.getSites().then(function(){var a={},l="";null===e.site.settings&&e.$set(e.site,"settings",{}),"undefined"!==typeof e.site.settings.colors&&(a=e.site.settings.colors),"undefined"!==typeof e.site.settings.googleAnalytics&&(l=e.site.settings.googleAnalytics),e.localValue=n()({},e.localValue,e.site,{settings:{colors:a,googleAnalytics:l}}),e.loadedSettings=!0,t&&window.deviseSettings.$bus.$emit("incrementLoadbar",e.modulesToLoad)})},retrieveAllLanguages:function(){var e=this,t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.getLanguages().then(function(){t&&window.deviseSettings.$bus.$emit("incrementLoadbar",e.modulesToLoad)})}}),computed:Object(i["a"])({},Object(r["c"])("devise",["languages","site","siteById","settingsMenu"]),{editInvalid:function(){return null===this.localValue.name||null===this.localValue.domain},languagesNotInEditSite:function(){var e=this;return this.languages.data.filter(function(t){var a=e.localValue.languages.filter(function(e){return e.id===t.id});return 0===a.length})},layouts:function(){return window.deviseSettings.$config.layouts}}),mixins:[c["a"]],components:{AdminDesigner:function(){return Promise.resolve().then(a.bind(null,"bf79"))},QueryBuilderInterface:function(){return Promise.all([a.e("devise-editors~devise-utilities"),a.e("devise-utilities")]).then(a.bind(null,"73e5"))}}},u=d,v=a("0c7c"),p=Object(v["a"])(u,l,s,!1,null,null,null);t["default"]=p.exports}}]);
//# sourceMappingURL=devise-sites.js.map