(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["devise-query-selector"],{"06c5":function(e,t,s){"use strict";s.d(t,"a",(function(){return r}));s("a630"),s("fb6a"),s("b0c0"),s("d3b7"),s("25f0"),s("3ca3");var a=s("6b75");function r(e,t){if(e){if("string"===typeof e)return Object(a["a"])(e,t);var s=Object.prototype.toString.call(e).slice(8,-1);return"Object"===s&&e.constructor&&(s=e.constructor.name),"Map"===s||"Set"===s?Array.from(e):"Arguments"===s||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s)?Object(a["a"])(e,t):void 0}}},"4df4":function(e,t,s){"use strict";var a=s("0366"),r=s("7b0b"),n=s("9bdd"),i=s("e95a"),l=s("50c4"),o=s("8418"),u=s("35a1");e.exports=function(e){var t,s,d,c,v,f,p=r(e),m="function"==typeof this?this:Array,y=arguments.length,h=y>1?arguments[1]:void 0,g=void 0!==h,b=u(p),S=0;if(g&&(h=a(h,y>2?arguments[2]:void 0,2)),void 0==b||m==Array&&i(b))for(t=l(p.length),s=new m(t);t>S;S++)f=g?h(p[S],S):p[S],o(s,S,f);else for(c=b.call(p),v=c.next,s=new m;!(d=v.call(c)).done;S++)f=g?n(c,h,[d.value,S],!0):d.value,o(s,S,f);return s.length=S,s}},"6b75":function(e,t,s){"use strict";function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var s=0,a=new Array(t);s<t;s++)a[s]=e[s];return a}s.d(t,"a",(function(){return a}))},a501:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"dvs-flex dvs-justify-center dvs-p-4 dvs-pb-8  dvs-text-admin-fg  dvs-w-full"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.filter,expression:"filter"}],ref:"filter",staticClass:"dvs-bg-transparent dvs-border-b-2 dvs-px-12 dvs-py-2 dvs-text-admin-fg dvs-outline-none dvs-placeholder-admin-fg dvs-text-center",attrs:{type:"text",placeholder:e.value.label},domProps:{value:e.filter},on:{keyup:e.requestSearch,input:function(t){t.target.composing||(e.filter=t.target.value)}}}),s("div",{staticClass:"dvs-cursor-pointer",class:{"dvs-opacity-50":""===e.filter},on:{click:e.resetSearch}},[s("x-icon")],1)]),s("ul",e._l(e.filteredSuggestions,(function(t,a){return s("li",{key:a,staticClass:"dvs-bg-admin-bg dvs-shadow hover:dvs-shadow-lg dvs-rounded dvs-my-4 dvs-p-2 dvs-cursor-pointer",on:{click:function(s){return e.selectSuggestion(t)}}},[s("div",{staticClass:"dvs-text-lg dvs-mb-2"},[e._v(e._s(t.displayFields[0].value))]),s("ul",{staticClass:"dvs-flex"},e._l(e.subLabelFields(t.displayFields),(function(t,a){return s("li",{key:a,staticClass:"dvs-mr-4 dvs-text-xs dvs-leading-tight"},[s("div",{staticClass:"dvs-uppercase dvs-text-xs dvs-text-admin-secondary-fg"},[e._v(" "+e._s(t.label)+" ")]),s("div",[e._v(e._s(e.format(t)))])])})),0)])})),0),s("draggable",e._b({attrs:{list:e.selected,tag:"ul"}},"draggable",{group:{name:"g1"},animation:200,ghostClass:"dvs-ghost",handle:".handle",dragClass:"dvs-chosen-drag-slice",emptyInsertThreshold:10,removeCloneOnHide:!1},!1),e._l(e.selected,(function(t,a){return s("li",{key:a,staticClass:"dvs-flex dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-shadow hover:dvs-shadow-lg dvs-rounded dvs-my-4 dvs-p-4 dvs-cursor-pointer"},[e.modelQuerySettings.allowSort?s("div",{staticClass:"dvs-mr-4 handle"},[s("menu-icon")],1):e._e(),t.displayFields?s("div",{staticClass:"dvs-w-full"},[s("div",{staticClass:"dvs-text-lg dvs-mb-2"},[e._v(e._s(t.displayFields[0].value))]),s("ul",{staticClass:"dvs-flex"},e._l(e.subLabelFields(t.displayFields),(function(t,a){return s("li",{key:a,staticClass:"dvs-mr-4 dvs-text-xs dvs-leading-tight dvs-w-1/4 dvs-bg-admin-bg dvs-text-admin-fg dvs-rounded dvs-p-3 opacity-75"},[s("div",{staticClass:"dvs-uppercase dvs-text-xs"},[e._v(e._s(t.label))]),s("div",[e._v(e._s(e.format(t)))])])})),0)]):e._e(),s("div",{staticClass:"dvs-cursor-pointer",on:{click:function(s){return e.removeSuggestion(t)}}},[s("x-icon")],1)])})),0)],1)},r=[],n=(s("4de4"),s("7db0"),s("4160"),s("c975"),s("a15b"),s("a434"),s("d3b7"),s("159b"),s("6b75"));function i(e){if(Array.isArray(e))return Object(n["a"])(e)}s("a4d3"),s("e01a"),s("d28b"),s("a630"),s("e260"),s("3ca3"),s("ddb0");function l(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}var o=s("06c5");function u(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function d(e){return i(e)||l(e)||Object(o["a"])(e)||u()}var c=s("5530"),v=s("5a0c"),f=s.n(v),p=s("2f62"),m={name:"DeviseQuerySelectorSearch",components:{draggable:function(){return Promise.all([s.e("devise-editors~devise-media~devise-slices"),s.e("devise-editors")]).then(s.t.bind(null,"310e",7))},XIcon:function(){return s.e("devise-icons").then(s.bind(null,"1a4e"))},MenuIcon:function(){return s.e("devise-icons").then(s.bind(null,"83e1"))}},props:{value:{type:Array,required:!0},modelQuery:{type:Object,required:!0},modelQuerySettings:{type:Object,required:!0}},data:function(){return{filter:null,autosuggest:{data:[]}}},computed:{selected:{get:function(){return this.value},set:function(e){this.$emit("input",e)}},filteredSuggestions:function(){var e=this;return this.autosuggest.data?this.autosuggest.data.filter((function(t){return!e.selected.find((function(e){return t===e}))})):[]}},watch:{value:function(e){e&&e.length>0&&"number"===typeof e[0]&&this.requestLegacySelected()}},mounted:function(){this.value&&this.value.length>0&&this.requestLegacySelected()},methods:Object(c["a"])(Object(c["a"])({},Object(p["b"])("devise",["appGenericSearch","getGeneric"])),{},{selectSuggestion:function(e){this.selected.push(e),this.resetSearch()},removeSuggestion:function(e){this.resetSearch(),this.selected.splice(this.selected.indexOf(e),1)},resetSearch:function(){this.filter=null,this.$set(this.autosuggest,"data",[])},requestSearch:function(e){var t=this,s=e.target.value;if(""!==s){var a=[];this.selected.forEach((function(e){a.push(e.id)}));var r={searchterm:s,selected:a};this.appGenericSearch({config:{apiendpoint:this.modelQuery.params[0].api},filters:r}).then((function(e){t.autosuggest=e.data,e.data.length<1&&window.deviseSettings.$bus.$emit("showMessage",{title:"No Suggestions Found",message:"We couldn't find any data with the term: \"".concat(s,'".')})}))}else this.autosuggest=Object.assign({},{})},subLabelFields:function(e){var t=JSON.parse(JSON.stringify(e));return t.shift(),t},format:function(e){return e.dateFormat?f()(e.value).format(e.dateFormat):e.value},requestLegacySelected:function(){var e=this;this.modelQuery.params[0].editApi?this.getGeneric({config:{apiendpoint:this.modelQuery.params[0].editApi,app:!0},filters:{ids:this.value.join(",")}}).then((function(t){e.selected=d(t.data.data)})):console.warn("Devise: You must have an editApi endpoint configured AppServiceProvider ModelQuery::set to edit model slices")}})},y=m,h=s("2877"),g=Object(h["a"])(y,a,r,!1,null,null,null);t["default"]=g.exports},a630:function(e,t,s){var a=s("23e7"),r=s("4df4"),n=s("1c7e"),i=!n((function(e){Array.from(e)}));a({target:"Array",stat:!0,forced:i},{from:r})},bce6:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("fieldset",{staticClass:"dvs-fieldset"},[s("label",[e._v("Please Select")]),s("select",{directives:[{name:"model",rawName:"v-model",value:e.localValue,expression:"localValue"}],staticClass:"dvs-w-full",attrs:{type:"text"},domProps:{value:e.value},on:{change:function(t){var s=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.localValue=t.target.multiple?s:s[0]}}},[s("option",{domProps:{value:null}},[e._v("Please Select from the Following")]),e._l(e.options,(function(t,a){return s("option",{key:a,domProps:{value:a}},[e._v(" "+e._s(t)+" ")])}))],2)])])},r=[],n=s("5530"),i=s("2f62"),l={name:"DeviseQuerySelectorSelect",props:{value:{type:String,required:!0},modelQuerySettings:{type:Object,required:!0}},data:function(){return{apiOptions:[]}},computed:{localValue:{get:function(){return this.value},set:function(e){this.$emit("input",e)}},options:function(){return this.modelQuerySettings.options?this.modelQuerySettings.options:this.apiOptions}},mounted:function(){this.modelQuerySettings.api&&this.requestOptions()},methods:Object(n["a"])(Object(n["a"])({},Object(i["b"])("devise",["getGeneric"])),{},{updateValue:function(e){var t=e.target.value;this.$emit("input",t)},requestOptions:function(){var e=this;this.getGeneric({config:{app:!0,apiendpoint:this.modelQuerySettings.api}}).then((function(t){e.apiOptions=t.data}))}})},o=l,u=s("2877"),d=Object(u["a"])(o,a,r,!1,null,null,null);t["default"]=d.exports},dd2b:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("fieldset",{staticClass:"dvs-fieldset"},[s("label",[e._v(e._s(e.modelQuerySettings.label))]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.localValue,expression:"localValue"}],staticClass:"dvs-w-full",attrs:{type:"text",placeholder:e.modelQuerySettings.label},domProps:{value:e.localValue},on:{input:function(t){t.target.composing||(e.localValue=t.target.value)}}})])])},r=[],n={name:"DeviseQuerySelectorText",props:{value:{type:String,required:!0},modelQuerySettings:{type:Object,required:!0}},computed:{localValue:{get:function(){return this.value},set:function(e){this.$emit("input",e)}}}},i=n,l=s("2877"),o=Object(l["a"])(i,a,r,!1,null,null,null);t["default"]=o.exports},dda1:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("fieldset",{staticClass:"dvs-fieldset"},[s("label",[e._v(e._s(e.value.label))]),s("date-picker",{ref:"datepicker",attrs:{settings:{date:!0,time:!0}},on:{change:e.updateValue}})],1)])},r=[],n=(s("d3b7"),{name:"DeviseQuerySelectorText",components:{DatePicker:function(){return Promise.all([s.e("devise-editors~devise-media~devise-slices"),s.e("devise-editors")]).then(s.bind(null,"7e6e"))}},props:{value:{type:Object,required:!0}},methods:{updateValue:function(e){var t=this.value;t.value=e,this.$emit("input",t)}}}),i=n,l=s("2877"),o=Object(l["a"])(i,a,r,!1,null,null,null);t["default"]=o.exports},e9bb:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"dvs-text-admin-fg"},[s("fieldset",{staticClass:"dvs-fieldset"},[s("label",{attrs:{for:"querykey"}},[e._v("Data Set Query")]),s("select",{directives:[{name:"model",rawName:"v-model",value:e.query,expression:"query"}],staticClass:"w-full",attrs:{id:"querykey",name:"querykey"},on:{change:function(t){var s=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.query=t.target.multiple?s:s[0]}}},[s("option",{attrs:{disabled:""},domProps:{value:null}},[e._v(" Please Select a Data Set Query ")]),e._l(e.modelQueries,(function(t){return s("option",{key:t.key,domProps:{value:t.key}},[e._v(e._s(t.description))])}))],2)]),e.selectedModelQuery&&e.selectedModelQuery.params.length>0?s("div",{staticClass:"dvs-mt-6"},e._l(e.selectedModelQuery.params,(function(t,a){return s("div",{key:a},["search"===t.type?s("param-search",{attrs:{"model-query":e.selectedModelQuery,"model-query-settings":t},model:{value:e.finalModelQuery.params[a],callback:function(t){e.$set(e.finalModelQuery.params,a,t)},expression:"finalModelQuery.params[key]"}}):e._e(),"text"===t.type?s("param-text",{staticClass:"dvs-mb-4",attrs:{"model-query":e.selectedModelQuery,"model-query-settings":t},model:{value:e.finalModelQuery.params[a],callback:function(t){e.$set(e.finalModelQuery.params,a,t)},expression:"finalModelQuery.params[key]"}}):e._e(),"select"===t.type?s("param-select",{staticClass:"dvs-mb-4",attrs:{"model-query":e.selectedModelQuery,"model-query-settings":t},model:{value:e.finalModelQuery.params[a],callback:function(t){e.$set(e.finalModelQuery.params,a,t)},expression:"finalModelQuery.params[key]"}}):e._e(),"datetime"===t.type?s("param-datetime",{staticClass:"dvs-mb-4",attrs:{"model-query":e.selectedModelQuery,"model-query-settings":t},model:{value:e.finalModelQuery.params[a],callback:function(t){e.$set(e.finalModelQuery.params,a,t)},expression:"finalModelQuery.params[key]"}}):e._e()],1)})),0):e._e()])},r=[],n=(s("7db0"),s("4160"),s("d3b7"),s("159b"),s("5530")),i=s("2f62"),l={name:"QuerySelector",components:{ParamDatetime:function(){return Promise.resolve().then(s.bind(null,"dda1"))},ParamSearch:function(){return Promise.resolve().then(s.bind(null,"a501"))},ParamSelect:function(){return Promise.resolve().then(s.bind(null,"bce6"))},ParamText:function(){return Promise.resolve().then(s.bind(null,"dd2b"))}},props:{value:{type:Object,required:!0}},data:function(){return{query:""}},computed:Object(n["a"])(Object(n["a"])({},Object(i["e"])("devise",["modelQueries"])),{},{finalModelQuery:{get:function(){return this.value},set:function(e){console.log("setting new value"),this.$emit("input",e)},deep:!0},selectedModelQuery:function(){var e=this;return this.modelQueries.find((function(t){return t.key===e.query}))}}),watch:{selectedModelQuery:{handler:function(e){var t=this;this.finalModelQuery.params=[],console.log("clearing"),e.params.forEach((function(e){"search"===e.type?t.finalModelQuery.params.push([]):t.finalModelQuery.params.push("")})),this.finalModelQuery.key=e.key},deep:!0}},mounted:function(){this.value&&this.value.key&&this.loadPreviousState()},methods:{loadPreviousState:function(){var e=this,t=JSON.parse(JSON.stringify(this.value.params));this.$set(this,"query",this.value.key),this.delay(1e3).then((function(){e.value.params=t}))},loadPreviousParams:function(e){var t=this;console.log("inLoadPreviousParams",e),e.forEach((function(e,s){console.log("loop",e,s),t.finalModelQuery.params[s]=e}))},delay:function(e){return new Promise((function(t){return setTimeout(t,e)}))}}},o=l,u=s("2877"),d=Object(u["a"])(o,a,r,!1,null,null,null);t["default"]=d.exports}}]);
//# sourceMappingURL=devise-query-selector.21c289d7.js.map