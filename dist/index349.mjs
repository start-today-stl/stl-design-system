import { differenceInCalendarDays as e } from "./index274.mjs";
import { startOfYear as t } from "./index300.mjs";
import { toDate as d } from "./index339.mjs";
function y(a, r) {
  const f = d(a, r == null ? void 0 : r.in);
  return e(f, t(f)) + 1;
}
export {
  y as getDayOfYear
};
//# sourceMappingURL=index349.mjs.map
