import { jsxs as s, jsx as e } from "react/jsx-runtime";
import * as a from "react";
import * as r from "@radix-ui/react-hover-card";
import { cn as c } from "../lib/utils.mjs";
import { NavItem as m } from "./nav-item.mjs";
const y = c(
  "min-w-[200px] py-2 px-3 rounded-md z-50",
  "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700",
  "shadow-lg",
  "data-[state=open]:animate-in data-[state=closed]:animate-out",
  "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
  "data-[side=bottom]:slide-in-from-top-2 data-[side=right]:slide-in-from-left-2"
), j = a.forwardRef(
  ({
    className: f,
    icon: o,
    label: l,
    active: i,
    defaultExpanded: k = !1,
    expanded: g,
    onExpandedChange: u,
    collapsed: n,
    layout: w = "vertical",
    depth: p = 1,
    _inFlyout: S = !1,
    children: h,
    ...x
  }, v) => {
    const [z, D] = a.useState(k), d = g !== void 0 ? g : z, [T, E] = a.useState(n);
    a.useEffect(() => {
      const t = setTimeout(() => E(n), 300);
      return () => clearTimeout(t);
    }, [n]);
    const N = () => {
      const t = !d;
      D(t), u == null || u(t);
    }, C = (t, R) => a.Children.map(h, (b) => a.isValidElement(b) ? a.cloneElement(b, {
      layout: "vertical",
      depth: R,
      _inFlyout: t,
      collapsed: !1
    }) : b);
    return w === "horizontal" ? /* @__PURE__ */ s(r.Root, { openDelay: 0, closeDelay: 50, children: [
      /* @__PURE__ */ e(r.Trigger, { asChild: !0, children: /* @__PURE__ */ e("div", { ref: v, className: c("relative", f), ...x, children: /* @__PURE__ */ e(
        m,
        {
          icon: o,
          label: l,
          active: i,
          layout: "horizontal",
          hasChildren: !0
        }
      ) }) }),
      /* @__PURE__ */ e(r.Portal, { children: /* @__PURE__ */ s(
        r.Content,
        {
          className: y,
          sideOffset: 4,
          align: "start",
          children: [
            /* @__PURE__ */ e("div", { className: "text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 pb-2 border-b border-slate-100 dark:border-slate-700", children: l }),
            /* @__PURE__ */ e("div", { className: "flex flex-col gap-0.5", children: C(!0, 2) })
          ]
        }
      ) })
    ] }) : S ? /* @__PURE__ */ s("div", { ref: v, className: c("flex flex-col gap-0.5", f), ...x, children: [
      /* @__PURE__ */ e(
        m,
        {
          icon: o,
          label: l,
          active: i,
          depth: p,
          hasChildren: !0,
          expanded: d,
          onClick: N
        }
      ),
      d && /* @__PURE__ */ e("div", { className: "flex flex-col gap-0.5", children: a.Children.map(h, (t) => a.isValidElement(t) ? a.cloneElement(t, {
        collapsed: !1,
        depth: (p || 1) + 1,
        _inFlyout: !0
      }) : t) })
    ] }) : n ? /* @__PURE__ */ s(r.Root, { openDelay: 0, closeDelay: 50, children: [
      /* @__PURE__ */ e(r.Trigger, { asChild: !0, children: /* @__PURE__ */ e("div", { className: "relative w-full", children: /* @__PURE__ */ e(
        m,
        {
          icon: o,
          label: l,
          active: i,
          collapsed: !0,
          hasChildren: !0
        }
      ) }) }),
      T && /* @__PURE__ */ e(r.Portal, { children: /* @__PURE__ */ s(
        r.Content,
        {
          className: y,
          side: "right",
          sideOffset: 16,
          align: "start",
          children: [
            /* @__PURE__ */ e("div", { className: "text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 pb-2 border-b border-slate-100 dark:border-slate-700", children: l }),
            /* @__PURE__ */ e("div", { className: "flex flex-col gap-0.5", children: C(!0, 2) })
          ]
        }
      ) })
    ] }) : /* @__PURE__ */ s("div", { ref: v, className: c("flex flex-col gap-0.5", f), ...x, children: [
      /* @__PURE__ */ e(
        m,
        {
          icon: o,
          label: l,
          active: i,
          depth: p,
          hasChildren: !0,
          expanded: d,
          onClick: N
        }
      ),
      d && /* @__PURE__ */ e("div", { className: "flex flex-col gap-0.5", children: h })
    ] });
  }
);
j.displayName = "NavGroup";
export {
  j as NavGroup
};
//# sourceMappingURL=nav-group.mjs.map
