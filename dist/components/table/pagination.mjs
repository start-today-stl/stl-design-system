import { jsxs as p, jsx as a } from "react/jsx-runtime";
import * as v from "react";
import { cn as u } from "../../lib/utils.mjs";
import { Button as h } from "../ui/button.mjs";
import { Select as b } from "../ui/select/index.mjs";
import { LeftIcon as R } from "../../icons/LeftIcon.mjs";
import { RightIcon as w } from "../../icons/RightIcon.mjs";
function I(m, t, e) {
  const o = e * 2 + 3 + 2;
  if (t <= o)
    return Array.from({ length: t }, (s, i) => i + 1);
  const n = Math.max(m - e, 1), l = Math.min(m + e, t), f = n > 2, d = l < t - 1;
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
    { length: l - n + 1 },
    (s, i) => n + i
  ), "ellipsis", t];
}
const k = v.forwardRef(
  ({
    className: m,
    currentPage: t,
    totalPages: e,
    onPageChange: r,
    siblingCount: o = 1,
    previousLabel: n = "Previous",
    nextLabel: l = "Next",
    ...f
  }, d) => {
    const N = I(t, e, o), s = (i) => {
      i >= 1 && i <= e && i !== t && (r == null || r(i));
    };
    return /* @__PURE__ */ p(
      "div",
      {
        ref: d,
        className: u("flex items-center gap-2", m),
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
                /* @__PURE__ */ a(R, { size: 20 }),
                n
              ]
            }
          ),
          /* @__PURE__ */ a("div", { className: "flex items-center gap-1", children: N.map((i, x) => {
            if (i === "ellipsis")
              return /* @__PURE__ */ a(
                "span",
                {
                  className: "px-2 text-sm text-slate-400",
                  children: "..."
                },
                `ellipsis-${x}`
              );
            const c = i === t;
            return /* @__PURE__ */ a(
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
                l,
                /* @__PURE__ */ a(w, { size: 20 })
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
  className: m,
  pageSize: t,
  options: e = [10, 20, 50, 100],
  onPageSizeChange: r,
  label: o = "페이지당 항목 수"
}) {
  const n = e.map((l) => ({
    label: String(l),
    value: String(l)
  }));
  return /* @__PURE__ */ p("div", { className: u("flex items-center gap-2", m), children: [
    o && /* @__PURE__ */ a("span", { className: "text-xs text-slate-800 dark:text-slate-400 whitespace-nowrap", children: o }),
    /* @__PURE__ */ a(
      b,
      {
        value: String(t),
        onValueChange: (l) => r == null ? void 0 : r(Number(l)),
        options: n,
        size: "sm",
        className: "!w-[70px]",
        "aria-label": "페이지당 항목 수",
        clearable: !1
      }
    )
  ] });
}
export {
  B as PageSizeSelector,
  k as Pagination
};
//# sourceMappingURL=pagination.mjs.map
