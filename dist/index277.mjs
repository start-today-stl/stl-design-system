import { constructFrom as s } from "./index349.mjs";
import { toDate as c } from "./index350.mjs";
function g(r, n, o) {
  const t = c(r, o == null ? void 0 : o.in);
  if (isNaN(n)) return s(r, NaN);
  if (!n)
    return t;
  const f = t.getDate(), e = s(r, t.getTime());
  e.setMonth(t.getMonth() + n + 1, 0);
  const a = e.getDate();
  return f >= a ? e : (t.setFullYear(
    e.getFullYear(),
    e.getMonth(),
    f
  ), t);
}
export {
  g as addMonths
};
//# sourceMappingURL=index277.mjs.map
