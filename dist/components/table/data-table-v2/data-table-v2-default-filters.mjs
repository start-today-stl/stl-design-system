import { jsxs as o, jsx as i } from "react/jsx-runtime";
import * as d from "react";
import { Button as s } from "../../ui/button.mjs";
import { Input as m } from "../../ui/input.mjs";
import { Select as u } from "../../ui/select/index.mjs";
import { DateRangePicker as v } from "../../ui/date-range-picker.mjs";
function b({
  value: r,
  onChange: l,
  onClose: t,
  placeholder: e
}) {
  const [c, n] = d.useState(r ?? "");
  return d.useEffect(() => n(r ?? ""), [r]), /* @__PURE__ */ o("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ i(
      m,
      {
        value: c,
        onChange: (a) => n(a.target.value),
        placeholder: e ?? "검색",
        onKeyDown: (a) => {
          a.key === "Enter" && (l(c || void 0), t());
        },
        "aria-label": "필터 검색"
      }
    ),
    /* @__PURE__ */ o("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ i(s, { variant: "ghost", size: "sm", onClick: () => {
        l(void 0), t();
      }, children: "초기화" }),
      /* @__PURE__ */ i(s, { size: "sm", onClick: () => {
        l(c || void 0), t();
      }, children: "적용" })
    ] })
  ] });
}
function k({
  value: r,
  onChange: l,
  onClose: t,
  options: e,
  placeholder: c
}) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ i(
      u,
      {
        options: e,
        value: r,
        onValueChange: (n) => l(n || void 0),
        placeholder: c ?? "선택",
        clearable: !0,
        "aria-label": "필터 선택"
      }
    ),
    /* @__PURE__ */ o("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ i(s, { variant: "ghost", size: "sm", onClick: () => {
        l(void 0), t();
      }, children: "초기화" }),
      /* @__PURE__ */ i(s, { size: "sm", onClick: t, children: "닫기" })
    ] })
  ] });
}
function y({
  value: r,
  onChange: l,
  onClose: t,
  options: e,
  placeholder: c
}) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ i(
      u,
      {
        multiple: !0,
        options: e,
        value: r ?? [],
        onValueChange: (n) => l(n.length ? n : void 0),
        placeholder: c ?? "선택",
        "aria-label": "필터 다중 선택"
      }
    ),
    /* @__PURE__ */ o("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ i(s, { variant: "ghost", size: "sm", onClick: () => {
        l(void 0), t();
      }, children: "초기화" }),
      /* @__PURE__ */ i(s, { size: "sm", onClick: t, children: "닫기" })
    ] })
  ] });
}
function z({
  value: r,
  onChange: l,
  onClose: t
}) {
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ i(
      v,
      {
        value: r,
        onChange: (e) => l(e && (e.from || e.to) ? e : void 0)
      }
    ),
    /* @__PURE__ */ o("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ i(s, { variant: "ghost", size: "sm", onClick: () => {
        l(void 0), t();
      }, children: "초기화" }),
      /* @__PURE__ */ i(s, { size: "sm", onClick: t, children: "닫기" })
    ] })
  ] });
}
function D({
  value: r,
  onChange: l,
  onClose: t
}) {
  const [e, c] = d.useState(
    r ?? {}
  );
  d.useEffect(() => c(r ?? {}), [r]);
  const n = () => {
    const a = {};
    e.from !== void 0 && !Number.isNaN(e.from) && (a.from = e.from), e.to !== void 0 && !Number.isNaN(e.to) && (a.to = e.to), l(a.from !== void 0 || a.to !== void 0 ? a : void 0), t();
  };
  return /* @__PURE__ */ o("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ i(
        m,
        {
          type: "number",
          value: e.from ?? "",
          onChange: (a) => c((f) => ({ ...f, from: a.target.value === "" ? void 0 : Number(a.target.value) })),
          placeholder: "최소",
          "aria-label": "최소값"
        }
      ),
      /* @__PURE__ */ i("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: "~" }),
      /* @__PURE__ */ i(
        m,
        {
          type: "number",
          value: e.to ?? "",
          onChange: (a) => c((f) => ({ ...f, to: a.target.value === "" ? void 0 : Number(a.target.value) })),
          placeholder: "최대",
          "aria-label": "최대값"
        }
      )
    ] }),
    /* @__PURE__ */ o("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ i(s, { variant: "ghost", size: "sm", onClick: () => {
        l(void 0), t();
      }, children: "초기화" }),
      /* @__PURE__ */ i(s, { size: "sm", onClick: n, children: "적용" })
    ] })
  ] });
}
export {
  z as DefaultDateRangeFilter,
  y as DefaultMultiSelectFilter,
  D as DefaultNumberRangeFilter,
  k as DefaultSelectFilter,
  b as DefaultTextFilter
};
//# sourceMappingURL=data-table-v2-default-filters.mjs.map
