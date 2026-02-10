import { jsx as e, jsxs as c, Fragment as o } from "react/jsx-runtime";
import * as m from "react";
import { cn as p } from "../lib/utils.mjs";
const d = ({ icon: t, text: a, href: s }) => {
  const r = /* @__PURE__ */ c(o, { children: [
    t && /* @__PURE__ */ e("span", { className: "flex-shrink-0 w-6 h-6 flex items-center justify-center text-slate-500", children: t }),
    /* @__PURE__ */ e("span", { className: "text-sm font-semibold text-slate-700 dark:text-slate-200 leading-[1.5] tracking-[-0.14px]", children: a })
  ] });
  return s ? /* @__PURE__ */ e(
    "a",
    {
      href: s,
      className: "flex items-start gap-[7px] hover:opacity-80 transition-opacity",
      children: r
    }
  ) : /* @__PURE__ */ e("div", { className: "flex items-start gap-[7px]", children: r });
}, x = m.forwardRef(
  ({ className: t, items: a = [], children: s, ...r }, n) => /* @__PURE__ */ e(
    "div",
    {
      ref: n,
      className: p(
        "w-[276px] p-2.5 bg-slate-50 dark:bg-slate-800 rounded-[10px]",
        t
      ),
      ...r,
      children: a.length > 0 ? /* @__PURE__ */ e("div", { className: "flex flex-col gap-2.5", children: a.map((l, i) => /* @__PURE__ */ e(d, { ...l }, i)) }) : s
    }
  )
);
x.displayName = "NavInfo";
export {
  x as NavInfo,
  d as NavInfoItem
};
//# sourceMappingURL=nav-info.mjs.map
