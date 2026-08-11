import { jsxs as s, jsx as a, Fragment as ce } from "react/jsx-runtime";
import * as l from "react";
import { Command as b } from "cmdk";
import * as w from "@radix-ui/react-popover";
import { cn as f } from "../../../lib/utils.mjs";
import { SearchIcon as de } from "../../../icons/SearchIcon.mjs";
import { UpIcon as pe } from "../../../icons/UpIcon.mjs";
import { XIcon as y } from "../../../icons/XIcon.mjs";
import { Checkbox as ue } from "../checkbox.mjs";
import { Spinner as xe } from "../spinner.mjs";
const be = l.forwardRef(
  ({
    id: q,
    placeholder: B = "선택하세요",
    searchPlaceholder: G = "검색...",
    options: I,
    value: u,
    defaultValue: K,
    onValueChange: i,
    error: L,
    disabled: z,
    ariaLabel: U,
    tableMode: F,
    overflowMode: x = "truncate",
    maxDisplayCount: A = "auto",
    clearable: J = !0,
    loading: N
  }, M) => {
    const [h, Q] = l.useState(!1), [E, Y] = l.useState(""), [Z, P] = l.useState(!1), [V, _] = l.useState(
      K || []
    ), [D, d] = l.useState(""), S = l.useRef(null), c = u !== void 0 ? u : V, o = c.map((e) => I.find((t) => t.value === e)).filter((e) => e !== void 0), m = I.filter(
      (e) => e.label.toLowerCase().includes(E.toLowerCase())
    );
    l.useEffect(() => {
      h && m.length > 0 && d(m[0].label);
    }, [h]);
    const g = (e) => {
      if (S.current) {
        const t = S.current.querySelector(`[data-value="${e.toLowerCase()}"]`);
        t == null || t.scrollIntoView({ block: "nearest" });
      }
    }, ee = (e) => {
      const t = c.includes(e) ? c.filter((n) => n !== e) : [...c, e];
      u === void 0 && _(t), i == null || i(t);
    }, C = (e, t) => {
      t.stopPropagation();
      const n = c.filter((r) => r !== e);
      u === void 0 && _(n), i == null || i(n);
    }, te = (e) => {
      e.stopPropagation(), u === void 0 && _([]), i == null || i([]);
    }, ae = (e) => {
      const t = m.filter((r) => !r.disabled);
      if (t.length === 0) return;
      const n = t.findIndex((r) => r.label === D);
      if (e.key === "Home") {
        e.preventDefault();
        const r = t[0].label;
        d(r), g(r);
      } else if (e.key === "End") {
        e.preventDefault();
        const r = t[t.length - 1].label;
        d(r), g(r);
      } else if (e.key === "ArrowDown") {
        if (n === t.length - 1) {
          e.preventDefault();
          const r = t[0].label;
          d(r), g(r);
        }
      } else if (e.key === "ArrowUp" && n === 0) {
        e.preventDefault();
        const r = t[t.length - 1].label;
        d(r), g(r);
      }
    }, re = J && c.length > 0 && Z && !z && !N, v = A === "auto", O = l.useRef(null), W = l.useRef(null), [se, H] = l.useState(
      o.length
    ), le = 40, j = 4;
    l.useLayoutEffect(() => {
      if (!v || x !== "truncate") return;
      const e = W.current, t = O.current;
      if (!e || !t) return;
      const n = () => {
        const ne = e.clientWidth, k = Array.from(
          t.querySelectorAll("[data-measure-chip]")
        );
        if (k.length === 0) {
          H(0);
          return;
        }
        let T = 0, X = 0;
        for (let p = 0; p < k.length; p++) {
          const ie = k[p].offsetWidth, oe = p === k.length - 1 ? 0 : le + j, $ = T + ie + (p > 0 ? j : 0);
          if ($ + oe > ne) break;
          T = $, X = p + 1;
        }
        H(X);
      };
      n();
      const r = new ResizeObserver(n);
      return r.observe(e), () => r.disconnect();
    }, [v, x, o.length]);
    const R = v ? se : A;
    return /* @__PURE__ */ s(w.Root, { open: h, onOpenChange: Q, children: [
      /* @__PURE__ */ s(
        w.Trigger,
        {
          ref: M,
          id: q,
          disabled: z || N,
          className: f(
            "group flex min-h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 py-1.5 text-xs outline-none transition-colors cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-50",
            L ? "border-red-500 dark:border-red-500 focus-visible:border-red-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : F ? "border-slate-300 dark:border-slate-500 focus-visible:border-slate-500 focus-visible:border-[1.5px] dark:focus-visible:border-slate-300 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300" : "border-slate-200 dark:border-slate-600 focus-visible:border-blue-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)] data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
          ),
          "aria-invalid": L,
          "aria-label": U,
          onMouseEnter: () => P(!0),
          onMouseLeave: () => P(!1),
          children: [
            /* @__PURE__ */ s(
              "div",
              {
                ref: W,
                className: f(
                  "flex flex-1 gap-1 relative",
                  x === "wrap" ? "flex-wrap" : "flex-nowrap overflow-hidden"
                ),
                children: [
                  v && x === "truncate" && o.length > 0 && /* @__PURE__ */ a(
                    "div",
                    {
                      ref: O,
                      "aria-hidden": !0,
                      className: "absolute inset-y-0 left-0 flex flex-nowrap gap-1 opacity-0 pointer-events-none",
                      children: o.map((e) => /* @__PURE__ */ s(
                        "span",
                        {
                          "data-measure-chip": !0,
                          className: "inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 text-xs flex-shrink-0",
                          children: [
                            /* @__PURE__ */ a("span", { children: e.label }),
                            /* @__PURE__ */ a("span", { className: "flex-shrink-0", children: /* @__PURE__ */ a(y, { size: 18 }) })
                          ]
                        },
                        e.value
                      ))
                    }
                  ),
                  o.length === 0 ? /* @__PURE__ */ a("span", { className: "text-slate-500 dark:text-slate-50", children: B }) : x === "truncate" ? /* @__PURE__ */ s(ce, { children: [
                    o.slice(0, R).map((e) => /* @__PURE__ */ s(
                      "span",
                      {
                        className: "inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 text-xs flex-shrink-0",
                        children: [
                          /* @__PURE__ */ a("span", { children: e.label }),
                          /* @__PURE__ */ a(
                            "span",
                            {
                              role: "img",
                              "aria-label": `${e.label} 삭제`,
                              onClick: (t) => C(e.value, t),
                              className: "cursor-pointer flex-shrink-0",
                              children: /* @__PURE__ */ a(y, { size: 18 })
                            }
                          )
                        ]
                      },
                      e.value
                    )),
                    o.length > R && /* @__PURE__ */ s("span", { className: "inline-flex items-center rounded bg-slate-200 dark:bg-slate-600 px-1.5 py-0.5 text-xs flex-shrink-0", children: [
                      "+",
                      o.length - R
                    ] })
                  ] }) : o.map((e) => /* @__PURE__ */ s(
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
                            onClick: (t) => C(e.value, t),
                            className: "cursor-pointer",
                            children: /* @__PURE__ */ a(y, { size: 18 })
                          }
                        )
                      ]
                    },
                    e.value
                  ))
                ]
              }
            ),
            /* @__PURE__ */ s("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
              re && /* @__PURE__ */ a(
                "span",
                {
                  role: "button",
                  "aria-label": "전체 선택 초기화",
                  onClick: te,
                  className: "flex items-center",
                  children: /* @__PURE__ */ a("span", { className: "p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 cursor-pointer transition-colors", children: /* @__PURE__ */ a(y, { size: 20 }) })
                }
              ),
              N ? /* @__PURE__ */ a(xe, { size: "sm" }) : /* @__PURE__ */ a(
                pe,
                {
                  size: 24,
                  className: f(
                    "text-slate-900 transition-transform duration-200 dark:text-slate-50",
                    h && "rotate-180"
                  )
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ a(w.Portal, { children: /* @__PURE__ */ a(
        w.Content,
        {
          className: f(
            "z-50 rounded-[5px] border border-slate-200 dark:border-slate-600 w-[var(--radix-popover-trigger-width)]",
            "bg-white/50 dark:bg-slate-800/50 backdrop-blur-[12px]",
            "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
            "p-[5px]",
            "animate-in fade-in-0 zoom-in-95"
          ),
          sideOffset: 4,
          align: "start",
          children: /* @__PURE__ */ s(
            b,
            {
              className: "flex flex-col",
              value: D,
              onValueChange: d,
              children: [
                /* @__PURE__ */ s("div", { className: "flex items-center gap-2 px-2 pb-2 border-b border-slate-200 dark:border-slate-600", children: [
                  /* @__PURE__ */ a(de, { size: 20, className: "text-slate-400" }),
                  /* @__PURE__ */ a(
                    b.Input,
                    {
                      value: E,
                      onValueChange: Y,
                      placeholder: G,
                      className: "flex-1 bg-transparent text-xs outline-none placeholder:text-slate-400",
                      onKeyDown: ae
                    }
                  )
                ] }),
                /* @__PURE__ */ s(b.List, { ref: S, className: "flex flex-col gap-[5px] max-h-[240px] overflow-y-auto pt-2", children: [
                  /* @__PURE__ */ a(b.Empty, { className: "py-2 text-center text-xs text-slate-500", children: "검색 결과가 없습니다." }),
                  m.map((e) => {
                    const t = c.includes(e.value);
                    return /* @__PURE__ */ s(
                      b.Item,
                      {
                        value: e.label,
                        disabled: e.disabled,
                        onSelect: () => ee(e.value),
                        className: f(
                          "relative flex h-[29px] cursor-pointer select-none items-center gap-2 rounded-[2px] px-[5px] py-[5px]",
                          "text-xs text-slate-800 dark:text-slate-50 outline-none",
                          "hover:bg-slate-100 dark:hover:bg-slate-700",
                          "data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-700",
                          "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                        ),
                        children: [
                          /* @__PURE__ */ a(
                            ue,
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
be.displayName = "MultiSelect";
export {
  be as MultiSelect
};
//# sourceMappingURL=multi-select.mjs.map
