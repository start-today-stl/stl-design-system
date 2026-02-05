import { jsxs as s, jsx as r } from "react/jsx-runtime";
import * as a from "react";
import { cn as c } from "./index104.mjs";
import { NavItem as n } from "./index52.mjs";
const k = a.forwardRef(
  ({
    className: f,
    icon: d,
    label: t,
    active: i,
    defaultExpanded: u = !1,
    expanded: m,
    onExpandedChange: l,
    collapsed: x,
    depth: g = 1,
    children: p,
    ...v
  }, b) => {
    const [y, N] = a.useState(u), o = m !== void 0 ? m : y, h = () => {
      const e = !o;
      N(e), l == null || l(e);
    };
    return x ? /* @__PURE__ */ s("div", { className: "relative group", children: [
      /* @__PURE__ */ r(
        n,
        {
          icon: d,
          label: t,
          active: i,
          collapsed: !0,
          hasChildren: !0
        }
      ),
      /* @__PURE__ */ s("div", { className: c(
        "absolute left-full top-0 ml-2 min-w-[200px] py-2 px-3 rounded-md",
        "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700",
        "shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible",
        "transition-all duration-200 z-50"
      ), children: [
        /* @__PURE__ */ r("div", { className: "text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 pb-2 border-b border-gray-100 dark:border-gray-700", children: t }),
        /* @__PURE__ */ r("div", { className: "flex flex-col gap-0.5", children: a.Children.map(p, (e) => a.isValidElement(e) ? a.cloneElement(e, {
          collapsed: !1,
          depth: 2
        }) : e) })
      ] })
    ] }) : /* @__PURE__ */ s("div", { ref: b, className: c("flex flex-col gap-0.5", f), ...v, children: [
      /* @__PURE__ */ r(
        n,
        {
          icon: d,
          label: t,
          active: i,
          depth: g,
          hasChildren: !0,
          expanded: o,
          onClick: h
        }
      ),
      o && /* @__PURE__ */ r("div", { className: "flex flex-col gap-0.5", children: p })
    ] });
  }
);
k.displayName = "NavGroup";
export {
  k as NavGroup
};
//# sourceMappingURL=index50.mjs.map
