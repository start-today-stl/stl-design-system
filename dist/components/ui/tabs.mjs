import { jsx as n, jsxs as k, Fragment as L } from "react/jsx-runtime";
import * as t from "react";
import * as b from "@radix-ui/react-tabs";
import { createPortal as H } from "react-dom";
import { useSensors as $, useSensor as E, DndContext as B, closestCenter as X, KeyboardSensor as A, PointerSensor as O } from "../../node_modules/@dnd-kit/core/dist/core.esm.mjs";
import { SortableContext as F, horizontalListSortingStrategy as Y, useSortable as q, arrayMove as G } from "../../node_modules/@dnd-kit/sortable/dist/sortable.esm.mjs";
import { CSS as J } from "../../node_modules/@dnd-kit/utilities/dist/utilities.esm.mjs";
import { cn as y } from "../../lib/utils.mjs";
import { XIcon as _ } from "../../icons/XIcon.mjs";
const ne = b.Root, Q = t.forwardRef(({ className: c, align: i = "start", ...e }, r) => /* @__PURE__ */ n(
  b.List,
  {
    ref: r,
    className: y(
      "flex h-9 items-end border-b border-border",
      i === "end" ? "justify-end" : "justify-start",
      c
    ),
    ...e
  }
));
Q.displayName = b.List.displayName;
const U = t.forwardRef(({ className: c, align: i = "start", items: e, onReorder: r, children: d, ...f }, p) => {
  const l = $(
    E(O, {
      activationConstraint: {
        distance: 8
        // 8px 이상 이동해야 드래그 시작
      }
    }),
    E(A)
  );
  return /* @__PURE__ */ n(
    B,
    {
      sensors: l,
      collisionDetection: X,
      onDragEnd: (o) => {
        const { active: g, over: m } = o;
        if (m && g.id !== m.id) {
          const x = e.indexOf(g.id), h = e.indexOf(m.id);
          r(G(e, x, h));
        }
      },
      children: /* @__PURE__ */ n(F, { items: e, strategy: Y, children: /* @__PURE__ */ n(
        b.List,
        {
          ref: p,
          className: y(
            "flex h-9 items-end border-b border-border",
            i === "end" ? "justify-end" : "justify-start",
            c
          ),
          ...f,
          children: d
        }
      ) })
    }
  );
});
U.displayName = "SortableTabsList";
const j = ({
  children: c,
  targetRef: i,
  show: e
}) => {
  const [r, d] = t.useState({ top: 0, left: 0 }), [f, p] = t.useState(!1);
  return t.useEffect(() => {
    p(!0);
  }, []), t.useEffect(() => {
    if (e && i.current) {
      const l = i.current.getBoundingClientRect();
      d({
        top: l.bottom + window.scrollY + 8,
        left: l.left + l.width / 2 + window.scrollX
      });
    }
  }, [e, i]), !f || !e ? null : H(
    /* @__PURE__ */ n(
      "div",
      {
        style: {
          position: "absolute",
          top: r.top,
          left: r.left,
          transform: "translateX(-50%)",
          zIndex: 50
        },
        className: y(
          "rounded-md border bg-popover px-4 py-2.5 text-sm text-popover-foreground",
          "shadow-[10px_10px_10px_0px_#0000001A]",
          "animate-in fade-in-0 zoom-in-95",
          // 화살표
          "relative",
          "before:absolute before:bottom-full before:left-1/2 before:-ml-[11px] before:border-[11px] before:border-transparent before:border-b-border before:content-['']",
          "after:absolute after:bottom-full after:left-1/2 after:-ml-[10px] after:border-[10px] after:border-transparent after:border-b-white dark:after:border-b-[var(--color-slate-900)] after:content-['']"
        ),
        children: c
      }
    ),
    document.body
  );
}, V = t.forwardRef(({ className: c, closable: i, onClose: e, children: r, onKeyDown: d, maxWidth: f = 120, minWidth: p = 60, ...l }, u) => {
  const o = t.useRef(null), g = t.useRef(null), [m, x] = t.useState(!1), [h, w] = t.useState(!1), v = t.useCallback(
    (a) => {
      g.current = a, typeof u == "function" ? u(a) : u && typeof u == "object" && (u.current = a);
    },
    [u]
  );
  t.useEffect(() => {
    const a = () => {
      o.current && x(o.current.scrollWidth > o.current.clientWidth);
    };
    return a(), window.addEventListener("resize", a), () => window.removeEventListener("resize", a);
  }, [r]);
  const S = (a) => {
    i && (a.key === "Delete" || a.key === "Backspace") && (a.preventDefault(), e == null || e()), d == null || d(a);
  };
  return /* @__PURE__ */ k(L, { children: [
    /* @__PURE__ */ k(
      b.Trigger,
      {
        ref: v,
        style: { maxWidth: `${f}px`, minWidth: `${p}px` },
        className: y(
          "inline-flex h-9 items-center justify-center gap-0.5 px-3 py-2 text-xs font-bold cursor-pointer",
          "flex-shrink flex-grow-0",
          // 컨테이너에 맞게 축소 가능
          "rounded-t bg-transparent",
          "text-text-secondary",
          "mb-[-1px]",
          // 하단 border와 연결
          "transition-colors",
          "data-[state=active]:border data-[state=active]:border-b-0 data-[state=active]:border-border",
          "data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-50",
          "data-[state=active]:bg-[linear-gradient(180deg,white_0%,#f4f6f8_30%)]",
          "dark:data-[state=active]:bg-[linear-gradient(180deg,#444b57_0%,#1b2026_30%)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          c
        ),
        onKeyDown: S,
        onMouseEnter: () => w(!0),
        onMouseLeave: () => w(!1),
        ...l,
        children: [
          /* @__PURE__ */ n(
            "span",
            {
              ref: o,
              className: "truncate min-w-0",
              children: r
            }
          ),
          i && /* @__PURE__ */ n(
            "span",
            {
              onClick: (a) => {
                a.stopPropagation(), e == null || e();
              },
              className: "ml-0.5 flex-shrink-0 text-text-secondary hover:text-text-primary transition-colors cursor-pointer",
              "aria-hidden": "true",
              children: /* @__PURE__ */ n(_, { size: 20 })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ n(j, { targetRef: g, show: m && h, children: r })
  ] });
});
V.displayName = b.Trigger.displayName;
const Z = t.forwardRef(({ id: c, className: i, closable: e, onClose: r, children: d, onKeyDown: f, maxWidth: p = 120, minWidth: l = 60, ...u }, o) => {
  const {
    attributes: g,
    listeners: m,
    setNodeRef: x,
    transform: h,
    transition: w,
    isDragging: v
  } = q({ id: c }), { role: S, ...a } = g, T = t.useRef(null), N = t.useRef(null), [z, I] = t.useState(!1), [W, R] = t.useState(!1), P = t.useCallback(
    (s) => {
      N.current = s, x(s), typeof o == "function" ? o(s) : o && typeof o == "object" && (o.current = s);
    },
    [o, x]
  );
  t.useEffect(() => {
    const s = () => {
      T.current && I(T.current.scrollWidth > T.current.clientWidth);
    };
    return s(), window.addEventListener("resize", s), () => window.removeEventListener("resize", s);
  }, [d]);
  const D = (s) => {
    e && (s.key === "Delete" || s.key === "Backspace") && (s.preventDefault(), r == null || r()), f == null || f(s);
  }, M = {
    transform: J.Transform.toString(h),
    transition: w,
    opacity: v ? 0.5 : 1,
    zIndex: v ? 10 : void 0,
    maxWidth: `${p}px`,
    minWidth: `${l}px`
  };
  return /* @__PURE__ */ k(L, { children: [
    /* @__PURE__ */ k(
      b.Trigger,
      {
        ref: P,
        style: M,
        className: y(
          "inline-flex h-9 items-center justify-center gap-0.5 px-3 py-2 text-xs font-bold cursor-grab",
          "flex-shrink flex-grow-0",
          // 컨테이너에 맞게 축소 가능
          "rounded-t bg-transparent",
          "text-text-secondary",
          "mb-[-1px]",
          // 하단 border와 연결
          "transition-colors",
          "data-[state=active]:border data-[state=active]:border-b-0 data-[state=active]:border-border",
          "data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-50",
          "data-[state=active]:bg-[linear-gradient(180deg,white_0%,#f4f6f8_30%)]",
          "dark:data-[state=active]:bg-[linear-gradient(180deg,#444b57_0%,#1b2026_30%)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          v && "cursor-grabbing",
          i
        ),
        onKeyDown: D,
        onMouseEnter: () => R(!0),
        onMouseLeave: () => R(!1),
        ...a,
        ...m,
        ...u,
        children: [
          /* @__PURE__ */ n(
            "span",
            {
              ref: T,
              className: "truncate min-w-0",
              children: d
            }
          ),
          e && /* @__PURE__ */ n(
            "span",
            {
              onClick: (s) => {
                s.stopPropagation(), r == null || r();
              },
              className: "ml-0.5 flex-shrink-0 text-text-secondary hover:text-text-primary transition-colors cursor-pointer",
              "aria-hidden": "true",
              children: /* @__PURE__ */ n(_, { size: 20 })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ n(j, { targetRef: N, show: z && W && !v, children: d })
  ] });
});
Z.displayName = "SortableTabsTrigger";
const K = t.forwardRef(({ className: c, ...i }, e) => /* @__PURE__ */ n(
  b.Content,
  {
    ref: e,
    className: y(
      "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      c
    ),
    ...i
  }
));
K.displayName = b.Content.displayName;
export {
  U as SortableTabsList,
  Z as SortableTabsTrigger,
  ne as Tabs,
  K as TabsContent,
  Q as TabsList,
  V as TabsTrigger,
  G as arrayMove
};
//# sourceMappingURL=tabs.mjs.map
