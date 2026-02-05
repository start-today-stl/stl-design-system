import { constructFrom as m } from "./index349.mjs";
import { toDate as l } from "./index350.mjs";
function a(o, e) {
  let t, r = e == null ? void 0 : e.in;
  return o.forEach((c) => {
    !r && typeof c == "object" && (r = m.bind(null, c));
    const f = l(c, r);
    (!t || t < f || isNaN(+f)) && (t = f);
  }), m(r, t || NaN);
}
export {
  a as max
};
//# sourceMappingURL=index303.mjs.map
