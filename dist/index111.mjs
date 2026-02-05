import m, { useMemo as U, useCallback as h, useRef as Ie } from "react";
import { DateLib as Ke } from "./index209.mjs";
import { createGetModifiers as Ge } from "./index210.mjs";
import { getClassNamesForModifiers as He } from "./index211.mjs";
import { getComponents as _e } from "./index212.mjs";
import { getDataAttributes as Ue } from "./index213.mjs";
import { getDefaultClassNames as je } from "./index110.mjs";
import { getFormatters as Ve } from "./index214.mjs";
import { getLabels as $e } from "./index215.mjs";
import { getMonthOptions as qe } from "./index216.mjs";
import { getStyleForModifiers as ze } from "./index217.mjs";
import { getWeekdays as Je } from "./index218.mjs";
import { getYearOptions as Qe } from "./index219.mjs";
import { createNoonOverrides as Xe } from "./index220.mjs";
import { UI as r, DayFlag as et, SelectionState as P } from "./index221.mjs";
import { useAnimation as tt } from "./index222.mjs";
import { useCalendar as at } from "./index223.mjs";
import { dayPickerContext as ot } from "./index224.mjs";
import { useFocus as nt } from "./index225.mjs";
import { useSelection as rt } from "./index226.mjs";
import { convertMatchersToTimeZone as j } from "./index227.mjs";
import { rangeIncludesDate as it } from "./index228.mjs";
import { toTimeZone as k } from "./index229.mjs";
import { isDateRange as dt } from "./index230.mjs";
import { enUS as st } from "./index231.mjs";
function Lt(V) {
  var re;
  let e = V;
  const f = e.timeZone;
  if (f && (e = {
    ...V,
    timeZone: f
  }, e.today && (e.today = k(e.today, f)), e.month && (e.month = k(e.month, f)), e.defaultMonth && (e.defaultMonth = k(e.defaultMonth, f)), e.startMonth && (e.startMonth = k(e.startMonth, f)), e.endMonth && (e.endMonth = k(e.endMonth, f)), e.mode === "single" && e.selected ? e.selected = k(e.selected, f) : e.mode === "multiple" && e.selected ? e.selected = (re = e.selected) == null ? void 0 : re.map((n) => k(n, f)) : e.mode === "range" && e.selected && (e.selected = {
    from: e.selected.from ? k(e.selected.from, f) : e.selected.from,
    to: e.selected.to ? k(e.selected.to, f) : e.selected.to
  }), e.disabled !== void 0 && (e.disabled = j(e.disabled, f)), e.hidden !== void 0 && (e.hidden = j(e.hidden, f)), e.modifiers)) {
    const n = {};
    Object.keys(e.modifiers).forEach((s) => {
      var a;
      n[s] = j((a = e.modifiers) == null ? void 0 : a[s], f);
    }), e.modifiers = n;
  }
  const { components: c, formatters: D, labels: $, dateLib: o, locale: ie, classNames: l } = U(() => {
    const n = { ...st, ...e.locale }, s = e.broadcastCalendar ? 1 : e.weekStartsOn, a = e.noonSafe && e.timeZone ? Xe(e.timeZone, {
      weekStartsOn: s,
      locale: n
    }) : void 0, d = e.dateLib && a ? { ...a, ...e.dateLib } : e.dateLib ?? a, u = new Ke({
      locale: n,
      weekStartsOn: s,
      firstWeekContainsDate: e.firstWeekContainsDate,
      useAdditionalWeekYearTokens: e.useAdditionalWeekYearTokens,
      useAdditionalDayOfYearTokens: e.useAdditionalDayOfYearTokens,
      timeZone: e.timeZone,
      numerals: e.numerals
    }, d);
    return {
      dateLib: u,
      components: _e(e.components),
      formatters: Ve(e.formatters),
      labels: $e(e.labels, u.options),
      locale: n,
      classNames: { ...je(), ...e.classNames }
    };
  }, [
    e.locale,
    e.broadcastCalendar,
    e.weekStartsOn,
    e.firstWeekContainsDate,
    e.useAdditionalWeekYearTokens,
    e.useAdditionalDayOfYearTokens,
    e.timeZone,
    e.numerals,
    e.dateLib,
    e.noonSafe,
    e.components,
    e.formatters,
    e.labels,
    e.classNames
  ]);
  e.today || (e = { ...e, today: o.today() });
  const { captionLayout: v, mode: F, navLayout: w, numberOfMonths: q = 1, onDayBlur: W, onDayClick: g, onDayFocus: C, onDayKeyDown: E, onDayMouseEnter: O, onDayMouseLeave: B, onNextClick: S, onPrevClick: Y, showWeekNumber: z, styles: t } = e, { formatCaption: J, formatDay: Q, formatMonthDropdown: de, formatWeekNumber: se, formatWeekNumberHeader: le, formatWeekdayName: me, formatYearDropdown: ce } = D, X = at(e, o), { days: fe, months: T, navStart: R, navEnd: Z, previousMonth: p, nextMonth: b, goToMonth: N } = X, I = Ge(fe, e, R, Z, o), { isSelected: M, select: y, selected: x } = rt(e, o) ?? {}, { blur: ee, focused: A, isFocusTarget: ue, moveFocus: te, setFocused: L } = nt(e, X, I, M ?? (() => !1), o), { labelDayButton: pe, labelGridcell: be, labelGrid: he, labelMonthDropdown: Ne, labelNav: ae, labelPrevious: ke, labelNext: ve, labelWeekday: ge, labelWeekNumber: Me, labelWeekNumberHeader: ye, labelYearDropdown: De } = $, we = U(() => Je(o, e.ISOWeek, e.broadcastCalendar, e.today), [o, e.ISOWeek, e.broadcastCalendar, e.today]), oe = F !== void 0 || g !== void 0, K = h(() => {
    p && (N(p), Y == null || Y(p));
  }, [p, N, Y]), G = h(() => {
    b && (N(b), S == null || S(b));
  }, [N, b, S]), We = h((n, s) => (a) => {
    a.preventDefault(), a.stopPropagation(), L(n), !s.disabled && (y == null || y(n.date, s, a), g == null || g(n.date, s, a));
  }, [y, g, L]), Ce = h((n, s) => (a) => {
    L(n), C == null || C(n.date, s, a);
  }, [C, L]), Ee = h((n, s) => (a) => {
    ee(), W == null || W(n.date, s, a);
  }, [ee, W]), Oe = h((n, s) => (a) => {
    const d = {
      ArrowLeft: [
        a.shiftKey ? "month" : "day",
        e.dir === "rtl" ? "after" : "before"
      ],
      ArrowRight: [
        a.shiftKey ? "month" : "day",
        e.dir === "rtl" ? "before" : "after"
      ],
      ArrowDown: [a.shiftKey ? "year" : "week", "after"],
      ArrowUp: [a.shiftKey ? "year" : "week", "before"],
      PageUp: [a.shiftKey ? "year" : "month", "before"],
      PageDown: [a.shiftKey ? "year" : "month", "after"],
      Home: ["startOfWeek", "before"],
      End: ["endOfWeek", "after"]
    };
    if (d[a.key]) {
      a.preventDefault(), a.stopPropagation();
      const [u, i] = d[a.key];
      te(u, i);
    }
    E == null || E(n.date, s, a);
  }, [te, E, e.dir]), Be = h((n, s) => (a) => {
    O == null || O(n.date, s, a);
  }, [O]), Se = h((n, s) => (a) => {
    B == null || B(n.date, s, a);
  }, [B]), Ye = h((n) => (s) => {
    const a = Number(s.target.value), d = o.setMonth(o.startOfMonth(n), a);
    N(d);
  }, [o, N]), xe = h((n) => (s) => {
    const a = Number(s.target.value), d = o.setYear(o.startOfMonth(n), a);
    N(d);
  }, [o, N]), { className: Ae, style: Le } = U(() => ({
    className: [l[r.Root], e.className].filter(Boolean).join(" "),
    style: { ...t == null ? void 0 : t[r.Root], ...e.style }
  }), [l, e.className, e.style, t]), Pe = Ue(e), ne = Ie(null);
  tt(ne, !!e.animate, {
    classNames: l,
    months: T,
    focused: A,
    dateLib: o
  });
  const Fe = {
    dayPickerProps: e,
    selected: x,
    select: y,
    isSelected: M,
    months: T,
    nextMonth: b,
    previousMonth: p,
    goToMonth: N,
    getModifiers: I,
    components: c,
    classNames: l,
    styles: t,
    labels: $,
    formatters: D
  };
  return m.createElement(
    ot.Provider,
    { value: Fe },
    m.createElement(
      c.Root,
      { rootRef: e.animate ? ne : void 0, className: Ae, style: Le, dir: e.dir, id: e.id, lang: e.lang, nonce: e.nonce, title: e.title, role: e.role, "aria-label": e["aria-label"], "aria-labelledby": e["aria-labelledby"], ...Pe },
      m.createElement(
        c.Months,
        { className: l[r.Months], style: t == null ? void 0 : t[r.Months] },
        !e.hideNavigation && !w && m.createElement(c.Nav, { "data-animated-nav": e.animate ? "true" : void 0, className: l[r.Nav], style: t == null ? void 0 : t[r.Nav], "aria-label": ae(), onPreviousClick: K, onNextClick: G, previousMonth: p, nextMonth: b }),
        T.map((n, s) => m.createElement(
          c.Month,
          {
            "data-animated-month": e.animate ? "true" : void 0,
            className: l[r.Month],
            style: t == null ? void 0 : t[r.Month],
            // biome-ignore lint/suspicious/noArrayIndexKey: breaks animation
            key: s,
            displayIndex: s,
            calendarMonth: n
          },
          w === "around" && !e.hideNavigation && s === 0 && m.createElement(
            c.PreviousMonthButton,
            { type: "button", className: l[r.PreviousMonthButton], tabIndex: p ? void 0 : -1, "aria-disabled": p ? void 0 : !0, "aria-label": ke(p), onClick: K, "data-animated-button": e.animate ? "true" : void 0 },
            m.createElement(c.Chevron, { disabled: p ? void 0 : !0, className: l[r.Chevron], orientation: e.dir === "rtl" ? "right" : "left" })
          ),
          m.createElement(c.MonthCaption, { "data-animated-caption": e.animate ? "true" : void 0, className: l[r.MonthCaption], style: t == null ? void 0 : t[r.MonthCaption], calendarMonth: n, displayIndex: s }, v != null && v.startsWith("dropdown") ? m.createElement(
            c.DropdownNav,
            { className: l[r.Dropdowns], style: t == null ? void 0 : t[r.Dropdowns] },
            (() => {
              const a = v === "dropdown" || v === "dropdown-months" ? m.createElement(c.MonthsDropdown, { key: "month", className: l[r.MonthsDropdown], "aria-label": Ne(), classNames: l, components: c, disabled: !!e.disableNavigation, onChange: Ye(n.date), options: qe(n.date, R, Z, D, o), style: t == null ? void 0 : t[r.Dropdown], value: o.getMonth(n.date) }) : m.createElement("span", { key: "month" }, de(n.date, o)), d = v === "dropdown" || v === "dropdown-years" ? m.createElement(c.YearsDropdown, { key: "year", className: l[r.YearsDropdown], "aria-label": De(o.options), classNames: l, components: c, disabled: !!e.disableNavigation, onChange: xe(n.date), options: Qe(R, Z, D, o, !!e.reverseYears), style: t == null ? void 0 : t[r.Dropdown], value: o.getYear(n.date) }) : m.createElement("span", { key: "year" }, ce(n.date, o));
              return o.getMonthYearOrder() === "year-first" ? [d, a] : [a, d];
            })(),
            m.createElement("span", { role: "status", "aria-live": "polite", style: {
              border: 0,
              clip: "rect(0 0 0 0)",
              height: "1px",
              margin: "-1px",
              overflow: "hidden",
              padding: 0,
              position: "absolute",
              width: "1px",
              whiteSpace: "nowrap",
              wordWrap: "normal"
            } }, J(n.date, o.options, o))
          ) : m.createElement(c.CaptionLabel, { className: l[r.CaptionLabel], role: "status", "aria-live": "polite" }, J(n.date, o.options, o))),
          w === "around" && !e.hideNavigation && s === q - 1 && m.createElement(
            c.NextMonthButton,
            { type: "button", className: l[r.NextMonthButton], tabIndex: b ? void 0 : -1, "aria-disabled": b ? void 0 : !0, "aria-label": ve(b), onClick: G, "data-animated-button": e.animate ? "true" : void 0 },
            m.createElement(c.Chevron, { disabled: b ? void 0 : !0, className: l[r.Chevron], orientation: e.dir === "rtl" ? "left" : "right" })
          ),
          s === q - 1 && w === "after" && !e.hideNavigation && m.createElement(c.Nav, { "data-animated-nav": e.animate ? "true" : void 0, className: l[r.Nav], style: t == null ? void 0 : t[r.Nav], "aria-label": ae(), onPreviousClick: K, onNextClick: G, previousMonth: p, nextMonth: b }),
          m.createElement(
            c.MonthGrid,
            { role: "grid", "aria-multiselectable": F === "multiple" || F === "range", "aria-label": he(n.date, o.options, o) || void 0, className: l[r.MonthGrid], style: t == null ? void 0 : t[r.MonthGrid] },
            !e.hideWeekdays && m.createElement(
              c.Weekdays,
              { "data-animated-weekdays": e.animate ? "true" : void 0, className: l[r.Weekdays], style: t == null ? void 0 : t[r.Weekdays] },
              z && m.createElement(c.WeekNumberHeader, { "aria-label": ye(o.options), className: l[r.WeekNumberHeader], style: t == null ? void 0 : t[r.WeekNumberHeader], scope: "col" }, le()),
              we.map((a) => m.createElement(c.Weekday, { "aria-label": ge(a, o.options, o), className: l[r.Weekday], key: String(a), style: t == null ? void 0 : t[r.Weekday], scope: "col" }, me(a, o.options, o)))
            ),
            m.createElement(c.Weeks, { "data-animated-weeks": e.animate ? "true" : void 0, className: l[r.Weeks], style: t == null ? void 0 : t[r.Weeks] }, n.weeks.map((a) => m.createElement(
              c.Week,
              { className: l[r.Week], key: a.weekNumber, style: t == null ? void 0 : t[r.Week], week: a },
              z && m.createElement(c.WeekNumber, { week: a, style: t == null ? void 0 : t[r.WeekNumber], "aria-label": Me(a.weekNumber, {
                locale: ie
              }), className: l[r.WeekNumber], scope: "row", role: "rowheader" }, se(a.weekNumber, o)),
              a.days.map((d) => {
                const { date: u } = d, i = I(d);
                if (i[et.focused] = !i.hidden && !!(A != null && A.isEqualTo(d)), i[P.selected] = (M == null ? void 0 : M(u)) || i.selected, dt(x)) {
                  const { from: H, to: _ } = x;
                  i[P.range_start] = !!(H && _ && o.isSameDay(u, H)), i[P.range_end] = !!(H && _ && o.isSameDay(u, _)), i[P.range_middle] = it(x, u, !0, o);
                }
                const Te = ze(i, t, e.modifiersStyles), Re = He(i, l, e.modifiersClassNames), Ze = !oe && !i.hidden ? be(u, i, o.options, o) : void 0;
                return m.createElement(c.Day, { key: `${d.isoDate}_${d.displayMonthId}`, day: d, modifiers: i, className: Re.join(" "), style: Te, role: "gridcell", "aria-selected": i.selected || void 0, "aria-label": Ze, "data-day": d.isoDate, "data-month": d.outside ? d.dateMonthId : void 0, "data-selected": i.selected || void 0, "data-disabled": i.disabled || void 0, "data-hidden": i.hidden || void 0, "data-outside": d.outside || void 0, "data-focused": i.focused || void 0, "data-today": i.today || void 0 }, !i.hidden && oe ? m.createElement(c.DayButton, { className: l[r.DayButton], style: t == null ? void 0 : t[r.DayButton], type: "button", day: d, modifiers: i, disabled: !i.focused && i.disabled || void 0, "aria-disabled": i.focused && i.disabled || void 0, tabIndex: ue(d) ? 0 : -1, "aria-label": pe(u, i, o.options, o), onClick: We(d, i), onBlur: Ee(d, i), onFocus: Ce(d, i), onKeyDown: Oe(d, i), onMouseEnter: Be(d, i), onMouseLeave: Se(d, i) }, Q(u, o.options, o)) : !i.hidden && Q(d.date, o.options, o));
              })
            )))
          )
        ))
      ),
      e.footer && m.createElement(c.Footer, { className: l[r.Footer], style: t == null ? void 0 : t[r.Footer], role: "status", "aria-live": "polite" }, e.footer)
    )
  );
}
export {
  Lt as DayPicker
};
//# sourceMappingURL=index111.mjs.map
