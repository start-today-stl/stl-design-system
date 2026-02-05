import { defaultDateLib as f } from "./index217.mjs";
function y(t, r, e = f) {
  const n = Array.isArray(r) ? r : [r];
  let a = t.from;
  const i = e.differenceInCalendarDays(t.to, t.from), s = Math.min(i, 6);
  for (let o = 0; o <= s; o++) {
    if (n.includes(a.getDay()))
      return !0;
    a = e.addDays(a, 1);
  }
  return !1;
}
export {
  y as rangeContainsDayOfWeek
};
//# sourceMappingURL=index315.mjs.map
