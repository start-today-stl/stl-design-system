import { jsx as e, jsxs as l, Fragment as o } from "react/jsx-runtime";
import * as m from "react";
import { cn as p } from "./index105.mjs";
const d = ({ icon: a, text: t, href: r }) => {
  const n = /* @__PURE__ */ l(o, { children: [
    a && /* @__PURE__ */ e("span", { className: "flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-500", children: a }),
    /* @__PURE__ */ e("span", { className: "text-sm font-semibold text-gray-700 dark:text-gray-200 leading-[1.5] tracking-[-0.14px]", children: t })
  ] });
  return r ? /* @__PURE__ */ e(
    "a",
    {
      href: r,
      className: "flex items-start gap-[7px] hover:opacity-80 transition-opacity",
      children: n
    }
  ) : /* @__PURE__ */ e("div", { className: "flex items-start gap-[7px]", children: n });
}, x = m.forwardRef(
  ({ className: a, items: t = [], children: r, ...n }, s) => /* @__PURE__ */ e(
    "div",
    {
      ref: s,
      className: p(
        "w-[276px] p-2.5 bg-gray-50 dark:bg-gray-800 rounded-[10px]",
        a
      ),
      ...n,
      children: t.length > 0 ? /* @__PURE__ */ e("div", { className: "flex flex-col gap-2.5", children: t.map((i, c) => /* @__PURE__ */ e(d, { ...i }, c)) }) : r
    }
  )
);
x.displayName = "NavInfo";
export {
  x as NavInfo,
  d as NavInfoItem
};
//# sourceMappingURL=index52.mjs.map
