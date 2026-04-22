import { jsxs as n, jsx as e } from "react/jsx-runtime";
import * as d from "react";
import { cn as f } from "../../../lib/utils.mjs";
import { inputSizeStyles as g } from "../input.mjs";
import { BasicSelect as v } from "./basic-select.mjs";
import { SearchableSelect as z } from "./searchable-select.mjs";
import { MultiSelect as M } from "./multi-select.mjs";
import { ComboboxSelect as j } from "./combobox-select.mjs";
import { ComboboxMultiSelect as k } from "./combobox-multi-select.mjs";
const y = d.forwardRef(
  (o, t) => {
    const {
      label: s,
      size: p = "full",
      error: u,
      errorMessage: i,
      className: x,
      "aria-label": l,
      reserveLabelSpace: b,
      required: S,
      searchable: h = !1,
      multiple: c = !1,
      combobox: m = !1
    } = o, r = d.useId(), N = () => {
      const { "aria-label": C, ...a } = o;
      return m && c ? /* @__PURE__ */ e(
        k,
        {
          ref: t,
          id: r,
          ariaLabel: l,
          ...a
        }
      ) : m ? /* @__PURE__ */ e(
        j,
        {
          ref: t,
          id: r,
          ariaLabel: l,
          ...a
        }
      ) : c ? /* @__PURE__ */ e(
        M,
        {
          ref: t,
          id: r,
          ariaLabel: l,
          ...a
        }
      ) : h ? /* @__PURE__ */ e(
        z,
        {
          ref: t,
          id: r,
          ariaLabel: l,
          ...a
        }
      ) : /* @__PURE__ */ e(
        v,
        {
          ref: t,
          id: r,
          ariaLabel: l,
          ...a
        }
      );
    };
    return /* @__PURE__ */ n(
      "div",
      {
        className: f(
          "flex flex-col gap-1",
          g[p],
          x
        ),
        children: [
          (s || b) && /* @__PURE__ */ n(
            "label",
            {
              htmlFor: r,
              className: f(
                "flex items-center gap-1 text-xs text-slate-800 dark:text-slate-400",
                !s && "invisible"
              ),
              children: [
                S && /* @__PURE__ */ e("span", { className: "size-2 rounded-full bg-red-400", "aria-hidden": "true" }),
                s || " "
              ]
            }
          ),
          N(),
          u && i && /* @__PURE__ */ e("span", { className: "text-xs text-destructive dark:text-red-400", children: i })
        ]
      }
    );
  }
);
y.displayName = "Select";
export {
  y as Select,
  g as inputSizeStyles
};
//# sourceMappingURL=index.mjs.map
