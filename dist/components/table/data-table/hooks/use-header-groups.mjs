import * as l from "react";
import { getNumericColumnWidth as k } from "../utils.mjs";
function K({
  columnsToRender: i,
  headerGroups: s,
  getStickyStyles: g,
  getColumnWidth: y,
  resizable: m
}) {
  const f = l.useMemo(() => s ? new Set(s.flatMap((n) => n.columns)) : /* @__PURE__ */ new Set(), [s]), h = l.useMemo(() => {
    if (!s || s.length === 0) return /* @__PURE__ */ new Set();
    const n = /* @__PURE__ */ new Set(), t = (e) => s.findIndex((r) => r.columns.includes(e.accessorKey)), o = i.filter((e) => f.has(e.accessorKey));
    for (let e = 0; e < o.length - 1; e++) {
      const r = o[e], u = o[e + 1];
      t(r) !== t(u) && n.add(r.accessorKey);
    }
    return n;
  }, [s, i, f]), p = l.useCallback(
    (n) => i.filter((t) => n.columns.includes(t.accessorKey)).length,
    [i]
  ), C = l.useCallback(
    (n) => {
      const t = i.filter((c) => n.columns.includes(c.accessorKey));
      if (t.length === 0) return { style: {}, className: "" };
      const o = t.every((c) => c.sticky === "left"), e = t.every((c) => c.sticky === "right");
      if (!o && !e) return { style: {}, className: "" };
      const r = o ? t[0] : t[t.length - 1], u = g(r, !0), S = (c) => {
        const a = m ? y(c) : void 0;
        return a !== void 0 ? a : k(c);
      }, d = `${t.reduce((c, a) => c + S(a), 0)}px`;
      return {
        style: {
          ...u.style,
          width: d,
          minWidth: d,
          maxWidth: d
        },
        className: u.className
      };
    },
    [i, g, y, m]
  ), x = l.useMemo(() => {
    if (!s || s.length === 0) return [];
    const n = [], t = /* @__PURE__ */ new Set();
    for (const o of i) {
      const e = s.findIndex((r) => r.columns.includes(o.accessorKey));
      e !== -1 ? t.has(e) || (t.add(e), n.push({ type: "group", group: s[e] })) : n.push({ type: "standalone", col: o });
    }
    return n;
  }, [s, i]);
  return {
    groupedColumnsSet: f,
    columnsWithRightBorder: h,
    getHeaderGroupColSpan: p,
    getHeaderGroupStickyData: C,
    headerGroupItems: x
  };
}
export {
  K as useHeaderGroups
};
//# sourceMappingURL=use-header-groups.mjs.map
