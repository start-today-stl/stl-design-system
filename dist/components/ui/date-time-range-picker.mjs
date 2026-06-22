import { jsxs as w, jsx as r } from "react/jsx-runtime";
import * as p from "react";
import { format as K, parse as C, isValid as H, setHours as et, setMinutes as ct, setSeconds as mt } from "date-fns";
import { cn as it } from "../../lib/utils.mjs";
import { Input as ft, inputSizeStyles as ht } from "./input.mjs";
import { Calendar as L } from "./calendar.mjs";
import { Popover as xt, PopoverTrigger as pt, PopoverContent as dt } from "./popover.mjs";
import { TimeSpinner as y } from "./time-spinner.mjs";
import { CalendarIcon as gt } from "../../icons/CalendarIcon.mjs";
const O = " ~ ", I = (t, e) => {
  if (!t) return "";
  const d = t.from ? K(t.from, e) : "", M = t.to ? K(t.to, e) : "";
  return d && M ? `${d}${O}${M}` : d ? `${d}${O}` : "";
}, jt = ({
  value: t,
  onChange: e,
  label: d,
  placeholder: M = "yyyy-mm-dd 00:00:00 ~ yyyy-mm-dd 00:00:00",
  dateFormat: m = "yyyy-MM-dd HH:mm:ss",
  error: Q,
  errorMessage: U,
  size: W = "lg",
  disabled: i,
  className: X,
  reserveLabelSpace: Z,
  required: F,
  disabledDates: h
}) => {
  var B, E, Y, q, G, J;
  const [l, A] = p.useState(!1), [R, S] = p.useState(I(t, m)), [a, V] = p.useState((t == null ? void 0 : t.from) ?? /* @__PURE__ */ new Date()), [u, _] = p.useState((t == null ? void 0 : t.to) ?? /* @__PURE__ */ new Date()), N = ((B = t == null ? void 0 : t.from) == null ? void 0 : B.getHours()) ?? 0, D = ((E = t == null ? void 0 : t.from) == null ? void 0 : E.getMinutes()) ?? 0, T = ((Y = t == null ? void 0 : t.from) == null ? void 0 : Y.getSeconds()) ?? 0, k = ((q = t == null ? void 0 : t.to) == null ? void 0 : q.getHours()) ?? 0, b = ((G = t == null ? void 0 : t.to) == null ? void 0 : G.getMinutes()) ?? 0, j = ((J = t == null ? void 0 : t.to) == null ? void 0 : J.getSeconds()) ?? 0;
  p.useEffect(() => {
    S(I(t, m));
  }, [t, m]);
  const x = (o) => {
    e == null || e(o);
  }, z = (o) => h ? [...Array.isArray(h) ? h : [h], o] : o, v = p.useMemo(() => {
    if (!(t != null && t.to)) return h;
    const o = new Date(t.to.getFullYear(), t.to.getMonth(), t.to.getDate());
    return z({ after: o });
  }, [t == null ? void 0 : t.to, h]), tt = p.useMemo(() => {
    if (!(t != null && t.from)) return h;
    const o = new Date(t.from.getFullYear(), t.from.getMonth(), t.from.getDate());
    return z({ before: o });
  }, [t == null ? void 0 : t.from, h]), ot = (o) => {
    const n = o.target.value;
    S(n);
    const s = n.split(O);
    if (s.length === 2) {
      const f = C(s[0].trim(), m, /* @__PURE__ */ new Date()), c = C(s[1].trim(), m, /* @__PURE__ */ new Date());
      H(f) && H(c) && x({ from: f, to: c });
    }
  }, nt = () => {
    if (!R) {
      e == null || e(void 0);
      return;
    }
    const o = R.split(O);
    if (o.length === 2) {
      const n = C(o[0].trim(), m, /* @__PURE__ */ new Date()), s = C(o[1].trim(), m, /* @__PURE__ */ new Date());
      if (H(n) && H(s) && n.getTime() <= s.getTime()) {
        const f = { from: n, to: s };
        S(I(f, m)), e == null || e(f);
        return;
      }
    }
    S(I(t, m));
  }, g = (o, n, s, f) => {
    let c = et(o, n);
    return c = ct(c, s), c = mt(c, f), c;
  }, rt = (o) => {
    if (!o) return;
    const n = g(o, N, D, T);
    x({ from: n, to: t == null ? void 0 : t.to });
  }, st = (o) => {
    if (!o) return;
    const n = g(o, k, b, j);
    x({ from: t == null ? void 0 : t.from, to: n });
  }, P = (o, n) => {
    if (!(t != null && t.from)) {
      const c = g(
        /* @__PURE__ */ new Date(),
        o === "h" ? n : N,
        o === "m" ? n : D,
        o === "s" ? n : T
      );
      x({ from: c, to: t == null ? void 0 : t.to });
      return;
    }
    const s = g(
      t.from,
      o === "h" ? n : N,
      o === "m" ? n : D,
      o === "s" ? n : T
    );
    x({ from: s, to: t.to });
  }, $ = (o, n) => {
    if (!(t != null && t.to)) {
      const c = g(
        /* @__PURE__ */ new Date(),
        o === "h" ? n : k,
        o === "m" ? n : b,
        o === "s" ? n : j
      );
      x({ from: t == null ? void 0 : t.from, to: c });
      return;
    }
    const s = g(
      t.to,
      o === "h" ? n : k,
      o === "m" ? n : b,
      o === "s" ? n : j
    );
    x({ from: t.from, to: s });
  };
  return /* @__PURE__ */ w(xt, { open: l, onOpenChange: (o) => {
    A(o), o && (V((t == null ? void 0 : t.from) ?? /* @__PURE__ */ new Date()), _((t == null ? void 0 : t.to) ?? /* @__PURE__ */ new Date()));
  }, children: [
    /* @__PURE__ */ r(pt, { asChild: !0, disabled: i, children: /* @__PURE__ */ r(
      "div",
      {
        role: "combobox",
        "aria-haspopup": "dialog",
        className: it("block", ht[W], X),
        children: /* @__PURE__ */ r(
          ft,
          {
            label: d,
            value: R,
            onChange: ot,
            onBlur: nt,
            placeholder: M,
            error: Q,
            errorMessage: U,
            size: "full",
            disabled: i,
            autoComplete: "off",
            rightIcon: /* @__PURE__ */ r(gt, { size: 24 }),
            onRightIconClick: () => !i && A(!0),
            reserveLabelSpace: Z,
            required: F
          }
        )
      }
    ) }),
    /* @__PURE__ */ r(
      dt,
      {
        className: "w-auto border-0 bg-transparent p-0 shadow-none",
        align: "start",
        children: /* @__PURE__ */ r("div", { className: "overflow-hidden rounded-[5px] border border-slate-100 bg-white/95 shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)] backdrop-blur-[12px] dark:border-slate-600 dark:bg-slate-800/95", children: /* @__PURE__ */ w("div", { className: "flex divide-x divide-slate-100 dark:divide-slate-600", children: [
          /* @__PURE__ */ w("div", { className: "w-[260px]", children: [
            /* @__PURE__ */ r(
              L,
              {
                mode: "single",
                selected: t == null ? void 0 : t.from,
                onSelect: rt,
                month: a,
                onMonthChange: V,
                disabled: v,
                unstyled: !0,
                className: "w-full p-3"
              }
            ),
            /* @__PURE__ */ w("div", { className: "flex items-center justify-center px-3 pb-3 pt-1", children: [
              /* @__PURE__ */ r(
                y,
                {
                  value: N,
                  onChange: (o) => P("h", o),
                  max: 23,
                  disabled: i
                }
              ),
              /* @__PURE__ */ r("span", { className: "flex h-[23px] w-[9px] items-center justify-center text-xs text-slate-500 dark:text-slate-300", children: ":" }),
              /* @__PURE__ */ r(
                y,
                {
                  value: D,
                  onChange: (o) => P("m", o),
                  max: 59,
                  disabled: i
                }
              ),
              /* @__PURE__ */ r("span", { className: "flex h-[23px] w-[9px] items-center justify-center text-xs text-slate-500 dark:text-slate-300", children: ":" }),
              /* @__PURE__ */ r(
                y,
                {
                  value: T,
                  onChange: (o) => P("s", o),
                  max: 59,
                  disabled: i
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ w("div", { className: "w-[260px]", children: [
            /* @__PURE__ */ r(
              L,
              {
                mode: "single",
                selected: t == null ? void 0 : t.to,
                onSelect: st,
                month: u,
                onMonthChange: _,
                disabled: tt,
                unstyled: !0,
                className: "w-full p-3"
              }
            ),
            /* @__PURE__ */ w("div", { className: "flex items-center justify-center px-3 pb-3 pt-1", children: [
              /* @__PURE__ */ r(
                y,
                {
                  value: k,
                  onChange: (o) => $("h", o),
                  max: 23,
                  disabled: i
                }
              ),
              /* @__PURE__ */ r("span", { className: "flex h-[23px] w-[9px] items-center justify-center text-xs text-slate-500 dark:text-slate-300", children: ":" }),
              /* @__PURE__ */ r(
                y,
                {
                  value: b,
                  onChange: (o) => $("m", o),
                  max: 59,
                  disabled: i
                }
              ),
              /* @__PURE__ */ r("span", { className: "flex h-[23px] w-[9px] items-center justify-center text-xs text-slate-500 dark:text-slate-300", children: ":" }),
              /* @__PURE__ */ r(
                y,
                {
                  value: j,
                  onChange: (o) => $("s", o),
                  max: 59,
                  disabled: i
                }
              )
            ] })
          ] })
        ] }) })
      }
    )
  ] });
};
export {
  jt as DateTimeRangePicker
};
//# sourceMappingURL=date-time-range-picker.mjs.map
