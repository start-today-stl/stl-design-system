import { jsxs as s, jsx as l } from "react/jsx-runtime";
import * as m from "react";
import { Button as n } from "../../ui/button.mjs";
import { Input as u } from "../../ui/input.mjs";
import { Select as h } from "../../ui/select/index.mjs";
import { DateRangePicker as p } from "../../ui/date-range-picker.mjs";
function y({
  value: i,
  onChange: a,
  onClose: r,
  placeholder: e
}) {
  const [c, o] = m.useState(i ?? "");
  return m.useEffect(() => o(i ?? ""), [i]), /* @__PURE__ */ s("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ l(
      u,
      {
        value: c,
        onChange: (t) => o(t.target.value),
        placeholder: e ?? "검색",
        onKeyDown: (t) => {
          t.key === "Enter" && (a(c || void 0), r());
        },
        "aria-label": "필터 검색"
      }
    ),
    /* @__PURE__ */ s("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ l(n, { variant: "ghost", size: "sm", onClick: () => {
        a(void 0), r();
      }, children: "초기화" }),
      /* @__PURE__ */ l(n, { size: "sm", onClick: () => {
        a(c || void 0), r();
      }, children: "적용" })
    ] })
  ] });
}
function z({
  value: i,
  onChange: a,
  onClose: r,
  options: e,
  placeholder: c,
  emptyMessage: o,
  searchable: t
}) {
  const d = e.length === 0;
  return /* @__PURE__ */ s("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ l(
      h,
      {
        searchable: t,
        options: e,
        value: i,
        onValueChange: (f) => a(f || void 0),
        placeholder: c ?? "선택",
        clearable: !0,
        disabled: d,
        "aria-label": "필터 선택"
      }
    ),
    d && /* @__PURE__ */ l(v, { children: o }),
    /* @__PURE__ */ s("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ l(n, { variant: "ghost", size: "sm", onClick: () => {
        a(void 0), r();
      }, children: "초기화" }),
      /* @__PURE__ */ l(n, { size: "sm", onClick: r, children: "닫기" })
    ] })
  ] });
}
function v({ children: i }) {
  return /* @__PURE__ */ l("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: i ?? "선택할 수 있는 항목이 없습니다." });
}
function D({
  value: i,
  onChange: a,
  onClose: r,
  options: e,
  placeholder: c,
  emptyMessage: o,
  searchable: t
}) {
  const d = e.length === 0;
  return /* @__PURE__ */ s("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ l(
      h,
      {
        multiple: !0,
        searchable: t,
        options: e,
        value: i ?? [],
        onValueChange: (f) => a(f.length ? f : void 0),
        placeholder: c ?? "선택",
        disabled: d,
        "aria-label": "필터 다중 선택"
      }
    ),
    d && /* @__PURE__ */ l(v, { children: o }),
    /* @__PURE__ */ s("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ l(n, { variant: "ghost", size: "sm", onClick: () => {
        a(void 0), r();
      }, children: "초기화" }),
      /* @__PURE__ */ l(n, { size: "sm", onClick: r, children: "닫기" })
    ] })
  ] });
}
function j({
  value: i,
  onChange: a,
  onClose: r
}) {
  return /* @__PURE__ */ s("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ l(
      p,
      {
        value: i,
        onChange: (e) => a(e && (e.from || e.to) ? e : void 0)
      }
    ),
    /* @__PURE__ */ s("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ l(n, { variant: "ghost", size: "sm", onClick: () => {
        a(void 0), r();
      }, children: "초기화" }),
      /* @__PURE__ */ l(n, { size: "sm", onClick: r, children: "닫기" })
    ] })
  ] });
}
function E({
  value: i,
  onChange: a,
  onClose: r
}) {
  const [e, c] = m.useState(
    i ?? {}
  );
  m.useEffect(() => c(i ?? {}), [i]);
  const o = () => {
    const t = {};
    e.from !== void 0 && !Number.isNaN(e.from) && (t.from = e.from), e.to !== void 0 && !Number.isNaN(e.to) && (t.to = e.to), a(t.from !== void 0 || t.to !== void 0 ? t : void 0), r();
  };
  return /* @__PURE__ */ s("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ s("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ l(
        u,
        {
          type: "number",
          value: e.from ?? "",
          onChange: (t) => c((d) => ({ ...d, from: t.target.value === "" ? void 0 : Number(t.target.value) })),
          placeholder: "최소",
          "aria-label": "최소값"
        }
      ),
      /* @__PURE__ */ l("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: "~" }),
      /* @__PURE__ */ l(
        u,
        {
          type: "number",
          value: e.to ?? "",
          onChange: (t) => c((d) => ({ ...d, to: t.target.value === "" ? void 0 : Number(t.target.value) })),
          placeholder: "최대",
          "aria-label": "최대값"
        }
      )
    ] }),
    /* @__PURE__ */ s("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ l(n, { variant: "ghost", size: "sm", onClick: () => {
        a(void 0), r();
      }, children: "초기화" }),
      /* @__PURE__ */ l(n, { size: "sm", onClick: o, children: "적용" })
    ] })
  ] });
}
export {
  j as DefaultDateRangeFilter,
  D as DefaultMultiSelectFilter,
  E as DefaultNumberRangeFilter,
  z as DefaultSelectFilter,
  y as DefaultTextFilter
};
//# sourceMappingURL=data-table-v2-default-filters.mjs.map
