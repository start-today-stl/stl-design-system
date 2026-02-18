import { jsxs as o, jsx as e } from "react/jsx-runtime";
import * as n from "react";
import * as t from "@radix-ui/react-select";
import { cn as a } from "../../lib/utils.mjs";
import { UpIcon as _ } from "../../icons/UpIcon.mjs";
const N = {
  sm: "w-[160px]",
  md: "w-[260px]",
  lg: "w-[360px]",
  full: "w-full"
}, y = n.forwardRef(
  ({
    label: r,
    placeholder: p = "선택하세요",
    options: c,
    value: x,
    defaultValue: b,
    onValueChange: m,
    size: u = "full",
    error: s,
    errorMessage: l,
    disabled: f,
    className: h,
    "aria-label": g,
    tableMode: w,
    reserveLabelSpace: k
  }, v) => {
    const i = n.useId();
    return /* @__PURE__ */ o(
      "div",
      {
        className: a(
          "flex flex-col gap-1",
          N[u],
          h
        ),
        children: [
          (r || k) && /* @__PURE__ */ e(
            "label",
            {
              htmlFor: i,
              className: a(
                "text-xs text-slate-600 dark:text-slate-50",
                !r && "invisible"
              ),
              children: r || " "
            }
          ),
          /* @__PURE__ */ o(
            t.Root,
            {
              value: x,
              defaultValue: b,
              onValueChange: m,
              disabled: f,
              children: [
                /* @__PURE__ */ o(
                  t.Trigger,
                  {
                    ref: v,
                    id: i,
                    className: a(
                      "group flex h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-slate-800",
                      "px-3 text-xs outline-none transition-colors cursor-pointer",
                      "disabled:cursor-not-allowed disabled:opacity-50",
                      s ? "border-red-500 dark:border-red-500 data-[state=open]:border-red-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(239,68,68,0.5)]" : w ? "border-slate-300 dark:border-slate-500 data-[state=open]:border-slate-500 data-[state=open]:border-[1.5px] data-[state=open]:shadow-none dark:data-[state=open]:border-slate-300" : "border-slate-100 dark:border-slate-600 data-[state=open]:border-blue-500 data-[state=open]:shadow-[0px_0px_6px_0px_rgba(23,118,255,0.5)]",
                      "data-[placeholder]:text-slate-500 dark:data-[placeholder]:text-slate-50"
                    ),
                    "aria-invalid": s,
                    "aria-label": g,
                    children: [
                      /* @__PURE__ */ e(t.Value, { placeholder: p }),
                      /* @__PURE__ */ e(t.Icon, { asChild: !0, children: /* @__PURE__ */ e(_, { size: 24, className: "text-slate-900 transition-transform duration-200 group-data-[state=open]:rotate-180 dark:text-slate-50" }) })
                    ]
                  }
                ),
                /* @__PURE__ */ e(t.Portal, { children: /* @__PURE__ */ e(
                  t.Content,
                  {
                    className: a(
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
                    children: /* @__PURE__ */ e(t.Viewport, { className: "flex flex-col gap-[5px]", children: c.map((d) => /* @__PURE__ */ e(
                      t.Item,
                      {
                        value: d.value,
                        disabled: d.disabled,
                        className: a(
                          "relative flex h-[29px] cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                          "text-xs text-slate-500 dark:text-slate-50 outline-none",
                          "hover:bg-slate-100 dark:hover:bg-slate-700",
                          "focus:bg-slate-100 dark:focus:bg-slate-700",
                          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                          "data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
                        ),
                        children: /* @__PURE__ */ e(t.ItemText, { children: d.label })
                      },
                      d.value
                    )) })
                  }
                ) })
              ]
            }
          ),
          s && l && /* @__PURE__ */ e("span", { className: "text-xs text-destructive dark:text-red-400", children: l })
        ]
      }
    );
  }
);
y.displayName = "Select";
export {
  y as Select,
  N as selectSizeStyles
};
//# sourceMappingURL=select.mjs.map
