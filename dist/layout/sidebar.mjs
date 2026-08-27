import { jsxs as N, jsx as n } from "react/jsx-runtime";
import * as k from "react";
import { useState as j } from "react";
import { cn as f } from "../lib/utils.mjs";
import { NavMenu as y } from "./nav-menu.mjs";
const _ = k.forwardRef(
  ({
    className: x,
    logo: e,
    collapsed: s,
    defaultCollapsed: c = !1,
    onCollapsedChange: t,
    collapseMode: i = "mini",
    showToggle: p = !0,
    footer: a,
    children: b,
    ...o
  }, u) => {
    const [h, w] = j(c), m = s !== void 0, r = m ? s : h, v = () => {
      const d = !r;
      m || w(d), t == null || t(d);
    }, l = i === "hidden" && r;
    return /* @__PURE__ */ N(
      "div",
      {
        ref: u,
        className: f(
          "relative flex flex-col h-full pt-4 pb-8 bg-white dark:bg-black",
          "rounded-r-[40px] border border-slate-100 dark:border-slate-700",
          "shadow-[1px_0px_41.3px_1px_rgba(0,0,0,0.05)] transition-all duration-300",
          // hidden 모드
          l && "w-0 -translate-x-full opacity-0 border-0 overflow-hidden",
          // mini 모드 또는 펼쳐진 상태.
          // 가로 패딩은 여기 두지 않는다 — 로고/메뉴/푸터가 각자 갖는다.
          // (여기에 두면 스크롤 컨테이너가 그만큼 좁아져 스크롤바가 사이드바 우측 끝에서
          //  안쪽으로 떠 보인다. 본부장님 지시 "스크롤바 경계 불분명" 건)
          !l && (r && i === "mini" ? "w-[88px] px-0 items-center" : "w-[210px] px-0"),
          x
        ),
        ...o,
        children: [
          /* @__PURE__ */ n(
            "div",
            {
              className: f(
                "h-16 mb-4 flex-shrink-0 w-full flex items-center overflow-hidden",
                r && i === "mini" ? "justify-center" : "justify-start px-6"
              ),
              children: e == null ? void 0 : e(r && i === "mini")
            }
          ),
          /* @__PURE__ */ n(
            y,
            {
              className: "flex-1 min-h-0",
              collapsed: r && i === "mini",
              showToggle: p && i === "mini",
              scrollable: !0,
              onToggle: v,
              children: b
            }
          ),
          !(r && i === "mini") && a && /* @__PURE__ */ n("div", { className: "flex-shrink-0 mt-4 mb-8 px-6", children: a })
        ]
      }
    );
  }
);
_.displayName = "Sidebar";
export {
  _ as Sidebar
};
//# sourceMappingURL=sidebar.mjs.map
