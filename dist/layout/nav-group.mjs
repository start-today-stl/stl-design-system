import { jsxs as n, jsx as t } from "react/jsx-runtime";
import * as r from "react";
import * as o from "@radix-ui/react-popover";
import { cn as p } from "../lib/utils.mjs";
import { NavItem as f } from "./nav-item.mjs";
const S = p(
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
    className: h,
    icon: d,
    label: a,
    active: i,
    defaultExpanded: T = !1,
    expanded: E,
    onExpandedChange: v,
    collapsed: u,
    layout: A = "vertical",
    depth: x = 1,
    _inFlyout: F = !1,
    children: b,
    ...C
  }, N) => {
    const [R, z] = r.useState(T), l = E !== void 0 ? E : R, [M, k] = r.useState(!1), s = r.useRef(null), c = () => {
      s.current && (clearTimeout(s.current), s.current = null), k(!0);
    }, m = () => {
      s.current = setTimeout(() => {
        k(!1);
      }, 30);
    }, [D, L] = r.useState(u);
    r.useEffect(() => {
      const e = setTimeout(() => L(u), 300);
      return () => clearTimeout(e);
    }, [u]), r.useEffect(() => () => {
      s.current && clearTimeout(s.current);
    }, []);
    const w = () => {
      const e = !l;
      z(e), v == null || v(e);
    }, y = (e, O) => r.Children.map(b, (g) => r.isValidElement(g) ? r.cloneElement(g, {
      layout: "vertical",
      depth: O,
      _inFlyout: e,
      collapsed: !1
    }) : g);
    return A === "horizontal" ? /* @__PURE__ */ n(o.Root, { open: M, children: [
      /* @__PURE__ */ t(o.Anchor, { asChild: !0, children: /* @__PURE__ */ t(
        "div",
        {
          ref: N,
          className: p("relative", h),
          onMouseEnter: c,
          onMouseLeave: m,
          ...C,
          children: /* @__PURE__ */ t(
            f,
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
          onMouseLeave: m,
          onOpenAutoFocus: (e) => e.preventDefault(),
          onCloseAutoFocus: (e) => e.preventDefault(),
          children: [
            /* @__PURE__ */ t("div", { className: "text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 pb-2 border-b border-slate-100 dark:border-slate-700", children: a }),
            /* @__PURE__ */ t("div", { className: "flex flex-col gap-0.5", children: y(!0, 2) })
          ]
        }
      ) })
    ] }) : F ? /* @__PURE__ */ n("div", { ref: N, className: p("flex flex-col gap-0.5", h), ...C, children: [
      /* @__PURE__ */ t(
        f,
        {
          icon: d,
          label: a,
          active: i,
          depth: x,
          hasChildren: !0,
          expanded: l,
          onClick: w
        }
      ),
      l && /* @__PURE__ */ t("div", { className: "flex flex-col gap-0.5", children: r.Children.map(b, (e) => r.isValidElement(e) ? r.cloneElement(e, {
        collapsed: !1,
        depth: (x || 1) + 1,
        _inFlyout: !0
      }) : e) })
    ] }) : u ? /* @__PURE__ */ n(o.Root, { open: M, children: [
      /* @__PURE__ */ t(o.Anchor, { asChild: !0, children: /* @__PURE__ */ t(
        "div",
        {
          className: "relative w-full",
          onMouseEnter: c,
          onMouseLeave: m,
          children: /* @__PURE__ */ t(
            f,
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
          onMouseLeave: m,
          onOpenAutoFocus: (e) => e.preventDefault(),
          onCloseAutoFocus: (e) => e.preventDefault(),
          children: [
            /* @__PURE__ */ t("div", { className: "text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 pb-2 border-b border-slate-100 dark:border-slate-700", children: a }),
            /* @__PURE__ */ t("div", { className: "flex flex-col gap-0.5", children: y(!0, 2) })
          ]
        }
      ) })
    ] }) : /* @__PURE__ */ n("div", { ref: N, className: p("flex flex-col gap-0.5", h), ...C, children: [
      /* @__PURE__ */ t(
        f,
        {
          icon: d,
          label: a,
          active: i,
          depth: x,
          hasChildren: !0,
          expanded: l,
          onClick: w
        }
      ),
      l && /* @__PURE__ */ t("div", { className: "flex flex-col gap-0.5", children: b })
    ] });
  }
);
P.displayName = "NavGroup";
export {
  P as NavGroup
};
//# sourceMappingURL=nav-group.mjs.map
