"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const i=require("./index267.cjs"),h=require("react");/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var s;function m(){if(s)return i.__exports;s=1;var u=h;function f(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var S=typeof Object.is=="function"?Object.is:f,d=u.useState,l=u.useEffect,p=u.useLayoutEffect,y=u.useDebugValue;function v(e,t){var r=t(),c=d({inst:{value:r,getSnapshot:t}}),n=c[0].inst,a=c[1];return p(function(){n.value=r,n.getSnapshot=t,o(n)&&a({inst:n})},[e,r,t]),l(function(){return o(n)&&a({inst:n}),e(function(){o(n)&&a({inst:n})})},[e]),y(r),r}function o(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!S(e,r)}catch{return!0}}function E(e,t){return t()}var _=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?E:v;return i.__exports.useSyncExternalStore=u.useSyncExternalStore!==void 0?u.useSyncExternalStore:_,i.__exports}exports.__require=m;
//# sourceMappingURL=index264.cjs.map
