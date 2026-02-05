import { millisecondsInWeek as m } from "./index351.mjs";
import { startOfWeek as a } from "./index305.mjs";
import { startOfWeekYear as c } from "./index364.mjs";
import { toDate as d } from "./index350.mjs";
function o(t, e) {
  const r = d(t, e == null ? void 0 : e.in), f = +a(r, e) - +c(r, e);
  return Math.round(f / m) + 1;
}
export {
  o as getWeek
};
//# sourceMappingURL=index291.mjs.map
