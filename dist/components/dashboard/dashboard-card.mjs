import { jsx as e, jsxs as a, Fragment as i } from "react/jsx-runtime";
import * as o from "react";
import { cn as d } from "../../lib/utils.mjs";
import { Skeleton as s } from "../ui/skeleton.mjs";
function f() {
  return /* @__PURE__ */ a(i, { children: [
    /* @__PURE__ */ a("div", { className: "flex items-center justify-between px-[10px] pt-[10px] flex-shrink-0", children: [
      /* @__PURE__ */ a("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ e(s, { width: 24, height: 24, className: "rounded" }),
        /* @__PURE__ */ e(s, { width: 80, height: 14 })
      ] }),
      /* @__PURE__ */ e(s, { width: 60, height: 24, className: "rounded" })
    ] }),
    /* @__PURE__ */ a("div", { className: "p-[10px] flex flex-col gap-[5px]", children: [
      /* @__PURE__ */ e(s, { height: 44, width: "100%", className: "rounded-[6px]" }),
      /* @__PURE__ */ e(s, { height: 44, width: "100%", className: "rounded-[6px]" }),
      /* @__PURE__ */ e(s, { height: 44, width: "100%", className: "rounded-[6px]" })
    ] })
  ] });
}
const N = o.forwardRef(
  ({ className: n, icon: t, title: x, headerAction: l, children: c, stretch: r = !1, loading: h = !1, ...m }, p) => /* @__PURE__ */ e(
    "div",
    {
      ref: p,
      className: d(
        "bg-white border border-slate-100 rounded-[10px] dark:bg-slate-700 dark:border-slate-600 flex flex-col",
        r && "h-full",
        n
      ),
      ...m,
      children: h ? /* @__PURE__ */ e(f, {}) : /* @__PURE__ */ a(i, { children: [
        /* @__PURE__ */ a("div", { className: "flex items-center justify-between px-[10px] pt-[10px] flex-shrink-0", children: [
          /* @__PURE__ */ a("div", { className: "flex items-center gap-0.5", children: [
            t && /* @__PURE__ */ e("span", { className: "flex-shrink-0 text-slate-700 dark:text-slate-100", children: t }),
            /* @__PURE__ */ e("span", { className: "text-sm tracking-[-0.14px] text-slate-700 dark:text-slate-100", children: x })
          ] }),
          l && /* @__PURE__ */ e("div", { className: "flex items-center", children: l })
        ] }),
        /* @__PURE__ */ e("div", { className: d("p-[10px]", r && "flex-1 flex flex-col"), children: c })
      ] })
    }
  )
);
N.displayName = "DashboardCard";
export {
  N as DashboardCard
};
//# sourceMappingURL=dashboard-card.mjs.map
