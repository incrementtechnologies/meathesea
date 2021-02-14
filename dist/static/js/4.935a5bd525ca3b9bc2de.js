webpackJsonp([4],{459:function(e,t,n){n(631);var r=n(300)(n(575),n(678),"data-v-5730adac",null);e.exports=r.exports},469:function(e,t,n){"use strict";function r(e){var t,n;this.promise=new e(function(e,r){if(void 0!==t||void 0!==n)throw TypeError("Bad Promise constructor");t=e,n=r}),this.resolve=i(t),this.reject=i(n)}var i=n(302);e.exports.f=function(e){return new r(e)}},470:function(e,t,n){var r=n(140),i=n(38)("toStringTag"),o="Arguments"==r(function(){return arguments}()),a=function(e,t){try{return e[t]}catch(e){}};e.exports=function(e){var t,n,s;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=a(t=Object(e),i))?n:o?r(t):"Object"==(s=r(t))&&"function"==typeof t.callee?"Arguments":s}},471:function(e,t){e.exports=function(e){try{return{e:!1,v:e()}}catch(e){return{e:!0,v:e}}}},472:function(e,t,n){var r=n(49),i=n(39),o=n(469);e.exports=function(e,t){if(r(e),i(t)&&t.constructor===e)return t;var n=o.f(e);return(0,n.resolve)(t),n.promise}},473:function(e,t,n){var r=n(49),i=n(302),o=n(38)("species");e.exports=function(e,t){var n,a=r(e).constructor;return void 0===a||void 0==(n=r(a)[o])?t:i(n)}},474:function(e,t,n){var r,i,o,a=n(141),s=n(480),c=n(303),u=n(142),f=n(26),l=f.process,p=f.setImmediate,d=f.clearImmediate,h=f.MessageChannel,v=f.Dispatch,g=0,b={},m=function(){var e=+this;if(b.hasOwnProperty(e)){var t=b[e];delete b[e],t()}},y=function(e){m.call(e.data)};p&&d||(p=function(e){for(var t=[],n=1;arguments.length>n;)t.push(arguments[n++]);return b[++g]=function(){s("function"==typeof e?e:Function(e),t)},r(g),g},d=function(e){delete b[e]},"process"==n(140)(l)?r=function(e){l.nextTick(a(m,e,1))}:v&&v.now?r=function(e){v.now(a(m,e,1))}:h?(i=new h,o=i.port2,i.port1.onmessage=y,r=a(o.postMessage,o,1)):f.addEventListener&&"function"==typeof postMessage&&!f.importScripts?(r=function(e){f.postMessage(e+"","*")},f.addEventListener("message",y,!1)):r="onreadystatechange"in u("script")?function(e){c.appendChild(u("script")).onreadystatechange=function(){c.removeChild(this),m.call(e)}}:function(e){setTimeout(a(m,e,1),0)}),e.exports={set:p,clear:d}},476:function(e,t,n){e.exports={default:n(477),__esModule:!0}},477:function(e,t,n){n(305),n(306),n(307),n(489),n(490),n(491),e.exports=n(21).Promise},478:function(e,t){e.exports=function(e,t,n,r){if(!(e instanceof t)||void 0!==r&&r in e)throw TypeError(n+": incorrect invocation!");return e}},479:function(e,t,n){var r=n(141),i=n(482),o=n(481),a=n(49),s=n(304),c=n(488),u={},f={},t=e.exports=function(e,t,n,l,p){var d,h,v,g,b=p?function(){return e}:c(e),m=r(n,l,t?2:1),y=0;if("function"!=typeof b)throw TypeError(e+" is not iterable!");if(o(b)){for(d=s(e.length);d>y;y++)if((g=t?m(a(h=e[y])[0],h[1]):m(e[y]))===u||g===f)return g}else for(v=b.call(e);!(h=v.next()).done;)if((g=i(v,m,h.value,t))===u||g===f)return g};t.BREAK=u,t.RETURN=f},480:function(e,t){e.exports=function(e,t,n){var r=void 0===n;switch(t.length){case 0:return r?e():e.call(n);case 1:return r?e(t[0]):e.call(n,t[0]);case 2:return r?e(t[0],t[1]):e.call(n,t[0],t[1]);case 3:return r?e(t[0],t[1],t[2]):e.call(n,t[0],t[1],t[2]);case 4:return r?e(t[0],t[1],t[2],t[3]):e.call(n,t[0],t[1],t[2],t[3])}return e.apply(n,t)}},481:function(e,t,n){var r=n(80),i=n(38)("iterator"),o=Array.prototype;e.exports=function(e){return void 0!==e&&(r.Array===e||o[i]===e)}},482:function(e,t,n){var r=n(49);e.exports=function(e,t,n,i){try{return i?t(r(n)[0],n[1]):t(n)}catch(t){var o=e.return;throw void 0!==o&&r(o.call(e)),t}}},483:function(e,t,n){var r=n(38)("iterator"),i=!1;try{var o=[7][r]();o.return=function(){i=!0},Array.from(o,function(){throw 2})}catch(e){}e.exports=function(e,t){if(!t&&!i)return!1;var n=!1;try{var o=[7],a=o[r]();a.next=function(){return{done:n=!0}},o[r]=function(){return a},e(o)}catch(e){}return n}},484:function(e,t,n){var r=n(26),i=n(474).set,o=r.MutationObserver||r.WebKitMutationObserver,a=r.process,s=r.Promise,c="process"==n(140)(a);e.exports=function(){var e,t,n,u=function(){var r,i;for(c&&(r=a.domain)&&r.exit();e;){i=e.fn,e=e.next;try{i()}catch(r){throw e?n():t=void 0,r}}t=void 0,r&&r.enter()};if(c)n=function(){a.nextTick(u)};else if(!o||r.navigator&&r.navigator.standalone)if(s&&s.resolve){var f=s.resolve(void 0);n=function(){f.then(u)}}else n=function(){i.call(r,u)};else{var l=!0,p=document.createTextNode("");new o(u).observe(p,{characterData:!0}),n=function(){p.data=l=!l}}return function(r){var i={fn:r,next:void 0};t&&(t.next=i),e||(e=i,n()),t=i}}},485:function(e,t,n){var r=n(40);e.exports=function(e,t,n){for(var i in t)n&&e[i]?e[i]=t[i]:r(e,i,t[i]);return e}},486:function(e,t,n){"use strict";var r=n(26),i=n(21),o=n(34),a=n(27),s=n(38)("species");e.exports=function(e){var t="function"==typeof i[e]?i[e]:r[e];a&&t&&!t[s]&&o.f(t,s,{configurable:!0,get:function(){return this}})}},487:function(e,t,n){var r=n(26),i=r.navigator;e.exports=i&&i.userAgent||""},488:function(e,t,n){var r=n(470),i=n(38)("iterator"),o=n(80);e.exports=n(21).getIteratorMethod=function(e){if(void 0!=e)return e[i]||e["@@iterator"]||o[r(e)]}},489:function(e,t,n){"use strict";var r,i,o,a,s=n(56),c=n(26),u=n(141),f=n(470),l=n(33),p=n(39),d=n(302),h=n(478),v=n(479),g=n(473),b=n(474).set,m=n(484)(),y=n(469),w=n(471),_=n(487),k=n(472),S=c.TypeError,C=c.process,A=C&&C.versions,x=A&&A.v8||"",I=c.Promise,E="process"==f(C),P=function(){},O=i=y.f,T=!!function(){try{var e=I.resolve(1),t=(e.constructor={})[n(38)("species")]=function(e){e(P,P)};return(E||"function"==typeof PromiseRejectionEvent)&&e.then(P)instanceof t&&0!==x.indexOf("6.6")&&-1===_.indexOf("Chrome/66")}catch(e){}}(),N=function(e){var t;return!(!p(e)||"function"!=typeof(t=e.then))&&t},D=function(e,t){if(!e._n){e._n=!0;var n=e._c;m(function(){for(var r=e._v,i=1==e._s,o=0;n.length>o;)!function(t){var n,o,a,s=i?t.ok:t.fail,c=t.resolve,u=t.reject,f=t.domain;try{s?(i||(2==e._h&&R(e),e._h=1),!0===s?n=r:(f&&f.enter(),n=s(r),f&&(f.exit(),a=!0)),n===t.promise?u(S("Promise-chain cycle")):(o=N(n))?o.call(n,c,u):c(n)):u(r)}catch(e){f&&!a&&f.exit(),u(e)}}(n[o++]);e._c=[],e._n=!1,t&&!e._h&&j(e)})}},j=function(e){b.call(c,function(){var t,n,r,i=e._v,o=M(e);if(o&&(t=w(function(){E?C.emit("unhandledRejection",i,e):(n=c.onunhandledrejection)?n({promise:e,reason:i}):(r=c.console)&&r.error&&r.error("Unhandled promise rejection",i)}),e._h=E||M(e)?2:1),e._a=void 0,o&&t.e)throw t.v})},M=function(e){return 1!==e._h&&0===(e._a||e._c).length},R=function(e){b.call(c,function(){var t;E?C.emit("rejectionHandled",e):(t=c.onrejectionhandled)&&t({promise:e,reason:e._v})})},B=function(e){var t=this;t._d||(t._d=!0,t=t._w||t,t._v=e,t._s=2,t._a||(t._a=t._c.slice()),D(t,!0))},L=function(e){var t,n=this;if(!n._d){n._d=!0,n=n._w||n;try{if(n===e)throw S("Promise can't be resolved itself");(t=N(e))?m(function(){var r={_w:n,_d:!1};try{t.call(e,u(L,r,1),u(B,r,1))}catch(e){B.call(r,e)}}):(n._v=e,n._s=1,D(n,!1))}catch(e){B.call({_w:n,_d:!1},e)}}};T||(I=function(e){h(this,I,"Promise","_h"),d(e),r.call(this);try{e(u(L,this,1),u(B,this,1))}catch(e){B.call(this,e)}},r=function(e){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1},r.prototype=n(485)(I.prototype,{then:function(e,t){var n=O(g(this,I));return n.ok="function"!=typeof e||e,n.fail="function"==typeof t&&t,n.domain=E?C.domain:void 0,this._c.push(n),this._a&&this._a.push(n),this._s&&D(this,!1),n.promise},catch:function(e){return this.then(void 0,e)}}),o=function(){var e=new r;this.promise=e,this.resolve=u(L,e,1),this.reject=u(B,e,1)},y.f=O=function(e){return e===I||e===a?new o(e):i(e)}),l(l.G+l.W+l.F*!T,{Promise:I}),n(81)(I,"Promise"),n(486)("Promise"),a=n(21).Promise,l(l.S+l.F*!T,"Promise",{reject:function(e){var t=O(this);return(0,t.reject)(e),t.promise}}),l(l.S+l.F*(s||!T),"Promise",{resolve:function(e){return k(s&&this===a?I:this,e)}}),l(l.S+l.F*!(T&&n(483)(function(e){I.all(e).catch(P)})),"Promise",{all:function(e){var t=this,n=O(t),r=n.resolve,i=n.reject,o=w(function(){var n=[],o=0,a=1;v(e,!1,function(e){var s=o++,c=!1;n.push(void 0),a++,t.resolve(e).then(function(e){c||(c=!0,n[s]=e,--a||r(n))},i)}),--a||r(n)});return o.e&&i(o.v),n.promise},race:function(e){var t=this,n=O(t),r=n.reject,i=w(function(){v(e,!1,function(e){t.resolve(e).then(n.resolve,r)})});return i.e&&r(i.v),n.promise}})},490:function(e,t,n){"use strict";var r=n(33),i=n(21),o=n(26),a=n(473),s=n(472);r(r.P+r.R,"Promise",{finally:function(e){var t=a(this,i.Promise||o.Promise),n="function"==typeof e;return this.then(n?function(n){return s(t,e()).then(function(){return n})}:e,n?function(n){return s(t,e()).then(function(){throw n})}:e)}})},491:function(e,t,n){"use strict";var r=n(33),i=n(469),o=n(471);r(r.S,"Promise",{try:function(e){var t=i.f(this),n=o(e);return(n.e?t.reject:t.resolve)(n.v),t.promise}})},493:function(e,t,n){"use strict";function r(e,t){function n(){this.constructor=e}u(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}function i(e,t,n,r){function i(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||(n=Promise))(function(n,o){function a(e){try{c(r.next(e))}catch(e){o(e)}}function s(e){try{c(r.throw(e))}catch(e){o(e)}}function c(e){e.done?n(e.value):i(e.value).then(a,s)}c((r=r.apply(e,t||[])).next())})}function o(e,t){function n(e){return function(t){return r([e,t])}}function r(n){if(i)throw new TypeError("Generator is already executing.");for(;c;)try{if(i=1,o&&(a=2&n[0]?o.return:n[0]?o.throw||((a=o.return)&&a.call(o),0):o.next)&&!(a=a.call(o,n[1])).done)return a;switch(o=0,a&&(n=[2&n[0],a.value]),n[0]){case 0:case 1:a=n;break;case 4:return c.label++,{value:n[1],done:!1};case 5:c.label++,o=n[1],n=[0];continue;case 7:n=c.ops.pop(),c.trys.pop();continue;default:if(a=c.trys,!(a=a.length>0&&a[a.length-1])&&(6===n[0]||2===n[0])){c=0;continue}if(3===n[0]&&(!a||n[1]>a[0]&&n[1]<a[3])){c.label=n[1];break}if(6===n[0]&&c.label<a[1]){c.label=a[1],a=n;break}if(a&&c.label<a[2]){c.label=a[2],c.ops.push(n);break}a[2]&&c.ops.pop(),c.trys.pop();continue}n=t.call(e,c)}catch(e){n=[6,e],o=0}finally{i=a=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var i,o,a,s,c={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s}function a(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function s(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,i,o=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)a.push(r.value)}catch(e){i={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return a}function c(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(s(arguments[t]));return e}t.c=r,n.d(t,"b",function(){return f}),t.e=i,t.f=o,t.a=a,t.d=s,t.g=c;/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var u=function(e,t){return(u=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},f=function(){return f=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++){t=arguments[n];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e},f.apply(this,arguments)}},495:function(e,t,n){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function r(e){function t(e){delete v[e]}function r(e){if(e=e||g,!n.i(u.c)(v,e))throw d.create("no-app",{appName:e});return v[e]}function i(t,r){if(void 0===r&&(r={}),"object"!=typeof r||null===r){r={name:r}}var i=r;void 0===i.name&&(i.name=g);var o=i.name;if("string"!=typeof o||!o)throw d.create("bad-app-name",{appName:String(o)});if(n.i(u.c)(v,o))throw d.create("duplicate-app",{appName:o});var a=new e(t,i,_);return v[o]=a,a}function o(){return Object.keys(v).map(function(e){return v[e]})}function a(t){var i,o,a=t.name;if(y.has(a))return m.debug("There were multiple attempts to register component "+a+"."),"PUBLIC"===t.type?_[a]:null;if(y.set(a,t),"PUBLIC"===t.type){var s=function(e){if(void 0===e&&(e=r()),"function"!=typeof e[a])throw d.create("invalid-app-argument",{appName:a});return e[a]()};void 0!==t.serviceProps&&n.i(u.d)(s,t.serviceProps),_[a]=s,e.prototype[a]=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];return this._getService.bind(this,a).apply(this,t.multipleInstances?e:[])}}try{for(var f=n.i(c.a)(Object.keys(v)),l=f.next();!l.done;l=f.next()){var p=l.value;v[p]._addComponent(t)}}catch(e){i={error:e}}finally{try{l&&!l.done&&(o=f.return)&&o.call(f)}finally{if(i)throw i.error}}return"PUBLIC"===t.type?_[a]:null}function s(e,t,n){var r,i=null!==(r=b[e])&&void 0!==r?r:e;n&&(i+="-"+n);var o=i.match(/\s|\//),s=t.match(/\s|\//);if(o||s){var c=['Unable to register library "'+i+'" with version "'+t+'":'];return o&&c.push('library name "'+i+'" contains illegal characters (whitespace or "/")'),o&&s&&c.push("and"),s&&c.push('version name "'+t+'" contains illegal characters (whitespace or "/")'),void m.warn(c.join(" "))}a(new f.b(i+"-version",function(){return{library:i,version:t}},"VERSION"))}function p(e,t){if(null!==e&&"function"!=typeof e)throw d.create("invalid-log-argument",{appName:name});n.i(l.c)(e,t)}function h(e,t){return"serverAuth"===t?null:t}var v={},y=new Map,_={__esModule:!0,initializeApp:i,app:r,registerVersion:s,setLogLevel:l.b,onLog:p,apps:null,SDK_VERSION:w,INTERNAL:{registerComponent:a,removeApp:t,components:y,useAsService:h}};return _.default=_,Object.defineProperty(_,"apps",{get:o}),r.App=e,_}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function i(){function e(e){n.i(u.d)(t,e)}var t=r(y);return t.INTERNAL=n.i(c.b)(n.i(c.b)({},t.INTERNAL),{createFirebaseNamespace:i,extendNamespace:e,createSubscribe:u.e,ErrorFactory:u.a,deepExtend:u.d}),t}function o(e){var t=e.getComponent();return"VERSION"===(null===t||void 0===t?void 0:t.type)}var a,s,c=n(493),u=n(496),f=n(497),l=n(543),p=(a={},a["no-app"]="No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",a["bad-app-name"]="Illegal App name: '{$appName}",a["duplicate-app"]="Firebase App named '{$appName}' already exists",a["app-deleted"]="Firebase App named '{$appName}' already deleted",a["invalid-app-argument"]="firebase.{$appName}() takes either no argument or a Firebase App instance.",a["invalid-log-argument"]="First argument to `onLog` must be null or a function.",a),d=new u.a("app","Firebase",p),h="@firebase/app",v="0.6.14",g="[DEFAULT]",b=(s={},s[h]="fire-core",s["@firebase/analytics"]="fire-analytics",s["@firebase/auth"]="fire-auth",s["@firebase/database"]="fire-rtdb",s["@firebase/functions"]="fire-fn",s["@firebase/installations"]="fire-iid",s["@firebase/messaging"]="fire-fcm",s["@firebase/performance"]="fire-perf",s["@firebase/remote-config"]="fire-rc",s["@firebase/storage"]="fire-gcs",s["@firebase/firestore"]="fire-fst",s["fire-js"]="fire-js",s["firebase-wrapper"]="fire-js-all",s),m=new l.a("@firebase/app"),y=function(){function e(e,t,r){var i,o,a=this;this.firebase_=r,this.isDeleted_=!1,this.name_=t.name,this.automaticDataCollectionEnabled_=t.automaticDataCollectionEnabled||!1,this.options_=n.i(u.b)(e),this.container=new f.a(t.name),this._addComponent(new f.b("app",function(){return a},"PUBLIC"));try{for(var s=n.i(c.a)(this.firebase_.INTERNAL.components.values()),l=s.next();!l.done;l=s.next()){var p=l.value;this._addComponent(p)}}catch(e){i={error:e}}finally{try{l&&!l.done&&(o=s.return)&&o.call(s)}finally{if(i)throw i.error}}}return Object.defineProperty(e.prototype,"automaticDataCollectionEnabled",{get:function(){return this.checkDestroyed_(),this.automaticDataCollectionEnabled_},set:function(e){this.checkDestroyed_(),this.automaticDataCollectionEnabled_=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"name",{get:function(){return this.checkDestroyed_(),this.name_},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"options",{get:function(){return this.checkDestroyed_(),this.options_},enumerable:!1,configurable:!0}),e.prototype.delete=function(){var e=this;return new Promise(function(t){e.checkDestroyed_(),t()}).then(function(){return e.firebase_.INTERNAL.removeApp(e.name_),Promise.all(e.container.getProviders().map(function(e){return e.delete()}))}).then(function(){e.isDeleted_=!0})},e.prototype._getService=function(e,t){return void 0===t&&(t=g),this.checkDestroyed_(),this.container.getProvider(e).getImmediate({identifier:t})},e.prototype._removeServiceInstance=function(e,t){void 0===t&&(t=g),this.container.getProvider(e).clearInstance(t)},e.prototype._addComponent=function(e){try{this.container.addComponent(e)}catch(t){m.debug("Component "+e.name+" failed to register with FirebaseApp "+this.name,t)}},e.prototype._addOrOverwriteComponent=function(e){this.container.addOrOverwriteComponent(e)},e.prototype.toJSON=function(){return{name:this.name,automaticDataCollectionEnabled:this.automaticDataCollectionEnabled,options:this.options}},e.prototype.checkDestroyed_=function(){if(this.isDeleted_)throw d.create("app-deleted",{appName:this.name_})},e}();y.prototype.name&&y.prototype.options||y.prototype.delete||console.log("dc");var w="8.2.5",_=i(),k=function(){function e(e){this.container=e}return e.prototype.getPlatformInfoString=function(){return this.container.getProviders().map(function(e){if(o(e)){var t=e.getImmediate();return t.library+"/"+t.version}return null}).filter(function(e){return e}).join(" ")},e}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
if(n.i(u.f)()&&void 0!==self.firebase){m.warn("\n    Warning: Firebase is already defined in the global scope. Please make sure\n    Firebase library is only loaded once.\n  ");var S=self.firebase.SDK_VERSION;S&&S.indexOf("LITE")>=0&&m.warn("\n    Warning: You are trying to load Firebase while using Firebase Performance standalone script.\n    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.\n    ")}var C=_.initializeApp;_.initializeApp=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return n.i(u.g)()&&m.warn('\n      Warning: This is a browser-targeted Firebase bundle but it appears it is being\n      run in a Node environment.  If running in a Node environment, make sure you\n      are using the bundle specified by the "main" field in package.json.\n      \n      If you are using Webpack, you can specify "main" as the first item in\n      "resolve.mainFields":\n      https://webpack.js.org/configuration/resolve/#resolvemainfields\n      \n      If using Rollup, use the @rollup/plugin-node-resolve plugin and specify "main"\n      as the first item in "mainFields", e.g. [\'main\', \'module\'].\n      https://github.com/rollup/@rollup/plugin-node-resolve\n      '),C.apply(void 0,e)};var A=_;!/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e,t){e.INTERNAL.registerComponent(new f.b("platform-logger",function(e){return new k(e)},"PRIVATE")),e.registerVersion(h,v,t),e.registerVersion("fire-js","")}(A),t.a=A},496:function(e,t,n){"use strict";(function(e){/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function r(e){return i(void 0,e)}function i(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:var n=t;return new Date(n.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(var r in t)t.hasOwnProperty(r)&&o(r)&&(e[r]=i(e[r],t[r]));return e}function o(e){return"__proto__"!==e}function a(){try{return"[object process]"===Object.prototype.toString.call(e.process)}catch(e){return!1}}function s(){return"object"==typeof self&&self.self===self}function c(e,t){return e.replace(w,function(e,n){var r=t[n];return null!=r?String(r):"<"+n+"?>"})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function u(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function f(e,t){var n=new _(e,t);return n.subscribe.bind(n)}function l(e,t){if("object"!=typeof e||null===e)return!1;for(var n=0,r=t;n<r.length;n++){var i=r[n];if(i in e&&"function"==typeof e[i])return!0}return!1}function p(){}n.d(t,"h",function(){return g}),n.d(t,"a",function(){return y}),n.d(t,"i",function(){return m}),n.d(t,"c",function(){return u}),n.d(t,"e",function(){return f}),n.d(t,"b",function(){return r}),n.d(t,"d",function(){return i}),n.d(t,"f",function(){return s}),n.d(t,"g",function(){return a});var d=n(493),h=function(e){for(var t=[],n=0,r=0;r<e.length;r++){var i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296==(64512&i)&&r+1<e.length&&56320==(64512&e.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t},v=function(e){for(var t=[],n=0,r=0;n<e.length;){var i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){var o=e[n++];t[r++]=String.fromCharCode((31&i)<<6|63&o)}else if(i>239&&i<365){var o=e[n++],a=e[n++],s=e[n++],c=((7&i)<<18|(63&o)<<12|(63&a)<<6|63&s)-65536;t[r++]=String.fromCharCode(55296+(c>>10)),t[r++]=String.fromCharCode(56320+(1023&c))}else{var o=e[n++],a=e[n++];t[r++]=String.fromCharCode((15&i)<<12|(63&o)<<6|63&a)}}return t.join("")},g=function(){function e(){var e=this;this.reject=function(){},this.resolve=function(){},this.promise=new Promise(function(t,n){e.resolve=t,e.reject=n})}return e.prototype.wrapCallback=function(e){var t=this;return function(n,r){n?t.reject(n):t.resolve(r),"function"==typeof e&&(t.promise.catch(function(){}),1===e.length?e(n):e(n,r))}},e}(),b="FirebaseError",m=function(e){function t(n,r,i){var o=e.call(this,r)||this;return o.code=n,o.customData=i,o.name=b,Object.setPrototypeOf(o,t.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,y.prototype.create),o}return n.i(d.c)(t,e),t}(Error),y=function(){function e(e,t,n){this.service=e,this.serviceName=t,this.errors=n}return e.prototype.create=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var r=t[0]||{},i=this.service+"/"+e,o=this.errors[e],a=o?c(o,r):"Error",s=this.serviceName+": "+a+" ("+i+").";return new m(i,s,r)},e}(),w=/\{\$([^}]+)}/g,_=(function(){function e(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=64,this.pad_[0]=128;for(var e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}e.prototype.reset=function(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0},e.prototype.compress_=function(e,t){t||(t=0);var n=this.W_;if("string"==typeof e)for(var r=0;r<16;r++)n[r]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(var r=0;r<16;r++)n[r]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(var r=16;r<80;r++){var i=n[r-3]^n[r-8]^n[r-14]^n[r-16];n[r]=4294967295&(i<<1|i>>>31)}for(var o,a,s=this.chain_[0],c=this.chain_[1],u=this.chain_[2],f=this.chain_[3],l=this.chain_[4],r=0;r<80;r++){r<40?r<20?(o=f^c&(u^f),a=1518500249):(o=c^u^f,a=1859775393):r<60?(o=c&u|f&(c|u),a=2400959708):(o=c^u^f,a=3395469782);var i=(s<<5|s>>>27)+o+l+a+n[r]&4294967295;l=f,f=u,u=4294967295&(c<<30|c>>>2),c=s,s=i}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+c&4294967295,this.chain_[2]=this.chain_[2]+u&4294967295,this.chain_[3]=this.chain_[3]+f&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295},e.prototype.update=function(e,t){if(null!=e){void 0===t&&(t=e.length);for(var n=t-this.blockSize,r=0,i=this.buf_,o=this.inbuf_;r<t;){if(0===o)for(;r<=n;)this.compress_(e,r),r+=this.blockSize;if("string"==typeof e){for(;r<t;)if(i[o]=e.charCodeAt(r),++o,++r,o===this.blockSize){this.compress_(i),o=0;break}}else for(;r<t;)if(i[o]=e[r],++o,++r,o===this.blockSize){this.compress_(i),o=0;break}}this.inbuf_=o,this.total_+=t}},e.prototype.digest=function(){var e=[],t=8*this.total_;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(var n=this.blockSize-1;n>=56;n--)this.buf_[n]=255&t,t/=256;this.compress_(this.buf_);for(var r=0,n=0;n<5;n++)for(var i=24;i>=0;i-=8)e[r]=this.chain_[n]>>i&255,++r;return e}}(),function(){function e(e,t){var n=this;this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(function(){e(n)}).catch(function(e){n.error(e)})}return e.prototype.next=function(e){this.forEachObserver(function(t){t.next(e)})},e.prototype.error=function(e){this.forEachObserver(function(t){t.error(e)}),this.close(e)},e.prototype.complete=function(){this.forEachObserver(function(e){e.complete()}),this.close()},e.prototype.subscribe=function(e,t,n){var r,i=this;if(void 0===e&&void 0===t&&void 0===n)throw new Error("Missing Observer.");r=l(e,["next","error","complete"])?e:{next:e,error:t,complete:n},void 0===r.next&&(r.next=p),void 0===r.error&&(r.error=p),void 0===r.complete&&(r.complete=p);var o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(function(){try{i.finalError?r.error(i.finalError):r.complete()}catch(e){}}),this.observers.push(r),o},e.prototype.unsubscribeOne=function(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))},e.prototype.forEachObserver=function(e){if(!this.finalized)for(var t=0;t<this.observers.length;t++)this.sendOne(t,e)},e.prototype.sendOne=function(e,t){var n=this;this.task.then(function(){if(void 0!==n.observers&&void 0!==n.observers[e])try{t(n.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}})},e.prototype.close=function(e){var t=this;this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(function(){t.observers=void 0,t.onNoObservers=void 0}))},e}())}).call(t,n(28))},497:function(e,t,n){"use strict";function r(e){return e===c?void 0:e}function i(e){return"EAGER"===e.instantiationMode}n.d(t,"b",function(){return s}),n.d(t,"a",function(){return f});var o=n(493),a=n(496),s=function(){function e(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY"}return e.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},e.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},e.prototype.setServiceProps=function(e){return this.serviceProps=e,this},e}(),c="[DEFAULT]",u=function(){function e(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map}return e.prototype.get=function(e){void 0===e&&(e=c);var t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){var n=new a.h;this.instancesDeferred.set(t,n);try{var r=this.getOrInitializeService(t);r&&n.resolve(r)}catch(e){}}return this.instancesDeferred.get(t).promise},e.prototype.getImmediate=function(e){var t=n.i(o.b)({identifier:c,optional:!1},e),r=t.identifier,i=t.optional,a=this.normalizeInstanceIdentifier(r);try{var s=this.getOrInitializeService(a);if(!s){if(i)return null;throw Error("Service "+this.name+" is not available")}return s}catch(e){if(i)return null;throw e}},e.prototype.getComponent=function(){return this.component},e.prototype.setComponent=function(e){var t,r;if(e.name!==this.name)throw Error("Mismatching Component "+e.name+" for Provider "+this.name+".");if(this.component)throw Error("Component for "+this.name+" has already been provided");if(this.component=e,i(e))try{this.getOrInitializeService(c)}catch(e){}try{for(var a=n.i(o.a)(this.instancesDeferred.entries()),s=a.next();!s.done;s=a.next()){var u=n.i(o.d)(s.value,2),f=u[0],l=u[1],p=this.normalizeInstanceIdentifier(f);try{var d=this.getOrInitializeService(p);l.resolve(d)}catch(e){}}}catch(e){t={error:e}}finally{try{s&&!s.done&&(r=a.return)&&r.call(a)}finally{if(t)throw t.error}}},e.prototype.clearInstance=function(e){void 0===e&&(e=c),this.instancesDeferred.delete(e),this.instances.delete(e)},e.prototype.delete=function(){return n.i(o.e)(this,void 0,void 0,function(){var e;return n.i(o.f)(this,function(t){switch(t.label){case 0:return e=Array.from(this.instances.values()),[4,Promise.all(n.i(o.g)(e.filter(function(e){return"INTERNAL"in e}).map(function(e){return e.INTERNAL.delete()}),e.filter(function(e){return"_delete"in e}).map(function(e){return e._delete()})))];case 1:return t.sent(),[2]}})})},e.prototype.isComponentSet=function(){return null!=this.component},e.prototype.getOrInitializeService=function(e){var t=this.instances.get(e);return!t&&this.component&&(t=this.component.instanceFactory(this.container,r(e)),this.instances.set(e,t)),t||null},e.prototype.normalizeInstanceIdentifier=function(e){return this.component?this.component.multipleInstances?e:c:e},e}(),f=function(){function e(e){this.name=e,this.providers=new Map}return e.prototype.addComponent=function(e){var t=this.getProvider(e.name);if(t.isComponentSet())throw new Error("Component "+e.name+" has already been registered with "+this.name);t.setComponent(e)},e.prototype.addOrOverwriteComponent=function(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)},e.prototype.getProvider=function(e){if(this.providers.has(e))return this.providers.get(e);var t=new u(e,this);return this.providers.set(e,t),t},e.prototype.getProviders=function(){return Array.from(this.providers.values())},e}()},524:function(e,t,n){e.exports=n.p+"static/img/meatthesea_logo.dbf377a.png"},539:function(e,t,n){!function(e,n){n(t)}(0,function(e){"use strict";function t(e){return Array.prototype.slice.call(e)}function n(e){return new Promise(function(t,n){e.onsuccess=function(){t(e.result)},e.onerror=function(){n(e.error)}})}function r(e,t,r){var i,o=new Promise(function(o,a){i=e[t].apply(e,r),n(i).then(o,a)});return o.request=i,o}function i(e,t,n){var i=r(e,t,n);return i.then(function(e){if(e)return new f(e,i.request)})}function o(e,t,n){n.forEach(function(n){Object.defineProperty(e.prototype,n,{get:function(){return this[t][n]},set:function(e){this[t][n]=e}})})}function a(e,t,n,i){i.forEach(function(i){i in n.prototype&&(e.prototype[i]=function(){return r(this[t],i,arguments)})})}function s(e,t,n,r){r.forEach(function(r){r in n.prototype&&(e.prototype[r]=function(){return this[t][r].apply(this[t],arguments)})})}function c(e,t,n,r){r.forEach(function(r){r in n.prototype&&(e.prototype[r]=function(){return i(this[t],r,arguments)})})}function u(e){this._index=e}function f(e,t){this._cursor=e,this._request=t}function l(e){this._store=e}function p(e){this._tx=e,this.complete=new Promise(function(t,n){e.oncomplete=function(){t()},e.onerror=function(){n(e.error)},e.onabort=function(){n(e.error)}})}function d(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new p(n)}function h(e){this._db=e}function v(e,t,n){var i=r(indexedDB,"open",[e,t]),o=i.request;return o&&(o.onupgradeneeded=function(e){n&&n(new d(o.result,e.oldVersion,o.transaction))}),i.then(function(e){return new h(e)})}function g(e){return r(indexedDB,"deleteDatabase",[e])}o(u,"_index",["name","keyPath","multiEntry","unique"]),a(u,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),c(u,"_index",IDBIndex,["openCursor","openKeyCursor"]),o(f,"_cursor",["direction","key","primaryKey","value"]),a(f,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(e){e in IDBCursor.prototype&&(f.prototype[e]=function(){var t=this,r=arguments;return Promise.resolve().then(function(){return t._cursor[e].apply(t._cursor,r),n(t._request).then(function(e){if(e)return new f(e,t._request)})})})}),l.prototype.createIndex=function(){return new u(this._store.createIndex.apply(this._store,arguments))},l.prototype.index=function(){return new u(this._store.index.apply(this._store,arguments))},o(l,"_store",["name","keyPath","indexNames","autoIncrement"]),a(l,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),c(l,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),s(l,"_store",IDBObjectStore,["deleteIndex"]),p.prototype.objectStore=function(){return new l(this._tx.objectStore.apply(this._tx,arguments))},o(p,"_tx",["objectStoreNames","mode"]),s(p,"_tx",IDBTransaction,["abort"]),d.prototype.createObjectStore=function(){return new l(this._db.createObjectStore.apply(this._db,arguments))},o(d,"_db",["name","version","objectStoreNames"]),s(d,"_db",IDBDatabase,["deleteObjectStore","close"]),h.prototype.transaction=function(){return new p(this._db.transaction.apply(this._db,arguments))},o(h,"_db",["name","version","objectStoreNames"]),s(h,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(e){[l,u].forEach(function(n){e in n.prototype&&(n.prototype[e.replace("open","iterate")]=function(){var n=t(arguments),r=n[n.length-1],i=this._store||this._index,o=i[e].apply(i,n.slice(0,-1));o.onsuccess=function(){r(o.result)}})})}),[u,l].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,t){var n=this,r=[];return new Promise(function(i){n.iterateCursor(e,function(e){return e?(r.push(e.value),void 0!==t&&r.length==t?void i(r):void e.continue()):void i(r)})})})}),e.openDb=v,e.deleteDb=g,Object.defineProperty(e,"__esModule",{value:!0})})},542:function(e,t,n){"use strict";function r(e){return e instanceof se.i&&e.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function i(e){var t=e.projectId;return he+"/projects/"+t+"/installations"}function o(e){return{token:e.token,requestStatus:2,expiresIn:f(e.expiresIn),creationTime:Date.now()}}function a(e,t){return n.i(ae.e)(this,void 0,void 0,function(){var r,i;return n.i(ae.f)(this,function(n){switch(n.label){case 0:return[4,t.json()];case 1:return r=n.sent(),i=r.error,[2,be.create("request-failed",{requestName:e,serverCode:i.code,serverMessage:i.message,serverStatus:i.status})]}})})}function s(e){var t=e.apiKey;return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function c(e,t){var n=t.refreshToken,r=s(e);return r.append("Authorization",l(n)),r}function u(e){return n.i(ae.e)(this,void 0,void 0,function(){var t;return n.i(ae.f)(this,function(n){switch(n.label){case 0:return[4,e()];case 1:return t=n.sent(),t.status>=500&&t.status<600?[2,e()]:[2,t]}})})}function f(e){return Number(e.replace("s","000"))}function l(e){return de+" "+e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function p(e,t){var r=t.fid;return n.i(ae.e)(this,void 0,void 0,function(){var t,c,f,l,p,d,h;return n.i(ae.f)(this,function(n){switch(n.label){case 0:return t=i(e),c=s(e),f={fid:r,authVersion:de,appId:e.appId,sdkVersion:pe},l={method:"POST",headers:c,body:JSON.stringify(f)},[4,u(function(){return fetch(t,l)})];case 1:return p=n.sent(),p.ok?[4,p.json()]:[3,3];case 2:return d=n.sent(),h={fid:d.fid||r,registrationStatus:2,refreshToken:d.refreshToken,authToken:o(d.authToken)},[2,h];case 3:return[4,a("Create Installation",p)];case 4:throw n.sent()}})})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function d(e){return new Promise(function(t){setTimeout(t,e)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function h(e){return btoa(String.fromCharCode.apply(String,n.i(ae.g)(e))).replace(/\+/g,"-").replace(/\//g,"_")}function v(){try{var e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;var t=g(e);return me.test(t)?t:ye}catch(e){return ye}}function g(e){return h(e).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function b(e){return e.appName+"!"+e.appId}function m(e,t){var n=b(e);_(n,t),k(n,t)}function y(e,t){S();var n=b(e),r=we.get(n);r||(r=new Set,we.set(n,r)),r.add(t)}function w(e,t){var n=b(e),r=we.get(n);r&&(r.delete(t),0===r.size&&we.delete(n),C())}function _(e,t){var r,i,o=we.get(e);if(o)try{for(var a=n.i(ae.a)(o),s=a.next();!s.done;s=a.next()){(0,s.value)(t)}}catch(e){r={error:e}}finally{try{s&&!s.done&&(i=a.return)&&i.call(a)}finally{if(r)throw r.error}}}function k(e,t){var n=S();n&&n.postMessage({key:e,fid:t}),C()}function S(){return!_e&&"BroadcastChannel"in self&&(_e=new BroadcastChannel("[Firebase] FID Change"),_e.onmessage=function(e){_(e.data.key,e.data.fid)}),_e}function C(){0===we.size&&_e&&(_e.close(),_e=null)}function A(){return Ae||(Ae=n.i(ce.openDb)(ke,Se,function(e){switch(e.oldVersion){case 0:e.createObjectStore(Ce)}})),Ae}function x(e,t){return n.i(ae.e)(this,void 0,void 0,function(){var r,i,o,a,s;return n.i(ae.f)(this,function(n){switch(n.label){case 0:return r=b(e),[4,A()];case 1:return i=n.sent(),o=i.transaction(Ce,"readwrite"),a=o.objectStore(Ce),[4,a.get(r)];case 2:return s=n.sent(),[4,a.put(t,r)];case 3:return n.sent(),[4,o.complete];case 4:return n.sent(),s&&s.fid===t.fid||m(e,t.fid),[2,t]}})})}function I(e){return n.i(ae.e)(this,void 0,void 0,function(){var t,r,i;return n.i(ae.f)(this,function(n){switch(n.label){case 0:return t=b(e),[4,A()];case 1:return r=n.sent(),i=r.transaction(Ce,"readwrite"),[4,i.objectStore(Ce).delete(t)];case 2:return n.sent(),[4,i.complete];case 3:return n.sent(),[2]}})})}function E(e,t){return n.i(ae.e)(this,void 0,void 0,function(){var r,i,o,a,s,c;return n.i(ae.f)(this,function(n){switch(n.label){case 0:return r=b(e),[4,A()];case 1:return i=n.sent(),o=i.transaction(Ce,"readwrite"),a=o.objectStore(Ce),[4,a.get(r)];case 2:return s=n.sent(),c=t(s),void 0!==c?[3,4]:[4,a.delete(r)];case 3:return n.sent(),[3,6];case 4:return[4,a.put(c,r)];case 5:n.sent(),n.label=6;case 6:return[4,o.complete];case 7:return n.sent(),!c||s&&s.fid===c.fid||m(e,c.fid),[2,c]}})})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function P(e){return n.i(ae.e)(this,void 0,void 0,function(){var t,r,i;return n.i(ae.f)(this,function(n){switch(n.label){case 0:return[4,E(e,function(n){var r=O(n),i=T(e,r);return t=i.registrationPromise,i.installationEntry})];case 1:return r=n.sent(),r.fid!==ye?[3,3]:(i={},[4,t]);case 2:return[2,(i.installationEntry=n.sent(),i)];case 3:return[2,{installationEntry:r,registrationPromise:t}]}})})}function O(e){return M(e||{fid:v(),registrationStatus:0})}function T(e,t){if(0===t.registrationStatus){if(!navigator.onLine){return{installationEntry:t,registrationPromise:Promise.reject(be.create("app-offline"))}}var n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()};return{installationEntry:n,registrationPromise:N(e,n)}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:D(e)}:{installationEntry:t}}function N(e,t){return n.i(ae.e)(this,void 0,void 0,function(){var i,o;return n.i(ae.f)(this,function(n){switch(n.label){case 0:return n.trys.push([0,2,,7]),[4,p(e,t)];case 1:return i=n.sent(),[2,x(e,i)];case 2:return o=n.sent(),r(o)&&409===o.customData.serverCode?[4,I(e)]:[3,4];case 3:return n.sent(),[3,6];case 4:return[4,x(e,{fid:t.fid,registrationStatus:0})];case 5:n.sent(),n.label=6;case 6:throw o;case 7:return[2]}})})}function D(e){return n.i(ae.e)(this,void 0,void 0,function(){var t,r,i,o;return n.i(ae.f)(this,function(n){switch(n.label){case 0:return[4,j(e)];case 1:t=n.sent(),n.label=2;case 2:return 1!==t.registrationStatus?[3,5]:[4,d(100)];case 3:return n.sent(),[4,j(e)];case 4:return t=n.sent(),[3,2];case 5:return 0!==t.registrationStatus?[3,7]:[4,P(e)];case 6:return r=n.sent(),i=r.installationEntry,o=r.registrationPromise,o?[2,o]:[2,i];case 7:return[2,t]}})})}function j(e){return E(e,function(e){if(!e)throw be.create("installation-not-found");return M(e)})}function M(e){return R(e)?{fid:e.fid,registrationStatus:0}:e}function R(e){return 1===e.registrationStatus&&e.registrationTime+le<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function B(e,t){var r=e.appConfig,i=e.platformLoggerProvider;return n.i(ae.e)(this,void 0,void 0,function(){var e,s,f,l,p,d,h,v;return n.i(ae.f)(this,function(n){switch(n.label){case 0:return e=L(r,t),s=c(r,t),f=i.getImmediate({optional:!0}),f&&s.append("x-firebase-client",f.getPlatformInfoString()),l={installation:{sdkVersion:pe}},p={method:"POST",headers:s,body:JSON.stringify(l)},[4,u(function(){return fetch(e,p)})];case 1:return d=n.sent(),d.ok?[4,d.json()]:[3,3];case 2:return h=n.sent(),v=o(h),[2,v];case 3:return[4,a("Generate Auth Token",d)];case 4:throw n.sent()}})})}function L(e,t){var n=t.fid;return i(e)+"/"+n+"/authTokens:generate"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function F(e,t){return void 0===t&&(t=!1),n.i(ae.e)(this,void 0,void 0,function(){var r,i,o,a;return n.i(ae.f)(this,function(n){switch(n.label){case 0:return[4,E(e.appConfig,function(n){if(!U(n))throw be.create("not-registered");var i=n.authToken;if(!t&&V(i))return n;if(1===i.requestStatus)return r=K(e,t),n;if(!navigator.onLine)throw be.create("app-offline");var o=q(n);return r=W(e,o),o})];case 1:return i=n.sent(),r?[4,r]:[3,3];case 2:return a=n.sent(),[3,4];case 3:a=i.authToken,n.label=4;case 4:return o=a,[2,o]}})})}function K(e,t){return n.i(ae.e)(this,void 0,void 0,function(){var r,i;return n.i(ae.f)(this,function(n){switch(n.label){case 0:return[4,H(e.appConfig)];case 1:r=n.sent(),n.label=2;case 2:return 1!==r.authToken.requestStatus?[3,5]:[4,d(100)];case 3:return n.sent(),[4,H(e.appConfig)];case 4:return r=n.sent(),[3,2];case 5:return i=r.authToken,0===i.requestStatus?[2,F(e,t)]:[2,i]}})})}function H(e){return E(e,function(e){if(!U(e))throw be.create("not-registered");return $(e.authToken)?n.i(ae.b)(n.i(ae.b)({},e),{authToken:{requestStatus:0}}):e})}function W(e,t){return n.i(ae.e)(this,void 0,void 0,function(){var i,o,a,o;return n.i(ae.f)(this,function(s){switch(s.label){case 0:return s.trys.push([0,3,,8]),[4,B(e,t)];case 1:return i=s.sent(),o=n.i(ae.b)(n.i(ae.b)({},t),{authToken:i}),[4,x(e.appConfig,o)];case 2:return s.sent(),[2,i];case 3:return a=s.sent(),!r(a)||401!==a.customData.serverCode&&404!==a.customData.serverCode?[3,5]:[4,I(e.appConfig)];case 4:return s.sent(),[3,7];case 5:return o=n.i(ae.b)(n.i(ae.b)({},t),{authToken:{requestStatus:0}}),[4,x(e.appConfig,o)];case 6:s.sent(),s.label=7;case 7:throw a;case 8:return[2]}})})}function U(e){return void 0!==e&&2===e.registrationStatus}function V(e){return 2===e.requestStatus&&!z(e)}function z(e){var t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+ve}function q(e){var t={requestStatus:1,requestTime:Date.now()};return n.i(ae.b)(n.i(ae.b)({},e),{authToken:t})}function $(e){return 1===e.requestStatus&&e.requestTime+le<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function G(e){return n.i(ae.e)(this,void 0,void 0,function(){var t,r,i;return n.i(ae.f)(this,function(n){switch(n.label){case 0:return[4,P(e.appConfig)];case 1:return t=n.sent(),r=t.installationEntry,i=t.registrationPromise,i?i.catch(console.error):F(e).catch(console.error),[2,r.fid]}})})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Y(e,t){return void 0===t&&(t=!1),n.i(ae.e)(this,void 0,void 0,function(){var r;return n.i(ae.f)(this,function(n){switch(n.label){case 0:return[4,J(e.appConfig)];case 1:return n.sent(),[4,F(e,t)];case 2:return r=n.sent(),[2,r.token]}})})}function J(e){return n.i(ae.e)(this,void 0,void 0,function(){var t;return n.i(ae.f)(this,function(n){switch(n.label){case 0:return[4,P(e)];case 1:return t=n.sent().registrationPromise,t?[4,t]:[3,3];case 2:n.sent(),n.label=3;case 3:return[2]}})})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Q(e,t){return n.i(ae.e)(this,void 0,void 0,function(){var r,i,o,s;return n.i(ae.f)(this,function(n){switch(n.label){case 0:return r=Z(e,t),i=c(e,t),o={method:"DELETE",headers:i},[4,u(function(){return fetch(r,o)})];case 1:return s=n.sent(),s.ok?[3,3]:[4,a("Delete Installation",s)];case 2:throw n.sent();case 3:return[2]}})})}function Z(e,t){var n=t.fid;return i(e)+"/"+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function X(e){return n.i(ae.e)(this,void 0,void 0,function(){var t,r;return n.i(ae.f)(this,function(n){switch(n.label){case 0:return t=e.appConfig,[4,E(t,function(e){if(!e||0!==e.registrationStatus)return e})];case 1:if(!(r=n.sent()))return[3,6];if(1!==r.registrationStatus)return[3,2];throw be.create("delete-pending-registration");case 2:if(2!==r.registrationStatus)return[3,6];if(navigator.onLine)return[3,3];throw be.create("app-offline");case 3:return[4,Q(t,r)];case 4:return n.sent(),[4,I(t)];case 5:n.sent(),n.label=6;case 6:return[2]}})})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ee(e,t){var n=e.appConfig;return y(n,t),function(){w(n,t)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function te(e){var t,r;if(!e||!e.options)throw ne("App Configuration");if(!e.name)throw ne("App Name");var i=["projectId","apiKey","appId"];try{for(var o=n.i(ae.a)(i),a=o.next();!a.done;a=o.next()){var s=a.value;if(!e.options[s])throw ne(s)}}catch(e){t={error:e}}finally{try{a&&!a.done&&(r=o.return)&&r.call(o)}finally{if(t)throw t.error}}return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function ne(e){return be.create("missing-app-config-values",{valueName:e})}var re,ie=n(495),oe=n(497),ae=n(493),se=n(496),ce=n(539),ue=(n.n(ce),"@firebase/installations"),fe="0.4.19",le=1e4,pe="w:"+fe,de="FIS_v2",he="https://firebaseinstallations.googleapis.com/v1",ve=36e5,ge=(re={},re["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',re["not-registered"]="Firebase Installation is not registered.",re["installation-not-found"]="Firebase Installation not found.",re["request-failed"]='{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',re["app-offline"]="Could not process request. Application offline.",re["delete-pending-registration"]="Can't delete installation while there is a pending registration request.",re),be=new se.a("installations","Installations",ge),me=/^[cdef][\w-]{21}$/,ye="",we=new Map,_e=null,ke="firebase-installations-database",Se=1,Ce="firebase-installations-store",Ae=null;!/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e){e.INTERNAL.registerComponent(new oe.b("installations",function(e){var t=e.getProvider("app").getImmediate(),n=te(t),r=e.getProvider("platform-logger"),i={appConfig:n,platformLoggerProvider:r};return{app:t,getId:function(){return G(i)},getToken:function(e){return Y(i,e)},delete:function(){return X(i)},onIdChange:function(e){return ee(i,e)}}},"PUBLIC")),e.registerVersion(ue,fe)}(ie.a)},543:function(e,t,n){"use strict";/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
function r(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;for(var r=Array(e),i=0,t=0;t<n;t++)for(var o=arguments[t],a=0,s=o.length;a<s;a++,i++)r[i]=o[a];return r}function i(e){c.forEach(function(t){t.setLogLevel(e)})}function o(e,t){for(var n=0,r=c;n<r.length;n++){var i=r[n];!function(n){var r=null;t&&t.level&&(r=u[t.level]),n.userLogHandler=null===e?null:function(t,n){for(var i=[],o=2;o<arguments.length;o++)i[o-2]=arguments[o];var a=i.map(function(e){if(null==e)return null;if("string"==typeof e)return e;if("number"==typeof e||"boolean"==typeof e)return e.toString();if(e instanceof Error)return e.message;try{return JSON.stringify(e)}catch(e){return null}}).filter(function(e){return e}).join(" ");n>=(null!==r&&void 0!==r?r:t.logLevel)&&e({level:s[n].toLowerCase(),message:a,args:i,type:t.name})}}(i)}}n.d(t,"a",function(){return d}),n.d(t,"b",function(){return i}),n.d(t,"c",function(){return o});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var a,s,c=[];!function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"}(s||(s={}));var u={debug:s.DEBUG,verbose:s.VERBOSE,info:s.INFO,warn:s.WARN,error:s.ERROR,silent:s.SILENT},f=s.INFO,l=(a={},a[s.DEBUG]="log",a[s.VERBOSE]="log",a[s.INFO]="info",a[s.WARN]="warn",a[s.ERROR]="error",a),p=function(e,t){for(var n=[],i=2;i<arguments.length;i++)n[i-2]=arguments[i];if(!(t<e.logLevel)){var o=(new Date).toISOString(),a=l[t];if(!a)throw new Error("Attempted to log a message with an invalid logType (value: "+t+")");console[a].apply(console,r(["["+o+"]  "+e.name+":"],n))}},d=function(){function e(e){this.name=e,this._logLevel=f,this._logHandler=p,this._userLogHandler=null,c.push(this)}return Object.defineProperty(e.prototype,"logLevel",{get:function(){return this._logLevel},set:function(e){if(!(e in s))throw new TypeError('Invalid value "'+e+'" assigned to `logLevel`');this._logLevel=e},enumerable:!1,configurable:!0}),e.prototype.setLogLevel=function(e){this._logLevel="string"==typeof e?u[e]:e},Object.defineProperty(e.prototype,"logHandler",{get:function(){return this._logHandler},set:function(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"userLogHandler",{get:function(){return this._userLogHandler},set:function(e){this._userLogHandler=e},enumerable:!1,configurable:!0}),e.prototype.debug=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,r([this,s.DEBUG],e)),this._logHandler.apply(this,r([this,s.DEBUG],e))},e.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,r([this,s.VERBOSE],e)),this._logHandler.apply(this,r([this,s.VERBOSE],e))},e.prototype.info=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,r([this,s.INFO],e)),this._logHandler.apply(this,r([this,s.INFO],e))},e.prototype.warn=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,r([this,s.WARN],e)),this._logHandler.apply(this,r([this,s.WARN],e))},e.prototype.error=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._userLogHandler&&this._userLogHandler.apply(this,r([this,s.ERROR],e)),this._logHandler.apply(this,r([this,s.ERROR],e))},e}()},544:function(e,t,n){"use strict";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function r(e){var t=new Uint8Array(e);return btoa(String.fromCharCode.apply(String,n.i(J.g)(t))).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function i(e){for(var t="=".repeat((4-e.length%4)%4),n=(e+t).replace(/\-/g,"+").replace(/_/g,"/"),r=atob(n),i=new Uint8Array(r.length),o=0;o<r.length;++o)i[o]=r.charCodeAt(o);return i}function o(e){return n.i(J.e)(this,void 0,void 0,function(){var t,i,o,s,c=this;return n.i(J.f)(this,function(u){switch(u.label){case 0:return"databases"in indexedDB?[4,indexedDB.databases()]:[3,2];case 1:if(t=u.sent(),i=t.map(function(e){return e.name}),!i.includes(oe))return[2,null];u.label=2;case 2:return o=null,[4,n.i(Q.openDb)(oe,ae,function(t){return n.i(J.e)(c,void 0,void 0,function(){var i,a,s,s,s,c;return n.i(J.f)(this,function(n){switch(n.label){case 0:return t.oldVersion<2?[2]:t.objectStoreNames.contains(se)?(i=t.transaction.objectStore(se),[4,i.index("fcmSenderId").get(e)]):[2];case 1:return a=n.sent(),[4,i.clear()];case 2:if(n.sent(),!a)return[2];if(2===t.oldVersion){if(s=a,!s.auth||!s.p256dh||!s.endpoint)return[2];o={token:s.fcmToken,createTime:null!==(c=s.createTime)&&void 0!==c?c:Date.now(),subscriptionOptions:{auth:s.auth,p256dh:s.p256dh,endpoint:s.endpoint,swScope:s.swScope,vapidKey:"string"==typeof s.vapidKey?s.vapidKey:r(s.vapidKey)}}}else 3===t.oldVersion?(s=a,o={token:s.fcmToken,createTime:s.createTime,subscriptionOptions:{auth:r(s.auth),p256dh:r(s.p256dh),endpoint:s.endpoint,swScope:s.swScope,vapidKey:r(s.vapidKey)}}):4===t.oldVersion&&(s=a,o={token:s.fcmToken,createTime:s.createTime,subscriptionOptions:{auth:r(s.auth),p256dh:r(s.p256dh),endpoint:s.endpoint,swScope:s.swScope,vapidKey:r(s.vapidKey)}});return[2]}})})})];case 3:return s=u.sent(),s.close(),[4,n.i(Q.deleteDb)(oe)];case 4:return u.sent(),[4,n.i(Q.deleteDb)("fcm_vapid_details_db")];case 5:return u.sent(),[4,n.i(Q.deleteDb)("undefined")];case 6:return u.sent(),[2,a(o)?o:null]}})})}function a(e){if(!e||!e.subscriptionOptions)return!1;var t=e.subscriptionOptions;return"number"==typeof e.createTime&&e.createTime>0&&"string"==typeof e.token&&e.token.length>0&&"string"==typeof t.auth&&t.auth.length>0&&"string"==typeof t.p256dh&&t.p256dh.length>0&&"string"==typeof t.endpoint&&t.endpoint.length>0&&"string"==typeof t.swScope&&t.swScope.length>0&&"string"==typeof t.vapidKey&&t.vapidKey.length>0}function s(){return le||(le=n.i(Q.openDb)(ce,ue,function(e){switch(e.oldVersion){case 0:e.createObjectStore(fe)}})),le}function c(e){return n.i(J.e)(this,void 0,void 0,function(){var t,r,i,a;return n.i(J.f)(this,function(n){switch(n.label){case 0:return t=l(e),[4,s()];case 1:return r=n.sent(),[4,r.transaction(fe).objectStore(fe).get(t)];case 2:return i=n.sent(),i?[2,i]:[3,3];case 3:return[4,o(e.appConfig.senderId)];case 4:return a=n.sent(),a?[4,u(e,a)]:[3,6];case 5:return n.sent(),[2,a];case 6:return[2]}})})}function u(e,t){return n.i(J.e)(this,void 0,void 0,function(){var r,i,o;return n.i(J.f)(this,function(n){switch(n.label){case 0:return r=l(e),[4,s()];case 1:return i=n.sent(),o=i.transaction(fe,"readwrite"),[4,o.objectStore(fe).put(t,r)];case 2:return n.sent(),[4,o.complete];case 3:return n.sent(),[2,t]}})})}function f(e){return n.i(J.e)(this,void 0,void 0,function(){var t,r,i;return n.i(J.f)(this,function(n){switch(n.label){case 0:return t=l(e),[4,s()];case 1:return r=n.sent(),i=r.transaction(fe,"readwrite"),[4,i.objectStore(fe).delete(t)];case 2:return n.sent(),[4,i.complete];case 3:return n.sent(),[2]}})})}function l(e){return e.appConfig.appId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function p(e,t){return n.i(J.e)(this,void 0,void 0,function(){var r,i,o,a,s,c,u;return n.i(J.f)(this,function(n){switch(n.label){case 0:return[4,g(e)];case 1:r=n.sent(),i=b(t),o={method:"POST",headers:r,body:JSON.stringify(i)},n.label=2;case 2:return n.trys.push([2,5,,6]),[4,fetch(v(e.appConfig),o)];case 3:return s=n.sent(),[4,s.json()];case 4:return a=n.sent(),[3,6];case 5:throw c=n.sent(),ee.create("token-subscribe-failed",{errorInfo:c});case 6:if(a.error)throw u=a.error.message,ee.create("token-subscribe-failed",{errorInfo:u});if(!a.token)throw ee.create("token-subscribe-no-token");return[2,a.token]}})})}function d(e,t){return n.i(J.e)(this,void 0,void 0,function(){var r,i,o,a,s,c,u;return n.i(J.f)(this,function(n){switch(n.label){case 0:return[4,g(e)];case 1:r=n.sent(),i=b(t.subscriptionOptions),o={method:"PATCH",headers:r,body:JSON.stringify(i)},n.label=2;case 2:return n.trys.push([2,5,,6]),[4,fetch(v(e.appConfig)+"/"+t.token,o)];case 3:return s=n.sent(),[4,s.json()];case 4:return a=n.sent(),[3,6];case 5:throw c=n.sent(),ee.create("token-update-failed",{errorInfo:c});case 6:if(a.error)throw u=a.error.message,ee.create("token-update-failed",{errorInfo:u});if(!a.token)throw ee.create("token-update-no-token");return[2,a.token]}})})}function h(e,t){return n.i(J.e)(this,void 0,void 0,function(){var r,i,o,a,s,c;return n.i(J.f)(this,function(n){switch(n.label){case 0:return[4,g(e)];case 1:r=n.sent(),i={method:"DELETE",headers:r},n.label=2;case 2:return n.trys.push([2,5,,6]),[4,fetch(v(e.appConfig)+"/"+t,i)];case 3:return o=n.sent(),[4,o.json()];case 4:if(a=n.sent(),a.error)throw s=a.error.message,ee.create("token-unsubscribe-failed",{errorInfo:s});return[3,6];case 5:throw c=n.sent(),ee.create("token-unsubscribe-failed",{errorInfo:c});case 6:return[2]}})})}function v(e){var t=e.projectId;return ne+"/projects/"+t+"/registrations"}function g(e){var t=e.appConfig,r=e.installations;return n.i(J.e)(this,void 0,void 0,function(){var e;return n.i(J.f)(this,function(n){switch(n.label){case 0:return[4,r.getToken()];case 1:return e=n.sent(),[2,new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t.apiKey,"x-goog-firebase-installations-auth":"FIS "+e})]}})})}function b(e){var t=e.p256dh,n=e.auth,r=e.endpoint,i=e.vapidKey,o={web:{endpoint:r,auth:n,p256dh:t}};return i!==te&&(o.web.applicationPubKey=i),o}function m(e,t,i){return n.i(J.e)(this,void 0,void 0,function(){var o,a,s,u;return n.i(J.f)(this,function(n){switch(n.label){case 0:if("granted"!==Notification.permission)throw ee.create("permission-blocked");return[4,k(t,i)];case 1:return o=n.sent(),[4,c(e)];case 2:return a=n.sent(),s={vapidKey:i,swScope:t.scope,endpoint:o.endpoint,auth:r(o.getKey("auth")),p256dh:r(o.getKey("p256dh"))},a?[3,3]:[2,_(e,s)];case 3:if(S(a.subscriptionOptions,s))return[3,8];n.label=4;case 4:return n.trys.push([4,6,,7]),[4,h(e,a.token)];case 5:return n.sent(),[3,7];case 6:return u=n.sent(),console.warn(u),[3,7];case 7:return[2,_(e,s)];case 8:return Date.now()>=a.createTime+pe?[2,w({token:a.token,createTime:Date.now(),subscriptionOptions:s},e,t)]:[2,a.token];case 9:return[2]}})})}function y(e,t){return n.i(J.e)(this,void 0,void 0,function(){var r,i;return n.i(J.f)(this,function(n){switch(n.label){case 0:return[4,c(e)];case 1:return r=n.sent(),r?[4,h(e,r.token)]:[3,4];case 2:return n.sent(),[4,f(e)];case 3:n.sent(),n.label=4;case 4:return[4,t.pushManager.getSubscription()];case 5:return i=n.sent(),i?[2,i.unsubscribe()]:[2,!0]}})})}function w(e,t,r){return n.i(J.e)(this,void 0,void 0,function(){var i,o,a;return n.i(J.f)(this,function(s){switch(s.label){case 0:return s.trys.push([0,3,,5]),[4,d(t,e)];case 1:return i=s.sent(),o=n.i(J.b)(n.i(J.b)({},e),{token:i,createTime:Date.now()}),[4,u(t,o)];case 2:return s.sent(),[2,i];case 3:return a=s.sent(),[4,y(t,r)];case 4:throw s.sent(),a;case 5:return[2]}})})}function _(e,t){return n.i(J.e)(this,void 0,void 0,function(){var r,i;return n.i(J.f)(this,function(n){switch(n.label){case 0:return[4,p(e,t)];case 1:return r=n.sent(),i={token:r,createTime:Date.now(),subscriptionOptions:t},[4,u(e,i)];case 2:return n.sent(),[2,i.token]}})})}function k(e,t){return n.i(J.e)(this,void 0,void 0,function(){var r;return n.i(J.f)(this,function(n){switch(n.label){case 0:return[4,e.pushManager.getSubscription()];case 1:return r=n.sent(),r?[2,r]:[2,e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:i(t)})]}})})}function S(e,t){var n=t.vapidKey===e.vapidKey,r=t.endpoint===e.endpoint,i=t.auth===e.auth,o=t.p256dh===e.p256dh;return n&&r&&i&&o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function C(e){var t={from:e.from,collapseKey:e.collapse_key};return A(t,e),x(t,e),I(t,e),t}function A(e,t){if(t.notification){e.notification={};var n=t.notification.title;n&&(e.notification.title=n);var r=t.notification.body;r&&(e.notification.body=r);var i=t.notification.image;i&&(e.notification.image=i)}}function x(e,t){t.data&&(e.data=t.data)}function I(e,t){if(t.fcmOptions){e.fcmOptions={};var n=t.fcmOptions.link;n&&(e.fcmOptions.link=n);var r=t.fcmOptions.analytics_label;r&&(e.fcmOptions.analyticsLabel=r)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function E(e){return"object"==typeof e&&!!e&&ie in e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function P(e){return new Promise(function(t){setTimeout(t,e)})}function O(e){var t,r=n.i(J.b)({},e.notification);return r.data=(t={},t[re]=e,t),r}function T(e){var t=e.data;if(!t)return null;try{return t.json()}catch(e){return null}}function N(e){return n.i(J.e)(this,void 0,void 0,function(){var t,r,i,o,a,s,c;return n.i(J.f)(this,function(u){switch(u.label){case 0:return[4,M()];case 1:t=u.sent();try{for(r=n.i(J.a)(t),i=r.next();!i.done;i=r.next())if(o=i.value,a=new URL(o.url,self.location.href),e.host===a.host)return[2,o]}catch(e){s={error:e}}finally{try{i&&!i.done&&(c=r.return)&&c.call(r)}finally{if(s)throw s.error}}return[2,null]}})})}function D(e){return e.some(function(e){return"visible"===e.visibilityState&&!e.url.startsWith("chrome-extension://")})}function j(e,t){var r,i;t.isFirebaseMessaging=!0,t.messageType=$.PUSH_RECEIVED;try{for(var o=n.i(J.a)(e),a=o.next();!a.done;a=o.next()){a.value.postMessage(t)}}catch(e){r={error:e}}finally{try{a&&!a.done&&(i=o.return)&&i.call(o)}finally{if(r)throw r.error}}}function M(){return self.clients.matchAll({type:"window",includeUncontrolled:!0})}function R(e){var t,n=e.actions,r=Notification.maxActions;return n&&r&&n.length>r&&console.warn("This browser only supports "+r+" actions. The remaining actions will not be displayed."),self.registration.showNotification(null!==(t=e.title)&&void 0!==t?t:"",e)}function B(e){var t,n,r,i=null!==(n=null===(t=e.fcmOptions)||void 0===t?void 0:t.link)&&void 0!==n?n:null===(r=e.notification)||void 0===r?void 0:r.click_action;return i||(E(e.data)?self.location.origin:null)}function L(e){switch(e){case $.NOTIFICATION_CLICKED:return"notification_open";case $.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}function F(e){return delete e.messageType,delete e.isFirebaseMessaging,e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function K(e){var t,r;if(!e||!e.options)throw H("App Configuration Object");if(!e.name)throw H("App Name");var i=["projectId","apiKey","appId","messagingSenderId"],o=e.options;try{for(var a=n.i(J.a)(i),s=a.next();!s.done;s=a.next()){var c=s.value;if(!o[c])throw H(c)}}catch(e){t={error:e}}finally{try{s&&!s.done&&(r=a.return)&&r.call(a)}finally{if(t)throw t.error}}return{appName:e.name,projectId:o.projectId,apiKey:o.apiKey,appId:o.appId,senderId:o.messagingSenderId}}function H(e){return ee.create("missing-app-config-values",{valueName:e})}function W(e){var t=e.getProvider("app").getImmediate(),n=K(t),r=e.getProvider("installations").getImmediate(),i=e.getProvider("analytics-internal"),o={app:t,appConfig:n,installations:r,analyticsProvider:i};if(!U())throw ee.create("unsupported-browser");return self&&"ServiceWorkerGlobalScope"in self?new de(o):new he(o)}function U(){return self&&"ServiceWorkerGlobalScope"in self?z():V()}function V(){return"indexedDB"in window&&null!==indexedDB&&navigator.cookieEnabled&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}function z(){return"indexedDB"in self&&null!==indexedDB&&"PushManager"in self&&"Notification"in self&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}var q,$,G=(n(542),n(497)),Y=n(496),J=n(493),Q=n(539),Z=(n.n(Q),n(495)),X=(q={},q["missing-app-config-values"]='Missing App configuration value: "{$valueName}"',q["only-available-in-window"]="This method is available in a Window context.",q["only-available-in-sw"]="This method is available in a service worker context.",q["permission-default"]="The notification permission was not granted and dismissed instead.",q["permission-blocked"]="The notification permission was not granted and blocked instead.",q["unsupported-browser"]="This browser doesn't support the API's required to use the firebase SDK.",q["failed-service-worker-registration"]="We are unable to register the default service worker. {$browserErrorMessage}",q["token-subscribe-failed"]="A problem occurred while subscribing the user to FCM: {$errorInfo}",q["token-subscribe-no-token"]="FCM returned no token when subscribing the user to push.",q["token-unsubscribe-failed"]="A problem occurred while unsubscribing the user from FCM: {$errorInfo}",q["token-update-failed"]="A problem occurred while updating the user from FCM: {$errorInfo}",q["token-update-no-token"]="FCM returned no token when updating the user to push.",q["use-sw-after-get-token"]="The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.",q["invalid-sw-registration"]="The input to useServiceWorker() must be a ServiceWorkerRegistration.",q["invalid-bg-handler"]="The input to setBackgroundMessageHandler() must be a function.",q["invalid-vapid-key"]="The public VAPID key must be a string.",q["use-vapid-key-after-get-token"]="The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used.",q),ee=new Y.a("messaging","Messaging",X),te="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",ne="https://fcmregistrations.googleapis.com/v1",re="FCM_MSG",ie="google.c.a.c_id";!function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"}($||($={}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var oe="fcm_token_details_db",ae=5,se="fcm_token_object_Store",ce="firebase-messaging-database",ue=1,fe="firebase-messaging-store",le=null,pe=6048e5,de=function(){function e(e){var t=this;this.firebaseDependencies=e,this.isOnBackgroundMessageUsed=null,this.vapidKey=null,this.bgMessageHandler=null,self.addEventListener("push",function(e){e.waitUntil(t.onPush(e))}),self.addEventListener("pushsubscriptionchange",function(e){e.waitUntil(t.onSubChange(e))}),self.addEventListener("notificationclick",function(e){e.waitUntil(t.onNotificationClick(e))})}return Object.defineProperty(e.prototype,"app",{get:function(){return this.firebaseDependencies.app},enumerable:!1,configurable:!0}),e.prototype.setBackgroundMessageHandler=function(e){if(this.isOnBackgroundMessageUsed=!1,!e||"function"!=typeof e)throw ee.create("invalid-bg-handler");this.bgMessageHandler=e},e.prototype.onBackgroundMessage=function(e){var t=this;return this.isOnBackgroundMessageUsed=!0,this.bgMessageHandler=e,function(){t.bgMessageHandler=null}},e.prototype.getToken=function(){var e,t;return n.i(J.e)(this,void 0,void 0,function(){var r;return n.i(J.f)(this,function(n){switch(n.label){case 0:return this.vapidKey?[3,2]:[4,c(this.firebaseDependencies)];case 1:r=n.sent(),this.vapidKey=null!==(t=null===(e=null===r||void 0===r?void 0:r.subscriptionOptions)||void 0===e?void 0:e.vapidKey)&&void 0!==t?t:te,n.label=2;case 2:return[2,m(this.firebaseDependencies,self.registration,this.vapidKey)]}})})},e.prototype.deleteToken=function(){return y(this.firebaseDependencies,self.registration)},e.prototype.requestPermission=function(){throw ee.create("only-available-in-window")},e.prototype.usePublicVapidKey=function(e){if(null!==this.vapidKey)throw ee.create("use-vapid-key-after-get-token");if("string"!=typeof e||0===e.length)throw ee.create("invalid-vapid-key");this.vapidKey=e},e.prototype.useServiceWorker=function(){throw ee.create("only-available-in-window")},e.prototype.onMessage=function(){throw ee.create("only-available-in-window")},e.prototype.onTokenRefresh=function(){throw ee.create("only-available-in-window")},e.prototype.onPush=function(e){return n.i(J.e)(this,void 0,void 0,function(){var t,r,i,o;return n.i(J.f)(this,function(n){switch(n.label){case 0:return t=T(e),t?[4,M()]:(console.debug("FirebaseMessaging: failed to get parsed MessagePayload from the PushEvent. Skip handling the push."),[2]);case 1:return r=n.sent(),D(r)?[2,j(r,t)]:(i=!1,t.notification?[4,R(O(t))]:[3,3]);case 2:n.sent(),i=!0,n.label=3;case 3:return!0===i&&!1===this.isOnBackgroundMessageUsed?[2]:(this.bgMessageHandler&&(o=C(t),"function"==typeof this.bgMessageHandler?this.bgMessageHandler(o):this.bgMessageHandler.next(o)),[4,P(1e3)]);case 4:return n.sent(),[2]}})})},e.prototype.onSubChange=function(e){var t,r;return n.i(J.e)(this,void 0,void 0,function(){var i,o;return n.i(J.f)(this,function(n){switch(n.label){case 0:return i=e.newSubscription,i?[3,2]:[4,y(this.firebaseDependencies,self.registration)];case 1:return n.sent(),[2];case 2:return[4,c(this.firebaseDependencies)];case 3:return o=n.sent(),[4,y(this.firebaseDependencies,self.registration)];case 4:return n.sent(),[4,m(this.firebaseDependencies,self.registration,null!==(r=null===(t=null===o||void 0===o?void 0:o.subscriptionOptions)||void 0===t?void 0:t.vapidKey)&&void 0!==r?r:te)];case 5:return n.sent(),[2]}})})},e.prototype.onNotificationClick=function(e){var t,r;return n.i(J.e)(this,void 0,void 0,function(){var i,o,a,s,c;return n.i(J.f)(this,function(n){switch(n.label){case 0:return(i=null===(r=null===(t=e.notification)||void 0===t?void 0:t.data)||void 0===r?void 0:r[re])?e.action?[2]:(e.stopImmediatePropagation(),e.notification.close(),(o=B(i))?(a=new URL(o,self.location.href),s=new URL(self.location.origin),a.host!==s.host?[2]:[4,N(a)]):[2]):[2];case 1:return c=n.sent(),c?[3,4]:[4,self.clients.openWindow(o)];case 2:return c=n.sent(),[4,P(3e3)];case 3:return n.sent(),[3,6];case 4:return[4,c.focus()];case 5:c=n.sent(),n.label=6;case 6:return c?(i.messageType=$.NOTIFICATION_CLICKED,i.isFirebaseMessaging=!0,[2,c.postMessage(i)]):[2]}})})},e}(),he=function(){function e(e){var t=this;this.firebaseDependencies=e,this.vapidKey=null,this.onMessageCallback=null,navigator.serviceWorker.addEventListener("message",function(e){return t.messageEventListener(e)})}return Object.defineProperty(e.prototype,"app",{get:function(){return this.firebaseDependencies.app},enumerable:!1,configurable:!0}),e.prototype.messageEventListener=function(e){return n.i(J.e)(this,void 0,void 0,function(){var t,r;return n.i(J.f)(this,function(n){switch(n.label){case 0:return t=e.data,t.isFirebaseMessaging?(this.onMessageCallback&&t.messageType===$.PUSH_RECEIVED&&("function"==typeof this.onMessageCallback?this.onMessageCallback(F(Object.assign({},t))):this.onMessageCallback.next(Object.assign({},t))),r=t.data,E(r)&&"1"===r["google.c.a.e"]?[4,this.logEvent(t.messageType,r)]:[3,2]):[2];case 1:n.sent(),n.label=2;case 2:return[2]}})})},e.prototype.getVapidKey=function(){return this.vapidKey},e.prototype.getSwReg=function(){return this.swRegistration},e.prototype.getToken=function(e){return n.i(J.e)(this,void 0,void 0,function(){return n.i(J.f)(this,function(t){switch(t.label){case 0:return"default"!==Notification.permission?[3,2]:[4,Notification.requestPermission()];case 1:t.sent(),t.label=2;case 2:if("granted"!==Notification.permission)throw ee.create("permission-blocked");return[4,this.updateVapidKey(null===e||void 0===e?void 0:e.vapidKey)];case 3:return t.sent(),[4,this.updateSwReg(null===e||void 0===e?void 0:e.serviceWorkerRegistration)];case 4:return t.sent(),[2,m(this.firebaseDependencies,this.swRegistration,this.vapidKey)]}})})},e.prototype.updateVapidKey=function(e){return n.i(J.e)(this,void 0,void 0,function(){return n.i(J.f)(this,function(t){return e?this.vapidKey=e:this.vapidKey||(this.vapidKey=te),[2]})})},e.prototype.updateSwReg=function(e){return n.i(J.e)(this,void 0,void 0,function(){return n.i(J.f)(this,function(t){switch(t.label){case 0:return e||this.swRegistration?[3,2]:[4,this.registerDefaultSw()];case 1:t.sent(),t.label=2;case 2:if(!e&&this.swRegistration)return[2];if(!(e instanceof ServiceWorkerRegistration))throw ee.create("invalid-sw-registration");return this.swRegistration=e,[2]}})})},e.prototype.registerDefaultSw=function(){return n.i(J.e)(this,void 0,void 0,function(){var e,t;return n.i(J.f)(this,function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),e=this,[4,navigator.serviceWorker.register("/firebase-messaging-sw.js",{scope:"/firebase-cloud-messaging-push-scope"})];case 1:return e.swRegistration=n.sent(),this.swRegistration.update().catch(function(){}),[3,3];case 2:throw t=n.sent(),ee.create("failed-service-worker-registration",{browserErrorMessage:t.message});case 3:return[2]}})})},e.prototype.deleteToken=function(){return n.i(J.e)(this,void 0,void 0,function(){return n.i(J.f)(this,function(e){switch(e.label){case 0:return this.swRegistration?[3,2]:[4,this.registerDefaultSw()];case 1:e.sent(),e.label=2;case 2:return[2,y(this.firebaseDependencies,this.swRegistration)]}})})},e.prototype.requestPermission=function(){return n.i(J.e)(this,void 0,void 0,function(){var e;return n.i(J.f)(this,function(t){switch(t.label){case 0:return"granted"===Notification.permission?[2]:[4,Notification.requestPermission()];case 1:if("granted"===(e=t.sent()))return[2];throw"denied"===e?ee.create("permission-blocked"):ee.create("permission-default")}})})},e.prototype.usePublicVapidKey=function(e){if(null!==this.vapidKey)throw ee.create("use-vapid-key-after-get-token");if("string"!=typeof e||0===e.length)throw ee.create("invalid-vapid-key");this.vapidKey=e},e.prototype.useServiceWorker=function(e){if(!(e instanceof ServiceWorkerRegistration))throw ee.create("invalid-sw-registration");if(this.swRegistration)throw ee.create("use-sw-after-get-token");this.swRegistration=e},e.prototype.onMessage=function(e){var t=this;return this.onMessageCallback=e,function(){t.onMessageCallback=null}},e.prototype.setBackgroundMessageHandler=function(){throw ee.create("only-available-in-sw")},e.prototype.onBackgroundMessage=function(){throw ee.create("only-available-in-sw")},e.prototype.onTokenRefresh=function(){return function(){}},e.prototype.logEvent=function(e,t){return n.i(J.e)(this,void 0,void 0,function(){var r,i;return n.i(J.f)(this,function(n){switch(n.label){case 0:return r=L(e),[4,this.firebaseDependencies.analyticsProvider.get()];case 1:return i=n.sent(),i.logEvent(r,{message_id:t[ie],message_name:t["google.c.a.c_l"],message_time:t["google.c.a.ts"],message_device_time:Math.floor(Date.now()/1e3)}),[2]}})})},e}(),ve={isSupported:U};Z.a.INTERNAL.registerComponent(new G.b("messaging",W,"PUBLIC").setServiceProps(ve))},546:function(e,t,n){"use strict";function r(e){return{user_id:e,push_notification:{ask_for_permission:!0,token:null}}}function i(e,t){return e.push_notification.token=t,e}function o(e){function t(){var t=e.apply(this,arguments);return new s.a(function(e,n){setTimeout(function(){e({data:t})},600)})}return t}var a=n(476),s=n.n(a);t.a={user_profile:o(r),update_token:o(i)}},547:function(e,t,n){"use strict";var r=n(660),i=(n(661),n(23)),o=i.default.firebaseConfig;self.addEventListener("notificationclick",function(e){var t=e.currentTarget.location.origin;e.waitUntil(clients.matchAll({includeUncontrolled:!0,type:"window"}).then(function(e){for(var n=0;n<e.length;n++){var r=e[n];if(r.url===t&&"focus"in r)return r.focus()}if(clients.openWindow)return clients.openWindow(t)}))}),r.a.apps.length?r.a.app():r.a.initializeApp(o);var a=r.a.messaging();t.a={messaging:a}},571:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(547),i=n(55),o=n(23);t.default={props:["currentToken"],data:function(){return{hasServiceWorker:!1}},mounted:function(){this.initialize()},methods:{initialize:function(){return"serviceWorker"in navigator?"PushManager"in window?void(this.hasServiceWorker=!0):void console.warn("PushManager not working"):void console.warn("serviceWorker not working")},askForPermission:function(){var e=this;this.hasServiceWorker&&(r.a.messaging.usePublicVapidKey(o.default.vapidKey),navigator.serviceWorker.register("./static/firebase-messaging-sw.js").then(function(t){r.a.messaging.useServiceWorker(t),r.a.messaging.requestPermission().then(function(){r.a.messaging.getToken().then(function(t){if(t!==e.currentToken){console.log("token ",t),e.$emit("update-token",t);var n="MeatTheSea-"+i.a.user.userID;fetch("https://iid.googleapis.com/iid/v1/"+t+"/rel/topics/"+n,{method:"POST",headers:new Headers({Authorization:"key="+o.default.firebaseServerKey})}).then(function(e){if(e.status<200||e.status>=400)throw"Error subscribing to topic: "+e.status+" - "+e.text();console.log('Subscribed to "'+n+'"')}).catch(function(e){console.error(e)})}}).catch(function(e){return console.log("--- token error:",e)})}).catch(function(e){console.log("Unable to get permission to notify.",e)})}).catch(function(e){console.log("error register",e)}),r.a.messaging.onMessage(function(t){switch(console.log("notification ",t),t.data.topic.toLowerCase()){case"acceptorder":i.a.setNotificationOrders(t);break;case"crockery":i.a.setNotificationCrockery(t)}e.$emit("new-message",t)}))}}}},575:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(23),i=n(55),o=n(668),a=n.n(o),s=n(546);t.default={components:{PushNotification:a.a},data:function(){return{config:r.default,firebaseServerKey:r.default.firebaseServerKey,userProfile:{},askForPermission:!1,userToken:null,notificationMessage:[],notificationTitle:""}},created:function(){},methods:{logout:function(){i.a.removeAuthentication()},enableNotifications:function(){this.$refs.pushNotification.askForPermission()},onUpdateToken:function(e){this.userToken=e,s.a.update_token(this.userProfile,this.userToken)},onNewMessage:function(e){if(void 0!==e.data.topic||null!==e.data.topic){switch(e.data.topic.toLowerCase()){case"acceptorder":this.notificationTitle="NEW ORDER REQUEST";break;case"crockery":this.notificationTitle="NEW CROCKERY REQUEST"}"acceptorder"!==e.data.topic.toLowerCase()&&"crockery"!==e.data.topic.toLowerCase()||this.notificationMessage.push(e.notification.body)}}}}},593:function(e,t,n){t=e.exports=n(440)(),t.push([e.i,".navbar[data-v-5730adac]{background-color:#0064b1}.logo-brand[data-v-5730adac]{width:100px;height:100px}.nav-link .navbar-brand[data-v-5730adac]{font-size:30px}.notificationBar[data-v-5730adac]{background-color:#ff0045;width:100%;z-index:100;padding-left:48%;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;color:#fff;height:60px}.xNotification[data-v-5730adac]{cursor:pointer;background-color:#fff;color:#ff0045;font-size:24px;margin-top:0!important;padding-top:0!important;padding-bottom:5px;padding-left:4px;padding-right:4px;line-height:19px;border-radius:50%;margin-right:20px}","",{version:3,sources:["C:/xampp/htdocs/meathesea/src/modules/frame/Header2.vue"],names:[],mappings:"AACA,yBAAyB,wBAAwB,CAChD,AACD,6BAA6B,YAAY,YAAY,CACpD,AACD,yCAAyC,cAAc,CACtD,AACD,kCAAkC,yBAAyB,WAAW,YAAY,iBAAiB,oBAAoB,aAAa,sBAAsB,mBAAmB,sBAAsB,8BAA8B,WAAc,WAAW,CACzP,AACD,gCAAgC,eAAe,sBAAyB,cAAc,eAAe,uBAA0B,wBAA2B,mBAAmB,iBAAiB,kBAAkB,iBAAiB,kBAAkB,iBAAiB,CACnQ",file:"Header2.vue",sourcesContent:["\n.navbar[data-v-5730adac]{background-color:#0064B1\n}\n.logo-brand[data-v-5730adac]{width:100px;height:100px\n}\n.nav-link .navbar-brand[data-v-5730adac]{font-size:30px\n}\n.notificationBar[data-v-5730adac]{background-color:#FF0045;width:100%;z-index:100;padding-left:48%;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;color:#FFFFFF;height:60px\n}\n.xNotification[data-v-5730adac]{cursor:pointer;background-color:#FFFFFF;color:#FF0045;font-size:24px;margin-top:0px !important;padding-top:0px !important;padding-bottom:5px;padding-left:4px;padding-right:4px;line-height:19px;border-radius:50%;margin-right:20px\n}\n"],sourceRoot:""}])},631:function(e,t,n){var r=n(593);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(441)("73479ced",r,!0)},660:function(e,t,n){"use strict";var r=n(495);n.d(t,"a",function(){return r.a});/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
r.a.registerVersion("firebase","8.2.5","app")},661:function(e,t,n){"use strict";n(544)},668:function(e,t,n){var r=n(300)(n(571),n(702),null,null);e.exports=r.exports},678:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("nav",{staticClass:"navbar navbar-expand-sm"},[e._m(0),e._v(" "),n("ul",{staticClass:"navbar-nav"},[n("li",{staticClass:"nav-item"},[n("a",{staticClass:"nav-link",attrs:{href:"#"}},[n("label",{staticClass:"navbar-brand hide-on-mobile text-white",domProps:{innerHTML:e._s(e.config.APP_NAME_VHTML)}})])])]),e._v(" "),n("ul",{staticClass:"nav navbar-nav navbar-right ml-auto"},[n("li",{on:{click:function(t){return e.logout()}}},[n("i",{staticClass:"fas fa-sign-out-alt",staticStyle:{"font-size":"30px",color:"white"},attrs:{title:"Logout"}})])])]),e._v(" "),e.notificationMessage.length>0?n("div",{staticClass:"notificationBar"},[n("b",[e._v(" "+e._s(e.notificationTitle)+" ("+e._s(e.notificationMessage.length)+")")]),e._v(" "),n("b",{staticClass:"xNotification",on:{click:function(t){e.notificationMessage=[],e.notificationTitle=""}}},[e._v("×")])]):e._e(),e._v(" "),n("PushNotification",{ref:"pushNotification",attrs:{currentToken:e.userToken},on:{"update-token":e.onUpdateToken,"new-message":e.onNewMessage}})],1)},staticRenderFns:[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("a",{staticClass:"navbar-brand",attrs:{href:"#"}},[r("img",{staticClass:"logo-brand",staticStyle:{"margin-left":"-5%"},attrs:{src:n(524)}})])}]}},702:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("div")},staticRenderFns:[]}}});
//# sourceMappingURL=4.935a5bd525ca3b9bc2de.js.map