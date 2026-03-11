import { jsx as c, jsxs as k, Fragment as R } from "react/jsx-runtime";
import * as r from "react";
import * as g from "@radix-ui/react-tabs";
import { createPortal as D } from "react-dom";
import { useSensors as C, useSensor as L, PointerSensor as G, KeyboardSensor as J, DndContext as Q, closestCenter as U } from "@dnd-kit/core";
import { SortableContext as V, horizontalListSortingStrategy as Z, useSortable as $, arrayMove as K } from "@dnd-kit/sortable";
import { arrayMove as ve } from "@dnd-kit/sortable";
import { CSS as ee } from "@dnd-kit/utilities";
import { cn as v } from "../../lib/utils.mjs";
import { XIcon as P } from "../../icons/XIcon.mjs";
const T = {
  60: "data-[state=inactive]:max-w-[60px]",
  80: "data-[state=inactive]:max-w-[80px]",
  100: "data-[state=inactive]:max-w-[100px]",
  120: "data-[state=inactive]:max-w-[120px]",
  140: "data-[state=inactive]:max-w-[140px]",
  160: "data-[state=inactive]:max-w-[160px]"
}, I = {
  40: "min-w-[40px]",
  60: "min-w-[60px]",
  80: "min-w-[80px]"
}, xe = g.Root, te = r.forwardRef(({ className: l, align: n = "start", children: e, ...a }, d) => /* @__PURE__ */ c(
  g.List,
  {
    ref: d,
    className: v(
      "flex h-9 items-end shadow-[inset_0_-1px_0_var(--color-border)]",
      n === "end" ? "justify-end" : "justify-start",
      l
    ),
    ...a,
    children: e
  }
));
te.displayName = g.List.displayName;
const re = r.forwardRef(({ className: l, align: n = "start", items: e, onReorder: a, children: d, ...u }, x) => {
  const f = C(
    L(G, {
      activationConstraint: {
        distance: 8
        // 8px 이상 이동해야 드래그 시작
      }
    }),
    L(J)
  );
  return /* @__PURE__ */ c(
    Q,
    {
      sensors: f,
      collisionDetection: U,
      onDragEnd: (i) => {
        const { active: b, over: o } = i;
        if (o && b.id !== o.id) {
          const m = e.indexOf(b.id), y = e.indexOf(o.id);
          a(K(e, m, y));
        }
      },
      children: /* @__PURE__ */ c(V, { items: e, strategy: Z, children: /* @__PURE__ */ c(
        g.List,
        {
          ref: x,
          className: v(
            "flex h-9 items-end shadow-[inset_0_-1px_0_var(--color-border)]",
            n === "end" ? "justify-end" : "justify-start",
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
const ae = ({
  position: l,
  onClose: n,
  onCloseTab: e,
  onCloseTabsToRight: a,
  onCloseOtherTabs: d
}) => {
  const u = r.useRef(null), [x, f] = r.useState(!1);
  if (r.useEffect(() => {
    f(!0);
  }, []), r.useEffect(() => {
    const i = (m) => {
      u.current && !u.current.contains(m.target) && n();
    }, b = () => n(), o = (m) => {
      m.key === "Escape" && n();
    };
    return document.addEventListener("mousedown", i), document.addEventListener("scroll", b, !0), document.addEventListener("keydown", o), () => {
      document.removeEventListener("mousedown", i), document.removeEventListener("scroll", b, !0), document.removeEventListener("keydown", o);
    };
  }, [n]), !x) return null;
  const p = [
    { label: "닫기", onClick: e, show: !!e },
    { label: "오른쪽 탭 닫기", onClick: a, show: !!a },
    { label: "다른 탭 닫기", onClick: d, show: !!d }
  ].filter((i) => i.show);
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
        children: p.map((i, b) => /* @__PURE__ */ c(
          "button",
          {
            type: "button",
            onClick: () => {
              var o;
              (o = i.onClick) == null || o.call(i), n();
            },
            className: v(
              "flex w-full h-[29px] cursor-pointer select-none items-center rounded-[2px] px-[8px]",
              "text-xs text-slate-600 dark:text-slate-300 outline-none transition-colors",
              "hover:bg-slate-100 dark:hover:bg-slate-700"
            ),
            children: i.label
          },
          b
        ))
      }
    ),
    document.body
  );
}, j = ({
  children: l,
  targetRef: n,
  show: e
}) => {
  const [a, d] = r.useState({ top: 0, left: 0 }), [u, x] = r.useState(!1);
  return r.useEffect(() => {
    x(!0);
  }, []), r.useEffect(() => {
    if (e && n.current) {
      const f = n.current.getBoundingClientRect();
      d({
        top: f.bottom + window.scrollY + 8,
        left: f.left + f.width / 2 + window.scrollX
      });
    }
  }, [e, n]), !u || !e ? null : D(
    /* @__PURE__ */ c(
      "div",
      {
        style: {
          position: "absolute",
          top: a.top,
          left: a.left,
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
}, ne = r.forwardRef(({ className: l, closable: n, onClose: e, children: a, onKeyDown: d, maxWidth: u = 120, minWidth: x = 60, ...f }, p) => {
  const i = r.useRef(null), [b, o] = r.useState(!1), m = r.useCallback(
    (s) => {
      i.current = s, typeof p == "function" ? p(s) : p && typeof p == "object" && (p.current = s);
    },
    [p]
  );
  r.useEffect(() => {
    const s = i.current;
    if (s) {
      const h = s.getAttribute("aria-controls");
      h && !document.getElementById(h) && s.removeAttribute("aria-controls");
    }
  }, []);
  const y = (s) => {
    n && (s.key === "Delete" || s.key === "Backspace") && (s.preventDefault(), e == null || e()), d == null || d(s);
  };
  return /* @__PURE__ */ k(R, { children: [
    /* @__PURE__ */ k(
      g.Trigger,
      {
        ref: m,
        className: v(
          "inline-flex h-9 items-center justify-center gap-0.5 px-3 py-2 text-xs font-bold cursor-pointer",
          "flex-grow-0",
          // 늘어나지 않음
          "rounded-t bg-transparent",
          "text-text-secondary",
          "border border-b-0 border-transparent",
          // 항상 border 유지 (기본 투명)
          // 비활성 탭: 축소 가능, minWidth/maxWidth 적용
          "data-[state=inactive]:flex-shrink",
          I[x],
          T[u],
          // 활성 탭: 축소 안 함, 전체 텍스트 표시 (maxWidth 제거)
          "data-[state=active]:flex-shrink-0 data-[state=active]:max-w-none",
          "data-[state=active]:border-border",
          "data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-50",
          "data-[state=active]:bg-[linear-gradient(180deg,white_0%,#f4f6f8_30%)]",
          "dark:data-[state=active]:bg-[linear-gradient(180deg,#444b57_0%,#1b2026_30%)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          l
        ),
        onKeyDown: y,
        onMouseEnter: () => o(!0),
        onMouseLeave: () => o(!1),
        ...f,
        children: [
          /* @__PURE__ */ c("span", { className: "truncate min-w-0", children: a }),
          n && /* @__PURE__ */ c(
            "span",
            {
              onPointerDown: (s) => {
                s.stopPropagation(), s.preventDefault();
              },
              onClick: (s) => {
                s.stopPropagation(), e == null || e();
              },
              className: "ml-0.5 flex-shrink-0 text-text-secondary hover:text-text-primary transition-colors cursor-pointer",
              "aria-hidden": "true",
              children: /* @__PURE__ */ c(P, { size: 20 })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ c(j, { targetRef: i, show: b, children: a })
  ] });
});
ne.displayName = g.Trigger.displayName;
const se = r.forwardRef(({ id: l, className: n, closable: e, onClose: a, onCloseTabsToRight: d, onCloseOtherTabs: u, children: x, onKeyDown: f, maxWidth: p = 120, minWidth: i = 60, ...b }, o) => {
  const {
    attributes: m,
    listeners: y,
    setNodeRef: s,
    transform: h,
    transition: z,
    isDragging: w
  } = $({ id: l }), { role: ie, ...A } = m, _ = r.useRef(null), [B, S] = r.useState(!1), H = r.useCallback(
    (t) => {
      _.current = t, s(t), typeof o == "function" ? o(t) : o && typeof o == "object" && (o.current = t);
    },
    [o, s]
  );
  r.useEffect(() => {
    const t = _.current;
    if (t) {
      const M = t.getAttribute("aria-controls");
      M && !document.getElementById(M) && t.removeAttribute("aria-controls");
    }
  }, []);
  const X = (t) => {
    e && (t.key === "Delete" || t.key === "Backspace") && (t.preventDefault(), a == null || a()), f == null || f(t);
  }, O = {
    transform: ee.Transform.toString(h),
    transition: z,
    opacity: w ? 0.5 : 1,
    zIndex: w ? 10 : void 0
  }, E = e && (a || d || u), [W, N] = r.useState(!1), [Y, F] = r.useState({ x: 0, y: 0 }), q = (t) => {
    E && (t.preventDefault(), F({ x: t.clientX, y: t.clientY }), N(!0));
  };
  return /* @__PURE__ */ k(R, { children: [
    /* @__PURE__ */ k(
      g.Trigger,
      {
        ref: H,
        style: O,
        className: v(
          "inline-flex h-9 items-center justify-center gap-0.5 px-3 py-2 text-xs font-bold cursor-grab",
          "flex-grow-0",
          // 늘어나지 않음
          "rounded-t bg-transparent",
          "text-text-secondary",
          "border border-b-0 border-transparent",
          // 항상 border 유지 (기본 투명)
          // 비활성 탭: 축소 가능, minWidth/maxWidth 적용
          "data-[state=inactive]:flex-shrink",
          I[i],
          T[p],
          // 활성 탭: 축소 안 함, 전체 텍스트 표시 (maxWidth 제거)
          "data-[state=active]:flex-shrink-0 data-[state=active]:max-w-none",
          "data-[state=active]:border-border",
          "data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-50",
          "data-[state=active]:bg-[linear-gradient(180deg,white_0%,#f4f6f8_30%)]",
          "dark:data-[state=active]:bg-[linear-gradient(180deg,#444b57_0%,#1b2026_30%)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          w && "cursor-grabbing",
          n
        ),
        onKeyDown: X,
        onMouseEnter: () => S(!0),
        onMouseLeave: () => S(!1),
        onContextMenu: q,
        ...A,
        ...y,
        ...b,
        children: [
          /* @__PURE__ */ c("span", { className: "truncate min-w-0", children: x }),
          e && /* @__PURE__ */ c(
            "span",
            {
              onPointerDown: (t) => {
                t.stopPropagation(), t.preventDefault();
              },
              onMouseDown: (t) => {
                t.stopPropagation(), t.preventDefault();
              },
              onClick: (t) => {
                t.stopPropagation(), a == null || a();
              },
              className: "ml-0.5 flex-shrink-0 text-text-secondary hover:text-text-primary transition-colors cursor-pointer",
              "aria-hidden": "true",
              children: /* @__PURE__ */ c(P, { size: 20 })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ c(j, { targetRef: _, show: B && !w, children: x }),
    E && W && /* @__PURE__ */ c(
      ae,
      {
        position: Y,
        onClose: () => N(!1),
        onCloseTab: a,
        onCloseTabsToRight: d,
        onCloseOtherTabs: u
      }
    )
  ] });
});
se.displayName = "SortableTabsTrigger";
const oe = r.forwardRef(({ className: l, ...n }, e) => /* @__PURE__ */ c(
  g.Content,
  {
    ref: e,
    className: v(
      "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      l
    ),
    ...n
  }
));
oe.displayName = g.Content.displayName;
export {
  re as SortableTabsList,
  se as SortableTabsTrigger,
  xe as Tabs,
  oe as TabsContent,
  te as TabsList,
  ne as TabsTrigger,
  ve as arrayMove
};
//# sourceMappingURL=tabs.mjs.map
