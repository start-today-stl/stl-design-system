import { jsxs as d, jsx as l } from "react/jsx-runtime";
import * as h from "react";
import { Button as u } from "../../ui/button.mjs";
import { Checkbox as w } from "../../ui/checkbox.mjs";
import { Input as v } from "../../ui/input.mjs";
import { RadioGroup as D, RadioGroupItem as C } from "../../ui/radio-group.mjs";
import { DateRangePicker as z } from "../../ui/date-range-picker.mjs";
function G({
  value: a,
  onChange: r,
  onClose: i,
  placeholder: e
}) {
  const [s, c] = h.useState(a ?? "");
  return h.useEffect(() => c(a ?? ""), [a]), /* @__PURE__ */ d("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ l(
      v,
      {
        value: s,
        onChange: (t) => c(t.target.value),
        placeholder: e ?? "검색",
        onKeyDown: (t) => {
          t.key === "Enter" && (r(s || void 0), i());
        },
        "aria-label": "필터 검색"
      }
    ),
    /* @__PURE__ */ d("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ l(u, { variant: "ghost", size: "sm", onClick: () => {
        r(void 0), i();
      }, children: "초기화" }),
      /* @__PURE__ */ l(u, { size: "sm", onClick: () => {
        r(s || void 0), i();
      }, children: "적용" })
    ] })
  ] });
}
function x({
  searchable: a,
  keyword: r,
  onKeywordChange: i,
  isEmpty: e,
  emptyMessage: s,
  onReset: c,
  onClose: t,
  children: n
}) {
  return /* @__PURE__ */ d("div", { className: "flex flex-col gap-2", children: [
    a && /* @__PURE__ */ l(
      v,
      {
        value: r,
        onChange: (f) => i(f.target.value),
        placeholder: "검색",
        "aria-label": "필터 옵션 검색"
      }
    ),
    e ? /* @__PURE__ */ l(F, { children: s }) : (
      // 옵션이 많아도 팝오버가 늘어나지 않도록 목록만 스크롤한다
      /* @__PURE__ */ l("div", { className: "max-h-60 overflow-y-auto pr-1", children: n })
    ),
    /* @__PURE__ */ d("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ l(u, { variant: "ghost", size: "sm", onClick: c, children: "초기화" }),
      /* @__PURE__ */ l(u, { size: "sm", onClick: t, children: "닫기" })
    ] })
  ] });
}
function N(a, r) {
  return h.useMemo(() => {
    const i = r.trim().toLowerCase();
    return i ? a.filter((e) => e.label.toLowerCase().includes(i)) : a;
  }, [a, r]);
}
function I({
  value: a,
  onChange: r,
  onClose: i,
  options: e,
  emptyMessage: s,
  searchable: c
}) {
  const [t, n] = h.useState(""), f = N(e, t);
  return /* @__PURE__ */ l(
    x,
    {
      searchable: c,
      keyword: t,
      onKeywordChange: n,
      isEmpty: f.length === 0,
      emptyMessage: e.length === 0 ? s : "검색 결과가 없습니다.",
      onReset: () => {
        r(void 0), i();
      },
      onClose: i,
      children: /* @__PURE__ */ l(
        D,
        {
          value: a ?? "",
          onValueChange: (o) => r(o || void 0),
          className: "flex flex-col gap-1.5",
          "aria-label": "필터 선택",
          children: f.map((o) => /* @__PURE__ */ l(
            C,
            {
              value: o.value,
              label: o.label
            },
            o.value
          ))
        }
      )
    }
  );
}
function F({ children: a }) {
  return /* @__PURE__ */ l("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: a ?? "선택할 수 있는 항목이 없습니다." });
}
function L({
  value: a,
  onChange: r,
  onClose: i,
  options: e,
  emptyMessage: s,
  searchable: c
}) {
  const [t, n] = h.useState(""), f = N(e, t), o = a ?? [], b = c ?? !0, y = (m, g) => {
    const p = g ? [...o, m] : o.filter((k) => k !== m);
    r(p.length ? p : void 0);
  };
  return /* @__PURE__ */ l(
    x,
    {
      searchable: b,
      keyword: t,
      onKeywordChange: n,
      isEmpty: f.length === 0,
      emptyMessage: e.length === 0 ? s : "검색 결과가 없습니다.",
      onReset: () => {
        r(void 0), i();
      },
      onClose: i,
      children: /* @__PURE__ */ l("div", { className: "flex flex-col gap-1.5", role: "group", "aria-label": "필터 다중 선택", children: f.map((m) => /* @__PURE__ */ l(
        w,
        {
          label: m.label,
          checked: o.includes(m.value),
          onCheckedChange: (g) => y(m.value, g === !0)
        },
        m.value
      )) })
    }
  );
}
function O({
  value: a,
  onChange: r,
  onClose: i
}) {
  return /* @__PURE__ */ d("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ l(
      z,
      {
        value: a,
        onChange: (e) => r(e && (e.from || e.to) ? e : void 0)
      }
    ),
    /* @__PURE__ */ d("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ l(u, { variant: "ghost", size: "sm", onClick: () => {
        r(void 0), i();
      }, children: "초기화" }),
      /* @__PURE__ */ l(u, { size: "sm", onClick: i, children: "닫기" })
    ] })
  ] });
}
function q({
  value: a,
  onChange: r,
  onClose: i
}) {
  const [e, s] = h.useState(
    a ?? {}
  );
  h.useEffect(() => s(a ?? {}), [a]);
  const c = () => {
    const t = {};
    e.from !== void 0 && !Number.isNaN(e.from) && (t.from = e.from), e.to !== void 0 && !Number.isNaN(e.to) && (t.to = e.to), r(t.from !== void 0 || t.to !== void 0 ? t : void 0), i();
  };
  return /* @__PURE__ */ d("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ d("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ l(
        v,
        {
          type: "number",
          value: e.from ?? "",
          onChange: (t) => s((n) => ({ ...n, from: t.target.value === "" ? void 0 : Number(t.target.value) })),
          placeholder: "최소",
          "aria-label": "최소값"
        }
      ),
      /* @__PURE__ */ l("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: "~" }),
      /* @__PURE__ */ l(
        v,
        {
          type: "number",
          value: e.to ?? "",
          onChange: (t) => s((n) => ({ ...n, to: t.target.value === "" ? void 0 : Number(t.target.value) })),
          placeholder: "최대",
          "aria-label": "최대값"
        }
      )
    ] }),
    /* @__PURE__ */ d("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ l(u, { variant: "ghost", size: "sm", onClick: () => {
        r(void 0), i();
      }, children: "초기화" }),
      /* @__PURE__ */ l(u, { size: "sm", onClick: c, children: "적용" })
    ] })
  ] });
}
export {
  O as DefaultDateRangeFilter,
  L as DefaultMultiSelectFilter,
  q as DefaultNumberRangeFilter,
  I as DefaultSelectFilter,
  G as DefaultTextFilter
};
//# sourceMappingURL=data-table-v2-default-filters.mjs.map
