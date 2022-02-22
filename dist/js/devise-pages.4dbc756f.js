(self["webpackChunkdevisephp_interface"]=self["webpackChunkdevisephp_interface"]||[]).push([[90],{6937:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return h}});var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{ref:"admin-route-wrapper",staticClass:"dvs-relative dvs-max-w-1/2 dvs-self-center dvs-shadow-lg dvs-bg-admin-bg dvs-text-admin-fg dvs-rounded dvs-pointer-events-auto",staticStyle:{"min-width":"400px"},attrs:{id:"dvs-admin-content-container"}},[s("div",[s("div",[e.can("manage slices")?s("div",{staticClass:"dvs-pt-8 dvs-pb-16 dvs-relative"},[s("div",{staticClass:"dvs-absolute dvs-top-0 dvs-right-0 dvs-mt-4 dvs-mr-4"},[s("toggle",{attrs:{id:e.randomString(8),mini:!0},on:{change:e.setDevMode}})],1),s("div",{staticClass:"dvs-px-8 dvs-mb-8 dvs-text-xl dvs-font-sans"},[s("div",{staticClass:"dvs-cursor-pointer dvs-flex dvs-items-center",on:{click:function(t){return e.goToEditPage()}}},[s("span",{staticClass:"dvs-text-xs dvs-mr-2"},[s("edit-icon")],1),e._v(" "+e._s(e.currentPage.title)+" ")])]),s("div",{staticClass:"dvs-p-8 dvs-pt-0"},[e.showTimeTravel?s("fieldset",{staticClass:"dvs-fieldset"},[s("label",[e._v("Preview Date Time")]),s("div",{staticClass:"dvs-flex"},[s("date-picker",{ref:"datepicker",staticClass:"dvs-mr-2",attrs:{settings:{date:!0,time:!0}},model:{value:e.timeTravelDate,callback:function(t){e.timeTravelDate=t},expression:"timeTravelDate"}}),s("button",{staticClass:"dvs-rounded dvs-btn dvs-btn-primary dvs-btn-sm dvs-flex dvs-justify-center dvs-items-center dvs-uppercase dvs-text-xs dvs-font-bold",on:{click:e.timeTravel}},[e._v(" Go ")])],1)]):s("fieldset",{staticClass:"dvs-fieldset"},[s("div",{staticClass:"flex flex-col items-stretch"},[s("label",{staticClass:"dvs-opacity-75"},[e._v("Page Version")]),s("select",{staticClass:"dvs-small dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg",on:{change:e.selectVersion}},[e._l(e.currentPage.versions,(function(t){return s("option",{key:t.id,domProps:{value:t.id,selected:t.current}},[e._v(" "+e._s(t.name)+" "),t.current?[e._v("(Currently Viewing)")]:e._e(),t.is_live?[e._v(" (Live)")]:e._e()],2)})),s("option",{attrs:{value:"timetravel"}},[e._v("Time Travel Preview")])],2)])])]),e._m(0),s("div",{staticClass:"dvs-flex dvs-flex-col dvs-items-center"},[s("draggable",e._b({staticClass:"dvs-w-full dvs-px-4",attrs:{list:e.currentPageSlices,tag:"ul"}},"draggable",{group:{name:"slices"},animation:200,ghostClass:"dvs-ghost",handle:".handle",dragClass:"dvs-chosen-drag-slice",emptyInsertThreshold:10,removeCloneOnHide:!1},!1),[e._l(e.currentPageSlices,(function(t,i){return[s("slice-editor",{key:e.randomString(8,i),attrs:{depth:1},on:{opened:function(s){return e.openSlice(t)},addSlice:e.addSlice,editSlice:e.editSlice,removeSlice:e.removeSlice,copySlice:e.copySlice},model:{value:e.currentPageSlices[i],callback:function(t){e.$set(e.currentPageSlices,i,t)},expression:"currentPageSlices[key]"}})]}))],2)],1),e.additionalPageSettings?s("div",{staticClass:"dvs-px-8"},[s("fieldset",{staticClass:"dvs-fieldset dvs-mb-2"},[s("label",{staticClass:"dvs-mb-2 dvs-cursor-pointer",on:{click:function(t){e.additionalSettingsOpen=!e.additionalSettingsOpen}}},[e._v("Additional Page Settings")])]),s("slice-editor-fields",{directives:[{name:"show",rawName:"v-show",value:e.additionalSettingsOpen,expression:"additionalSettingsOpen"}],attrs:{"the-fields":e.additionalPageSettings},model:{value:e.currentPage.settings.fields,callback:function(t){e.$set(e.currentPage.settings,"fields",t)},expression:"currentPage.settings.fields"}})],1):e._e(),s("div",{staticClass:"dvs-relative dvs-flex dvs-flex-col dvs-items-center dvs-px-8"},[!0===e.createSlice?s("manage-slice",{ref:"manageSlice",attrs:{mode:"inserting"},on:{addSlice:e.addSlice,cancel:function(t){e.createSlice=!1}}}):e._e()],1)]):s("div",[e._m(1)]),e.can("manage slices")?s("div",{staticClass:"dvs-absolute dvs-bottom-0 dvs-left-0 dvs-right-0 dvs-mb-3 dvs-flex dvs-justify-around dvs-items-stretch dvs-p-2 dvs-px-8"},[s("button",{staticClass:"dvs-btn dvs-btn-sm dvs-btn-primary dvs-w-2/5 dvs-mr-2 dvs-flex dvs-justify-center dvs-items-center",on:{click:function(t){return t.preventDefault(),e.requestSavePage()}}},[e.saving?s("refresh-icon",{staticClass:"dvs-mr-2 dvs-rotate-ccw",attrs:{w:"15",h:"15"}}):e._e(),e._v("Save Page ")],1),s("button",{staticClass:"dvs-btn dvs-btn-sm dvs-btn-secondary dvs-w-3/5 dvs-flex dvs-justify-center dvs-items-center dvs-uppercase dvs-font-bold dvs-w-2/5",on:{click:function(t){return t.preventDefault(),e.requestAddSlice.apply(null,arguments)}}},[e._v(" Add Slice ")])]):e._e()])])])},r=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"dvs-px-8"},[s("fieldset",{staticClass:"dvs-fieldset"},[s("label",{staticClass:"dvs-opacity-75"},[e._v("Page Slices")])])])},function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"dvs-p-8"},[s("fieldset",{staticClass:"dvs-fieldset"},[s("div",{staticClass:"dvs-flex dvs-flex-col dvs-items-stretch"},[s("h4",[e._v("Administration")]),s("p",{staticClass:"dvs-mt-4"},[e._v("Use the icons along the left column to navigate.")])])])])}],n=s(629),a=s(6994),o=s(5913);const c=s(7563);var l={name:"PageEditor",components:{DatePicker:a["default"],RefreshIcon:()=>s.e(952).then(s.bind(s,8159)),draggable:()=>Promise.all([s.e(953),s.e(469)]).then(s.t.bind(s,9980,23)),ManageSlice:()=>Promise.all([s.e(953),s.e(469)]).then(s.bind(s,1817)),SliceEditor:()=>Promise.all([s.e(953),s.e(469)]).then(s.bind(s,2397)),SliceEditorFields:()=>Promise.all([s.e(953),s.e(469)]).then(s.bind(s,4115)),Toggle:()=>s.e(524).then(s.bind(s,5113)),EditIcon:()=>s.e(952).then(s.bind(s,3180))},mixins:[o.Z],data(){return{saving:!1,createSlice:!1,showTimeTravel:!1,timeTravelDate:null,additionalSettingsOpen:!1,queryString:c}},computed:{...(0,n.Se)("devise",["currentPage","sliceConfig"]),currentPageSlices(){return this.currentPage.slices},additionalPageSettings(){if(window.deviseSettings.$config.additionalPageSettings){const e=window.deviseSettings.$config.additionalPageSettings.find((e=>e.siteId===this.currentPage.site_id));if(e)return e.fields}return!1}},mounted(){this.additionalPageSettings&&(this.currentPage.settings.fields=Object.assign({},this.additionalPageSettings,this.currentPage.settings.fields)),setTimeout((()=>{this.$watch("currentPage",(()=>{window.onbeforeunload=()=>"Changes you made may not be saved"}),{deep:!0})}),1e3)},methods:{...(0,n.nv)("devise",["savePage","setDevMode"]),requestSavePage(){this.saving=!0,this.savePage({page:this.currentPage}).then((e=>{480===e?window.deviseSettings.$bus.$emit("showForceSave"):window.onbeforeunload=null})).finally((()=>{this.saving=!1,this.recalculateScroll()}))},goToEditPage(){this.$router.push({name:"devise-pages-admin",params:{workflowKey:"jumpto-edit-page",pageId:this.currentPage.id}})},toggleSlice(e){e.metadata.open?this.closeSlice(e):this.openSlice(e)},openSlice(e){this.currentPage.slices.map((e=>this.closeSlice(e))),this.$set(e.metadata,"open",!0)},closeSlice(e){this.$set(e.metadata,"open",!1)},requestAddSlice(){this.createSlice=!0},addSlice(e,t){if("undefined"!==typeof t){const s=this.sliceConfig(t);!0===s.has_child_slot&&("undefined"===typeof t.slices&&this.$set(t,"slices",[]),t.slices.push(e))}else!0===e.metadata.has_child_slot&&"undefined"===typeof e.slices&&this.$set(e,"slices",[]),this.currentPage.slices.push(e);this.createSlice=!1},findReferenceSliceInSlices(e,t){return e.find((e=>e===t?e:e.slices?this.findReferenceSliceInSlices(e.slices,t):void 0))},editSlice(e,t){e.metadata.has_child_slot&&(e.slices=t.slices),this.currentPage.slices.splice(this.currentPage.slices.indexOf(t),1,e)},setSubSliceInstaceToZero(e){for(let t=0;t<e.length;t+=1)e[t].metadata.instance_id=0,"object"===typeof e[t].slices&&e[t].slices.length>0&&(e[t].slices=this.setSubSliceInstaceToZero(e[t].slices));return e},copySlice(e,t){null===t&&(t=this.currentPage);const s=JSON.parse(JSON.stringify(e));s.metadata.instance_id=0,"object"===typeof s.slices&&s.slices.length>0&&(s.slices=this.setSubSliceInstaceToZero(s.slices)),t.slices.push(s)},removeSlice(e,t){"undefined"===typeof t&&(t=this.currentPage),t.slices.splice(t.slices.indexOf(e),1)},selectVersion(e){if("timetravel"===e.target.value)return this.showTimeTravel=!0,!1;const t=parseInt(e.target.value,0),s=document.location.href;let i="";return s.includes("version_id")?(i=s.replace(/(version_id=[0-9]*)/g,`version_id=${t}`),document.location.href=i,!0):(i=s,i=i.includes("?")?`${i}&`:`${i}?`,document.location.href=`${i}version_id=${t}`,!0)},timeTravel(){const e={time_travel_to:this.timeTravelDate},t=this.queryString.stringify(e);return document.location.search=t,!0},recalculateScroll(){this.$nextTick((()=>{"undefined"!==typeof this.$refs.Scrollbar&&(this.$refs.Scrollbar.calculateSize(),this.$refs.Scrollbar.scrollToY(0))}))}}},d=l,u=s(1001),f=(0,u.Z)(d,i,r,!1,null,null,null),h=f.exports},6994:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return d}});var i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("flat-pickr",{ref:"picker",staticClass:"w-full",attrs:{config:e.config,placeholder:e.placeholder},model:{value:e.localDateTime,callback:function(t){e.localDateTime=t},expression:"localDateTime"}})},r=[];const n=s(7484);var a={components:{flatPickr:()=>s.e(861).then(s.t.bind(s,4790,23))},props:{value:{required:!0},settings:{type:Object,default:()=>({date:!0,time:!0})},placeholder:{type:String,default:"Please select from the calendar"}},data(){return{config:{noCalendar:!this.settings.date,enableTime:this.settings.time,onChange:this.updateValue}}},computed:{localDateTime:{get(){return this.value},set(e){this.$emit("input",e),this.$emit("change",e)}}},methods:{updateValue(e){e=this.formatValue(e),this.localDateTime=e},formatValue(e){return this.settings.format?n(e).format(this.settings.format):this.settings.date&&this.settings.time?n(e).format("YYYY-MM-DD HH:mm:ss"):this.settings.date&&!this.settings.time?n(e).format("YYYY-MM-DD"):!this.settings.date&&this.settings.time?n(e).format("HH:mm:ss"):null}}},o=a,c=s(1001),l=(0,c.Z)(o,i,r,!1,null,null,null),d=l.exports},7484:function(e){!function(t,s){e.exports=s()}(0,(function(){"use strict";var e=1e3,t=6e4,s=36e5,i="millisecond",r="second",n="minute",a="hour",o="day",c="week",l="month",d="quarter",u="year",f="date",h="Invalid Date",v=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,g=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},p=function(e,t,s){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(s)+e},y={s:p,z:function(e){var t=-e.utcOffset(),s=Math.abs(t),i=Math.floor(s/60),r=s%60;return(t<=0?"+":"-")+p(i,2,"0")+":"+p(r,2,"0")},m:function e(t,s){if(t.date()<s.date())return-e(s,t);var i=12*(s.year()-t.year())+(s.month()-t.month()),r=t.clone().add(i,l),n=s-r<0,a=t.clone().add(i+(n?-1:1),l);return+(-(i+(s-r)/(n?r-a:a-r))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:l,y:u,w:c,d:o,D:f,h:a,m:n,s:r,ms:i,Q:d}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},S="en",$={};$[S]=m;var b=function(e){return e instanceof C},w=function(e,t,s){var i;if(!e)return S;if("string"==typeof e)$[e]&&(i=e),t&&($[e]=t,i=e);else{var r=e.name;$[r]=e,i=r}return!s&&i&&(S=i),i||!s&&S},x=function(e,t){if(b(e))return e.clone();var s="object"==typeof t?t:{};return s.date=e,s.args=arguments,new C(s)},_=y;_.l=w,_.i=b,_.w=function(e,t){return x(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var C=function(){function m(e){this.$L=w(e.locale,null,!0),this.parse(e)}var p=m.prototype;return p.parse=function(e){this.$d=function(e){var t=e.date,s=e.utc;if(null===t)return new Date(NaN);if(_.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(v);if(i){var r=i[2]-1||0,n=(i[7]||"0").substring(0,3);return s?new Date(Date.UTC(i[1],r,i[3]||1,i[4]||0,i[5]||0,i[6]||0,n)):new Date(i[1],r,i[3]||1,i[4]||0,i[5]||0,i[6]||0,n)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},p.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},p.$utils=function(){return _},p.isValid=function(){return!(this.$d.toString()===h)},p.isSame=function(e,t){var s=x(e);return this.startOf(t)<=s&&s<=this.endOf(t)},p.isAfter=function(e,t){return x(e)<this.startOf(t)},p.isBefore=function(e,t){return this.endOf(t)<x(e)},p.$g=function(e,t,s){return _.u(e)?this[t]:this.set(s,e)},p.unix=function(){return Math.floor(this.valueOf()/1e3)},p.valueOf=function(){return this.$d.getTime()},p.startOf=function(e,t){var s=this,i=!!_.u(t)||t,d=_.p(e),h=function(e,t){var r=_.w(s.$u?Date.UTC(s.$y,t,e):new Date(s.$y,t,e),s);return i?r:r.endOf(o)},v=function(e,t){return _.w(s.toDate()[e].apply(s.toDate("s"),(i?[0,0,0,0]:[23,59,59,999]).slice(t)),s)},g=this.$W,m=this.$M,p=this.$D,y="set"+(this.$u?"UTC":"");switch(d){case u:return i?h(1,0):h(31,11);case l:return i?h(1,m):h(0,m+1);case c:var S=this.$locale().weekStart||0,$=(g<S?g+7:g)-S;return h(i?p-$:p+(6-$),m);case o:case f:return v(y+"Hours",0);case a:return v(y+"Minutes",1);case n:return v(y+"Seconds",2);case r:return v(y+"Milliseconds",3);default:return this.clone()}},p.endOf=function(e){return this.startOf(e,!1)},p.$set=function(e,t){var s,c=_.p(e),d="set"+(this.$u?"UTC":""),h=(s={},s[o]=d+"Date",s[f]=d+"Date",s[l]=d+"Month",s[u]=d+"FullYear",s[a]=d+"Hours",s[n]=d+"Minutes",s[r]=d+"Seconds",s[i]=d+"Milliseconds",s)[c],v=c===o?this.$D+(t-this.$W):t;if(c===l||c===u){var g=this.clone().set(f,1);g.$d[h](v),g.init(),this.$d=g.set(f,Math.min(this.$D,g.daysInMonth())).$d}else h&&this.$d[h](v);return this.init(),this},p.set=function(e,t){return this.clone().$set(e,t)},p.get=function(e){return this[_.p(e)]()},p.add=function(i,d){var f,h=this;i=Number(i);var v=_.p(d),g=function(e){var t=x(h);return _.w(t.date(t.date()+Math.round(e*i)),h)};if(v===l)return this.set(l,this.$M+i);if(v===u)return this.set(u,this.$y+i);if(v===o)return g(1);if(v===c)return g(7);var m=(f={},f[n]=t,f[a]=s,f[r]=e,f)[v]||1,p=this.$d.getTime()+i*m;return _.w(p,this)},p.subtract=function(e,t){return this.add(-1*e,t)},p.format=function(e){var t=this,s=this.$locale();if(!this.isValid())return s.invalidDate||h;var i=e||"YYYY-MM-DDTHH:mm:ssZ",r=_.z(this),n=this.$H,a=this.$m,o=this.$M,c=s.weekdays,l=s.months,d=function(e,s,r,n){return e&&(e[s]||e(t,i))||r[s].substr(0,n)},u=function(e){return _.s(n%12||12,e,"0")},f=s.meridiem||function(e,t,s){var i=e<12?"AM":"PM";return s?i.toLowerCase():i},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:_.s(o+1,2,"0"),MMM:d(s.monthsShort,o,l,3),MMMM:d(l,o),D:this.$D,DD:_.s(this.$D,2,"0"),d:String(this.$W),dd:d(s.weekdaysMin,this.$W,c,2),ddd:d(s.weekdaysShort,this.$W,c,3),dddd:c[this.$W],H:String(n),HH:_.s(n,2,"0"),h:u(1),hh:u(2),a:f(n,a,!0),A:f(n,a,!1),m:String(a),mm:_.s(a,2,"0"),s:String(this.$s),ss:_.s(this.$s,2,"0"),SSS:_.s(this.$ms,3,"0"),Z:r};return i.replace(g,(function(e,t){return t||v[e]||r.replace(":","")}))},p.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},p.diff=function(i,f,h){var v,g=_.p(f),m=x(i),p=(m.utcOffset()-this.utcOffset())*t,y=this-m,S=_.m(this,m);return S=(v={},v[u]=S/12,v[l]=S,v[d]=S/3,v[c]=(y-p)/6048e5,v[o]=(y-p)/864e5,v[a]=y/s,v[n]=y/t,v[r]=y/e,v)[g]||y,h?S:_.a(S)},p.daysInMonth=function(){return this.endOf(l).$D},p.$locale=function(){return $[this.$L]},p.locale=function(e,t){if(!e)return this.$L;var s=this.clone(),i=w(e,t,!0);return i&&(s.$L=i),s},p.clone=function(){return _.w(this.$d,this)},p.toDate=function(){return new Date(this.valueOf())},p.toJSON=function(){return this.isValid()?this.toISOString():null},p.toISOString=function(){return this.$d.toISOString()},p.toString=function(){return this.$d.toUTCString()},m}(),k=C.prototype;return x.prototype=k,[["$ms",i],["$s",r],["$m",n],["$H",a],["$W",o],["$M",l],["$y",u],["$D",f]].forEach((function(e){k[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),x.extend=function(e,t){return e.$i||(e(t,C,x),e.$i=!0),x},x.locale=w,x.isDayjs=b,x.unix=function(e){return x(1e3*e)},x.en=$[S],x.Ls=$,x.p={},x}))},4020:function(e){"use strict";var t="%[a-f0-9]{2}",s=new RegExp(t,"gi"),i=new RegExp("("+t+")+","gi");function r(e,t){try{return decodeURIComponent(e.join(""))}catch(n){}if(1===e.length)return e;t=t||1;var s=e.slice(0,t),i=e.slice(t);return Array.prototype.concat.call([],r(s),r(i))}function n(e){try{return decodeURIComponent(e)}catch(n){for(var t=e.match(s),i=1;i<t.length;i++)e=r(t,i).join(""),t=e.match(s);return e}}function a(e){var t={"%FE%FF":"��","%FF%FE":"��"},s=i.exec(e);while(s){try{t[s[0]]=decodeURIComponent(s[0])}catch(l){var r=n(s[0]);r!==s[0]&&(t[s[0]]=r)}s=i.exec(e)}t["%C2"]="�";for(var a=Object.keys(t),o=0;o<a.length;o++){var c=a[o];e=e.replace(new RegExp(c,"g"),t[c])}return e}e.exports=function(e){if("string"!==typeof e)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof e+"`");try{return e=e.replace(/\+/g," "),decodeURIComponent(e)}catch(t){return a(e)}}},2806:function(e){"use strict";e.exports=function(e,t){for(var s={},i=Object.keys(e),r=Array.isArray(t),n=0;n<i.length;n++){var a=i[n],o=e[a];(r?-1!==t.indexOf(a):t(a,o,e))&&(s[a]=o)}return s}},7563:function(e,t,s){"use strict";const i=s(610),r=s(4020),n=s(500),a=s(2806),o=e=>null===e||void 0===e,c=Symbol("encodeFragmentIdentifier");function l(e){switch(e.arrayFormat){case"index":return t=>(s,i)=>{const r=s.length;return void 0===i||e.skipNull&&null===i||e.skipEmptyString&&""===i?s:null===i?[...s,[f(t,e),"[",r,"]"].join("")]:[...s,[f(t,e),"[",f(r,e),"]=",f(i,e)].join("")]};case"bracket":return t=>(s,i)=>void 0===i||e.skipNull&&null===i||e.skipEmptyString&&""===i?s:null===i?[...s,[f(t,e),"[]"].join("")]:[...s,[f(t,e),"[]=",f(i,e)].join("")];case"colon-list-separator":return t=>(s,i)=>void 0===i||e.skipNull&&null===i||e.skipEmptyString&&""===i?s:null===i?[...s,[f(t,e),":list="].join("")]:[...s,[f(t,e),":list=",f(i,e)].join("")];case"comma":case"separator":case"bracket-separator":{const t="bracket-separator"===e.arrayFormat?"[]=":"=";return s=>(i,r)=>void 0===r||e.skipNull&&null===r||e.skipEmptyString&&""===r?i:(r=null===r?"":r,0===i.length?[[f(s,e),t,f(r,e)].join("")]:[[i,f(r,e)].join(e.arrayFormatSeparator)])}default:return t=>(s,i)=>void 0===i||e.skipNull&&null===i||e.skipEmptyString&&""===i?s:null===i?[...s,f(t,e)]:[...s,[f(t,e),"=",f(i,e)].join("")]}}function d(e){let t;switch(e.arrayFormat){case"index":return(e,s,i)=>{t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),t?(void 0===i[e]&&(i[e]={}),i[e][t[1]]=s):i[e]=s};case"bracket":return(e,s,i)=>{t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),t?void 0!==i[e]?i[e]=[].concat(i[e],s):i[e]=[s]:i[e]=s};case"colon-list-separator":return(e,s,i)=>{t=/(:list)$/.exec(e),e=e.replace(/:list$/,""),t?void 0!==i[e]?i[e]=[].concat(i[e],s):i[e]=[s]:i[e]=s};case"comma":case"separator":return(t,s,i)=>{const r="string"===typeof s&&s.includes(e.arrayFormatSeparator),n="string"===typeof s&&!r&&h(s,e).includes(e.arrayFormatSeparator);s=n?h(s,e):s;const a=r||n?s.split(e.arrayFormatSeparator).map((t=>h(t,e))):null===s?s:h(s,e);i[t]=a};case"bracket-separator":return(t,s,i)=>{const r=/(\[\])$/.test(t);if(t=t.replace(/\[\]$/,""),!r)return void(i[t]=s?h(s,e):s);const n=null===s?[]:s.split(e.arrayFormatSeparator).map((t=>h(t,e)));void 0!==i[t]?i[t]=[].concat(i[t],n):i[t]=n};default:return(e,t,s)=>{void 0!==s[e]?s[e]=[].concat(s[e],t):s[e]=t}}}function u(e){if("string"!==typeof e||1!==e.length)throw new TypeError("arrayFormatSeparator must be single character string")}function f(e,t){return t.encode?t.strict?i(e):encodeURIComponent(e):e}function h(e,t){return t.decode?r(e):e}function v(e){return Array.isArray(e)?e.sort():"object"===typeof e?v(Object.keys(e)).sort(((e,t)=>Number(e)-Number(t))).map((t=>e[t])):e}function g(e){const t=e.indexOf("#");return-1!==t&&(e=e.slice(0,t)),e}function m(e){let t="";const s=e.indexOf("#");return-1!==s&&(t=e.slice(s)),t}function p(e){e=g(e);const t=e.indexOf("?");return-1===t?"":e.slice(t+1)}function y(e,t){return t.parseNumbers&&!Number.isNaN(Number(e))&&"string"===typeof e&&""!==e.trim()?e=Number(e):!t.parseBooleans||null===e||"true"!==e.toLowerCase()&&"false"!==e.toLowerCase()||(e="true"===e.toLowerCase()),e}function S(e,t){t=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},t),u(t.arrayFormatSeparator);const s=d(t),i=Object.create(null);if("string"!==typeof e)return i;if(e=e.trim().replace(/^[?#&]/,""),!e)return i;for(const r of e.split("&")){if(""===r)continue;let[e,a]=n(t.decode?r.replace(/\+/g," "):r,"=");a=void 0===a?null:["comma","separator","bracket-separator"].includes(t.arrayFormat)?a:h(a,t),s(h(e,t),a,i)}for(const r of Object.keys(i)){const e=i[r];if("object"===typeof e&&null!==e)for(const s of Object.keys(e))e[s]=y(e[s],t);else i[r]=y(e,t)}return!1===t.sort?i:(!0===t.sort?Object.keys(i).sort():Object.keys(i).sort(t.sort)).reduce(((e,t)=>{const s=i[t];return Boolean(s)&&"object"===typeof s&&!Array.isArray(s)?e[t]=v(s):e[t]=s,e}),Object.create(null))}t.extract=p,t.parse=S,t.stringify=(e,t)=>{if(!e)return"";t=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},t),u(t.arrayFormatSeparator);const s=s=>t.skipNull&&o(e[s])||t.skipEmptyString&&""===e[s],i=l(t),r={};for(const a of Object.keys(e))s(a)||(r[a]=e[a]);const n=Object.keys(r);return!1!==t.sort&&n.sort(t.sort),n.map((s=>{const r=e[s];return void 0===r?"":null===r?f(s,t):Array.isArray(r)?0===r.length&&"bracket-separator"===t.arrayFormat?f(s,t)+"[]":r.reduce(i(s),[]).join("&"):f(s,t)+"="+f(r,t)})).filter((e=>e.length>0)).join("&")},t.parseUrl=(e,t)=>{t=Object.assign({decode:!0},t);const[s,i]=n(e,"#");return Object.assign({url:s.split("?")[0]||"",query:S(p(e),t)},t&&t.parseFragmentIdentifier&&i?{fragmentIdentifier:h(i,t)}:{})},t.stringifyUrl=(e,s)=>{s=Object.assign({encode:!0,strict:!0,[c]:!0},s);const i=g(e.url).split("?")[0]||"",r=t.extract(e.url),n=t.parse(r,{sort:!1}),a=Object.assign(n,e.query);let o=t.stringify(a,s);o&&(o=`?${o}`);let l=m(e.url);return e.fragmentIdentifier&&(l=`#${s[c]?f(e.fragmentIdentifier,s):e.fragmentIdentifier}`),`${i}${o}${l}`},t.pick=(e,s,i)=>{i=Object.assign({parseFragmentIdentifier:!0,[c]:!1},i);const{url:r,query:n,fragmentIdentifier:o}=t.parseUrl(e,i);return t.stringifyUrl({url:r,query:a(n,s),fragmentIdentifier:o},i)},t.exclude=(e,s,i)=>{const r=Array.isArray(s)?e=>!s.includes(e):(e,t)=>!s(e,t);return t.pick(e,r,i)}},500:function(e){"use strict";e.exports=(e,t)=>{if("string"!==typeof e||"string"!==typeof t)throw new TypeError("Expected the arguments to be of type `string`");if(""===t)return[e];const s=e.indexOf(t);return-1===s?[e]:[e.slice(0,s),e.slice(s+t.length)]}},610:function(e){"use strict";e.exports=e=>encodeURIComponent(e).replace(/[!'()*]/g,(e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`))}}]);
//# sourceMappingURL=devise-pages.4dbc756f.js.map