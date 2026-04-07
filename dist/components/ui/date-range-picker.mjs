import { jsxs as q, jsx as l } from "react/jsx-runtime";
import * as c from "react";
import { format as a, parse as D, isValid as w } from "date-fns";
import { cn as A } from "../../lib/utils.mjs";
import { InputField as G, inputSizeStyles as H } from "./input.mjs";
import { Calendar as J } from "./calendar.mjs";
import { Popover as K, PopoverTrigger as L, PopoverContent as Q } from "./popover.mjs";
import { CalendarIcon as U } from "../../icons/CalendarIcon.mjs";
const C = ({
  value: s,
  onChange: r,
  label: $,
  placeholder: b = "yyyy-mm-dd - yyyy-mm-dd",
  dateFormat: i = "yyyy-MM-dd",
  error: k,
  errorMessage: x,
  size: M = "lg",
  disabled: I,
  className: V,
  reserveLabelSpace: z,
  required: T,
  disabledDates: j
}) => {
  const [R, u] = c.useState(!1), n = c.useRef(0), [d, y] = c.useState(s);
  c.useEffect(() => {
    R || y(s);
  }, [s, R]);
  const [B, S] = c.useState(/* @__PURE__ */ new Date()), p = (t) => {
    if (!t) return "";
    const e = t.from ? a(t.from, i) : "", o = t.to ? a(t.to, i) : "";
    return e && o ? `${e} - ${o}` : e ? `${e} - ` : "";
  }, [O, f] = c.useState(p(s));
  c.useEffect(() => {
    f(p(s));
  }, [s, i]);
  const E = (t) => {
    const e = t.target.value;
    f(e);
    const o = e.split(" - ");
    if (o.length === 2) {
      const m = D(o[0].trim(), i, /* @__PURE__ */ new Date()), P = D(o[1].trim(), i, /* @__PURE__ */ new Date());
      w(m) && w(P) && (r == null || r({ from: m, to: P }));
    }
  }, N = () => {
    if (!O) {
      r == null || r(void 0);
      return;
    }
    const t = O.split(" - ");
    if (t.length === 2) {
      const e = D(t[0].trim(), i, /* @__PURE__ */ new Date()), o = D(t[1].trim(), i, /* @__PURE__ */ new Date());
      if (w(e) && w(o)) {
        f(`${a(e, i)} - ${a(o, i)}`), r == null || r({ from: e, to: o });
        return;
      }
    }
    f(p(s));
  }, h = (t) => {
    if (n.current += 1, n.current === 1) {
      const e = { from: t, to: void 0 };
      y(e), f(p(e)), r == null || r(e);
    } else {
      const e = (d == null ? void 0 : d.from) || t, o = t, m = e.getTime() <= o.getTime() ? { from: e, to: o } : { from: o, to: e };
      y(m), f(p(m)), r == null || r(m), n.current = 0, u(!1);
    }
  };
  return /* @__PURE__ */ q(K, { open: R, onOpenChange: (t) => {
    t ? (u(!0), n.current = 0, y(s), s != null && s.from ? S(s.from) : S(/* @__PURE__ */ new Date())) : n.current === 0 && u(!1);
  }, children: [
    /* @__PURE__ */ l(L, { asChild: !0, disabled: I, children: /* @__PURE__ */ l("div", { role: "combobox", "aria-haspopup": "dialog", className: A("block", H[M], V), children: /* @__PURE__ */ l(
      G,
      {
        label: $,
        value: O,
        onChange: E,
        onBlur: N,
        placeholder: b,
        error: k,
        errorMessage: x,
        size: "full",
        disabled: I,
        autoComplete: "off",
        rightIcon: /* @__PURE__ */ l(U, { size: 24 }),
        onRightIconClick: () => !I && u(!0),
        reserveLabelSpace: z,
        required: T
      }
    ) }) }),
    /* @__PURE__ */ l(
      Q,
      {
        className: "w-auto border-0 bg-transparent p-0 shadow-none",
        align: "start",
        onPointerDownOutside: (t) => {
          n.current > 0 && t.preventDefault();
        },
        onInteractOutside: (t) => {
          n.current > 0 && t.preventDefault();
        },
        children: /* @__PURE__ */ l(
          J,
          {
            mode: "range",
            selected: d,
            onSelect: () => {
            },
            onDayClick: h,
            month: B,
            onMonthChange: S,
            disabled: j,
            initialFocus: !0
          }
        )
      }
    )
  ] });
};
export {
  C as DateRangePicker
};
//# sourceMappingURL=date-range-picker.mjs.map
