import * as a from "react";
import { getNumericColumnWidth as v } from "../utils.mjs";
function $({
  columns: S,
  columnsToRender: l,
  headerGroups: s,
  getStickyStyles: p,
  getColumnWidth: x,
  resizable: C,
  shouldWarn: M
}) {
  const f = a.useMemo(() => {
    if (!s || s.length === 0) return [];
    const e = new Map(
      S.map((t) => [t.accessorKey, t])
    );
    return s.flatMap((t, i) => {
      const n = t.columns.map((c) => e.get(c)).filter((c) => c !== void 0);
      if (n.length === 0) return [];
      const o = new Set(
        n.map((c) => c.sticky).filter((c) => c !== void 0)
      ), u = o.size > 0, k = n.some((c) => !c.sticky), h = o.size > 1;
      return u && (k || h) ? [
        {
          headerLabel: typeof t.header == "string" || typeof t.header == "number" ? String(t.header) : `#${i + 1}`,
          reason: h ? "left/right sticky 혼합" : "sticky/non-sticky 혼합"
        }
      ] : [];
    });
  }, [s, S]), y = a.useMemo(
    () => f.map((e) => `${e.headerLabel}:${e.reason}`).join("|"),
    [f]
  ), d = a.useRef("");
  a.useEffect(() => {
    if (!M) return;
    if (!y) {
      d.current = "";
      return;
    }
    if (d.current === y) return;
    d.current = y;
    const e = f.map((t) => `${t.headerLabel}(${t.reason})`).join(", ");
    console.warn(
      "[DataTable] headerGroups 내 sticky 구성이 혼합되어 해당 그룹의 1행 그룹 헤더는 sticky가 적용되지 않습니다. 그룹별로 sticky 방향을 통일하세요. 대상 그룹: " + e
    );
  }, [y, f, M]);
  const g = a.useMemo(() => s ? new Set(s.flatMap((e) => e.columns)) : /* @__PURE__ */ new Set(), [s]), w = a.useMemo(() => {
    if (!s || s.length === 0) return /* @__PURE__ */ new Set();
    const e = /* @__PURE__ */ new Set(), t = (n) => s.findIndex((o) => o.columns.includes(n.accessorKey)), i = l.filter((n) => g.has(n.accessorKey));
    for (let n = 0; n < i.length - 1; n++) {
      const o = i[n], u = i[n + 1];
      t(o) !== t(u) && e.add(o.accessorKey);
    }
    return e;
  }, [s, l, g]), K = a.useCallback(
    (e) => l.filter((t) => e.columns.includes(t.accessorKey)).length,
    [l]
  ), b = a.useCallback(
    (e) => {
      const t = l.filter((r) => e.columns.includes(r.accessorKey));
      if (t.length === 0) return { style: {}, className: "" };
      const i = t.every((r) => r.sticky === "left"), n = t.every((r) => r.sticky === "right");
      if (!i && !n) return { style: {}, className: "" };
      const o = i ? t[0] : t[t.length - 1], u = p(o, !0), k = (r) => {
        const c = C ? x(r) : void 0;
        return c !== void 0 ? c : v(r);
      }, m = `${t.reduce((r, c) => r + k(c), 0)}px`;
      return {
        style: {
          ...u.style,
          width: m,
          minWidth: m,
          maxWidth: m
        },
        className: u.className
      };
    },
    [l, p, x, C]
  ), W = a.useMemo(() => {
    if (!s || s.length === 0) return [];
    const e = [], t = /* @__PURE__ */ new Set();
    for (const i of l) {
      const n = s.findIndex((o) => o.columns.includes(i.accessorKey));
      n !== -1 ? t.has(n) || (t.add(n), e.push({ type: "group", group: s[n] })) : e.push({ type: "standalone", col: i });
    }
    return e;
  }, [s, l]);
  return {
    groupedColumnsSet: g,
    columnsWithRightBorder: w,
    getHeaderGroupColSpan: K,
    getHeaderGroupStickyData: b,
    headerGroupItems: W
  };
}
export {
  $ as useHeaderGroups
};
//# sourceMappingURL=use-header-groups.mjs.map
