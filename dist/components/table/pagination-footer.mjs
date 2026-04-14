import { jsxs as w, jsx as e } from "react/jsx-runtime";
import * as y from "react";
import { cn as S } from "../../lib/utils.mjs";
import { Pagination as k, PageSizeSelector as u } from "./pagination.mjs";
const L = y.forwardRef(
  ({
    className: n,
    currentPage: o,
    totalPages: c,
    onPageChange: d,
    totalItems: t,
    pageSize: r = 10,
    pageSizeOptions: m = [10, 30, 50, 100],
    onPageSizeChange: l,
    previousLabel: f = "Previous",
    nextLabel: x = "Next",
    formatItemRange: h = (s, a, i) => `총 ${i.toLocaleString()}건 중 ${s.toLocaleString()}-${a.toLocaleString()}건 표시`,
    pageSizeLabel: p = "페이지당 항목 수",
    hidePageSizeSelector: N = !1,
    hideItemRange: b = !1,
    ...v
  }, g) => {
    const s = t ? (o - 1) * r + 1 : 0, a = t ? Math.min(o * r, t) : 0, i = !b && t !== void 0, j = !N && l;
    return /* @__PURE__ */ w(
      "div",
      {
        ref: g,
        className: S(
          "flex items-center py-3 px-4 mt-auto",
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
              currentPage: o,
              totalPages: c,
              onPageChange: d,
              previousLabel: f,
              nextLabel: x
            }
          ) }),
          /* @__PURE__ */ e("div", { className: "flex-1 flex justify-end", children: j && /* @__PURE__ */ e(
            u,
            {
              pageSize: r,
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
L.displayName = "PaginationFooter";
export {
  L as PaginationFooter
};
//# sourceMappingURL=pagination-footer.mjs.map
