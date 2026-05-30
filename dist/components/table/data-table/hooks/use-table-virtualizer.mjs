import * as c from "react";
import { useVirtualizer as m } from "@tanstack/react-virtual";
const E = 5, z = 40;
function T({
  virtual: r,
  disabledReason: t,
  count: s,
  scrollContainerRef: i,
  shouldWarn: l
}) {
  const e = c.useMemo(() => r === !0 ? {} : r && typeof r == "object" ? r : null, [r]), n = c.useRef(!1);
  c.useEffect(() => {
    if (l) {
      if (e === null) {
        n.current = !1;
        return;
      }
      if (!t) {
        n.current = !1;
        return;
      }
      n.current || (n.current = !0, console.warn(
        `[DataTable] virtual 옵션이 활성화되었으나 ${t} 와(과) 동시 사용 불가하여 가상화가 비활성화됩니다.`
      ));
    }
  }, [e, t, l]);
  const u = e !== null && t === null, o = (e == null ? void 0 : e.overscan) ?? E, f = (e == null ? void 0 : e.estimateSize) ?? z, a = m({
    count: u ? s : 0,
    getScrollElement: () => i.current,
    estimateSize: () => f,
    overscan: o
  });
  return {
    isVirtual: u,
    virtualizer: u ? a : null
  };
}
export {
  T as useTableVirtualizer
};
//# sourceMappingURL=use-table-virtualizer.mjs.map
