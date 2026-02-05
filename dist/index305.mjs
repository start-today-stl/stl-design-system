import { constructFrom as m } from "./index349.mjs";
import { getDaysInMonth as u } from "./index361.mjs";
import { toDate as M } from "./index350.mjs";
function y(n, o, r) {
  const t = M(n, r == null ? void 0 : r.in), a = t.getFullYear(), s = t.getDate(), e = m(n, 0);
  e.setFullYear(a, o, 15), e.setHours(0, 0, 0, 0);
  const c = u(e);
  return t.setMonth(o, Math.min(s, c)), t;
}
export {
  y as setMonth
};
//# sourceMappingURL=index305.mjs.map
