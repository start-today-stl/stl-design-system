"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});function M(o,e,n,a,s){const{startOfMonth:r,startOfYear:c,endOfYear:f,eachMonthOfInterval:l,getMonth:i}=s;return l({start:c(o),end:f(o)}).map(t=>{const u=a.formatMonthDropdown(t,s),O=i(t),p=e&&t<r(e)||n&&t>r(n)||!1;return{value:O,label:u,disabled:p}})}exports.getMonthOptions=M;
//# sourceMappingURL=index220.cjs.map
