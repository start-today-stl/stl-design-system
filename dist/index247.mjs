import { DateLib as P } from "./index213.mjs";
function o(a, t, e, n) {
  let l = (n ?? new P(e)).format(a, "PPPP");
  return t != null && t.today && (l = `Today, ${l}`), l;
}
export {
  o as labelGridcell
};
//# sourceMappingURL=index247.mjs.map
