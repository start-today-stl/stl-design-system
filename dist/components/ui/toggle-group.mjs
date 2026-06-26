import { jsxs as k, jsx as a } from "react/jsx-runtime";
import * as v from "react";
import * as r from "@radix-ui/react-toggle-group";
import { cn as l } from "../../lib/utils.mjs";
const w = v.forwardRef(
  ({
    label: d,
    options: o,
    value: b,
    defaultValue: c,
    onValueChange: s,
    disabled: u,
    size: f,
    variant: m = "box",
    className: g
  }, p) => {
    const t = f === "full", i = m === "pill";
    return /* @__PURE__ */ k("div", { className: l("flex flex-col gap-1", t ? "w-full" : "w-fit", g), children: [
      d && /* @__PURE__ */ a("label", { className: "text-xs text-slate-800 dark:text-slate-400", children: d }),
      /* @__PURE__ */ a(
        r.Root,
        {
          ref: p,
          type: "single",
          value: b,
          defaultValue: c,
          onValueChange: (e) => s == null ? void 0 : s(e),
          disabled: u,
          className: l(
            "inline-flex",
            t && "w-full",
            // pill: 회색 컨테이너 + 패딩
            i && "rounded-md bg-slate-100 dark:bg-slate-800 p-1 gap-1"
          ),
          children: o.map((e, n) => {
            const x = n === 0, h = n === o.length - 1;
            return i ? /* @__PURE__ */ a(
              r.Item,
              {
                value: e.value,
                disabled: e.disabled,
                className: l(
                  "inline-flex h-7 items-center justify-center px-3 cursor-pointer",
                  "rounded-[4px]",
                  "text-xs text-slate-500 dark:text-slate-400",
                  "transition-all",
                  "hover:text-slate-700 dark:hover:text-slate-200",
                  "focus:outline-none",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  // 활성: 흰 배경으로 떠오름
                  "data-[state=on]:bg-white dark:data-[state=on]:bg-slate-700",
                  "data-[state=on]:text-slate-900 dark:data-[state=on]:text-slate-50",
                  "data-[state=on]:shadow-sm",
                  t && "flex-1"
                ),
                children: e.label
              },
              e.value
            ) : /* @__PURE__ */ a(
              r.Item,
              {
                value: e.value,
                disabled: e.disabled,
                className: l(
                  "inline-flex h-9 items-center justify-center px-4 cursor-pointer",
                  "border border-slate-200 dark:border-slate-600",
                  "bg-white dark:bg-slate-800",
                  "text-xs text-slate-600 dark:text-slate-300",
                  "transition-colors",
                  "hover:bg-slate-50 dark:hover:bg-slate-700",
                  "focus:outline-none",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  "data-[state=on]:bg-blue-500 data-[state=on]:text-white data-[state=on]:border-blue-500",
                  "dark:data-[state=on]:bg-blue-600 dark:data-[state=on]:border-blue-600",
                  x && "rounded-l-[5px]",
                  h && "rounded-r-[5px]",
                  !x && "border-l-0",
                  t && "flex-1"
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
w.displayName = "ToggleGroup";
export {
  w as ToggleGroup
};
//# sourceMappingURL=toggle-group.mjs.map
