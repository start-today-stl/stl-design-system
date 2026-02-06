import { millisecondsInWeek as m } from "./index352.mjs";
import { startOfISOWeek as o } from "./index308.mjs";
import { startOfISOWeekYear as a } from "./index363.mjs";
import { toDate as i } from "./index351.mjs";
function k(t, e) {
  const r = i(t, e == null ? void 0 : e.in), f = +o(r) - +a(r);
  return Math.round(f / m) + 1;
}
export {
  k as getISOWeek
};
//# sourceMappingURL=index293.mjs.map
