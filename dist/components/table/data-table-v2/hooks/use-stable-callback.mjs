import * as r from "react";
function s(e) {
  const t = r.useRef(e);
  t.current = e;
  const n = r.useCallback(
    (...o) => {
      var a;
      return (a = t.current) == null ? void 0 : a.call(t, ...o);
    },
    []
  );
  return e ? n : void 0;
}
export {
  s as useStableCallback
};
//# sourceMappingURL=use-stable-callback.mjs.map
