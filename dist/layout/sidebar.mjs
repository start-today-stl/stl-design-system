import { jsxs as j, jsx as a } from "react/jsx-runtime";
import * as y from "react";
import { useState as f, useEffect as S } from "react";
import { cn as x } from "../lib/utils.mjs";
import { NavMenu as E } from "./nav-menu.mjs";
const F = y.forwardRef(
  ({
    className: b,
    logo: i,
    collapsed: d,
    defaultCollapsed: p = !1,
    onCollapsedChange: s,
    collapseMode: r = "mini",
    showToggle: u = !0,
    footer: l,
    children: h,
    ...w
  }, v) => {
    const [_, k] = f(p), o = d !== void 0, e = o ? d : _, N = () => {
      const t = !e;
      o || k(t), s == null || s(t);
    }, m = r === "hidden" && e, n = !(e && r === "mini"), [T, c] = f(n);
    return S(() => {
      if (!n) {
        c(!1);
        return;
      }
      const t = setTimeout(() => c(!0), 300);
      return () => clearTimeout(t);
    }, [n]), /* @__PURE__ */ j(
      "div",
      {
        ref: v,
        className: x(
          "relative flex flex-col h-full pb-8 bg-white dark:bg-black",
          // top 보더 제거: 로고 하단 구분선이 헤더 border-b 와 픽셀 정확히 정렬되도록
          "border-r border-b border-l border-slate-100 dark:border-slate-700",
          // 그림자 값 (Figma 시안): 10px 0 10px slate-100. 다크모드는 좀 더 짙게.
          "shadow-[10px_0px_10px_0px_var(--color-slate-100)] dark:shadow-[10px_0px_10px_0px_rgba(0,0,0,0.3)] transition-all duration-300",
          // hidden 모드
          m && "w-0 -translate-x-full opacity-0 border-0 overflow-hidden",
          // mini 모드 또는 펼쳐진 상태.
          // 가로 패딩은 여기 두지 않는다 — 로고/메뉴/푸터가 각자 갖는다.
          // (여기에 두면 스크롤 컨테이너가 그만큼 좁아져 스크롤바가 사이드바 우측 끝에서
          //  안쪽으로 떠 보인다. 본부장님 지시 "스크롤바 경계 불분명" 건)
          !m && (e && r === "mini" ? "w-[88px] px-0 items-center" : "w-[210px] px-0"),
          b
        ),
        ...w,
        children: [
          /* @__PURE__ */ a(
            "div",
            {
              className: x(
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
              showToggle: u && r === "mini",
              scrollable: !0,
              onToggle: N,
              children: h
            }
          ),
          T && l && /* @__PURE__ */ a("div", { className: "flex-shrink-0 mt-4 mb-8 px-6", children: l })
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
