import { constructFrom as m } from "./index338.mjs";
import { getDaysInMonth as u } from "./index350.mjs";
import { toDate as M } from "./index339.mjs";
function y(n, o, r) {
  const t = M(n, r == null ? void 0 : r.in), a = t.getFullYear(), s = t.getDate(), e = m(n, 0);
  e.setFullYear(a, o, 15), e.setHours(0, 0, 0, 0);
  const c = u(e);
  return t.setMonth(o, Math.min(s, c)), t;
}
export {
  y as setMonth
};
//# sourceMappingURL=index294.mjs.map
