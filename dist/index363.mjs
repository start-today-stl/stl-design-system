import { constructFrom as f } from "./index350.mjs";
import { getISOWeekYear as s } from "./index364.mjs";
import { startOfISOWeek as a } from "./index308.mjs";
function O(t, e) {
  const o = s(t, e), r = f(t, 0);
  return r.setFullYear(o, 0, 4), r.setHours(0, 0, 0, 0), a(r);
}
export {
  O as startOfISOWeekYear
};
//# sourceMappingURL=index363.mjs.map
