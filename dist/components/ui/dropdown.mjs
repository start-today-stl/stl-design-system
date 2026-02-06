import { jsxs as o, jsx as e } from "react/jsx-runtime";
import * as n from "react";
import * as a from "@radix-ui/react-select";
import { cn as r } from "../../lib/utils.mjs";
import { DownIcon as y } from "../../icons/DownIcon.mjs";
const w = {
  sm: "w-[160px]",
  md: "w-[260px]",
  lg: "w-[360px]",
  full: "w-full"
}, v = n.forwardRef(
  ({
    label: l,
    placeholder: c = "선택하세요",
    options: p,
    value: x,
    defaultValue: m,
    onValueChange: b,
    size: g = "full",
    error: d,
    errorMessage: s,
    disabled: u,
    className: f,
    "aria-label": h
  }, k) => {
    const i = n.useId();
    return /* @__PURE__ */ o(
      "div",
      {
        className: r(
          "flex flex-col gap-1",
          w[g],
          f
        ),
        children: [
          l && /* @__PURE__ */ e(
            "label",
            {
              htmlFor: i,
              className: "text-xs text-gray-600 dark:text-gray-50",
              children: l
            }
          ),
          /* @__PURE__ */ o(
            a.Root,
            {
              value: x,
              defaultValue: m,
              onValueChange: b,
              disabled: u,
              children: [
                /* @__PURE__ */ o(
                  a.Trigger,
                  {
                    ref: k,
                    id: i,
                    className: r(
                      "flex h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-dark-400",
                      "px-3 text-xs outline-none transition-colors cursor-pointer",
                      "disabled:cursor-not-allowed disabled:opacity-50",
                      d ? "border-destructive dark:border-red-500" : "border-gray-100 dark:border-dark-200 focus:border-gray-500 dark:focus:border-gray-100",
                      "data-[placeholder]:text-gray-500 dark:data-[placeholder]:text-gray-50"
                    ),
                    "aria-invalid": d,
                    "aria-label": h,
                    children: [
                      /* @__PURE__ */ e(a.Value, { placeholder: c }),
                      /* @__PURE__ */ e(a.Icon, { asChild: !0, children: /* @__PURE__ */ e(y, { size: 24, className: "text-gray-500 dark:text-gray-50" }) })
                    ]
                  }
                ),
                /* @__PURE__ */ e(a.Portal, { children: /* @__PURE__ */ e(
                  a.Content,
                  {
                    className: r(
                      "relative z-50 overflow-hidden rounded-[5px] border border-gray-100 dark:border-dark-200 w-[var(--radix-select-trigger-width)]",
                      "bg-white/50 dark:bg-dark-400/30 backdrop-blur-[12px]",
                      "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
                      "p-[5px]",
                      "data-[state=open]:animate-in data-[state=closed]:animate-out",
                      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                      "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
                    ),
                    position: "popper",
                    sideOffset: 4,
                    children: /* @__PURE__ */ e(a.Viewport, { className: "flex flex-col gap-[5px]", children: p.map((t) => /* @__PURE__ */ e(
                      a.Item,
                      {
                        value: t.value,
                        disabled: t.disabled,
                        className: r(
                          "relative flex h-[29px] cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                          "text-xs text-gray-500 dark:text-gray-50 outline-none",
                          "hover:bg-gray-100 dark:hover:bg-dark-300",
                          "focus:bg-gray-100 dark:focus:bg-dark-300",
                          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                          "data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
                        ),
                        children: /* @__PURE__ */ e(a.ItemText, { children: t.label })
                      },
                      t.value
                    )) })
                  }
                ) })
              ]
            }
          ),
          d && s && /* @__PURE__ */ e("span", { className: "text-xs text-destructive dark:text-red-400", children: s })
        ]
      }
    );
  }
);
v.displayName = "Dropdown";
export {
  v as Dropdown,
  w as dropdownSizeStyles
};
//# sourceMappingURL=dropdown.mjs.map
