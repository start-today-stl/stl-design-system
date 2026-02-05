"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});function O(e,r,s,t,o=!1){if(!e||!r)return;const{startOfYear:f,endOfYear:i,eachYearOfInterval:l,getYear:u}=t,c=f(e),d=i(r),a=l({start:c,end:d});return o&&a.reverse(),a.map(n=>{const Y=s.formatYearDropdown(n,t);return{value:u(n),label:Y,disabled:!1}})}exports.getYearOptions=O;
//# sourceMappingURL=index232.cjs.map
