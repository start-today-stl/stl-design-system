import { jsxs as s, jsx as r, Fragment as J } from "react/jsx-runtime";
import * as n from "react";
import { Command as x } from "cmdk";
import * as h from "@radix-ui/react-popover";
import { cn as b } from "../../../lib/utils.mjs";
import { SearchIcon as Q } from "../../../icons/SearchIcon.mjs";
import { UpIcon as W } from "../../../icons/UpIcon.mjs";
import { XIcon as N } from "../../../icons/XIcon.mjs";
import { Checkbox as Z } from "../checkbox.mjs";
import { Spinner as C } from "../spinner.mjs";
const V = [], ee = n.forwardRef(
  ({
    id: P,
    placeholder: D = "선택하세요",
    searchPlaceholder: A = "검색...",
    options: _,
    value: d,
    defaultValue: H,
    onValueChange: l,
    error: y,
    disabled: S,
    ariaLabel: M,
    tableMode: T,
    overflowMode: I = "truncate",
    maxDisplayCount: g = 2,
    clearable: j = !0,
    loading: v
  }, U) => {
    const [f, $] = n.useState(!1), [L, K] = n.useState(""), [q, z] = n.useState(!1), [B, k] = n.useState(
      H || []
    ), [R, c] = n.useState(""), w = n.useRef(null), E = n.useRef(d !== void 0);
    d !== void 0 && (E.current = !0);
    const o = E.current ? d ?? V : B, p = _.filter(
      (e) => o.includes(e.value)
    ), u = _.filter(
      (e) => e.label.toLowerCase().includes(L.toLowerCase())
    );
    n.useEffect(() => {
      f && u.length > 0 && c(u[0].label);
    }, [f]);
    const m = (e) => {
      if (w.current) {
        const t = w.current.querySelector(`[data-value="${e.toLowerCase()}"]`);
        t == null || t.scrollIntoView({ block: "nearest" });
      }
    }, F = (e) => {
      const t = o.includes(e) ? o.filter((i) => i !== e) : [...o, e];
      d === void 0 && k(t), l == null || l(t);
    }, O = (e, t) => {
      t.stopPropagation();
      const i = o.filter((a) => a !== e);
      d === void 0 && k(i), l == null || l(i);
    }, X = (e) => {
      e.stopPropagation(), d === void 0 && k([]), l == null || l([]);
    }, Y = (e) => {
      const t = u.filter((a) => !a.disabled);
      if (t.length === 0) return;
      const i = t.findIndex((a) => a.label === R);
      if (e.key === "Home") {
        e.preventDefault();
        const a = t[0].label;
        c(a), m(a);
      } else if (e.key === "End") {
        e.preventDefault();
        const a = t[t.length - 1].label;
        c(a), m(a);
      } else if (e.key === "ArrowDown") {
        if (i === t.length - 1) {
          e.preventDefault();
          const a = t[0].label;
          c(a), m(a);
        }
      } else if (e.key === "ArrowUp" && i === 0) {
        e.preventDefault();
        const a = t[t.length - 1].label;
        c(a), m(a);
      }
    }, G = j && o.length > 0 && q && !S && !v;
    return /* @__PURE__ */ s(h.Root, { open: f, onOpenChange: $, children: [
      /* @__PURE__ */ s(
        h.Trigger,
        {
          ref: U,
          id: P,
          disabled: S || v,
          className: b(
            "group flex min-h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 py-1.5 text-xs outline-none transition-colors cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-50",
            y ? "border-red-500 dark:border-red-500 focus-visible:border-red-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : T ? "border-slate-300 dark:border-slate-500 focus-visible:border-slate-500 focus-visible:border-[1.5px] dark:focus-visible:border-slate-300 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300" : "border-slate-200 dark:border-slate-600 focus-visible:border-blue-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)] data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
          ),
          "aria-invalid": y,
          "aria-label": M,
          onMouseEnter: () => z(!0),
          onMouseLeave: () => z(!1),
          children: [
            /* @__PURE__ */ r("div", { className: b(
              "flex flex-1 gap-1",
              I === "wrap" ? "flex-wrap" : "flex-nowrap overflow-hidden"
            ), children: p.length === 0 ? /* @__PURE__ */ r("span", { className: "text-slate-500 dark:text-slate-50", children: D }) : I === "truncate" ? /* @__PURE__ */ s(J, { children: [
              p.slice(0, g).map((e) => /* @__PURE__ */ s(
                "span",
                {
                  className: "inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 text-xs flex-shrink-0",
                  children: [
                    /* @__PURE__ */ r("span", { className: "truncate max-w-[80px]", children: e.label }),
                    /* @__PURE__ */ r(
                      "span",
                      {
                        role: "img",
                        "aria-label": `${e.label} 삭제`,
                        onClick: (t) => O(e.value, t),
                        className: "cursor-pointer flex-shrink-0",
                        children: /* @__PURE__ */ r(N, { size: 18 })
                      }
                    )
                  ]
                },
                e.value
              )),
              p.length > g && /* @__PURE__ */ s("span", { className: "inline-flex items-center rounded bg-slate-200 dark:bg-slate-600 px-1.5 py-0.5 text-xs flex-shrink-0", children: [
                "+",
                p.length - g
              ] })
            ] }) : p.map((e) => /* @__PURE__ */ s(
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
                      children: /* @__PURE__ */ r(N, { size: 18 })
                    }
                  )
                ]
              },
              e.value
            )) }),
            /* @__PURE__ */ s("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
              G && /* @__PURE__ */ r(
                "span",
                {
                  role: "button",
                  "aria-label": "전체 선택 초기화",
                  onClick: X,
                  className: "flex items-center",
                  children: /* @__PURE__ */ r("span", { className: "p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 cursor-pointer transition-colors", children: /* @__PURE__ */ r(N, { size: 20 }) })
                }
              ),
              v ? /* @__PURE__ */ r(C, { size: "sm" }) : /* @__PURE__ */ r(
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
      /* @__PURE__ */ r(h.Portal, { children: /* @__PURE__ */ r(
        h.Content,
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
              value: R,
              onValueChange: c,
              children: [
                /* @__PURE__ */ s("div", { className: "flex items-center gap-2 px-2 pb-2 border-b border-slate-200 dark:border-slate-600", children: [
                  /* @__PURE__ */ r(Q, { size: 20, className: "text-slate-400" }),
                  /* @__PURE__ */ r(
                    x.Input,
                    {
                      value: L,
                      onValueChange: K,
                      placeholder: A,
                      className: "flex-1 bg-transparent text-xs outline-none placeholder:text-slate-400",
                      onKeyDown: Y
                    }
                  )
                ] }),
                /* @__PURE__ */ s(x.List, { ref: w, className: "flex flex-col gap-[5px] max-h-[240px] overflow-y-auto pt-2", children: [
                  /* @__PURE__ */ r(x.Empty, { className: "py-2 text-center text-xs text-slate-500", children: "검색 결과가 없습니다." }),
                  u.map((e) => {
                    const t = o.includes(e.value);
                    return /* @__PURE__ */ s(
                      x.Item,
                      {
                        value: e.label,
                        disabled: e.disabled,
                        onSelect: () => F(e.value),
                        className: b(
                          "relative flex h-[29px] cursor-pointer select-none items-center gap-2 rounded-[2px] px-[5px] py-[5px]",
                          "text-xs text-slate-800 dark:text-slate-50 outline-none",
                          "hover:bg-slate-100 dark:hover:bg-slate-700",
                          "data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-700",
                          "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                        ),
                        children: [
                          /* @__PURE__ */ r(
                            Z,
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
ee.displayName = "MultiSelect";
export {
  ee as MultiSelect
};
//# sourceMappingURL=multi-select.mjs.map
