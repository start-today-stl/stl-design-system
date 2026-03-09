import { jsx as c, jsxs as k, Fragment as M } from "react/jsx-runtime";
import * as e from "react";
import * as g from "@radix-ui/react-tabs";
import { createPortal as D } from "react-dom";
import { useSensors as q, useSensor as T, PointerSensor as G, KeyboardSensor as J, DndContext as Q, closestCenter as U } from "@dnd-kit/core";
import { SortableContext as V, horizontalListSortingStrategy as Z, useSortable as C, arrayMove as K } from "@dnd-kit/sortable";
import { arrayMove as ve } from "@dnd-kit/sortable";
import { CSS as ee } from "@dnd-kit/utilities";
import { cn as v } from "../../lib/utils.mjs";
import { XIcon as P } from "../../icons/XIcon.mjs";
const xe = g.Root, te = e.forwardRef(({ className: l, align: s = "start", children: t, ...n }, d) => /* @__PURE__ */ c(
  g.List,
  {
    ref: d,
    className: v(
      "flex h-9 items-end shadow-[inset_0_-1px_0_var(--color-border)]",
      s === "end" ? "justify-end" : "justify-start",
      l
    ),
    ...n,
    children: t
  }
));
te.displayName = g.List.displayName;
const re = e.forwardRef(({ className: l, align: s = "start", items: t, onReorder: n, children: d, ...u }, b) => {
  const f = q(
    T(G, {
      activationConstraint: {
        distance: 8
        // 8px 이상 이동해야 드래그 시작
      }
    }),
    T(J)
  );
  return /* @__PURE__ */ c(
    Q,
    {
      sensors: f,
      collisionDetection: U,
      onDragEnd: (o) => {
        const { active: p, over: i } = o;
        if (i && p.id !== i.id) {
          const m = t.indexOf(p.id), h = t.indexOf(i.id);
          n(K(t, m, h));
        }
      },
      children: /* @__PURE__ */ c(V, { items: t, strategy: Z, children: /* @__PURE__ */ c(
        g.List,
        {
          ref: b,
          className: v(
            "flex h-9 items-end shadow-[inset_0_-1px_0_var(--color-border)]",
            s === "end" ? "justify-end" : "justify-start",
            l
          ),
          ...u,
          children: d
        }
      ) })
    }
  );
});
re.displayName = "SortableTabsList";
const ne = ({
  position: l,
  onClose: s,
  onCloseTab: t,
  onCloseTabsToRight: n,
  onCloseOtherTabs: d
}) => {
  const u = e.useRef(null), [b, f] = e.useState(!1);
  if (e.useEffect(() => {
    f(!0);
  }, []), e.useEffect(() => {
    const o = (m) => {
      u.current && !u.current.contains(m.target) && s();
    }, p = () => s(), i = (m) => {
      m.key === "Escape" && s();
    };
    return document.addEventListener("mousedown", o), document.addEventListener("scroll", p, !0), document.addEventListener("keydown", i), () => {
      document.removeEventListener("mousedown", o), document.removeEventListener("scroll", p, !0), document.removeEventListener("keydown", i);
    };
  }, [s]), !b) return null;
  const x = [
    { label: "닫기", onClick: t, show: !!t },
    { label: "오른쪽 탭 닫기", onClick: n, show: !!n },
    { label: "다른 탭 닫기", onClick: d, show: !!d }
  ].filter((o) => o.show);
  return D(
    /* @__PURE__ */ c(
      "div",
      {
        ref: u,
        style: {
          position: "fixed",
          top: l.y,
          left: l.x,
          zIndex: 50
        },
        className: v(
          "min-w-[140px] rounded-[5px] border border-slate-100 dark:border-slate-600",
          "bg-white/90 dark:bg-slate-800/90 backdrop-blur-[12px]",
          "p-[5px] shadow-[10px_10px_10px_0px_rgba(0,0,0,0.1)]",
          "animate-in fade-in-0 zoom-in-95"
        ),
        children: x.map((o, p) => /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            onClick: () => {
              var i;
              (i = o.onClick) == null || i.call(o), s();
            },
            className: v(
              "flex w-full h-[29px] cursor-pointer select-none items-center rounded-[2px] px-[8px]",
              "text-xs text-slate-600 dark:text-slate-300 outline-none transition-colors",
              "hover:bg-slate-100 dark:hover:bg-slate-700"
            ),
            children: o.label
          },
          p
        ))
      }
    ),
    document.body
  );
}, z = ({
  children: l,
  targetRef: s,
  show: t
}) => {
  const [n, d] = e.useState({ top: 0, left: 0 }), [u, b] = e.useState(!1);
  return e.useEffect(() => {
    b(!0);
  }, []), e.useEffect(() => {
    if (t && s.current) {
      const f = s.current.getBoundingClientRect();
      d({
        top: f.bottom + window.scrollY + 8,
        left: f.left + f.width / 2 + window.scrollX
      });
    }
  }, [t, s]), !u || !t ? null : D(
    /* @__PURE__ */ c(
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
        className: v(
          "rounded-md border bg-popover px-4 py-2.5 text-sm text-popover-foreground",
          "shadow-[10px_10px_10px_0px_#0000001A]",
          "animate-in fade-in-0 zoom-in-95",
          // 화살표
          "relative",
          "before:absolute before:bottom-full before:left-1/2 before:-ml-[11px] before:border-[11px] before:border-transparent before:border-b-border before:content-['']",
          "after:absolute after:bottom-full after:left-1/2 after:-ml-[10px] after:border-[10px] after:border-transparent after:border-b-white dark:after:border-b-[var(--color-slate-900)] after:content-['']"
        ),
        children: l
      }
    ),
    document.body
  );
}, ae = e.forwardRef(({ className: l, closable: s, onClose: t, children: n, onKeyDown: d, maxWidth: u = 120, minWidth: b = 60, ...f }, x) => {
  const o = e.useRef(null), p = e.useRef(null), [i, m] = e.useState(!1), [h, y] = e.useState(!1), S = e.useCallback(
    (a) => {
      p.current = a, typeof x == "function" ? x(a) : x && typeof x == "object" && (x.current = a);
    },
    [x]
  );
  e.useEffect(() => {
    const a = () => {
      o.current && m(o.current.scrollWidth > o.current.clientWidth);
    };
    return a(), window.addEventListener("resize", a), () => window.removeEventListener("resize", a);
  }, [n]);
  const _ = (a) => {
    s && (a.key === "Delete" || a.key === "Backspace") && (a.preventDefault(), t == null || t()), d == null || d(a);
  };
  return /* @__PURE__ */ k(M, { children: [
    /* @__PURE__ */ k(
      g.Trigger,
      {
        ref: S,
        style: { minWidth: `${b}px`, transition: "none" },
        className: v(
          "inline-flex h-9 items-center justify-center gap-0.5 px-3 py-2 text-xs font-bold cursor-pointer",
          "flex-grow-0",
          // 늘어나지 않음
          "rounded-t bg-transparent",
          "text-text-secondary",
          "border border-b-0 border-transparent",
          // 항상 border 유지 (기본 투명)
          // 비활성 탭: 축소 가능, maxWidth 제한
          `data-[state=inactive]:flex-shrink data-[state=inactive]:max-w-[${u}px]`,
          // 활성 탭: 축소 안 함, 전체 텍스트 표시
          "data-[state=active]:flex-shrink-0 data-[state=active]:max-w-none",
          "data-[state=active]:border-border",
          "data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-50",
          "data-[state=active]:bg-[linear-gradient(180deg,white_0%,#f4f6f8_30%)]",
          "dark:data-[state=active]:bg-[linear-gradient(180deg,#444b57_0%,#1b2026_30%)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          l
        ),
        onKeyDown: _,
        onMouseEnter: () => y(!0),
        onMouseLeave: () => y(!1),
        ...f,
        children: [
          /* @__PURE__ */ c(
            "span",
            {
              ref: o,
              className: "truncate min-w-0",
              children: n
            }
          ),
          s && /* @__PURE__ */ c(
            "span",
            {
              onPointerDown: (a) => {
                a.stopPropagation(), a.preventDefault();
              },
              onClick: (a) => {
                a.stopPropagation(), t == null || t();
              },
              className: "ml-0.5 flex-shrink-0 text-text-secondary hover:text-text-primary transition-colors cursor-pointer",
              "aria-hidden": "true",
              children: /* @__PURE__ */ c(P, { size: 20 })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ c(z, { targetRef: p, show: i && h, children: n })
  ] });
});
ae.displayName = g.Trigger.displayName;
const se = e.forwardRef(({ id: l, className: s, closable: t, onClose: n, onCloseTabsToRight: d, onCloseOtherTabs: u, children: b, onKeyDown: f, maxWidth: x = 120, minWidth: o = 60, ...p }, i) => {
  const {
    attributes: m,
    listeners: h,
    setNodeRef: y,
    transform: S,
    transition: _,
    isDragging: a
  } = C({ id: l }), { role: ie, ...I } = m, w = e.useRef(null), E = e.useRef(null), [j, W] = e.useState(!1), [H, N] = e.useState(!1), X = e.useCallback(
    (r) => {
      E.current = r, y(r), typeof i == "function" ? i(r) : i && typeof i == "object" && (i.current = r);
    },
    [i, y]
  );
  e.useEffect(() => {
    const r = () => {
      w.current && W(w.current.scrollWidth > w.current.clientWidth);
    };
    return r(), window.addEventListener("resize", r), () => window.removeEventListener("resize", r);
  }, [b]);
  const $ = (r) => {
    t && (r.key === "Delete" || r.key === "Backspace") && (r.preventDefault(), n == null || n()), f == null || f(r);
  }, B = {
    transform: ee.Transform.toString(S),
    transition: _,
    opacity: a ? 0.5 : 1,
    zIndex: a ? 10 : void 0,
    minWidth: `${o}px`
  }, L = t && (n || d || u), [O, R] = e.useState(!1), [A, Y] = e.useState({ x: 0, y: 0 }), F = (r) => {
    L && (r.preventDefault(), Y({ x: r.clientX, y: r.clientY }), R(!0));
  };
  return /* @__PURE__ */ k(M, { children: [
    /* @__PURE__ */ k(
      g.Trigger,
      {
        ref: X,
        style: B,
        className: v(
          "inline-flex h-9 items-center justify-center gap-0.5 px-3 py-2 text-xs font-bold cursor-grab",
          "flex-grow-0",
          // 늘어나지 않음
          "rounded-t bg-transparent",
          "text-text-secondary",
          "border border-b-0 border-transparent",
          // 항상 border 유지 (기본 투명)
          // 비활성 탭: 축소 가능, maxWidth 제한
          `data-[state=inactive]:flex-shrink data-[state=inactive]:max-w-[${x}px]`,
          // 활성 탭: 축소 안 함, 전체 텍스트 표시
          "data-[state=active]:flex-shrink-0 data-[state=active]:max-w-none",
          "data-[state=active]:border-border",
          "data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-50",
          "data-[state=active]:bg-[linear-gradient(180deg,white_0%,#f4f6f8_30%)]",
          "dark:data-[state=active]:bg-[linear-gradient(180deg,#444b57_0%,#1b2026_30%)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          a && "cursor-grabbing",
          s
        ),
        onKeyDown: $,
        onMouseEnter: () => N(!0),
        onMouseLeave: () => N(!1),
        onContextMenu: F,
        ...I,
        ...h,
        ...p,
        children: [
          /* @__PURE__ */ c(
            "span",
            {
              ref: w,
              className: "truncate min-w-0",
              children: b
            }
          ),
          t && /* @__PURE__ */ c(
            "span",
            {
              onPointerDown: (r) => {
                r.stopPropagation(), r.preventDefault();
              },
              onMouseDown: (r) => {
                r.stopPropagation(), r.preventDefault();
              },
              onClick: (r) => {
                r.stopPropagation(), n == null || n();
              },
              className: "ml-0.5 flex-shrink-0 text-text-secondary hover:text-text-primary transition-colors cursor-pointer",
              "aria-hidden": "true",
              children: /* @__PURE__ */ c(P, { size: 20 })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ c(z, { targetRef: E, show: j && H && !a, children: b }),
    L && O && /* @__PURE__ */ c(
      ne,
      {
        position: A,
        onClose: () => R(!1),
        onCloseTab: n,
        onCloseTabsToRight: d,
        onCloseOtherTabs: u
      }
    )
  ] });
});
se.displayName = "SortableTabsTrigger";
const oe = e.forwardRef(({ className: l, ...s }, t) => /* @__PURE__ */ c(
  g.Content,
  {
    ref: t,
    className: v(
      "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      l
    ),
    ...s
  }
));
oe.displayName = g.Content.displayName;
export {
  re as SortableTabsList,
  se as SortableTabsTrigger,
  xe as Tabs,
  oe as TabsContent,
  te as TabsList,
  ae as TabsTrigger,
  ve as arrayMove
};
//# sourceMappingURL=tabs.mjs.map
