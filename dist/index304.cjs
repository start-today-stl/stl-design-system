"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const o=require("./index349.cjs"),i=require("./index350.cjs");function l(u,r){let t,e=r==null?void 0:r.in;return u.forEach(c=>{!e&&typeof c=="object"&&(e=o.constructFrom.bind(null,c));const n=i.toDate(c,e);(!t||t>n||isNaN(+n))&&(t=n)}),o.constructFrom(e,t||NaN)}exports.min=l;
//# sourceMappingURL=index304.cjs.map
