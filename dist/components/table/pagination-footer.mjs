import { jsxs as n, jsx as t } from "react/jsx-runtime";
import * as k from "react";
import { cn as w } from "../../lib/utils.mjs";
import { Pagination as y, PageSizeSelector as L } from "./pagination.mjs";
const $ = k.forwardRef(
  ({
    className: l,
    currentPage: r,
    totalPages: c,
    onPageChange: d,
    totalItems: e,
    pageSize: a = 10,
    pageSizeOptions: m = [10, 20, 50, 100],
    onPageSizeChange: s,
    previousLabel: f = "이전",
    nextLabel: x = "다음",
    formatItemRange: p = (o, i, j) => `총 ${j.toLocaleString()}건 중 ${o.toLocaleString()}-${i.toLocaleString()}건 표시`,
    pageSizeLabel: b = "페이지당 항목 수",
    hidePageSizeSelector: h = !1,
    hideItemRange: N = !1,
    ...g
  }, v) => {
    const o = e ? (r - 1) * a + 1 : 0, i = e ? Math.min(r * a, e) : 0;
    return /* @__PURE__ */ n(
      "div",
      {
        ref: v,
        className: w(
          "flex items-center justify-between py-3 px-4",
          "bg-white dark:bg-slate-900",
          "border-t border-slate-200 dark:border-slate-700",
          l
        ),
        ...g,
        children: [
          /* @__PURE__ */ t("div", { className: "flex items-center", children: !N && e !== void 0 && /* @__PURE__ */ t("span", { className: "text-sm text-slate-500 dark:text-slate-400", children: p(o, i, e) }) }),
          /* @__PURE__ */ n("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ t(
              y,
              {
                currentPage: r,
                totalPages: c,
                onPageChange: d,
                previousLabel: f,
                nextLabel: x
              }
            ),
            !h && s && /* @__PURE__ */ t(
              L,
              {
                pageSize: a,
                options: m,
                onPageSizeChange: s,
                label: b
              }
            )
          ] })
        ]
      }
    );
  }
);
$.displayName = "PaginationFooter";
export {
  $ as PaginationFooter
};
//# sourceMappingURL=pagination-footer.mjs.map
