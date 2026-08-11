import { jsx as f } from "react/jsx-runtime";
import * as n from "react";
import { cn as p } from "../lib/utils.mjs";
const a = n.forwardRef(
  ({ className: t, padded: o = !0, children: r, ...e }, m) => /* @__PURE__ */ f(
    "div",
    {
      ref: m,
      className: p(
        // min-h-full: 컨텐츠가 짧으면 스크롤 컨테이너(main) 만큼 채우고,
        //             길면 자식 크기에 따라 자연스레 늘어남 → 오버플로우 스크롤 시 pb-4 가 실제 자리를 차지해 최하단 여백 보존
        "min-h-full flex flex-col",
        o && "px-4 pt-2.5 pb-4",
        t
      ),
      ...e,
      children: r
    }
  )
);
a.displayName = "Content";
export {
  a as Content
};
//# sourceMappingURL=content.mjs.map
