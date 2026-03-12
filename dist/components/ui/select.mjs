import { jsxs as r, jsx as e, Fragment as K } from "react/jsx-runtime";
import * as o from "react";
import { Command as v } from "cmdk";
import * as u from "@radix-ui/react-popover";
import { cn as d } from "../../lib/utils.mjs";
import { SearchIcon as $ } from "../../icons/SearchIcon.mjs";
import { UpIcon as F } from "../../icons/UpIcon.mjs";
import { XIcon as j } from "../../icons/XIcon.mjs";
import { Checkbox as Q } from "./checkbox.mjs";
import { inputSizeStyles as W } from "./input.mjs";
const q = o.forwardRef(
  ({
    id: w,
    placeholder: g = "선택하세요",
    options: f,
    value: p,
    defaultValue: i,
    onValueChange: n,
    error: s,
    disabled: x,
    ariaLabel: k,
    tableMode: z,
    clearable: I = !0
  }, N) => {
    const [c, _] = o.useState(!1), [L, b] = o.useState(!1), [H, O] = o.useState(i || ""), S = p !== void 0 ? p : H, y = f.find((a) => a.value === S), P = (a) => {
      p === void 0 && O(a), n == null || n(a), _(!1);
    }, R = (a) => {
      a.stopPropagation(), p === void 0 && O(""), n == null || n("");
    }, m = I && S && L && !x;
    return /* @__PURE__ */ r(u.Root, { open: c, onOpenChange: _, children: [
      /* @__PURE__ */ r(
        u.Trigger,
        {
          ref: N,
          id: w,
          disabled: x,
          className: d(
            "group flex h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 text-xs outline-none transition-colors cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-50",
            s ? "border-red-500 dark:border-red-500 focus-visible:border-red-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : z ? "border-slate-300 dark:border-slate-500 focus-visible:border-slate-500 focus-visible:border-[1.5px] dark:focus-visible:border-slate-300 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300" : "border-slate-100 dark:border-slate-600 focus-visible:border-blue-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)] data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
          ),
          "aria-invalid": s,
          "aria-label": k,
          onMouseEnter: () => b(!0),
          onMouseLeave: () => b(!1),
          children: [
            /* @__PURE__ */ e(
              "span",
              {
                className: d(
                  "truncate",
                  !y && "text-slate-300 dark:text-slate-500"
                ),
                children: (y == null ? void 0 : y.label) || g
              }
            ),
            /* @__PURE__ */ r("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
              m && /* @__PURE__ */ e(
                "span",
                {
                  role: "button",
                  "aria-label": "선택 초기화",
                  onClick: R,
                  className: "flex items-center",
                  children: /* @__PURE__ */ e("span", { className: "p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 cursor-pointer transition-colors", children: /* @__PURE__ */ e(j, { size: 20 }) })
                }
              ),
              /* @__PURE__ */ e(
                F,
                {
                  size: 24,
                  className: d(
                    "text-slate-900 transition-transform duration-200 dark:text-slate-50",
                    c && "rotate-180"
                  )
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e(u.Portal, { children: /* @__PURE__ */ e(
        u.Content,
        {
          className: d(
            "z-50 rounded-[5px] border border-slate-100 dark:border-slate-600 w-[var(--radix-popover-trigger-width)]",
            "bg-white/50 dark:bg-slate-800/50 backdrop-blur-[12px]",
            "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
            "p-[5px]",
            "animate-in fade-in-0 zoom-in-95"
          ),
          sideOffset: 4,
          align: "start",
          children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-[5px] max-h-[240px] overflow-y-auto", children: f.map((a) => /* @__PURE__ */ e(
            "div",
            {
              onClick: () => !a.disabled && P(a.value),
              className: d(
                "relative flex h-[29px] cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                "text-xs text-slate-700 dark:text-slate-50 outline-none",
                "hover:bg-slate-100 dark:hover:bg-slate-700",
                a.disabled && "pointer-events-none opacity-50",
                S === a.value && "bg-accent text-accent-foreground"
              ),
              children: a.label
            },
            a.value
          )) })
        }
      ) })
    ] });
  }
);
q.displayName = "BasicSelect";
const A = o.forwardRef(
  ({
    id: w,
    placeholder: g = "선택하세요",
    searchPlaceholder: f = "검색...",
    options: p,
    value: i,
    defaultValue: n,
    onValueChange: s,
    error: x,
    disabled: k,
    ariaLabel: z,
    tableMode: I,
    clearable: N = !0
  }, c) => {
    const [_, L] = o.useState(!1), [b, H] = o.useState(""), [O, S] = o.useState(!1), [y, P] = o.useState(n || ""), R = i !== void 0 ? i : y, m = p.find((l) => l.value === R), a = p.filter(
      (l) => l.label.toLowerCase().includes(b.toLowerCase())
    ), M = (l) => {
      i === void 0 && P(l), s == null || s(l), L(!1), H("");
    }, E = (l) => {
      l.stopPropagation(), i === void 0 && P(""), s == null || s("");
    }, T = N && R && O && !k;
    return /* @__PURE__ */ r(u.Root, { open: _, onOpenChange: L, children: [
      /* @__PURE__ */ r(
        u.Trigger,
        {
          ref: c,
          id: w,
          disabled: k,
          className: d(
            "group flex h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 text-xs outline-none transition-colors cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-50",
            x ? "border-red-500 dark:border-red-500 focus-visible:border-red-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : I ? "border-slate-300 dark:border-slate-500 focus-visible:border-slate-500 focus-visible:border-[1.5px] dark:focus-visible:border-slate-300 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300" : "border-slate-100 dark:border-slate-600 focus-visible:border-blue-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)] data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
          ),
          "aria-invalid": x,
          "aria-label": z,
          onMouseEnter: () => S(!0),
          onMouseLeave: () => S(!1),
          children: [
            /* @__PURE__ */ e(
              "span",
              {
                className: d(
                  "truncate",
                  !m && "text-slate-300 dark:text-slate-500"
                ),
                children: (m == null ? void 0 : m.label) || g
              }
            ),
            /* @__PURE__ */ r("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
              T && /* @__PURE__ */ e(
                "span",
                {
                  role: "button",
                  "aria-label": "선택 초기화",
                  onClick: E,
                  className: "flex items-center",
                  children: /* @__PURE__ */ e("span", { className: "p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 cursor-pointer transition-colors", children: /* @__PURE__ */ e(j, { size: 20 }) })
                }
              ),
              /* @__PURE__ */ e(
                F,
                {
                  size: 24,
                  className: d(
                    "text-slate-900 transition-transform duration-200 dark:text-slate-50",
                    _ && "rotate-180"
                  )
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e(u.Portal, { children: /* @__PURE__ */ e(
        u.Content,
        {
          className: d(
            "z-50 rounded-[5px] border border-slate-100 dark:border-slate-600 w-[var(--radix-popover-trigger-width)]",
            "bg-white/50 dark:bg-slate-800/50 backdrop-blur-[12px]",
            "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
            "p-[5px]",
            "animate-in fade-in-0 zoom-in-95"
          ),
          sideOffset: 4,
          align: "start",
          children: /* @__PURE__ */ r(v, { className: "flex flex-col", children: [
            /* @__PURE__ */ r("div", { className: "flex items-center gap-2 px-2 pb-2 border-b border-slate-100 dark:border-slate-600", children: [
              /* @__PURE__ */ e($, { size: 20, className: "text-slate-400" }),
              /* @__PURE__ */ e(
                v.Input,
                {
                  value: b,
                  onValueChange: H,
                  placeholder: f,
                  className: "flex-1 bg-transparent text-xs outline-none placeholder:text-slate-400"
                }
              )
            ] }),
            /* @__PURE__ */ r(v.List, { className: "flex flex-col gap-[5px] max-h-[240px] overflow-y-auto pt-2", children: [
              /* @__PURE__ */ e(v.Empty, { className: "py-2 text-center text-xs text-slate-500", children: "검색 결과가 없습니다." }),
              a.map((l) => /* @__PURE__ */ e(
                v.Item,
                {
                  value: l.label,
                  disabled: l.disabled,
                  onSelect: () => M(l.value),
                  className: d(
                    "relative flex h-[29px] cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                    "text-xs text-slate-700 dark:text-slate-50 outline-none",
                    "hover:bg-slate-100 dark:hover:bg-slate-700",
                    "data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-700",
                    "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
                    R === l.value && "bg-accent text-accent-foreground"
                  ),
                  children: l.label
                },
                l.value
              ))
            ] })
          ] })
        }
      ) })
    ] });
  }
);
A.displayName = "SearchableSelect";
const U = o.forwardRef(
  ({
    id: w,
    placeholder: g = "선택하세요",
    searchPlaceholder: f = "검색...",
    options: p,
    value: i,
    defaultValue: n,
    onValueChange: s,
    error: x,
    disabled: k,
    ariaLabel: z,
    tableMode: I,
    overflowMode: N = "truncate",
    maxDisplayCount: c = 2,
    clearable: _ = !0
  }, L) => {
    const [b, H] = o.useState(!1), [O, S] = o.useState(""), [y, P] = o.useState(!1), [R, m] = o.useState(
      n || []
    ), a = i !== void 0 ? i : R, M = p.filter(
      (t) => a.includes(t.value)
    ), E = p.filter(
      (t) => t.label.toLowerCase().includes(O.toLowerCase())
    ), T = (t) => {
      const h = a.includes(t) ? a.filter((B) => B !== t) : [...a, t];
      i === void 0 && m(h), s == null || s(h);
    }, l = (t, h) => {
      h.stopPropagation();
      const B = a.filter((J) => J !== t);
      i === void 0 && m(B), s == null || s(B);
    }, X = (t) => {
      t.stopPropagation(), i === void 0 && m([]), s == null || s([]);
    }, G = _ && a.length > 0 && y && !k;
    return /* @__PURE__ */ r(u.Root, { open: b, onOpenChange: H, children: [
      /* @__PURE__ */ r(
        u.Trigger,
        {
          ref: L,
          id: w,
          disabled: k,
          className: d(
            "group flex min-h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 py-1.5 text-xs outline-none transition-colors cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-50",
            x ? "border-red-500 dark:border-red-500 focus-visible:border-red-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)] data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : I ? "border-slate-300 dark:border-slate-500 focus-visible:border-slate-500 focus-visible:border-[1.5px] dark:focus-visible:border-slate-300 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300" : "border-slate-100 dark:border-slate-600 focus-visible:border-blue-500 focus-visible:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)] data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
          ),
          "aria-invalid": x,
          "aria-label": z,
          onMouseEnter: () => P(!0),
          onMouseLeave: () => P(!1),
          children: [
            /* @__PURE__ */ e("div", { className: d(
              "flex flex-1 gap-1",
              N === "wrap" ? "flex-wrap" : "flex-nowrap overflow-hidden"
            ), children: M.length === 0 ? /* @__PURE__ */ e("span", { className: "text-slate-500 dark:text-slate-50", children: g }) : N === "truncate" ? /* @__PURE__ */ r(K, { children: [
              M.slice(0, c).map((t) => /* @__PURE__ */ r(
                "span",
                {
                  className: "inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 text-xs flex-shrink-0",
                  children: [
                    /* @__PURE__ */ e("span", { className: "truncate max-w-[80px]", children: t.label }),
                    /* @__PURE__ */ e(
                      "span",
                      {
                        role: "img",
                        "aria-label": `${t.label} 삭제`,
                        onClick: (h) => l(t.value, h),
                        className: "cursor-pointer flex-shrink-0",
                        children: /* @__PURE__ */ e(j, { size: 18 })
                      }
                    )
                  ]
                },
                t.value
              )),
              M.length > c && /* @__PURE__ */ r("span", { className: "inline-flex items-center rounded bg-slate-200 dark:bg-slate-600 px-1.5 py-0.5 text-xs flex-shrink-0", children: [
                "+",
                M.length - c
              ] })
            ] }) : M.map((t) => /* @__PURE__ */ r(
              "span",
              {
                className: "inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 text-xs",
                children: [
                  t.label,
                  /* @__PURE__ */ e(
                    "span",
                    {
                      role: "img",
                      "aria-label": `${t.label} 삭제`,
                      onClick: (h) => l(t.value, h),
                      className: "cursor-pointer",
                      children: /* @__PURE__ */ e(j, { size: 18 })
                    }
                  )
                ]
              },
              t.value
            )) }),
            /* @__PURE__ */ r("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
              G && /* @__PURE__ */ e(
                "span",
                {
                  role: "button",
                  "aria-label": "전체 선택 초기화",
                  onClick: X,
                  className: "flex items-center",
                  children: /* @__PURE__ */ e("span", { className: "p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 cursor-pointer transition-colors", children: /* @__PURE__ */ e(j, { size: 20 }) })
                }
              ),
              /* @__PURE__ */ e(
                F,
                {
                  size: 24,
                  className: d(
                    "text-slate-900 transition-transform duration-200 dark:text-slate-50",
                    b && "rotate-180"
                  )
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ e(u.Portal, { children: /* @__PURE__ */ e(
        u.Content,
        {
          className: d(
            "z-50 rounded-[5px] border border-slate-100 dark:border-slate-600 w-[var(--radix-popover-trigger-width)]",
            "bg-white/50 dark:bg-slate-800/50 backdrop-blur-[12px]",
            "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
            "p-[5px]",
            "animate-in fade-in-0 zoom-in-95"
          ),
          sideOffset: 4,
          align: "start",
          children: /* @__PURE__ */ r(v, { className: "flex flex-col", children: [
            /* @__PURE__ */ r("div", { className: "flex items-center gap-2 px-2 pb-2 border-b border-slate-100 dark:border-slate-600", children: [
              /* @__PURE__ */ e($, { size: 20, className: "text-slate-400" }),
              /* @__PURE__ */ e(
                v.Input,
                {
                  value: O,
                  onValueChange: S,
                  placeholder: f,
                  className: "flex-1 bg-transparent text-xs outline-none placeholder:text-slate-400"
                }
              )
            ] }),
            /* @__PURE__ */ r(v.List, { className: "flex flex-col gap-[5px] max-h-[240px] overflow-y-auto pt-2", children: [
              /* @__PURE__ */ e(v.Empty, { className: "py-2 text-center text-xs text-slate-500", children: "검색 결과가 없습니다." }),
              E.map((t) => {
                const h = a.includes(t.value);
                return /* @__PURE__ */ r(
                  v.Item,
                  {
                    value: t.label,
                    disabled: t.disabled,
                    onSelect: () => T(t.value),
                    className: d(
                      "relative flex h-[29px] cursor-pointer select-none items-center gap-2 rounded-[2px] px-[5px] py-[5px]",
                      "text-xs text-slate-700 dark:text-slate-50 outline-none",
                      "hover:bg-slate-100 dark:hover:bg-slate-700",
                      "data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-700",
                      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                    ),
                    children: [
                      /* @__PURE__ */ e(
                        Q,
                        {
                          checked: h,
                          className: "pointer-events-none h-4 w-4"
                        }
                      ),
                      t.label
                    ]
                  },
                  t.value
                );
              })
            ] })
          ] })
        }
      ) })
    ] });
  }
);
U.displayName = "MultiSelect";
const Y = o.forwardRef(
  (w, g) => {
    const {
      label: f,
      size: p = "full",
      error: i,
      errorMessage: n,
      className: s,
      "aria-label": x,
      reserveLabelSpace: k,
      required: z,
      searchable: I = !1,
      multiple: N = !1
    } = w, c = o.useId(), _ = () => {
      const { "aria-label": L, ...b } = w;
      return N ? /* @__PURE__ */ e(
        U,
        {
          ref: g,
          id: c,
          ariaLabel: x,
          ...b
        }
      ) : I ? /* @__PURE__ */ e(
        A,
        {
          ref: g,
          id: c,
          ariaLabel: x,
          ...b
        }
      ) : /* @__PURE__ */ e(
        q,
        {
          ref: g,
          id: c,
          ariaLabel: x,
          ...b
        }
      );
    };
    return /* @__PURE__ */ r(
      "div",
      {
        className: d(
          "flex flex-col gap-1",
          W[p],
          s
        ),
        children: [
          (f || k) && /* @__PURE__ */ r(
            "label",
            {
              htmlFor: c,
              className: d(
                "flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400",
                !f && "invisible"
              ),
              children: [
                z && /* @__PURE__ */ e("span", { className: "size-2 rounded-full bg-stone-400", "aria-hidden": "true" }),
                f || " "
              ]
            }
          ),
          _(),
          i && n && /* @__PURE__ */ e("span", { className: "text-xs text-destructive dark:text-red-400", children: n })
        ]
      }
    );
  }
);
Y.displayName = "Select";
export {
  Y as Select,
  W as inputSizeStyles
};
//# sourceMappingURL=select.mjs.map
