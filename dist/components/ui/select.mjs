import { jsxs as t, jsx as e } from "react/jsx-runtime";
import * as n from "react";
import * as f from "@radix-ui/react-select";
import { Command as p } from "../../node_modules/cmdk/dist/index.mjs";
import * as w from "@radix-ui/react-popover";
import { cn as l } from "../../lib/utils.mjs";
import { SearchIcon as M } from "../../icons/SearchIcon.mjs";
import { UpIcon as T } from "../../icons/UpIcon.mjs";
import { XIcon as F } from "../../icons/XIcon.mjs";
import { Checkbox as U } from "./checkbox.mjs";
import { inputSizeStyles as X } from "./input.mjs";
const B = n.forwardRef(
  ({
    id: h,
    placeholder: x = "선택하세요",
    options: b,
    value: m,
    defaultValue: d,
    onValueChange: g,
    error: r,
    disabled: o,
    ariaLabel: N,
    tableMode: _
  }, S) => /* @__PURE__ */ t(
    f.Root,
    {
      value: m,
      defaultValue: d,
      onValueChange: g,
      disabled: o,
      children: [
        /* @__PURE__ */ t(
          f.Trigger,
          {
            ref: S,
            id: h,
            className: l(
              "group flex h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
              "px-3 text-xs outline-none transition-colors cursor-pointer",
              "disabled:cursor-not-allowed disabled:opacity-50",
              r ? "border-red-500 dark:border-red-500 data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : _ ? "border-slate-300 dark:border-slate-500 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300" : "border-slate-100 dark:border-slate-600 data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]",
              "data-[placeholder]:text-slate-500 dark:data-[placeholder]:text-slate-50"
            ),
            "aria-invalid": r,
            "aria-label": N,
            children: [
              /* @__PURE__ */ e(f.Value, { placeholder: x }),
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
            children: /* @__PURE__ */ e(f.Viewport, { className: "flex flex-col gap-[5px] max-h-[240px] overflow-y-auto", children: b.map((i) => /* @__PURE__ */ e(
              f.Item,
              {
                value: i.value,
                disabled: i.disabled,
                className: l(
                  "relative flex h-[29px] cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                  "text-xs text-slate-500 dark:text-slate-50 outline-none",
                  "hover:bg-slate-100 dark:hover:bg-slate-700",
                  "focus:bg-slate-100 dark:focus:bg-slate-700",
                  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                  "data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
                ),
                children: /* @__PURE__ */ e(f.ItemText, { children: i.label })
              },
              i.value
            )) })
          }
        ) })
      ]
    }
  )
);
B.displayName = "BasicSelect";
const C = n.forwardRef(
  ({
    id: h,
    placeholder: x = "선택하세요",
    searchPlaceholder: b = "검색...",
    options: m,
    value: d,
    defaultValue: g,
    onValueChange: r,
    error: o,
    disabled: N,
    ariaLabel: _,
    tableMode: S
  }, i) => {
    const [c, z] = n.useState(!1), [I, v] = n.useState(""), [L, O] = n.useState(g || ""), u = d !== void 0 ? d : L, y = m.find((s) => s.value === u), P = m.filter(
      (s) => s.label.toLowerCase().includes(I.toLowerCase())
    ), j = (s) => {
      d === void 0 && O(s), r == null || r(s), z(!1), v("");
    };
    return /* @__PURE__ */ t(w.Root, { open: c, onOpenChange: z, children: [
      /* @__PURE__ */ t(
        w.Trigger,
        {
          ref: i,
          id: h,
          disabled: N,
          className: l(
            "group flex h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 text-xs outline-none transition-colors cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-50",
            o ? "border-red-500 dark:border-red-500 data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : S ? "border-slate-300 dark:border-slate-500 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300" : "border-slate-100 dark:border-slate-600 data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
          ),
          "aria-invalid": o,
          "aria-label": _,
          children: [
            /* @__PURE__ */ e(
              "span",
              {
                className: l(
                  "truncate",
                  !y && "text-slate-500 dark:text-slate-50"
                ),
                children: (y == null ? void 0 : y.label) || x
              }
            ),
            /* @__PURE__ */ e(
              T,
              {
                size: 24,
                className: l(
                  "text-slate-900 transition-transform duration-200 dark:text-slate-50",
                  c && "rotate-180"
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
          children: /* @__PURE__ */ t(p, { className: "flex flex-col", children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-2 px-2 pb-2 border-b border-slate-100 dark:border-slate-600", children: [
              /* @__PURE__ */ e(M, { size: 20, className: "text-slate-400" }),
              /* @__PURE__ */ e(
                p.Input,
                {
                  value: I,
                  onValueChange: v,
                  placeholder: b,
                  className: "flex-1 bg-transparent text-xs outline-none placeholder:text-slate-400"
                }
              )
            ] }),
            /* @__PURE__ */ t(p.List, { className: "flex flex-col gap-[5px] max-h-[240px] overflow-y-auto pt-2", children: [
              /* @__PURE__ */ e(p.Empty, { className: "py-2 text-center text-xs text-slate-500", children: "검색 결과가 없습니다." }),
              P.map((s) => /* @__PURE__ */ e(
                p.Item,
                {
                  value: s.label,
                  disabled: s.disabled,
                  onSelect: () => j(s.value),
                  className: l(
                    "relative flex h-[29px] cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                    "text-xs text-slate-500 dark:text-slate-50 outline-none",
                    "hover:bg-slate-100 dark:hover:bg-slate-700",
                    "data-[selected=true]:bg-slate-100 dark:data-[selected=true]:bg-slate-700",
                    "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
                    u === s.value && "bg-accent text-accent-foreground"
                  ),
                  children: s.label
                },
                s.value
              ))
            ] })
          ] })
        }
      ) })
    ] });
  }
);
C.displayName = "SearchableSelect";
const E = n.forwardRef(
  ({
    id: h,
    placeholder: x = "선택하세요",
    searchPlaceholder: b = "검색...",
    options: m,
    value: d,
    defaultValue: g,
    onValueChange: r,
    error: o,
    disabled: N,
    ariaLabel: _,
    tableMode: S
  }, i) => {
    const [c, z] = n.useState(!1), [I, v] = n.useState(""), [L, O] = n.useState(
      g || []
    ), u = d !== void 0 ? d : L, y = m.filter(
      (a) => u.includes(a.value)
    ), P = m.filter(
      (a) => a.label.toLowerCase().includes(I.toLowerCase())
    ), j = (a) => {
      const k = u.includes(a) ? u.filter((R) => R !== a) : [...u, a];
      d === void 0 && O(k), r == null || r(k);
    }, s = (a, k) => {
      k.stopPropagation();
      const R = u.filter((q) => q !== a);
      d === void 0 && O(R), r == null || r(R);
    };
    return /* @__PURE__ */ t(w.Root, { open: c, onOpenChange: z, children: [
      /* @__PURE__ */ t(
        w.Trigger,
        {
          ref: i,
          id: h,
          disabled: N,
          className: l(
            "group flex min-h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
            "px-3 py-1.5 text-xs outline-none transition-colors cursor-pointer",
            "disabled:cursor-not-allowed disabled:opacity-50",
            o ? "border-red-500 dark:border-red-500 data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : S ? "border-slate-300 dark:border-slate-500 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300" : "border-slate-100 dark:border-slate-600 data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]"
          ),
          "aria-invalid": o,
          "aria-label": _,
          children: [
            /* @__PURE__ */ e("div", { className: "flex flex-1 flex-wrap gap-1", children: y.length === 0 ? /* @__PURE__ */ e("span", { className: "text-slate-500 dark:text-slate-50", children: x }) : y.map((a) => /* @__PURE__ */ t(
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
                      onClick: (k) => s(a.value, k),
                      className: "cursor-pointer",
                      children: /* @__PURE__ */ e(F, { size: 18 })
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
                  c && "rotate-180"
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
          children: /* @__PURE__ */ t(p, { className: "flex flex-col", children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-2 px-2 pb-2 border-b border-slate-100 dark:border-slate-600", children: [
              /* @__PURE__ */ e(M, { size: 20, className: "text-slate-400" }),
              /* @__PURE__ */ e(
                p.Input,
                {
                  value: I,
                  onValueChange: v,
                  placeholder: b,
                  className: "flex-1 bg-transparent text-xs outline-none placeholder:text-slate-400"
                }
              )
            ] }),
            /* @__PURE__ */ t(p.List, { className: "flex flex-col gap-[5px] max-h-[240px] overflow-y-auto pt-2", children: [
              /* @__PURE__ */ e(p.Empty, { className: "py-2 text-center text-xs text-slate-500", children: "검색 결과가 없습니다." }),
              P.map((a) => {
                const k = u.includes(a.value);
                return /* @__PURE__ */ t(
                  p.Item,
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
                        U,
                        {
                          checked: k,
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
const $ = n.forwardRef(
  (h, x) => {
    const {
      label: b,
      size: m = "full",
      error: d,
      errorMessage: g,
      className: r,
      "aria-label": o,
      reserveLabelSpace: N,
      required: _,
      searchable: S = !1,
      multiple: i = !1
    } = h, c = n.useId(), z = () => {
      const { "aria-label": I, ...v } = h;
      return i ? /* @__PURE__ */ e(
        E,
        {
          ref: x,
          id: c,
          ariaLabel: o,
          ...v
        }
      ) : S ? /* @__PURE__ */ e(
        C,
        {
          ref: x,
          id: c,
          ariaLabel: o,
          ...v
        }
      ) : /* @__PURE__ */ e(
        B,
        {
          ref: x,
          id: c,
          ariaLabel: o,
          ...v
        }
      );
    };
    return /* @__PURE__ */ t(
      "div",
      {
        className: l(
          "flex flex-col gap-1",
          X[m],
          r
        ),
        children: [
          (b || N) && /* @__PURE__ */ t(
            "label",
            {
              htmlFor: c,
              className: l(
                "flex items-center gap-1 text-xs text-slate-600 dark:text-slate-50",
                !b && "invisible"
              ),
              children: [
                _ && /* @__PURE__ */ e("span", { className: "size-2 rounded-full bg-stone-400", "aria-hidden": "true" }),
                b || " "
              ]
            }
          ),
          z(),
          d && g && /* @__PURE__ */ e("span", { className: "text-xs text-destructive dark:text-red-400", children: g })
        ]
      }
    );
  }
);
$.displayName = "Select";
export {
  $ as Select,
  X as inputSizeStyles
};
//# sourceMappingURL=select.mjs.map
