import { jsx as e, jsxs as s } from "react/jsx-runtime";
import k, { useState as F, useMemo as z, useContext as I, createContext as R } from "react";
import { cn as t } from "../../lib/utils.mjs";
import { DownIcon as C } from "../../icons/DownIcon.mjs";
import { UpIcon as P } from "../../icons/UpIcon.mjs";
const x = R(null), q = () => I(x), V = k.forwardRef(
  ({ className: h, title: o, children: c, actions: l, layout: w = "grid", collapsible: i = !1, collapsed: m, defaultCollapsed: g = !1, collapsedContent: f, onCollapseChange: n, ...v }, N) => {
    const [y, b] = F(g), p = m !== void 0, r = p ? m : y, u = () => {
      const d = !r;
      p || b(d), n == null || n(d);
    }, a = i && /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: (d) => {
          d.stopPropagation(), u();
        },
        "aria-label": r ? "펼치기" : "접기",
        className: "flex items-center justify-center size-8 text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0",
        children: r ? /* @__PURE__ */ e(C, { size: 24 }) : /* @__PURE__ */ e(P, { size: 24 })
      }
    ), j = f || !o && i, S = z(
      () => ({ isCollapsed: r, collapsible: i, toggleCollapse: u }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [r, i]
    );
    return /* @__PURE__ */ e(x.Provider, { value: S, children: /* @__PURE__ */ s(
      "div",
      {
        ref: N,
        className: t(
          "w-full bg-card border border-border rounded-2xl overflow-hidden shrink-0",
          h
        ),
        ...v,
        children: [
          o && /* @__PURE__ */ s(
            "div",
            {
              className: t(
                "px-6 py-4 flex items-center justify-between",
                !r && "border-b border-border"
              ),
              children: [
                /* @__PURE__ */ e("h3", { className: "text-lg font-semibold", children: o }),
                a
              ]
            }
          ),
          j && /* @__PURE__ */ e(
            "div",
            {
              className: t(
                "grid transition-[grid-template-rows,opacity] duration-200 ease-in-out",
                r ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              ),
              children: /* @__PURE__ */ e("div", { className: "overflow-hidden", children: /* @__PURE__ */ s("div", { className: "px-4 py-3 flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ e("div", { className: "flex-1 min-w-0", children: f }),
                !o && a
              ] }) })
            }
          ),
          /* @__PURE__ */ e(
            "div",
            {
              className: t(
                "grid transition-[grid-template-rows,opacity] duration-200 ease-in-out",
                r ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
              ),
              children: /* @__PURE__ */ e("div", { className: "overflow-hidden", children: /* @__PURE__ */ e("div", { className: "p-4", children: /* @__PURE__ */ s("div", { className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [
                c && /* @__PURE__ */ e(
                  "div",
                  {
                    className: t(
                      "flex-1 gap-4",
                      w === "grid" ? "grid grid-cols-1 md:grid-cols-4" : "flex flex-wrap items-end"
                    ),
                    children: c
                  }
                ),
                (l || !o && i) && /* @__PURE__ */ s("div", { className: "flex items-center gap-2 pl-4 shrink-0", children: [
                  l,
                  !o && a
                ] })
              ] }) }) })
            }
          )
        ]
      }
    ) });
  }
);
V.displayName = "SearchForm";
export {
  V as SearchForm,
  q as useSearchFormContext
};
//# sourceMappingURL=search-form.mjs.map
