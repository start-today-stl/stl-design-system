import * as i from "react";
import { useVirtualizer as w } from "@tanstack/react-virtual";
const S = 5, T = 40;
function p({
  virtual: r,
  disabledReason: c,
  count: a,
  scrollContainerRef: o,
  shouldWarn: l
}) {
  const e = i.useMemo(() => r === !0 ? {} : r && typeof r == "object" ? r : null, [r]), s = i.useRef(!1);
  i.useEffect(() => {
    if (l) {
      if (e === null) {
        s.current = !1;
        return;
      }
      if (!c) {
        s.current = !1;
        return;
      }
      s.current || (s.current = !0, console.warn(
        `[DataTable] virtual 옵션이 활성화되었으나 ${c} 와(과) 동시 사용 불가하여 가상화가 비활성화됩니다.`
      ));
    }
  }, [e, c, l]);
  const n = e !== null && c === null, m = (e == null ? void 0 : e.overscan) ?? S, E = (e == null ? void 0 : e.estimateSize) ?? T, h = w({
    count: n ? a : 0,
    getScrollElement: () => o.current,
    estimateSize: () => E,
    overscan: m,
    // 행 높이를 정수 픽셀로 라운딩 — sub-pixel 누적 오차 감소
    // (sticky 셀 border 깜빡임은 별개의 브라우저 한계로 완전 해결 불가하나
    //  Table wrapper bg 매칭으로 시각적으로 안 보이게 처리됨)
    measureElement: (t) => {
      const f = t.getBoundingClientRect();
      return Math.round(f.height);
    }
  }), u = i.useRef(!1);
  return i.useEffect(() => {
    if (!l || !n) {
      u.current = !1;
      return;
    }
    if (u.current) return;
    const t = o.current;
    if (!t) return;
    const f = window.requestAnimationFrame(() => {
      if (u.current) return;
      const g = t.scrollHeight > t.clientHeight + 1;
      t.clientHeight > 0 ? !g && a > 30 && (u.current = !0, console.warn(
        "[DataTable] virtual 활성화되었으나 스크롤이 발생하지 않습니다. 데이터 행 수에 비해 컨테이너 높이가 충분히 작은지 확인해주세요 (maxHeight 등)."
      )) : (u.current = !0, console.warn(
        "[DataTable] virtual 활성화되었으나 스크롤 컨테이너의 높이가 0입니다. maxHeight prop 또는 부모 flex 레이아웃으로 높이 제약을 지정해주세요."
      ));
    });
    return () => window.cancelAnimationFrame(f);
  }, [n, a, o, l]), {
    isVirtual: n,
    virtualizer: n ? h : null
  };
}
export {
  p as useTableVirtualizer
};
//# sourceMappingURL=use-table-virtualizer.mjs.map
