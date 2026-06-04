import * as m from "react";
import { useVirtualizer as E } from "@tanstack/react-virtual";
const z = 5, S = 40;
function p({
  virtual: t,
  disabledReason: n,
  count: o,
  scrollContainerRef: u
}) {
  const e = m.useMemo(() => t === !0 ? {} : t && typeof t == "object" ? t : null, [t]), r = e !== null && n === null, s = (e == null ? void 0 : e.overscan) ?? z, i = (e == null ? void 0 : e.estimateSize) ?? S, c = E({
    count: r ? o : 0,
    getScrollElement: () => u.current,
    estimateSize: () => i,
    overscan: s,
    // 행 높이를 정수 픽셀로 라운딩 — sub-pixel 누적 오차 감소
    measureElement: (l) => {
      const a = l.getBoundingClientRect();
      return Math.round(a.height);
    }
  });
  return {
    isVirtual: r,
    virtualizer: r ? c : null
  };
}
export {
  p as useTableVirtualizer
};
//# sourceMappingURL=use-table-virtualizer.mjs.map
