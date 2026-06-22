import { jsxs as w, jsx as r } from "react/jsx-runtime";
import * as x from "react";
import { format as L, parse as C, isValid as I, setHours as mt, setMinutes as it, setSeconds as ft } from "date-fns";
import { cn as pt } from "../../lib/utils.mjs";
import { Input as ht, inputSizeStyles as xt } from "./input.mjs";
import { Calendar as Q } from "./calendar.mjs";
import { Popover as dt, PopoverTrigger as yt, PopoverContent as gt } from "./popover.mjs";
import { TimeSpinner as M } from "./time-spinner.mjs";
import { CalendarIcon as wt } from "../../icons/CalendarIcon.mjs";
const D = " ~ ", U = (t) => {
  const s = {
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
  return t.replace(/yyyy|yy|MM|dd|HH|mm|ss|[MdHms]/g, (i) => s[i] ?? i);
}, R = (t, s) => {
  if (!t) return "";
  const i = t.from ? L(t.from, s) : "", S = t.to ? L(t.to, s) : "";
  return i && S ? `${i}${D}${S}` : i ? `${i}${D}` : "";
}, jt = ({
  value: t,
  onChange: s,
  label: i,
  placeholder: S,
  dateFormat: m = "yyyy-MM-dd HH:mm:ss",
  error: W,
  errorMessage: X,
  size: Z = "lg",
  disabled: f,
  className: F,
  reserveLabelSpace: l,
  required: a,
  disabledDates: h
}) => {
  var B, Y, K, q, G, J;
  const [u, $] = x.useState(!1), [P, N] = x.useState(R(t, m)), d = x.useRef(!1), [v, _] = x.useState((t == null ? void 0 : t.from) ?? /* @__PURE__ */ new Date()), [tt, z] = x.useState((t == null ? void 0 : t.to) ?? /* @__PURE__ */ new Date()), H = ((B = t == null ? void 0 : t.from) == null ? void 0 : B.getHours()) ?? 0, T = ((Y = t == null ? void 0 : t.from) == null ? void 0 : Y.getMinutes()) ?? 0, k = ((K = t == null ? void 0 : t.from) == null ? void 0 : K.getSeconds()) ?? 0, b = ((q = t == null ? void 0 : t.to) == null ? void 0 : q.getHours()) ?? 0, O = ((G = t == null ? void 0 : t.to) == null ? void 0 : G.getMinutes()) ?? 0, j = ((J = t == null ? void 0 : t.to) == null ? void 0 : J.getSeconds()) ?? 0;
  x.useEffect(() => {
    N(R(t, m));
  }, [t, m]);
  const y = (o) => {
    s == null || s(o);
  }, E = (o) => h ? [...Array.isArray(h) ? h : [h], o] : o, ot = x.useMemo(() => {
    if (!(t != null && t.to)) return h;
    const o = new Date(t.to.getFullYear(), t.to.getMonth(), t.to.getDate());
    return E({ after: o });
  }, [t == null ? void 0 : t.to, h]), nt = x.useMemo(() => {
    if (!(t != null && t.from)) return h;
    const o = new Date(t.from.getFullYear(), t.from.getMonth(), t.from.getDate());
    return E({ before: o });
  }, [t == null ? void 0 : t.from, h]), rt = (o) => {
    const n = o.target.value;
    N(n);
    const e = n.split(D);
    if (e.length === 2) {
      const p = C(e[0].trim(), m, /* @__PURE__ */ new Date()), c = C(e[1].trim(), m, /* @__PURE__ */ new Date());
      I(p) && I(c) && y({ from: p, to: c });
    }
  }, st = () => {
    if (!P) {
      s == null || s(void 0);
      return;
    }
    const o = P.split(D);
    if (o.length === 2) {
      const n = C(o[0].trim(), m, /* @__PURE__ */ new Date()), e = C(o[1].trim(), m, /* @__PURE__ */ new Date());
      if (I(n) && I(e) && n.getTime() <= e.getTime()) {
        const p = { from: n, to: e };
        N(R(p, m)), s == null || s(p);
        return;
      }
    }
    N(R(t, m));
  }, g = (o, n, e, p) => {
    let c = mt(o, n);
    return c = it(c, e), c = ft(c, p), c;
  }, et = (o) => {
    if (!o) return;
    d.current = !0;
    const n = g(o, H, T, k);
    y({ from: n, to: t == null ? void 0 : t.to });
  }, ct = (o) => {
    if (!o) return;
    d.current = !0;
    const n = g(o, b, O, j);
    y({ from: t == null ? void 0 : t.from, to: n });
  }, A = (o, n) => {
    if (!(t != null && t.from)) {
      const c = g(
        /* @__PURE__ */ new Date(),
        o === "h" ? n : H,
        o === "m" ? n : T,
        o === "s" ? n : k
      );
      y({ from: c, to: t == null ? void 0 : t.to });
      return;
    }
    const e = g(
      t.from,
      o === "h" ? n : H,
      o === "m" ? n : T,
      o === "s" ? n : k
    );
    y({ from: e, to: t.to });
  }, V = (o, n) => {
    if (!(t != null && t.to)) {
      const c = g(
        /* @__PURE__ */ new Date(),
        o === "h" ? n : b,
        o === "m" ? n : O,
        o === "s" ? n : j
      );
      y({ from: t == null ? void 0 : t.from, to: c });
      return;
    }
    const e = g(
      t.to,
      o === "h" ? n : b,
      o === "m" ? n : O,
      o === "s" ? n : j
    );
    y({ from: t.from, to: e });
  };
  return /* @__PURE__ */ w(dt, { open: u, onOpenChange: (o) => {
    if (o) {
      d.current = !1, _((t == null ? void 0 : t.from) ?? /* @__PURE__ */ new Date()), z((t == null ? void 0 : t.to) ?? /* @__PURE__ */ new Date()), $(!0);
      return;
    }
    d.current && (!(t != null && t.from) || !(t != null && t.to)) || $(!1);
  }, children: [
    /* @__PURE__ */ r(yt, { asChild: !0, disabled: f, children: /* @__PURE__ */ r(
      "div",
      {
        role: "combobox",
        "aria-haspopup": "dialog",
        className: pt("block", xt[Z], F),
        children: /* @__PURE__ */ r(
          ht,
          {
            label: i,
            value: P,
            onChange: rt,
            onBlur: st,
            placeholder: S ?? `${U(m)}${D}${U(m)}`,
            error: W,
            errorMessage: X,
            size: "full",
            disabled: f,
            autoComplete: "off",
            rightIcon: /* @__PURE__ */ r(wt, { size: 24 }),
            onRightIconClick: () => !f && $(!0),
            reserveLabelSpace: l,
            required: a
          }
        )
      }
    ) }),
    /* @__PURE__ */ r(
      gt,
      {
        className: "w-auto border-0 bg-transparent p-0 shadow-none",
        align: "start",
        onPointerDownOutside: (o) => {
          d.current && (!(t != null && t.from) || !(t != null && t.to)) && o.preventDefault();
        },
        onInteractOutside: (o) => {
          d.current && (!(t != null && t.from) || !(t != null && t.to)) && o.preventDefault();
        },
        onEscapeKeyDown: (o) => {
          d.current && (!(t != null && t.from) || !(t != null && t.to)) && o.preventDefault();
        },
        children: /* @__PURE__ */ r("div", { className: "overflow-hidden rounded-[5px] border border-slate-100 bg-white/95 shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)] backdrop-blur-[12px] dark:border-slate-600 dark:bg-slate-800/95", children: /* @__PURE__ */ w("div", { className: "flex divide-x divide-slate-100 dark:divide-slate-600", children: [
          /* @__PURE__ */ w("div", { className: "w-[260px]", children: [
            /* @__PURE__ */ r(
              Q,
              {
                mode: "single",
                selected: t == null ? void 0 : t.from,
                onSelect: et,
                month: v,
                onMonthChange: _,
                disabled: ot,
                unstyled: !0,
                className: "w-full p-3"
              }
            ),
            /* @__PURE__ */ w("div", { className: "flex items-center justify-center px-3 pb-3 pt-1", children: [
              /* @__PURE__ */ r(
                M,
                {
                  value: H,
                  onChange: (o) => A("h", o),
                  max: 23,
                  disabled: f
                }
              ),
              /* @__PURE__ */ r("span", { className: "flex h-[23px] w-[9px] items-center justify-center text-xs text-slate-500 dark:text-slate-300", children: ":" }),
              /* @__PURE__ */ r(
                M,
                {
                  value: T,
                  onChange: (o) => A("m", o),
                  max: 59,
                  disabled: f
                }
              ),
              /* @__PURE__ */ r("span", { className: "flex h-[23px] w-[9px] items-center justify-center text-xs text-slate-500 dark:text-slate-300", children: ":" }),
              /* @__PURE__ */ r(
                M,
                {
                  value: k,
                  onChange: (o) => A("s", o),
                  max: 59,
                  disabled: f
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ w("div", { className: "w-[260px]", children: [
            /* @__PURE__ */ r(
              Q,
              {
                mode: "single",
                selected: t == null ? void 0 : t.to,
                onSelect: ct,
                month: tt,
                onMonthChange: z,
                disabled: nt,
                unstyled: !0,
                className: "w-full p-3"
              }
            ),
            /* @__PURE__ */ w("div", { className: "flex items-center justify-center px-3 pb-3 pt-1", children: [
              /* @__PURE__ */ r(
                M,
                {
                  value: b,
                  onChange: (o) => V("h", o),
                  max: 23,
                  disabled: f
                }
              ),
              /* @__PURE__ */ r("span", { className: "flex h-[23px] w-[9px] items-center justify-center text-xs text-slate-500 dark:text-slate-300", children: ":" }),
              /* @__PURE__ */ r(
                M,
                {
                  value: O,
                  onChange: (o) => V("m", o),
                  max: 59,
                  disabled: f
                }
              ),
              /* @__PURE__ */ r("span", { className: "flex h-[23px] w-[9px] items-center justify-center text-xs text-slate-500 dark:text-slate-300", children: ":" }),
              /* @__PURE__ */ r(
                M,
                {
                  value: j,
                  onChange: (o) => V("s", o),
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
