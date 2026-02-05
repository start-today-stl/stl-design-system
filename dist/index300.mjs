import { normalizeDates as i } from "./index353.mjs";
import { startOfDay as t } from "./index307.mjs";
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
//# sourceMappingURL=index300.mjs.map
