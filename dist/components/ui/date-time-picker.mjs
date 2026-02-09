import { jsxs as u, jsx as c } from "react/jsx-runtime";
import * as d from "react";
import { format as o, parse as M, isValid as j, setHours as H, setMinutes as I, setSeconds as z } from "date-fns";
import { cn as K } from "../../lib/utils.mjs";
import { InputField as L } from "./input.mjs";
import { Calendar as Q } from "./calendar.mjs";
import { Popover as U, PopoverTrigger as W, PopoverContent as X } from "./popover.mjs";
import { CalenderIcon as Y } from "../../icons/CalenderIcon.mjs";
import { DirectionIcon as P } from "../../icons/DirectionIcon.mjs";
const S = ({ value: t, onChange: e, max: l, disabled: a }) => {
  const i = () => {
    e(t >= l ? 0 : t + 1);
  }, k = () => {
    e(t <= 0 ? l : t - 1);
  };
  return /* @__PURE__ */ u("div", { className: "flex flex-col items-center gap-1", children: [
    /* @__PURE__ */ c(
      "button",
      {
        type: "button",
        onClick: i,
        disabled: a,
        className: "flex size-[10px] cursor-pointer items-center justify-center text-gray-200 hover:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-100 dark:hover:text-gray-50",
        children: /* @__PURE__ */ c(P, { size: 10, className: "rotate-180" })
      }
    ),
    /* @__PURE__ */ c("div", { className: "flex h-[23px] w-[34px] items-center justify-center rounded-[2px] p-[5px]", children: /* @__PURE__ */ c("span", { className: "text-xs font-normal tabular-nums text-gray-500 tracking-[-0.18px] dark:text-dark-100", children: t.toString().padStart(2, "0") }) }),
    /* @__PURE__ */ c(
      "button",
      {
        type: "button",
        onClick: k,
        disabled: a,
        className: "flex size-[10px] cursor-pointer items-center justify-center text-gray-200 hover:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-100 dark:hover:text-gray-50",
        children: /* @__PURE__ */ c(P, { size: 10 })
      }
    )
  ] });
}, ct = ({
  value: t,
  onChange: e,
  label: l,
  placeholder: a = "yyyy-mm-dd 00:00:00",
  dateFormat: i = "yyyy-MM-dd HH:mm:ss",
  error: k,
  errorMessage: V,
  size: _ = "md",
  disabled: p,
  className: O
}) => {
  const [T, g] = d.useState(!1), [B, w] = d.useState(t || /* @__PURE__ */ new Date()), [h, n] = d.useState(
    t ? o(t, i) : ""
  ), [b, m] = d.useState((t == null ? void 0 : t.getHours()) ?? 0), [N, f] = d.useState((t == null ? void 0 : t.getMinutes()) ?? 0), [D, y] = d.useState((t == null ? void 0 : t.getSeconds()) ?? 0);
  d.useEffect(() => {
    n(t ? o(t, i) : ""), t && (m(t.getHours()), f(t.getMinutes()), y(t.getSeconds()));
  }, [t, i]);
  const R = (r) => {
    const s = r.target.value;
    n(s);
    const x = M(s, i, /* @__PURE__ */ new Date());
    j(x) && s.length === i.length && (m(x.getHours()), f(x.getMinutes()), y(x.getSeconds()), e == null || e(x));
  }, E = () => {
    if (!h) {
      e == null || e(void 0);
      return;
    }
    const r = M(h, i, /* @__PURE__ */ new Date());
    j(r) ? (n(o(r, i)), m(r.getHours()), f(r.getMinutes()), y(r.getSeconds()), e == null || e(r)) : n(t ? o(t, i) : "");
  }, q = (r) => {
    if (r) {
      let s = H(r, b);
      s = I(s, N), s = z(s, D), n(o(s, i)), e == null || e(s);
    }
  }, A = (r) => {
    if (m(r), t) {
      const s = H(t, r);
      n(o(s, i)), e == null || e(s);
    }
  }, G = (r) => {
    if (f(r), t) {
      const s = I(t, r);
      n(o(s, i)), e == null || e(s);
    }
  }, J = (r) => {
    if (y(r), t) {
      const s = z(t, r);
      n(o(s, i)), e == null || e(s);
    }
  };
  return /* @__PURE__ */ u(U, { open: T, onOpenChange: (r) => {
    g(r), r && w(t || /* @__PURE__ */ new Date());
  }, children: [
    /* @__PURE__ */ c(W, { asChild: !0, disabled: p, children: /* @__PURE__ */ c("div", { role: "combobox", "aria-haspopup": "dialog", className: K("inline-block", O), children: /* @__PURE__ */ c(
      L,
      {
        label: l,
        value: h,
        onChange: R,
        onBlur: E,
        placeholder: a,
        error: k,
        errorMessage: V,
        size: _,
        disabled: p,
        autoComplete: "off",
        rightIcon: /* @__PURE__ */ c(Y, { size: 24 }),
        onRightIconClick: () => !p && g(!0)
      }
    ) }) }),
    /* @__PURE__ */ c(
      X,
      {
        className: "w-auto border-0 bg-transparent p-0 shadow-none",
        align: "start",
        children: /* @__PURE__ */ u("div", { className: "w-[260px] overflow-hidden rounded-[5px] border border-gray-100 bg-white/95 shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)] backdrop-blur-[12px] dark:border-dark-200 dark:bg-dark-500/95", children: [
          /* @__PURE__ */ c(
            Q,
            {
              mode: "single",
              selected: t,
              onSelect: q,
              month: B,
              onMonthChange: w,
              initialFocus: !0,
              unstyled: !0,
              className: "w-full p-3"
            }
          ),
          /* @__PURE__ */ c("div", { className: "flex items-center justify-center px-3 pb-3 pt-1", children: /* @__PURE__ */ u("div", { className: "flex items-center", children: [
            /* @__PURE__ */ c(
              S,
              {
                value: b,
                onChange: A,
                max: 23,
                disabled: p
              }
            ),
            /* @__PURE__ */ c("span", { className: "flex h-[23px] w-[9px] items-center justify-center text-xs text-gray-500 dark:text-dark-100", children: ":" }),
            /* @__PURE__ */ c(
              S,
              {
                value: N,
                onChange: G,
                max: 59,
                disabled: p
              }
            ),
            /* @__PURE__ */ c("span", { className: "flex h-[23px] w-[9px] items-center justify-center text-xs text-gray-500 dark:text-dark-100", children: ":" }),
            /* @__PURE__ */ c(
              S,
              {
                value: D,
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
  S as TimeSpinner
};
//# sourceMappingURL=date-time-picker.mjs.map
