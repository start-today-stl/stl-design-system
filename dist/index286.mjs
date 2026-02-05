import { normalizeDates as c } from "./index353.mjs";
function g(a, n, e) {
  const [t, r] = c(
    e == null ? void 0 : e.in,
    a,
    n
  ), f = t.getFullYear() - r.getFullYear(), l = t.getMonth() - r.getMonth();
  return f * 12 + l;
}
export {
  g as differenceInCalendarMonths
};
//# sourceMappingURL=index286.mjs.map
