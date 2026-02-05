import { getBroadcastWeeksInMonth as n } from "./index330.mjs";
import { startOfBroadcastWeek as s } from "./index269.mjs";
function d(e, t) {
  const o = s(e, t), r = n(e, t);
  return t.addDays(o, r * 7 - 1);
}
export {
  d as endOfBroadcastWeek
};
//# sourceMappingURL=index268.mjs.map
