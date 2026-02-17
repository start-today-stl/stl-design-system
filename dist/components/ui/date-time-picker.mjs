import { jsxs as h, jsx as c } from "react/jsx-runtime";
import * as l from "react";
import { format as o, parse as I, isValid as j, setHours as H, setMinutes as g, setSeconds as z } from "date-fns";
import { cn as J } from "../../lib/utils.mjs";
import { InputField as K } from "./input.mjs";
import { Calendar as L } from "./calendar.mjs";
import { Popover as Q, PopoverTrigger as W, PopoverContent as X } from "./popover.mjs";
import { CalendarIcon as Y } from "../../icons/CalendarIcon.mjs";
import { DownIcon as Z } from "../../icons/DownIcon.mjs";
import { UpIcon as $ } from "../../icons/UpIcon.mjs";
const y = ({ value: t, onChange: e, max: x, disabled: m }) => {
  const i = () => {
    e(t >= x ? 0 : t + 1);
  }, S = () => {
    e(t <= 0 ? x : t - 1);
  };
  return /* @__PURE__ */ h("div", { className: "flex flex-col items-center gap-0.5", children: [
    /* @__PURE__ */ c(
      "button",
      {
        type: "button",
        onClick: i,
        disabled: m,
        className: "flex size-5 cursor-pointer items-center justify-center text-slate-400 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:text-slate-200",
        children: /* @__PURE__ */ c($, { size: 20 })
      }
    ),
    /* @__PURE__ */ c("div", { className: "flex h-[23px] w-[34px] items-center justify-center rounded-[2px] p-[5px]", children: /* @__PURE__ */ c("span", { className: "text-xs font-normal tabular-nums text-slate-500 tracking-[-0.18px] dark:text-slate-300", children: t.toString().padStart(2, "0") }) }),
    /* @__PURE__ */ c(
      "button",
      {
        type: "button",
        onClick: S,
        disabled: m,
        className: "flex size-5 cursor-pointer items-center justify-center text-slate-400 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:text-slate-200",
        children: /* @__PURE__ */ c(Z, { size: 20 })
      }
    )
  ] });
}, ot = ({
  value: t,
  onChange: e,
  label: x,
  placeholder: m = "yyyy-mm-dd 00:00:00",
  dateFormat: i = "yyyy-MM-dd HH:mm:ss",
  error: S,
  errorMessage: P,
  size: V = "md",
  disabled: p,
  className: _,
  reserveLabelSpace: O
}) => {
  const [T, b] = l.useState(!1), [B, k] = l.useState(t || /* @__PURE__ */ new Date()), [w, n] = l.useState(
    t ? o(t, i) : ""
  ), [N, a] = l.useState((t == null ? void 0 : t.getHours()) ?? 0), [D, f] = l.useState((t == null ? void 0 : t.getMinutes()) ?? 0), [M, u] = l.useState((t == null ? void 0 : t.getSeconds()) ?? 0);
  l.useEffect(() => {
    n(t ? o(t, i) : ""), t && (a(t.getHours()), f(t.getMinutes()), u(t.getSeconds()));
  }, [t, i]);
  const R = (s) => {
    const r = s.target.value;
    n(r);
    const d = I(r, i, /* @__PURE__ */ new Date());
    j(d) && r.length === i.length && (a(d.getHours()), f(d.getMinutes()), u(d.getSeconds()), e == null || e(d));
  }, E = () => {
    if (!w) {
      e == null || e(void 0);
      return;
    }
    const s = I(w, i, /* @__PURE__ */ new Date());
    j(s) ? (n(o(s, i)), a(s.getHours()), f(s.getMinutes()), u(s.getSeconds()), e == null || e(s)) : n(t ? o(t, i) : "");
  }, U = (s) => {
    if (s) {
      let r = H(s, N);
      r = g(r, D), r = z(r, M), n(o(r, i)), e == null || e(r);
    }
  }, q = (s) => {
    if (a(s), t) {
      const r = H(t, s);
      n(o(r, i)), e == null || e(r);
    }
  }, A = (s) => {
    if (f(s), t) {
      const r = g(t, s);
      n(o(r, i)), e == null || e(r);
    }
  }, G = (s) => {
    if (u(s), t) {
      const r = z(t, s);
      n(o(r, i)), e == null || e(r);
    }
  };
  return /* @__PURE__ */ h(Q, { open: T, onOpenChange: (s) => {
    b(s), s && k(t || /* @__PURE__ */ new Date());
  }, children: [
    /* @__PURE__ */ c(W, { asChild: !0, disabled: p, children: /* @__PURE__ */ c("div", { role: "combobox", "aria-haspopup": "dialog", className: J("inline-block", _), children: /* @__PURE__ */ c(
      K,
      {
        label: x,
        value: w,
        onChange: R,
        onBlur: E,
        placeholder: m,
        error: S,
        errorMessage: P,
        size: V,
        disabled: p,
        autoComplete: "off",
        rightIcon: /* @__PURE__ */ c(Y, { size: 24 }),
        onRightIconClick: () => !p && b(!0),
        reserveLabelSpace: O
      }
    ) }) }),
    /* @__PURE__ */ c(
      X,
      {
        className: "w-auto border-0 bg-transparent p-0 shadow-none",
        align: "start",
        children: /* @__PURE__ */ h("div", { className: "w-[260px] overflow-hidden rounded-[5px] border border-slate-100 bg-white/95 shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)] backdrop-blur-[12px] dark:border-slate-600 dark:bg-slate-800/95", children: [
          /* @__PURE__ */ c(
            L,
            {
              mode: "single",
              selected: t,
              onSelect: U,
              month: B,
              onMonthChange: k,
              initialFocus: !0,
              unstyled: !0,
              className: "w-full p-3"
            }
          ),
          /* @__PURE__ */ c("div", { className: "flex items-center justify-center px-3 pb-3 pt-1", children: /* @__PURE__ */ h("div", { className: "flex items-center", children: [
            /* @__PURE__ */ c(
              y,
              {
                value: N,
                onChange: q,
                max: 23,
                disabled: p
              }
            ),
            /* @__PURE__ */ c("span", { className: "flex h-[23px] w-[9px] items-center justify-center text-xs text-slate-500 dark:text-slate-300", children: ":" }),
            /* @__PURE__ */ c(
              y,
              {
                value: D,
                onChange: A,
                max: 59,
                disabled: p
              }
            ),
            /* @__PURE__ */ c("span", { className: "flex h-[23px] w-[9px] items-center justify-center text-xs text-slate-500 dark:text-slate-300", children: ":" }),
            /* @__PURE__ */ c(
              y,
              {
                value: M,
                onChange: G,
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
  ot as DateTimePicker,
  y as TimeSpinner
};
//# sourceMappingURL=date-time-picker.mjs.map
