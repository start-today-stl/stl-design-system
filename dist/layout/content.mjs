import { jsx as a } from "react/jsx-runtime";
import * as n from "react";
import { cn as l } from "../lib/utils.mjs";
const m = n.forwardRef(
  ({ className: r, padded: t = !0, children: e, ...o }, f) => /* @__PURE__ */ a(
    "div",
    {
      ref: f,
      className: l(
        "h-full flex flex-col",
        t && "px-4 pt-2.5",
        // 스크롤 컨테이너의 padding-bottom 은 오버플로우 시 최하단에 안 나타난다.
        // flex-col 마지막에 shrink-0 ::after spacer 를 두면 실제 아이템으로
        // 계산돼 스크롤 최하단에도 여백이 보장된다.
        t && "after:content-[''] after:block after:h-4 after:shrink-0",
        r
      ),
      ...o,
      children: e
    }
  )
);
m.displayName = "Content";
export {
  m as Content
};
//# sourceMappingURL=content.mjs.map
