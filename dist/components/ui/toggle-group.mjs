import { jsxs as g, jsx as l } from "react/jsx-runtime";
import * as h from "react";
import * as c from "@radix-ui/react-toggle-group";
import { cn as a } from "../../lib/utils.mjs";
const k = h.forwardRef(
  ({
    label: s,
    options: o,
    value: n,
    defaultValue: b,
    onValueChange: t,
    disabled: u,
    size: x,
    className: f
  }, m) => {
    const r = x === "full";
    return /* @__PURE__ */ g("div", { className: a("flex flex-col gap-1", r ? "w-full" : "w-fit", f), children: [
      s && /* @__PURE__ */ l("label", { className: "text-xs text-slate-700 dark:text-slate-400", children: s }),
      /* @__PURE__ */ l(
        c.Root,
        {
          ref: m,
          type: "single",
          value: n,
          defaultValue: b,
          onValueChange: (e) => {
            e && (t == null || t(e));
          },
          disabled: u,
          className: a("inline-flex", r && "w-full"),
          children: o.map((e, d) => {
            const i = d === 0, p = d === o.length - 1;
            return /* @__PURE__ */ l(
              c.Item,
              {
                value: e.value,
                disabled: e.disabled,
                className: a(
                  "inline-flex h-9 items-center justify-center px-4 cursor-pointer",
                  "border border-slate-200 dark:border-slate-600",
                  "bg-white dark:bg-slate-800",
                  "text-xs text-slate-600 dark:text-slate-300",
                  "transition-colors",
                  "hover:bg-slate-50 dark:hover:bg-slate-700",
                  "focus:outline-none",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  // 활성 상태
                  "data-[state=on]:bg-blue-500 data-[state=on]:text-white data-[state=on]:border-blue-500",
                  "dark:data-[state=on]:bg-blue-600 dark:data-[state=on]:border-blue-600",
                  // 위치별 border-radius
                  i && "rounded-l-[5px]",
                  p && "rounded-r-[5px]",
                  !i && "border-l-0",
                  // full 사이즈일 때 균등 분배
                  r && "flex-1"
                ),
                children: e.label
              },
              e.value
            );
          })
        }
      )
    ] });
  }
);
k.displayName = "ToggleGroup";
export {
  k as ToggleGroup
};
//# sourceMappingURL=toggle-group.mjs.map
