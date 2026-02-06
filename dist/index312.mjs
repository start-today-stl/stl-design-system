import { getDefaultOptions as v } from "./index356.mjs";
import { formatters as D } from "./index357.mjs";
import { longFormatters as C } from "./index358.mjs";
import { isProtectedWeekYearToken as S, isProtectedDayOfYearToken as R, warnOrThrowProtectedError as W } from "./index359.mjs";
import { isValid as x } from "./index360.mjs";
import { toDate as P } from "./index351.mjs";
import { enUS as Y } from "./index340.mjs";
const z = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, F = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, y = /^'([^]*?)'?$/, A = /''/g, L = /[a-zA-Z]/;
function U(t, c, e) {
  var i, k, s, u, d, g, h, w;
  const n = v(), l = (e == null ? void 0 : e.locale) ?? n.locale ?? Y, T = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((k = (i = e == null ? void 0 : e.locale) == null ? void 0 : i.options) == null ? void 0 : k.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((u = (s = n.locale) == null ? void 0 : s.options) == null ? void 0 : u.firstWeekContainsDate) ?? 1, O = (e == null ? void 0 : e.weekStartsOn) ?? ((g = (d = e == null ? void 0 : e.locale) == null ? void 0 : d.options) == null ? void 0 : g.weekStartsOn) ?? n.weekStartsOn ?? ((w = (h = n.locale) == null ? void 0 : h.options) == null ? void 0 : w.weekStartsOn) ?? 0, f = P(t, e == null ? void 0 : e.in);
  if (!x(f))
    throw new RangeError("Invalid time value");
  let m = c.match(F).map((a) => {
    const r = a[0];
    if (r === "p" || r === "P") {
      const o = C[r];
      return o(a, l.formatLong);
    }
    return a;
  }).join("").match(z).map((a) => {
    if (a === "''")
      return { isToken: !1, value: "'" };
    const r = a[0];
    if (r === "'")
      return { isToken: !1, value: $(a) };
    if (D[r])
      return { isToken: !0, value: a };
    if (r.match(L))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + r + "`"
      );
    return { isToken: !1, value: a };
  });
  l.localize.preprocessor && (m = l.localize.preprocessor(f, m));
  const E = {
    firstWeekContainsDate: T,
    weekStartsOn: O,
    locale: l
  };
  return m.map((a) => {
    if (!a.isToken) return a.value;
    const r = a.value;
    (!(e != null && e.useAdditionalWeekYearTokens) && S(r) || !(e != null && e.useAdditionalDayOfYearTokens) && R(r)) && W(r, c, String(t));
    const o = D[r[0]];
    return o(f, r, l.localize, E);
  }).join("");
}
function $(t) {
  const c = t.match(y);
  return c ? c[1].replace(A, "'") : t;
}
export {
  U as format,
  U as formatDate,
  D as formatters,
  C as longFormatters
};
//# sourceMappingURL=index312.mjs.map
