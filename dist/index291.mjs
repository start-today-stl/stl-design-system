import { normalizeDates as m } from "./index342.mjs";
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
//# sourceMappingURL=index291.mjs.map
