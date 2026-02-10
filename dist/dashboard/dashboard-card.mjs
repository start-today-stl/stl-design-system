import { jsxs as a, jsx as e } from "react/jsx-runtime";
import * as m from "react";
import { cn as t } from "../lib/utils.mjs";
const n = m.forwardRef(
  ({ className: d, icon: s, title: x, headerAction: l, children: i, stretch: r = !1, ...c }, f) => /* @__PURE__ */ a(
    "div",
    {
      ref: f,
      className: t(
        "bg-white border border-slate-100 rounded-[10px] dark:bg-slate-700 dark:border-slate-600 flex flex-col",
        r && "h-full",
        d
      ),
      ...c,
      children: [
        /* @__PURE__ */ a("div", { className: "flex items-center justify-between px-[10px] pt-[10px] flex-shrink-0", children: [
          /* @__PURE__ */ a("div", { className: "flex items-center gap-0.5", children: [
            s && /* @__PURE__ */ e("span", { className: "flex-shrink-0 text-slate-700 dark:text-slate-100", children: s }),
            /* @__PURE__ */ e("span", { className: "text-sm tracking-[-0.14px] text-slate-700 dark:text-slate-100", children: x })
          ] }),
          l && /* @__PURE__ */ e("div", { className: "flex items-center", children: l })
        ] }),
        /* @__PURE__ */ e("div", { className: t("p-[10px]", r && "flex-1 flex flex-col"), children: i })
      ]
    }
  )
);
n.displayName = "DashboardCard";
export {
  n as DashboardCard
};
//# sourceMappingURL=dashboard-card.mjs.map
