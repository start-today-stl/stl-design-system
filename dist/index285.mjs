import { toDate as u } from "./index350.mjs";
function l(r, e) {
  const t = u(r, e == null ? void 0 : e.in), n = t.getMonth();
  return t.setFullYear(t.getFullYear(), n + 1, 0), t.setHours(23, 59, 59, 999), t;
}
export {
  l as endOfMonth
};
//# sourceMappingURL=index285.mjs.map
