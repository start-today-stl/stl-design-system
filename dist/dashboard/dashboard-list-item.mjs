import { jsxs as m, jsx as r } from "react/jsx-runtime";
import * as o from "react";
import { cn as n } from "../lib/utils.mjs";
const p = o.forwardRef(
  ({ className: a, date: e, title: s, extra: t, ...i }, x) => /* @__PURE__ */ m(
    "div",
    {
      ref: x,
      className: n(
        "flex items-center gap-[22px] h-[28px] px-[10px] cursor-pointer transition-colors",
        "hover:bg-primary-100 dark:hover:bg-dark-300",
        a
      ),
      ...i,
      children: [
        /* @__PURE__ */ r("span", { className: "w-[108px] shrink-0 text-sm text-gray-400 dark:text-gray-300", children: e }),
        /* @__PURE__ */ r("span", { className: "flex-1 text-sm text-gray-700 truncate dark:text-gray-100", children: s }),
        t && /* @__PURE__ */ r("span", { className: "shrink-0 text-sm text-gray-400 text-right dark:text-gray-300", children: t })
      ]
    }
  )
);
p.displayName = "DashboardListItem";
export {
  p as DashboardListItem
};
//# sourceMappingURL=dashboard-list-item.mjs.map
