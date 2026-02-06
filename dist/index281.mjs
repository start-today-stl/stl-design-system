import { constructFrom as f } from "./index350.mjs";
import { toDate as c } from "./index351.mjs";
function i(a, t, e) {
  const r = c(a, e == null ? void 0 : e.in);
  return isNaN(t) ? f(a, NaN) : (t && r.setDate(r.getDate() + t), r);
}
export {
  i as addDays
};
//# sourceMappingURL=index281.mjs.map
