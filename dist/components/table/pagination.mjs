import { jsxs as p, jsx as m } from "react/jsx-runtime";
import * as v from "react";
import { cn as u } from "../../lib/utils.mjs";
import { Button as h } from "../ui/button.mjs";
import { Select as R } from "../ui/select.mjs";
import { LeftIcon as b } from "../../icons/LeftIcon.mjs";
import { RightIcon as w } from "../../icons/RightIcon.mjs";
function I(o, t, e) {
  const a = e * 2 + 3 + 2;
  if (t <= a)
    return Array.from({ length: t }, (s, i) => i + 1);
  const n = Math.max(o - e, 1), r = Math.min(o + e, t), f = n > 2, d = r < t - 1;
  if (!f && d) {
    const s = 3 + 2 * e;
    return [...Array.from({ length: s }, (x, c) => c + 1), "ellipsis", t];
  }
  if (f && !d) {
    const s = 3 + 2 * e;
    return [1, "ellipsis", ...Array.from(
      { length: s },
      (x, c) => t - s + c + 1
    )];
  }
  return [1, "ellipsis", ...Array.from(
    { length: r - n + 1 },
    (s, i) => n + i
  ), "ellipsis", t];
}
const k = v.forwardRef(
  ({
    className: o,
    currentPage: t,
    totalPages: e,
    onPageChange: l,
    siblingCount: a = 1,
    previousLabel: n = "Previous",
    nextLabel: r = "Next",
    ...f
  }, d) => {
    const N = I(t, e, a), s = (i) => {
      i >= 1 && i <= e && i !== t && (l == null || l(i));
    };
    return /* @__PURE__ */ p(
      "div",
      {
        ref: d,
        className: u("flex items-center gap-2", o),
        ...f,
        children: [
          /* @__PURE__ */ p(
            h,
            {
              variant: "ghost",
              size: "default",
              onClick: () => s(t - 1),
              disabled: t <= 1,
              "aria-label": "이전 페이지",
              children: [
                /* @__PURE__ */ m(b, { size: 20 }),
                n
              ]
            }
          ),
          /* @__PURE__ */ m("div", { className: "flex items-center gap-1", children: N.map((i, x) => {
            if (i === "ellipsis")
              return /* @__PURE__ */ m(
                "span",
                {
                  className: "px-2 text-sm text-slate-400",
                  children: "..."
                },
                `ellipsis-${x}`
              );
            const c = i === t;
            return /* @__PURE__ */ m(
              h,
              {
                variant: "text",
                size: "default",
                onClick: () => s(i),
                className: u(
                  "min-w-[36px]",
                  c && "font-semibold text-slate-900 dark:text-white"
                ),
                "aria-label": `페이지 ${i}`,
                "aria-current": c ? "page" : void 0,
                children: i
              },
              i
            );
          }) }),
          /* @__PURE__ */ p(
            h,
            {
              variant: "ghost",
              size: "default",
              onClick: () => s(t + 1),
              disabled: t >= e,
              "aria-label": "다음 페이지",
              children: [
                r,
                /* @__PURE__ */ m(w, { size: 20 })
              ]
            }
          )
        ]
      }
    );
  }
);
k.displayName = "Pagination";
function B({
  className: o,
  pageSize: t,
  options: e = [10, 20, 50, 100],
  onPageSizeChange: l,
  label: a = "페이지당 항목 수"
}) {
  const n = e.map((r) => ({
    label: String(r),
    value: String(r)
  }));
  return /* @__PURE__ */ p("div", { className: u("flex items-center gap-2", o), children: [
    a && /* @__PURE__ */ m("span", { className: "text-xs text-slate-500 dark:text-slate-300 whitespace-nowrap", children: a }),
    /* @__PURE__ */ m(
      R,
      {
        value: String(t),
        onValueChange: (r) => l == null ? void 0 : l(Number(r)),
        options: n,
        size: "sm",
        className: "!w-[70px]",
        "aria-label": "페이지당 항목 수"
      }
    )
  ] });
}
export {
  B as PageSizeSelector,
  k as Pagination
};
//# sourceMappingURL=pagination.mjs.map
