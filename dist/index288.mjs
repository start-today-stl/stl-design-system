import { millisecondsInWeek as m } from "./index351.mjs";
import { startOfISOWeek as o } from "./index303.mjs";
import { startOfISOWeekYear as a } from "./index362.mjs";
import { toDate as i } from "./index350.mjs";
function k(t, e) {
  const r = i(t, e == null ? void 0 : e.in), f = +o(r) - +a(r);
  return Math.round(f / m) + 1;
}
export {
  k as getISOWeek
};
//# sourceMappingURL=index288.mjs.map
