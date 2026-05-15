import { jsx as i, jsxs as a } from "react/jsx-runtime";
import * as C from "react";
import { cn as h } from "../../lib/utils.mjs";
import { Chip as u } from "../ui/chip.mjs";
const f = C.forwardRef(
  ({
    className: s,
    filters: r,
    maxVisible: n = 3,
    onRemove: t,
    onClearAll: l,
    onExpand: x,
    emptyText: p = "적용된 필터가 없습니다",
    clearAllText: b = "전체 초기화",
    chipSize: c = "sm",
    ...m
  }, o) => {
    const g = r.slice(0, n), d = Math.max(0, r.length - n);
    return r.length === 0 ? /* @__PURE__ */ i(
      "div",
      {
        ref: o,
        className: h("flex items-center gap-2", s),
        ...m,
        children: /* @__PURE__ */ i("span", { className: "text-sm text-muted-foreground", children: p })
      }
    ) : /* @__PURE__ */ a(
      "div",
      {
        ref: o,
        className: h("flex items-center gap-2", s),
        ...m,
        children: [
          g.map((e) => /* @__PURE__ */ a(
            u,
            {
              size: c,
              removable: !!t,
              onRemove: () => t == null ? void 0 : t(e.id),
              children: [
                e.label,
                ": ",
                e.value
              ]
            },
            e.id
          )),
          d > 0 && /* @__PURE__ */ a(
            u,
            {
              size: c,
              variant: "outline",
              onClick: x,
              children: [
                "+",
                d,
                "개"
              ]
            }
          ),
          l && /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              onClick: l,
              className: "text-xs text-slate-700 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors ml-2 cursor-pointer",
              children: b
            }
          )
        ]
      }
    );
  }
);
f.displayName = "FilterChipSummary";
export {
  f as FilterChipSummary
};
//# sourceMappingURL=filter-chip-summary.mjs.map
