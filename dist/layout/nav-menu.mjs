import { jsx as a, jsxs as u } from "react/jsx-runtime";
import * as r from "react";
import { cn as n } from "../lib/utils.mjs";
import { LeftIcon as p } from "../icons/LeftIcon.mjs";
import { RightIcon as b } from "../icons/RightIcon.mjs";
const d = r.forwardRef(
  ({ className: l, layout: i = "vertical", collapsed: t, showToggle: f = !1, scrollable: x = !1, onToggle: c, children: o, ...s }, m) => i === "horizontal" ? /* @__PURE__ */ a(
    "nav",
    {
      ref: m,
      className: n(
        "flex items-center gap-1",
        l
      ),
      ...s,
      children: r.Children.map(o, (e) => r.isValidElement(e) ? r.cloneElement(e, {
        layout: i
      }) : e)
    }
  ) : /* @__PURE__ */ u(
    "nav",
    {
      ref: m,
      className: n(
        "relative flex flex-col min-h-0 transition-all duration-300",
        t ? "w-[88px] items-center" : "w-full",
        l
      ),
      ...s,
      children: [
        f && /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            onClick: c,
            className: n(
              "absolute flex items-center justify-center z-20",
              "w-8 h-8 rounded-[20px] border border-slate-100 dark:border-slate-700",
              "bg-white dark:bg-black hover:bg-slate-50 dark:hover:bg-slate-800",
              "transition-all duration-300 cursor-pointer",
              // 사이드바 가로 패딩이 스크롤 영역 안쪽으로 옮겨져서 nav 가 사이드바 전체 폭을
              // 쓰므로, 접힘/펼침 모두 동일한 offset 으로 사이드바 경계에 걸친다.
              // top: 버튼 중심을 로고/헤더 하단 보더(y=64px) 위에 정렬 (nav-menu 시작 y=80 기준 -32).
              "top-[-32px] -right-4"
            ),
            "aria-label": t ? "메뉴 펼치기" : "메뉴 접기",
            children: t ? /* @__PURE__ */ a(b, { size: 24, className: "text-slate-500" }) : /* @__PURE__ */ a(p, { size: 24, className: "text-slate-500" })
          }
        ),
        /* @__PURE__ */ a(
          "div",
          {
            className: n(
              "flex flex-col",
              t ? "items-center gap-0.5 w-full px-2 overflow-visible" : "gap-0.5 px-6 pb-4",
              x && !t && "sidebar-scroll flex-1 min-h-0 overflow-y-auto overflow-x-hidden"
            ),
            children: r.Children.map(o, (e) => r.isValidElement(e) && typeof e.type != "string" ? r.cloneElement(e, {
              collapsed: t,
              layout: i
            }) : e)
          }
        )
      ]
    }
  )
);
d.displayName = "NavMenu";
export {
  d as NavMenu
};
//# sourceMappingURL=nav-menu.mjs.map
