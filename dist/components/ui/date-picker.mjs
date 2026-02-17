import { jsxs as j, jsx as s } from "react/jsx-runtime";
import * as c from "react";
import { format as n, parse as a, isValid as y } from "date-fns";
import { cn as B } from "../../lib/utils.mjs";
import { InputField as N } from "./input.mjs";
import { Calendar as R } from "./calendar.mjs";
import { Popover as z, PopoverTrigger as E, PopoverContent as T } from "./popover.mjs";
import { CalendarIcon as q } from "../../icons/CalendarIcon.mjs";
const W = ({
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
  reserveLabelSpace: M
}) => {
  const [P, p] = c.useState(!1), [V, u] = c.useState(r || /* @__PURE__ */ new Date()), [f, i] = c.useState(
    r ? n(r, o) : ""
  );
  c.useEffect(() => {
    i(r ? n(r, o) : "");
  }, [r, o]);
  const b = (t) => {
    const m = t.target.value;
    i(m);
    const d = a(m, o, /* @__PURE__ */ new Date());
    y(d) && m.length === o.length && (e == null || e(d));
  }, k = () => {
    if (!f) {
      e == null || e(void 0);
      return;
    }
    const t = a(f, o, /* @__PURE__ */ new Date());
    y(t) ? (i(n(t, o)), e == null || e(t)) : i(r ? n(r, o) : "");
  }, O = (t) => {
    t && (i(n(t, o)), e == null || e(t)), p(!1);
  };
  return /* @__PURE__ */ j(z, { open: P, onOpenChange: (t) => {
    p(t), t && u(r || /* @__PURE__ */ new Date());
  }, children: [
    /* @__PURE__ */ s(E, { asChild: !0, disabled: l, children: /* @__PURE__ */ s("div", { role: "combobox", "aria-haspopup": "dialog", className: B("inline-block", x), children: /* @__PURE__ */ s(
      N,
      {
        label: w,
        value: f,
        onChange: b,
        onBlur: k,
        placeholder: I,
        error: h,
        errorMessage: D,
        size: S,
        disabled: l,
        autoComplete: "off",
        rightIcon: /* @__PURE__ */ s(q, { size: 24 }),
        onRightIconClick: () => !l && p(!0),
        reserveLabelSpace: M
      }
    ) }) }),
    /* @__PURE__ */ s(T, { className: "w-auto border-0 bg-transparent p-0 shadow-none", align: "start", children: /* @__PURE__ */ s(
      R,
      {
        mode: "single",
        selected: r,
        onSelect: O,
        month: V,
        onMonthChange: u,
        initialFocus: !0
      }
    ) })
  ] });
};
export {
  W as DatePicker
};
//# sourceMappingURL=date-picker.mjs.map
