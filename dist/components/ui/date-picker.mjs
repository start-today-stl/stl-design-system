import { jsxs as B, jsx as o } from "react/jsx-runtime";
import * as n from "react";
import { format as l, parse as a, isValid as y } from "date-fns";
import { cn as N } from "../../lib/utils.mjs";
import { InputField as R, inputSizeStyles as E } from "./input.mjs";
import { Calendar as T } from "./calendar.mjs";
import { Popover as q, PopoverTrigger as A, PopoverContent as G } from "./popover.mjs";
import { CalendarIcon as H } from "../../icons/CalendarIcon.mjs";
const Z = ({
  value: r,
  onChange: e,
  label: w,
  placeholder: I = "yyyy-mm-dd",
  dateFormat: s = "yyyy-MM-dd",
  error: S,
  errorMessage: h,
  size: D = "md",
  disabled: c,
  className: b,
  reserveLabelSpace: x,
  required: M,
  disabledDates: P
}) => {
  const [V, p] = n.useState(!1), [k, u] = n.useState(r || /* @__PURE__ */ new Date()), [f, i] = n.useState(
    r ? l(r, s) : ""
  );
  n.useEffect(() => {
    i(r ? l(r, s) : "");
  }, [r, s]);
  const z = (t) => {
    const m = t.target.value;
    i(m);
    const d = a(m, s, /* @__PURE__ */ new Date());
    y(d) && m.length === s.length && (e == null || e(d));
  }, O = () => {
    if (!f) {
      e == null || e(void 0);
      return;
    }
    const t = a(f, s, /* @__PURE__ */ new Date());
    y(t) ? (i(l(t, s)), e == null || e(t)) : i(r ? l(r, s) : "");
  }, j = (t) => {
    t && (i(l(t, s)), e == null || e(t)), p(!1);
  };
  return /* @__PURE__ */ B(q, { open: V, onOpenChange: (t) => {
    p(t), t && u(r || /* @__PURE__ */ new Date());
  }, children: [
    /* @__PURE__ */ o(A, { asChild: !0, disabled: c, children: /* @__PURE__ */ o("div", { role: "combobox", "aria-haspopup": "dialog", className: N("block", E[D], b), children: /* @__PURE__ */ o(
      R,
      {
        label: w,
        value: f,
        onChange: z,
        onBlur: O,
        placeholder: I,
        error: S,
        errorMessage: h,
        size: "full",
        disabled: c,
        autoComplete: "off",
        rightIcon: /* @__PURE__ */ o(H, { size: 24 }),
        onRightIconClick: () => !c && p(!0),
        reserveLabelSpace: x,
        required: M
      }
    ) }) }),
    /* @__PURE__ */ o(G, { className: "w-auto border-0 bg-transparent p-0 shadow-none", align: "start", children: /* @__PURE__ */ o(
      T,
      {
        mode: "single",
        selected: r,
        onSelect: j,
        month: k,
        onMonthChange: u,
        disabled: P,
        initialFocus: !0
      }
    ) })
  ] });
};
export {
  Z as DatePicker
};
//# sourceMappingURL=date-picker.mjs.map
