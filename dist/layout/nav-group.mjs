import { jsxs as a, jsx as r } from "react/jsx-runtime";
import * as t from "react";
import { cn as o } from "../lib/utils.mjs";
import { NavItem as m } from "./nav-item.mjs";
const S = t.forwardRef(
  ({
    className: p,
    icon: i,
    label: l,
    active: d,
    defaultExpanded: g = !1,
    expanded: v,
    onExpandedChange: f,
    collapsed: n,
    layout: N = "vertical",
    depth: c = 1,
    _inFlyout: y = !1,
    children: u,
    ...x
  }, b) => {
    const [k, w] = t.useState(g), s = v !== void 0 ? v : k, [C, E] = t.useState(n);
    t.useEffect(() => {
      const e = setTimeout(() => E(n), 300);
      return () => clearTimeout(e);
    }, [n]);
    const h = () => {
      const e = !s;
      w(e), f == null || f(e);
    };
    return N === "horizontal" ? /* @__PURE__ */ a("div", { ref: b, className: o("relative group", p), ...x, children: [
      /* @__PURE__ */ r(
        m,
        {
          icon: i,
          label: l,
          active: d,
          layout: "horizontal",
          hasChildren: !0
        }
      ),
      /* @__PURE__ */ a("div", { className: o(
        "absolute top-full left-0 mt-1 min-w-[200px] py-2 px-3 rounded-md",
        "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700",
        "shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible",
        "transition-all duration-200 z-50"
      ), children: [
        /* @__PURE__ */ r("div", { className: "text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 pb-2 border-b border-slate-100 dark:border-slate-700", children: l }),
        /* @__PURE__ */ r("div", { className: "flex flex-col gap-0.5", children: t.Children.map(u, (e) => t.isValidElement(e) ? t.cloneElement(e, {
          layout: "vertical",
          // 드롭다운 내부는 vertical
          depth: 2,
          _inFlyout: !0
        }) : e) })
      ] })
    ] }) : y ? /* @__PURE__ */ a("div", { ref: b, className: o("flex flex-col gap-0.5", p), ...x, children: [
      /* @__PURE__ */ r(
        m,
        {
          icon: i,
          label: l,
          active: d,
          depth: c,
          hasChildren: !0,
          expanded: s,
          onClick: h
        }
      ),
      s && /* @__PURE__ */ r("div", { className: "flex flex-col gap-0.5", children: t.Children.map(u, (e) => t.isValidElement(e) ? t.cloneElement(e, {
        collapsed: !1,
        depth: (c || 1) + 1,
        _inFlyout: !0
      }) : e) })
    ] }) : n ? /* @__PURE__ */ a("div", { className: "relative group w-full", children: [
      /* @__PURE__ */ r(
        m,
        {
          icon: i,
          label: l,
          active: d,
          collapsed: !0,
          hasChildren: !0
        }
      ),
      C && /* @__PURE__ */ a("div", { className: o(
        "absolute left-full top-0 ml-4 min-w-[200px] py-2 px-3 rounded-md",
        "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700",
        "shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible",
        "transition-all duration-200 z-50"
      ), children: [
        /* @__PURE__ */ r("div", { className: "text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 pb-2 border-b border-slate-100 dark:border-slate-700", children: l }),
        /* @__PURE__ */ r("div", { className: "flex flex-col gap-0.5", children: t.Children.map(u, (e) => t.isValidElement(e) ? t.cloneElement(e, {
          collapsed: !1,
          depth: 2,
          _inFlyout: !0
        }) : e) })
      ] })
    ] }) : /* @__PURE__ */ a("div", { ref: b, className: o("flex flex-col gap-0.5", p), ...x, children: [
      /* @__PURE__ */ r(
        m,
        {
          icon: i,
          label: l,
          active: d,
          depth: c,
          hasChildren: !0,
          expanded: s,
          onClick: h
        }
      ),
      s && /* @__PURE__ */ r("div", { className: "flex flex-col gap-0.5", children: u })
    ] });
  }
);
S.displayName = "NavGroup";
export {
  S as NavGroup
};
//# sourceMappingURL=nav-group.mjs.map
