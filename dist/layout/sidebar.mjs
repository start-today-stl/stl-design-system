import { jsxs as p, jsx as r } from "react/jsx-runtime";
import * as N from "react";
import { useState as k } from "react";
import { cn as s } from "../lib/utils.mjs";
import { NavMenu as j } from "./nav-menu.mjs";
const _ = N.forwardRef(
  ({
    className: f,
    logo: t,
    collapsed: a,
    defaultCollapsed: x = !1,
    onCollapsedChange: n,
    collapseMode: i = "mini",
    showToggle: o = !0,
    footer: m,
    children: u,
    ...b
  }, h) => {
    const [v, w] = k(x), c = a !== void 0, e = c ? a : v, y = () => {
      const l = !e;
      c || w(l), n == null || n(l);
    }, d = i === "hidden" && e;
    return /* @__PURE__ */ p(
      "div",
      {
        ref: h,
        className: s(
          "relative flex flex-col h-full pt-4 pb-8 bg-white dark:bg-black",
          "rounded-r-[40px] border border-slate-100 dark:border-slate-700",
          "shadow-[1px_0px_41.3px_1px_rgba(0,0,0,0.05)] transition-all duration-300",
          // hidden 모드
          d && "w-0 -translate-x-full opacity-0 border-0 overflow-hidden",
          // mini 모드 또는 펼쳐진 상태.
          // 가로 패딩은 여기 두지 않는다 — 로고/메뉴/푸터가 각자 갖는다.
          // (여기에 두면 스크롤 컨테이너가 그만큼 좁아져 스크롤바가 사이드바 우측 끝에서
          //  안쪽으로 떠 보인다. 본부장님 지시 "스크롤바 경계 불분명" 건)
          !d && (e && i === "mini" ? "w-[88px] px-0 items-center" : "w-[210px] px-0"),
          f
        ),
        ...b,
        children: [
          /* @__PURE__ */ p("div", { className: "relative h-16 mb-4 flex-shrink-0 w-full", children: [
            /* @__PURE__ */ r(
              "div",
              {
                className: s(
                  "absolute inset-0 flex justify-center items-center transition-opacity duration-300",
                  e && i === "mini" ? "opacity-100" : "opacity-0 pointer-events-none"
                ),
                children: t == null ? void 0 : t(!0)
              }
            ),
            /* @__PURE__ */ r(
              "div",
              {
                className: s(
                  "absolute inset-0 flex justify-start items-center px-6 transition-opacity duration-300",
                  e && i === "mini" ? "opacity-0 pointer-events-none" : "opacity-100"
                ),
                children: t == null ? void 0 : t(!1)
              }
            )
          ] }),
          /* @__PURE__ */ r(
            j,
            {
              className: "flex-1 min-h-0",
              collapsed: e && i === "mini",
              showToggle: o && i === "mini",
              scrollable: !0,
              onToggle: y,
              children: u
            }
          ),
          !(e && i === "mini") && m && /* @__PURE__ */ r("div", { className: "flex-shrink-0 mt-4 mb-8 px-6", children: m })
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
