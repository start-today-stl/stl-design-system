import { jsxs as y, jsx as a } from "react/jsx-runtime";
import * as S from "react";
import { useState as c, useEffect as _ } from "react";
import { cn as x } from "../lib/utils.mjs";
import { NavMenu as E } from "./nav-menu.mjs";
const F = S.forwardRef(
  ({
    className: b,
    logo: i,
    collapsed: m,
    defaultCollapsed: u = !1,
    onCollapsedChange: s,
    collapseMode: e = "mini",
    showToggle: p = !0,
    footer: l,
    children: h,
    ...w
  }, v) => {
    const [k, N] = c(u), d = m !== void 0, r = d ? m : k, T = () => {
      const t = !r;
      d || N(t), s == null || s(t);
    }, o = e === "hidden" && r, n = !(r && e === "mini"), [j, f] = c(n);
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
        className: x(
          "relative flex flex-col h-full pb-8 bg-white dark:bg-black",
          "border border-slate-100 dark:border-slate-700",
          "shadow-[1px_0px_41.3px_1px_rgba(0,0,0,0.05)] transition-all duration-300",
          // hidden 모드
          o && "w-0 -translate-x-full opacity-0 border-0 overflow-hidden",
          // mini 모드 또는 펼쳐진 상태.
          // 가로 패딩은 여기 두지 않는다 — 로고/메뉴/푸터가 각자 갖는다.
          // (여기에 두면 스크롤 컨테이너가 그만큼 좁아져 스크롤바가 사이드바 우측 끝에서
          //  안쪽으로 떠 보인다. 본부장님 지시 "스크롤바 경계 불분명" 건)
          !o && (r && e === "mini" ? "w-[88px] px-0 items-center" : "w-[210px] px-0"),
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
                r && e === "mini" ? "justify-center" : "justify-start px-6"
              ),
              children: i == null ? void 0 : i(r && e === "mini")
            }
          ),
          /* @__PURE__ */ a(
            E,
            {
              className: "flex-1 min-h-0",
              collapsed: r && e === "mini",
              showToggle: p && e === "mini",
              scrollable: !0,
              onToggle: T,
              children: h
            }
          ),
          j && l && /* @__PURE__ */ a("div", { className: "flex-shrink-0 mt-4 mb-8 px-6", children: l })
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
