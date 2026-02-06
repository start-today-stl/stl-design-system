import * as s from "react";
import { composeEventHandlers as g } from "./index144.mjs";
import { useComposedRefs as H } from "./index143.mjs";
import { createContextScope as Y } from "./index142.mjs";
import { DismissableLayer as q } from "./index160.mjs";
import { useId as X } from "./index155.mjs";
import { Root as K, Anchor as W, createPopperScope as N, Content as z, Arrow as J } from "./index178.mjs";
import { Presence as Q } from "./index159.mjs";
import { Primitive as Z } from "./index153.mjs";
import { createSlottable as $ } from "./index262.mjs";
import { useControllableState as ee } from "./index152.mjs";
import { Root as te } from "./index180.mjs";
import { jsx as h, jsxs as oe } from "react/jsx-runtime";
var [_] = Y("Tooltip", [
  N
]), D = N(), S = "TooltipProvider", re = 700, L = "tooltip.open", [ne, k] = _(S), G = (t) => {
  const {
    __scopeTooltip: o,
    delayDuration: e = re,
    skipDelayDuration: r = 300,
    disableHoverableContent: n = !1,
    children: l
  } = t, a = s.useRef(!0), f = s.useRef(!1), i = s.useRef(0);
  return s.useEffect(() => {
    const p = i.current;
    return () => window.clearTimeout(p);
  }, []), /* @__PURE__ */ h(
    ne,
    {
      scope: o,
      isOpenDelayedRef: a,
      delayDuration: e,
      onOpen: s.useCallback(() => {
        window.clearTimeout(i.current), a.current = !1;
      }, []),
      onClose: s.useCallback(() => {
        window.clearTimeout(i.current), i.current = window.setTimeout(
          () => a.current = !0,
          r
        );
      }, [r]),
      isPointerInTransitRef: f,
      onPointerInTransitChange: s.useCallback((p) => {
        f.current = p;
      }, []),
      disableHoverableContent: n,
      children: l
    }
  );
};
G.displayName = S;
var P = "Tooltip", [se, O] = _(P), j = (t) => {
  const {
    __scopeTooltip: o,
    children: e,
    open: r,
    defaultOpen: n,
    onOpenChange: l,
    disableHoverableContent: a,
    delayDuration: f
  } = t, i = k(P, t.__scopeTooltip), p = D(o), [c, d] = s.useState(null), v = X(), u = s.useRef(0), m = a ?? i.disableHoverableContent, y = f ?? i.delayDuration, T = s.useRef(!1), [x, C] = ee({
    prop: r,
    defaultProp: n ?? !1,
    onChange: (M) => {
      M ? (i.onOpen(), document.dispatchEvent(new CustomEvent(L))) : i.onClose(), l == null || l(M);
    },
    caller: P
  }), w = s.useMemo(() => x ? T.current ? "delayed-open" : "instant-open" : "closed", [x]), E = s.useCallback(() => {
    window.clearTimeout(u.current), u.current = 0, T.current = !1, C(!0);
  }, [C]), R = s.useCallback(() => {
    window.clearTimeout(u.current), u.current = 0, C(!1);
  }, [C]), I = s.useCallback(() => {
    window.clearTimeout(u.current), u.current = window.setTimeout(() => {
      T.current = !0, C(!0), u.current = 0;
    }, y);
  }, [y, C]);
  return s.useEffect(() => () => {
    u.current && (window.clearTimeout(u.current), u.current = 0);
  }, []), /* @__PURE__ */ h(K, { ...p, children: /* @__PURE__ */ h(
    se,
    {
      scope: o,
      contentId: v,
      open: x,
      stateAttribute: w,
      trigger: c,
      onTriggerChange: d,
      onTriggerEnter: s.useCallback(() => {
        i.isOpenDelayedRef.current ? I() : E();
      }, [i.isOpenDelayedRef, I, E]),
      onTriggerLeave: s.useCallback(() => {
        m ? R() : (window.clearTimeout(u.current), u.current = 0);
      }, [R, m]),
      onOpen: E,
      onClose: R,
      disableHoverableContent: m,
      children: e
    }
  ) });
};
j.displayName = P;
var A = "TooltipTrigger", F = s.forwardRef(
  (t, o) => {
    const { __scopeTooltip: e, ...r } = t, n = O(A, e), l = k(A, e), a = D(e), f = s.useRef(null), i = H(o, f, n.onTriggerChange), p = s.useRef(!1), c = s.useRef(!1), d = s.useCallback(() => p.current = !1, []);
    return s.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), /* @__PURE__ */ h(W, { asChild: !0, ...a, children: /* @__PURE__ */ h(
      Z.button,
      {
        "aria-describedby": n.open ? n.contentId : void 0,
        "data-state": n.stateAttribute,
        ...r,
        ref: i,
        onPointerMove: g(t.onPointerMove, (v) => {
          v.pointerType !== "touch" && !c.current && !l.isPointerInTransitRef.current && (n.onTriggerEnter(), c.current = !0);
        }),
        onPointerLeave: g(t.onPointerLeave, () => {
          n.onTriggerLeave(), c.current = !1;
        }),
        onPointerDown: g(t.onPointerDown, () => {
          n.open && n.onClose(), p.current = !0, document.addEventListener("pointerup", d, { once: !0 });
        }),
        onFocus: g(t.onFocus, () => {
          p.current || n.onOpen();
        }),
        onBlur: g(t.onBlur, n.onClose),
        onClick: g(t.onClick, n.onClose)
      }
    ) });
  }
);
F.displayName = A;
var ie = "TooltipPortal", [Ae, ae] = _(ie, {
  forceMount: void 0
}), b = "TooltipContent", B = s.forwardRef(
  (t, o) => {
    const e = ae(b, t.__scopeTooltip), { forceMount: r = e.forceMount, side: n = "top", ...l } = t, a = O(b, t.__scopeTooltip);
    return /* @__PURE__ */ h(Q, { present: r || a.open, children: a.disableHoverableContent ? /* @__PURE__ */ h(U, { side: n, ...l, ref: o }) : /* @__PURE__ */ h(le, { side: n, ...l, ref: o }) });
  }
), le = s.forwardRef((t, o) => {
  const e = O(b, t.__scopeTooltip), r = k(b, t.__scopeTooltip), n = s.useRef(null), l = H(o, n), [a, f] = s.useState(null), { trigger: i, onClose: p } = e, c = n.current, { onPointerInTransitChange: d } = r, v = s.useCallback(() => {
    f(null), d(!1);
  }, [d]), u = s.useCallback(
    (m, y) => {
      const T = m.currentTarget, x = { x: m.clientX, y: m.clientY }, C = fe(x, T.getBoundingClientRect()), w = ve(x, C), E = he(y.getBoundingClientRect()), R = Te([...w, ...E]);
      f(R), d(!0);
    },
    [d]
  );
  return s.useEffect(() => () => v(), [v]), s.useEffect(() => {
    if (i && c) {
      const m = (T) => u(T, c), y = (T) => u(T, i);
      return i.addEventListener("pointerleave", m), c.addEventListener("pointerleave", y), () => {
        i.removeEventListener("pointerleave", m), c.removeEventListener("pointerleave", y);
      };
    }
  }, [i, c, u, v]), s.useEffect(() => {
    if (a) {
      const m = (y) => {
        const T = y.target, x = { x: y.clientX, y: y.clientY }, C = (i == null ? void 0 : i.contains(T)) || (c == null ? void 0 : c.contains(T)), w = !me(x, a);
        C ? v() : w && (v(), p());
      };
      return document.addEventListener("pointermove", m), () => document.removeEventListener("pointermove", m);
    }
  }, [i, c, a, p, v]), /* @__PURE__ */ h(U, { ...t, ref: l });
}), [ce, ue] = _(P, { isInside: !1 }), pe = $("TooltipContent"), U = s.forwardRef(
  (t, o) => {
    const {
      __scopeTooltip: e,
      children: r,
      "aria-label": n,
      onEscapeKeyDown: l,
      onPointerDownOutside: a,
      ...f
    } = t, i = O(b, e), p = D(e), { onClose: c } = i;
    return s.useEffect(() => (document.addEventListener(L, c), () => document.removeEventListener(L, c)), [c]), s.useEffect(() => {
      if (i.trigger) {
        const d = (v) => {
          const u = v.target;
          u != null && u.contains(i.trigger) && c();
        };
        return window.addEventListener("scroll", d, { capture: !0 }), () => window.removeEventListener("scroll", d, { capture: !0 });
      }
    }, [i.trigger, c]), /* @__PURE__ */ h(
      q,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: l,
        onPointerDownOutside: a,
        onFocusOutside: (d) => d.preventDefault(),
        onDismiss: c,
        children: /* @__PURE__ */ oe(
          z,
          {
            "data-state": i.stateAttribute,
            ...p,
            ...f,
            ref: o,
            style: {
              ...f.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ h(pe, { children: r }),
              /* @__PURE__ */ h(ce, { scope: e, isInside: !0, children: /* @__PURE__ */ h(te, { id: i.contentId, role: "tooltip", children: n || r }) })
            ]
          }
        )
      }
    );
  }
);
B.displayName = b;
var V = "TooltipArrow", de = s.forwardRef(
  (t, o) => {
    const { __scopeTooltip: e, ...r } = t, n = D(e);
    return ue(
      V,
      e
    ).isInside ? null : /* @__PURE__ */ h(J, { ...n, ...r, ref: o });
  }
);
de.displayName = V;
function fe(t, o) {
  const e = Math.abs(o.top - t.y), r = Math.abs(o.bottom - t.y), n = Math.abs(o.right - t.x), l = Math.abs(o.left - t.x);
  switch (Math.min(e, r, n, l)) {
    case l:
      return "left";
    case n:
      return "right";
    case e:
      return "top";
    case r:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function ve(t, o, e = 5) {
  const r = [];
  switch (o) {
    case "top":
      r.push(
        { x: t.x - e, y: t.y + e },
        { x: t.x + e, y: t.y + e }
      );
      break;
    case "bottom":
      r.push(
        { x: t.x - e, y: t.y - e },
        { x: t.x + e, y: t.y - e }
      );
      break;
    case "left":
      r.push(
        { x: t.x + e, y: t.y - e },
        { x: t.x + e, y: t.y + e }
      );
      break;
    case "right":
      r.push(
        { x: t.x - e, y: t.y - e },
        { x: t.x - e, y: t.y + e }
      );
      break;
  }
  return r;
}
function he(t) {
  const { top: o, right: e, bottom: r, left: n } = t;
  return [
    { x: n, y: o },
    { x: e, y: o },
    { x: e, y: r },
    { x: n, y: r }
  ];
}
function me(t, o) {
  const { x: e, y: r } = t;
  let n = !1;
  for (let l = 0, a = o.length - 1; l < o.length; a = l++) {
    const f = o[l], i = o[a], p = f.x, c = f.y, d = i.x, v = i.y;
    c > r != v > r && e < (d - p) * (r - c) / (v - c) + p && (n = !n);
  }
  return n;
}
function Te(t) {
  const o = t.slice();
  return o.sort((e, r) => e.x < r.x ? -1 : e.x > r.x ? 1 : e.y < r.y ? -1 : e.y > r.y ? 1 : 0), ye(o);
}
function ye(t) {
  if (t.length <= 1) return t.slice();
  const o = [];
  for (let r = 0; r < t.length; r++) {
    const n = t[r];
    for (; o.length >= 2; ) {
      const l = o[o.length - 1], a = o[o.length - 2];
      if ((l.x - a.x) * (n.y - a.y) >= (l.y - a.y) * (n.x - a.x)) o.pop();
      else break;
    }
    o.push(n);
  }
  o.pop();
  const e = [];
  for (let r = t.length - 1; r >= 0; r--) {
    const n = t[r];
    for (; e.length >= 2; ) {
      const l = e[e.length - 1], a = e[e.length - 2];
      if ((l.x - a.x) * (n.y - a.y) >= (l.y - a.y) * (n.x - a.x)) e.pop();
      else break;
    }
    e.push(n);
  }
  return e.pop(), o.length === 1 && e.length === 1 && o[0].x === e[0].x && o[0].y === e[0].y ? o : o.concat(e);
}
var ke = G, Ie = j, Me = F, He = B;
export {
  He as Content,
  ke as Provider,
  Ie as Root,
  j as Tooltip,
  de as TooltipArrow,
  B as TooltipContent,
  G as TooltipProvider,
  F as TooltipTrigger,
  Me as Trigger
};
//# sourceMappingURL=index139.mjs.map
