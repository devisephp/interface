"use strict";(self["webpackChunkdevisephp_interface"]=self["webpackChunkdevisephp_interface"]||[]).push([[737],{7206:function(e,t,s){s.r(t),s.d(t,{default:function(){return u}});var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{class:[e.deviseOptions.adminClass],attrs:{id:"devise-admin"}},[s("transition",{attrs:{name:"fast-fade"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:!e.showAdmin,expression:"!showAdmin"}],staticClass:"dvs-sidebar-hint dvs-p-3",class:{"opacity-100":!e.showAdmin},on:{click:function(t){e.showAdmin=!0}}},[s("power-icon")],1)]),s("transition",{attrs:{name:"fast-fade"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:e.showAdmin,expression:"showAdmin"}],staticClass:"dvs-blocker",class:{"opacity-0":e.fieldOpen},on:{click:function(t){e.showAdmin=!1}}})]),s("transition",{attrs:{name:"fast-fade"}},[s("panel",{directives:[{name:"show",rawName:"v-show",value:e.showAdmin&&!e.fieldOpen,expression:"showAdmin && !fieldOpen"}],staticClass:"dvs-m-8 dvs-fixed dvs-inset-0 dvs-z-9980 dvs-flex dvs-pointer-events-none"},[s("div",{staticClass:"dvs-flex dvs-shadow dvs-flex-col dvs-relative dvs-rounded dvs-bg-admin-bg dvs-pointer-events-auto"},[s("preview-mode"),e._l(e.allowedAdminMenu,(function(t,n){return[s("div",{key:n,staticClass:"dvs-border-b dvs-border-admin-secondary-bg"},[s("button",{staticClass:"dvs-outline-none dvs-transitions-hover-slow dvs-cursor-pointer dvs-text-admin-fg",class:e.checkActivePanelSidebar(t),on:{click:function(s){return s.preventDefault(),e.loadAdminPage(t)}}},[s(t.icon,{tag:"component",staticClass:"dvs-m-4",attrs:{w:"25",h:"25"}})],1)])]})),s("a",{staticClass:"dvs-outline-none dvs-transitions-hover-slow dvs-cursor-pointer dvs-text-admin-fg",attrs:{href:"#",onclick:"event.preventDefault(); document.getElementById('dvs-logout-form').submit();"}},[s("power-icon",{staticClass:"dvs-m-4",attrs:{w:"25",h:"25"}})],1),s("form",{staticStyle:{display:"none"},attrs:{id:"dvs-logout-form",action:"/logout",method:"POST"}},[s("input",{attrs:{type:"hidden",name:"_token"},domProps:{value:e.csrf_field}})])],2),s("div",{staticClass:"dvs-flex dvs-w-full dvs-ml-16"},[s("transition",{attrs:{name:"dvs-fade",mode:"out-in"}},[s("router-view",{attrs:{name:"devise"}})],1)],1)])],1),s("portal-target",{directives:[{name:"show",rawName:"v-show",value:!e.hideDeviseRootPortal,expression:"!hideDeviseRootPortal"}],staticClass:"dvs-fixed dvs-inset-0 dvs-z-9999 dvs-w-full",attrs:{name:"devise-root"},on:{change:e.deviseRootPortalContentChanged}}),s("media-manager",{staticClass:"dvs-z-9999"}),s("slice-settings"),s("loadbar",{staticClass:"dvs-relative dvs-z-9999"}),s("loading-screen",{staticClass:"dvs-relative dvs-z-9999"}),s("force-save",{staticClass:"dvs-z-9999"})],1)},i=[],a=s(538),d=s(629),r={name:"Administration",components:{Loadbar:()=>s.e(524).then(s.bind(s,2193)),LoadingScreen:()=>s.e(524).then(s.bind(s,5480)),MediaEditor:()=>Promise.all([s.e(953),s.e(383)]).then(s.bind(s,3872)),MediaManager:()=>Promise.all([s.e(953),s.e(383)]).then(s.bind(s,7095)),ForceSave:()=>s.e(524).then(s.bind(s,3496)),PreviewMode:()=>s.e(522).then(s.bind(s,2515)),BackIcon:()=>s.e(952).then(s.bind(s,2691)),CogIcon:()=>s.e(952).then(s.bind(s,7437)),CreateIcon:()=>s.e(952).then(s.bind(s,3180)),CubeIcon:()=>s.e(952).then(s.bind(s,5761)),DocumentIcon:()=>s.e(952).then(s.bind(s,4697)),ImageIcon:()=>s.e(952).then(s.bind(s,1598)),Panel:()=>s.e(524).then(s.bind(s,7838)),PowerIcon:()=>s.e(952).then(s.bind(s,5171)),SaveIcon:()=>s.e(952).then(s.bind(s,1356)),SliceSettings:()=>Promise.all([s.e(953),s.e(133)]).then(s.bind(s,2856))},data(){return{showAdmin:!1,everythingIsLoaded:!1,hideDeviseRootPortal:!0,fieldOpen:!1}},computed:{...(0,d.rn)("devise",["adminMenu"]),allowedAdminMenu(){return Object.keys(this.adminMenu).filter((e=>!this.adminMenu[e].permissions||this.can(this.adminMenu[e].permissions))).reduce(((e,t)=>(e[t]=this.adminMenu[t],e)),{})},user(){return window.deviseSettings.$user},csrf_field(){return window.axios.defaults.headers.common["X-CSRF-TOKEN"]}},mounted(){a["default"].component("help",(()=>s.e(524).then(s.bind(s,6411)))),setTimeout((()=>{this.everythingIsLoaded=!0}),2e3),setInterval((()=>{this.pollIfLoggedIn()}),3e4),window.deviseSettings.$bus.$on("devise-showing-field-editor",(()=>{this.fieldOpen=!0})),window.deviseSettings.$bus.$on("devise-hiding-field-editor",(()=>{this.fieldOpen=!1}))},methods:{...(0,d.nv)("devise",["getLanguages"]),loadAdminPage(e){"media-manager"===e.routeName?window.deviseSettings.$bus.$emit("devise-launch-media-manager",{}):"undefined"!==typeof e.routeParams?this.goToPage(e.routeName,e.routeParams):this.goToPage(e.routeName)},checkActivePanelSidebar(e){if(this.$route.meta&&this.$route.meta.parentRouteName){if("devise-pages-view"===this.$route.name&&this.$route.params.pageId===this.currentPage.id&&"devise-pages-view"===e.routeName)return[" dvs-bg-admin-highlight-bg dvs-text-admin-highlight-fg"];if(e.routeName===this.$route.meta.parentRouteName&&("devise-pages-view"!==this.$route.name||this.$route.params.pageId!==this.currentPage.id))return[" dvs-bg-admin-highlight-bg dvs-text-admin-highlight-fg"]}return[]},pollIfLoggedIn(){this.getLanguages().then((()=>{}),(()=>{window.location.reload(!0)}))},deviseRootPortalContentChanged(e){this.hideDeviseRootPortal=!e}}},o=r,l=s(1001),c=(0,l.Z)(o,n,i,!1,null,null,null),u=c.exports},3788:function(e,t,s){s.r(t),s.d(t,{default:function(){return c}});var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("admin-container",{scopedSlots:e._u([{key:"message",fn:function(){return[e._v(" Welcome Back!"),s("br"),e._v(" What are you looking to work on? ")]},proxy:!0},{key:"content",fn:function(){return[s("ul",{staticClass:"dvs-flex dvs-flex-wrap dvs-justify-between"},e._l(e.currentMenuItems,(function(t){return s("li",{key:t.id,staticClass:"dvs-py-6 dvs-mr-8"},[t.routeName?s("div",{staticClass:"dvs-block dvs-switch-sm dvs-flex dvs-justify-between dvs-items-center dvs-cursor-pointer",on:{click:function(s){return e.goToPage(t.routeName,t.parameters)}}},[e._v(" "+e._s(t.label)+" ")]):s("div",{staticClass:"dvs-uppercase dvs-text-xs dvs-text-admin-secondary-fg"},[e._v(" "+e._s(t.label)+" ")]),t.children?s("ul",{staticClass:"dvs-text-sm"},e._l(e.filteredMenu(t.children),(function(t){return s("li",{key:t.id,staticClass:"dvs-pt-3"},[t.routeName?s("div",{staticClass:"dvs-block dvs-switch-sm dvs-flex dvs-justify-between dvs-items-center dvs-cursor-pointer",on:{click:function(s){return e.goToPage(t.routeName,t.parameters)}}},[e._v(" "+e._s(t.label)+" ")]):e._e()])})),0):e._e()])})),0)]},proxy:!0}])})},i=[],a=s(629),d={name:"DeviseIndex",components:{AdminContainer:()=>Promise.all([s.e(90),s.e(737)]).then(s.bind(s,5699))},computed:{...(0,a.rn)("devise",["adminMenu"]),currentMenu(){return this.findMenu(this.adminMenu)},currentMenuItems(){return this.currentMenu.menu.filter((e=>!e.permissions||this.can(e.permissions)))}},mounted(){this.loadLanguages()},methods:{...(0,a.nv)("devise",["getGeneric"]),filteredMenu(e){return e.filter((e=>!e.permissions||this.can(e.permissions)))},findMenu(e){let t=e;"object"===typeof e&&(t=Object.keys(e).map((t=>e[t])));for(let s=0;s<t.length;s+=1){const e=t[s];if(e.routeName===this.$route.name)return e;if(e.menu){const t=this.findMenu(e.menu);if(t)return t}}return!1},loadLanguages(){this.getGeneric({config:{apiendpoint:"languages",store:"languages"}})}}},r=d,o=s(1001),l=(0,o.Z)(r,n,i,!1,null,null,null),c=l.exports},5699:function(e,t,s){s.r(t),s.d(t,{default:function(){return l}});var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"dvs-relative dvs-w-full dvs-flex dvs-justify-center dvs-items-start dvs-mt-10"},[s("div",{staticClass:"dvs-z-10 dvs-bg-white dvs-text-admin-bg dvs-max-w-2xl  dvs-w-1/2 dvs-rounded-lg dvs-shadow-xl dvs-absolute dvs-inset-0-t dvs--mt-10 dvs-px-8 dvs-py-4 dvs-font-light dvs-text-center dvs-leading-tight dvs-text-sm dvs-pointer-events-auto"},[e._t("message")],2),s("div",{staticClass:"dvs-relative dvs-bg-admin-bg dvs-rounded dvs-shadow-lg dvs-max-w-2xl dvs-min-w-1/2 dvs-w-full dvs-py-10 dvs-px-16 dvs-pointer-events-auto dvs-overflow-y-scroll",staticStyle:{"max-height":"70vh","min-width":"800px"}},[e._t("content")],2)])},i=[],a={name:"DeviseAdminContainer",data(){return{maxHeight:300}},mounted(){const e=window.innerHeight;this.maxHeight=.7*e,window.deviseSettings.$bus.$on("dvs-admin-container-content-changed",(()=>{this.$nextTick((()=>{"undefined"!==typeof this.$refs.Scrollbar&&(this.$refs.Scrollbar.calculateSize(),this.$refs.Scrollbar.scrollToY(0))}))}))}},d=a,r=s(1001),o=(0,r.Z)(d,n,i,!1,null,null,null),l=o.exports},1858:function(e,t,s){s.r(t),s.d(t,{default:function(){return l}});var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.currentStep?s("admin-container",{scopedSlots:e._u([{key:"message",fn:function(){return[s("div",{staticClass:"dvs-flex dvs-justify-center dvs-items-center"},[s("div",{staticClass:"dvs-cursor-pointer dvs-flex dvs-flex-col dvs-items-center",on:{click:e.back}},[s("arrow-left-circle-icon",{staticClass:"mb-1"}),s("span",{staticClass:"dvs-text-2xs dvs-uppercase"},[e._v("Back")])],1),s("div",{staticClass:"dvs-px-8",domProps:{innerHTML:e._s(e.currentStep.message)}})])]},proxy:!0},{key:"content",fn:function(){return[s("transition",{attrs:{name:"dvs-fade",mode:"out-in"}},[s(e.currentStep.component,{tag:"component",attrs:{step:e.currentStep,values:e.values},on:{done:e.done,cancel:e.cancel}})],1)]},proxy:!0}],null,!1,3569454705)}):e._e()},i=[],a={name:"DeviseWorkflow",components:{AdminContainer:()=>Promise.all([s.e(90),s.e(737)]).then(s.bind(s,5699)),ArrowLeftCircleIcon:()=>s.e(952).then(s.bind(s,3967)),WorkflowIndex:()=>Promise.all([s.e(90),s.e(737)]).then(s.bind(s,5002)),WorkflowRealIndex:()=>Promise.all([s.e(90),s.e(737)]).then(s.bind(s,2426)),WorkflowMenu:()=>Promise.all([s.e(90),s.e(737)]).then(s.bind(s,4e3)),WorkflowSearch:()=>Promise.all([s.e(90),s.e(737)]).then(s.bind(s,7358))},props:{workflow:{type:Array,required:!0}},data(){return{workflowStack:[]}},computed:{index(){return this.workflow.find((e=>e.index))},currentStep(){return this.workflowStack.slice(-1)[0]},values(){let e={};return this.workflowStack.forEach((t=>{e=Object.assign(e,t.value)})),e}},mounted(){this.$route.params&&this.$route.params.workflowKey?this.jumpToStep(this.$route.params.workflowKey):this.index&&this.workflowStack.push(this.index)},methods:{done(e){this.workflowStack[this.workflowStack.length-1].value=e,this.loadStep()},cancel(){this.clearStack()},back(){this.workflowStack.length>1?(this.workflowStack.splice(-1,1),delete this.currentStep.value,window.deviseSettings.$bus.$emit("dvs-admin-container-content-changed")):this.$router.go(-1)},jumpToStep(e){const t=this.workflow.find((t=>t.key===e));this.$set(t,"jumpedTo",!0),this.$set(t,"jumpedToParams",this.$route.params),this.workflowStack.push(t)},loadStep(){let e=null;if(this.currentStep.end||this.currentStep.value&&this.currentStep.value.end)return void this.clearStack();const t=this.workflowStack[this.workflowStack.length-2];let s=null;"undefined"!==typeof this.currentStep.nextStep?s=this.currentStep.nextStep:"undefined"!==typeof this.currentStep.value&&(s=this.currentStep.value.nextStep),s?e=this.workflow.find((e=>e.key===s)):t&&t.value.stepAfterNext&&(e=this.workflow.find((e=>e.key===t.value.stepAfterNext))),e?(this.workflowStack.push(Object.assign({},e)),window.deviseSettings.$bus.$emit("dvs-admin-container-content-changed")):console.warn(`There is no step registered as ${s}`)},clearStack(){this.workflowStack=[this.index],window.deviseSettings.$bus.$emit("dvs-admin-container-content-changed")}}},d=a,r=s(1001),o=(0,r.Z)(d,n,i,!1,null,null,null),l=o.exports},5002:function(e,t,s){s.r(t),s.d(t,{default:function(){return v}});var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",[s("ul",e._l(e.results.data,(function(t,n){return s("li",{key:n,staticClass:"dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-shadow hover:dvs-shadow-lg dvs-rounded dvs-my-4 dvs-p-4 dvs-cursor-pointer",on:{click:function(s){return e.selectSuggestion(t)}}},[s("div",{staticClass:"dvs-text-lg dvs-mb-2 dvs-font-light"},[e._v(e._s(t[e.mainLabelField]))]),s("ul",{staticClass:"dvs-flex"},e._l(e.subLabelFields,(function(n,i){return s("li",{key:i,staticClass:"dvs-mr-4 dvs-text-xs dvs-leading-tight dvs-w-1/4 dvs-bg-admin-bg dvs-text-admin-fg dvs-rounded dvs-p-3 opacity-75"},[s("div",{staticClass:"dvs-uppercase dvs-text-xs"},[e._v(e._s(n.label))]),s("div",[e._v(e._s(e.format(n,t[n.field])))])])})),0)])})),0)]),""!==e.searchTerm&&e.results.data&&e.results.data.length<1?s("div",{staticClass:"dvs-text-center"},[e._v(" No search results found ")]):e._e()])},i=[],a=s(629),d=s(7484),r=s.n(d),o={name:"DeviseWorkflowIndex",props:{step:{type:Object,required:!0}},data(){return{results:{data:[]}}},computed:{mainLabelField(){return this.step.resultsDisplayFields[0].field},subLabelFields(){const e=JSON.parse(JSON.stringify(this.step.resultsDisplayFields));return e.shift(),e}},mounted(){this.requestData()},methods:{...(0,a.nv)("devise",["getGeneric"]),requestData(){const e=!0===this.step.app||"undefined"===typeof this.step.app||this.step.app;this.getGeneric({config:{apiendpoint:this.step.apiendpoint,app:e}}).then((e=>{this.results=e.data}))},selectSuggestion(e){this.$emit("done",e)},format(e,t){return e.dateFormat?r()(t).format(e.dateFormat):t}}},l=o,c=s(1001),u=(0,c.Z)(l,n,i,!1,null,null,null),v=u.exports},4e3:function(e,t,s){s.r(t),s.d(t,{default:function(){return l}});var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",e._l(e.options,(function(t,n){return s("div",{key:n,staticClass:"dvs-bg-gray-300 text-sm dvs-cursor-pointer dvs-text-admin-bg dvs-text-center dvs-py-3 dvs-px-8 dvs-my-4 dvs-shadow dvs-rounded",domProps:{innerHTML:e._s(t.label)},on:{click:function(s){return e.chooseOption(t)}}})})),0)},i=[],a={name:"DeviseWorkflowMenu",props:{step:{type:Object,required:!0}},computed:{options(){return this.step.options}},methods:{chooseOption(e){this.$emit("done",e)}}},d=a,r=s(1001),o=(0,r.Z)(d,n,i,!1,null,null,null),l=o.exports},2426:function(e,t,s){s.r(t),s.d(t,{default:function(){return c}});var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"dvs-my-8 dvs-flex dvs-justify-between"},[s("div",{staticClass:"dvs-mr-8"},[e.meta?s("pagination",{attrs:{meta:e.meta},on:{changePage:e.changePage}}):e._e()],1),e.step.links&&e.step.links.length?s("div",{staticClass:"dvs-flex justify-end dvs-space-x-2"},e._l(e.step.links,(function(t){return s("button",{key:t.nextStep,staticClass:"dvs-btn dvs-btn-sm dvs-btn-primary dvs-ml-2",on:{click:function(s){return e.$emit("done",t)}}},[e._v(" "+e._s(t.label)+" ")])})),0):e._e()]),s("table",{staticClass:"dvs-mt-8 dvs-w-full dvs-text-sm"},[s("tr",[e._l(e.step.columns,(function(t){return s("th",{key:t.key,staticClass:"dvs-px-2 dvs-pb-2 dvs-border-b-2 dvs-border-gray-700 dvs-text-left"},[e._v(" "+e._s(t.label)+" ")])})),e.step.actions&&e.step.actions.length?s("th",{staticClass:"dvs-px-2  dvs-pb-2 dvs-border-b-2 dvs-border-gray-700 dvs-text-right"},[e._v(" Actions ")]):e._e()],2),e._l(e.records,(function(t,n){return s("tr",{key:n,staticClass:"dvs-font-thin text-xs"},[e._l(e.step.columns,(function(i){return s("td",{key:n+"-"+i.key,staticClass:"dvs-px-2 dvs-py-2 dvs-border-b dvs-border-gray-800"},[e._v(" "+e._s(e.getField(t,i))+" ")])})),e.step.actions&&e.step.actions.length?s("th",{staticClass:"dvs-px-2 dvs-border-b dvs-border-gray-800 text-right"},e._l(e.step.actions,(function(n){return s("a",{key:n.key,staticClass:"dvs-text-admin-highlight-bg pl-4 dvs-font-normal",attrs:{href:"#"},on:{click:function(s){return s.preventDefault(),e.executeAction(n,t)}}},[e._v(" "+e._s(n.label)+" ")])})),0):e._e()],2)}))],2),e.meta?s("pagination",{staticClass:"mt-4",attrs:{meta:e.meta},on:{changePage:e.changePage}}):e._e()],1)},i=[],a=s(629),d={name:"WorkflowRealIndex",components:{Pagination:()=>s.e(524).then(s.bind(s,9208))},props:{step:{type:Object,required:!0}},data(){return{records:[],meta:{}}},mounted(){this.requestData()},methods:{...(0,a.nv)("devise",["searchGeneric"]),requestData(e){const t=!0===this.step.app||"undefined"===typeof this.step.app||this.step.app;this.searchGeneric({config:{apiendpoint:this.step.apiendpoint,app:t},filters:e}).then((e=>{this.records=e.data.data,this.meta=e.data.meta}))},changePage(e){this.requestData({page:e})},executeAction(e,t){this.$emit("done",Object.assign({},e,t))},getField(e,t){return t.format?t.format(e):e[t.key]}}},r=d,o=s(1001),l=(0,o.Z)(r,n,i,!1,null,null,null),c=l.exports},7358:function(e,t,s){s.r(t),s.d(t,{default:function(){return v}});var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"dvs-flex dvs-justify-center"},[s("div",{staticClass:"dvs-relative dvs-flex dvs-justify-center dvs-items-center dvs-mt-8 dvs-relative"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.searchTerm,expression:"searchTerm"}],staticClass:"dvs-bg-transparent dvs-bg-admin-secondary-bg dvs-px-12 dvs-py-4 dvs-text-admin-fg dvs-outline-none dvs-placeholder-admin-fg dvs-text-center",attrs:{type:"text",placeholder:"Type to begin searching"},domProps:{value:e.searchTerm},on:{input:function(t){t.target.composing||(e.searchTerm=t.target.value)}}}),s("div",{staticClass:"dvs-cursor-pointer dvs-absolute dvs-right-0 dvs-top-0 dvs-mt-3 dvs-mr-2",class:{"dvs-opacity-50":""===e.searchTerm},on:{click:function(t){e.searchTerm=""}}},[s("x-icon")],1)])]),s("div",{staticClass:"dvs-mb-8 dvs-flex dvs-justify-center dvs-mt-2"},[e.step.allRecordsApiendpoint?s("button",{staticClass:"dvs-btn dvs-btn-secondary dvs-btn-sm dvs-m4-6",on:{click:e.requestAll}},[e._v(" Load All Records ")]):e._e()]),e.autosuggest.meta?s("pagination",{attrs:{meta:e.autosuggest.meta},on:{changePage:e.changePage}}):e._e(),s("ul",e._l(e.autosuggest.data,(function(t,n){return s("li",{key:n,staticClass:"dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-shadow hover:dvs-shadow-lg dvs-rounded dvs-my-4 dvs-p-4 dvs-cursor-pointer",on:{click:function(s){return e.selectSuggestion(t)}}},[s("div",{staticClass:"dvs-text-lg dvs-mb-2 dvs-font-light"},[e._v(e._s(t[e.mainLabelField]))]),s("ul",{staticClass:"dvs-flex"},e._l(e.subLabelFields,(function(n,i){return s("li",{key:i,staticClass:"dvs-mr-4 dvs-text-xs dvs-leading-tight dvs-w-1/4 dvs-bg-admin-bg dvs-text-admin-fg dvs-rounded dvs-p-3 dvs-opacity-75 dvs-break-words"},[s("div",{staticClass:"dvs-uppercase dvs-text-xs"},[e._v(e._s(n.label))]),s("div",[e._v(e._s(e.format(n,t[n.field])))])])})),0)])})),0),""!==e.searchTerm&&e.autosuggest.data&&e.autosuggest.data.length<1?s("div",{staticClass:"dvs-text-center"},[e._v(" No search results found ")]):e._e()],1)},i=[],a=s(629),d=s(7484),r=s.n(d),o={name:"DeviseWorkflowSearch",components:{XIcon:()=>s.e(952).then(s.bind(s,7583)),Pagination:()=>s.e(524).then(s.bind(s,9208))},props:{step:{type:Object,required:!0}},data(){return{searchDelay:1e3,searchTerm:"",autosuggest:{data:[]}}},computed:{options(){return this.step.options},mainLabelField(){return this.step.resultsDisplayFields[0].field},subLabelFields(){const e=JSON.parse(JSON.stringify(this.step.resultsDisplayFields));return e.shift(),e}},watch:{searchTerm(e){this.requestSearch(e)}},methods:{...(0,a.nv)("devise",["searchGeneric"]),requestSearch(e){if(""!==e){const t=!0===this.step.app||"undefined"===typeof this.step.app||this.step.app,s={};s[this.step.searchPropertyName]=e,this.searchGeneric({config:{apiendpoint:this.step.apiendpoint,app:t},filters:s}).then((t=>{this.autosuggest=t.data,t.data.length<1&&window.deviseSettings.$bus.$emit("showMessage",{title:"No Suggestions Found",message:`We couldn't find any data with the term: "${e}".`})}))}else this.autosuggest=Object.assign({},{})},requestAll(e){const t=!0===this.step.app||"undefined"===typeof this.step.app||this.step.app;this.searchGeneric({config:{apiendpoint:this.step.allRecordsApiendpoint,app:t},filters:e}).then((e=>{this.autosuggest=e.data}))},changePage(e){this.requestAll({page:e})},selectSuggestion(e){this.$emit("done",e)},format(e,t){return e.dateFormat?r()(t).format(e.dateFormat):t}}},l=o,c=s(1001),u=(0,c.Z)(l,n,i,!1,null,null,null),v=u.exports}}]);
//# sourceMappingURL=devise-administration.4daa3334.js.map