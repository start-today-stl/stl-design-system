import { jsx as o, jsxs as c } from "react/jsx-runtime";
import * as d from "react";
import { cn as t } from "../../lib/utils.mjs";
import { UpIcon as u } from "../../icons/UpIcon.mjs";
const y = d.forwardRef(
  ({
    className: i,
    title: r,
    headerRight: s,
    collapsible: e = !1,
    defaultCollapsed: n = !1,
    divider: l = !1,
    fullWidth: m = !1,
    children: f,
    ...p
  }, x) => {
    const [a, g] = d.useState(n), v = () => {
      e && g(!a);
    };
    return /* @__PURE__ */ c(
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
          l && /* @__PURE__ */ o("div", { className: "py-3", children: /* @__PURE__ */ o("div", { className: "h-px bg-border" }) }),
          (r || s) && /* @__PURE__ */ c(
            "div",
            {
              className: t(
                "flex h-6 items-center justify-between",
                e && "cursor-pointer select-none"
              ),
              onClick: e ? v : void 0,
              role: e ? "button" : void 0,
              "aria-expanded": e ? !a : void 0,
              children: [
                /* @__PURE__ */ o("span", { className: "text-base font-medium text-text-primary", children: r }),
                /* @__PURE__ */ c("div", { className: "flex items-center gap-2", children: [
                  s && /* @__PURE__ */ o("div", { onClick: (N) => N.stopPropagation(), children: s }),
                  e && /* @__PURE__ */ o(
                    u,
                    {
                      size: 24,
                      className: t(
                        "text-text-secondary transition-transform duration-200",
                        a && "rotate-180"
                      )
                    }
                  )
                ] })
              ]
            }
          ),
          !a && /* @__PURE__ */ o("div", { className: "flex flex-col gap-2", children: f })
        ]
      }
    );
  }
);
y.displayName = "FormSection";
const w = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4"
}, h = d.forwardRef(
  ({ className: i, columns: r = 1, children: s, ...e }, n) => /* @__PURE__ */ o(
    "div",
    {
      ref: n,
      className: t(
        "grid gap-2",
        w[r],
        i
      ),
      ...e,
      children: s
    }
  )
);
h.displayName = "FormRow";
export {
  h as FormRow,
  y as FormSection
};
//# sourceMappingURL=form-section.mjs.map
