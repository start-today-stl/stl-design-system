"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const f=require("react"),b=require("./index334.cjs"),o=require("./index322.cjs"),p=require("./index364.cjs");function v(t){const c=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(t){for(const e in t)if(e!=="default"){const n=Object.getOwnPropertyDescriptor(t,e);Object.defineProperty(c,e,n.get?n:{enumerable:!0,get:()=>t[e]})}}return c.default=t,Object.freeze(c)}const u=v(f);var m=b.styleSingleton(),r="data-scroll-locked",h=function(t,c,e,n){var i=t.left,l=t.top,d=t.right,a=t.gap;return e===void 0&&(e="margin"),`
  .`.concat(o.noScrollbarsClassName,` {
   overflow: hidden `).concat(n,`;
   padding-right: `).concat(a,"px ").concat(n,`;
  }
  body[`).concat(r,`] {
    overflow: hidden `).concat(n,`;
    overscroll-behavior: contain;
    `).concat([c&&"position: relative ".concat(n,";"),e==="margin"&&`
    padding-left: `.concat(i,`px;
    padding-top: `).concat(l,`px;
    padding-right: `).concat(d,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(a,"px ").concat(n,`;
    `),e==="padding"&&"padding-right: ".concat(a,"px ").concat(n,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(o.zeroRightClassName,` {
    right: `).concat(a,"px ").concat(n,`;
  }
  
  .`).concat(o.fullWidthClassName,` {
    margin-right: `).concat(a,"px ").concat(n,`;
  }
  
  .`).concat(o.zeroRightClassName," .").concat(o.zeroRightClassName,` {
    right: 0 `).concat(n,`;
  }
  
  .`).concat(o.fullWidthClassName," .").concat(o.fullWidthClassName,` {
    margin-right: 0 `).concat(n,`;
  }
  
  body[`).concat(r,`] {
    `).concat(o.removedBarSizeVariable,": ").concat(a,`px;
  }
`)},s=function(){var t=parseInt(document.body.getAttribute(r)||"0",10);return isFinite(t)?t:0},g=function(){u.useEffect(function(){return document.body.setAttribute(r,(s()+1).toString()),function(){var t=s()-1;t<=0?document.body.removeAttribute(r):document.body.setAttribute(r,t.toString())}},[])},y=function(t){var c=t.noRelative,e=t.noImportant,n=t.gapMode,i=n===void 0?"margin":n;g();var l=u.useMemo(function(){return p.getGapWidth(i)},[i]);return u.createElement(m,{styles:h(l,!c,i,e?"":"!important")})};exports.RemoveScrollBar=y;exports.lockAttribute=r;exports.useLockAttribute=g;
//# sourceMappingURL=index333.cjs.map
