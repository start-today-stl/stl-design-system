"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const o=require("./index217.cjs");function u(s,r,t=!1,f=o.defaultDateLib){let{from:e,to:n}=s;const{differenceInCalendarDays:a,isSameDay:i}=f;return e&&n?(a(n,e)<0&&([e,n]=[n,e]),a(r,e)>=(t?1:0)&&a(n,r)>=(t?1:0)):!t&&n?i(n,r):!t&&e?i(e,r):!1}exports.rangeIncludesDate=u;
//# sourceMappingURL=index236.cjs.map
