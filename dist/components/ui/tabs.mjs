import { jsx as i, jsxs as T, Fragment as E } from "react/jsx-runtime";
import * as r from "react";
import * as b from "@radix-ui/react-tabs";
import { createPortal as H } from "react-dom";
import { useSensors as $, useSensor as R, PointerSensor as B, KeyboardSensor as X, DndContext as A, closestCenter as O } from "@dnd-kit/core";
import { SortableContext as F, horizontalListSortingStrategy as Y, useSortable as q, arrayMove as G } from "@dnd-kit/sortable";
import { arrayMove as de } from "@dnd-kit/sortable";
import { CSS as J } from "@dnd-kit/utilities";
import { cn as y } from "../../lib/utils.mjs";
import { XIcon as L } from "../../icons/XIcon.mjs";
const ie = b.Root, Q = r.forwardRef(({ className: d, align: s = "start", children: e, ...n }, o) => /* @__PURE__ */ i(
  b.List,
  {
    ref: o,
    className: y(
      "flex h-9 items-end shadow-[inset_0_-1px_0_var(--color-border)]",
      s === "end" ? "justify-end" : "justify-start",
      d
    ),
    ...n,
    children: e
  }
));
Q.displayName = b.List.displayName;
const U = r.forwardRef(({ className: d, align: s = "start", items: e, onReorder: n, children: o, ...f }, p) => {
  const l = $(
    R(B, {
      activationConstraint: {
        distance: 8
        // 8px 이상 이동해야 드래그 시작
      }
    }),
    R(X)
  );
  return /* @__PURE__ */ i(
    A,
    {
      sensors: l,
      collisionDetection: O,
      onDragEnd: (c) => {
        const { active: g, over: m } = c;
        if (m && g.id !== m.id) {
          const x = e.indexOf(g.id), h = e.indexOf(m.id);
          n(G(e, x, h));
        }
      },
      children: /* @__PURE__ */ i(F, { items: e, strategy: Y, children: /* @__PURE__ */ i(
        b.List,
        {
          ref: p,
          className: y(
            "flex h-9 items-end shadow-[inset_0_-1px_0_var(--color-border)]",
            s === "end" ? "justify-end" : "justify-start",
            d
          ),
          ...f,
          children: o
        }
      ) })
    }
  );
});
U.displayName = "SortableTabsList";
const D = ({
  children: d,
  targetRef: s,
  show: e
}) => {
  const [n, o] = r.useState({ top: 0, left: 0 }), [f, p] = r.useState(!1);
  return r.useEffect(() => {
    p(!0);
  }, []), r.useEffect(() => {
    if (e && s.current) {
      const l = s.current.getBoundingClientRect();
      o({
        top: l.bottom + window.scrollY + 8,
        left: l.left + l.width / 2 + window.scrollX
      });
    }
  }, [e, s]), !f || !e ? null : H(
    /* @__PURE__ */ i(
      "div",
      {
        style: {
          position: "absolute",
          top: n.top,
          left: n.left,
          transform: "translateX(-50%)",
          zIndex: 50,
          pointerEvents: "none"
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
        children: d
      }
    ),
    document.body
  );
}, V = r.forwardRef(({ className: d, closable: s, onClose: e, children: n, onKeyDown: o, maxWidth: f = 120, minWidth: p = 60, ...l }, u) => {
  const c = r.useRef(null), g = r.useRef(null), [m, x] = r.useState(!1), [h, w] = r.useState(!1), v = r.useCallback(
    (a) => {
      g.current = a, typeof u == "function" ? u(a) : u && typeof u == "object" && (u.current = a);
    },
    [u]
  );
  r.useEffect(() => {
    const a = () => {
      c.current && x(c.current.scrollWidth > c.current.clientWidth);
    };
    return a(), window.addEventListener("resize", a), () => window.removeEventListener("resize", a);
  }, [n]);
  const S = (a) => {
    s && (a.key === "Delete" || a.key === "Backspace") && (a.preventDefault(), e == null || e()), o == null || o(a);
  };
  return /* @__PURE__ */ T(E, { children: [
    /* @__PURE__ */ T(
      b.Trigger,
      {
        ref: v,
        style: { minWidth: `${p}px`, transition: "none" },
        className: y(
          "inline-flex h-9 items-center justify-center gap-0.5 px-3 py-2 text-xs font-bold cursor-pointer",
          "flex-grow-0",
          // 늘어나지 않음
          "rounded-t bg-transparent",
          "text-text-secondary",
          "border border-b-0 border-transparent",
          // 항상 border 유지 (기본 투명)
          // 비활성 탭: 축소 가능, maxWidth 제한
          `data-[state=inactive]:flex-shrink data-[state=inactive]:max-w-[${f}px]`,
          // 활성 탭: 축소 안 함, 전체 텍스트 표시
          "data-[state=active]:flex-shrink-0 data-[state=active]:max-w-none",
          "data-[state=active]:border-border",
          "data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-50",
          "data-[state=active]:bg-[linear-gradient(180deg,white_0%,#f4f6f8_30%)]",
          "dark:data-[state=active]:bg-[linear-gradient(180deg,#444b57_0%,#1b2026_30%)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          d
        ),
        onKeyDown: S,
        onMouseEnter: () => w(!0),
        onMouseLeave: () => w(!1),
        ...l,
        children: [
          /* @__PURE__ */ i(
            "span",
            {
              ref: c,
              className: "truncate min-w-0",
              children: n
            }
          ),
          s && /* @__PURE__ */ i(
            "span",
            {
              onPointerDown: (a) => {
                a.stopPropagation(), a.preventDefault();
              },
              onClick: (a) => {
                a.stopPropagation(), e == null || e();
              },
              className: "ml-0.5 flex-shrink-0 text-text-secondary hover:text-text-primary transition-colors cursor-pointer",
              "aria-hidden": "true",
              children: /* @__PURE__ */ i(L, { size: 20 })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ i(D, { targetRef: g, show: m && h, children: n })
  ] });
});
V.displayName = b.Trigger.displayName;
const Z = r.forwardRef(({ id: d, className: s, closable: e, onClose: n, children: o, onKeyDown: f, maxWidth: p = 120, minWidth: l = 60, ...u }, c) => {
  const {
    attributes: g,
    listeners: m,
    setNodeRef: x,
    transform: h,
    transition: w,
    isDragging: v
  } = q({ id: d }), { role: S, ...a } = g, k = r.useRef(null), _ = r.useRef(null), [P, j] = r.useState(!1), [z, N] = r.useState(!1), I = r.useCallback(
    (t) => {
      _.current = t, x(t), typeof c == "function" ? c(t) : c && typeof c == "object" && (c.current = t);
    },
    [c, x]
  );
  r.useEffect(() => {
    const t = () => {
      k.current && j(k.current.scrollWidth > k.current.clientWidth);
    };
    return t(), window.addEventListener("resize", t), () => window.removeEventListener("resize", t);
  }, [o]);
  const M = (t) => {
    e && (t.key === "Delete" || t.key === "Backspace") && (t.preventDefault(), n == null || n()), f == null || f(t);
  }, W = {
    transform: J.Transform.toString(h),
    transition: w,
    opacity: v ? 0.5 : 1,
    zIndex: v ? 10 : void 0,
    minWidth: `${l}px`
  };
  return /* @__PURE__ */ T(E, { children: [
    /* @__PURE__ */ T(
      b.Trigger,
      {
        ref: I,
        style: W,
        className: y(
          "inline-flex h-9 items-center justify-center gap-0.5 px-3 py-2 text-xs font-bold cursor-grab",
          "flex-grow-0",
          // 늘어나지 않음
          "rounded-t bg-transparent",
          "text-text-secondary",
          "border border-b-0 border-transparent",
          // 항상 border 유지 (기본 투명)
          // 비활성 탭: 축소 가능, maxWidth 제한
          `data-[state=inactive]:flex-shrink data-[state=inactive]:max-w-[${p}px]`,
          // 활성 탭: 축소 안 함, 전체 텍스트 표시
          "data-[state=active]:flex-shrink-0 data-[state=active]:max-w-none",
          "data-[state=active]:border-border",
          "data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-50",
          "data-[state=active]:bg-[linear-gradient(180deg,white_0%,#f4f6f8_30%)]",
          "dark:data-[state=active]:bg-[linear-gradient(180deg,#444b57_0%,#1b2026_30%)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          v && "cursor-grabbing",
          s
        ),
        onKeyDown: M,
        onMouseEnter: () => N(!0),
        onMouseLeave: () => N(!1),
        ...a,
        ...m,
        ...u,
        children: [
          /* @__PURE__ */ i(
            "span",
            {
              ref: k,
              className: "truncate min-w-0",
              children: o
            }
          ),
          e && /* @__PURE__ */ i(
            "span",
            {
              onPointerDown: (t) => {
                t.stopPropagation(), t.preventDefault();
              },
              onMouseDown: (t) => {
                t.stopPropagation(), t.preventDefault();
              },
              onClick: (t) => {
                t.stopPropagation(), n == null || n();
              },
              className: "ml-0.5 flex-shrink-0 text-text-secondary hover:text-text-primary transition-colors cursor-pointer",
              "aria-hidden": "true",
              children: /* @__PURE__ */ i(L, { size: 20 })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ i(D, { targetRef: _, show: P && z && !v, children: o })
  ] });
});
Z.displayName = "SortableTabsTrigger";
const K = r.forwardRef(({ className: d, ...s }, e) => /* @__PURE__ */ i(
  b.Content,
  {
    ref: e,
    className: y(
      "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      d
    ),
    ...s
  }
));
K.displayName = b.Content.displayName;
export {
  U as SortableTabsList,
  Z as SortableTabsTrigger,
  ie as Tabs,
  K as TabsContent,
  Q as TabsList,
  V as TabsTrigger,
  de as arrayMove
};
//# sourceMappingURL=tabs.mjs.map
