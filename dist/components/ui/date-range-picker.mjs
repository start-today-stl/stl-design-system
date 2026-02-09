import { jsxs as N, jsx as p } from "react/jsx-runtime";
import * as c from "react";
import { format as D, parse as w, isValid as a } from "date-fns";
import { cn as h } from "../../lib/utils.mjs";
import { InputField as z } from "./input.mjs";
import { Calendar as q } from "./calendar.mjs";
import { Popover as A, PopoverTrigger as G, PopoverContent as H } from "./popover.mjs";
import { CalenderIcon as J } from "../../icons/CalenderIcon.mjs";
const _ = ({
  value: s,
  onChange: e,
  label: $,
  placeholder: k = "yyyy-mm-dd - yyyy-mm-dd",
  dateFormat: n = "yyyy-MM-dd",
  error: x,
  errorMessage: M,
  size: V = "lg",
  disabled: I,
  className: b
}) => {
  const [R, u] = c.useState(!1), i = c.useRef(0), [d, y] = c.useState(s);
  c.useEffect(() => {
    R || y(s);
  }, [s, R]);
  const [T, O] = c.useState(/* @__PURE__ */ new Date()), l = (t) => {
    if (!t) return "";
    const r = t.from ? D(t.from, n) : "", o = t.to ? D(t.to, n) : "";
    return r && o ? `${r} - ${o}` : r ? `${r} - ` : "";
  }, [P, f] = c.useState(l(s));
  c.useEffect(() => {
    f(l(s));
  }, [s, n]);
  const j = (t) => {
    const r = t.target.value;
    f(r);
    const o = r.split(" - ");
    if (o.length === 2) {
      const m = w(o[0].trim(), n, /* @__PURE__ */ new Date()), S = w(o[1].trim(), n, /* @__PURE__ */ new Date());
      a(m) && a(S) && (e == null || e({ from: m, to: S }));
    }
  }, B = () => {
    if (!P) {
      e == null || e(void 0);
      return;
    }
    const t = P.split(" - ");
    if (t.length === 2) {
      const r = w(t[0].trim(), n, /* @__PURE__ */ new Date()), o = w(t[1].trim(), n, /* @__PURE__ */ new Date());
      if (a(r) && a(o)) {
        f(`${D(r, n)} - ${D(o, n)}`), e == null || e({ from: r, to: o });
        return;
      }
    }
    f(l(s));
  }, E = (t) => {
    if (i.current += 1, i.current === 1) {
      const r = { from: t, to: void 0 };
      y(r), f(l(r)), e == null || e(r);
    } else {
      const r = (d == null ? void 0 : d.from) || t, o = t, m = r.getTime() <= o.getTime() ? { from: r, to: o } : { from: o, to: r };
      y(m), f(l(m)), e == null || e(m), i.current = 0, u(!1);
    }
  };
  return /* @__PURE__ */ N(A, { open: R, onOpenChange: (t) => {
    t ? (u(!0), i.current = 0, y(s), s != null && s.from ? O(s.from) : O(/* @__PURE__ */ new Date())) : i.current === 0 && u(!1);
  }, children: [
    /* @__PURE__ */ p(G, { asChild: !0, disabled: I, children: /* @__PURE__ */ p("div", { role: "combobox", "aria-haspopup": "dialog", className: h("inline-block", b), children: /* @__PURE__ */ p(
      z,
      {
        label: $,
        value: P,
        onChange: j,
        onBlur: B,
        placeholder: k,
        error: x,
        errorMessage: M,
        size: V,
        disabled: I,
        rightIcon: /* @__PURE__ */ p(J, { size: 24 }),
        onRightIconClick: () => !I && u(!0)
      }
    ) }) }),
    /* @__PURE__ */ p(
      H,
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
          q,
          {
            mode: "range",
            selected: d,
            onSelect: () => {
            },
            onDayClick: E,
            month: T,
            onMonthChange: O,
            initialFocus: !0
          }
        )
      }
    )
  ] });
};
export {
  _ as DateRangePicker
};
//# sourceMappingURL=date-range-picker.mjs.map
