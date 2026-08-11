import { jsx as m } from "react/jsx-runtime";
import * as a from "react";
import { cn as l } from "../lib/utils.mjs";
const n = a.forwardRef(
  ({ className: t, padded: o = !0, children: r, ...e }, f) => /* @__PURE__ */ m(
    "div",
    {
      ref: f,
      className: l(
        "h-full flex flex-col",
        // 하단 여백은 AppShell main(스크롤 컨테이너)에 위치시켜
        // 스크롤 오버플로우 페이지에서도 스크롤 최하단에 여백이 유지되도록 함
        o && "px-4 pt-2.5",
        t
      ),
      ...e,
      children: r
    }
  )
);
n.displayName = "Content";
export {
  n as Content
};
//# sourceMappingURL=content.mjs.map
