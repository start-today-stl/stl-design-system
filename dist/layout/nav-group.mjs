import { jsxs as s, jsx as r } from "react/jsx-runtime";
import * as l from "react";
import { cn as f } from "../lib/utils.mjs";
import { NavItem as p } from "./nav-item.mjs";
const y = l.forwardRef(
  ({
    className: u,
    icon: o,
    label: a,
    active: d,
    defaultExpanded: N = !1,
    expanded: c,
    onExpandedChange: i,
    collapsed: h,
    depth: n = 1,
    _inFlyout: g = !1,
    children: m,
    ...x
  }, v) => {
    const [k, w] = l.useState(N), t = c !== void 0 ? c : k, b = () => {
      const e = !t;
      w(e), i == null || i(e);
    };
    return g ? /* @__PURE__ */ s("div", { ref: v, className: f("flex flex-col gap-0.5", u), ...x, children: [
      /* @__PURE__ */ r(
        p,
        {
          icon: o,
          label: a,
          active: d,
          depth: n,
          hasChildren: !0,
          expanded: t,
          onClick: b
        }
      ),
      t && /* @__PURE__ */ r("div", { className: "flex flex-col gap-0.5", children: l.Children.map(m, (e) => l.isValidElement(e) ? l.cloneElement(e, {
        collapsed: !1,
        depth: (n || 1) + 1,
        _inFlyout: !0
      }) : e) })
    ] }) : h ? /* @__PURE__ */ s("div", { className: "relative group w-full", children: [
      /* @__PURE__ */ r(
        p,
        {
          icon: o,
          label: a,
          active: d,
          collapsed: !0,
          hasChildren: !0
        }
      ),
      /* @__PURE__ */ s("div", { className: f(
        "absolute left-full top-0 ml-4 min-w-[200px] py-2 px-3 rounded-md",
        "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700",
        "shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible",
        "transition-all duration-200 z-50"
      ), children: [
        /* @__PURE__ */ r("div", { className: "text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 pb-2 border-b border-slate-100 dark:border-slate-700", children: a }),
        /* @__PURE__ */ r("div", { className: "flex flex-col gap-0.5", children: l.Children.map(m, (e) => l.isValidElement(e) ? l.cloneElement(e, {
          collapsed: !1,
          depth: 2,
          _inFlyout: !0
        }) : e) })
      ] })
    ] }) : /* @__PURE__ */ s("div", { ref: v, className: f("flex flex-col gap-0.5", u), ...x, children: [
      /* @__PURE__ */ r(
        p,
        {
          icon: o,
          label: a,
          active: d,
          depth: n,
          hasChildren: !0,
          expanded: t,
          onClick: b
        }
      ),
      t && /* @__PURE__ */ r("div", { className: "flex flex-col gap-0.5", children: m })
    ] });
  }
);
y.displayName = "NavGroup";
export {
  y as NavGroup
};
//# sourceMappingURL=nav-group.mjs.map
