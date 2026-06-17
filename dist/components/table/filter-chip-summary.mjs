import { jsx as a, jsxs as l } from "react/jsx-runtime";
import * as f from "react";
import { cn as u } from "../../lib/utils.mjs";
import { Chip as x } from "../ui/chip.mjs";
import { useSearchFormContext as v } from "./search-form.mjs";
const y = f.forwardRef(
  ({
    className: o,
    filters: r,
    maxVisible: s = 3,
    onRemove: i,
    onClearAll: n,
    onExpand: C,
    emptyText: g = "적용된 필터가 없습니다",
    clearAllText: b = "전체 초기화",
    chipSize: c = "sm",
    ...m
  }, d) => {
    const k = r.slice(0, s), p = Math.max(0, r.length - s), e = v(), h = e != null && e.collapsible && e.isCollapsed ? e.toggleCollapse : void 0;
    return r.length === 0 ? /* @__PURE__ */ a(
      "div",
      {
        ref: d,
        className: u("flex items-center gap-2", o),
        ...m,
        children: /* @__PURE__ */ a("span", { className: "text-sm text-muted-foreground", children: g })
      }
    ) : /* @__PURE__ */ l(
      "div",
      {
        ref: d,
        className: u("flex items-center gap-2", o),
        ...m,
        children: [
          k.map((t) => /* @__PURE__ */ l(
            x,
            {
              size: c,
              removable: !!i,
              onRemove: () => i == null ? void 0 : i(t.id),
              onClick: h,
              children: [
                t.label,
                ": ",
                t.value
              ]
            },
            t.id
          )),
          p > 0 && /* @__PURE__ */ l(
            x,
            {
              size: c,
              variant: "outline",
              onClick: C ?? h,
              children: [
                "+",
                p,
                "개"
              ]
            }
          ),
          n && /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              onClick: (t) => {
                t.stopPropagation(), n();
              },
              className: "text-xs text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors ml-2 cursor-pointer",
              children: b
            }
          )
        ]
      }
    );
  }
);
y.displayName = "FilterChipSummary";
export {
  y as FilterChipSummary
};
//# sourceMappingURL=filter-chip-summary.mjs.map
