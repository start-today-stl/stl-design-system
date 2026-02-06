import { useState as i } from "react";
import { calculateFocusTarget as v } from "./index328.mjs";
import { getNextFocus as x } from "./index329.mjs";
function I(u, o, a, r, F) {
  const { autoFocus: f } = u, [d, m] = i(), s = v(o.days, a, r || (() => !1), d), [t, n] = i(f ? s : void 0);
  return {
    isFocusTarget: (c) => !!(s != null && s.isEqualTo(c)),
    setFocused: n,
    focused: t,
    blur: () => {
      m(t), n(void 0);
    },
    moveFocus: (c, l) => {
      if (!t)
        return;
      const e = x(c, l, t, o.navStart, o.navEnd, u, F);
      e && (u.disableNavigation && !o.days.some((g) => g.isEqualTo(e)) || (o.goToDay(e), n(e)));
    }
  };
}
export {
  I as useFocus
};
//# sourceMappingURL=index229.mjs.map
