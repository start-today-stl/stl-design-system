import { getTimezoneOffsetInMilliseconds as a } from "./index341.mjs";
import { normalizeDates as c } from "./index342.mjs";
import { millisecondsInDay as D } from "./index340.mjs";
import { startOfDay as m } from "./index296.mjs";
function u(n, i, e) {
  const [f, l] = c(
    e == null ? void 0 : e.in,
    n,
    i
  ), r = m(f), t = m(l), o = +r - a(r), s = +t - a(t);
  return Math.round((o - s) / D);
}
export {
  u as differenceInCalendarDays
};
//# sourceMappingURL=index274.mjs.map
