import { UI as u } from "./index228.mjs";
function p(o, r = {}, n = {}) {
  let t = { ...r == null ? void 0 : r[u.Day] };
  return Object.entries(o).filter(([, c]) => c === !0).forEach(([c]) => {
    t = {
      ...t,
      ...n == null ? void 0 : n[c]
    };
  }), t;
}
export {
  p as getStyleForModifiers
};
//# sourceMappingURL=index224.mjs.map
