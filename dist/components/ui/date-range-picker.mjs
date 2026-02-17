import { jsxs as h, jsx as p } from "react/jsx-runtime";
import * as c from "react";
import { format as a, parse as D, isValid as w } from "date-fns";
import { cn as z } from "../../lib/utils.mjs";
import { InputField as q } from "./input.mjs";
import { Calendar as A } from "./calendar.mjs";
import { Popover as G, PopoverTrigger as H, PopoverContent as J } from "./popover.mjs";
import { CalendarIcon as K } from "../../icons/CalendarIcon.mjs";
const v = ({
  value: s,
  onChange: e,
  label: $,
  placeholder: k = "yyyy-mm-dd - yyyy-mm-dd",
  dateFormat: n = "yyyy-MM-dd",
  error: x,
  errorMessage: M,
  size: V = "lg",
  disabled: I,
  className: b,
  reserveLabelSpace: T
}) => {
  const [R, u] = c.useState(!1), i = c.useRef(0), [d, y] = c.useState(s);
  c.useEffect(() => {
    R || y(s);
  }, [s, R]);
  const [j, O] = c.useState(/* @__PURE__ */ new Date()), l = (t) => {
    if (!t) return "";
    const r = t.from ? a(t.from, n) : "", o = t.to ? a(t.to, n) : "";
    return r && o ? `${r} - ${o}` : r ? `${r} - ` : "";
  }, [P, f] = c.useState(l(s));
  c.useEffect(() => {
    f(l(s));
  }, [s, n]);
  const B = (t) => {
    const r = t.target.value;
    f(r);
    const o = r.split(" - ");
    if (o.length === 2) {
      const m = D(o[0].trim(), n, /* @__PURE__ */ new Date()), S = D(o[1].trim(), n, /* @__PURE__ */ new Date());
      w(m) && w(S) && (e == null || e({ from: m, to: S }));
    }
  }, E = () => {
    if (!P) {
      e == null || e(void 0);
      return;
    }
    const t = P.split(" - ");
    if (t.length === 2) {
      const r = D(t[0].trim(), n, /* @__PURE__ */ new Date()), o = D(t[1].trim(), n, /* @__PURE__ */ new Date());
      if (w(r) && w(o)) {
        f(`${a(r, n)} - ${a(o, n)}`), e == null || e({ from: r, to: o });
        return;
      }
    }
    f(l(s));
  }, N = (t) => {
    if (i.current += 1, i.current === 1) {
      const r = { from: t, to: void 0 };
      y(r), f(l(r)), e == null || e(r);
    } else {
      const r = (d == null ? void 0 : d.from) || t, o = t, m = r.getTime() <= o.getTime() ? { from: r, to: o } : { from: o, to: r };
      y(m), f(l(m)), e == null || e(m), i.current = 0, u(!1);
    }
  };
  return /* @__PURE__ */ h(G, { open: R, onOpenChange: (t) => {
    t ? (u(!0), i.current = 0, y(s), s != null && s.from ? O(s.from) : O(/* @__PURE__ */ new Date())) : i.current === 0 && u(!1);
  }, children: [
    /* @__PURE__ */ p(H, { asChild: !0, disabled: I, children: /* @__PURE__ */ p("div", { role: "combobox", "aria-haspopup": "dialog", className: z("inline-block", b), children: /* @__PURE__ */ p(
      q,
      {
        label: $,
        value: P,
        onChange: B,
        onBlur: E,
        placeholder: k,
        error: x,
        errorMessage: M,
        size: V,
        disabled: I,
        autoComplete: "off",
        rightIcon: /* @__PURE__ */ p(K, { size: 24 }),
        onRightIconClick: () => !I && u(!0),
        reserveLabelSpace: T
      }
    ) }) }),
    /* @__PURE__ */ p(
      J,
      {
        className: "w-auto border-0 bg-transparent p-0 shadow-none",
        align: "start",
        onPointerDownOutside: (t) => {
          i.current > 0 && t.preventDefault();
        },
        onInteractOutside: (t) => {
          i.current > 0 && t.preventDefault();
        },
        children: /* @__PURE__ */ p(
          A,
          {
            mode: "range",
            selected: d,
            onSelect: () => {
            },
            onDayClick: N,
            month: j,
            onMonthChange: O,
            initialFocus: !0
          }
        )
      }
    )
  ] });
};
export {
  v as DateRangePicker
};
//# sourceMappingURL=date-range-picker.mjs.map
