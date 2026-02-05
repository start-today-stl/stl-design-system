"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});function d(s,o,n,e){const{month:h,defaultMonth:l,today:M=e.today(),numberOfMonths:i=1}=s;let t=h||l||M;const{differenceInCalendarMonths:f,addMonths:r,startOfMonth:c}=e;if(n&&f(n,t)<i-1){const u=-1*(i-1);t=r(n,u)}return o&&f(t,o)<0&&(t=o),c(t)}exports.getInitialMonth=d;
//# sourceMappingURL=index306.cjs.map
