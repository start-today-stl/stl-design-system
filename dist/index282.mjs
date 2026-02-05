import { millisecondsInWeek as m } from "./index340.mjs";
import { startOfISOWeek as o } from "./index297.mjs";
import { startOfISOWeekYear as a } from "./index351.mjs";
import { toDate as i } from "./index339.mjs";
function k(t, e) {
  const r = i(t, e == null ? void 0 : e.in), f = +o(r) - +a(r);
  return Math.round(f / m) + 1;
}
export {
  k as getISOWeek
};
//# sourceMappingURL=index282.mjs.map
