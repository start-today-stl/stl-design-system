import { jsx as o, jsxs as d } from "react/jsx-runtime";
import * as c from "react";
import { cn as a } from "../../lib/utils.mjs";
import { UpIcon as u } from "../../icons/UpIcon.mjs";
const N = c.forwardRef(
  ({
    className: t,
    title: s,
    collapsible: e = !1,
    defaultCollapsed: i = !1,
    divider: n = !1,
    fullWidth: l = !1,
    children: m,
    ...f
  }, p) => {
    const [r, x] = c.useState(i), g = () => {
      e && x(!r);
    };
    return /* @__PURE__ */ d(
      "div",
      {
        ref: p,
        className: a(
          "flex flex-col gap-2",
          l && "col-span-full",
          t
        ),
        ...f,
        children: [
          n && /* @__PURE__ */ o("div", { className: "py-3", children: /* @__PURE__ */ o("div", { className: "h-px bg-border" }) }),
          s && /* @__PURE__ */ d(
            "div",
            {
              className: a(
                "flex h-6 items-center justify-between",
                e && "cursor-pointer select-none"
              ),
              onClick: g,
              role: e ? "button" : void 0,
              "aria-expanded": e ? !r : void 0,
              children: [
                /* @__PURE__ */ o("span", { className: "text-sm font-medium text-text-primary", children: s }),
                e && /* @__PURE__ */ o(
                  u,
                  {
                    size: 24,
                    className: a(
                      "text-text-secondary transition-transform duration-200",
                      r && "rotate-180"
                    )
                  }
                )
              ]
            }
          ),
          !r && /* @__PURE__ */ o("div", { className: "flex flex-col gap-2", children: m })
        ]
      }
    );
  }
);
N.displayName = "FormSection";
const v = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4"
}, h = c.forwardRef(
  ({ className: t, columns: s = 1, children: e, ...i }, n) => /* @__PURE__ */ o(
    "div",
    {
      ref: n,
      className: a(
        "grid gap-2",
        v[s],
        t
      ),
      ...i,
      children: e
    }
  )
);
h.displayName = "FormRow";
export {
  h as FormRow,
  N as FormSection
};
//# sourceMappingURL=form-section.mjs.map
