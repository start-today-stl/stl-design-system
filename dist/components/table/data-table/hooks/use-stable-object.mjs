import * as l from "react";
function a(r) {
  const t = l.useRef(r);
  return r === t.current || y(r, t.current) ? t.current : (t.current = r, r);
}
function y(r, t) {
  if (r === t) return !0;
  if (!r || !t || typeof r != "object" || typeof t != "object") return !1;
  const s = r, f = t, c = Object.keys(s), i = Object.keys(f);
  if (c.length !== i.length) return !1;
  for (const u of c) {
    const e = s[u], n = f[u];
    if (e !== n) {
      if (Array.isArray(e) && Array.isArray(n)) {
        if (e.length !== n.length) return !1;
        for (let o = 0; o < e.length; o++)
          if (e[o] !== n[o]) return !1;
        continue;
      }
      return !1;
    }
  }
  return !0;
}
export {
  a as useStableObject
};
//# sourceMappingURL=use-stable-object.mjs.map
