import { constructFrom as m } from "./index338.mjs";
import { toDate as u } from "./index339.mjs";
function N(e, a, r) {
  const t = u(e, r == null ? void 0 : r.in);
  return isNaN(+t) ? m(e, NaN) : (t.setFullYear(a), t);
}
export {
  N as setYear
};
//# sourceMappingURL=index295.mjs.map
