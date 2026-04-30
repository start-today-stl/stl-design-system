import { jsxs as n, jsx as t } from "react/jsx-runtime";
import * as r from "react";
import * as o from "@radix-ui/react-popover";
import { cn as h } from "../lib/utils.mjs";
import { NavItem as p } from "./nav-item.mjs";
const S = h(
  "min-w-[200px] py-2 px-3 rounded-md z-50",
  "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700",
  "shadow-lg",
  "transition-all duration-150 ease-out",
  "data-[state=open]:animate-in data-[state=closed]:animate-out",
  "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  "data-[state=closed]:zoom-out-98 data-[state=open]:zoom-in-98",
  "data-[side=bottom]:slide-in-from-top-1 data-[side=right]:slide-in-from-left-1"
), P = r.forwardRef(
  ({
    className: v,
    icon: d,
    label: a,
    active: i,
    defaultExpanded: T = !1,
    expanded: y,
    onExpandedChange: x,
    collapsed: u,
    layout: A = "vertical",
    depth: b = 1,
    _inFlyout: F = !1,
    children: C,
    ...N
  }, g) => {
    const [R, z] = r.useState(T), l = y !== void 0 ? y : R, [E, M] = r.useState(!1), s = r.useRef(null), c = () => {
      s.current && (clearTimeout(s.current), s.current = null), M(!0);
    }, f = () => {
      s.current = setTimeout(() => {
        M(!1);
      }, 30);
    }, [D, L] = r.useState(u);
    r.useEffect(() => {
      const e = setTimeout(() => L(u), 300);
      return () => clearTimeout(e);
    }, [u]), r.useEffect(() => () => {
      s.current && clearTimeout(s.current);
    }, []);
    const k = () => {
      const e = !l;
      z(e), x == null || x(e);
    }, w = (e, O) => r.Children.map(C, (m) => r.isValidElement(m) && typeof m.type != "string" ? r.cloneElement(m, {
      layout: "vertical",
      depth: O,
      _inFlyout: e,
      collapsed: !1
    }) : m);
    return A === "horizontal" ? /* @__PURE__ */ n(o.Root, { open: E, children: [
      /* @__PURE__ */ t(o.Anchor, { asChild: !0, children: /* @__PURE__ */ t(
        "div",
        {
          ref: g,
          className: h("relative", v),
          onMouseEnter: c,
          onMouseLeave: f,
          ...N,
          children: /* @__PURE__ */ t(
            p,
            {
              icon: d,
              label: a,
              active: i,
              layout: "horizontal",
              hasChildren: !0
            }
          )
        }
      ) }),
      /* @__PURE__ */ t(o.Portal, { children: /* @__PURE__ */ n(
        o.Content,
        {
          className: S,
          sideOffset: 4,
          align: "start",
          onMouseEnter: c,
          onMouseLeave: f,
          onOpenAutoFocus: (e) => e.preventDefault(),
          onCloseAutoFocus: (e) => e.preventDefault(),
          children: [
            /* @__PURE__ */ t("div", { className: "text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 pb-2 border-b border-slate-100 dark:border-slate-700", children: a }),
            /* @__PURE__ */ t("div", { className: "flex flex-col gap-0.5", children: w(!0, 2) })
          ]
        }
      ) })
    ] }) : F ? /* @__PURE__ */ n("div", { ref: g, className: h("flex flex-col gap-0.5", v), ...N, children: [
      /* @__PURE__ */ t(
        p,
        {
          icon: d,
          label: a,
          active: i,
          depth: b,
          hasChildren: !0,
          expanded: l,
          onClick: k
        }
      ),
      l && /* @__PURE__ */ t("div", { className: "flex flex-col gap-0.5", children: r.Children.map(C, (e) => r.isValidElement(e) && typeof e.type != "string" ? r.cloneElement(e, {
        collapsed: !1,
        depth: (b || 1) + 1,
        _inFlyout: !0
      }) : e) })
    ] }) : u ? /* @__PURE__ */ n(o.Root, { open: E, children: [
      /* @__PURE__ */ t(o.Anchor, { asChild: !0, children: /* @__PURE__ */ t(
        "div",
        {
          className: "relative w-full",
          onMouseEnter: c,
          onMouseLeave: f,
          children: /* @__PURE__ */ t(
            p,
            {
              icon: d,
              label: a,
              active: i,
              collapsed: !0,
              hasChildren: !0
            }
          )
        }
      ) }),
      D && /* @__PURE__ */ t(o.Portal, { children: /* @__PURE__ */ n(
        o.Content,
        {
          className: S,
          side: "right",
          sideOffset: 16,
          align: "start",
          onMouseEnter: c,
          onMouseLeave: f,
          onOpenAutoFocus: (e) => e.preventDefault(),
          onCloseAutoFocus: (e) => e.preventDefault(),
          children: [
            /* @__PURE__ */ t("div", { className: "text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 pb-2 border-b border-slate-100 dark:border-slate-700", children: a }),
            /* @__PURE__ */ t("div", { className: "flex flex-col gap-0.5", children: w(!0, 2) })
          ]
        }
      ) })
    ] }) : /* @__PURE__ */ n("div", { ref: g, className: h("flex flex-col gap-0.5", v), ...N, children: [
      /* @__PURE__ */ t(
        p,
        {
          icon: d,
          label: a,
          active: i,
          depth: b,
          hasChildren: !0,
          expanded: l,
          onClick: k
        }
      ),
      l && /* @__PURE__ */ t("div", { className: "flex flex-col gap-0.5", children: C })
    ] });
  }
);
P.displayName = "NavGroup";
export {
  P as NavGroup
};
//# sourceMappingURL=nav-group.mjs.map
