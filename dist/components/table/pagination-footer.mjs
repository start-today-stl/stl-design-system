import { jsxs as w, jsx as e } from "react/jsx-runtime";
import * as y from "react";
import { cn as S } from "../../lib/utils.mjs";
import { Pagination as k, PageSizeSelector as L } from "./pagination.mjs";
const P = y.forwardRef(
  ({
    className: n,
    currentPage: r,
    totalPages: c,
    onPageChange: d,
    totalItems: t,
    pageSize: o = 10,
    pageSizeOptions: m = [10, 20, 50, 100],
    onPageSizeChange: l,
    previousLabel: f = "Previous",
    nextLabel: x = "Next",
    formatItemRange: h = (s, a, i) => `총 ${i.toLocaleString()}건 중 ${s.toLocaleString()}-${a.toLocaleString()}건 표시`,
    pageSizeLabel: p = "페이지당 항목 수",
    hidePageSizeSelector: N = !1,
    hideItemRange: b = !1,
    ...v
  }, g) => {
    const s = t ? (r - 1) * o + 1 : 0, a = t ? Math.min(r * o, t) : 0, i = !b && t !== void 0, j = !N && l;
    return /* @__PURE__ */ w(
      "div",
      {
        ref: g,
        className: S(
          "flex items-center py-3 px-4",
          "bg-white dark:bg-slate-900",
          "border-t border-slate-200 dark:border-slate-700",
          n
        ),
        ...v,
        children: [
          /* @__PURE__ */ e("div", { className: "flex-1", children: i && /* @__PURE__ */ e("span", { className: "text-sm text-slate-500 dark:text-slate-300", children: h(s, a, t) }) }),
          /* @__PURE__ */ e("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ e(
            k,
            {
              currentPage: r,
              totalPages: c,
              onPageChange: d,
              previousLabel: f,
              nextLabel: x
            }
          ) }),
          /* @__PURE__ */ e("div", { className: "flex-1 flex justify-end", children: j && /* @__PURE__ */ e(
            L,
            {
              pageSize: o,
              options: m,
              onPageSizeChange: l,
              label: p
            }
          ) })
        ]
      }
    );
  }
);
P.displayName = "PaginationFooter";
export {
  P as PaginationFooter
};
//# sourceMappingURL=pagination-footer.mjs.map
