import { defaultDateLib as o } from "./index213.mjs";
function a(r, t = o) {
  return r < 10 ? t.formatNumber(`0${r.toLocaleString()}`) : t.formatNumber(`${r.toLocaleString()}`);
}
export {
  a as formatWeekNumber
};
//# sourceMappingURL=index241.mjs.map
