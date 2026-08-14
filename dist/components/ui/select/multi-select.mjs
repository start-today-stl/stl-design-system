import { jsxs as s, jsx as r, Fragment as de } from "react/jsx-runtime";
import * as l from "react";
import { Command as x } from "cmdk";
import * as w from "@radix-ui/react-popover";
import { cn as b } from "../../../lib/utils.mjs";
import { SearchIcon as pe } from "../../../icons/SearchIcon.mjs";
import { UpIcon as ue } from "../../../icons/UpIcon.mjs";
import { XIcon as y } from "../../../icons/XIcon.mjs";
import { Checkbox as fe } from "../checkbox.mjs";
import { Spinner as xe } from "../spinner.mjs";
const be = [], he = l.forwardRef(
  ({
    id: q,
    placeholder: B = "선택하세요",
    searchPlaceholder: G = "검색...",
    options: L,
    value: d,
    defaultValue: K,
    onValueChange: o,
    error: I,
    disabled: E,
    ariaLabel: F,
    tableMode: M,
    overflowMode: f = "truncate",
    maxDisplayCount: z = "auto",
    clearable: Y = !0,
    loading: N
  }, J) => {
    const [h, Q] = l.useState(!1), [A, Z] = l.useState(""), [V, P] = l.useState(!1), [ee, _] = l.useState(
      K || []
    ), [C, p] = l.useState(""), S = l.useRef(null), D = l.useRef(d !== void 0);
    d !== void 0 && (D.current = !0);
    const c = D.current ? d ?? be : ee, i = c.map((e) => L.find((t) => t.value === e)).filter((e) => e !== void 0), m = L.filter(
      (e) => e.label.toLowerCase().includes(A.toLowerCase())
    );
    l.useEffect(() => {
      h && m.length > 0 && p(m[0].label);
    }, [h]);
    const g = (e) => {
      if (S.current) {
        const t = S.current.querySelector(`[data-value="${e.toLowerCase()}"]`);
        t == null || t.scrollIntoView({ block: "nearest" });
      }
    }, te = (e) => {
      const t = c.includes(e) ? c.filter((n) => n !== e) : [...c, e];
      d === void 0 && _(t), o == null || o(t);
    }, O = (e, t) => {
      t.stopPropagation();
      const n = c.filter((a) => a !== e);
      d === void 0 && _(n), o == null || o(n);
    }, re = (e) => {
      e.stopPropagation(), d === void 0 && _([]), o == null || o([]);
    }, ae = (e) => {
      const t = m.filter((a) => !a.disabled);
      if (t.length === 0) return;
      const n = t.findIndex((a) => a.label === C);
      if (e.key === "Home") {
        e.preventDefault();
        const a = t[0].label;
        p(a), g(a);
      } else if (e.key === "End") {
        e.preventDefault();
        const a = t[t.length - 1].label;
        p(a), g(a);
      } else if (e.key === "ArrowDown") {
        if (n === t.length - 1) {
          e.preventDefault();
          const a = t[0].label;
          p(a), g(a);
        }
      } else if (e.key === "ArrowUp" && n === 0) {
        e.preventDefault();
        const a = t[t.length - 1].label;
        p(a), g(a);
      }
    }, se = Y && c.length > 0 && V && !E && !N, v = z === "auto", W = l.useRef(null), H = l.useRef(null), [le, T] = l.useState(
      i.length
    ), ne = 40, j = 4;
    l.useLayoutEffect(() => {
      if (!v || f !== "truncate") return;
      const e = H.current, t = W.current;
      if (!e || !t) return;
      const n = () => {
        const oe = e.clientWidth, k = Array.from(
          t.querySelectorAll("[data-measure-chip]")
        );
        if (k.length === 0) {
          T(0);
          return;
        }
        let U = 0, X = 0;
        for (let u = 0; u < k.length; u++) {
          const ie = k[u].offsetWidth, ce = u === k.length - 1 ? 0 : ne + j, $ = U + ie + (u > 0 ? j : 0);
          if ($ + ce > oe) break;
          U = $, X = u + 1;
        }
        T(X);
      };
      n();
      const a = new ResizeObserver(n);
      return a.observe(e), () => a.disconnect();
    }, [v, f, i.length]);
    const R = v ? le : z;
    return /* @__PURE__ */ s(w.Root, { open: h, onOpenChange: Q, children: [
      /* @__PURE__ */ s(
        w.Trigger,
        {
          ref: J,
          id: q,
          disabled: E || N,
          className: b(
            "group flex min-h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 py-1.5 text-xs outline-none transition-colors cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-50",
            I ? "border-red-500 dark:border-red-500 focus-visible:border-red-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : M ? "border-slate-300 dark:border-slate-500 focus-visible:border-slate-500 focus-visible:border-[1.5px] dark:focus-visible:border-slate-300 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300" : "border-slate-200 dark:border-slate-600 focus-visible:border-blue-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)] data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
          ),
          "aria-invalid": I,
          "aria-label": F,
          onMouseEnter: () => P(!0),
          onMouseLeave: () => P(!1),
          children: [
            /* @__PURE__ */ s(
              "div",
              {
                ref: H,
                className: b(
                  "flex flex-1 gap-1 relative",
                  f === "wrap" ? "flex-wrap" : "flex-nowrap overflow-hidden"
                ),
                children: [
                  v && f === "truncate" && i.length > 0 && /* @__PURE__ */ r(
                    "div",
                    {
                      ref: W,
                      "aria-hidden": !0,
                      className: "absolute inset-y-0 left-0 flex flex-nowrap gap-1 opacity-0 pointer-events-none",
                      children: i.map((e) => /* @__PURE__ */ s(
                        "span",
                        {
                          "data-measure-chip": !0,
                          className: "inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 text-xs flex-shrink-0",
                          children: [
                            /* @__PURE__ */ r("span", { children: e.label }),
                            /* @__PURE__ */ r("span", { className: "flex-shrink-0", children: /* @__PURE__ */ r(y, { size: 18 }) })
                          ]
                        },
                        e.value
                      ))
                    }
                  ),
                  i.length === 0 ? /* @__PURE__ */ r("span", { className: "text-slate-500 dark:text-slate-50", children: B }) : f === "truncate" ? /* @__PURE__ */ s(de, { children: [
                    i.slice(0, R).map((e) => /* @__PURE__ */ s(
                      "span",
                      {
                        className: "inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 text-xs flex-shrink-0",
                        children: [
                          /* @__PURE__ */ r("span", { children: e.label }),
                          /* @__PURE__ */ r(
                            "span",
                            {
                              role: "img",
                              "aria-label": `${e.label} 삭제`,
                              onClick: (t) => O(e.value, t),
                              className: "cursor-pointer flex-shrink-0",
                              children: /* @__PURE__ */ r(y, { size: 18 })
                            }
                          )
                        ]
                      },
                      e.value
                    )),
                    i.length > R && /* @__PURE__ */ s("span", { className: "inline-flex items-center rounded bg-slate-200 dark:bg-slate-600 px-1.5 py-0.5 text-xs flex-shrink-0", children: [
                      "+",
                      i.length - R
                    ] })
                  ] }) : i.map((e) => /* @__PURE__ */ s(
                    "span",
                    {
                      className: "inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 text-xs",
                      children: [
                        e.label,
                        /* @__PURE__ */ r(
                          "span",
                          {
                            role: "img",
                            "aria-label": `${e.label} 삭제`,
                            onClick: (t) => O(e.value, t),
                            className: "cursor-pointer",
                            children: /* @__PURE__ */ r(y, { size: 18 })
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
              se && /* @__PURE__ */ r(
                "span",
                {
                  role: "button",
                  "aria-label": "전체 선택 초기화",
                  onClick: re,
                  className: "flex items-center",
                  children: /* @__PURE__ */ r("span", { className: "p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 cursor-pointer transition-colors", children: /* @__PURE__ */ r(y, { size: 20 }) })
                }
              ),
              N ? /* @__PURE__ */ r(xe, { size: "sm" }) : /* @__PURE__ */ r(
                ue,
                {
                  size: 24,
                  className: b(
                    "text-slate-900 transition-transform duration-200 dark:text-slate-50",
                    h && "rotate-180"
                  )
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ r(w.Portal, { children: /* @__PURE__ */ r(
        w.Content,
        {
          className: b(
            "z-50 rounded-[5px] border border-slate-200 dark:border-slate-600 w-[var(--radix-popover-trigger-width)]",
            "bg-white/50 dark:bg-slate-800/50 backdrop-blur-[12px]",
            "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
            "p-[5px]",
            "animate-in fade-in-0 zoom-in-95"
          ),
          sideOffset: 4,
          align: "start",
          children: /* @__PURE__ */ s(
            x,
            {
              className: "flex flex-col",
              value: C,
              onValueChange: p,
              children: [
                /* @__PURE__ */ s("div", { className: "flex items-center gap-2 px-2 pb-2 border-b border-slate-200 dark:border-slate-600", children: [
                  /* @__PURE__ */ r(pe, { size: 20, className: "text-slate-400" }),
                  /* @__PURE__ */ r(
                    x.Input,
                    {
                      value: A,
                      onValueChange: Z,
                      placeholder: G,
                      className: "flex-1 bg-transparent text-xs outline-none placeholder:text-slate-400",
                      onKeyDown: ae
                    }
                  )
                ] }),
                /* @__PURE__ */ s(x.List, { ref: S, className: "flex flex-col gap-[5px] max-h-[240px] overflow-y-auto pt-2", children: [
                  /* @__PURE__ */ r(x.Empty, { className: "py-2 text-center text-xs text-slate-500", children: "검색 결과가 없습니다." }),
                  m.map((e) => {
                    const t = c.includes(e.value);
                    return /* @__PURE__ */ s(
                      x.Item,
                      {
                        value: e.label,
                        disabled: e.disabled,
                        onSelect: () => te(e.value),
                        className: b(
                          "relative flex h-[29px] cursor-pointer select-none items-center gap-2 rounded-[2px] px-[5px] py-[5px]",
                          "text-xs text-slate-800 dark:text-slate-50 outline-none",
                          "hover:bg-slate-100 dark:hover:bg-slate-700",
                          "data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-700",
                          "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                        ),
                        children: [
                          /* @__PURE__ */ r(
                            fe,
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
he.displayName = "MultiSelect";
export {
  he as MultiSelect
};
//# sourceMappingURL=multi-select.mjs.map
