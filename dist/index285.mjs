import { getTimezoneOffsetInMilliseconds as a } from "./index353.mjs";
import { normalizeDates as c } from "./index354.mjs";
import { millisecondsInDay as D } from "./index352.mjs";
import { startOfDay as m } from "./index307.mjs";
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
//# sourceMappingURL=index285.mjs.map
