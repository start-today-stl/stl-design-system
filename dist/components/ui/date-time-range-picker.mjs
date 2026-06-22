import { jsxs as g, jsx as s } from "react/jsx-runtime";
import * as d from "react";
import { format as K, parse as C, isValid as $, setHours as ct, setMinutes as mt, setSeconds as it } from "date-fns";
import { cn as ft } from "../../lib/utils.mjs";
import { Input as ht, inputSizeStyles as pt } from "./input.mjs";
import { Calendar as L } from "./calendar.mjs";
import { Popover as xt, PopoverTrigger as dt, PopoverContent as yt } from "./popover.mjs";
import { TimeSpinner as w } from "./time-spinner.mjs";
import { CalendarIcon as gt } from "../../icons/CalendarIcon.mjs";
const M = " ~ ", Q = (t) => {
  const r = {
    yyyy: "yyyy",
    yy: "yy",
    MM: "mm",
    M: "m",
    dd: "dd",
    d: "d",
    HH: "00",
    H: "0",
    mm: "00",
    m: "0",
    ss: "00",
    s: "0"
  };
  return t.replace(/yyyy|yy|MM|dd|HH|mm|ss|[MdHms]/g, (i) => r[i] ?? i);
}, I = (t, r) => {
  if (!t) return "";
  const i = t.from ? K(t.from, r) : "", S = t.to ? K(t.to, r) : "";
  return i && S ? `${i}${M}${S}` : i ? `${i}${M}` : "";
}, jt = ({
  value: t,
  onChange: r,
  label: i,
  placeholder: S,
  dateFormat: m = "yyyy-MM-dd HH:mm:ss",
  error: U,
  errorMessage: W,
  size: X = "lg",
  disabled: f,
  className: Z,
  reserveLabelSpace: F,
  required: l,
  disabledDates: p
}) => {
  var B, E, Y, q, G, J;
  const [a, A] = d.useState(!1), [O, N] = d.useState(I(t, m)), [u, V] = d.useState((t == null ? void 0 : t.from) ?? /* @__PURE__ */ new Date()), [v, _] = d.useState((t == null ? void 0 : t.to) ?? /* @__PURE__ */ new Date()), D = ((B = t == null ? void 0 : t.from) == null ? void 0 : B.getHours()) ?? 0, H = ((E = t == null ? void 0 : t.from) == null ? void 0 : E.getMinutes()) ?? 0, T = ((Y = t == null ? void 0 : t.from) == null ? void 0 : Y.getSeconds()) ?? 0, k = ((q = t == null ? void 0 : t.to) == null ? void 0 : q.getHours()) ?? 0, b = ((G = t == null ? void 0 : t.to) == null ? void 0 : G.getMinutes()) ?? 0, j = ((J = t == null ? void 0 : t.to) == null ? void 0 : J.getSeconds()) ?? 0;
  d.useEffect(() => {
    N(I(t, m));
  }, [t, m]);
  const x = (o) => {
    r == null || r(o);
  }, z = (o) => p ? [...Array.isArray(p) ? p : [p], o] : o, tt = d.useMemo(() => {
    if (!(t != null && t.to)) return p;
    const o = new Date(t.to.getFullYear(), t.to.getMonth(), t.to.getDate());
    return z({ after: o });
  }, [t == null ? void 0 : t.to, p]), ot = d.useMemo(() => {
    if (!(t != null && t.from)) return p;
    const o = new Date(t.from.getFullYear(), t.from.getMonth(), t.from.getDate());
    return z({ before: o });
  }, [t == null ? void 0 : t.from, p]), nt = (o) => {
    const n = o.target.value;
    N(n);
    const e = n.split(M);
    if (e.length === 2) {
      const h = C(e[0].trim(), m, /* @__PURE__ */ new Date()), c = C(e[1].trim(), m, /* @__PURE__ */ new Date());
      $(h) && $(c) && x({ from: h, to: c });
    }
  }, st = () => {
    if (!O) {
      r == null || r(void 0);
      return;
    }
    const o = O.split(M);
    if (o.length === 2) {
      const n = C(o[0].trim(), m, /* @__PURE__ */ new Date()), e = C(o[1].trim(), m, /* @__PURE__ */ new Date());
      if ($(n) && $(e) && n.getTime() <= e.getTime()) {
        const h = { from: n, to: e };
        N(I(h, m)), r == null || r(h);
        return;
      }
    }
    N(I(t, m));
  }, y = (o, n, e, h) => {
    let c = ct(o, n);
    return c = mt(c, e), c = it(c, h), c;
  }, rt = (o) => {
    if (!o) return;
    const n = y(o, D, H, T);
    x({ from: n, to: t == null ? void 0 : t.to });
  }, et = (o) => {
    if (!o) return;
    const n = y(o, k, b, j);
    x({ from: t == null ? void 0 : t.from, to: n });
  }, P = (o, n) => {
    if (!(t != null && t.from)) {
      const c = y(
        /* @__PURE__ */ new Date(),
        o === "h" ? n : D,
        o === "m" ? n : H,
        o === "s" ? n : T
      );
      x({ from: c, to: t == null ? void 0 : t.to });
      return;
    }
    const e = y(
      t.from,
      o === "h" ? n : D,
      o === "m" ? n : H,
      o === "s" ? n : T
    );
    x({ from: e, to: t.to });
  }, R = (o, n) => {
    if (!(t != null && t.to)) {
      const c = y(
        /* @__PURE__ */ new Date(),
        o === "h" ? n : k,
        o === "m" ? n : b,
        o === "s" ? n : j
      );
      x({ from: t == null ? void 0 : t.from, to: c });
      return;
    }
    const e = y(
      t.to,
      o === "h" ? n : k,
      o === "m" ? n : b,
      o === "s" ? n : j
    );
    x({ from: t.from, to: e });
  };
  return /* @__PURE__ */ g(xt, { open: a, onOpenChange: (o) => {
    A(o), o && (V((t == null ? void 0 : t.from) ?? /* @__PURE__ */ new Date()), _((t == null ? void 0 : t.to) ?? /* @__PURE__ */ new Date()));
  }, children: [
    /* @__PURE__ */ s(dt, { asChild: !0, disabled: f, children: /* @__PURE__ */ s(
      "div",
      {
        role: "combobox",
        "aria-haspopup": "dialog",
        className: ft("block", pt[X], Z),
        children: /* @__PURE__ */ s(
          ht,
          {
            label: i,
            value: O,
            onChange: nt,
            onBlur: st,
            placeholder: S ?? `${Q(m)}${M}${Q(m)}`,
            error: U,
            errorMessage: W,
            size: "full",
            disabled: f,
            autoComplete: "off",
            rightIcon: /* @__PURE__ */ s(gt, { size: 24 }),
            onRightIconClick: () => !f && A(!0),
            reserveLabelSpace: F,
            required: l
          }
        )
      }
    ) }),
    /* @__PURE__ */ s(
      yt,
      {
        className: "w-auto border-0 bg-transparent p-0 shadow-none",
        align: "start",
        children: /* @__PURE__ */ s("div", { className: "overflow-hidden rounded-[5px] border border-slate-100 bg-white/95 shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)] backdrop-blur-[12px] dark:border-slate-600 dark:bg-slate-800/95", children: /* @__PURE__ */ g("div", { className: "flex divide-x divide-slate-100 dark:divide-slate-600", children: [
          /* @__PURE__ */ g("div", { className: "w-[260px]", children: [
            /* @__PURE__ */ s(
              L,
              {
                mode: "single",
                selected: t == null ? void 0 : t.from,
                onSelect: rt,
                month: u,
                onMonthChange: V,
                disabled: tt,
                unstyled: !0,
                className: "w-full p-3"
              }
            ),
            /* @__PURE__ */ g("div", { className: "flex items-center justify-center px-3 pb-3 pt-1", children: [
              /* @__PURE__ */ s(
                w,
                {
                  value: D,
                  onChange: (o) => P("h", o),
                  max: 23,
                  disabled: f
                }
              ),
              /* @__PURE__ */ s("span", { className: "flex h-[23px] w-[9px] items-center justify-center text-xs text-slate-500 dark:text-slate-300", children: ":" }),
              /* @__PURE__ */ s(
                w,
                {
                  value: H,
                  onChange: (o) => P("m", o),
                  max: 59,
                  disabled: f
                }
              ),
              /* @__PURE__ */ s("span", { className: "flex h-[23px] w-[9px] items-center justify-center text-xs text-slate-500 dark:text-slate-300", children: ":" }),
              /* @__PURE__ */ s(
                w,
                {
                  value: T,
                  onChange: (o) => P("s", o),
                  max: 59,
                  disabled: f
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ g("div", { className: "w-[260px]", children: [
            /* @__PURE__ */ s(
              L,
              {
                mode: "single",
                selected: t == null ? void 0 : t.to,
                onSelect: et,
                month: v,
                onMonthChange: _,
                disabled: ot,
                unstyled: !0,
                className: "w-full p-3"
              }
            ),
            /* @__PURE__ */ g("div", { className: "flex items-center justify-center px-3 pb-3 pt-1", children: [
              /* @__PURE__ */ s(
                w,
                {
                  value: k,
                  onChange: (o) => R("h", o),
                  max: 23,
                  disabled: f
                }
              ),
              /* @__PURE__ */ s("span", { className: "flex h-[23px] w-[9px] items-center justify-center text-xs text-slate-500 dark:text-slate-300", children: ":" }),
              /* @__PURE__ */ s(
                w,
                {
                  value: b,
                  onChange: (o) => R("m", o),
                  max: 59,
                  disabled: f
                }
              ),
              /* @__PURE__ */ s("span", { className: "flex h-[23px] w-[9px] items-center justify-center text-xs text-slate-500 dark:text-slate-300", children: ":" }),
              /* @__PURE__ */ s(
                w,
                {
                  value: j,
                  onChange: (o) => R("s", o),
                  max: 59,
                  disabled: f
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
