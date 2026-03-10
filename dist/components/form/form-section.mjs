import { jsx as e, jsxs as n } from "react/jsx-runtime";
import * as c from "react";
import { cn as t } from "../../lib/utils.mjs";
import { UpIcon as N } from "../../icons/UpIcon.mjs";
const y = c.forwardRef(
  ({
    className: i,
    title: s,
    headerRight: r,
    collapsible: a = !1,
    defaultCollapsed: l = !1,
    divider: d = !1,
    fullWidth: m = !1,
    children: f,
    ...p
  }, x) => {
    const [o, g] = c.useState(l), u = () => {
      a && g(!o);
    };
    return /* @__PURE__ */ n(
      "div",
      {
        ref: x,
        className: t(
          "flex flex-col gap-2",
          m && "col-span-full",
          i
        ),
        ...p,
        children: [
          d && /* @__PURE__ */ e("div", { className: "py-3", children: /* @__PURE__ */ e("div", { className: "h-px bg-border" }) }),
          (s || r) && /* @__PURE__ */ n("div", { className: "flex h-6 items-center justify-between", children: [
            a ? /* @__PURE__ */ n(
              "button",
              {
                type: "button",
                className: "flex items-center gap-2 cursor-pointer select-none",
                onClick: u,
                "aria-expanded": !o,
                children: [
                  /* @__PURE__ */ e("span", { className: "text-base font-medium text-text-primary", children: s }),
                  /* @__PURE__ */ e(
                    N,
                    {
                      size: 24,
                      className: t(
                        "text-text-secondary transition-transform duration-200",
                        o && "rotate-180"
                      )
                    }
                  )
                ]
              }
            ) : /* @__PURE__ */ e("span", { className: "text-base font-medium text-text-primary", children: s }),
            r && /* @__PURE__ */ e("div", { children: r })
          ] }),
          /* @__PURE__ */ e(
            "div",
            {
              className: t(
                "grid transition-[grid-template-rows,opacity] duration-200 ease-in-out",
                o ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
              ),
              children: /* @__PURE__ */ e("div", { className: "overflow-hidden", children: /* @__PURE__ */ e("div", { className: "flex flex-col gap-2", children: f }) })
            }
          )
        ]
      }
    );
  }
);
y.displayName = "FormSection";
const v = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4"
}, w = c.forwardRef(
  ({ className: i, columns: s = 1, children: r, ...a }, l) => /* @__PURE__ */ e(
    "div",
    {
      ref: l,
      className: t(
        "grid gap-2",
        v[s],
        i
      ),
      ...a,
      children: r
    }
  )
);
w.displayName = "FormRow";
export {
  w as FormRow,
  y as FormSection
};
//# sourceMappingURL=form-section.mjs.map
