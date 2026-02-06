import { constructFrom as c } from "./index350.mjs";
import { toDate as m } from "./index351.mjs";
function l(n, t) {
  const e = m(n, t == null ? void 0 : t.in), o = e.getFullYear(), a = e.getMonth(), r = c(e, 0);
  return r.setFullYear(o, a + 1, 0), r.setHours(0, 0, 0, 0), r.getDate();
}
export {
  l as getDaysInMonth
};
//# sourceMappingURL=index362.mjs.map
