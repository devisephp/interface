(self["webpackChunkdevisephp_interface"]=self["webpackChunkdevisephp_interface"]||[]).push([[90,519],{5864:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return g}});var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"admin-route-wrapper",staticClass:"dvs-relative dvs-max-w-1/2 dvs-self-center dvs-shadow-lg dvs-bg-gray-800 dvs-text-gray-200 dvs-rounded dvs-pointer-events-auto",staticStyle:{"min-width":"400px"},attrs:{id:"dvs-admin-content-container"}},[n("div",{ref:"Scrollbar",staticClass:"dvs-max-h-[90vh]"},[n("div",[n("div",[e.can("manage slices")?n("div",{staticClass:"dvs-pt-8 dvs-pb-16 dvs-relative"},[n("div",{staticClass:"dvs-absolute dvs-top-0 dvs-right-0 dvs-mt-4 dvs-mr-4"},[n("toggle",{attrs:{id:e.randomString(8),mini:!0},on:{change:e.setDevMode}})],1),n("div",{staticClass:"dvs-px-8 dvs-mb-8 dvs-text-xl dvs-font-sans"},[n("div",{staticClass:"dvs-cursor-pointer dvs-flex dvs-items-center",on:{click:function(t){return e.goToEditPage()}}},[n("span",{staticClass:"dvs-text-xs dvs-mr-2"},[n("edit-icon")],1),e._v(" "+e._s(e.currentPage.title)+" ")])]),n("div",{staticClass:"dvs-p-8 dvs-pt-0"},[e.showTimeTravel?n("fieldset",{staticClass:"dvs-fieldset"},[n("label",[e._v("Preview Date Time")]),n("div",{staticClass:"dvs-flex"},[n("date-picker",{ref:"datepicker",staticClass:"dvs-mr-2",attrs:{settings:{date:!0,time:!0}},model:{value:e.timeTravelDate,callback:function(t){e.timeTravelDate=t},expression:"timeTravelDate"}}),n("button",{staticClass:"dvs-rounded dvs-btn dvs-btn-primary dvs-btn-sm dvs-flex dvs-justify-center dvs-items-center dvs-uppercase dvs-text-xs dvs-font-bold",on:{click:e.timeTravel}},[e._v(" Go ")])],1)]):n("fieldset",{staticClass:"dvs-fieldset"},[n("div",{staticClass:"flex flex-col items-stretch"},[n("label",{staticClass:"dvs-opacity-75 dvs-font-sans"},[e._v("Page Version")]),n("select",{staticClass:"dvs-small dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg",on:{change:e.selectVersion}},[e._l(e.currentPage.versions,(function(t){return n("option",{key:t.id,domProps:{value:t.id,selected:t.current}},[e._v(" "+e._s(t.name)+" "),t.current?[e._v("(Currently Viewing)")]:e._e(),t.is_live?[e._v(" (Live)")]:e._e()],2)})),n("option",{attrs:{value:"timetravel"}},[e._v("Time Travel Preview")])],2)])])]),e._m(0),n("div",{staticClass:"dvs-flex dvs-flex-col dvs-items-center"},[n("draggable",e._b({staticClass:"dvs-w-full dvs-px-4 dvs-relative dvs-z-[1000000]",attrs:{list:e.currentPageSlices,tag:"ul"}},"draggable",{group:{name:"slices"},animation:200,ghostClass:"dvs-ghost",handle:".dvs-handle",dragClass:"dvs-chosen-drag-slice",emptyInsertThreshold:10,removeCloneOnHide:!1},!1),[e._l(e.currentPageSlices,(function(t,s){return[n("slice-editor",{key:e.randomString(8,s),on:{opened:function(n){return e.openSlice(t)},addSlice:e.addSlice,editSlice:e.editSlice,removeSlice:e.removeSlice,copySlice:e.copySlice},model:{value:e.currentPageSlices[s],callback:function(t){e.$set(e.currentPageSlices,s,t)},expression:"currentPageSlices[key]"}})]}))],2)],1),e.additionalPageSettings?n("div",{staticClass:"dvs-px-8"},[n("fieldset",{staticClass:"dvs-fieldset dvs-mb-2"},[n("label",{staticClass:"dvs-mb-2 dvs-cursor-pointer",on:{click:function(t){e.additionalSettingsOpen=!e.additionalSettingsOpen}}},[e._v("Additional Page Settings")])]),n("slice-editor-fields",{directives:[{name:"show",rawName:"v-show",value:e.additionalSettingsOpen,expression:"additionalSettingsOpen"}],attrs:{"the-fields":e.additionalPageSettings},model:{value:e.currentPage.settings.fields,callback:function(t){e.$set(e.currentPage.settings,"fields",t)},expression:"currentPage.settings.fields"}})],1):e._e(),n("div",{staticClass:"dvs-relative dvs-flex dvs-flex-col dvs-items-center dvs-px-8"},[!0===e.createSlice?n("manage-slice",{ref:"manageSlice",attrs:{mode:"inserting"},on:{addSlice:e.addSlice,cancel:function(t){e.createSlice=!1}}}):e._e()],1)]):n("div",[e._m(1)]),e.can("manage slices")?n("div",{staticClass:"dvs-absolute dvs-bottom-0 dvs-left-0 dvs-right-0 dvs-mb-3 dvs-flex dvs-justify-around dvs-items-stretch dvs-p-2 dvs-px-8"},[n("button",{staticClass:"dvs-btn dvs-btn-sm dvs-btn-primary dvs-w-2/5 dvs-mr-2 dvs-flex dvs-justify-center dvs-items-center",on:{click:function(t){return t.preventDefault(),e.requestSavePage()}}},[e.saving?n("refresh-icon",{staticClass:"dvs-mr-2 dvs-rotate-ccw",attrs:{w:"15",h:"15"}}):e._e(),e._v("Save Page ")],1),n("button",{staticClass:"dvs-btn dvs-btn-sm dvs-btn-secondary dvs-w-3/5 dvs-flex dvs-justify-center dvs-items-center dvs-uppercase dvs-font-bold dvs-w-2/5",on:{click:function(t){return t.preventDefault(),e.requestAddSlice.apply(null,arguments)}}},[e._v(" Add Slice ")])]):e._e()])])])])},i=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"dvs-px-8"},[n("fieldset",{staticClass:"dvs-fieldset"},[n("label",{staticClass:"dvs-opacity-75 dvs-font-sans"},[e._v("Page Slices")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"dvs-p-8"},[n("fieldset",{staticClass:"dvs-fieldset"},[n("div",{staticClass:"dvs-flex dvs-flex-col dvs-items-stretch"},[n("h4",[e._v("Administration")]),n("p",{staticClass:"dvs-mt-4"},[e._v("Use the icons along the left column to navigate.")])])])])}],r=n(9726),a=n(4367),o=(n(1539),n(8783),n(3948),n(9826),n(1249),n(561),n(8862),n(6699),n(2023),n(4916),n(5306),n(2222),n(4765),n(629)),c=n(6994),l=n(5913),u=n(7563),d={name:"PageEditor",components:{DatePicker:c["default"],RefreshIcon:function(){return n.e(952).then(n.bind(n,8159))},draggable:function(){return Promise.all([n.e(477),n.e(469)]).then(n.t.bind(n,9980,23))},ManageSlice:function(){return Promise.all([n.e(477),n.e(469)]).then(n.bind(n,7905))},SliceEditor:function(){return Promise.all([n.e(477),n.e(469)]).then(n.bind(n,8770))},SliceEditorFields:function(){return Promise.all([n.e(477),n.e(469)]).then(n.bind(n,4115))},Toggle:function(){return n.e(524).then(n.bind(n,5113))},EditIcon:function(){return n.e(952).then(n.bind(n,3180))}},mixins:[l.Z],data:function(){return{saving:!1,createSlice:!1,showTimeTravel:!1,timeTravelDate:null,additionalSettingsOpen:!1,queryString:u}},computed:(0,a.Z)((0,a.Z)({},(0,o.Se)("devise",["currentPage","sliceConfig"])),{},{currentPageSlices:function(){return this.currentPage.slices},additionalPageSettings:function(){var e=this;if(window.deviseSettings.$config.additionalPageSettings){var t=window.deviseSettings.$config.additionalPageSettings.find((function(t){return t.siteId===e.currentPage.site_id}));if(t)return t.fields}return!1}}),mounted:function(){var e=this;this.additionalPageSettings&&(this.currentPage.settings.fields=Object.assign({},this.additionalPageSettings,this.currentPage.settings.fields)),setTimeout((function(){e.$watch("currentPage",(function(){window.onbeforeunload=function(){return"Changes you made may not be saved"}}),{deep:!0})}),1e3)},methods:(0,a.Z)((0,a.Z)({},(0,o.nv)("devise",["savePage","setDevMode"])),{},{requestSavePage:function(){var e=this;this.saving=!0,this.savePage({page:this.currentPage}).then((function(e){480===e?window.deviseSettings.$bus.$emit("showForceSave"):window.onbeforeunload=null})).finally((function(){e.saving=!1,e.recalculateScroll()}))},goToEditPage:function(){this.$router.push({name:"devise-pages-admin",params:{workflowKey:"jumpto-edit-page",pageId:this.currentPage.id}})},toggleSlice:function(e){e.metadata.open?this.closeSlice(e):this.openSlice(e)},openSlice:function(e){var t=this;this.currentPage.slices.map((function(e){return t.closeSlice(e)})),this.$set(e.metadata,"open",!0)},closeSlice:function(e){this.$set(e.metadata,"open",!1)},requestAddSlice:function(){this.createSlice=!0},addSlice:function(e,t){if("undefined"!==typeof t){var n=this.sliceConfig(t);!0===n.has_child_slot&&("undefined"===typeof t.slices&&this.$set(t,"slices",[]),t.slices.push(e))}else!0===e.metadata.has_child_slot&&"undefined"===typeof e.slices&&this.$set(e,"slices",[]),this.currentPage.slices.push(e);this.createSlice=!1},findReferenceSliceInSlices:function(e,t){var n=this;return e.find((function(e){return e===t?e:e.slices?n.findReferenceSliceInSlices(e.slices,t):void 0}))},editSlice:function(e,t){e.metadata.has_child_slot&&(e.slices=t.slices),this.currentPage.slices.splice(this.currentPage.slices.indexOf(t),1,e)},setSubSliceInstaceToZero:function(e){for(var t=0;t<e.length;t+=1)e[t].metadata.instance_id=0,"object"===(0,r.Z)(e[t].slices)&&e[t].slices.length>0&&(e[t].slices=this.setSubSliceInstaceToZero(e[t].slices));return e},copySlice:function(e,t){null===t&&(t=this.currentPage);var n=JSON.parse(JSON.stringify(e));n.metadata.instance_id=0,"object"===(0,r.Z)(n.slices)&&n.slices.length>0&&(n.slices=this.setSubSliceInstaceToZero(n.slices)),t.slices.push(n)},removeSlice:function(e,t){"undefined"===typeof t&&(t=this.currentPage),t.slices.splice(t.slices.indexOf(e),1)},selectVersion:function(e){if("timetravel"===e.target.value)return this.showTimeTravel=!0,!1;var t=parseInt(e.target.value,0),n=document.location.href,s="";return n.includes("version_id")?(s=n.replace(/(version_id=[0-9]*)/g,"version_id=".concat(t)),document.location.href=s,!0):(s=n,s=s.includes("?")?"".concat(s,"&"):"".concat(s,"?"),document.location.href="".concat(s,"version_id=").concat(t),!0)},timeTravel:function(){var e={time_travel_to:this.timeTravelDate},t=this.queryString.stringify(e);return document.location.search=t,!0},recalculateScroll:function(){var e=this;this.$nextTick((function(){"undefined"!==typeof e.$refs.Scrollbar&&(e.$refs.Scrollbar.calculateSize(),e.$refs.Scrollbar.scrollToY(0))}))}})},f=d,v=n(1001),h=(0,v.Z)(f,s,i,!1,null,null,null),g=h.exports},6994:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return u}});var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("flat-pickr",{ref:"picker",staticClass:"w-full",attrs:{config:e.config,placeholder:e.placeholder},model:{value:e.localDateTime,callback:function(t){e.localDateTime=t},expression:"localDateTime"}})},i=[],r=(n(1539),n(8783),n(3948),n(7484)),a={components:{flatPickr:function(){return n.e(861).then(n.t.bind(n,4790,23))}},props:{value:{required:!0},settings:{type:Object,default:function(){return{date:!0,time:!0}}},placeholder:{type:String,default:"Please select from the calendar"}},data:function(){return{config:{noCalendar:!this.settings.date,enableTime:this.settings.time,onChange:this.updateValue}}},computed:{localDateTime:{get:function(){return this.value},set:function(e){this.$emit("input",e),this.$emit("change",e)}}},methods:{updateValue:function(e){e=this.formatValue(e),this.localDateTime=e},formatValue:function(e){return this.settings.format?r(e).format(this.settings.format):this.settings.date&&this.settings.time?r(e).format("YYYY-MM-DD HH:mm:ss"):this.settings.date&&!this.settings.time?r(e).format("YYYY-MM-DD"):!this.settings.date&&this.settings.time?r(e).format("HH:mm:ss"):null}}},o=a,c=n(1001),l=(0,c.Z)(o,s,i,!1,null,null,null),u=l.exports},7484:function(e){!function(t,n){e.exports=n()}(0,(function(){"use strict";var e=1e3,t=6e4,n=36e5,s="millisecond",i="second",r="minute",a="hour",o="day",c="week",l="month",u="quarter",d="year",f="date",v="Invalid Date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,g=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},p=function(e,t,n){var s=String(e);return!s||s.length>=t?e:""+Array(t+1-s.length).join(n)+e},y={s:p,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),s=Math.floor(n/60),i=n%60;return(t<=0?"+":"-")+p(s,2,"0")+":"+p(i,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var s=12*(n.year()-t.year())+(n.month()-t.month()),i=t.clone().add(s,l),r=n-i<0,a=t.clone().add(s+(r?-1:1),l);return+(-(s+(n-i)/(r?i-a:a-i))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:l,y:d,w:c,d:o,D:f,h:a,m:r,s:i,ms:s,Q:u}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},S="en",$={};$[S]=m;var b=function(e){return e instanceof C},w=function e(t,n,s){var i;if(!t)return S;if("string"==typeof t){var r=t.toLowerCase();$[r]&&(i=r),n&&($[r]=n,i=r);var a=t.split("-");if(!i&&a.length>1)return e(a[0])}else{var o=t.name;$[o]=t,i=o}return!s&&i&&(S=i),i||!s&&S},x=function(e,t){if(b(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new C(n)},_=y;_.l=w,_.i=b,_.w=function(e,t){return x(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var C=function(){function m(e){this.$L=w(e.locale,null,!0),this.parse(e)}var p=m.prototype;return p.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(_.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var s=t.match(h);if(s){var i=s[2]-1||0,r=(s[7]||"0").substring(0,3);return n?new Date(Date.UTC(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)):new Date(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},p.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},p.$utils=function(){return _},p.isValid=function(){return!(this.$d.toString()===v)},p.isSame=function(e,t){var n=x(e);return this.startOf(t)<=n&&n<=this.endOf(t)},p.isAfter=function(e,t){return x(e)<this.startOf(t)},p.isBefore=function(e,t){return this.endOf(t)<x(e)},p.$g=function(e,t,n){return _.u(e)?this[t]:this.set(n,e)},p.unix=function(){return Math.floor(this.valueOf()/1e3)},p.valueOf=function(){return this.$d.getTime()},p.startOf=function(e,t){var n=this,s=!!_.u(t)||t,u=_.p(e),v=function(e,t){var i=_.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return s?i:i.endOf(o)},h=function(e,t){return _.w(n.toDate()[e].apply(n.toDate("s"),(s?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},g=this.$W,m=this.$M,p=this.$D,y="set"+(this.$u?"UTC":"");switch(u){case d:return s?v(1,0):v(31,11);case l:return s?v(1,m):v(0,m+1);case c:var S=this.$locale().weekStart||0,$=(g<S?g+7:g)-S;return v(s?p-$:p+(6-$),m);case o:case f:return h(y+"Hours",0);case a:return h(y+"Minutes",1);case r:return h(y+"Seconds",2);case i:return h(y+"Milliseconds",3);default:return this.clone()}},p.endOf=function(e){return this.startOf(e,!1)},p.$set=function(e,t){var n,c=_.p(e),u="set"+(this.$u?"UTC":""),v=(n={},n[o]=u+"Date",n[f]=u+"Date",n[l]=u+"Month",n[d]=u+"FullYear",n[a]=u+"Hours",n[r]=u+"Minutes",n[i]=u+"Seconds",n[s]=u+"Milliseconds",n)[c],h=c===o?this.$D+(t-this.$W):t;if(c===l||c===d){var g=this.clone().set(f,1);g.$d[v](h),g.init(),this.$d=g.set(f,Math.min(this.$D,g.daysInMonth())).$d}else v&&this.$d[v](h);return this.init(),this},p.set=function(e,t){return this.clone().$set(e,t)},p.get=function(e){return this[_.p(e)]()},p.add=function(s,u){var f,v=this;s=Number(s);var h=_.p(u),g=function(e){var t=x(v);return _.w(t.date(t.date()+Math.round(e*s)),v)};if(h===l)return this.set(l,this.$M+s);if(h===d)return this.set(d,this.$y+s);if(h===o)return g(1);if(h===c)return g(7);var m=(f={},f[r]=t,f[a]=n,f[i]=e,f)[h]||1,p=this.$d.getTime()+s*m;return _.w(p,this)},p.subtract=function(e,t){return this.add(-1*e,t)},p.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||v;var s=e||"YYYY-MM-DDTHH:mm:ssZ",i=_.z(this),r=this.$H,a=this.$m,o=this.$M,c=n.weekdays,l=n.months,u=function(e,n,i,r){return e&&(e[n]||e(t,s))||i[n].substr(0,r)},d=function(e){return _.s(r%12||12,e,"0")},f=n.meridiem||function(e,t,n){var s=e<12?"AM":"PM";return n?s.toLowerCase():s},h={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:_.s(o+1,2,"0"),MMM:u(n.monthsShort,o,l,3),MMMM:u(l,o),D:this.$D,DD:_.s(this.$D,2,"0"),d:String(this.$W),dd:u(n.weekdaysMin,this.$W,c,2),ddd:u(n.weekdaysShort,this.$W,c,3),dddd:c[this.$W],H:String(r),HH:_.s(r,2,"0"),h:d(1),hh:d(2),a:f(r,a,!0),A:f(r,a,!1),m:String(a),mm:_.s(a,2,"0"),s:String(this.$s),ss:_.s(this.$s,2,"0"),SSS:_.s(this.$ms,3,"0"),Z:i};return s.replace(g,(function(e,t){return t||h[e]||i.replace(":","")}))},p.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},p.diff=function(s,f,v){var h,g=_.p(f),m=x(s),p=(m.utcOffset()-this.utcOffset())*t,y=this-m,S=_.m(this,m);return S=(h={},h[d]=S/12,h[l]=S,h[u]=S/3,h[c]=(y-p)/6048e5,h[o]=(y-p)/864e5,h[a]=y/n,h[r]=y/t,h[i]=y/e,h)[g]||y,v?S:_.a(S)},p.daysInMonth=function(){return this.endOf(l).$D},p.$locale=function(){return $[this.$L]},p.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),s=w(e,t,!0);return s&&(n.$L=s),n},p.clone=function(){return _.w(this.$d,this)},p.toDate=function(){return new Date(this.valueOf())},p.toJSON=function(){return this.isValid()?this.toISOString():null},p.toISOString=function(){return this.$d.toISOString()},p.toString=function(){return this.$d.toUTCString()},m}(),k=C.prototype;return x.prototype=k,[["$ms",s],["$s",i],["$m",r],["$H",a],["$W",o],["$M",l],["$y",d],["$D",f]].forEach((function(e){k[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),x.extend=function(e,t){return e.$i||(e(t,C,x),e.$i=!0),x},x.locale=w,x.isDayjs=b,x.unix=function(e){return x(1e3*e)},x.en=$[S],x.Ls=$,x.p={},x}))},4020:function(e){"use strict";var t="%[a-f0-9]{2}",n=new RegExp(t,"gi"),s=new RegExp("("+t+")+","gi");function i(e,t){try{return decodeURIComponent(e.join(""))}catch(r){}if(1===e.length)return e;t=t||1;var n=e.slice(0,t),s=e.slice(t);return Array.prototype.concat.call([],i(n),i(s))}function r(e){try{return decodeURIComponent(e)}catch(r){for(var t=e.match(n),s=1;s<t.length;s++)e=i(t,s).join(""),t=e.match(n);return e}}function a(e){var t={"%FE%FF":"��","%FF%FE":"��"},n=s.exec(e);while(n){try{t[n[0]]=decodeURIComponent(n[0])}catch(l){var i=r(n[0]);i!==n[0]&&(t[n[0]]=i)}n=s.exec(e)}t["%C2"]="�";for(var a=Object.keys(t),o=0;o<a.length;o++){var c=a[o];e=e.replace(new RegExp(c,"g"),t[c])}return e}e.exports=function(e){if("string"!==typeof e)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof e+"`");try{return e=e.replace(/\+/g," "),decodeURIComponent(e)}catch(t){return a(e)}}},2806:function(e){"use strict";e.exports=function(e,t){for(var n={},s=Object.keys(e),i=Array.isArray(t),r=0;r<s.length;r++){var a=s[r],o=e[a];(i?-1!==t.indexOf(a):t(a,o,e))&&(n[a]=o)}return n}},7563:function(e,t,n){"use strict";const s=n(610),i=n(4020),r=n(500),a=n(2806),o=e=>null===e||void 0===e,c=Symbol("encodeFragmentIdentifier");function l(e){switch(e.arrayFormat){case"index":return t=>(n,s)=>{const i=n.length;return void 0===s||e.skipNull&&null===s||e.skipEmptyString&&""===s?n:null===s?[...n,[f(t,e),"[",i,"]"].join("")]:[...n,[f(t,e),"[",f(i,e),"]=",f(s,e)].join("")]};case"bracket":return t=>(n,s)=>void 0===s||e.skipNull&&null===s||e.skipEmptyString&&""===s?n:null===s?[...n,[f(t,e),"[]"].join("")]:[...n,[f(t,e),"[]=",f(s,e)].join("")];case"colon-list-separator":return t=>(n,s)=>void 0===s||e.skipNull&&null===s||e.skipEmptyString&&""===s?n:null===s?[...n,[f(t,e),":list="].join("")]:[...n,[f(t,e),":list=",f(s,e)].join("")];case"comma":case"separator":case"bracket-separator":{const t="bracket-separator"===e.arrayFormat?"[]=":"=";return n=>(s,i)=>void 0===i||e.skipNull&&null===i||e.skipEmptyString&&""===i?s:(i=null===i?"":i,0===s.length?[[f(n,e),t,f(i,e)].join("")]:[[s,f(i,e)].join(e.arrayFormatSeparator)])}default:return t=>(n,s)=>void 0===s||e.skipNull&&null===s||e.skipEmptyString&&""===s?n:null===s?[...n,f(t,e)]:[...n,[f(t,e),"=",f(s,e)].join("")]}}function u(e){let t;switch(e.arrayFormat){case"index":return(e,n,s)=>{t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),t?(void 0===s[e]&&(s[e]={}),s[e][t[1]]=n):s[e]=n};case"bracket":return(e,n,s)=>{t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),t?void 0!==s[e]?s[e]=[].concat(s[e],n):s[e]=[n]:s[e]=n};case"colon-list-separator":return(e,n,s)=>{t=/(:list)$/.exec(e),e=e.replace(/:list$/,""),t?void 0!==s[e]?s[e]=[].concat(s[e],n):s[e]=[n]:s[e]=n};case"comma":case"separator":return(t,n,s)=>{const i="string"===typeof n&&n.includes(e.arrayFormatSeparator),r="string"===typeof n&&!i&&v(n,e).includes(e.arrayFormatSeparator);n=r?v(n,e):n;const a=i||r?n.split(e.arrayFormatSeparator).map((t=>v(t,e))):null===n?n:v(n,e);s[t]=a};case"bracket-separator":return(t,n,s)=>{const i=/(\[\])$/.test(t);if(t=t.replace(/\[\]$/,""),!i)return void(s[t]=n?v(n,e):n);const r=null===n?[]:n.split(e.arrayFormatSeparator).map((t=>v(t,e)));void 0!==s[t]?s[t]=[].concat(s[t],r):s[t]=r};default:return(e,t,n)=>{void 0!==n[e]?n[e]=[].concat(n[e],t):n[e]=t}}}function d(e){if("string"!==typeof e||1!==e.length)throw new TypeError("arrayFormatSeparator must be single character string")}function f(e,t){return t.encode?t.strict?s(e):encodeURIComponent(e):e}function v(e,t){return t.decode?i(e):e}function h(e){return Array.isArray(e)?e.sort():"object"===typeof e?h(Object.keys(e)).sort(((e,t)=>Number(e)-Number(t))).map((t=>e[t])):e}function g(e){const t=e.indexOf("#");return-1!==t&&(e=e.slice(0,t)),e}function m(e){let t="";const n=e.indexOf("#");return-1!==n&&(t=e.slice(n)),t}function p(e){e=g(e);const t=e.indexOf("?");return-1===t?"":e.slice(t+1)}function y(e,t){return t.parseNumbers&&!Number.isNaN(Number(e))&&"string"===typeof e&&""!==e.trim()?e=Number(e):!t.parseBooleans||null===e||"true"!==e.toLowerCase()&&"false"!==e.toLowerCase()||(e="true"===e.toLowerCase()),e}function S(e,t){t=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},t),d(t.arrayFormatSeparator);const n=u(t),s=Object.create(null);if("string"!==typeof e)return s;if(e=e.trim().replace(/^[?#&]/,""),!e)return s;for(const i of e.split("&")){if(""===i)continue;let[e,a]=r(t.decode?i.replace(/\+/g," "):i,"=");a=void 0===a?null:["comma","separator","bracket-separator"].includes(t.arrayFormat)?a:v(a,t),n(v(e,t),a,s)}for(const i of Object.keys(s)){const e=s[i];if("object"===typeof e&&null!==e)for(const n of Object.keys(e))e[n]=y(e[n],t);else s[i]=y(e,t)}return!1===t.sort?s:(!0===t.sort?Object.keys(s).sort():Object.keys(s).sort(t.sort)).reduce(((e,t)=>{const n=s[t];return Boolean(n)&&"object"===typeof n&&!Array.isArray(n)?e[t]=h(n):e[t]=n,e}),Object.create(null))}t.extract=p,t.parse=S,t.stringify=(e,t)=>{if(!e)return"";t=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},t),d(t.arrayFormatSeparator);const n=n=>t.skipNull&&o(e[n])||t.skipEmptyString&&""===e[n],s=l(t),i={};for(const a of Object.keys(e))n(a)||(i[a]=e[a]);const r=Object.keys(i);return!1!==t.sort&&r.sort(t.sort),r.map((n=>{const i=e[n];return void 0===i?"":null===i?f(n,t):Array.isArray(i)?0===i.length&&"bracket-separator"===t.arrayFormat?f(n,t)+"[]":i.reduce(s(n),[]).join("&"):f(n,t)+"="+f(i,t)})).filter((e=>e.length>0)).join("&")},t.parseUrl=(e,t)=>{t=Object.assign({decode:!0},t);const[n,s]=r(e,"#");return Object.assign({url:n.split("?")[0]||"",query:S(p(e),t)},t&&t.parseFragmentIdentifier&&s?{fragmentIdentifier:v(s,t)}:{})},t.stringifyUrl=(e,n)=>{n=Object.assign({encode:!0,strict:!0,[c]:!0},n);const s=g(e.url).split("?")[0]||"",i=t.extract(e.url),r=t.parse(i,{sort:!1}),a=Object.assign(r,e.query);let o=t.stringify(a,n);o&&(o=`?${o}`);let l=m(e.url);return e.fragmentIdentifier&&(l=`#${n[c]?f(e.fragmentIdentifier,n):e.fragmentIdentifier}`),`${s}${o}${l}`},t.pick=(e,n,s)=>{s=Object.assign({parseFragmentIdentifier:!0,[c]:!1},s);const{url:i,query:r,fragmentIdentifier:o}=t.parseUrl(e,s);return t.stringifyUrl({url:i,query:a(r,n),fragmentIdentifier:o},s)},t.exclude=(e,n,s)=>{const i=Array.isArray(n)?e=>!n.includes(e):(e,t)=>!n(e,t);return t.pick(e,i,s)}},500:function(e){"use strict";e.exports=(e,t)=>{if("string"!==typeof e||"string"!==typeof t)throw new TypeError("Expected the arguments to be of type `string`");if(""===t)return[e];const n=e.indexOf(t);return-1===n?[e]:[e.slice(0,n),e.slice(n+t.length)]}},610:function(e){"use strict";e.exports=e=>encodeURIComponent(e).replace(/[!'()*]/g,(e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`))}}]);
//# sourceMappingURL=devise-pages-legacy.b11499ef.js.map