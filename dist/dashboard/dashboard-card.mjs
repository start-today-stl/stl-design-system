import { jsxs as r, jsx as e } from "react/jsx-runtime";
import * as m from "react";
import { cn as d } from "../lib/utils.mjs";
const n = m.forwardRef(
  ({ className: t, icon: a, title: x, headerAction: s, children: i, stretch: l = !1, ...c }, f) => /* @__PURE__ */ r(
    "div",
    {
      ref: f,
      className: d(
        "bg-white border border-gray-100 rounded-[10px] dark:bg-dark-400 dark:border-dark-300 flex flex-col",
        l && "h-full",
        t
      ),
      ...c,
      children: [
        /* @__PURE__ */ r("div", { className: "flex items-center justify-between px-[10px] pt-[10px] flex-shrink-0", children: [
          /* @__PURE__ */ r("div", { className: "flex items-center gap-0.5", children: [
            a && /* @__PURE__ */ e("span", { className: "flex-shrink-0 text-gray-700 dark:text-gray-100", children: a }),
            /* @__PURE__ */ e("span", { className: "text-sm tracking-[-0.14px] text-gray-700 dark:text-gray-100", children: x })
          ] }),
          s && /* @__PURE__ */ e("div", { className: "flex items-center", children: s })
        ] }),
        /* @__PURE__ */ e("div", { className: d("p-[10px]", l && "flex-1 flex flex-col"), children: i })
      ]
    }
  )
);
n.displayName = "DashboardCard";
export {
  n as DashboardCard
};
//# sourceMappingURL=dashboard-card.mjs.map
