import { jsxs as s, jsx as t } from "react/jsx-runtime";
import * as f from "react";
import { Button as n } from "../../ui/button.mjs";
import { Input as m } from "../../ui/input.mjs";
import { Select as u } from "../../ui/select/index.mjs";
import { DateRangePicker as v } from "../../ui/date-range-picker.mjs";
function k({
  value: i,
  onChange: a,
  onClose: r,
  placeholder: e
}) {
  const [c, d] = f.useState(i ?? "");
  return f.useEffect(() => d(i ?? ""), [i]), /* @__PURE__ */ s("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ t(
      m,
      {
        value: c,
        onChange: (l) => d(l.target.value),
        placeholder: e ?? "검색",
        onKeyDown: (l) => {
          l.key === "Enter" && (a(c || void 0), r());
        },
        "aria-label": "필터 검색"
      }
    ),
    /* @__PURE__ */ s("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ t(n, { variant: "ghost", size: "sm", onClick: () => {
        a(void 0), r();
      }, children: "초기화" }),
      /* @__PURE__ */ t(n, { size: "sm", onClick: () => {
        a(c || void 0), r();
      }, children: "적용" })
    ] })
  ] });
}
function y({
  value: i,
  onChange: a,
  onClose: r,
  options: e,
  placeholder: c,
  emptyMessage: d
}) {
  const l = e.length === 0;
  return /* @__PURE__ */ s("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ t(
      u,
      {
        options: e,
        value: i,
        onValueChange: (o) => a(o || void 0),
        placeholder: c ?? "선택",
        clearable: !0,
        disabled: l,
        "aria-label": "필터 선택"
      }
    ),
    l && /* @__PURE__ */ t(h, { children: d }),
    /* @__PURE__ */ s("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ t(n, { variant: "ghost", size: "sm", onClick: () => {
        a(void 0), r();
      }, children: "초기화" }),
      /* @__PURE__ */ t(n, { size: "sm", onClick: r, children: "닫기" })
    ] })
  ] });
}
function h({ children: i }) {
  return /* @__PURE__ */ t("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: i ?? "선택할 수 있는 항목이 없습니다." });
}
function z({
  value: i,
  onChange: a,
  onClose: r,
  options: e,
  placeholder: c,
  emptyMessage: d
}) {
  const l = e.length === 0;
  return /* @__PURE__ */ s("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ t(
      u,
      {
        multiple: !0,
        options: e,
        value: i ?? [],
        onValueChange: (o) => a(o.length ? o : void 0),
        placeholder: c ?? "선택",
        disabled: l,
        "aria-label": "필터 다중 선택"
      }
    ),
    l && /* @__PURE__ */ t(h, { children: d }),
    /* @__PURE__ */ s("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ t(n, { variant: "ghost", size: "sm", onClick: () => {
        a(void 0), r();
      }, children: "초기화" }),
      /* @__PURE__ */ t(n, { size: "sm", onClick: r, children: "닫기" })
    ] })
  ] });
}
function D({
  value: i,
  onChange: a,
  onClose: r
}) {
  return /* @__PURE__ */ s("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ t(
      v,
      {
        value: i,
        onChange: (e) => a(e && (e.from || e.to) ? e : void 0)
      }
    ),
    /* @__PURE__ */ s("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ t(n, { variant: "ghost", size: "sm", onClick: () => {
        a(void 0), r();
      }, children: "초기화" }),
      /* @__PURE__ */ t(n, { size: "sm", onClick: r, children: "닫기" })
    ] })
  ] });
}
function j({
  value: i,
  onChange: a,
  onClose: r
}) {
  const [e, c] = f.useState(
    i ?? {}
  );
  f.useEffect(() => c(i ?? {}), [i]);
  const d = () => {
    const l = {};
    e.from !== void 0 && !Number.isNaN(e.from) && (l.from = e.from), e.to !== void 0 && !Number.isNaN(e.to) && (l.to = e.to), a(l.from !== void 0 || l.to !== void 0 ? l : void 0), r();
  };
  return /* @__PURE__ */ s("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ t(
        m,
        {
          type: "number",
          value: e.from ?? "",
          onChange: (l) => c((o) => ({ ...o, from: l.target.value === "" ? void 0 : Number(l.target.value) })),
          placeholder: "최소",
          "aria-label": "최소값"
        }
      ),
      /* @__PURE__ */ t("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: "~" }),
      /* @__PURE__ */ t(
        m,
        {
          type: "number",
          value: e.to ?? "",
          onChange: (l) => c((o) => ({ ...o, to: l.target.value === "" ? void 0 : Number(l.target.value) })),
          placeholder: "최대",
          "aria-label": "최대값"
        }
      )
    ] }),
    /* @__PURE__ */ s("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ t(n, { variant: "ghost", size: "sm", onClick: () => {
        a(void 0), r();
      }, children: "초기화" }),
      /* @__PURE__ */ t(n, { size: "sm", onClick: d, children: "적용" })
    ] })
  ] });
}
export {
  D as DefaultDateRangeFilter,
  z as DefaultMultiSelectFilter,
  j as DefaultNumberRangeFilter,
  y as DefaultSelectFilter,
  k as DefaultTextFilter
};
//# sourceMappingURL=data-table-v2-default-filters.mjs.map
