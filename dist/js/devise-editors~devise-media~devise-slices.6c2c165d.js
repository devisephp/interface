(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["devise-editors~devise-media~devise-slices"],{"194a":function(e,t,n){},"1b1f":function(e,t,n){"use strict";var i=n("194a"),a=n.n(i);a.a},"35dd":function(e,t,n){"use strict";var i=n("dcc8"),a=n.n(i);a.a},"3b62":function(e,t,n){"use strict";var i=n("c6c8"),a=n.n(i);a.a},"3d34":function(e,t,n){"use strict";var i=n("4d54"),a=n.n(i);a.a},"4d54":function(e,t,n){},"53a5":function(e,t){function n(e,t,n){return t<n?e<t?t:e>n?n:e:e<n?n:e>t?t:e}e.exports=n},"70c4":function(e,t,n){},"84a2":function(e,t,n){(function(t){var n="Expected a function",i=NaN,a="[object Symbol]",s=/^\s+|\s+$/g,o=/^[-+]0x[0-9a-f]+$/i,l=/^0b[01]+$/i,r=/^0o[0-7]+$/i,c=parseInt,h="object"==typeof t&&t&&t.Object===Object&&t,u="object"==typeof self&&self&&self.Object===Object&&self,d=h||u||Function("return this")(),v=Object.prototype,f=v.toString,p=Math.max,g=Math.min,m=function(){return d.Date.now()};function b(e,t,i){var a,s,o,l,r,c,h=0,u=!1,d=!1,v=!0;if("function"!=typeof e)throw new TypeError(n);function f(t){var n=a,i=s;return a=s=void 0,h=t,l=e.apply(i,n),l}function b(e){return h=e,r=setTimeout(y,t),u?f(e):l}function C(e){var n=e-c,i=e-h,a=t-n;return d?g(a,o-i):a}function x(e){var n=e-c,i=e-h;return void 0===c||n>=t||n<0||d&&i>=o}function y(){var e=m();if(x(e))return L(e);r=setTimeout(y,C(e))}function L(e){return r=void 0,v&&a?f(e):(a=s=void 0,l)}function E(){void 0!==r&&clearTimeout(r),h=0,a=c=s=r=void 0}function k(){return void 0===r?l:L(m())}function O(){var e=m(),n=x(e);if(a=arguments,s=this,c=e,n){if(void 0===r)return b(c);if(d)return r=setTimeout(y,t),f(c)}return void 0===r&&(r=setTimeout(y,t)),l}return t=_(t)||0,w(i)&&(u=!!i.leading,d="maxWait"in i,o=d?p(_(i.maxWait)||0,t):o,v="trailing"in i?!!i.trailing:v),O.cancel=E,O.flush=k,O}function C(e,t,i){var a=!0,s=!0;if("function"!=typeof e)throw new TypeError(n);return w(i)&&(a="leading"in i?!!i.leading:a,s="trailing"in i?!!i.trailing:s),b(e,t,{leading:a,maxWait:t,trailing:s})}function w(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function x(e){return!!e&&"object"==typeof e}function y(e){return"symbol"==typeof e||x(e)&&f.call(e)==a}function _(e){if("number"==typeof e)return e;if(y(e))return i;if(w(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=w(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(s,"");var n=l.test(e);return n||r.test(e)?c(e.slice(2),n?2:8):o.test(e)?i:+e}e.exports=C}).call(this,n("c8ba"))},"8f8c":function(e,t,n){},c6c8:function(e,t,n){},cf74:function(e,t,n){"use strict";var i=n("8f8c"),a=n.n(i);a.a},dcc8:function(e,t,n){},e21f:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:["vc-chrome",e.disableAlpha?"vc-chrome__disable-alpha":""],attrs:{role:"application","aria-label":"Chrome color picker"}},[n("div",{staticClass:"vc-chrome-saturation-wrap"},[n("saturation",{on:{change:e.childChange},model:{value:e.colors,callback:function(t){e.colors=t},expression:"colors"}})],1),n("div",{staticClass:"vc-chrome-body"},[n("div",{staticClass:"vc-chrome-controls"},[n("div",{staticClass:"vc-chrome-color-wrap"},[n("div",{staticClass:"vc-chrome-active-color",style:{background:e.activeColor},attrs:{"aria-label":"current color is "+e.colors.hex}}),e.disableAlpha?e._e():n("checkboard")],1),n("div",{staticClass:"vc-chrome-sliders"},[n("div",{staticClass:"vc-chrome-hue-wrap"},[n("hue",{on:{change:e.childChange},model:{value:e.colors,callback:function(t){e.colors=t},expression:"colors"}})],1),e.disableAlpha?e._e():n("div",{staticClass:"vc-chrome-alpha-wrap"},[n("alpha",{on:{change:e.childChange},model:{value:e.colors,callback:function(t){e.colors=t},expression:"colors"}})],1)])]),e.disableFields?e._e():n("div",{staticClass:"vc-chrome-fields-wrap"},[n("div",{directives:[{name:"show",rawName:"v-show",value:0===e.fieldsIndex,expression:"fieldsIndex === 0"}],staticClass:"vc-chrome-fields"},[n("div",{staticClass:"vc-chrome-field"},[e.hasAlpha?e._e():n("ed-in",{attrs:{label:"hex",value:e.colors.hex},on:{change:e.inputChange}}),e.hasAlpha?n("ed-in",{attrs:{label:"hex",value:e.colors.hex8},on:{change:e.inputChange}}):e._e()],1)]),n("div",{directives:[{name:"show",rawName:"v-show",value:1===e.fieldsIndex,expression:"fieldsIndex === 1"}],staticClass:"vc-chrome-fields"},[n("div",{staticClass:"vc-chrome-field"},[n("ed-in",{attrs:{label:"r",value:e.colors.rgba.r},on:{change:e.inputChange}})],1),n("div",{staticClass:"vc-chrome-field"},[n("ed-in",{attrs:{label:"g",value:e.colors.rgba.g},on:{change:e.inputChange}})],1),n("div",{staticClass:"vc-chrome-field"},[n("ed-in",{attrs:{label:"b",value:e.colors.rgba.b},on:{change:e.inputChange}})],1),e.disableAlpha?e._e():n("div",{staticClass:"vc-chrome-field"},[n("ed-in",{attrs:{label:"a",value:e.colors.a,"arrow-offset":.01,max:1},on:{change:e.inputChange}})],1)]),n("div",{directives:[{name:"show",rawName:"v-show",value:2===e.fieldsIndex,expression:"fieldsIndex === 2"}],staticClass:"vc-chrome-fields"},[n("div",{staticClass:"vc-chrome-field"},[n("ed-in",{attrs:{label:"h",value:e.hsl.h},on:{change:e.inputChange}})],1),n("div",{staticClass:"vc-chrome-field"},[n("ed-in",{attrs:{label:"s",value:e.hsl.s},on:{change:e.inputChange}})],1),n("div",{staticClass:"vc-chrome-field"},[n("ed-in",{attrs:{label:"l",value:e.hsl.l},on:{change:e.inputChange}})],1),e.disableAlpha?e._e():n("div",{staticClass:"vc-chrome-field"},[n("ed-in",{attrs:{label:"a",value:e.colors.a,"arrow-offset":.01,max:1},on:{change:e.inputChange}})],1)]),n("div",{staticClass:"vc-chrome-toggle-btn",attrs:{role:"button","aria-label":"Change another color definition"},on:{click:e.toggleViews}},[n("div",{staticClass:"vc-chrome-toggle-icon"},[n("svg",{staticStyle:{width:"24px",height:"24px"},attrs:{viewBox:"0 0 24 24"},on:{mouseover:e.showHighlight,mouseenter:e.showHighlight,mouseout:e.hideHighlight}},[n("path",{attrs:{fill:"#333",d:"M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"}})])]),n("div",{directives:[{name:"show",rawName:"v-show",value:e.highlight,expression:"highlight"}],staticClass:"vc-chrome-toggle-icon-highlight"})])])])])},a=[],s=(n("b680"),n("a15b"),n("ac1f"),n("5319"),n("66cb")),o=n.n(s);function l(e,t){var n,i=e&&e.a;n=e&&e.hsl?o()(e.hsl):e&&e.hex&&e.hex.length>0?o()(e.hex):e&&e.hsv?o()(e.hsv):e&&e.rgba?o()(e.rgba):e&&e.rgb?o()(e.rgb):o()(e),!n||void 0!==n._a&&null!==n._a||n.setAlpha(i||1);var a=n.toHsl(),s=n.toHsv();return 0===a.s&&(s.h=a.h=e.h||e.hsl&&e.hsl.h||t||0),{hsl:a,hex:n.toHexString().toUpperCase(),hex8:n.toHex8String().toUpperCase(),rgba:n.toRgb(),hsv:s,oldHue:e.h||t||a.h,source:e.source,a:e.a||n.getAlpha()}}var r={props:["value"],data(){return{val:l(this.value)}},computed:{colors:{get(){return this.val},set(e){this.val=e,this.$emit("input",e)}}},watch:{value(e){this.val=l(e)}},methods:{colorChange(e,t){this.oldHue=this.colors.hsl.h,this.colors=l(e,t||this.oldHue)},isValidHex(e){return o()(e).isValid()},simpleCheckForValidColor(e){for(var t=["r","g","b","a","h","s","l","v"],n=0,i=0,a=0;a<t.length;a++){var s=t[a];e[s]&&(n++,isNaN(e[s])||i++)}if(n===i)return e},paletteUpperCase(e){return e.map(e=>e.toUpperCase())},isTransparent(e){return 0===o()(e).getAlpha()}}},c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vc-editable-input"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.val,expression:"val"}],ref:"input",staticClass:"vc-input__input",attrs:{"aria-labelledby":e.labelId},domProps:{value:e.val},on:{keydown:e.handleKeyDown,input:[function(t){t.target.composing||(e.val=t.target.value)},e.update]}}),n("span",{staticClass:"vc-input__label",attrs:{for:e.label,id:e.labelId}},[e._v(e._s(e.labelSpanText))]),n("span",{staticClass:"vc-input__desc"},[e._v(e._s(e.desc))])])},h=[],u=(n("a9e3"),n("99af"),n("fb6a"),n("d3b7"),n("25f0"),{name:"editableInput",props:{label:String,labelText:String,desc:String,value:[String,Number],max:Number,min:Number,arrowOffset:{type:Number,default:1}},computed:{val:{get:function(){return this.value},set:function(e){if(!(void 0!==this.max&&+e>this.max))return e;this.$refs.input.value=this.max}},labelId:function(){return"input__label__".concat(this.label,"__").concat(Math.random().toString().slice(2,5))},labelSpanText:function(){return this.labelText||this.label}},methods:{update:function(e){this.handleChange(e.target.value)},handleChange:function(e){var t={};t[this.label]=e,(void 0===t.hex&&void 0===t["#"]||e.length>5)&&this.$emit("change",t)},handleKeyDown:function(e){var t=this.val,n=Number(t);if(n){var i=this.arrowOffset||1;38===e.keyCode&&(t=n+i,this.handleChange(t),e.preventDefault()),40===e.keyCode&&(t=n-i,this.handleChange(t),e.preventDefault())}}}}),d=u,v=(n("3b62"),n("2877")),f=Object(v["a"])(d,c,h,!1,null,null,null),p=f.exports,g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"container",staticClass:"vc-saturation",style:{background:e.bgColor},on:{mousedown:e.handleMouseDown,touchmove:e.handleChange,touchstart:e.handleChange}},[n("div",{staticClass:"vc-saturation--white"}),n("div",{staticClass:"vc-saturation--black"}),n("div",{staticClass:"vc-saturation-pointer",style:{top:e.pointerTop,left:e.pointerLeft}},[n("div",{staticClass:"vc-saturation-circle"})])])},m=[],b=n("53a5"),C=n.n(b),w=n("84a2"),x=n.n(w),y={name:"Saturation",props:{value:Object},computed:{colors:function(){return this.value},bgColor:function(){return"hsl(".concat(this.colors.hsv.h,", 100%, 50%)")},pointerTop:function(){return-100*this.colors.hsv.v+1+100+"%"},pointerLeft:function(){return 100*this.colors.hsv.s+"%"}},methods:{throttle:x()((function(e,t){e(t)}),20,{leading:!0,trailing:!1}),handleChange:function(e,t){!t&&e.preventDefault();var n=this.$refs.container,i=n.clientWidth,a=n.clientHeight,s=n.getBoundingClientRect().left+window.pageXOffset,o=n.getBoundingClientRect().top+window.pageYOffset,l=e.pageX||(e.touches?e.touches[0].pageX:0),r=e.pageY||(e.touches?e.touches[0].pageY:0),c=C()(l-s,0,i),h=C()(r-o,0,a),u=c/i,d=C()(-h/a+1,0,1);this.throttle(this.onChange,{h:this.colors.hsv.h,s:u,v:d,a:this.colors.hsv.a,source:"hsva"})},onChange:function(e){this.$emit("change",e)},handleMouseDown:function(e){window.addEventListener("mousemove",this.handleChange),window.addEventListener("mouseup",this.handleChange),window.addEventListener("mouseup",this.handleMouseUp)},handleMouseUp:function(e){this.unbindEventListeners()},unbindEventListeners:function(){window.removeEventListener("mousemove",this.handleChange),window.removeEventListener("mouseup",this.handleChange),window.removeEventListener("mouseup",this.handleMouseUp)}}},_=y,L=(n("35dd"),Object(v["a"])(_,g,m,!1,null,null,null)),E=L.exports,k=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:["vc-hue",e.directionClass]},[n("div",{ref:"container",staticClass:"vc-hue-container",attrs:{role:"slider","aria-valuenow":e.colors.hsl.h,"aria-valuemin":"0","aria-valuemax":"360"},on:{mousedown:e.handleMouseDown,touchmove:e.handleChange,touchstart:e.handleChange}},[n("div",{staticClass:"vc-hue-pointer",style:{top:e.pointerTop,left:e.pointerLeft},attrs:{role:"presentation"}},[n("div",{staticClass:"vc-hue-picker"})])])])},O=[],j={name:"Hue",props:{value:Object,direction:{type:String,default:"horizontal"}},data:function(){return{oldHue:0,pullDirection:""}},computed:{colors:function(){var e=this.value.hsl.h;return 0!==e&&e-this.oldHue>0&&(this.pullDirection="right"),0!==e&&e-this.oldHue<0&&(this.pullDirection="left"),this.oldHue=e,this.value},directionClass:function(){return{"vc-hue--horizontal":"horizontal"===this.direction,"vc-hue--vertical":"vertical"===this.direction}},pointerTop:function(){return"vertical"===this.direction?0===this.colors.hsl.h&&"right"===this.pullDirection?0:-100*this.colors.hsl.h/360+100+"%":0},pointerLeft:function(){return"vertical"===this.direction?0:0===this.colors.hsl.h&&"right"===this.pullDirection?"100%":100*this.colors.hsl.h/360+"%"}},methods:{handleChange:function(e,t){!t&&e.preventDefault();var n,i,a=this.$refs.container,s=a.clientWidth,o=a.clientHeight,l=a.getBoundingClientRect().left+window.pageXOffset,r=a.getBoundingClientRect().top+window.pageYOffset,c=e.pageX||(e.touches?e.touches[0].pageX:0),h=e.pageY||(e.touches?e.touches[0].pageY:0),u=c-l,d=h-r;"vertical"===this.direction?(d<0?n=360:d>o?n=0:(i=-100*d/o+100,n=360*i/100),this.colors.hsl.h!==n&&this.$emit("change",{h:n,s:this.colors.hsl.s,l:this.colors.hsl.l,a:this.colors.hsl.a,source:"hsl"})):(u<0?n=0:u>s?n=360:(i=100*u/s,n=360*i/100),this.colors.hsl.h!==n&&this.$emit("change",{h:n,s:this.colors.hsl.s,l:this.colors.hsl.l,a:this.colors.hsl.a,source:"hsl"}))},handleMouseDown:function(e){this.handleChange(e,!0),window.addEventListener("mousemove",this.handleChange),window.addEventListener("mouseup",this.handleMouseUp)},handleMouseUp:function(e){this.unbindEventListeners()},unbindEventListeners:function(){window.removeEventListener("mousemove",this.handleChange),window.removeEventListener("mouseup",this.handleMouseUp)}}},H=j,M=(n("ea0a"),Object(v["a"])(H,k,O,!1,null,null,null)),S=M.exports,D=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vc-alpha"},[n("div",{staticClass:"vc-alpha-checkboard-wrap"},[n("checkboard")],1),n("div",{staticClass:"vc-alpha-gradient",style:{background:e.gradientColor}}),n("div",{ref:"container",staticClass:"vc-alpha-container",on:{mousedown:e.handleMouseDown,touchmove:e.handleChange,touchstart:e.handleChange}},[n("div",{staticClass:"vc-alpha-pointer",style:{left:100*e.colors.a+"%"}},[n("div",{staticClass:"vc-alpha-picker"})])])])},$=[],T=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vc-checkerboard",style:e.bgStyle})},I=[],N={},U={name:"Checkboard",props:{size:{type:[Number,String],default:8},white:{type:String,default:"#fff"},grey:{type:String,default:"#e6e6e6"}},computed:{bgStyle:function(){return{"background-image":"url("+R(this.white,this.grey,this.size)+")"}}}};function A(e,t,n){if("undefined"===typeof document)return null;var i=document.createElement("canvas");i.width=i.height=2*n;var a=i.getContext("2d");return a?(a.fillStyle=e,a.fillRect(0,0,i.width,i.height),a.fillStyle=t,a.fillRect(0,0,n,n),a.translate(n,n),a.fillRect(0,0,n,n),i.toDataURL()):null}function R(e,t,n){var i=e+","+t+","+n;if(N[i])return N[i];var a=A(e,t,n);return N[i]=a,a}var X=U,B=(n("cf74"),Object(v["a"])(X,T,I,!1,null,null,null)),F=B.exports,V={name:"Alpha",props:{value:Object,onChange:Function},components:{checkboard:F},computed:{colors:function(){return this.value},gradientColor:function(){var e=this.colors.rgba,t=[e.r,e.g,e.b].join(",");return"linear-gradient(to right, rgba("+t+", 0) 0%, rgba("+t+", 1) 100%)"}},methods:{handleChange:function(e,t){!t&&e.preventDefault();var n,i=this.$refs.container,a=i.clientWidth,s=i.getBoundingClientRect().left+window.pageXOffset,o=e.pageX||(e.touches?e.touches[0].pageX:0),l=o-s;n=l<0?0:l>a?1:Math.round(100*l/a)/100,this.colors.a!==n&&this.$emit("change",{h:this.colors.hsl.h,s:this.colors.hsl.s,l:this.colors.hsl.l,a:n,source:"rgba"})},handleMouseDown:function(e){this.handleChange(e,!0),window.addEventListener("mousemove",this.handleChange),window.addEventListener("mouseup",this.handleMouseUp)},handleMouseUp:function(){this.unbindEventListeners()},unbindEventListeners:function(){window.removeEventListener("mousemove",this.handleChange),window.removeEventListener("mouseup",this.handleMouseUp)}}},W=V,Y=(n("3d34"),Object(v["a"])(W,D,$,!1,null,null,null)),z=Y.exports,J={name:"Chrome",mixins:[r],props:{disableAlpha:{type:Boolean,default:!1},disableFields:{type:Boolean,default:!1}},components:{saturation:E,hue:S,alpha:z,"ed-in":p,checkboard:F},data:function(){return{fieldsIndex:0,highlight:!1}},computed:{hsl:function(){var e=this.colors.hsl,t=e.h,n=e.s,i=e.l;return{h:t.toFixed(),s:"".concat((100*n).toFixed(),"%"),l:"".concat((100*i).toFixed(),"%")}},activeColor:function(){var e=this.colors.rgba;return"rgba("+[e.r,e.g,e.b,e.a].join(",")+")"},hasAlpha:function(){return this.colors.a<1}},methods:{childChange:function(e){this.colorChange(e)},inputChange:function(e){if(e)if(e.hex)this.isValidHex(e.hex)&&this.colorChange({hex:e.hex,source:"hex"});else if(e.r||e.g||e.b||e.a)this.colorChange({r:e.r||this.colors.rgba.r,g:e.g||this.colors.rgba.g,b:e.b||this.colors.rgba.b,a:e.a||this.colors.rgba.a,source:"rgba"});else if(e.h||e.s||e.l){var t=e.s?e.s.replace("%","")/100:this.colors.hsl.s,n=e.l?e.l.replace("%","")/100:this.colors.hsl.l;this.colorChange({h:e.h||this.colors.hsl.h,s:t,l:n,source:"hsl"})}},toggleViews:function(){this.fieldsIndex>=2?this.fieldsIndex=0:this.fieldsIndex++},showHighlight:function(){this.highlight=!0},hideHighlight:function(){this.highlight=!1}}},K=J,P=(n("1b1f"),Object(v["a"])(K,i,a,!1,null,null,null));t["default"]=P.exports},ea0a:function(e,t,n){"use strict";var i=n("70c4"),a=n.n(i);a.a}}]);
//# sourceMappingURL=devise-editors~devise-media~devise-slices.6c2c165d.js.map