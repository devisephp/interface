"use strict";(self["webpackChunkdevisephp_interface"]=self["webpackChunkdevisephp_interface"]||[]).push([[133],{1713:function(t,e,s){s.r(e),s.d(e,{default:function(){return D}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"dvs-relative dvs-mb-8"},[s("div",{staticClass:"dvs-flex dvs-justify-center dvs-p-4 dvs-pb-8 dvs-text-gray-200 dvs-w-full"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.filter,expression:"filter"}],ref:"filter",staticClass:"dvs-bg-transparent dvs-border-b-2 dvs-px-12 dvs-py-2 dvs-text-gray-200 dvs-outline-none dvs-placeholder-admin-fg dvs-text-center",attrs:{type:"text",placeholder:"Type to begin searching"},domProps:{value:t.filter},on:{input:function(e){e.target.composing||(t.filter=e.target.value)}}}),s("div",{staticClass:"dvs-cursor-pointer",class:{"dvs-opacity-50":""===t.filter},on:{click:function(e){t.filter=""}}},[s("x-icon")],1)]),t.allDirectories.length>0?s("div",[s("div",[t._l(t.allDirectories,(function(e,i){return s("slice-selector-directory",{key:i,attrs:{"allowed-views":t.allowedViews,directory:e,value:t.value},on:{input:t.update}})})),s("div",{staticClass:"dvs-h-32"},[t._v(" ")])],2)]):t._e()])},n=[],o=s(4367),r=(s(1539),s(8783),s(3948),s(7327),s(8862),s(9826),s(4916),s(3123),s(6699),s(2023),s(1249),s(2222),s(8309),s(629)),l=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.currentDirectoryFiles.length>0?s("div",{staticClass:"dvs-mb-8 dvs-w-full dvs-text-gray-200"},[s("div",{staticClass:"dvs-uppercase dvs-text-sm dvs-ml-2 dvs-mb-2 dvs-w-full dvs-pb-2 dvs-opacity-75"},[t._v(" "+t._s(t.name)+" ")]),s("div",{staticClass:"dvs-grid dvs-grid-cols-3"},t._l(t.currentDirectoryFiles,(function(e,i){return s("div",{key:i,staticClass:"dvs-cursor-pointer dvs-mb-1 dvs-p-2 dvs-flex",on:{click:function(s){return t.toggleSelectSlice(e)}}},[s("div",{staticClass:"dvs-w-full dvs-flex dvs-flex-col dvs-h-full dvs-shadow dvs-rounded dvs-overflow-hidden dvs-bg-gray-500 dvs-text-gray-100",class:{"dvs-ring-2 dvs-ring-offset-2 dvs-ring-red-300":t.isSelected(e)}},[s("slice-selector-slice",{staticClass:"dvs-mr-4",attrs:{file:e}})],1)])})),0)]):t._e()},d=[],a=(s(5306),s(3210),function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"dvs-flex dvs-flex-col dvs-justify-between dvs-w-full dvs-bg-gray-700 dvs-border-box"},[t.preview?s("slice-diagram",{attrs:{"slice-component":t.sliceComponent}}):t._e(),s("div",{staticClass:"dvs-flex dvs-flex-col dvs-justify-between dvs-p-4 dvs-bg-gray-500 dvs-text-gray-100"},[s("div",{staticClass:"dvs-cursor-pointer dvs-text-sm dvs-font-bold"},[t._v(t._s(t.file.name))]),s("div",{staticClass:"flex-none"},[t.description?s("div",{staticClass:"dvs-text-2xs dvs-mb-2 dvs-opacity-75"},[t._v(" "+t._s(t.description)+" ")]):t._e(),t.childSlot?s("div",{staticClass:"dvs-text-xs dvs-flex dvs-items-align dvs-opacity-75"},[s("information-circle-icon",{staticClass:"dvs-mr-1"}),t._v("Can contain sub-slices ")],1):t._e(),t.database?s("div",{staticClass:"dvs-text-xs dvs-flex dvs-items-align dvs-opacity-75"},[s("cube-icon",{staticClass:"dvs-mr-1"}),t._v("Database driven ")],1):t._e()])])],1)}),c=[],u=(s(2526),s(1817),function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"dvs-relative dvs-w-full dvs-rounded-sm dvs-overflow-hidden dvs-bg-gray-700 dvs-text-gray-600",staticStyle:{height:"250px"}},[s("div",{staticClass:"dvs-absolute dvs-z-0 dvs-inset-0 dvs-flex dvs-items-center dvs-justify-center"},[s("svg",{staticClass:"w-16 h-16",attrs:{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"}},[s("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"}})])]),s("img",{staticClass:"dvs-relative dvs-z-10 dvs-w-full dvs-h-full dvs-object-contain dvs-transition-opacity dvs-duration-1000",class:{"dvs-opacity-0":!t.loaded,"dvs-opacity-100":t.loaded},attrs:{src:"storage/slice-previews/"+t.sliceComponent.name+".png",alt:"Preview Image"},on:{load:function(e){t.loaded=!0},click:function(e){t.zoom=!0}}})]),t.loaded&&t.zoom?s("div",{staticClass:"dvs-fixed dvs-inset-0 dvs-z-9999"},[s("div",{staticClass:"dvs-absolute dvs-inset-0 dvs-backdrop-blur dvs-flex dvs-justify-center dvs-items-center",on:{click:function(e){t.zoom=!1}}},[s("div",{staticStyle:{height:"500px",width:"500px"}},[s("img",{staticClass:"dvs-w-full dvs-h-full dvs-object-contain rounded-lg",attrs:{src:"storage/slice-previews/"+t.sliceComponent.name+".png",alt:"Preview Image",width:"500",height:"500"}})])])]):t._e()])}),v=[],g={props:{sliceComponent:{type:Object,required:!0}},data:function(){return{zoom:!1,loaded:!1}},computed:(0,o.Z)({},(0,r.Se)("devise",["componentFromView"]))},p=g,f=s(1001),h=(0,f.Z)(p,u,v,!1,null,null,null),m=h.exports,b={name:"DeviseSliceSelectorSlice",components:{CubeIcon:function(){return s.e(952).then(s.bind(s,5761))},InformationCircleIcon:function(){return s.e(952).then(s.bind(s,2683))},SliceDiagram:m},props:{file:{required:!0,type:Object}},computed:(0,o.Z)((0,o.Z)({},(0,r.Se)("devise",["componentFromView"])),{},{sliceComponent:function(){return this.componentFromView(this.file.value)},description:function(){return!(!this.sliceComponent||!this.sliceComponent.description)&&this.sliceComponent.description},childSlot:function(){return!!this.sliceComponent&&this.sliceComponent.has_child_slot},database:function(){return!!this.sliceComponent&&this.sliceComponent.database},preview:function(){return!(!this.sliceComponent||!this.sliceComponent.preview)}})},y=b,x=(0,f.Z)(y,a,c,!1,null,null,null),C=x.exports,w={name:"DeviseSliceSelectorDirectory",components:{SliceSelectorSlice:C},props:{directory:{required:!0,type:Object},value:{type:Object,default:function(){}},allowedViews:{type:Array,default:null}},computed:(0,o.Z)((0,o.Z)({},(0,r.Se)("devise",["componentFromView"])),{},{currentDirectoryFiles:function(){var t=this;return this.allowedViews&&this.allowedViews.length?this.directory.files.filter((function(e){return t.allowedViews.includes(e.value)})):this.directory.files},name:function(){return this.directory.path.trim().replace("."," ")}}),methods:{isSelected:function(t){return null!==this.value&&t.value===this.value.value},toggleSelectSlice:function(t){this.value&&t.value===this.value.value?this.$emit("input",null):this.$emit("input",t)}}},k=w,_=(0,f.Z)(k,l,d,!1,null,null,null),S=_.exports,M={components:{SliceSelectorDirectory:S,XIcon:function(){return s.e(952).then(s.bind(s,7583))}},props:{value:{type:Object,default:function(){}},modelQuery:{type:Object,default:function(){}}},data:function(){return{directoryStack:[],filter:null}},computed:(0,o.Z)((0,o.Z)((0,o.Z)({},(0,r.rn)("devise",["modelQueries"])),(0,r.Se)("devise",["slicesDirectories"])),{},{allDirectories:function(){return null!==this.filter&&""!==this.filter?this.filteredDirectories:this.slicesDirectories.directories&&this.slicesDirectories.directories.length>0?this.getDirectories(JSON.parse(JSON.stringify(this.slicesDirectories.directories)),0):[]},allowedViews:function(){var t=this;if(this.modelQuery&&null!==this.modelQuery.key){var e=this.modelQueries.find((function(e){return e.key===t.modelQuery.key}));return e.views}return null},filteredDirectories:function(){var t=this.filter.toLowerCase().split(" "),e=this.getDirectories(JSON.parse(JSON.stringify(this.slicesDirectories.directories)),0).filter((function(e){if(t.every((function(t){return e.path.toLowerCase().includes(t)})))return!0;var s=e.files;return s=s.filter((function(e){return t.every((function(t){return e.value.toLowerCase().includes(t)}))})),!!s.length&&(e.files=s,!0)}));return e}}),mounted:function(){this.$refs.filter.focus()},methods:{getDirectoryFiles:function(t,e){return e=t.find((function(t){return t.dirName===e})),e},getDirectories:function(t){var e=this,s=[];return t.map((function(t){return s.push(t),t.directories&&t.directories.length>0&&(s=s.concat(e.getDirectories(t.directories))),t})),s},filteredFiles:function(t){var e=this.filter.toLowerCase();return t.files.filter((function(t){return!!t.name.toLowerCase().includes(e)}))},update:function(t){this.$emit("input",t)}}},$=M,P=(0,f.Z)($,i,n,!1,null,null,null),D=P.exports},9426:function(t,e,s){s.r(e),s.d(e,{default:function(){return C}});var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"dvs-fixed dvs-z-9999",staticStyle:{top:"30px",right:"30px"}},[t.showEditor?s("div",{staticClass:"dvs-z-50 dvs-min-w-96 dvs-z-50 dvs-rounded dvs-bg-gray-800 dvs-text-gray-200 dvs-shadow-lg dvs-flex dvs-items-stretch",staticStyle:{height:"calc(100vh - 50px)"}},[s("div",{staticClass:"dvs-left-0 dvs-z-10 dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg",style:{position:"relative",bottom:"auto",width:"175px",margin:0},attrs:{id:"dvs-admin-sidebar"}},[s("ul",[s("li",{staticClass:"dvs-cursor-pointer",on:{click:function(e){t.showType="desktop"}}},[t._v("Desktop")]),s("li",{staticClass:"dvs-cursor-pointer",on:{click:function(e){t.showType="tablet"}}},[t._v("Tablet")]),s("li",{staticClass:"dvs-cursor-pointer",on:{click:function(e){t.showType="mobile"}}},[t._v("Mobile")])]),s("div",{staticClass:"dvs-absolute dvs-text-xs dvs-left-0 dvs-right-0 dvs-bottom-0 dvs-p-4"},[s("button",{staticClass:"dvs-btn dvs-btn-primary dvs-w-full dvs-mb-2",on:{click:t.closeEditor}},[t._v(" Done ")])])]),s("div",{staticClass:"dvs-p-8 dvs-overflow-y-scroll"},[s("div",[s("div",[s("div",["desktop"===t.showType?s("slice-settings-section",{attrs:{value:t.slice.settings,"background-color":t.backgroundColor,color:t.color,"responsive-mode":"desktop"},on:{resetstyles:t.resetStyles,setmarginpadding:t.setMarginPadding,setbackground:t.setBackground,setforeground:t.setForeground}}):t._e(),"tablet"===t.showType?s("slice-settings-section",{attrs:{value:t.slice.settings,"background-color":t.backgroundColor,color:t.color,"responsive-mode":"tablet"},on:{resetstyles:t.resetStyles,setmarginpadding:t.setMarginPadding,setbackground:t.setBackground,setforeground:t.setForeground}}):t._e(),"mobile"===t.showType?s("slice-settings-section",{attrs:{value:t.slice.settings,"background-color":t.backgroundColor,"responsive-mode":"mobile"},on:{resetstyles:t.resetStyles,setmarginpadding:t.setMarginPadding,setbackground:t.setBackground,setforeground:t.setForeground}}):t._e()],1)])])])]):t._e()])},n=[],o=s(4367),r=(s(7042),s(2222),s(629)),l=s(538),d=s(5913),a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("h3",{staticClass:"dvs-uppercase dvs-mb-2"},[t._v(t._s(t.responsiveMode))]),s("fieldset",{staticClass:"dvs-fieldset dvs-mb-8"},[s("label",[t._v("ID of Slice")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.settings.id,expression:"settings.id"}],attrs:{type:"text"},domProps:{value:t.settings.id},on:{input:function(e){e.target.composing||t.$set(t.settings,"id",e.target.value)}}})]),t._m(0),s("div",{staticClass:"dvs-flex dvs-justify-center dvs-my-4",attrs:{id:"dvs-slice-manager-margins-padding"}},[s("div",{staticClass:"dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg"},[s("div",{staticClass:"dvs-flex dvs-p-2 dvs-pb-0"},[s("div",{staticClass:"dvs-text-xs dvs-uppercase dvs-w-1/3"},[t._v("Margin")]),s("div",{staticClass:"dvs-w-1/3 dvs-text-center"},[s("input",{staticClass:"dvs-text-black",attrs:{type:"text"},domProps:{value:t.getStyle("margin","top")},on:{keyup:function(e){return t.setMargin("top",e)},click:function(e){return t.setMargin("top",e)}}})])]),s("div",{staticClass:"dvs-flex dvs-items-center dvs-px-2"},[s("div",[s("input",{staticClass:"dvs-text-black",attrs:{type:"text"},domProps:{value:t.getStyle("margin","left")},on:{keyup:function(e){return t.setMargin("left",e)},click:function(e){return t.setMargin("left",e)}}})]),s("div",{staticClass:"dvs-p-2"},[s("div",{staticClass:"dvs-bg-admin-highlight-bg dvs-text-admin-highlight-fg"},[s("div",{staticClass:"dvs-flex dvs-p-2 dvs-pb-0"},[s("div",{staticClass:"dvs-text-xs dvs-uppercase dvs-w-1/3"},[t._v("Padding")]),s("div",{staticClass:"dvs-w-1/3 dvs-text-center"},[s("input",{staticClass:"dvs-text-black",attrs:{type:"text"},domProps:{value:t.getStyle("padding","top")},on:{keyup:function(e){return t.setPadding("top",e)},click:function(e){return t.setPadding("top",e)}}})])]),s("div",{staticClass:"dvs-flex dvs-items-center dvs-px-2"},[s("div",[s("input",{staticClass:"dvs-text-black",attrs:{type:"text"},domProps:{value:t.getStyle("padding","left")},on:{keyup:function(e){return t.setPadding("left",e)},click:function(e){return t.setPadding("left",e)}}})]),t._m(1),s("div",[s("input",{staticClass:"dvs-text-black",attrs:{type:"text"},domProps:{value:t.getStyle("padding","right")},on:{keyup:function(e){return t.setPadding("right",e)},click:function(e){return t.setPadding("right",e)}}})])]),s("div",{staticClass:"dvs-flex dvs-justify-center dvs-p-2 dvs-pt-0"},[s("div",{staticClass:"dvs-text-center"},[s("input",{staticClass:"dvs-text-black",attrs:{type:"text"},domProps:{value:t.getStyle("padding","bottom")},on:{keyup:function(e){return t.setPadding("bottom",e)},click:function(e){return t.setPadding("bottom",e)}}})])])])]),s("div",[s("input",{staticClass:"dvs-text-black",attrs:{type:"text"},domProps:{value:t.getStyle("margin","right")},on:{keyup:function(e){return t.setMargin("right",e)},click:function(e){return t.setMargin("right",e)}}})])]),s("div",{staticClass:"dvs-flex dvs-justify-center dvs-p-2 dvs-pt-0"},[s("div",{staticClass:"dvs-text-center"},[s("input",{staticClass:"dvs-text-black",attrs:{type:"text"},domProps:{value:t.getStyle("margin","bottom")},on:{keyup:function(e){return t.setMargin("bottom",e)},click:function(e){return t.setMargin("bottom",e)}}})])])])]),s("div",{staticClass:"dvs-mb-8"},[t._m(2),s("div",{directives:[{name:"show",rawName:"v-show",value:t.showBackgroundColor,expression:"showBackgroundColor"}]},[s("color-picker",{model:{value:t.bg,callback:function(e){t.bg=e},expression:"bg"}})],1),s("button",{directives:[{name:"show",rawName:"v-show",value:!t.showBackgroundColor,expression:"!showBackgroundColor"}],staticClass:"dvs-btn dvs-btn-primary dvs-mr-2 dvs-text-xs",on:{click:function(e){t.showBackgroundColor=!0}}},[t._v(" Set Background Color ")])]),s("div",{staticClass:"dvs-mb-8"},[t._m(3),s("div",{directives:[{name:"show",rawName:"v-show",value:t.showTextColor,expression:"showTextColor"}]},[s("color-picker",{model:{value:t.textColor,callback:function(e){t.textColor=e},expression:"textColor"}})],1),s("button",{directives:[{name:"show",rawName:"v-show",value:!t.showTextColor,expression:"!showTextColor"}],staticClass:"dvs-btn dvs-btn-primary dvs-mr-2 dvs-text-xs",on:{click:function(e){t.showTextColor=!0}}},[t._v(" Set Text Color ")])]),s("button",{staticClass:"dvs-btn dvs-rounded dvs-btn-secondary dvs-text-xs",on:{click:t.resetStyles}},[t._v(" Reset all Settings ")])])},c=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("fieldset",{staticClass:"dvs-fieldset"},[s("label",[t._v("Margins and Padding")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"dvs-p-2"},[s("div",{staticClass:"dvs-bg-white dvs-w-24 dvs-h-24"},[t._v(" ")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("fieldset",{staticClass:"dvs-fieldset dvs-mt-8"},[s("label",[t._v("Background Color")]),s("p",{staticClass:"dvs-mb-4 dvs-text-xs"},[t._v("Note: Background color effects all responsive sizes")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("fieldset",{staticClass:"dvs-fieldset dvs-mt-8"},[s("label",[t._v("Text Color")]),s("p",{staticClass:"dvs-mb-4 dvs-text-xs"},[t._v("Note: Text color effects all responsive sizes")])])}],u=s(1477).Z,v={name:"DeviseSliceSettingsSection",components:{"color-picker":u},props:{value:{type:Object,required:!0},responsiveMode:{type:String,required:!0},backgroundColor:{type:Object,default:null},color:{type:Object,default:null}},data:function(){return{showBackgroundColor:!1,showTextColor:!1}},computed:{settings:{get:function(){return this.value},set:function(t){this.$emit("input",t)}},bg:{get:function(){return this.backgroundColor},set:function(t){this.$emit("setbackground",t)}},textColor:{get:function(){return this.color},set:function(t){this.$emit("setforeground",t)}},theId:{get:function(){return this.id},set:function(t){this.$emit("setId",t)}}},methods:{setMargin:function(t,e){var s=e.target.value;this.$emit("setmarginpadding",{responsiveMode:this.responsiveMode,type:"margin",position:t,value:s})},setPadding:function(t,e){var s=e.target.value;this.$emit("setmarginpadding",{responsiveMode:this.responsiveMode,type:"padding",position:t,value:s})},getStyle:function(t,e){if("margin"===t||"padding"===t){var s="";if("desktop"!==this.responsiveMode&&(s="".concat(this.responsiveMode,"_")),"undefined"!==typeof this.value[s+t]&&"undefined"!==typeof this.value[s+t][e])return this.value[s+t][e]}return 0},resetStyles:function(){this.$emit("resetstyles",this.responsiveMode)}}},g=v,p=s(1001),f=(0,p.Z)(g,a,c,!1,null,null,null),h=f.exports,m=s(7621),b={name:"SliceSettings",components:{SliceSettingsSection:h},mixins:[d.Z],data:function(){return{showEditor:!1,backgroundColor:null,color:null,slice:{},controlStyles:{right:null,top:null},showType:"desktop"}},computed:(0,o.Z)({},(0,r.Se)("devise",["component","sliceConfig"])),created:function(){this.backgroundColor=m("#fff").toRgb(),this.color=m("#000").toRgb()},mounted:function(){this.addListeners()},methods:{addListeners:function(){var t=this;window.deviseSettings.$bus.$on("open-slice-settings",(function(e){t.showEditor=!0,l["default"].set(t,"slice",e),t.slice.settings.backgroundColor?t.backgroundColor=m(t.slice.settings.backgroundColor).toRgb():t.backgroundColor=m("#fff").toRgb()})),window.deviseSettings.$bus.$on("devise-close-sidebar",(function(){t.closeEditor()}))},closeEditor:function(){this.showEditor=!1,this.showType="desktop",l["default"].set(this,"slice",{})},resetStyles:function(){this.$set(this.slice,"settings",{}),this.backgroundColor=m("#fff").toRgb()},setMarginPadding:function(t){"desktop"===t.responsiveMode&&this.setDesktopMarginPadding(t),"tablet"===t.responsiveMode&&this.setTabletMarginPadding(t),"mobile"===t.responsiveMode&&this.setMobileMarginPadding(t)},setDesktopMarginPadding:function(t){"margin"===t.type&&"undefined"===typeof this.slice.settings.margin&&this.$set(this.slice.settings,"margin",{}),"padding"===t.type&&"undefined"===typeof this.slice.settings.padding&&this.$set(this.slice.settings,"padding",{}),this.$set(this.slice.settings[t.type],t.position,t.value)},setTabletMarginPadding:function(t){"margin"===t.type&&"undefined"===typeof this.slice.settings.tablet_margin&&this.$set(this.slice.settings,"tablet_margin",{}),"padding"===t.type&&"undefined"===typeof this.slice.settings.tablet_padding&&this.$set(this.slice.settings,"tablet_padding",{}),this.$set(this.slice.settings["tablet_".concat(t.type)],t.position,t.value)},setMobileMarginPadding:function(t){"margin"===t.type&&"undefined"===typeof this.slice.settings.mobile_margin&&this.$set(this.slice.settings,"mobile_margin",{}),"padding"===t.type&&"undefined"===typeof this.slice.settings.mobile_padding&&this.$set(this.slice.settings,"mobile_padding",{}),this.$set(this.slice.settings["mobile_".concat(t.type)],t.position,t.value)},setBackground:function(t){this.$set(this.slice.settings,"backgroundColor","rgba(".concat(t.rgba.r,",").concat(t.rgba.g,",").concat(t.rgba.b,",").concat(t.rgba.a,")"))},setForeground:function(t){this.$set(this.slice.settings,"color","rgba(".concat(t.rgba.r,",").concat(t.rgba.g,",").concat(t.rgba.b,",").concat(t.rgba.a,")"))}}},y=b,x=(0,p.Z)(y,i,n,!1,null,null,null),C=x.exports},3123:function(t,e,s){var i=s(2104),n=s(6916),o=s(1702),r=s(7007),l=s(7850),d=s(9670),a=s(4488),c=s(6707),u=s(1530),v=s(7466),g=s(1340),p=s(8173),f=s(1589),h=s(7651),m=s(2261),b=s(2999),y=s(7293),x=b.UNSUPPORTED_Y,C=4294967295,w=Math.min,k=[].push,_=o(/./.exec),S=o(k),M=o("".slice),$=!y((function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var s="ab".split(t);return 2!==s.length||"a"!==s[0]||"b"!==s[1]}));r("split",(function(t,e,s){var o;return o="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,s){var o=g(a(this)),r=void 0===s?C:s>>>0;if(0===r)return[];if(void 0===t)return[o];if(!l(t))return n(e,o,t,r);var d,c,u,v=[],p=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),h=0,b=new RegExp(t.source,p+"g");while(d=n(m,b,o)){if(c=b.lastIndex,c>h&&(S(v,M(o,h,d.index)),d.length>1&&d.index<o.length&&i(k,v,f(d,1)),u=d[0].length,h=c,v.length>=r))break;b.lastIndex===d.index&&b.lastIndex++}return h===o.length?!u&&_(b,"")||S(v,""):S(v,M(o,h)),v.length>r?f(v,0,r):v}:"0".split(void 0,0).length?function(t,s){return void 0===t&&0===s?[]:n(e,this,t,s)}:e,[function(e,s){var i=a(this),r=void 0==e?void 0:p(e,t);return r?n(r,e,i,s):n(o,g(i),e,s)},function(t,i){var n=d(this),r=g(t),l=s(o,n,r,i,o!==e);if(l.done)return l.value;var a=c(n,RegExp),p=n.unicode,f=(n.ignoreCase?"i":"")+(n.multiline?"m":"")+(n.unicode?"u":"")+(x?"g":"y"),m=new a(x?"^(?:"+n.source+")":n,f),b=void 0===i?C:i>>>0;if(0===b)return[];if(0===r.length)return null===h(m,r)?[r]:[];var y=0,k=0,_=[];while(k<r.length){m.lastIndex=x?0:k;var $,P=h(m,x?M(r,k):r);if(null===P||($=w(v(m.lastIndex+(x?k:0)),r.length))===y)k=u(r,k,p);else{if(S(_,M(r,y,k)),_.length===b)return _;for(var D=1;D<=P.length-1;D++)if(S(_,P[D]),_.length===b)return _;k=y=$}}return S(_,M(r,y)),_}]}),!$,x)}}]);
//# sourceMappingURL=devise-slices-legacy.7e88851f.js.map