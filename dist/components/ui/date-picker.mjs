import { jsxs as B, jsx as s } from "react/jsx-runtime";
import * as c from "react";
import { format as n, parse as a, isValid as y } from "date-fns";
import { cn as N } from "../../lib/utils.mjs";
import { InputField as R } from "./input.mjs";
import { Calendar as z } from "./calendar.mjs";
import { Popover as E, PopoverTrigger as T, PopoverContent as q } from "./popover.mjs";
import { CalendarIcon as A } from "../../icons/CalendarIcon.mjs";
const X = ({
  value: r,
  onChange: e,
  label: w,
  placeholder: I = "yyyy-mm-dd",
  dateFormat: o = "yyyy-MM-dd",
  error: h,
  errorMessage: D,
  size: S = "md",
  disabled: l,
  className: x,
  reserveLabelSpace: M,
  required: P
}) => {
  const [V, p] = c.useState(!1), [b, u] = c.useState(r || /* @__PURE__ */ new Date()), [f, i] = c.useState(
    r ? n(r, o) : ""
  );
  c.useEffect(() => {
    i(r ? n(r, o) : "");
  }, [r, o]);
  const k = (t) => {
    const m = t.target.value;
    i(m);
    const d = a(m, o, /* @__PURE__ */ new Date());
    y(d) && m.length === o.length && (e == null || e(d));
  }, O = () => {
    if (!f) {
      e == null || e(void 0);
      return;
    }
    const t = a(f, o, /* @__PURE__ */ new Date());
    y(t) ? (i(n(t, o)), e == null || e(t)) : i(r ? n(r, o) : "");
  }, j = (t) => {
    t && (i(n(t, o)), e == null || e(t)), p(!1);
  };
  return /* @__PURE__ */ B(E, { open: V, onOpenChange: (t) => {
    p(t), t && u(r || /* @__PURE__ */ new Date());
  }, children: [
    /* @__PURE__ */ s(T, { asChild: !0, disabled: l, children: /* @__PURE__ */ s("div", { role: "combobox", "aria-haspopup": "dialog", className: N("inline-block", x), children: /* @__PURE__ */ s(
      R,
      {
        label: w,
        value: f,
        onChange: k,
        onBlur: O,
        placeholder: I,
        error: h,
        errorMessage: D,
        size: S,
        disabled: l,
        autoComplete: "off",
        rightIcon: /* @__PURE__ */ s(A, { size: 24 }),
        onRightIconClick: () => !l && p(!0),
        reserveLabelSpace: M,
        required: P
      }
    ) }) }),
    /* @__PURE__ */ s(q, { className: "w-auto border-0 bg-transparent p-0 shadow-none", align: "start", children: /* @__PURE__ */ s(
      z,
      {
        mode: "single",
        selected: r,
        onSelect: j,
        month: b,
        onMonthChange: u,
        initialFocus: !0
      }
    ) })
  ] });
};
export {
  X as DatePicker
};
//# sourceMappingURL=date-picker.mjs.map
