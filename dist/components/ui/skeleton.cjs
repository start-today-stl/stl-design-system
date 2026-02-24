"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const a=require("react/jsx-runtime"),f=require("react"),r=require("../../lib/utils.cjs");function u(e){const n=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(e){for(const t in e)if(t!=="default"){const s=Object.getOwnPropertyDescriptor(e,t);Object.defineProperty(n,t,s.get?s:{enumerable:!0,get:()=>e[t]})}}return n.default=e,Object.freeze(n)}const k=u(f),l=k.forwardRef(({className:e,width:n,height:t=18,circle:s=!1,disableAnimation:d=!1,style:o,...i},c)=>a.jsxs("div",{ref:c,className:r.cn("relative overflow-hidden",s?"rounded-full":"rounded",e),style:{width:s?t??18:n??"100%",height:t??18,...o},...i,children:[a.jsx("div",{className:r.cn("absolute inset-0 dark:hidden",!d&&"skeleton-default"),style:{background:"linear-gradient(90deg, #ffffff 0%, #d4dae3 50%, #ffffff 100%)"}}),a.jsx("div",{className:r.cn("absolute inset-0 hidden dark:block",!d&&"skeleton-default"),style:{background:"linear-gradient(90deg, #444b57 0%, #5e6977 50%, #444b57 100%)"}}),!d&&a.jsx("div",{className:"absolute inset-0 skeleton-variant dark:hidden",style:{background:"linear-gradient(90deg, #d4dae3 0%, #ffffff 50%, #d4dae3 100%)"}}),!d&&a.jsx("div",{className:"absolute inset-0 skeleton-variant hidden dark:block",style:{background:"linear-gradient(90deg, #5e6977 0%, #444b57 50%, #5e6977 100%)"}}),a.jsx("style",{children:`
          .skeleton-variant {
            animation: skeleton-dissolve 4s ease-out infinite;
          }
          @keyframes skeleton-dissolve {
            0% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
        `})]}));l.displayName="Skeleton";exports.Skeleton=l;
//# sourceMappingURL=skeleton.cjs.map
