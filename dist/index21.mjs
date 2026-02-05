import { jsxs as e, jsx as r } from "react/jsx-runtime";
import * as m from "react";
import { cn as x } from "./index104.mjs";
const n = m.forwardRef(
  ({ className: d, icon: a, title: t, headerAction: s, children: i, ...c }, l) => /* @__PURE__ */ e(
    "div",
    {
      ref: l,
      className: x(
        "bg-white border border-gray-100 rounded-[10px] dark:bg-dark-400 dark:border-dark-300",
        d
      ),
      ...c,
      children: [
        /* @__PURE__ */ e("div", { className: "flex items-center justify-between px-[10px] pt-[10px]", children: [
          /* @__PURE__ */ e("div", { className: "flex items-center gap-0.5", children: [
            a && /* @__PURE__ */ r("span", { className: "flex-shrink-0 text-gray-700 dark:text-gray-100", children: a }),
            /* @__PURE__ */ r("span", { className: "text-sm tracking-[-0.14px] text-gray-700 dark:text-gray-100", children: t })
          ] }),
          s && /* @__PURE__ */ r("div", { className: "flex items-center", children: s })
        ] }),
        /* @__PURE__ */ r("div", { className: "p-[10px]", children: i })
      ]
    }
  )
);
n.displayName = "DashboardCard";
export {
  n as DashboardCard
};
//# sourceMappingURL=index21.mjs.map
