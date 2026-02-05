import { useEffect as N, useMemo as w } from "react";
import { getDates as S } from "./index303.mjs";
import { getDays as b } from "./index304.mjs";
import { getDisplayMonths as q } from "./index305.mjs";
import { getInitialMonth as g } from "./index306.mjs";
import { getMonths as E } from "./index307.mjs";
import { getNavMonths as F } from "./index308.mjs";
import { getNextMonth as P } from "./index309.mjs";
import { getPreviousMonth as V } from "./index310.mjs";
import { getWeeks as Z } from "./index311.mjs";
import { useControlledValue as j } from "./index312.mjs";
function $(e, o) {
  var l;
  const [s, t] = F(e, o), { startOfMonth: a, endOfMonth: u } = o, h = g(e, s, t, o), [r, M] = j(
    h,
    // initialMonth is always computed from props.month if provided
    e.month ? h : void 0
  );
  N(() => {
    const n = g(e, s, t, o);
    M(n);
  }, [e.timeZone]);
  const { months: k, weeks: c, days: W, previousMonth: O, nextMonth: x } = w(() => {
    const n = q(r, t, { numberOfMonths: e.numberOfMonths }, o), i = S(n, e.endMonth ? u(e.endMonth) : void 0, {
      ISOWeek: e.ISOWeek,
      fixedWeeks: e.fixedWeeks,
      broadcastCalendar: e.broadcastCalendar
    }, o), m = E(n, i, {
      broadcastCalendar: e.broadcastCalendar,
      fixedWeeks: e.fixedWeeks,
      ISOWeek: e.ISOWeek,
      reverseMonths: e.reverseMonths
    }, o), I = Z(m), T = b(m), C = V(r, s, e, o), D = P(r, t, e, o);
    return {
      months: m,
      weeks: I,
      days: T,
      previousMonth: C,
      nextMonth: D
    };
  }, [
    o,
    r.getTime(),
    t == null ? void 0 : t.getTime(),
    s == null ? void 0 : s.getTime(),
    e.disableNavigation,
    e.broadcastCalendar,
    (l = e.endMonth) == null ? void 0 : l.getTime(),
    e.fixedWeeks,
    e.ISOWeek,
    e.numberOfMonths,
    e.pagedNavigation,
    e.reverseMonths
  ]), { disableNavigation: v, onMonthChange: f } = e, y = (n) => c.some((i) => i.days.some((m) => m.isEqualTo(n))), d = (n) => {
    if (v)
      return;
    let i = a(n);
    s && i < a(s) && (i = a(s)), t && i > a(t) && (i = a(t)), M(i), f == null || f(i);
  };
  return {
    months: k,
    weeks: c,
    days: W,
    navStart: s,
    navEnd: t,
    previousMonth: O,
    nextMonth: x,
    goToMonth: d,
    goToDay: (n) => {
      y(n) || d(n.date);
    }
  };
}
export {
  $ as useCalendar
};
//# sourceMappingURL=index223.mjs.map
