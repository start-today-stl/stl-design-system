import { jsx as e, jsxs as t, Fragment as d } from "react/jsx-runtime";
import * as o from "react";
import { cn as i } from "../../lib/utils.mjs";
import { Skeleton as a } from "../ui/skeleton.mjs";
function p() {
  return /* @__PURE__ */ t(d, { children: [
    /* @__PURE__ */ t("div", { className: "flex items-center justify-between px-[10px] pt-[10px] flex-shrink-0", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ e(a, { width: 24, height: 24, className: "rounded" }),
        /* @__PURE__ */ e(a, { width: 80, height: 14 })
      ] }),
      /* @__PURE__ */ e(a, { width: 60, height: 24, className: "rounded" })
    ] }),
    /* @__PURE__ */ t("div", { className: "p-[10px] flex-1 flex flex-col gap-2", children: [
      /* @__PURE__ */ e(a, { height: 32, width: "100%" }),
      /* @__PURE__ */ e(a, { height: 32, width: "100%" }),
      /* @__PURE__ */ e(a, { height: 32, width: "80%" })
    ] })
  ] });
}
const g = o.forwardRef(
  ({ className: n, icon: l, title: h, headerAction: s, children: x, stretch: r = !1, loading: c = !1, ...f }, m) => /* @__PURE__ */ e(
    "div",
    {
      ref: m,
      className: i(
        "bg-white border border-slate-100 rounded-[10px] dark:bg-slate-700 dark:border-slate-600 flex flex-col",
        r && "h-full",
        n
      ),
      ...f,
      children: c ? /* @__PURE__ */ e(p, {}) : /* @__PURE__ */ t(d, { children: [
        /* @__PURE__ */ t("div", { className: "flex items-center justify-between px-[10px] pt-[10px] flex-shrink-0", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-0.5", children: [
            l && /* @__PURE__ */ e("span", { className: "flex-shrink-0 text-slate-700 dark:text-slate-100", children: l }),
            /* @__PURE__ */ e("span", { className: "text-sm tracking-[-0.14px] text-slate-700 dark:text-slate-100", children: h })
          ] }),
          s && /* @__PURE__ */ e("div", { className: "flex items-center", children: s })
        ] }),
        /* @__PURE__ */ e("div", { className: i("p-[10px]", r && "flex-1 flex flex-col"), children: x })
      ] })
    }
  )
);
g.displayName = "DashboardCard";
export {
  g as DashboardCard
};
//# sourceMappingURL=dashboard-card.mjs.map
