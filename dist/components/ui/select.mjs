import { jsxs as s, jsx as e } from "react/jsx-runtime";
import * as i from "react";
import * as f from "@radix-ui/react-select";
import { Command as c } from "../../node_modules/cmdk/dist/index.mjs";
import * as w from "@radix-ui/react-popover";
import { cn as l } from "../../lib/utils.mjs";
import { SearchIcon as M } from "../../icons/SearchIcon.mjs";
import { UpIcon as T } from "../../icons/UpIcon.mjs";
import { XIcon as U } from "../../icons/XIcon.mjs";
import { Checkbox as X } from "./checkbox.mjs";
const $ = {
  sm: "w-[160px]",
  md: "w-[260px]",
  lg: "w-[360px]",
  full: "w-full"
}, B = i.forwardRef(
  ({
    id: h,
    placeholder: p = "선택하세요",
    options: x,
    value: b,
    defaultValue: o,
    onValueChange: g,
    error: t,
    disabled: n,
    ariaLabel: k,
    tableMode: N
  }, _) => /* @__PURE__ */ s(
    f.Root,
    {
      value: b,
      defaultValue: o,
      onValueChange: g,
      disabled: n,
      children: [
        /* @__PURE__ */ s(
          f.Trigger,
          {
            ref: _,
            id: h,
            className: l(
              "group flex h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
              "px-3 text-xs outline-none transition-colors cursor-pointer",
              "disabled:cursor-not-allowed disabled:opacity-50",
              t ? "border-red-500 dark:border-red-500 data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : N ? "border-slate-300 dark:border-slate-500 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300" : "border-slate-100 dark:border-slate-600 data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]",
              "data-[placeholder]:text-slate-500 dark:data-[placeholder]:text-slate-50"
            ),
            "aria-invalid": t,
            "aria-label": k,
            children: [
              /* @__PURE__ */ e(f.Value, { placeholder: p }),
              /* @__PURE__ */ e(f.Icon, { asChild: !0, children: /* @__PURE__ */ e(
                T,
                {
                  size: 24,
                  className: "text-slate-900 transition-transform duration-200 group-data-[state=open]:rotate-180 dark:text-slate-50"
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ e(f.Portal, { children: /* @__PURE__ */ e(
          f.Content,
          {
            className: l(
              "relative z-50 overflow-hidden rounded-[5px] border border-slate-100 dark:border-slate-600 w-[var(--radix-select-trigger-width)]",
              "bg-white/50 dark:bg-slate-800/50 backdrop-blur-[12px]",
              "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
              "p-[5px]",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
              "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
            ),
            position: "popper",
            sideOffset: 4,
            children: /* @__PURE__ */ e(f.Viewport, { className: "flex flex-col gap-[5px] max-h-[240px] overflow-y-auto", children: x.map((d) => /* @__PURE__ */ e(
              f.Item,
              {
                value: d.value,
                disabled: d.disabled,
                className: l(
                  "relative flex h-[29px] cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                  "text-xs text-slate-500 dark:text-slate-50 outline-none",
                  "hover:bg-slate-100 dark:hover:bg-slate-700",
                  "focus:bg-slate-100 dark:focus:bg-slate-700",
                  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                  "data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
                ),
                children: /* @__PURE__ */ e(f.ItemText, { children: d.label })
              },
              d.value
            )) })
          }
        ) })
      ]
    }
  )
);
B.displayName = "BasicSelect";
const C = i.forwardRef(
  ({
    id: h,
    placeholder: p = "선택하세요",
    searchPlaceholder: x = "검색...",
    options: b,
    value: o,
    defaultValue: g,
    onValueChange: t,
    error: n,
    disabled: k,
    ariaLabel: N,
    tableMode: _
  }, d) => {
    const [S, z] = i.useState(!1), [m, I] = i.useState(""), [L, O] = i.useState(g || ""), u = o !== void 0 ? o : L, y = b.find((r) => r.value === u), P = b.filter(
      (r) => r.label.toLowerCase().includes(m.toLowerCase())
    ), j = (r) => {
      o === void 0 && O(r), t == null || t(r), z(!1), I("");
    };
    return /* @__PURE__ */ s(w.Root, { open: S, onOpenChange: z, children: [
      /* @__PURE__ */ s(
        w.Trigger,
        {
          ref: d,
          id: h,
          disabled: k,
          className: l(
            "group flex h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 text-xs outline-none transition-colors cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-50",
            n ? "border-red-500 dark:border-red-500 data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : _ ? "border-slate-300 dark:border-slate-500 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300" : "border-slate-100 dark:border-slate-600 data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
          ),
          "aria-invalid": n,
          "aria-label": N,
          children: [
            /* @__PURE__ */ e(
              "span",
              {
                className: l(
                  "truncate",
                  !y && "text-slate-500 dark:text-slate-50"
                ),
                children: (y == null ? void 0 : y.label) || p
              }
            ),
            /* @__PURE__ */ e(
              T,
              {
                size: 24,
                className: l(
                  "text-slate-900 transition-transform duration-200 dark:text-slate-50",
                  S && "rotate-180"
                )
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ e(w.Portal, { children: /* @__PURE__ */ e(
        w.Content,
        {
          className: l(
            "z-50 rounded-[5px] border border-slate-100 dark:border-slate-600 w-[var(--radix-popover-trigger-width)]",
            "bg-white/50 dark:bg-slate-800/50 backdrop-blur-[12px]",
            "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
            "p-[5px]",
            "animate-in fade-in-0 zoom-in-95"
          ),
          sideOffset: 4,
          align: "start",
          children: /* @__PURE__ */ s(c, { className: "flex flex-col", children: [
            /* @__PURE__ */ s("div", { className: "flex items-center gap-2 px-2 pb-2 border-b border-slate-100 dark:border-slate-600", children: [
              /* @__PURE__ */ e(M, { size: 20, className: "text-slate-400" }),
              /* @__PURE__ */ e(
                c.Input,
                {
                  value: m,
                  onValueChange: I,
                  placeholder: x,
                  className: "flex-1 bg-transparent text-xs outline-none placeholder:text-slate-400"
                }
              )
            ] }),
            /* @__PURE__ */ s(c.List, { className: "flex flex-col gap-[5px] max-h-[240px] overflow-y-auto pt-2", children: [
              /* @__PURE__ */ e(c.Empty, { className: "py-2 text-center text-xs text-slate-500", children: "검색 결과가 없습니다." }),
              P.map((r) => /* @__PURE__ */ e(
                c.Item,
                {
                  value: r.label,
                  disabled: r.disabled,
                  onSelect: () => j(r.value),
                  className: l(
                    "relative flex h-[29px] cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                    "text-xs text-slate-500 dark:text-slate-50 outline-none",
                    "hover:bg-slate-100 dark:hover:bg-slate-700",
                    "data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-700",
                    "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
                    u === r.value && "bg-accent text-accent-foreground"
                  ),
                  children: r.label
                },
                r.value
              ))
            ] })
          ] })
        }
      ) })
    ] });
  }
);
C.displayName = "SearchableSelect";
const E = i.forwardRef(
  ({
    id: h,
    placeholder: p = "선택하세요",
    searchPlaceholder: x = "검색...",
    options: b,
    value: o,
    defaultValue: g,
    onValueChange: t,
    error: n,
    disabled: k,
    ariaLabel: N,
    tableMode: _
  }, d) => {
    const [S, z] = i.useState(!1), [m, I] = i.useState(""), [L, O] = i.useState(
      g || []
    ), u = o !== void 0 ? o : L, y = b.filter(
      (a) => u.includes(a.value)
    ), P = b.filter(
      (a) => a.label.toLowerCase().includes(m.toLowerCase())
    ), j = (a) => {
      const v = u.includes(a) ? u.filter((R) => R !== a) : [...u, a];
      o === void 0 && O(v), t == null || t(v);
    }, r = (a, v) => {
      v.stopPropagation();
      const R = u.filter((F) => F !== a);
      o === void 0 && O(R), t == null || t(R);
    };
    return /* @__PURE__ */ s(w.Root, { open: S, onOpenChange: z, children: [
      /* @__PURE__ */ s(
        w.Trigger,
        {
          ref: d,
          id: h,
          disabled: k,
          className: l(
            "group flex min-h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 py-1.5 text-xs outline-none transition-colors cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-50",
            n ? "border-red-500 dark:border-red-500 data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : _ ? "border-slate-300 dark:border-slate-500 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300" : "border-slate-100 dark:border-slate-600 data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
          ),
          "aria-invalid": n,
          "aria-label": N,
          children: [
            /* @__PURE__ */ e("div", { className: "flex flex-1 flex-wrap gap-1", children: y.length === 0 ? /* @__PURE__ */ e("span", { className: "text-slate-500 dark:text-slate-50", children: p }) : y.map((a) => /* @__PURE__ */ s(
              "span",
              {
                className: "inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 text-xs",
                children: [
                  a.label,
                  /* @__PURE__ */ e(
                    "span",
                    {
                      role: "img",
                      "aria-label": `${a.label} 삭제`,
                      onClick: (v) => r(a.value, v),
                      className: "cursor-pointer",
                      children: /* @__PURE__ */ e(U, { size: 18 })
                    }
                  )
                ]
              },
              a.value
            )) }),
            /* @__PURE__ */ e(
              T,
              {
                size: 24,
                className: l(
                  "text-slate-900 transition-transform duration-200 dark:text-slate-50 flex-shrink-0",
                  S && "rotate-180"
                )
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ e(w.Portal, { children: /* @__PURE__ */ e(
        w.Content,
        {
          className: l(
            "z-50 rounded-[5px] border border-slate-100 dark:border-slate-600 w-[var(--radix-popover-trigger-width)]",
            "bg-white/50 dark:bg-slate-800/50 backdrop-blur-[12px]",
            "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
            "p-[5px]",
            "animate-in fade-in-0 zoom-in-95"
          ),
          sideOffset: 4,
          align: "start",
          children: /* @__PURE__ */ s(c, { className: "flex flex-col", children: [
            /* @__PURE__ */ s("div", { className: "flex items-center gap-2 px-2 pb-2 border-b border-slate-100 dark:border-slate-600", children: [
              /* @__PURE__ */ e(M, { size: 20, className: "text-slate-400" }),
              /* @__PURE__ */ e(
                c.Input,
                {
                  value: m,
                  onValueChange: I,
                  placeholder: x,
                  className: "flex-1 bg-transparent text-xs outline-none placeholder:text-slate-400"
                }
              )
            ] }),
            /* @__PURE__ */ s(c.List, { className: "flex flex-col gap-[5px] max-h-[240px] overflow-y-auto pt-2", children: [
              /* @__PURE__ */ e(c.Empty, { className: "py-2 text-center text-xs text-slate-500", children: "검색 결과가 없습니다." }),
              P.map((a) => {
                const v = u.includes(a.value);
                return /* @__PURE__ */ s(
                  c.Item,
                  {
                    value: a.label,
                    disabled: a.disabled,
                    onSelect: () => j(a.value),
                    className: l(
                      "relative flex h-[29px] cursor-pointer select-none items-center gap-2 rounded-[2px] px-[5px] py-[5px]",
                      "text-xs text-slate-500 dark:text-slate-50 outline-none",
                      "hover:bg-slate-100 dark:hover:bg-slate-700",
                      "data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-700",
                      "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
                    ),
                    children: [
                      /* @__PURE__ */ e(
                        X,
                        {
                          checked: v,
                          className: "pointer-events-none h-4 w-4"
                        }
                      ),
                      a.label
                    ]
                  },
                  a.value
                );
              })
            ] })
          ] })
        }
      ) })
    ] });
  }
);
E.displayName = "MultiSelect";
const q = i.forwardRef(
  (h, p) => {
    const {
      label: x,
      size: b = "full",
      error: o,
      errorMessage: g,
      className: t,
      "aria-label": n,
      reserveLabelSpace: k,
      searchable: N = !1,
      multiple: _ = !1
    } = h, d = i.useId(), S = () => {
      const { "aria-label": z, ...m } = h;
      return _ ? /* @__PURE__ */ e(
        E,
        {
          ref: p,
          id: d,
          ariaLabel: n,
          ...m
        }
      ) : N ? /* @__PURE__ */ e(
        C,
        {
          ref: p,
          id: d,
          ariaLabel: n,
          ...m
        }
      ) : /* @__PURE__ */ e(
        B,
        {
          ref: p,
          id: d,
          ariaLabel: n,
          ...m
        }
      );
    };
    return /* @__PURE__ */ s(
      "div",
      {
        className: l(
          "flex flex-col gap-1",
          $[b],
          t
        ),
        children: [
          (x || k) && /* @__PURE__ */ e(
            "label",
            {
              htmlFor: d,
              className: l(
                "text-xs text-slate-600 dark:text-slate-50",
                !x && "invisible"
              ),
              children: x || " "
            }
          ),
          S(),
          o && g && /* @__PURE__ */ e("span", { className: "text-xs text-destructive dark:text-red-400", children: g })
        ]
      }
    );
  }
);
q.displayName = "Select";
export {
  q as Select,
  $ as selectSizeStyles
};
//# sourceMappingURL=select.mjs.map
