import { jsxs as N, jsx as o } from "react/jsx-runtime";
import * as c from "react";
import { format as n, parse as a, isValid as y } from "date-fns";
import { cn as R } from "../../lib/utils.mjs";
import { InputField as z } from "./input.mjs";
import { Calendar as E } from "./calendar.mjs";
import { Popover as T, PopoverTrigger as q, PopoverContent as A } from "./popover.mjs";
import { CalendarIcon as G } from "../../icons/CalendarIcon.mjs";
const Y = ({
  value: r,
  onChange: e,
  label: w,
  placeholder: I = "yyyy-mm-dd",
  dateFormat: s = "yyyy-MM-dd",
  error: h,
  errorMessage: D,
  size: S = "md",
  disabled: l,
  className: b,
  reserveLabelSpace: x,
  required: M,
  disabledDates: P
}) => {
  const [V, p] = c.useState(!1), [k, d] = c.useState(r || /* @__PURE__ */ new Date()), [f, i] = c.useState(
    r ? n(r, s) : ""
  );
  c.useEffect(() => {
    i(r ? n(r, s) : "");
  }, [r, s]);
  const O = (t) => {
    const m = t.target.value;
    i(m);
    const u = a(m, s, /* @__PURE__ */ new Date());
    y(u) && m.length === s.length && (e == null || e(u));
  }, j = () => {
    if (!f) {
      e == null || e(void 0);
      return;
    }
    const t = a(f, s, /* @__PURE__ */ new Date());
    y(t) ? (i(n(t, s)), e == null || e(t)) : i(r ? n(r, s) : "");
  }, B = (t) => {
    t && (i(n(t, s)), e == null || e(t)), p(!1);
  };
  return /* @__PURE__ */ N(T, { open: V, onOpenChange: (t) => {
    p(t), t && d(r || /* @__PURE__ */ new Date());
  }, children: [
    /* @__PURE__ */ o(q, { asChild: !0, disabled: l, children: /* @__PURE__ */ o("div", { role: "combobox", "aria-haspopup": "dialog", className: R("inline-block", b), children: /* @__PURE__ */ o(
      z,
      {
        label: w,
        value: f,
        onChange: O,
        onBlur: j,
        placeholder: I,
        error: h,
        errorMessage: D,
        size: S,
        disabled: l,
        autoComplete: "off",
        rightIcon: /* @__PURE__ */ o(G, { size: 24 }),
        onRightIconClick: () => !l && p(!0),
        reserveLabelSpace: x,
        required: M
      }
    ) }) }),
    /* @__PURE__ */ o(A, { className: "w-auto border-0 bg-transparent p-0 shadow-none", align: "start", children: /* @__PURE__ */ o(
      E,
      {
        mode: "single",
        selected: r,
        onSelect: B,
        month: k,
        onMonthChange: d,
        disabled: P,
        initialFocus: !0
      }
    ) })
  ] });
};
export {
  Y as DatePicker
};
//# sourceMappingURL=date-picker.mjs.map
