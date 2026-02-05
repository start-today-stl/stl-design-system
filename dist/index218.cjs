"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});function f(e,o,a,n){const t=n??e.today(),c=a?e.startOfBroadcastWeek(t,e):o?e.startOfISOWeek(t):e.startOfWeek(t),r=[];for(let s=0;s<7;s++){const y=e.addDays(c,s);r.push(y)}return r}exports.getWeekdays=f;
//# sourceMappingURL=index218.cjs.map
