import { jsxs as q, jsx as l } from "react/jsx-runtime";
import * as c from "react";
import { format as y, parse as D, isValid as w } from "date-fns";
import { cn as A } from "../../lib/utils.mjs";
import { InputField as G, inputSizeStyles as H } from "./input.mjs";
import { Calendar as J } from "./calendar.mjs";
import { Popover as K, PopoverTrigger as L, PopoverContent as Q } from "./popover.mjs";
import { CalendarIcon as U } from "../../icons/CalendarIcon.mjs";
const C = ({
  value: s,
  onChange: r,
  label: P,
  placeholder: $ = "yyyy-mm-dd - yyyy-mm-dd",
  dateFormat: n = "yyyy-MM-dd",
  error: b,
  errorMessage: k,
  size: x = "lg",
  disabled: I,
  className: V,
  reserveLabelSpace: h,
  required: z,
  disabledDates: T
}) => {
  const [R, u] = c.useState(!1), i = c.useRef(0), [d, a] = c.useState(s);
  c.useEffect(() => {
    R || a(s);
  }, [s, R]);
  const [j, S] = c.useState(/* @__PURE__ */ new Date()), p = (t) => {
    if (!t) return "";
    const e = t.from ? y(t.from, n) : "", o = t.to ? y(t.to, n) : "";
    return e && o ? `${e} - ${o}` : e ? `${e} - ` : "";
  }, [M, f] = c.useState(p(s));
  c.useEffect(() => {
    f(p(s));
  }, [s, n]);
  const B = (t) => {
    const e = t.target.value;
    f(e);
    const o = e.split(" - ");
    if (o.length === 2) {
      const m = D(o[0].trim(), n, /* @__PURE__ */ new Date()), O = D(o[1].trim(), n, /* @__PURE__ */ new Date());
      w(m) && w(O) && (r == null || r({ from: m, to: O }));
    }
  }, E = () => {
    if (!M) {
      r == null || r(void 0);
      return;
    }
    const t = M.split(" - ");
    if (t.length === 2) {
      const e = D(t[0].trim(), n, /* @__PURE__ */ new Date()), o = D(t[1].trim(), n, /* @__PURE__ */ new Date());
      if (w(e) && w(o)) {
        f(`${y(e, n)} - ${y(o, n)}`), r == null || r({ from: e, to: o });
        return;
      }
    }
    f(p(s));
  }, N = (t) => {
    if (i.current += 1, i.current === 1) {
      const e = { from: t, to: void 0 };
      a(e), f(p(e)), r == null || r(e);
    } else {
      const e = (d == null ? void 0 : d.from) || t, o = t, m = e.getTime() <= o.getTime() ? { from: e, to: o } : { from: o, to: e };
      a(m), f(p(m)), r == null || r(m), i.current = 0, u(!1);
    }
  };
  return /* @__PURE__ */ q(K, { open: R, onOpenChange: (t) => {
    t ? (u(!0), i.current = 0, a(s), s != null && s.from ? S(s.from) : S(/* @__PURE__ */ new Date())) : i.current === 0 && u(!1);
  }, children: [
    /* @__PURE__ */ l(L, { asChild: !0, disabled: I, children: /* @__PURE__ */ l("div", { role: "combobox", "aria-haspopup": "dialog", className: A("block", H[x], V), children: /* @__PURE__ */ l(
      G,
      {
        label: P,
        value: M,
        onChange: B,
        onBlur: E,
        placeholder: $,
        error: b,
        errorMessage: k,
        size: "full",
        disabled: I,
        autoComplete: "off",
        rightIcon: /* @__PURE__ */ l(U, { size: 24 }),
        onRightIconClick: () => !I && u(!0),
        reserveLabelSpace: h,
        required: z
      }
    ) }) }),
    /* @__PURE__ */ l(
      Q,
      {
        className: "w-auto border-0 bg-transparent p-0 shadow-none",
        align: "start",
        onPointerDownOutside: (t) => {
          i.current > 0 && t.preventDefault();
        },
        onInteractOutside: (t) => {
          i.current > 0 && t.preventDefault();
        },
        children: /* @__PURE__ */ l(
          J,
          {
            mode: "range",
            selected: d,
            onSelect: () => {
            },
            onDayClick: N,
            month: j,
            onMonthChange: S,
            disabled: T,
            startMonth: new Date(2e3, 0),
            endMonth: new Date(2099, 11),
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
