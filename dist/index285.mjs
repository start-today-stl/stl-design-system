import { millisecondsInWeek as m } from "./index340.mjs";
import { startOfWeek as a } from "./index299.mjs";
import { startOfWeekYear as c } from "./index353.mjs";
import { toDate as d } from "./index339.mjs";
function o(t, e) {
  const r = d(t, e == null ? void 0 : e.in), f = +a(r, e) - +c(r, e);
  return Math.round(f / m) + 1;
}
export {
  o as getWeek
};
//# sourceMappingURL=index285.mjs.map
