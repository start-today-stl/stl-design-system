import { constructFrom as m } from "./index350.mjs";
import { toDate as o } from "./index351.mjs";
function u(n, e) {
  let t, r = e == null ? void 0 : e.in;
  return n.forEach((c) => {
    !r && typeof c == "object" && (r = m.bind(null, c));
    const f = o(c, r);
    (!t || t > f || isNaN(+f)) && (t = f);
  }), m(r, t || NaN);
}
export {
  u as min
};
//# sourceMappingURL=index304.mjs.map
