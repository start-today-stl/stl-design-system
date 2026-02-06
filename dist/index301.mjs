import { normalizeDates as n } from "./index354.mjs";
function m(a, l, e) {
  const [t, r] = n(
    e == null ? void 0 : e.in,
    a,
    l
  );
  return t.getFullYear() === r.getFullYear() && t.getMonth() === r.getMonth();
}
export {
  m as isSameMonth
};
//# sourceMappingURL=index301.mjs.map
