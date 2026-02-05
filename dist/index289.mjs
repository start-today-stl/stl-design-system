import { normalizeDates as i } from "./index342.mjs";
import { startOfDay as t } from "./index296.mjs";
function d(a, e, r) {
  const [m, f] = i(
    r == null ? void 0 : r.in,
    a,
    e
  );
  return +t(m) == +t(f);
}
export {
  d as isSameDay
};
//# sourceMappingURL=index289.mjs.map
