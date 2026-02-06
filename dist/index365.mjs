import { getDefaultOptions as l } from "./index356.mjs";
import { constructFrom as n } from "./index350.mjs";
import { getWeekYear as u } from "./index366.mjs";
import { startOfWeek as D } from "./index310.mjs";
function g(r, e) {
  var f, c, s, k;
  const a = l(), m = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((c = (f = e == null ? void 0 : e.locale) == null ? void 0 : f.options) == null ? void 0 : c.firstWeekContainsDate) ?? a.firstWeekContainsDate ?? ((k = (s = a.locale) == null ? void 0 : s.options) == null ? void 0 : k.firstWeekContainsDate) ?? 1, W = u(r, e), t = n((e == null ? void 0 : e.in) || r, 0);
  return t.setFullYear(W, 0, m), t.setHours(0, 0, 0, 0), D(t, e);
}
export {
  g as startOfWeekYear
};
//# sourceMappingURL=index365.mjs.map
