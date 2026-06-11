import { jsxs as s, jsx as e } from "react/jsx-runtime";
import b, { useState as j } from "react";
import { cn as o } from "../../lib/utils.mjs";
import { DownIcon as k } from "../../icons/DownIcon.mjs";
import { UpIcon as z } from "../../icons/UpIcon.mjs";
const I = b.forwardRef(
  ({ className: g, title: r, children: l, actions: n, layout: u = "grid", collapsible: d = !1, collapsed: c, defaultCollapsed: w = !1, collapsedContent: m, onCollapseChange: t, ...x }, h) => {
    const [v, N] = j(w), f = c !== void 0, i = f ? c : v, a = d && /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: () => {
          const p = !i;
          f || N(p), t == null || t(p);
        },
        "aria-label": i ? "펼치기" : "접기",
        className: "flex items-center justify-center size-8 text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0",
        children: i ? /* @__PURE__ */ e(k, { size: 24 }) : /* @__PURE__ */ e(z, { size: 24 })
      }
    ), y = m || !r && d;
    return /* @__PURE__ */ s(
      "div",
      {
        ref: h,
        className: o(
          "w-full bg-card border border-border rounded-2xl overflow-hidden shrink-0",
          g
        ),
        ...x,
        children: [
          r && /* @__PURE__ */ s(
            "div",
            {
              className: o(
                "px-6 py-4 flex items-center justify-between",
                !i && "border-b border-border"
              ),
              children: [
                /* @__PURE__ */ e("h3", { className: "text-lg font-semibold", children: r }),
                a
              ]
            }
          ),
          y && /* @__PURE__ */ e(
            "div",
            {
              className: o(
                "grid transition-[grid-template-rows,opacity] duration-200 ease-in-out",
                i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              ),
              children: /* @__PURE__ */ e("div", { className: "overflow-hidden", children: /* @__PURE__ */ s("div", { className: "px-4 py-3 flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ e("div", { className: "flex-1 min-w-0", children: m }),
                !r && a
              ] }) })
            }
          ),
          /* @__PURE__ */ e(
            "div",
            {
              className: o(
                "grid transition-[grid-template-rows,opacity] duration-200 ease-in-out",
                i ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
              ),
              children: /* @__PURE__ */ e("div", { className: "overflow-hidden", children: /* @__PURE__ */ e("div", { className: "p-4", children: /* @__PURE__ */ s("div", { className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [
                l && /* @__PURE__ */ e(
                  "div",
                  {
                    className: o(
                      "flex-1 gap-4",
                      u === "grid" ? "grid grid-cols-1 md:grid-cols-4" : "flex flex-wrap items-end"
                    ),
                    children: l
                  }
                ),
                (n || !r && d) && /* @__PURE__ */ s("div", { className: "flex items-center gap-2 pl-4 shrink-0", children: [
                  n,
                  !r && a
                ] })
              ] }) }) })
            }
          )
        ]
      }
    );
  }
);
I.displayName = "SearchForm";
export {
  I as SearchForm
};
//# sourceMappingURL=search-form.mjs.map
