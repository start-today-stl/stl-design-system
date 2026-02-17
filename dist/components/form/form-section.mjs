import { jsx as o, jsxs as m } from "react/jsx-runtime";
import * as d from "react";
import { cn as t } from "../../lib/utils.mjs";
import { UpIcon as g } from "../../icons/UpIcon.mjs";
const N = d.forwardRef(
  ({
    className: a,
    title: r,
    collapsible: e = !1,
    defaultCollapsed: i = !1,
    divider: n = !1,
    children: c,
    ...l
  }, f) => {
    const [s, p] = d.useState(i), x = () => {
      e && p(!s);
    };
    return /* @__PURE__ */ m(
      "div",
      {
        ref: f,
        className: t("flex flex-col gap-2", a),
        ...l,
        children: [
          n && /* @__PURE__ */ o("div", { className: "py-3", children: /* @__PURE__ */ o("div", { className: "h-px bg-border" }) }),
          r && /* @__PURE__ */ m(
            "div",
            {
              className: t(
                "flex h-6 items-center justify-between",
                e && "cursor-pointer select-none"
              ),
              onClick: x,
              role: e ? "button" : void 0,
              "aria-expanded": e ? !s : void 0,
              children: [
                /* @__PURE__ */ o("span", { className: "text-sm font-medium text-text-primary", children: r }),
                e && /* @__PURE__ */ o(
                  g,
                  {
                    size: 24,
                    className: t(
                      "text-text-secondary transition-transform duration-200",
                      s && "rotate-180"
                    )
                  }
                )
              ]
            }
          ),
          !s && /* @__PURE__ */ o("div", { className: "flex flex-col gap-2", children: c })
        ]
      }
    );
  }
);
N.displayName = "FormSection";
const u = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4"
}, v = d.forwardRef(
  ({ className: a, columns: r = 1, children: e, ...i }, n) => /* @__PURE__ */ o(
    "div",
    {
      ref: n,
      className: t(
        "grid gap-2",
        u[r],
        a
      ),
      ...i,
      children: e
    }
  )
);
v.displayName = "FormRow";
export {
  v as FormRow,
  N as FormSection
};
//# sourceMappingURL=form-section.mjs.map
