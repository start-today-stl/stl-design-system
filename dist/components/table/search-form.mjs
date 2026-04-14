import { jsxs as s, jsx as e } from "react/jsx-runtime";
import j, { useState as z } from "react";
import { cn as i } from "../../lib/utils.mjs";
import { DownIcon as u } from "../../icons/DownIcon.mjs";
import { UpIcon as x } from "../../icons/UpIcon.mjs";
const k = j.forwardRef(
  ({ className: b, title: o, children: d, actions: a, layout: g = "grid", collapsible: l = !1, collapsed: n, defaultCollapsed: h = !1, collapsedContent: c, onCollapseChange: t, ...v }, w) => {
    const [y, N] = z(h), m = n !== void 0, r = m ? n : y, f = () => {
      const p = !r;
      m || N(p), t == null || t(p);
    };
    return /* @__PURE__ */ s(
      "div",
      {
        ref: w,
        className: i(
          "w-full bg-card border border-border rounded-2xl overflow-hidden shrink-0",
          b
        ),
        ...v,
        children: [
          o && /* @__PURE__ */ s(
            "div",
            {
              className: i(
                "px-6 py-4 flex items-center justify-between",
                !r && "border-b border-border"
              ),
              children: [
                /* @__PURE__ */ e("h3", { className: "text-lg font-semibold", children: o }),
                l && /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    onClick: f,
                    "aria-label": r ? "펼치기" : "접기",
                    className: "flex items-center justify-center size-8 text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
                    children: r ? /* @__PURE__ */ e(u, { size: 24 }) : /* @__PURE__ */ e(x, { size: 24 })
                  }
                )
              ]
            }
          ),
          !o && l && /* @__PURE__ */ e("div", { className: i("px-4 py-1 flex justify-end", !r && "border-b border-border"), children: /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: f,
              "aria-label": r ? "펼치기" : "접기",
              className: "flex items-center justify-center size-8 text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
              children: r ? /* @__PURE__ */ e(u, { size: 24 }) : /* @__PURE__ */ e(x, { size: 24 })
            }
          ) }),
          c && /* @__PURE__ */ e(
            "div",
            {
              className: i(
                "grid transition-[grid-template-rows,opacity] duration-200 ease-in-out",
                r ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              ),
              children: /* @__PURE__ */ e("div", { className: "overflow-hidden", children: /* @__PURE__ */ e("div", { className: "px-4 py-3", children: c }) })
            }
          ),
          /* @__PURE__ */ e(
            "div",
            {
              className: i(
                "grid transition-[grid-template-rows,opacity] duration-200 ease-in-out",
                r ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
              ),
              children: /* @__PURE__ */ e("div", { className: "overflow-hidden", children: /* @__PURE__ */ e("div", { className: "p-4", children: /* @__PURE__ */ s("div", { className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [
                d && /* @__PURE__ */ e(
                  "div",
                  {
                    className: i(
                      "flex-1 gap-4",
                      g === "grid" ? "grid grid-cols-1 md:grid-cols-4" : "flex flex-wrap items-end"
                    ),
                    children: d
                  }
                ),
                a && /* @__PURE__ */ e("div", { className: "flex items-center gap-2 pl-4 shrink-0", children: a })
              ] }) }) })
            }
          )
        ]
      }
    );
  }
);
k.displayName = "SearchForm";
export {
  k as SearchForm
};
//# sourceMappingURL=search-form.mjs.map
