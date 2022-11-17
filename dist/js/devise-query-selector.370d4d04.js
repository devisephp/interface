"use strict";(self["webpackChunkdevisephp_interface"]=self["webpackChunkdevisephp_interface"]||[]).push([[969],{2696:function(e,t,s){s.r(t),s.d(t,{default:function(){return u}});var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("fieldset",{staticClass:"dvs-fieldset"},[s("label",[e._v(e._s(e.value.label))]),s("date-picker",{ref:"datepicker",attrs:{settings:{date:!0,time:!0}},on:{change:e.updateValue}})],1)])},l=[],r={name:"DeviseQuerySelectorText",components:{DatePicker:()=>Promise.all([s.e(477),s.e(469)]).then(s.bind(s,6994))},props:{value:{type:Object,required:!0}},methods:{updateValue(e){const t=this.value;t.value=e,this.$emit("input",t)}}},i=r,n=s(1001),d=(0,n.Z)(i,a,l,!1,null,null,null),u=d.exports},4980:function(e,t,s){s.r(t),s.d(t,{default:function(){return o}});var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"dvs-text-gray-200"},[s("fieldset",{staticClass:"dvs-fieldset"},[s("label",{attrs:{for:"querykey"}},[e._v("Data Set Query")]),s("select",{directives:[{name:"model",rawName:"v-model",value:e.query,expression:"query"}],staticClass:"w-full",attrs:{id:"querykey",name:"querykey"},on:{change:function(t){var s=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.query=t.target.multiple?s:s[0]}}},[s("option",{attrs:{disabled:""},domProps:{value:null}},[e._v("Please Select a Data Set Query")]),e._l(e.modelQueries,(function(t){return s("option",{key:t.key,domProps:{value:t.key}},[e._v(" "+e._s(t.description)+" ")])}))],2)]),e.selectedModelQuery&&e.selectedModelQuery.params.length>0?s("div",{staticClass:"dvs-mt-6"},e._l(e.selectedModelQuery.params,(function(t,a){return s("div",{key:a},["search"===t.type?s("param-search",{attrs:{"model-query":e.selectedModelQuery,"model-query-settings":t},model:{value:e.finalModelQuery.params[a],callback:function(t){e.$set(e.finalModelQuery.params,a,t)},expression:"finalModelQuery.params[key]"}}):e._e(),"text"===t.type?s("param-text",{staticClass:"dvs-mb-4",attrs:{"model-query":e.selectedModelQuery,"model-query-settings":t},model:{value:e.finalModelQuery.params[a],callback:function(t){e.$set(e.finalModelQuery.params,a,t)},expression:"finalModelQuery.params[key]"}}):e._e(),"select"===t.type?s("param-select",{staticClass:"dvs-mb-4",attrs:{"model-query":e.selectedModelQuery,"model-query-settings":t},model:{value:e.finalModelQuery.params[a],callback:function(t){e.$set(e.finalModelQuery.params,a,t)},expression:"finalModelQuery.params[key]"}}):e._e(),"datetime"===t.type?s("param-datetime",{staticClass:"dvs-mb-4",attrs:{"model-query":e.selectedModelQuery,"model-query-settings":t},model:{value:e.finalModelQuery.params[a],callback:function(t){e.$set(e.finalModelQuery.params,a,t)},expression:"finalModelQuery.params[key]"}}):e._e()],1)})),0):e._e()])},l=[],r=s(629),i={name:"QuerySelector",components:{ParamDatetime:()=>s.e(969).then(s.bind(s,2696)),ParamSearch:()=>s.e(969).then(s.bind(s,6559)),ParamSelect:()=>s.e(969).then(s.bind(s,9618)),ParamText:()=>s.e(969).then(s.bind(s,6070))},props:{value:{type:Object,required:!0}},data(){return{query:""}},computed:{...(0,r.rn)("devise",["modelQueries"]),finalModelQuery:{get(){return this.value},set(e){this.$emit("input",e)},deep:!0},selectedModelQuery(){return this.modelQueries.find((e=>e.key===this.query))}},watch:{selectedModelQuery:{handler(e){this.finalModelQuery.params=[],e.params.forEach((e=>{"search"===e.type?this.finalModelQuery.params.push([]):this.finalModelQuery.params.push("")})),this.finalModelQuery.key=e.key},deep:!0}},mounted(){this.value&&this.value.key&&this.loadPreviousState()},methods:{loadPreviousState(){const e=JSON.parse(JSON.stringify(this.value.params));this.$set(this,"query",this.value.key),this.delay(1e3).then((()=>{this.finalModelQuery.params=e}))},loadPreviousParams(e){e.forEach(((e,t)=>{this.finalModelQuery.params[t]=e}))},delay(e){return new Promise((t=>setTimeout(t,e)))}}},n=i,d=s(1001),u=(0,d.Z)(n,a,l,!1,null,null,null),o=u.exports},6559:function(e,t,s){s.r(t),s.d(t,{default:function(){return v}});var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("div",{staticClass:"dvs-flex dvs-justify-center dvs-p-4 dvs-pb-8 dvs-text-gray-200 dvs-w-full"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.filter,expression:"filter"}],ref:"filter",staticClass:"dvs-bg-transparent dvs-border-b-2 dvs-px-12 dvs-py-2 dvs-text-gray-200 dvs-outline-none dvs-placeholder-admin-fg dvs-text-center",attrs:{type:"text",placeholder:e.value.label},domProps:{value:e.filter},on:{keyup:e.requestSearch,input:function(t){t.target.composing||(e.filter=t.target.value)}}}),s("div",{staticClass:"dvs-cursor-pointer",class:{"dvs-opacity-50":""===e.filter},on:{click:e.resetSearch}},[s("x-icon")],1)]),s("ul",e._l(e.filteredSuggestions,(function(t,a){return s("li",{key:a,staticClass:"dvs-bg-gray-800 dvs-shadow hover:dvs-shadow-lg dvs-rounded dvs-my-4 dvs-p-2 dvs-cursor-pointer",on:{click:function(s){return e.selectSuggestion(t)}}},[s("div",{staticClass:"dvs-text-lg dvs-mb-2"},[e._v(e._s(t.displayFields[0].value))]),s("ul",{staticClass:"dvs-flex"},e._l(e.subLabelFields(t.displayFields),(function(t,a){return s("li",{key:a,staticClass:"dvs-mr-4 dvs-text-xs dvs-leading-tight"},[s("div",{staticClass:"dvs-uppercase dvs-text-xs dvs-text-admin-secondary-fg"},[e._v(" "+e._s(t.label)+" ")]),s("div",[e._v(e._s(e.format(t)))])])})),0)])})),0),s("draggable",e._b({attrs:{list:e.selected,tag:"ul"}},"draggable",{group:{name:"g1"},animation:200,ghostClass:"dvs-ghost",handle:".handle",dragClass:"dvs-chosen-drag-slice",emptyInsertThreshold:10,removeCloneOnHide:!1},!1),e._l(e.selected,(function(t,a){return s("li",{key:a,staticClass:"dvs-flex dvs-bg-admin-secondary-bg dvs-text-admin-secondary-fg dvs-shadow hover:dvs-shadow-lg dvs-rounded dvs-my-4 dvs-p-4 dvs-cursor-pointer"},[e.modelQuerySettings.allowSort?s("div",{staticClass:"dvs-mr-4 handle"},[s("menu-icon")],1):e._e(),t.displayFields?s("div",{staticClass:"dvs-w-full"},[s("div",{staticClass:"dvs-text-lg dvs-mb-2"},[e._v(e._s(t.displayFields[0].value))]),s("ul",{staticClass:"dvs-flex"},e._l(e.subLabelFields(t.displayFields),(function(t,a){return s("li",{key:a,staticClass:"dvs-mr-4 dvs-text-xs dvs-leading-tight dvs-w-1/4 dvs-bg-gray-800 dvs-text-gray-200 dvs-rounded dvs-p-3 opacity-75"},[s("div",{staticClass:"dvs-uppercase dvs-text-xs"},[e._v(e._s(t.label))]),s("div",[e._v(e._s(e.format(t)))])])})),0)]):e._e(),s("div",{staticClass:"dvs-cursor-pointer",on:{click:function(s){return e.removeSuggestion(t)}}},[s("x-icon")],1)])})),0)],1)},l=[],r=s(7484),i=s.n(r),n=s(629),d={name:"DeviseQuerySelectorSearch",components:{draggable:()=>Promise.all([s.e(477),s.e(469)]).then(s.t.bind(s,9980,23)),XIcon:()=>s.e(952).then(s.bind(s,7583)),MenuIcon:()=>s.e(952).then(s.bind(s,1804))},props:{value:{type:Array,required:!0},modelQuery:{type:Object,required:!0},modelQuerySettings:{type:Object,required:!0}},data(){return{filter:null,autosuggest:{data:[]}}},computed:{selected:{get(){return this.value},set(e){this.$emit("input",e)}},filteredSuggestions(){return this.autosuggest.data?this.autosuggest.data.filter((e=>!this.selected.find((t=>e===t)))):[]}},watch:{value(e){e&&e.length>0&&"number"===typeof e[0]&&this.requestLegacySelected()}},mounted(){this.value&&this.value.length>0&&this.requestLegacySelected()},methods:{...(0,n.nv)("devise",["appGenericSearch","getGeneric"]),selectSuggestion(e){this.selected.push(e),this.resetSearch()},removeSuggestion(e){this.resetSearch(),this.selected.splice(this.selected.indexOf(e),1)},resetSearch(){this.filter=null,this.$set(this.autosuggest,"data",[])},requestSearch(e){const t=e.target.value;if(""!==t){const e=[];this.selected.forEach((t=>{e.push(t.id)}));const s={searchterm:t,selected:e};this.appGenericSearch({config:{apiendpoint:this.modelQuery.params[0].api},filters:s}).then((e=>{this.autosuggest=e.data,e.data.length<1&&window.deviseSettings.$bus.$emit("showMessage",{title:"No Suggestions Found",message:`We couldn't find any data with the term: "${t}".`})}))}else this.autosuggest=Object.assign({},{})},subLabelFields(e){const t=JSON.parse(JSON.stringify(e));return t.shift(),t},format(e){return e.dateFormat?i()(e.value).format(e.dateFormat):e.value},requestLegacySelected(){this.modelQuery.params[0].editApi?this.getGeneric({config:{apiendpoint:this.modelQuery.params[0].editApi,app:!0},filters:{ids:this.value.join(",")}}).then((e=>{this.selected=[...e.data.data]})):console.warn("Devise: You must have an editApi endpoint configured AppServiceProvider ModelQuery::set to edit model slices")}}},u=d,o=s(1001),c=(0,o.Z)(u,a,l,!1,null,null,null),v=c.exports},9618:function(e,t,s){s.r(t),s.d(t,{default:function(){return o}});var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("fieldset",{staticClass:"dvs-fieldset"},[s("label",[e._v("Please Select")]),s("select",{directives:[{name:"model",rawName:"v-model",value:e.localValue,expression:"localValue"}],staticClass:"dvs-w-full",attrs:{type:"text"},domProps:{value:e.value},on:{change:function(t){var s=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.localValue=t.target.multiple?s:s[0]}}},[s("option",{domProps:{value:null}},[e._v("Please Select from the Following")]),e._l(e.options,(function(t,a){return s("option",{key:a,domProps:{value:a}},[e._v(" "+e._s(t)+" ")])}))],2)])])},l=[],r=s(629),i={name:"DeviseQuerySelectorSelect",props:{value:{type:String,required:!0},modelQuerySettings:{type:Object,required:!0}},data(){return{apiOptions:[]}},computed:{localValue:{get(){return this.value},set(e){this.$emit("input",e)}},options(){return this.modelQuerySettings.options?this.modelQuerySettings.options:this.apiOptions}},mounted(){this.modelQuerySettings.api&&this.requestOptions()},methods:{...(0,r.nv)("devise",["getGeneric"]),updateValue(e){const t=e.target.value;this.$emit("input",t)},requestOptions(){this.getGeneric({config:{app:!0,apiendpoint:this.modelQuerySettings.api}}).then((e=>{this.apiOptions=e.data}))}}},n=i,d=s(1001),u=(0,d.Z)(n,a,l,!1,null,null,null),o=u.exports},6070:function(e,t,s){s.r(t),s.d(t,{default:function(){return u}});var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("fieldset",{staticClass:"dvs-fieldset"},[s("label",[e._v(e._s(e.modelQuerySettings.label))]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.localValue,expression:"localValue"}],staticClass:"dvs-w-full",attrs:{type:"text",placeholder:e.modelQuerySettings.label},domProps:{value:e.localValue},on:{input:function(t){t.target.composing||(e.localValue=t.target.value)}}})])])},l=[],r={name:"DeviseQuerySelectorText",props:{value:{type:String,required:!0},modelQuerySettings:{type:Object,required:!0}},computed:{localValue:{get(){return this.value},set(e){this.$emit("input",e)}}}},i=r,n=s(1001),d=(0,n.Z)(i,a,l,!1,null,null,null),u=d.exports}}]);
//# sourceMappingURL=devise-query-selector.370d4d04.js.map