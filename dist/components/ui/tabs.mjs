import { jsx as n, jsxs as T, Fragment as L } from "react/jsx-runtime";
import * as t from "react";
import * as u from "@radix-ui/react-tabs";
import { createPortal as H } from "react-dom";
import { useSensors as B, useSensor as E, PointerSensor as X, KeyboardSensor as A, DndContext as O, closestCenter as $ } from "@dnd-kit/core";
import { SortableContext as F, horizontalListSortingStrategy as Y, useSortable as q, arrayMove as G } from "@dnd-kit/sortable";
import { arrayMove as ce } from "@dnd-kit/sortable";
import { CSS as J } from "@dnd-kit/utilities";
import { cn as y } from "../../lib/utils.mjs";
import { XIcon as _ } from "../../icons/XIcon.mjs";
const ne = u.Root, Q = t.forwardRef(({ className: d, align: i = "start", ...e }, r) => /* @__PURE__ */ n(
  u.List,
  {
    ref: r,
    className: y(
      "flex h-9 items-end border-b border-border",
      i === "end" ? "justify-end" : "justify-start",
      d
    ),
    ...e
  }
));
Q.displayName = u.List.displayName;
const U = t.forwardRef(({ className: d, align: i = "start", items: e, onReorder: r, children: c, ...b }, g) => {
  const f = B(
    E(X, {
      activationConstraint: {
        distance: 8
        // 8px 이상 이동해야 드래그 시작
      }
    }),
    E(A)
  );
  return /* @__PURE__ */ n(
    O,
    {
      sensors: f,
      collisionDetection: $,
      onDragEnd: (o) => {
        const { active: p, over: m } = o;
        if (m && p.id !== m.id) {
          const x = e.indexOf(p.id), h = e.indexOf(m.id);
          r(G(e, x, h));
        }
      },
      children: /* @__PURE__ */ n(F, { items: e, strategy: Y, children: /* @__PURE__ */ n(
        u.List,
        {
          ref: g,
          className: y(
            "flex h-9 items-end border-b border-border",
            i === "end" ? "justify-end" : "justify-start",
            d
          ),
          ...b,
          children: c
        }
      ) })
    }
  );
});
U.displayName = "SortableTabsList";
const j = ({
  children: d,
  targetRef: i,
  show: e
}) => {
  const [r, c] = t.useState({ top: 0, left: 0 }), [b, g] = t.useState(!1);
  return t.useEffect(() => {
    g(!0);
  }, []), t.useEffect(() => {
    if (e && i.current) {
      const f = i.current.getBoundingClientRect();
      c({
        top: f.bottom + window.scrollY + 8,
        left: f.left + f.width / 2 + window.scrollX
      });
    }
  }, [e, i]), !b || !e ? null : H(
    /* @__PURE__ */ n(
      "div",
      {
        style: {
          position: "absolute",
          top: r.top,
          left: r.left,
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
}, V = t.forwardRef(({ className: d, closable: i, onClose: e, children: r, onKeyDown: c, maxWidth: b = 120, minWidth: g = 60, ...f }, l) => {
  const o = t.useRef(null), p = t.useRef(null), [m, x] = t.useState(!1), [h, w] = t.useState(!1), v = t.useCallback(
    (a) => {
      p.current = a, typeof l == "function" ? l(a) : l && typeof l == "object" && (l.current = a);
    },
    [l]
  );
  t.useEffect(() => {
    const a = () => {
      o.current && x(o.current.scrollWidth > o.current.clientWidth);
    };
    return a(), window.addEventListener("resize", a), () => window.removeEventListener("resize", a);
  }, [r]);
  const S = (a) => {
    i && (a.key === "Delete" || a.key === "Backspace") && (a.preventDefault(), e == null || e()), c == null || c(a);
  };
  return /* @__PURE__ */ T(L, { children: [
    /* @__PURE__ */ T(
      u.Trigger,
      {
        ref: v,
        style: { minWidth: `${g}px` },
        className: y(
          "inline-flex h-9 items-center justify-center gap-0.5 px-3 py-2 text-xs font-bold cursor-pointer",
          "flex-grow-0",
          // 늘어나지 않음
          "rounded-t bg-transparent",
          "text-text-secondary",
          "mb-[-1px]",
          // 하단 border와 연결
          "transition-all duration-200",
          // 비활성 탭: 축소 가능, maxWidth 제한
          "data-[state=inactive]:flex-shrink data-[state=inactive]:max-w-[120px]",
          // 활성 탭: 축소 안 함, 전체 텍스트 표시
          "data-[state=active]:flex-shrink-0 data-[state=active]:max-w-none",
          "data-[state=active]:border data-[state=active]:border-b-0 data-[state=active]:border-border",
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
        ...f,
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
    /* @__PURE__ */ n(j, { targetRef: p, show: m && h, children: r })
  ] });
});
V.displayName = u.Trigger.displayName;
const Z = t.forwardRef(({ id: d, className: i, closable: e, onClose: r, children: c, onKeyDown: b, maxWidth: g = 120, minWidth: f = 60, ...l }, o) => {
  const {
    attributes: p,
    listeners: m,
    setNodeRef: x,
    transform: h,
    transition: w,
    isDragging: v
  } = q({ id: d }), { role: S, ...a } = p, k = t.useRef(null), N = t.useRef(null), [z, I] = t.useState(!1), [W, R] = t.useState(!1), M = t.useCallback(
    (s) => {
      N.current = s, x(s), typeof o == "function" ? o(s) : o && typeof o == "object" && (o.current = s);
    },
    [o, x]
  );
  t.useEffect(() => {
    const s = () => {
      k.current && I(k.current.scrollWidth > k.current.clientWidth);
    };
    return s(), window.addEventListener("resize", s), () => window.removeEventListener("resize", s);
  }, [c]);
  const P = (s) => {
    e && (s.key === "Delete" || s.key === "Backspace") && (s.preventDefault(), r == null || r()), b == null || b(s);
  }, D = {
    transform: J.Transform.toString(h),
    transition: w,
    opacity: v ? 0.5 : 1,
    zIndex: v ? 10 : void 0,
    minWidth: `${f}px`
  };
  return /* @__PURE__ */ T(L, { children: [
    /* @__PURE__ */ T(
      u.Trigger,
      {
        ref: M,
        style: D,
        className: y(
          "inline-flex h-9 items-center justify-center gap-0.5 px-3 py-2 text-xs font-bold cursor-grab",
          "flex-grow-0",
          // 늘어나지 않음
          "rounded-t bg-transparent",
          "text-text-secondary",
          "mb-[-1px]",
          // 하단 border와 연결
          "transition-all duration-200",
          // 비활성 탭: 축소 가능, maxWidth 제한
          "data-[state=inactive]:flex-shrink data-[state=inactive]:max-w-[120px]",
          // 활성 탭: 축소 안 함, 전체 텍스트 표시
          "data-[state=active]:flex-shrink-0 data-[state=active]:max-w-none",
          "data-[state=active]:border data-[state=active]:border-b-0 data-[state=active]:border-border",
          "data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-50",
          "data-[state=active]:bg-[linear-gradient(180deg,white_0%,#f4f6f8_30%)]",
          "dark:data-[state=active]:bg-[linear-gradient(180deg,#444b57_0%,#1b2026_30%)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          v && "cursor-grabbing",
          i
        ),
        onKeyDown: P,
        onMouseEnter: () => R(!0),
        onMouseLeave: () => R(!1),
        ...a,
        ...m,
        ...l,
        children: [
          /* @__PURE__ */ n(
            "span",
            {
              ref: k,
              className: "truncate min-w-0",
              children: c
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
    /* @__PURE__ */ n(j, { targetRef: N, show: z && W && !v, children: c })
  ] });
});
Z.displayName = "SortableTabsTrigger";
const K = t.forwardRef(({ className: d, ...i }, e) => /* @__PURE__ */ n(
  u.Content,
  {
    ref: e,
    className: y(
      "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      d
    ),
    ...i
  }
));
K.displayName = u.Content.displayName;
export {
  U as SortableTabsList,
  Z as SortableTabsTrigger,
  ne as Tabs,
  K as TabsContent,
  Q as TabsList,
  V as TabsTrigger,
  ce as arrayMove
};
//# sourceMappingURL=tabs.mjs.map
