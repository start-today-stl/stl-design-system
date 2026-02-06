import { getBroadcastWeeksInMonth as n } from "./index339.mjs";
import { startOfBroadcastWeek as s } from "./index280.mjs";
function d(e, t) {
  const o = s(e, t), r = n(e, t);
  return t.addDays(o, r * 7 - 1);
}
export {
  d as endOfBroadcastWeek
};
//# sourceMappingURL=index279.mjs.map
