import { jsxs as l, jsx as a, Fragment as J } from "react/jsx-runtime";
import * as n from "react";
import { Command as x } from "cmdk";
import * as h from "@radix-ui/react-popover";
import { cn as b } from "../../../lib/utils.mjs";
import { SearchIcon as Q } from "../../../icons/SearchIcon.mjs";
import { UpIcon as W } from "../../../icons/UpIcon.mjs";
import { XIcon as N } from "../../../icons/XIcon.mjs";
import { Checkbox as Y } from "../checkbox.mjs";
import { Spinner as Z } from "../spinner.mjs";
const C = n.forwardRef(
  ({
    id: D,
    placeholder: P = "선택하세요",
    searchPlaceholder: E = "검색...",
    options: _,
    value: c,
    defaultValue: H,
    onValueChange: s,
    error: y,
    disabled: S,
    ariaLabel: j,
    tableMode: A,
    overflowMode: I = "truncate",
    maxDisplayCount: g = 2,
    clearable: M = !0,
    loading: v
  }, T) => {
    const [f, $] = n.useState(!1), [L, K] = n.useState(""), [U, z] = n.useState(!1), [q, k] = n.useState(
      H || []
    ), [O, d] = n.useState(""), w = n.useRef(null), o = c !== void 0 ? c : q, p = _.filter(
      (e) => o.includes(e.value)
    ), u = _.filter(
      (e) => e.label.toLowerCase().includes(L.toLowerCase())
    );
    n.useEffect(() => {
      f && u.length > 0 && d(u[0].label);
    }, [f]);
    const m = (e) => {
      if (w.current) {
        const t = w.current.querySelector(`[data-value="${e.toLowerCase()}"]`);
        t == null || t.scrollIntoView({ block: "nearest" });
      }
    }, B = (e) => {
      const t = o.includes(e) ? o.filter((i) => i !== e) : [...o, e];
      c === void 0 && k(t), s == null || s(t);
    }, R = (e, t) => {
      t.stopPropagation();
      const i = o.filter((r) => r !== e);
      c === void 0 && k(i), s == null || s(i);
    }, F = (e) => {
      e.stopPropagation(), c === void 0 && k([]), s == null || s([]);
    }, X = (e) => {
      const t = u.filter((r) => !r.disabled);
      if (t.length === 0) return;
      const i = t.findIndex((r) => r.label === O);
      if (e.key === "Home") {
        e.preventDefault();
        const r = t[0].label;
        d(r), m(r);
      } else if (e.key === "End") {
        e.preventDefault();
        const r = t[t.length - 1].label;
        d(r), m(r);
      } else if (e.key === "ArrowDown") {
        if (i === t.length - 1) {
          e.preventDefault();
          const r = t[0].label;
          d(r), m(r);
        }
      } else if (e.key === "ArrowUp" && i === 0) {
        e.preventDefault();
        const r = t[t.length - 1].label;
        d(r), m(r);
      }
    }, G = M && o.length > 0 && U && !S && !v;
    return /* @__PURE__ */ l(h.Root, { open: f, onOpenChange: $, children: [
      /* @__PURE__ */ l(
        h.Trigger,
        {
          ref: T,
          id: D,
          disabled: S || v,
          className: b(
            "group flex min-h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 py-1.5 text-xs outline-none transition-colors cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-50",
            y ? "border-red-500 dark:border-red-500 focus-visible:border-red-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : A ? "border-slate-300 dark:border-slate-500 focus-visible:border-slate-500 focus-visible:border-[1.5px] dark:focus-visible:border-slate-300 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300" : "border-slate-100 dark:border-slate-600 focus-visible:border-blue-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)] data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
          ),
          "aria-invalid": y,
          "aria-label": j,
          onMouseEnter: () => z(!0),
          onMouseLeave: () => z(!1),
          children: [
            /* @__PURE__ */ a("div", { className: b(
              "flex flex-1 gap-1",
              I === "wrap" ? "flex-wrap" : "flex-nowrap overflow-hidden"
            ), children: p.length === 0 ? /* @__PURE__ */ a("span", { className: "text-slate-500 dark:text-slate-50", children: P }) : I === "truncate" ? /* @__PURE__ */ l(J, { children: [
              p.slice(0, g).map((e) => /* @__PURE__ */ l(
                "span",
                {
                  className: "inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 text-xs flex-shrink-0",
                  children: [
                    /* @__PURE__ */ a("span", { className: "truncate max-w-[80px]", children: e.label }),
                    /* @__PURE__ */ a(
                      "span",
                      {
                        role: "img",
                        "aria-label": `${e.label} 삭제`,
                        onClick: (t) => R(e.value, t),
                        className: "cursor-pointer flex-shrink-0",
                        children: /* @__PURE__ */ a(N, { size: 18 })
                      }
                    )
                  ]
                },
                e.value
              )),
              p.length > g && /* @__PURE__ */ l("span", { className: "inline-flex items-center rounded bg-slate-200 dark:bg-slate-600 px-1.5 py-0.5 text-xs flex-shrink-0", children: [
                "+",
                p.length - g
              ] })
            ] }) : p.map((e) => /* @__PURE__ */ l(
              "span",
              {
                className: "inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 text-xs",
                children: [
                  e.label,
                  /* @__PURE__ */ a(
                    "span",
                    {
                      role: "img",
                      "aria-label": `${e.label} 삭제`,
                      onClick: (t) => R(e.value, t),
                      className: "cursor-pointer",
                      children: /* @__PURE__ */ a(N, { size: 18 })
                    }
                  )
                ]
              },
              e.value
            )) }),
            /* @__PURE__ */ l("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
              G && /* @__PURE__ */ a(
                "span",
                {
                  role: "button",
                  "aria-label": "전체 선택 초기화",
                  onClick: F,
                  className: "flex items-center",
                  children: /* @__PURE__ */ a("span", { className: "p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 cursor-pointer transition-colors", children: /* @__PURE__ */ a(N, { size: 20 }) })
                }
              ),
              v ? /* @__PURE__ */ a(Z, { size: "sm" }) : /* @__PURE__ */ a(
                W,
                {
                  size: 24,
                  className: b(
                    "text-slate-900 transition-transform duration-200 dark:text-slate-50",
                    f && "rotate-180"
                  )
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ a(h.Portal, { children: /* @__PURE__ */ a(
        h.Content,
        {
          className: b(
            "z-50 rounded-[5px] border border-slate-100 dark:border-slate-600 w-[var(--radix-popover-trigger-width)]",
            "bg-white/50 dark:bg-slate-800/50 backdrop-blur-[12px]",
            "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
            "p-[5px]",
            "animate-in fade-in-0 zoom-in-95"
          ),
          sideOffset: 4,
          align: "start",
          children: /* @__PURE__ */ l(
            x,
            {
              className: "flex flex-col",
              value: O,
              onValueChange: d,
              children: [
                /* @__PURE__ */ l("div", { className: "flex items-center gap-2 px-2 pb-2 border-b border-slate-100 dark:border-slate-600", children: [
                  /* @__PURE__ */ a(Q, { size: 20, className: "text-slate-400" }),
                  /* @__PURE__ */ a(
                    x.Input,
                    {
                      value: L,
                      onValueChange: K,
                      placeholder: E,
                      className: "flex-1 bg-transparent text-xs outline-none placeholder:text-slate-400",
                      onKeyDown: X
                    }
                  )
                ] }),
                /* @__PURE__ */ l(x.List, { ref: w, className: "flex flex-col gap-[5px] max-h-[240px] overflow-y-auto pt-2", children: [
                  /* @__PURE__ */ a(x.Empty, { className: "py-2 text-center text-xs text-slate-500", children: "검색 결과가 없습니다." }),
                  u.map((e) => {
                    const t = o.includes(e.value);
                    return /* @__PURE__ */ l(
                      x.Item,
                      {
                        value: e.label,
                        disabled: e.disabled,
                        onSelect: () => B(e.value),
                        className: b(
                          "relative flex h-[29px] cursor-pointer select-none items-center gap-2 rounded-[2px] px-[5px] py-[5px]",
                          "text-xs text-slate-700 dark:text-slate-50 outline-none",
                          "hover:bg-slate-100 dark:hover:bg-slate-700",
                          "data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-700",
                          "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                        ),
                        children: [
                          /* @__PURE__ */ a(
                            Y,
                            {
                              checked: t,
                              className: "pointer-events-none h-4 w-4"
                            }
                          ),
                          e.label
                        ]
                      },
                      e.value
                    );
                  })
                ] })
              ]
            }
          )
        }
      ) })
    ] });
  }
);
C.displayName = "MultiSelect";
export {
  C as MultiSelect
};
//# sourceMappingURL=multi-select.mjs.map
