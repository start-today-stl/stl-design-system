import { defaultDateLib as o } from "./index216.mjs";
function a(r, t = o) {
  return r < 10 ? t.formatNumber(`0${r.toLocaleString()}`) : t.formatNumber(`${r.toLocaleString()}`);
}
export {
  a as formatWeekNumber
};
//# sourceMappingURL=index244.mjs.map
