import { jsx as e, jsxs as c, Fragment as o } from "react/jsx-runtime";
import * as m from "react";
import { cn as d } from "../lib/utils.mjs";
const p = ({ icon: t, text: a, href: s }) => {
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
}, f = m.forwardRef(
  ({ className: t, items: a = [], children: s, ...r }, l) => /* @__PURE__ */ e(
    "div",
    {
      ref: l,
      className: d(
        "w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-[10px]",
        t
      ),
      ...r,
      children: a.length > 0 ? /* @__PURE__ */ e("div", { className: "flex flex-col gap-2.5", children: a.map((n, i) => /* @__PURE__ */ e(p, { ...n }, i)) }) : s
    }
  )
);
f.displayName = "NavInfo";
export {
  f as NavInfo,
  p as NavInfoItem
};
//# sourceMappingURL=nav-info.mjs.map
