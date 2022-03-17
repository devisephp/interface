"use strict";(self["webpackChunkdevisephp_interface"]=self["webpackChunkdevisephp_interface"]||[]).push([[133],{1713:function(e,t,s){s.r(t),s.d(t,{default:function(){return P}});var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"dvs-relative dvs-mb-8"},[s("div",{staticClass:"dvs-flex dvs-justify-center dvs-p-4 dvs-pb-8 dvs-text-gray-200 dvs-w-full"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.filter,expression:"filter"}],ref:"filter",staticClass:"dvs-bg-transparent dvs-border-b-2 dvs-px-12 dvs-py-2 dvs-text-gray-200 dvs-outline-none dvs-placeholder-admin-fg dvs-text-center",attrs:{type:"text",placeholder:"Type to begin searching"},domProps:{value:e.filter},on:{input:function(t){t.target.composing||(e.filter=t.target.value)}}}),s("div",{staticClass:"dvs-cursor-pointer",class:{"dvs-opacity-50":""===e.filter},on:{click:function(t){e.filter=""}}},[s("x-icon")],1)]),e.allDirectories.length>0?s("div",[s("div",[e._l(e.allDirectories,(function(t,i){return s("slice-selector-directory",{key:i,attrs:{"allowed-views":e.allowedViews,directory:t,value:e.value},on:{input:e.update}})})),s("div",{staticClass:"dvs-h-32"},[e._v(" ")])],2)]):e._e()])},r=[],o=s(629),n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.currentDirectoryFiles.length>0?s("div",{staticClass:"dvs-mb-8 dvs-w-full dvs-text-gray-200"},[s("div",{staticClass:"dvs-uppercase dvs-text-sm dvs-ml-2 dvs-mb-2 dvs-w-full dvs-pb-2 dvs-opacity-75"},[e._v(" "+e._s(e.name)+" ")]),s("div",{staticClass:"dvs-grid dvs-grid-cols-3"},e._l(e.currentDirectoryFiles,(function(t,i){return s("div",{key:i,staticClass:"dvs-cursor-pointer dvs-mb-1 dvs-p-2 dvs-flex",on:{click:function(s){return e.toggleSelectSlice(t)}}},[s("div",{staticClass:"dvs-w-full dvs-flex dvs-flex-col dvs-h-full dvs-shadow dvs-rounded dvs-overflow-hidden dvs-bg-gray-500 dvs-text-gray-100",class:{"dvs-ring-2 dvs-ring-offset-2 dvs-ring-red-300":e.isSelected(t)}},[s("slice-selector-slice",{staticClass:"dvs-mr-4",attrs:{file:t}})],1)])})),0)]):e._e()},d=[],l=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"dvs-flex dvs-flex-col dvs-justify-between dvs-w-full dvs-bg-gray-700 dvs-border-box"},[e.preview?s("slice-diagram",{attrs:{"slice-component":e.sliceComponent}}):e._e(),s("div",{staticClass:"dvs-flex dvs-flex-col dvs-justify-between dvs-p-4 dvs-bg-gray-500 dvs-text-gray-100"},[s("div",{staticClass:"dvs-cursor-pointer dvs-text-sm dvs-font-bold"},[e._v(e._s(e.file.name))]),s("div",{staticClass:"flex-none"},[e.description?s("div",{staticClass:"dvs-text-2xs dvs-mb-2 dvs-opacity-75"},[e._v(" "+e._s(e.description)+" ")]):e._e(),e.childSlot?s("div",{staticClass:"dvs-text-xs dvs-flex dvs-items-align dvs-opacity-75"},[s("information-circle-icon",{staticClass:"dvs-mr-1"}),e._v("Can contain sub-slices ")],1):e._e(),e.database?s("div",{staticClass:"dvs-text-xs dvs-flex dvs-items-align dvs-opacity-75"},[s("cube-icon",{staticClass:"dvs-mr-1"}),e._v("Database driven ")],1):e._e()])])],1)},a=[],c=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"dvs-relative dvs-w-full dvs-rounded-sm dvs-overflow-hidden dvs-bg-gray-700 dvs-text-gray-600",staticStyle:{height:"250px"}},[s("div",{staticClass:"dvs-absolute dvs-z-0 dvs-inset-0 dvs-flex dvs-items-center dvs-justify-center"},[s("svg",{staticClass:"w-16 h-16",attrs:{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"}},[s("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"}})])]),s("img",{staticClass:"dvs-relative dvs-z-10 dvs-w-full dvs-h-full dvs-object-contain dvs-transition-opacity dvs-duration-1000",class:{"dvs-opacity-0":!e.loaded,"dvs-opacity-100":e.loaded},attrs:{src:"storage/slice-previews/"+e.sliceComponent.name+".png",alt:"Preview Image"},on:{load:function(t){e.loaded=!0},click:function(t){e.zoom=!0}}})]),e.loaded&&e.zoom?s("div",{staticClass:"dvs-fixed dvs-inset-0 dvs-z-9999"},[s("div",{staticClass:"dvs-absolute dvs-inset-0 dvs-backdrop-blur dvs-flex dvs-justify-center dvs-items-center",on:{click:function(t){e.zoom=!1}}},[s("div",{staticStyle:{height:"500px",width:"500px"}},[s("img",{staticClass:"dvs-w-full dvs-h-full dvs-object-contain rounded-lg",attrs:{src:"storage/slice-previews/"+e.sliceComponent.name+".png",alt:"Preview Image",width:"500",height:"500"}})])])]):e._e()])},v=[],u={props:{sliceComponent:{type:Object,required:!0}},data(){return{zoom:!1,loaded:!1}},computed:{...(0,o.Se)("devise",["componentFromView"])}},p=u,g=s(1001),h=(0,g.Z)(p,c,v,!1,null,null,null),f=h.exports,m={name:"DeviseSliceSelectorSlice",components:{CubeIcon:()=>s.e(952).then(s.bind(s,5761)),InformationCircleIcon:()=>s.e(952).then(s.bind(s,2683)),SliceDiagram:f},props:{file:{required:!0,type:Object}},computed:{...(0,o.Se)("devise",["componentFromView"]),sliceComponent(){return this.componentFromView(this.file.value)},description(){return!(!this.sliceComponent||!this.sliceComponent.description)&&this.sliceComponent.description},childSlot(){return!!this.sliceComponent&&this.sliceComponent.has_child_slot},database(){return!!this.sliceComponent&&this.sliceComponent.database},preview(){return!(!this.sliceComponent||!this.sliceComponent.preview)}}},b=m,y=(0,g.Z)(b,l,a,!1,null,null,null),C=y.exports,x={name:"DeviseSliceSelectorDirectory",components:{SliceSelectorSlice:C},props:{directory:{required:!0,type:Object},value:{type:Object,default:()=>{}},allowedViews:{type:Array,default:null}},computed:{...(0,o.Se)("devise",["componentFromView"]),currentDirectoryFiles(){return this.allowedViews&&this.allowedViews.length?this.directory.files.filter((e=>this.allowedViews.includes(e.value))):this.directory.files},name(){return this.directory.path.trim().replace("."," ")}},methods:{isSelected(e){return null!==this.value&&e.value===this.value.value},toggleSelectSlice(e){this.value&&e.value===this.value.value?this.$emit("input",null):this.$emit("input",e)}}},w=x,k=(0,g.Z)(w,n,d,!1,null,null,null),_=k.exports,S={components:{SliceSelectorDirectory:_,XIcon:()=>s.e(952).then(s.bind(s,7583))},props:{value:{type:Object,default:()=>{}},modelQuery:{type:Object,default:()=>{}}},data(){return{directoryStack:[],filter:null}},computed:{...(0,o.rn)("devise",["modelQueries"]),...(0,o.Se)("devise",["slicesDirectories"]),allDirectories(){return null!==this.filter&&""!==this.filter?this.filteredDirectories:this.slicesDirectories.directories&&this.slicesDirectories.directories.length>0?this.getDirectories(JSON.parse(JSON.stringify(this.slicesDirectories.directories)),0):[]},allowedViews(){if(this.modelQuery&&null!==this.modelQuery.key){const e=this.modelQueries.find((e=>e.key===this.modelQuery.key));return e.views}return null},filteredDirectories(){const e=this.filter.toLowerCase().split(" "),t=this.getDirectories(JSON.parse(JSON.stringify(this.slicesDirectories.directories)),0).filter((t=>{if(e.every((e=>t.path.toLowerCase().includes(e))))return!0;let{files:s}=t;return s=s.filter((t=>e.every((e=>t.value.toLowerCase().includes(e))))),!!s.length&&(t.files=s,!0)}));return t}},mounted(){this.$refs.filter.focus()},methods:{getDirectoryFiles(e,t){return t=e.find((e=>e.dirName===t)),t},getDirectories(e){let t=[];return e.map((e=>(t.push(e),e.directories&&e.directories.length>0&&(t=t.concat(this.getDirectories(e.directories))),e))),t},filteredFiles(e){const t=this.filter.toLowerCase();return e.files.filter((e=>!!e.name.toLowerCase().includes(t)))},update(e){this.$emit("input",e)}}},$=S,M=(0,g.Z)($,i,r,!1,null,null,null),P=M.exports},9426:function(e,t,s){s.r(t),s.d(t,{default:function(){return C}});var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"dvs-fixed dvs-z-9999",staticStyle:{top:"30px",right:"30px"}},[e.showEditor?s("div",{staticClass:"dvs-z-50 dvs-min-w-96 dvs-z-50 dvs-rounded dvs-bg-gray-800 dvs-text-gray-200 dvs-shadow-lg dvs-flex dvs-items-stretch",staticStyle:{height:"calc(100vh - 50px)"}},[s("div",{staticClass:"dvs-left-0 dvs-z-10 dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg",style:{position:"relative",bottom:"auto",width:"175px",margin:0},attrs:{id:"dvs-admin-sidebar"}},[s("ul",[s("li",{staticClass:"dvs-cursor-pointer",on:{click:function(t){e.showType="desktop"}}},[e._v("Desktop")]),s("li",{staticClass:"dvs-cursor-pointer",on:{click:function(t){e.showType="tablet"}}},[e._v("Tablet")]),s("li",{staticClass:"dvs-cursor-pointer",on:{click:function(t){e.showType="mobile"}}},[e._v("Mobile")])]),s("div",{staticClass:"dvs-absolute dvs-text-xs dvs-left-0 dvs-right-0 dvs-bottom-0 dvs-p-4"},[s("button",{staticClass:"dvs-btn dvs-btn-primary dvs-w-full dvs-mb-2",on:{click:e.closeEditor}},[e._v(" Done ")])])]),s("div",{staticClass:"dvs-p-8 dvs-overflow-y-scroll"},[s("div",[s("div",[s("div",["desktop"===e.showType?s("slice-settings-section",{attrs:{value:e.slice.settings,"background-color":e.backgroundColor,color:e.color,"responsive-mode":"desktop"},on:{resetstyles:e.resetStyles,setmarginpadding:e.setMarginPadding,setbackground:e.setBackground,setforeground:e.setForeground}}):e._e(),"tablet"===e.showType?s("slice-settings-section",{attrs:{value:e.slice.settings,"background-color":e.backgroundColor,color:e.color,"responsive-mode":"tablet"},on:{resetstyles:e.resetStyles,setmarginpadding:e.setMarginPadding,setbackground:e.setBackground,setforeground:e.setForeground}}):e._e(),"mobile"===e.showType?s("slice-settings-section",{attrs:{value:e.slice.settings,"background-color":e.backgroundColor,"responsive-mode":"mobile"},on:{resetstyles:e.resetStyles,setmarginpadding:e.setMarginPadding,setbackground:e.setBackground,setforeground:e.setForeground}}):e._e()],1)])])])]):e._e()])},r=[],o=s(629),n=s(538),d=s(5913),l=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("h3",{staticClass:"dvs-uppercase dvs-mb-2"},[e._v(e._s(e.responsiveMode))]),s("fieldset",{staticClass:"dvs-fieldset dvs-mb-8"},[s("label",[e._v("ID of Slice")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.settings.id,expression:"settings.id"}],attrs:{type:"text"},domProps:{value:e.settings.id},on:{input:function(t){t.target.composing||e.$set(e.settings,"id",t.target.value)}}})]),e._m(0),s("div",{staticClass:"dvs-flex dvs-justify-center dvs-my-4",attrs:{id:"dvs-slice-manager-margins-padding"}},[s("div",{staticClass:"dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg"},[s("div",{staticClass:"dvs-flex dvs-p-2 dvs-pb-0"},[s("div",{staticClass:"dvs-text-xs dvs-uppercase dvs-w-1/3"},[e._v("Margin")]),s("div",{staticClass:"dvs-w-1/3 dvs-text-center"},[s("input",{staticClass:"dvs-text-black",attrs:{type:"text"},domProps:{value:e.getStyle("margin","top")},on:{keyup:function(t){return e.setMargin("top",t)},click:function(t){return e.setMargin("top",t)}}})])]),s("div",{staticClass:"dvs-flex dvs-items-center dvs-px-2"},[s("div",[s("input",{staticClass:"dvs-text-black",attrs:{type:"text"},domProps:{value:e.getStyle("margin","left")},on:{keyup:function(t){return e.setMargin("left",t)},click:function(t){return e.setMargin("left",t)}}})]),s("div",{staticClass:"dvs-p-2"},[s("div",{staticClass:"dvs-bg-admin-highlight-bg dvs-text-admin-highlight-fg"},[s("div",{staticClass:"dvs-flex dvs-p-2 dvs-pb-0"},[s("div",{staticClass:"dvs-text-xs dvs-uppercase dvs-w-1/3"},[e._v("Padding")]),s("div",{staticClass:"dvs-w-1/3 dvs-text-center"},[s("input",{staticClass:"dvs-text-black",attrs:{type:"text"},domProps:{value:e.getStyle("padding","top")},on:{keyup:function(t){return e.setPadding("top",t)},click:function(t){return e.setPadding("top",t)}}})])]),s("div",{staticClass:"dvs-flex dvs-items-center dvs-px-2"},[s("div",[s("input",{staticClass:"dvs-text-black",attrs:{type:"text"},domProps:{value:e.getStyle("padding","left")},on:{keyup:function(t){return e.setPadding("left",t)},click:function(t){return e.setPadding("left",t)}}})]),e._m(1),s("div",[s("input",{staticClass:"dvs-text-black",attrs:{type:"text"},domProps:{value:e.getStyle("padding","right")},on:{keyup:function(t){return e.setPadding("right",t)},click:function(t){return e.setPadding("right",t)}}})])]),s("div",{staticClass:"dvs-flex dvs-justify-center dvs-p-2 dvs-pt-0"},[s("div",{staticClass:"dvs-text-center"},[s("input",{staticClass:"dvs-text-black",attrs:{type:"text"},domProps:{value:e.getStyle("padding","bottom")},on:{keyup:function(t){return e.setPadding("bottom",t)},click:function(t){return e.setPadding("bottom",t)}}})])])])]),s("div",[s("input",{staticClass:"dvs-text-black",attrs:{type:"text"},domProps:{value:e.getStyle("margin","right")},on:{keyup:function(t){return e.setMargin("right",t)},click:function(t){return e.setMargin("right",t)}}})])]),s("div",{staticClass:"dvs-flex dvs-justify-center dvs-p-2 dvs-pt-0"},[s("div",{staticClass:"dvs-text-center"},[s("input",{staticClass:"dvs-text-black",attrs:{type:"text"},domProps:{value:e.getStyle("margin","bottom")},on:{keyup:function(t){return e.setMargin("bottom",t)},click:function(t){return e.setMargin("bottom",t)}}})])])])]),s("div",{staticClass:"dvs-mb-8"},[e._m(2),s("div",{directives:[{name:"show",rawName:"v-show",value:e.showBackgroundColor,expression:"showBackgroundColor"}]},[s("color-picker",{model:{value:e.bg,callback:function(t){e.bg=t},expression:"bg"}})],1),s("button",{directives:[{name:"show",rawName:"v-show",value:!e.showBackgroundColor,expression:"!showBackgroundColor"}],staticClass:"dvs-btn dvs-btn-primary dvs-mr-2 dvs-text-xs",on:{click:function(t){e.showBackgroundColor=!0}}},[e._v(" Set Background Color ")])]),s("div",{staticClass:"dvs-mb-8"},[e._m(3),s("div",{directives:[{name:"show",rawName:"v-show",value:e.showTextColor,expression:"showTextColor"}]},[s("color-picker",{model:{value:e.textColor,callback:function(t){e.textColor=t},expression:"textColor"}})],1),s("button",{directives:[{name:"show",rawName:"v-show",value:!e.showTextColor,expression:"!showTextColor"}],staticClass:"dvs-btn dvs-btn-primary dvs-mr-2 dvs-text-xs",on:{click:function(t){e.showTextColor=!0}}},[e._v(" Set Text Color ")])]),s("button",{staticClass:"dvs-btn dvs-rounded dvs-btn-secondary dvs-text-xs",on:{click:e.resetStyles}},[e._v(" Reset all Settings ")])])},a=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("fieldset",{staticClass:"dvs-fieldset"},[s("label",[e._v("Margins and Padding")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"dvs-p-2"},[s("div",{staticClass:"dvs-bg-white dvs-w-24 dvs-h-24"},[e._v(" ")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("fieldset",{staticClass:"dvs-fieldset dvs-mt-8"},[s("label",[e._v("Background Color")]),s("p",{staticClass:"dvs-mb-4 dvs-text-xs"},[e._v("Note: Background color effects all responsive sizes")])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("fieldset",{staticClass:"dvs-fieldset dvs-mt-8"},[s("label",[e._v("Text Color")]),s("p",{staticClass:"dvs-mb-4 dvs-text-xs"},[e._v("Note: Text color effects all responsive sizes")])])}];const c=s(1477).Z;var v={name:"DeviseSliceSettingsSection",components:{"color-picker":c},props:{value:{type:Object,required:!0},responsiveMode:{type:String,required:!0},backgroundColor:{type:Object,default:null},color:{type:Object,default:null}},data(){return{showBackgroundColor:!1,showTextColor:!1}},computed:{settings:{get(){return this.value},set(e){this.$emit("input",e)}},bg:{get(){return this.backgroundColor},set(e){this.$emit("setbackground",e)}},textColor:{get(){return this.color},set(e){this.$emit("setforeground",e)}},theId:{get(){return this.id},set(e){this.$emit("setId",e)}}},methods:{setMargin(e,t){const{value:s}=t.target;this.$emit("setmarginpadding",{responsiveMode:this.responsiveMode,type:"margin",position:e,value:s})},setPadding(e,t){const{value:s}=t.target;this.$emit("setmarginpadding",{responsiveMode:this.responsiveMode,type:"padding",position:e,value:s})},getStyle(e,t){if("margin"===e||"padding"===e){let s="";if("desktop"!==this.responsiveMode&&(s=`${this.responsiveMode}_`),"undefined"!==typeof this.value[s+e]&&"undefined"!==typeof this.value[s+e][t])return this.value[s+e][t]}return 0},resetStyles(){this.$emit("resetstyles",this.responsiveMode)}}},u=v,p=s(1001),g=(0,p.Z)(u,l,a,!1,null,null,null),h=g.exports;const f=s(7621);var m={name:"SliceSettings",components:{SliceSettingsSection:h},mixins:[d.Z],data(){return{showEditor:!1,backgroundColor:null,color:null,slice:{},controlStyles:{right:null,top:null},showType:"desktop"}},computed:{...(0,o.Se)("devise",["component","sliceConfig"])},created(){this.backgroundColor=f("#fff").toRgb(),this.color=f("#000").toRgb()},mounted(){this.addListeners()},methods:{addListeners(){window.deviseSettings.$bus.$on("open-slice-settings",(e=>{this.showEditor=!0,n["default"].set(this,"slice",e),this.slice.settings.backgroundColor?this.backgroundColor=f(this.slice.settings.backgroundColor).toRgb():this.backgroundColor=f("#fff").toRgb()})),window.deviseSettings.$bus.$on("devise-close-sidebar",(()=>{this.closeEditor()}))},closeEditor(){this.showEditor=!1,this.showType="desktop",n["default"].set(this,"slice",{})},resetStyles(){this.$set(this.slice,"settings",{}),this.backgroundColor=f("#fff").toRgb()},setMarginPadding(e){"desktop"===e.responsiveMode&&this.setDesktopMarginPadding(e),"tablet"===e.responsiveMode&&this.setTabletMarginPadding(e),"mobile"===e.responsiveMode&&this.setMobileMarginPadding(e)},setDesktopMarginPadding(e){"margin"===e.type&&"undefined"===typeof this.slice.settings.margin&&this.$set(this.slice.settings,"margin",{}),"padding"===e.type&&"undefined"===typeof this.slice.settings.padding&&this.$set(this.slice.settings,"padding",{}),this.$set(this.slice.settings[e.type],e.position,e.value)},setTabletMarginPadding(e){"margin"===e.type&&"undefined"===typeof this.slice.settings.tablet_margin&&this.$set(this.slice.settings,"tablet_margin",{}),"padding"===e.type&&"undefined"===typeof this.slice.settings.tablet_padding&&this.$set(this.slice.settings,"tablet_padding",{}),this.$set(this.slice.settings[`tablet_${e.type}`],e.position,e.value)},setMobileMarginPadding(e){"margin"===e.type&&"undefined"===typeof this.slice.settings.mobile_margin&&this.$set(this.slice.settings,"mobile_margin",{}),"padding"===e.type&&"undefined"===typeof this.slice.settings.mobile_padding&&this.$set(this.slice.settings,"mobile_padding",{}),this.$set(this.slice.settings[`mobile_${e.type}`],e.position,e.value)},setBackground(e){this.$set(this.slice.settings,"backgroundColor",`rgba(${e.rgba.r},${e.rgba.g},${e.rgba.b},${e.rgba.a})`)},setForeground(e){this.$set(this.slice.settings,"color",`rgba(${e.rgba.r},${e.rgba.g},${e.rgba.b},${e.rgba.a})`)}}},b=m,y=(0,p.Z)(b,i,r,!1,null,null,null),C=y.exports}}]);
//# sourceMappingURL=devise-slices.61813888.js.map