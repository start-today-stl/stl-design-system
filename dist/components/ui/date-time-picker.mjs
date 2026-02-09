import { jsxs as u, jsx as c } from "react/jsx-runtime";
import * as p from "react";
import { format as o, parse as M, isValid as j, setHours as H, setMinutes as I, setSeconds as z } from "date-fns";
import { cn as K } from "../../lib/utils.mjs";
import { InputField as L } from "./input.mjs";
import { Calendar as Q } from "./calendar.mjs";
import { Popover as U, PopoverTrigger as W, PopoverContent as X } from "./popover.mjs";
import { CalenderIcon as Y } from "../../icons/CalenderIcon.mjs";
import { DirectionIcon as P } from "../../icons/DirectionIcon.mjs";
const h = ({ value: t, onChange: e, max: x, disabled: m }) => {
  const i = () => {
    e(t >= x ? 0 : t + 1);
  }, S = () => {
    e(t <= 0 ? x : t - 1);
  };
  return /* @__PURE__ */ u("div", { className: "flex flex-col items-center gap-1", children: [
    /* @__PURE__ */ c(
      "button",
      {
        type: "button",
        onClick: i,
        disabled: m,
        className: "flex size-[10px] cursor-pointer items-center justify-center text-gray-200 hover:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50",
        children: /* @__PURE__ */ c(P, { size: 10, className: "rotate-180" })
      }
    ),
    /* @__PURE__ */ c("div", { className: "flex h-[23px] w-[34px] items-center justify-center rounded-[2px] p-[5px]", children: /* @__PURE__ */ c("span", { className: "text-xs font-normal tabular-nums text-gray-500 tracking-[-0.18px] dark:text-gray-300", children: t.toString().padStart(2, "0") }) }),
    /* @__PURE__ */ c(
      "button",
      {
        type: "button",
        onClick: S,
        disabled: m,
        className: "flex size-[10px] cursor-pointer items-center justify-center text-gray-200 hover:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50",
        children: /* @__PURE__ */ c(P, { size: 10 })
      }
    )
  ] });
}, ct = ({
  value: t,
  onChange: e,
  label: x,
  placeholder: m = "yyyy-mm-dd 00:00:00",
  dateFormat: i = "yyyy-MM-dd HH:mm:ss",
  error: S,
  errorMessage: V,
  size: _ = "md",
  disabled: d,
  className: O
}) => {
  const [T, w] = p.useState(!1), [B, g] = p.useState(t || /* @__PURE__ */ new Date()), [b, n] = p.useState(
    t ? o(t, i) : ""
  ), [N, f] = p.useState((t == null ? void 0 : t.getHours()) ?? 0), [k, a] = p.useState((t == null ? void 0 : t.getMinutes()) ?? 0), [D, y] = p.useState((t == null ? void 0 : t.getSeconds()) ?? 0);
  p.useEffect(() => {
    n(t ? o(t, i) : ""), t && (f(t.getHours()), a(t.getMinutes()), y(t.getSeconds()));
  }, [t, i]);
  const R = (s) => {
    const r = s.target.value;
    n(r);
    const l = M(r, i, /* @__PURE__ */ new Date());
    j(l) && r.length === i.length && (f(l.getHours()), a(l.getMinutes()), y(l.getSeconds()), e == null || e(l));
  }, E = () => {
    if (!b) {
      e == null || e(void 0);
      return;
    }
    const s = M(b, i, /* @__PURE__ */ new Date());
    j(s) ? (n(o(s, i)), f(s.getHours()), a(s.getMinutes()), y(s.getSeconds()), e == null || e(s)) : n(t ? o(t, i) : "");
  }, q = (s) => {
    if (s) {
      let r = H(s, N);
      r = I(r, k), r = z(r, D), n(o(r, i)), e == null || e(r);
    }
  }, A = (s) => {
    if (f(s), t) {
      const r = H(t, s);
      n(o(r, i)), e == null || e(r);
    }
  }, G = (s) => {
    if (a(s), t) {
      const r = I(t, s);
      n(o(r, i)), e == null || e(r);
    }
  }, J = (s) => {
    if (y(s), t) {
      const r = z(t, s);
      n(o(r, i)), e == null || e(r);
    }
  };
  return /* @__PURE__ */ u(U, { open: T, onOpenChange: (s) => {
    w(s), s && g(t || /* @__PURE__ */ new Date());
  }, children: [
    /* @__PURE__ */ c(W, { asChild: !0, disabled: d, children: /* @__PURE__ */ c("div", { role: "combobox", "aria-haspopup": "dialog", className: K("inline-block", O), children: /* @__PURE__ */ c(
      L,
      {
        label: x,
        value: b,
        onChange: R,
        onBlur: E,
        placeholder: m,
        error: S,
        errorMessage: V,
        size: _,
        disabled: d,
        rightIcon: /* @__PURE__ */ c(Y, { size: 24 }),
        onRightIconClick: () => !d && w(!0)
      }
    ) }) }),
    /* @__PURE__ */ u(
      X,
      {
        className: "w-[260px] overflow-hidden rounded-[5px] border border-gray-100 bg-white/95 p-0 shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)] backdrop-blur-[12px] dark:border-dark-100 dark:bg-dark-500/95",
        align: "start",
        children: [
          /* @__PURE__ */ c(
            Q,
            {
              mode: "single",
              selected: t,
              onSelect: q,
              month: B,
              onMonthChange: g,
              initialFocus: !0,
              className: "w-full border-0 bg-transparent shadow-none"
            }
          ),
          /* @__PURE__ */ c("div", { className: "flex items-center justify-center px-3 pb-3 pt-1", children: /* @__PURE__ */ u("div", { className: "flex items-center", children: [
            /* @__PURE__ */ c(
              h,
              {
                value: N,
                onChange: A,
                max: 23,
                disabled: d
              }
            ),
            /* @__PURE__ */ c("span", { className: "flex h-[23px] w-[9px] items-center justify-center text-xs text-gray-500", children: ":" }),
            /* @__PURE__ */ c(
              h,
              {
                value: k,
                onChange: G,
                max: 59,
                disabled: d
              }
            ),
            /* @__PURE__ */ c("span", { className: "flex h-[23px] w-[9px] items-center justify-center text-xs text-gray-500", children: ":" }),
            /* @__PURE__ */ c(
              h,
              {
                value: D,
                onChange: J,
                max: 59,
                disabled: d
              }
            )
          ] }) })
        ]
      }
    )
  ] });
};
export {
  ct as DateTimePicker,
  h as TimeSpinner
};
//# sourceMappingURL=date-time-picker.mjs.map
