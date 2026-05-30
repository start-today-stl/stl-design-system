import * as u from "react";
import { useVirtualizer as T } from "@tanstack/react-virtual";
const z = 5, H = 40;
function A({
  virtual: t,
  disabledReason: i,
  count: a,
  scrollContainerRef: f,
  shouldWarn: c
}) {
  const e = u.useMemo(() => t === !0 ? {} : t && typeof t == "object" ? t : null, [t]), l = u.useRef(!1);
  u.useEffect(() => {
    if (c) {
      if (e === null) {
        l.current = !1;
        return;
      }
      if (!i) {
        l.current = !1;
        return;
      }
      l.current || (l.current = !0, console.warn(
        `[DataTable] virtual 옵션이 활성화되었으나 ${i} 와(과) 동시 사용 불가하여 가상화가 비활성화됩니다.`
      ));
    }
  }, [e, i, c]);
  const r = e !== null && i === null, o = (e == null ? void 0 : e.overscan) ?? z, m = (e == null ? void 0 : e.estimateSize) ?? H, E = T({
    count: r ? a : 0,
    getScrollElement: () => f.current,
    estimateSize: () => m,
    overscan: o
  }), n = u.useRef(!1);
  return u.useEffect(() => {
    if (!c || !r) {
      n.current = !1;
      return;
    }
    if (n.current) return;
    const s = f.current;
    if (!s) return;
    const w = window.requestAnimationFrame(() => {
      if (n.current) return;
      const S = s.scrollHeight > s.clientHeight + 1;
      s.clientHeight > 0 ? !S && a > 30 && (n.current = !0, console.warn(
        "[DataTable] virtual 활성화되었으나 스크롤이 발생하지 않습니다. 데이터 행 수에 비해 컨테이너 높이가 충분히 작은지 확인해주세요 (maxHeight 등)."
      )) : (n.current = !0, console.warn(
        "[DataTable] virtual 활성화되었으나 스크롤 컨테이너의 높이가 0입니다. maxHeight prop 또는 부모 flex 레이아웃으로 높이 제약을 지정해주세요."
      ));
    });
    return () => window.cancelAnimationFrame(w);
  }, [r, a, f, c]), {
    isVirtual: r,
    virtualizer: r ? E : null
  };
}
export {
  A as useTableVirtualizer
};
//# sourceMappingURL=use-table-virtualizer.mjs.map
