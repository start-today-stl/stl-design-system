import { useControlledValue as x } from "./index327.mjs";
import { rangeIncludesDate as y } from "./index235.mjs";
import { addToRange as C } from "./index310.mjs";
import { rangeContainsModifiers as q } from "./index313.mjs";
function h(l, d) {
  const { disabled: i, excludeDisabled: c, selected: s, required: f, onSelect: o } = l, [r, m] = x(s, o ? s : void 0), t = o ? s : r;
  return {
    selected: t,
    select: (n, u, a) => {
      const { min: S, max: p } = l, e = n ? C(n, t, S, p, f, d) : void 0;
      return c && i && (e != null && e.from) && e.to && q({ from: e.from, to: e.to }, i, d) && (e.from = n, e.to = void 0), o || m(e), o == null || o(e, n, u, a), e;
    },
    isSelected: (n) => t && y(t, n, !1, d)
  };
}
export {
  h as useRange
};
//# sourceMappingURL=index331.mjs.map
