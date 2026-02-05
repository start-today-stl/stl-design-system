import { jsxs as d, jsx as e } from "react/jsx-runtime";
import * as i from "react";
import { Root as k, Trigger as y, Value as w, Icon as v, Portal as N, Content as z, Viewport as I, Item as R, ItemText as _ } from "./index120.mjs";
import { cn as t } from "./index104.mjs";
import { DownIcon as j } from "./index25.mjs";
const C = {
  sm: "w-[160px]",
  md: "w-[260px]",
  lg: "w-[360px]",
  full: "w-full"
}, D = i.forwardRef(
  ({
    label: o,
    placeholder: n = "선택하세요",
    options: c,
    value: p,
    defaultValue: x,
    onValueChange: m,
    size: b = "full",
    error: r,
    errorMessage: l,
    disabled: g,
    className: u,
    "aria-label": f
  }, h) => {
    const s = i.useId();
    return /* @__PURE__ */ d(
      "div",
      {
        className: t(
          "flex flex-col gap-1",
          C[b],
          u
        ),
        children: [
          o && /* @__PURE__ */ e(
            "label",
            {
              htmlFor: s,
              className: "text-xs text-gray-600 dark:text-gray-50",
              children: o
            }
          ),
          /* @__PURE__ */ d(
            k,
            {
              value: p,
              defaultValue: x,
              onValueChange: m,
              disabled: g,
              children: [
                /* @__PURE__ */ d(
                  y,
                  {
                    ref: h,
                    id: s,
                    className: t(
                      "flex h-9 w-full items-center justify-between rounded-[5px] border bg-white dark:bg-dark-400",
                      "px-3 text-xs outline-none transition-colors cursor-pointer",
                      "disabled:cursor-not-allowed disabled:opacity-50",
                      r ? "border-destructive dark:border-red-500" : "border-gray-100 dark:border-dark-200 focus:border-gray-500 dark:focus:border-gray-100",
                      "data-[placeholder]:text-gray-500 dark:data-[placeholder]:text-gray-50"
                    ),
                    "aria-invalid": r,
                    "aria-label": f,
                    children: [
                      /* @__PURE__ */ e(w, { placeholder: n }),
                      /* @__PURE__ */ e(v, { asChild: !0, children: /* @__PURE__ */ e(j, { size: 24, className: "text-gray-500 dark:text-gray-50" }) })
                    ]
                  }
                ),
                /* @__PURE__ */ e(N, { children: /* @__PURE__ */ e(
                  z,
                  {
                    className: t(
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
                    children: /* @__PURE__ */ e(I, { className: "flex flex-col gap-[5px]", children: c.map((a) => /* @__PURE__ */ e(
                      R,
                      {
                        value: a.value,
                        disabled: a.disabled,
                        className: t(
                          "relative flex h-[29px] cursor-pointer select-none items-center rounded-[2px] px-[5px] py-[5px]",
                          "text-xs text-gray-500 dark:text-gray-50 outline-none",
                          "hover:bg-gray-100 dark:hover:bg-dark-300",
                          "focus:bg-gray-100 dark:focus:bg-dark-300",
                          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                          "data-[state=checked]:text-gray-900 dark:data-[state=checked]:text-gray-100"
                        ),
                        children: /* @__PURE__ */ e(_, { children: a.label })
                      },
                      a.value
                    )) })
                  }
                ) })
              ]
            }
          ),
          r && l && /* @__PURE__ */ e("span", { className: "text-xs text-destructive dark:text-red-400", children: l })
        ]
      }
    );
  }
);
D.displayName = "Dropdown";
export {
  D as Dropdown,
  C as dropdownSizeStyles
};
//# sourceMappingURL=index26.mjs.map
