import { differenceInCalendarDays as e } from "./index280.mjs";
import { startOfYear as t } from "./index306.mjs";
import { toDate as d } from "./index350.mjs";
function y(a, r) {
  const f = d(a, r == null ? void 0 : r.in);
  return e(f, t(f)) + 1;
}
export {
  y as getDayOfYear
};
//# sourceMappingURL=index360.mjs.map
