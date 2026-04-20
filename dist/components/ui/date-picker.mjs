import { jsxs as B, jsx as o } from "react/jsx-runtime";
import * as l from "react";
import { format as n, parse as a, isValid as w } from "date-fns";
import { cn as N } from "../../lib/utils.mjs";
import { InputField as R, inputSizeStyles as E } from "./input.mjs";
import { Calendar as T } from "./calendar.mjs";
import { Popover as q, PopoverTrigger as A, PopoverContent as G } from "./popover.mjs";
import { CalendarIcon as H } from "../../icons/CalendarIcon.mjs";
const Z = ({
  value: r,
  onChange: e,
  label: y,
  placeholder: h = "yyyy-mm-dd",
  dateFormat: s = "yyyy-MM-dd",
  error: D,
  errorMessage: I,
  size: S = "md",
  disabled: c,
  className: M,
  reserveLabelSpace: b,
  required: x,
  disabledDates: P
}) => {
  const [V, p] = l.useState(!1), [k, m] = l.useState(r || /* @__PURE__ */ new Date()), [f, i] = l.useState(
    r ? n(r, s) : ""
  );
  l.useEffect(() => {
    i(r ? n(r, s) : "");
  }, [r, s]);
  const z = (t) => {
    const d = t.target.value;
    i(d);
    const u = a(d, s, /* @__PURE__ */ new Date());
    w(u) && d.length === s.length && (e == null || e(u));
  }, O = () => {
    if (!f) {
      e == null || e(void 0);
      return;
    }
    const t = a(f, s, /* @__PURE__ */ new Date());
    w(t) ? (i(n(t, s)), e == null || e(t)) : i(r ? n(r, s) : "");
  }, j = (t) => {
    t && (i(n(t, s)), e == null || e(t)), p(!1);
  };
  return /* @__PURE__ */ B(q, { open: V, onOpenChange: (t) => {
    p(t), t && m(r || /* @__PURE__ */ new Date());
  }, children: [
    /* @__PURE__ */ o(A, { asChild: !0, disabled: c, children: /* @__PURE__ */ o("div", { role: "combobox", "aria-haspopup": "dialog", className: N("block", E[S], M), children: /* @__PURE__ */ o(
      R,
      {
        label: y,
        value: f,
        onChange: z,
        onBlur: O,
        placeholder: h,
        error: D,
        errorMessage: I,
        size: "full",
        disabled: c,
        autoComplete: "off",
        rightIcon: /* @__PURE__ */ o(H, { size: 24 }),
        onRightIconClick: () => !c && p(!0),
        reserveLabelSpace: b,
        required: x
      }
    ) }) }),
    /* @__PURE__ */ o(G, { className: "w-auto border-0 bg-transparent p-0 shadow-none", align: "start", children: /* @__PURE__ */ o(
      T,
      {
        mode: "single",
        selected: r,
        onSelect: j,
        month: k,
        onMonthChange: m,
        disabled: P,
        startMonth: new Date(2e3, 0),
        endMonth: new Date(2099, 11),
        initialFocus: !0
      }
    ) })
  ] });
};
export {
  Z as DatePicker
};
//# sourceMappingURL=date-picker.mjs.map
