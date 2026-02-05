import { normalizeInterval as h } from "./index354.mjs";
import { constructFrom as l } from "./index349.mjs";
function f(a, r) {
  const { start: t, end: n } = h(r == null ? void 0 : r.in, a);
  let s = +t > +n;
  const c = s ? +t : +n, e = s ? n : t;
  e.setHours(0, 0, 0, 0), e.setDate(1);
  let m = 1;
  const o = [];
  for (; +e <= c; )
    o.push(l(t, e)), e.setMonth(e.getMonth() + m);
  return s ? o.reverse() : o;
}
export {
  f as eachMonthOfInterval
};
//# sourceMappingURL=index287.mjs.map
