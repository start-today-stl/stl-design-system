"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const u=require("./index349.cjs"),a=require("./index350.cjs");function l(n,r){let t,e=r==null?void 0:r.in;return n.forEach(c=>{!e&&typeof c=="object"&&(e=u.constructFrom.bind(null,c));const o=a.toDate(c,e);(!t||t<o||isNaN(+o))&&(t=o)}),u.constructFrom(e,t||NaN)}exports.max=l;
//# sourceMappingURL=index303.cjs.map
