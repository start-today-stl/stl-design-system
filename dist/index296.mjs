import { millisecondsInWeek as m } from "./index352.mjs";
import { startOfWeek as a } from "./index310.mjs";
import { startOfWeekYear as c } from "./index365.mjs";
import { toDate as d } from "./index351.mjs";
function o(t, e) {
  const r = d(t, e == null ? void 0 : e.in), f = +a(r, e) - +c(r, e);
  return Math.round(f / m) + 1;
}
export {
  o as getWeek
};
//# sourceMappingURL=index296.mjs.map
