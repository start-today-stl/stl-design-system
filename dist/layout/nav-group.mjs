import { jsxs as a, jsx as l } from "react/jsx-runtime";
import * as r from "react";
import { cn as i } from "../lib/utils.mjs";
import { NavItem as m } from "./nav-item.mjs";
const C = r.forwardRef(
  ({
    className: u,
    icon: s,
    label: t,
    active: d,
    defaultExpanded: h = !1,
    expanded: v,
    onExpandedChange: p,
    collapsed: g,
    layout: N = "vertical",
    depth: c = 1,
    _inFlyout: y = !1,
    children: n,
    ...f
  }, x) => {
    const [k, w] = r.useState(h), o = v !== void 0 ? v : k, b = () => {
      const e = !o;
      w(e), p == null || p(e);
    };
    return N === "horizontal" ? /* @__PURE__ */ a("div", { ref: x, className: i("relative group", u), ...f, children: [
      /* @__PURE__ */ l(
        m,
        {
          icon: s,
          label: t,
          active: d,
          layout: "horizontal",
          hasChildren: !0
        }
      ),
      /* @__PURE__ */ a("div", { className: i(
        "absolute top-full left-0 mt-1 min-w-[200px] py-2 px-3 rounded-md",
        "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700",
        "shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible",
        "transition-all duration-200 z-50"
      ), children: [
        /* @__PURE__ */ l("div", { className: "text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 pb-2 border-b border-slate-100 dark:border-slate-700", children: t }),
        /* @__PURE__ */ l("div", { className: "flex flex-col gap-0.5", children: r.Children.map(n, (e) => r.isValidElement(e) ? r.cloneElement(e, {
          layout: "vertical",
          // 드롭다운 내부는 vertical
          depth: 2,
          _inFlyout: !0
        }) : e) })
      ] })
    ] }) : y ? /* @__PURE__ */ a("div", { ref: x, className: i("flex flex-col gap-0.5", u), ...f, children: [
      /* @__PURE__ */ l(
        m,
        {
          icon: s,
          label: t,
          active: d,
          depth: c,
          hasChildren: !0,
          expanded: o,
          onClick: b
        }
      ),
      o && /* @__PURE__ */ l("div", { className: "flex flex-col gap-0.5", children: r.Children.map(n, (e) => r.isValidElement(e) ? r.cloneElement(e, {
        collapsed: !1,
        depth: (c || 1) + 1,
        _inFlyout: !0
      }) : e) })
    ] }) : g ? /* @__PURE__ */ a("div", { className: "relative group w-full", children: [
      /* @__PURE__ */ l(
        m,
        {
          icon: s,
          label: t,
          active: d,
          collapsed: !0,
          hasChildren: !0
        }
      ),
      /* @__PURE__ */ a("div", { className: i(
        "absolute left-full top-0 ml-4 min-w-[200px] py-2 px-3 rounded-md",
        "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700",
        "shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible",
        "transition-all duration-200 z-50"
      ), children: [
        /* @__PURE__ */ l("div", { className: "text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 pb-2 border-b border-slate-100 dark:border-slate-700", children: t }),
        /* @__PURE__ */ l("div", { className: "flex flex-col gap-0.5", children: r.Children.map(n, (e) => r.isValidElement(e) ? r.cloneElement(e, {
          collapsed: !1,
          depth: 2,
          _inFlyout: !0
        }) : e) })
      ] })
    ] }) : /* @__PURE__ */ a("div", { ref: x, className: i("flex flex-col gap-0.5", u), ...f, children: [
      /* @__PURE__ */ l(
        m,
        {
          icon: s,
          label: t,
          active: d,
          depth: c,
          hasChildren: !0,
          expanded: o,
          onClick: b
        }
      ),
      o && /* @__PURE__ */ l("div", { className: "flex flex-col gap-0.5", children: n })
    ] });
  }
);
C.displayName = "NavGroup";
export {
  C as NavGroup
};
//# sourceMappingURL=nav-group.mjs.map
