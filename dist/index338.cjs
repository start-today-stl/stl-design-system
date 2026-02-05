"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=5,c=4;function f(e,t){const s=t.startOfMonth(e),o=s.getDay()>0?s.getDay():7,a=t.addDays(e,-o+1),r=t.addDays(a,n*7-1);return t.getMonth(e)===t.getMonth(r)?n:c}exports.getBroadcastWeeksInMonth=f;
//# sourceMappingURL=index338.cjs.map
