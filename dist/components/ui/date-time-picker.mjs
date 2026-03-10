import { jsxs as S, jsx as i } from "react/jsx-runtime";
import * as p from "react";
import { format as o, parse as D, isValid as k, setHours as H, setMinutes as N, setSeconds as I } from "date-fns";
import { cn as L } from "../../lib/utils.mjs";
import { InputField as Q } from "./input.mjs";
import { Calendar as U } from "./calendar.mjs";
import { Popover as W, PopoverTrigger as X, PopoverContent as Y } from "./popover.mjs";
import { TimeSpinner as w } from "./time-spinner.mjs";
import { CalendarIcon as Z } from "../../icons/CalendarIcon.mjs";
const it = ({
  value: t,
  onChange: s,
  label: j,
  placeholder: g = "yyyy-mm-dd 00:00:00",
  dateFormat: c = "yyyy-MM-dd HH:mm:ss",
  error: P,
  errorMessage: V,
  size: _ = "md",
  disabled: d,
  className: O,
  reserveLabelSpace: T,
  required: B
}) => {
  const [R, a] = p.useState(!1), [z, y] = p.useState(t || /* @__PURE__ */ new Date()), [u, n] = p.useState(
    t ? o(t, c) : ""
  ), [h, m] = p.useState((t == null ? void 0 : t.getHours()) ?? 0), [M, f] = p.useState((t == null ? void 0 : t.getMinutes()) ?? 0), [b, x] = p.useState((t == null ? void 0 : t.getSeconds()) ?? 0);
  p.useEffect(() => {
    n(t ? o(t, c) : ""), t && (m(t.getHours()), f(t.getMinutes()), x(t.getSeconds()));
  }, [t, c]);
  const E = (e) => {
    const r = e.target.value;
    n(r);
    const l = D(r, c, /* @__PURE__ */ new Date());
    k(l) && r.length === c.length && (m(l.getHours()), f(l.getMinutes()), x(l.getSeconds()), s == null || s(l));
  }, q = () => {
    if (!u) {
      s == null || s(void 0);
      return;
    }
    const e = D(u, c, /* @__PURE__ */ new Date());
    k(e) ? (n(o(e, c)), m(e.getHours()), f(e.getMinutes()), x(e.getSeconds()), s == null || s(e)) : n(t ? o(t, c) : "");
  }, A = (e) => {
    if (e) {
      let r = H(e, h);
      r = N(r, M), r = I(r, b), n(o(r, c)), s == null || s(r);
    }
  }, G = (e) => {
    if (m(e), t) {
      const r = H(t, e);
      n(o(r, c)), s == null || s(r);
    }
  }, J = (e) => {
    if (f(e), t) {
      const r = N(t, e);
      n(o(r, c)), s == null || s(r);
    }
  }, K = (e) => {
    if (x(e), t) {
      const r = I(t, e);
      n(o(r, c)), s == null || s(r);
    }
  };
  return /* @__PURE__ */ S(W, { open: R, onOpenChange: (e) => {
    a(e), e && y(t || /* @__PURE__ */ new Date());
  }, children: [
    /* @__PURE__ */ i(X, { asChild: !0, disabled: d, children: /* @__PURE__ */ i("div", { role: "combobox", "aria-haspopup": "dialog", className: L("inline-block", O), children: /* @__PURE__ */ i(
      Q,
      {
        label: j,
        value: u,
        onChange: E,
        onBlur: q,
        placeholder: g,
        error: P,
        errorMessage: V,
        size: _,
        disabled: d,
        autoComplete: "off",
        rightIcon: /* @__PURE__ */ i(Z, { size: 24 }),
        onRightIconClick: () => !d && a(!0),
        reserveLabelSpace: T,
        required: B
      }
    ) }) }),
    /* @__PURE__ */ i(
      Y,
      {
        className: "w-auto border-0 bg-transparent p-0 shadow-none",
        align: "start",
        children: /* @__PURE__ */ S("div", { className: "w-[260px] overflow-hidden rounded-[5px] border border-slate-100 bg-white/95 shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)] backdrop-blur-[12px] dark:border-slate-600 dark:bg-slate-800/95", children: [
          /* @__PURE__ */ i(
            U,
            {
              mode: "single",
              selected: t,
              onSelect: A,
              month: z,
              onMonthChange: y,
              initialFocus: !0,
              unstyled: !0,
              className: "w-full p-3"
            }
          ),
          /* @__PURE__ */ i("div", { className: "flex items-center justify-center px-3 pb-3 pt-1", children: /* @__PURE__ */ S("div", { className: "flex items-center", children: [
            /* @__PURE__ */ i(
              w,
              {
                value: h,
                onChange: G,
                max: 23,
                disabled: d
              }
            ),
            /* @__PURE__ */ i("span", { className: "flex h-[23px] w-[9px] items-center justify-center text-xs text-slate-500 dark:text-slate-300", children: ":" }),
            /* @__PURE__ */ i(
              w,
              {
                value: M,
                onChange: J,
                max: 59,
                disabled: d
              }
            ),
            /* @__PURE__ */ i("span", { className: "flex h-[23px] w-[9px] items-center justify-center text-xs text-slate-500 dark:text-slate-300", children: ":" }),
            /* @__PURE__ */ i(
              w,
              {
                value: b,
                onChange: K,
                max: 59,
                disabled: d
              }
            )
          ] }) })
        ] })
      }
    )
  ] });
};
export {
  it as DateTimePicker
};
//# sourceMappingURL=date-time-picker.mjs.map
