import { constructFrom as f } from "./index338.mjs";
import { getISOWeekYear as s } from "./index352.mjs";
import { startOfISOWeek as a } from "./index297.mjs";
function O(t, e) {
  const o = s(t, e), r = f(t, 0);
  return r.setFullYear(o, 0, 4), r.setHours(0, 0, 0, 0), a(r);
}
export {
  O as startOfISOWeekYear
};
//# sourceMappingURL=index351.mjs.map
