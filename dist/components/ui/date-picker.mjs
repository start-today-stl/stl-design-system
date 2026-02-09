import { jsxs as O, jsx as s } from "react/jsx-runtime";
import * as c from "react";
import { format as n, parse as a, isValid as y } from "date-fns";
import { cn as j } from "../../lib/utils.mjs";
import { InputField as B } from "./input.mjs";
import { Calendar as N } from "./calendar.mjs";
import { Popover as R, PopoverTrigger as z, PopoverContent as E } from "./popover.mjs";
import { CalenderIcon as T } from "../../icons/CalenderIcon.mjs";
const U = ({
  value: r,
  onChange: e,
  label: w,
  placeholder: I = "yyyy-mm-dd",
  dateFormat: o = "yyyy-MM-dd",
  error: h,
  errorMessage: D,
  size: S = "md",
  disabled: l,
  className: x
}) => {
  const [M, p] = c.useState(!1), [P, u] = c.useState(r || /* @__PURE__ */ new Date()), [f, i] = c.useState(
    r ? n(r, o) : ""
  );
  c.useEffect(() => {
    i(r ? n(r, o) : "");
  }, [r, o]);
  const V = (t) => {
    const m = t.target.value;
    i(m);
    const d = a(m, o, /* @__PURE__ */ new Date());
    y(d) && m.length === o.length && (e == null || e(d));
  }, b = () => {
    if (!f) {
      e == null || e(void 0);
      return;
    }
    const t = a(f, o, /* @__PURE__ */ new Date());
    y(t) ? (i(n(t, o)), e == null || e(t)) : i(r ? n(r, o) : "");
  }, k = (t) => {
    t && (i(n(t, o)), e == null || e(t)), p(!1);
  };
  return /* @__PURE__ */ O(R, { open: M, onOpenChange: (t) => {
    p(t), t && u(r || /* @__PURE__ */ new Date());
  }, children: [
    /* @__PURE__ */ s(z, { asChild: !0, disabled: l, children: /* @__PURE__ */ s("div", { role: "combobox", "aria-haspopup": "dialog", className: j("inline-block", x), children: /* @__PURE__ */ s(
      B,
      {
        label: w,
        value: f,
        onChange: V,
        onBlur: b,
        placeholder: I,
        error: h,
        errorMessage: D,
        size: S,
        disabled: l,
        autoComplete: "off",
        rightIcon: /* @__PURE__ */ s(T, { size: 24 }),
        onRightIconClick: () => !l && p(!0)
      }
    ) }) }),
    /* @__PURE__ */ s(E, { className: "w-auto border-0 bg-transparent p-0 shadow-none", align: "start", children: /* @__PURE__ */ s(
      N,
      {
        mode: "single",
        selected: r,
        onSelect: k,
        month: P,
        onMonthChange: u,
        initialFocus: !0
      }
    ) })
  ] });
};
export {
  U as DatePicker
};
//# sourceMappingURL=date-picker.mjs.map
