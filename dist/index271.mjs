import { constructFrom as s } from "./index338.mjs";
import { toDate as c } from "./index339.mjs";
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
//# sourceMappingURL=index271.mjs.map
