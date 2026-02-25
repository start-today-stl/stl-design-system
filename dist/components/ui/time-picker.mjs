import { jsxs as j, jsx as i, Fragment as A } from "react/jsx-runtime";
import * as u from "react";
import { cn as G } from "../../lib/utils.mjs";
import { InputField as J } from "./input.mjs";
import { Popover as K, PopoverTrigger as L, PopoverContent as Q } from "./popover.mjs";
import { TimeSpinner as T } from "./date-time-picker.mjs";
import { BellIcon as U } from "../../icons/BellIcon.mjs";
const st = ({
  value: c,
  onChange: e,
  label: B,
  placeholder: H = "00:00:00",
  error: M,
  errorMessage: V,
  size: w = "sm",
  disabled: m,
  className: E,
  reserveLabelSpace: F,
  showSeconds: d = !0,
  required: O
}) => {
  const [R, $] = u.useState(!1), I = (t) => {
    if (!t) return { hours: 0, minutes: 0, seconds: 0 };
    if (t instanceof Date)
      return {
        hours: t.getHours(),
        minutes: t.getMinutes(),
        seconds: t.getSeconds()
      };
    const s = t.split(":");
    return {
      hours: parseInt(s[0] || "0", 10) || 0,
      minutes: parseInt(s[1] || "0", 10) || 0,
      seconds: parseInt(s[2] || "0", 10) || 0
    };
  }, { hours: P, minutes: _, seconds: y } = I(c), [f, N] = u.useState(P), [x, S] = u.useState(_), [h, b] = u.useState(y);
  u.useEffect(() => {
    const { hours: t, minutes: s, seconds: r } = I(c);
    N(t), S(s), b(r);
  }, [c]);
  const a = (t, s, r) => {
    const o = t.toString().padStart(2, "0"), n = s.toString().padStart(2, "0"), l = r.toString().padStart(2, "0");
    return d ? `${o}:${n}:${l}` : `${o}:${n}`;
  }, [k, p] = u.useState(
    c ? a(P, _, y) : ""
  );
  u.useEffect(() => {
    if (c) {
      const { hours: t, minutes: s, seconds: r } = I(c);
      p(a(t, s, r));
    } else
      p("");
  }, [c, d]);
  const z = (t) => {
    const s = t.target.value;
    p(s);
    const r = s.split(":");
    if (r.length >= 2) {
      const o = parseInt(r[0], 10), n = parseInt(r[1], 10), l = r[2] ? parseInt(r[2], 10) : 0;
      !isNaN(o) && !isNaN(n) && o >= 0 && o <= 23 && n >= 0 && n <= 59 && l >= 0 && l <= 59 && (N(o), S(n), b(l), e == null || e(a(o, n, l)));
    }
  }, D = () => {
    if (!k) {
      e == null || e("");
      return;
    }
    const t = k.split(":");
    if (t.length >= 2) {
      const s = parseInt(t[0], 10), r = parseInt(t[1], 10), o = t[2] ? parseInt(t[2], 10) : 0;
      if (!isNaN(s) && !isNaN(r) && s >= 0 && s <= 23 && r >= 0 && r <= 59 && o >= 0 && o <= 59) {
        const n = a(s, r, o);
        p(n), e == null || e(n);
        return;
      }
    }
    p(c ? a(f, x, h) : "");
  }, g = (t) => {
    N(t);
    const s = a(t, x, h);
    p(s), e == null || e(s);
  }, q = (t) => {
    S(t);
    const s = a(f, t, h);
    p(s), e == null || e(s);
  }, v = (t) => {
    b(t);
    const s = a(f, x, t);
    p(s), e == null || e(s);
  };
  return /* @__PURE__ */ j(K, { open: R, onOpenChange: $, children: [
    /* @__PURE__ */ i(L, { asChild: !0, disabled: m, children: /* @__PURE__ */ i("div", { role: "combobox", "aria-haspopup": "dialog", className: G("inline-block", E), children: /* @__PURE__ */ i(
      J,
      {
        label: B,
        value: k,
        onChange: z,
        onBlur: D,
        placeholder: d ? H : "00:00",
        error: M,
        errorMessage: V,
        size: w,
        disabled: m,
        autoComplete: "off",
        rightIcon: /* @__PURE__ */ i(U, { size: 24 }),
        onRightIconClick: () => !m && $(!0),
        reserveLabelSpace: F,
        required: O
      }
    ) }) }),
    /* @__PURE__ */ i(
      Q,
      {
        className: "w-auto border-0 bg-transparent p-0 shadow-none",
        align: "start",
        children: /* @__PURE__ */ i("div", { className: "overflow-hidden rounded-[5px] border border-slate-100 bg-white/95 p-3 shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)] backdrop-blur-[12px] dark:border-slate-600 dark:bg-slate-800/95", children: /* @__PURE__ */ j("div", { className: "flex items-center justify-center", children: [
          /* @__PURE__ */ i(
            T,
            {
              value: f,
              onChange: g,
              max: 23,
              disabled: m
            }
          ),
          /* @__PURE__ */ i("span", { className: "flex h-[23px] w-[9px] items-center justify-center text-xs text-slate-500 dark:text-slate-300", children: ":" }),
          /* @__PURE__ */ i(
            T,
            {
              value: x,
              onChange: q,
              max: 59,
              disabled: m
            }
          ),
          d && /* @__PURE__ */ j(A, { children: [
            /* @__PURE__ */ i("span", { className: "flex h-[23px] w-[9px] items-center justify-center text-xs text-slate-500 dark:text-slate-300", children: ":" }),
            /* @__PURE__ */ i(
              T,
              {
                value: h,
                onChange: v,
                max: 59,
                disabled: m
              }
            )
          ] })
        ] }) })
      }
    )
  ] });
};
export {
  st as TimePicker
};
//# sourceMappingURL=time-picker.mjs.map
