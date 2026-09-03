import { jsxs as y, jsx as a } from "react/jsx-runtime";
import * as S from "react";
import { useState as c, useEffect as _ } from "react";
import { cn as b } from "../lib/utils.mjs";
import { NavMenu as E } from "./nav-menu.mjs";
const F = S.forwardRef(
  ({
    className: x,
    logo: i,
    collapsed: m,
    defaultCollapsed: u = !1,
    onCollapsedChange: s,
    collapseMode: r = "mini",
    showToggle: p = !0,
    footer: d,
    children: h,
    ...w
  }, v) => {
    const [k, N] = c(u), l = m !== void 0, e = l ? m : k, T = () => {
      const t = !e;
      l || N(t), s == null || s(t);
    }, o = r === "hidden" && e, n = !(e && r === "mini"), [j, f] = c(n);
    return _(() => {
      if (!n) {
        f(!1);
        return;
      }
      const t = setTimeout(() => f(!0), 300);
      return () => clearTimeout(t);
    }, [n]), /* @__PURE__ */ y(
      "div",
      {
        ref: v,
        className: b(
          "relative flex flex-col h-full pb-8 bg-white dark:bg-black",
          // top 보더 제거: 로고 하단 구분선이 헤더 border-b 와 픽셀 정확히 정렬되도록
          "border-r border-b border-l border-slate-100 dark:border-slate-700",
          "shadow-[1px_0px_41.3px_1px_rgba(0,0,0,0.05)] transition-all duration-300",
          // hidden 모드
          o && "w-0 -translate-x-full opacity-0 border-0 overflow-hidden",
          // mini 모드 또는 펼쳐진 상태.
          // 가로 패딩은 여기 두지 않는다 — 로고/메뉴/푸터가 각자 갖는다.
          // (여기에 두면 스크롤 컨테이너가 그만큼 좁아져 스크롤바가 사이드바 우측 끝에서
          //  안쪽으로 떠 보인다. 본부장님 지시 "스크롤바 경계 불분명" 건)
          !o && (e && r === "mini" ? "w-[88px] px-0 items-center" : "w-[210px] px-0"),
          x
        ),
        ...w,
        children: [
          /* @__PURE__ */ a(
            "div",
            {
              className: b(
                "h-16 mb-4 flex-shrink-0 w-full flex items-center overflow-hidden",
                "border-b border-slate-200 dark:border-slate-700",
                e && r === "mini" ? "justify-center" : "justify-start px-6"
              ),
              children: i == null ? void 0 : i(e && r === "mini")
            }
          ),
          /* @__PURE__ */ a(
            E,
            {
              className: "flex-1 min-h-0",
              collapsed: e && r === "mini",
              showToggle: p && r === "mini",
              scrollable: !0,
              onToggle: T,
              children: h
            }
          ),
          j && d && /* @__PURE__ */ a("div", { className: "flex-shrink-0 mt-4 mb-8 px-6", children: d })
        ]
      }
    );
  }
);
F.displayName = "Sidebar";
export {
  F as Sidebar
};
//# sourceMappingURL=sidebar.mjs.map
