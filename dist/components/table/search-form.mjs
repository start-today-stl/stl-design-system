import { jsx as e, jsxs as s } from "react/jsx-runtime";
import S, { useState as F, useMemo as z, useContext as I, createContext as R } from "react";
import { cn as a } from "../../lib/utils.mjs";
import { DownIcon as C } from "../../icons/DownIcon.mjs";
import { UpIcon as P } from "../../icons/UpIcon.mjs";
const x = R(null), q = () => I(x), V = S.forwardRef(
  ({ className: h, title: r, children: c, actions: t, layout: g = "grid", collapsible: i = !1, collapsed: m, defaultCollapsed: v = !1, collapsedContent: f, onCollapseChange: l, ...w }, N) => {
    const [y, b] = F(v), p = m !== void 0, o = p ? m : y, u = () => {
      const n = !o;
      p || b(n), l == null || l(n);
    }, d = i && /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        onClick: (n) => {
          n.stopPropagation(), u();
        },
        "aria-label": o ? "펼치기" : "접기",
        className: "flex items-center justify-center size-8 text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0",
        children: o ? /* @__PURE__ */ e(C, { size: 24 }) : /* @__PURE__ */ e(P, { size: 24 })
      }
    ), j = f || !r && i, k = z(
      () => ({ isCollapsed: o, collapsible: i, toggleCollapse: u }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [o, i]
    );
    return /* @__PURE__ */ e(x.Provider, { value: k, children: /* @__PURE__ */ s(
      "div",
      {
        ref: N,
        className: a(
          "w-full bg-card border border-border rounded-2xl overflow-hidden shrink-0",
          h
        ),
        ...w,
        children: [
          r && /* @__PURE__ */ s(
            "div",
            {
              className: a(
                "px-6 py-4 flex items-center justify-between",
                !o && "border-b border-border"
              ),
              children: [
                /* @__PURE__ */ e("h3", { className: "text-lg font-semibold", children: r }),
                d
              ]
            }
          ),
          j && /* @__PURE__ */ e(
            "div",
            {
              className: a(
                "grid transition-[grid-template-rows,opacity] duration-200 ease-in-out",
                o ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              ),
              children: /* @__PURE__ */ e("div", { className: "overflow-hidden", children: /* @__PURE__ */ s("div", { className: "px-4 py-3 flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ e("div", { className: "flex-1 min-w-0", children: f }),
                !r && d
              ] }) })
            }
          ),
          /* @__PURE__ */ e(
            "div",
            {
              className: a(
                "grid transition-[grid-template-rows,opacity] duration-200 ease-in-out",
                o ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
              ),
              children: /* @__PURE__ */ e("div", { className: "overflow-hidden", children: /* @__PURE__ */ e("div", { className: "p-4", children: g === "flex" ? (
                // flex 레이아웃: actions를 children flex 컨테이너 내부 마지막 아이템으로 두고
                // ml-auto로 자기 줄 우측 끝에 배치. 다른 행들은 actions 자리 없이 전체 폭 활용.
                /* @__PURE__ */ s("div", { className: "flex flex-wrap items-end gap-4", children: [
                  c,
                  (t || !r && i) && /* @__PURE__ */ s("div", { className: "ml-auto flex items-center gap-2 shrink-0", children: [
                    t,
                    !r && d
                  ] })
                ] })
              ) : (
                // grid 레이아웃 (4컬럼 고정): 기존 동작 유지 — actions 우측 별도 컬럼
                /* @__PURE__ */ s("div", { className: "flex flex-col gap-4 md:flex-row md:items-end md:justify-between", children: [
                  c && /* @__PURE__ */ e("div", { className: "flex-1 gap-4 grid grid-cols-1 md:grid-cols-4", children: c }),
                  (t || !r && i) && /* @__PURE__ */ s("div", { className: "flex items-center gap-2 pl-4 shrink-0", children: [
                    t,
                    !r && d
                  ] })
                ] })
              ) }) })
            }
          )
        ]
      }
    ) });
  }
);
V.displayName = "SearchForm";
export {
  V as SearchForm,
  q as useSearchFormContext
};
//# sourceMappingURL=search-form.mjs.map
