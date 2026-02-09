import { jsxs as O, jsx as i } from "react/jsx-runtime";
import * as c from "react";
import { format as n, parse as y, isValid as a } from "date-fns";
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
  dateFormat: s = "yyyy-MM-dd",
  error: h,
  errorMessage: D,
  size: S = "md",
  disabled: l,
  className: x
}) => {
  const [M, p] = c.useState(!1), [P, d] = c.useState(r || /* @__PURE__ */ new Date()), [f, o] = c.useState(
    r ? n(r, s) : ""
  );
  c.useEffect(() => {
    o(r ? n(r, s) : "");
  }, [r, s]);
  const V = (t) => {
    const m = t.target.value;
    o(m);
    const u = y(m, s, /* @__PURE__ */ new Date());
    a(u) && m.length === s.length && (e == null || e(u));
  }, b = () => {
    if (!f) {
      e == null || e(void 0);
      return;
    }
    const t = y(f, s, /* @__PURE__ */ new Date());
    a(t) ? (o(n(t, s)), e == null || e(t)) : o(r ? n(r, s) : "");
  }, k = (t) => {
    t && (o(n(t, s)), e == null || e(t)), p(!1);
  };
  return /* @__PURE__ */ O(R, { open: M, onOpenChange: (t) => {
    p(t), t && d(r || /* @__PURE__ */ new Date());
  }, children: [
    /* @__PURE__ */ i(z, { asChild: !0, disabled: l, children: /* @__PURE__ */ i("div", { role: "combobox", "aria-haspopup": "dialog", className: j("inline-block", x), children: /* @__PURE__ */ i(
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
        rightIcon: /* @__PURE__ */ i(T, { size: 24 }),
        onRightIconClick: () => !l && p(!0)
      }
    ) }) }),
    /* @__PURE__ */ i(E, { className: "w-auto border-0 bg-transparent p-0 shadow-none", align: "start", children: /* @__PURE__ */ i(
      N,
      {
        mode: "single",
        selected: r,
        onSelect: k,
        month: P,
        onMonthChange: d,
        initialFocus: !0
      }
    ) })
  ] });
};
export {
  U as DatePicker
};
//# sourceMappingURL=date-picker.mjs.map
