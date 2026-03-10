import { jsx as i, jsxs as n } from "react/jsx-runtime";
import * as C from "react";
import { cn as u } from "../../lib/utils.mjs";
import { Chip as h } from "../ui/chip.mjs";
const b = C.forwardRef(
  ({
    className: a,
    filters: r,
    maxVisible: s = 3,
    onRemove: t,
    onClearAll: m,
    onExpand: p,
    emptyText: x = "적용된 필터가 없습니다",
    clearAllText: g = "전체 초기화",
    chipSize: o = "sm",
    ...c
  }, d) => {
    const f = r.slice(0, s), l = Math.max(0, r.length - s);
    return r.length === 0 ? /* @__PURE__ */ i(
      "div",
      {
        ref: d,
        className: u("flex items-center gap-2", a),
        ...c,
        children: /* @__PURE__ */ i("span", { className: "text-sm text-muted-foreground", children: x })
      }
    ) : /* @__PURE__ */ n(
      "div",
      {
        ref: d,
        className: u("flex items-center gap-2", a),
        ...c,
        children: [
          f.map((e) => /* @__PURE__ */ n(
            h,
            {
              size: o,
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
          l > 0 && /* @__PURE__ */ n(
            h,
            {
              size: o,
              variant: "outline",
              onClick: p,
              children: [
                "+",
                l,
                "개"
              ]
            }
          ),
          m && /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              onClick: m,
              className: "text-xs text-muted-foreground hover:text-foreground transition-colors ml-2",
              children: g
            }
          )
        ]
      }
    );
  }
);
b.displayName = "FilterChipSummary";
export {
  b as FilterChipSummary
};
//# sourceMappingURL=filter-chip-summary.mjs.map
