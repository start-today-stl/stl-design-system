import { constructFrom as f } from "./index349.mjs";
import { toDate as c } from "./index350.mjs";
function i(a, t, e) {
  const r = c(a, e == null ? void 0 : e.in);
  return isNaN(t) ? f(a, NaN) : (t && r.setDate(r.getDate() + t), r);
}
export {
  i as addDays
};
//# sourceMappingURL=index276.mjs.map
