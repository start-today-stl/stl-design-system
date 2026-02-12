import { jsxs as f, jsx as r } from "react/jsx-runtime";
import * as g from "react";
import * as d from "@radix-ui/react-toggle-group";
import { cn as i } from "../../lib/utils.mjs";
const p = g.forwardRef(
  ({
    label: a,
    options: l,
    value: n,
    defaultValue: b,
    onValueChange: t,
    disabled: c,
    className: x
  }, m) => /* @__PURE__ */ f("div", { className: i("inline-flex flex-col gap-1 w-fit", x), children: [
    a && /* @__PURE__ */ r("label", { className: "text-[length:var(--text-body-2)] text-slate-600 dark:text-slate-50", children: a }),
    /* @__PURE__ */ r(
      d.Root,
      {
        ref: m,
        type: "single",
        value: n,
        defaultValue: b,
        onValueChange: (e) => {
          e && (t == null || t(e));
        },
        disabled: c,
        className: "inline-flex",
        children: l.map((e, s) => {
          const o = s === 0, u = s === l.length - 1;
          return /* @__PURE__ */ r(
            d.Item,
            {
              value: e.value,
              disabled: e.disabled,
              className: i(
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
                o && "rounded-l-[5px]",
                u && "rounded-r-[5px]",
                !o && "border-l-0"
              ),
              children: e.label
            },
            e.value
          );
        })
      }
    )
  ] })
);
p.displayName = "ToggleGroup";
export {
  p as ToggleGroup
};
//# sourceMappingURL=toggle-group.mjs.map
