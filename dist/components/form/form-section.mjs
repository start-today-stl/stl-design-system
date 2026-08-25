import { jsx as e, jsxs as n } from "react/jsx-runtime";
import * as c from "react";
import { cn as o } from "../../lib/utils.mjs";
import { UpIcon as g } from "../../icons/UpIcon.mjs";
const y = c.forwardRef(
  ({
    className: i,
    title: s,
    headerRight: t,
    collapsible: a = !1,
    defaultCollapsed: l = !1,
    divider: m = !1,
    fullWidth: f = !1,
    children: p,
    ...x
  }, u) => {
    const [r, N] = c.useState(l), d = () => {
      a && N(!r);
    };
    return /* @__PURE__ */ n(
      "div",
      {
        ref: u,
        className: o(
          "flex flex-col gap-2",
          f && "col-span-full",
          i
        ),
        ...x,
        children: [
          m && /* @__PURE__ */ e("div", { className: "py-3", children: /* @__PURE__ */ e("div", { className: "h-px bg-border" }) }),
          (s || t) && /* @__PURE__ */ n("div", { className: "flex h-6 items-center justify-between", children: [
            a ? /* @__PURE__ */ e(
              "button",
              {
                type: "button",
                className: "cursor-pointer select-none text-left",
                onClick: d,
                "aria-expanded": !r,
                children: /* @__PURE__ */ e("span", { className: "text-base font-medium text-text-primary", children: s })
              }
            ) : /* @__PURE__ */ e("span", { className: "text-base font-medium text-text-primary", children: s }),
            /* @__PURE__ */ n("div", { className: "flex items-center gap-2", children: [
              t,
              a && /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  onClick: d,
                  "aria-label": r ? "펼치기" : "접기",
                  className: "cursor-pointer",
                  children: /* @__PURE__ */ e(
                    g,
                    {
                      size: 24,
                      className: o(
                        "text-text-secondary transition-transform duration-200",
                        r && "rotate-180"
                      )
                    }
                  )
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ e(
            "div",
            {
              className: o(
                "grid transition-[grid-template-rows,opacity] duration-200 ease-in-out",
                r ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
              ),
              children: /* @__PURE__ */ e("div", { className: "overflow-hidden", children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-2", children: p }) })
            }
          )
        ]
      }
    );
  }
);
y.displayName = "FormSection";
const h = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4"
}, v = c.forwardRef(
  ({ className: i, columns: s = 1, children: t, ...a }, l) => /* @__PURE__ */ e(
    "div",
    {
      ref: l,
      className: o(
        "grid gap-2",
        h[s],
        i
      ),
      ...a,
      children: t
    }
  )
);
v.displayName = "FormRow";
export {
  v as FormRow,
  y as FormSection
};
//# sourceMappingURL=form-section.mjs.map
