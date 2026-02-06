import { constructFrom as f } from "./index350.mjs";
import { startOfISOWeek as u } from "./index308.mjs";
import { toDate as c } from "./index351.mjs";
function Y(o, r) {
  const e = c(o, r == null ? void 0 : r.in), t = e.getFullYear(), a = f(e, 0);
  a.setFullYear(t + 1, 0, 4), a.setHours(0, 0, 0, 0);
  const m = u(a), s = f(e, 0);
  s.setFullYear(t, 0, 4), s.setHours(0, 0, 0, 0);
  const n = u(s);
  return e.getTime() >= m.getTime() ? t + 1 : e.getTime() >= n.getTime() ? t : t - 1;
}
export {
  Y as getISOWeekYear
};
//# sourceMappingURL=index364.mjs.map
