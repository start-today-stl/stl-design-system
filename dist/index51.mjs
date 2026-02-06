import { jsxs as o, jsx as l } from "react/jsx-runtime";
import * as r from "react";
import { cn as p } from "./index105.mjs";
import { NavItem as f } from "./index53.mjs";
const w = r.forwardRef(
  ({
    className: u,
    icon: s,
    label: t,
    active: d,
    defaultExpanded: y = !1,
    expanded: c,
    onExpandedChange: i,
    collapsed: b,
    depth: n = 1,
    _inFlyout: N = !1,
    children: m,
    ...x
  }, g) => {
    const [h, k] = r.useState(y), a = c !== void 0 ? c : h, v = () => {
      const e = !a;
      k(e), i == null || i(e);
    };
    return N ? /* @__PURE__ */ o("div", { ref: g, className: p("flex flex-col gap-0.5", u), ...x, children: [
      /* @__PURE__ */ l(
        f,
        {
          icon: s,
          label: t,
          active: d,
          depth: n,
          hasChildren: !0,
          expanded: a,
          onClick: v
        }
      ),
      a && /* @__PURE__ */ l("div", { className: "flex flex-col gap-0.5", children: r.Children.map(m, (e) => r.isValidElement(e) ? r.cloneElement(e, {
        collapsed: !1,
        depth: (n || 1) + 1,
        _inFlyout: !0
      }) : e) })
    ] }) : b ? /* @__PURE__ */ o("div", { className: "relative group", children: [
      /* @__PURE__ */ l(
        f,
        {
          icon: s,
          label: t,
          active: d,
          collapsed: !0,
          hasChildren: !0
        }
      ),
      /* @__PURE__ */ o("div", { className: p(
        "absolute left-full top-0 ml-2 min-w-[200px] py-2 px-3 rounded-md",
        "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700",
        "shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible",
        "transition-all duration-200 z-50"
      ), children: [
        /* @__PURE__ */ l("div", { className: "text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 pb-2 border-b border-gray-100 dark:border-gray-700", children: t }),
        /* @__PURE__ */ l("div", { className: "flex flex-col gap-0.5", children: r.Children.map(m, (e) => r.isValidElement(e) ? r.cloneElement(e, {
          collapsed: !1,
          depth: 2,
          _inFlyout: !0
        }) : e) })
      ] })
    ] }) : /* @__PURE__ */ o("div", { ref: g, className: p("flex flex-col gap-0.5", u), ...x, children: [
      /* @__PURE__ */ l(
        f,
        {
          icon: s,
          label: t,
          active: d,
          depth: n,
          hasChildren: !0,
          expanded: a,
          onClick: v
        }
      ),
      a && /* @__PURE__ */ l("div", { className: "flex flex-col gap-0.5", children: m })
    ] });
  }
);
w.displayName = "NavGroup";
export {
  w as NavGroup
};
//# sourceMappingURL=index51.mjs.map
