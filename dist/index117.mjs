import * as u from "react";
import { composeEventHandlers as m } from "./index149.mjs";
import { composeRefs as K } from "./index148.mjs";
import { createContextScope as U } from "./index146.mjs";
import { useControllableState as g } from "./index150.mjs";
import { Primitive as B } from "./index151.mjs";
import { Root as F, Group as H, Portal as W, RadioGroup as $, Sub as j, Anchor as X, createMenuScope as D, CheckboxItem as q, ItemIndicator as z, Content as J, Item as Q, Label as V, RadioItem as Y, Separator as Z, SubContent as oo, SubTrigger as eo, Arrow as ro } from "./index175.mjs";
import { useId as M } from "./index153.mjs";
import { jsx as t } from "react/jsx-runtime";
var f = "DropdownMenu", [no] = U(
  f,
  [D]
), i = D(), [ao, _] = no(f), h = (o) => {
  const {
    __scopeDropdownMenu: n,
    children: r,
    dir: e,
    open: a,
    defaultOpen: d,
    onOpenChange: c,
    modal: p = !0
  } = o, s = i(n), v = u.useRef(null), [l, w] = g({
    prop: a,
    defaultProp: d ?? !1,
    onChange: c,
    caller: f
  });
  return /* @__PURE__ */ t(
    ao,
    {
      scope: n,
      triggerId: M(),
      triggerRef: v,
      contentId: M(),
      open: l,
      onOpenChange: w,
      onOpenToggle: u.useCallback(() => w((L) => !L), [w]),
      modal: p,
      children: /* @__PURE__ */ t(F, { ...s, open: l, onOpenChange: w, dir: e, modal: p, children: r })
    }
  );
};
h.displayName = f;
var R = "DropdownMenuTrigger", b = u.forwardRef(
  (o, n) => {
    const { __scopeDropdownMenu: r, disabled: e = !1, ...a } = o, d = _(R, r), c = i(r);
    return /* @__PURE__ */ t(X, { asChild: !0, ...c, children: /* @__PURE__ */ t(
      B.button,
      {
        type: "button",
        id: d.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": d.open,
        "aria-controls": d.open ? d.contentId : void 0,
        "data-state": d.open ? "open" : "closed",
        "data-disabled": e ? "" : void 0,
        disabled: e,
        ...a,
        ref: K(n, d.triggerRef),
        onPointerDown: m(o.onPointerDown, (p) => {
          !e && p.button === 0 && p.ctrlKey === !1 && (d.onOpenToggle(), d.open || p.preventDefault());
        }),
        onKeyDown: m(o.onKeyDown, (p) => {
          e || (["Enter", " "].includes(p.key) && d.onOpenToggle(), p.key === "ArrowDown" && d.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(p.key) && p.preventDefault());
        })
      }
    ) });
  }
);
b.displayName = R;
var to = "DropdownMenuPortal", I = (o) => {
  const { __scopeDropdownMenu: n, ...r } = o, e = i(n);
  return /* @__PURE__ */ t(W, { ...e, ...r });
};
I.displayName = to;
var S = "DropdownMenuContent", C = u.forwardRef(
  (o, n) => {
    const { __scopeDropdownMenu: r, ...e } = o, a = _(S, r), d = i(r), c = u.useRef(!1);
    return /* @__PURE__ */ t(
      J,
      {
        id: a.contentId,
        "aria-labelledby": a.triggerId,
        ...d,
        ...e,
        ref: n,
        onCloseAutoFocus: m(o.onCloseAutoFocus, (p) => {
          var s;
          c.current || (s = a.triggerRef.current) == null || s.focus(), c.current = !1, p.preventDefault();
        }),
        onInteractOutside: m(o.onInteractOutside, (p) => {
          const s = p.detail.originalEvent, v = s.button === 0 && s.ctrlKey === !0, l = s.button === 2 || v;
          (!a.modal || l) && (c.current = !0);
        }),
        style: {
          ...o.style,
          "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
          "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
          "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    );
  }
);
C.displayName = S;
var po = "DropdownMenuGroup", N = u.forwardRef(
  (o, n) => {
    const { __scopeDropdownMenu: r, ...e } = o, a = i(r);
    return /* @__PURE__ */ t(H, { ...a, ...e, ref: n });
  }
);
N.displayName = po;
var uo = "DropdownMenuLabel", x = u.forwardRef(
  (o, n) => {
    const { __scopeDropdownMenu: r, ...e } = o, a = i(r);
    return /* @__PURE__ */ t(V, { ...a, ...e, ref: n });
  }
);
x.displayName = uo;
var io = "DropdownMenuItem", A = u.forwardRef(
  (o, n) => {
    const { __scopeDropdownMenu: r, ...e } = o, a = i(r);
    return /* @__PURE__ */ t(Q, { ...a, ...e, ref: n });
  }
);
A.displayName = io;
var so = "DropdownMenuCheckboxItem", P = u.forwardRef((o, n) => {
  const { __scopeDropdownMenu: r, ...e } = o, a = i(r);
  return /* @__PURE__ */ t(q, { ...a, ...e, ref: n });
});
P.displayName = so;
var co = "DropdownMenuRadioGroup", E = u.forwardRef((o, n) => {
  const { __scopeDropdownMenu: r, ...e } = o, a = i(r);
  return /* @__PURE__ */ t($, { ...a, ...e, ref: n });
});
E.displayName = co;
var lo = "DropdownMenuRadioItem", O = u.forwardRef((o, n) => {
  const { __scopeDropdownMenu: r, ...e } = o, a = i(r);
  return /* @__PURE__ */ t(Y, { ...a, ...e, ref: n });
});
O.displayName = lo;
var wo = "DropdownMenuItemIndicator", y = u.forwardRef((o, n) => {
  const { __scopeDropdownMenu: r, ...e } = o, a = i(r);
  return /* @__PURE__ */ t(z, { ...a, ...e, ref: n });
});
y.displayName = wo;
var mo = "DropdownMenuSeparator", T = u.forwardRef((o, n) => {
  const { __scopeDropdownMenu: r, ...e } = o, a = i(r);
  return /* @__PURE__ */ t(Z, { ...a, ...e, ref: n });
});
T.displayName = mo;
var fo = "DropdownMenuArrow", vo = u.forwardRef(
  (o, n) => {
    const { __scopeDropdownMenu: r, ...e } = o, a = i(r);
    return /* @__PURE__ */ t(ro, { ...a, ...e, ref: n });
  }
);
vo.displayName = fo;
var Mo = (o) => {
  const { __scopeDropdownMenu: n, children: r, open: e, onOpenChange: a, defaultOpen: d } = o, c = i(n), [p, s] = g({
    prop: e,
    defaultProp: d ?? !1,
    onChange: a,
    caller: "DropdownMenuSub"
  });
  return /* @__PURE__ */ t(j, { ...c, open: p, onOpenChange: s, children: r });
}, go = "DropdownMenuSubTrigger", G = u.forwardRef((o, n) => {
  const { __scopeDropdownMenu: r, ...e } = o, a = i(r);
  return /* @__PURE__ */ t(eo, { ...a, ...e, ref: n });
});
G.displayName = go;
var Do = "DropdownMenuSubContent", k = u.forwardRef((o, n) => {
  const { __scopeDropdownMenu: r, ...e } = o, a = i(r);
  return /* @__PURE__ */ t(
    oo,
    {
      ...a,
      ...e,
      ref: n,
      style: {
        ...o.style,
        "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
});
k.displayName = Do;
var xo = h, Ao = b, Po = I, Eo = C, Oo = N, yo = x, To = A, Go = P, ko = E, Lo = O, Ko = y, Uo = T, Bo = Mo, Fo = G, Ho = k;
export {
  Go as CheckboxItem,
  Eo as Content,
  h as DropdownMenu,
  vo as DropdownMenuArrow,
  P as DropdownMenuCheckboxItem,
  C as DropdownMenuContent,
  N as DropdownMenuGroup,
  A as DropdownMenuItem,
  y as DropdownMenuItemIndicator,
  x as DropdownMenuLabel,
  I as DropdownMenuPortal,
  E as DropdownMenuRadioGroup,
  O as DropdownMenuRadioItem,
  T as DropdownMenuSeparator,
  Mo as DropdownMenuSub,
  k as DropdownMenuSubContent,
  G as DropdownMenuSubTrigger,
  b as DropdownMenuTrigger,
  Oo as Group,
  To as Item,
  Ko as ItemIndicator,
  yo as Label,
  Po as Portal,
  ko as RadioGroup,
  Lo as RadioItem,
  xo as Root,
  Uo as Separator,
  Bo as Sub,
  Ho as SubContent,
  Fo as SubTrigger,
  Ao as Trigger
};
//# sourceMappingURL=index117.mjs.map
