import { normalizeDates as m } from "./index354.mjs";
function D(r, a, e) {
  const [l, t] = m(
    e == null ? void 0 : e.in,
    r,
    a
  );
  return l.getFullYear() === t.getFullYear();
}
export {
  D as isSameYear
};
//# sourceMappingURL=index302.mjs.map
