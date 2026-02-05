"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const u=require("react");function l(c,t){var e=u.useState(function(){return{value:c,callback:t,facade:{get current(){return e.value},set current(a){var r=e.value;r!==a&&(e.value=a,e.callback(a,r))}}}})[0];return e.callback=t,e.facade}exports.useCallbackRef=l;
//# sourceMappingURL=index374.cjs.map
