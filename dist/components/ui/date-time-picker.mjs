import { jsxs as h, jsx as c } from "react/jsx-runtime";
import * as l from "react";
import { format as o, parse as j, isValid as H, setHours as I, setMinutes as g, setSeconds as z } from "date-fns";
import { cn as K } from "../../lib/utils.mjs";
import { InputField as L } from "./input.mjs";
import { Calendar as Q } from "./calendar.mjs";
import { Popover as U, PopoverTrigger as W, PopoverContent as X } from "./popover.mjs";
import { CalenderIcon as Y } from "../../icons/CalenderIcon.mjs";
import { DirectionIcon as P } from "../../icons/DirectionIcon.mjs";
const w = ({ value: t, onChange: e, max: x, disabled: a }) => {
  const i = () => {
    e(t >= x ? 0 : t + 1);
  }, S = () => {
    e(t <= 0 ? x : t - 1);
  };
  return /* @__PURE__ */ h("div", { className: "flex flex-col items-center gap-1", children: [
    /* @__PURE__ */ c(
      "button",
      {
        type: "button",
        onClick: i,
        disabled: a,
        className: "flex size-[10px] cursor-pointer items-center justify-center text-slate-200 hover:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-100 dark:hover:text-slate-50",
        children: /* @__PURE__ */ c(P, { size: 10, className: "rotate-180" })
      }
    ),
    /* @__PURE__ */ c("div", { className: "flex h-[23px] w-[34px] items-center justify-center rounded-[2px] p-[5px]", children: /* @__PURE__ */ c("span", { className: "text-xs font-normal tabular-nums text-slate-500 tracking-[-0.18px] dark:text-slate-300", children: t.toString().padStart(2, "0") }) }),
    /* @__PURE__ */ c(
      "button",
      {
        type: "button",
        onClick: S,
        disabled: a,
        className: "flex size-[10px] cursor-pointer items-center justify-center text-slate-200 hover:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-100 dark:hover:text-slate-50",
        children: /* @__PURE__ */ c(P, { size: 10 })
      }
    )
  ] });
}, ct = ({
  value: t,
  onChange: e,
  label: x,
  placeholder: a = "yyyy-mm-dd 00:00:00",
  dateFormat: i = "yyyy-MM-dd HH:mm:ss",
  error: S,
  errorMessage: V,
  size: _ = "md",
  disabled: p,
  className: O
}) => {
  const [T, b] = l.useState(!1), [B, k] = l.useState(t || /* @__PURE__ */ new Date()), [y, n] = l.useState(
    t ? o(t, i) : ""
  ), [N, m] = l.useState((t == null ? void 0 : t.getHours()) ?? 0), [D, f] = l.useState((t == null ? void 0 : t.getMinutes()) ?? 0), [M, u] = l.useState((t == null ? void 0 : t.getSeconds()) ?? 0);
  l.useEffect(() => {
    n(t ? o(t, i) : ""), t && (m(t.getHours()), f(t.getMinutes()), u(t.getSeconds()));
  }, [t, i]);
  const R = (s) => {
    const r = s.target.value;
    n(r);
    const d = j(r, i, /* @__PURE__ */ new Date());
    H(d) && r.length === i.length && (m(d.getHours()), f(d.getMinutes()), u(d.getSeconds()), e == null || e(d));
  }, E = () => {
    if (!y) {
      e == null || e(void 0);
      return;
    }
    const s = j(y, i, /* @__PURE__ */ new Date());
    H(s) ? (n(o(s, i)), m(s.getHours()), f(s.getMinutes()), u(s.getSeconds()), e == null || e(s)) : n(t ? o(t, i) : "");
  }, q = (s) => {
    if (s) {
      let r = I(s, N);
      r = g(r, D), r = z(r, M), n(o(r, i)), e == null || e(r);
    }
  }, A = (s) => {
    if (m(s), t) {
      const r = I(t, s);
      n(o(r, i)), e == null || e(r);
    }
  }, G = (s) => {
    if (f(s), t) {
      const r = g(t, s);
      n(o(r, i)), e == null || e(r);
    }
  }, J = (s) => {
    if (u(s), t) {
      const r = z(t, s);
      n(o(r, i)), e == null || e(r);
    }
  };
  return /* @__PURE__ */ h(U, { open: T, onOpenChange: (s) => {
    b(s), s && k(t || /* @__PURE__ */ new Date());
  }, children: [
    /* @__PURE__ */ c(W, { asChild: !0, disabled: p, children: /* @__PURE__ */ c("div", { role: "combobox", "aria-haspopup": "dialog", className: K("inline-block", O), children: /* @__PURE__ */ c(
      L,
      {
        label: x,
        value: y,
        onChange: R,
        onBlur: E,
        placeholder: a,
        error: S,
        errorMessage: V,
        size: _,
        disabled: p,
        autoComplete: "off",
        rightIcon: /* @__PURE__ */ c(Y, { size: 24 }),
        onRightIconClick: () => !p && b(!0)
      }
    ) }) }),
    /* @__PURE__ */ c(
      X,
      {
        className: "w-auto border-0 bg-transparent p-0 shadow-none",
        align: "start",
        children: /* @__PURE__ */ h("div", { className: "w-[260px] overflow-hidden rounded-[5px] border border-slate-100 bg-white/95 shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)] backdrop-blur-[12px] dark:border-slate-600 dark:bg-slate-800/95", children: [
          /* @__PURE__ */ c(
            Q,
            {
              mode: "single",
              selected: t,
              onSelect: q,
              month: B,
              onMonthChange: k,
              initialFocus: !0,
              unstyled: !0,
              className: "w-full p-3"
            }
          ),
          /* @__PURE__ */ c("div", { className: "flex items-center justify-center px-3 pb-3 pt-1", children: /* @__PURE__ */ h("div", { className: "flex items-center", children: [
            /* @__PURE__ */ c(
              w,
              {
                value: N,
                onChange: A,
                max: 23,
                disabled: p
              }
            ),
            /* @__PURE__ */ c("span", { className: "flex h-[23px] w-[9px] items-center justify-center text-xs text-slate-500 dark:text-slate-300", children: ":" }),
            /* @__PURE__ */ c(
              w,
              {
                value: D,
                onChange: G,
                max: 59,
                disabled: p
              }
            ),
            /* @__PURE__ */ c("span", { className: "flex h-[23px] w-[9px] items-center justify-center text-xs text-slate-500 dark:text-slate-300", children: ":" }),
            /* @__PURE__ */ c(
              w,
              {
                value: M,
                onChange: J,
                max: 59,
                disabled: p
              }
            )
          ] }) })
        ] })
      }
    )
  ] });
};
export {
  ct as DateTimePicker,
  w as TimeSpinner
};
//# sourceMappingURL=date-time-picker.mjs.map
