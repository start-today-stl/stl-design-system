import { jsxs as d, jsx as t } from "react/jsx-runtime";
import * as h from "react";
import { Button as u } from "../../ui/button.mjs";
import { Checkbox as D } from "../../ui/checkbox.mjs";
import { Input as g } from "../../ui/input.mjs";
import { RadioGroup as C, RadioGroupItem as z } from "../../ui/radio-group.mjs";
import { DateRangePicker as F } from "../../ui/date-range-picker.mjs";
function I({
  value: l,
  onChange: r,
  onClose: i,
  placeholder: e
}) {
  const [s, n] = h.useState(l ?? "");
  return h.useEffect(() => n(l ?? ""), [l]), /* @__PURE__ */ d("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ t(
      g,
      {
        value: s,
        onChange: (a) => n(a.target.value),
        placeholder: e ?? "검색",
        onKeyDown: (a) => {
          a.key === "Enter" && (r(s || void 0), i());
        },
        "aria-label": "필터 검색"
      }
    ),
    /* @__PURE__ */ d("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ t(u, { variant: "ghost", size: "sm", onClick: () => {
        r(void 0), i();
      }, children: "초기화" }),
      /* @__PURE__ */ t(u, { size: "sm", onClick: () => {
        r(s || void 0), i();
      }, children: "적용" })
    ] })
  ] });
}
function N({
  description: l,
  searchable: r,
  keyword: i,
  onKeywordChange: e,
  isEmpty: s,
  emptyMessage: n,
  onReset: a,
  onClose: c,
  children: v
}) {
  return /* @__PURE__ */ d("div", { className: "flex flex-col gap-2", children: [
    l && /* @__PURE__ */ t("p", { className: "text-xs text-muted-foreground", children: l }),
    r && /* @__PURE__ */ t(
      g,
      {
        value: i,
        onChange: (f) => e(f.target.value),
        placeholder: "검색",
        "aria-label": "필터 옵션 검색"
      }
    ),
    s ? /* @__PURE__ */ t(R, { children: n }) : (
      // 옵션이 많아도 팝오버가 늘어나지 않도록 목록만 스크롤한다
      /* @__PURE__ */ t("div", { className: "max-h-60 overflow-y-auto pr-1", children: v })
    ),
    /* @__PURE__ */ d("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ t(u, { variant: "ghost", size: "sm", onClick: a, children: "초기화" }),
      /* @__PURE__ */ t(u, { size: "sm", onClick: c, children: "닫기" })
    ] })
  ] });
}
function b(l, r) {
  return h.useMemo(() => {
    const i = r.trim().toLowerCase();
    return i ? l.filter((e) => e.label.toLowerCase().includes(i)) : l;
  }, [l, r]);
}
function L({
  value: l,
  onChange: r,
  onClose: i,
  options: e,
  emptyMessage: s,
  searchable: n,
  description: a
}) {
  const [c, v] = h.useState(""), f = b(e, c);
  return /* @__PURE__ */ t(
    N,
    {
      description: a,
      searchable: n,
      keyword: c,
      onKeywordChange: v,
      isEmpty: f.length === 0,
      emptyMessage: e.length === 0 ? s : "검색 결과가 없습니다.",
      onReset: () => {
        r(void 0), i();
      },
      onClose: i,
      children: /* @__PURE__ */ t(
        C,
        {
          value: l ?? "",
          onValueChange: (o) => r(o || void 0),
          className: "flex flex-col gap-1.5",
          "aria-label": "필터 선택",
          children: f.map((o) => /* @__PURE__ */ t(
            z,
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
function R({ children: l }) {
  return /* @__PURE__ */ t("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: l ?? "선택할 수 있는 항목이 없습니다." });
}
function O({
  value: l,
  onChange: r,
  onClose: i,
  options: e,
  emptyMessage: s,
  searchable: n,
  description: a
}) {
  const [c, v] = h.useState(""), f = b(e, c), o = l ?? [], y = n ?? !0, k = (m, x) => {
    const p = x ? [...o, m] : o.filter((w) => w !== m);
    r(p.length ? p : void 0);
  };
  return /* @__PURE__ */ t(
    N,
    {
      description: a,
      searchable: y,
      keyword: c,
      onKeywordChange: v,
      isEmpty: f.length === 0,
      emptyMessage: e.length === 0 ? s : "검색 결과가 없습니다.",
      onReset: () => {
        r(void 0), i();
      },
      onClose: i,
      children: /* @__PURE__ */ t("div", { className: "flex flex-col gap-1.5", role: "group", "aria-label": "필터 다중 선택", children: f.map((m) => /* @__PURE__ */ t(
        D,
        {
          label: m.label,
          checked: o.includes(m.value),
          onCheckedChange: (x) => k(m.value, x === !0)
        },
        m.value
      )) })
    }
  );
}
function q({
  value: l,
  onChange: r,
  onClose: i
}) {
  return /* @__PURE__ */ d("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ t(
      F,
      {
        value: l,
        onChange: (e) => r(e && (e.from || e.to) ? e : void 0)
      }
    ),
    /* @__PURE__ */ d("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ t(u, { variant: "ghost", size: "sm", onClick: () => {
        r(void 0), i();
      }, children: "초기화" }),
      /* @__PURE__ */ t(u, { size: "sm", onClick: i, children: "닫기" })
    ] })
  ] });
}
function B({
  value: l,
  onChange: r,
  onClose: i
}) {
  const [e, s] = h.useState(
    l ?? {}
  );
  h.useEffect(() => s(l ?? {}), [l]);
  const n = () => {
    const a = {};
    e.from !== void 0 && !Number.isNaN(e.from) && (a.from = e.from), e.to !== void 0 && !Number.isNaN(e.to) && (a.to = e.to), r(a.from !== void 0 || a.to !== void 0 ? a : void 0), i();
  };
  return /* @__PURE__ */ d("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ d("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ t(
        g,
        {
          type: "number",
          value: e.from ?? "",
          onChange: (a) => s((c) => ({ ...c, from: a.target.value === "" ? void 0 : Number(a.target.value) })),
          placeholder: "최소",
          "aria-label": "최소값"
        }
      ),
      /* @__PURE__ */ t("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: "~" }),
      /* @__PURE__ */ t(
        g,
        {
          type: "number",
          value: e.to ?? "",
          onChange: (a) => s((c) => ({ ...c, to: a.target.value === "" ? void 0 : Number(a.target.value) })),
          placeholder: "최대",
          "aria-label": "최대값"
        }
      )
    ] }),
    /* @__PURE__ */ d("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ t(u, { variant: "ghost", size: "sm", onClick: () => {
        r(void 0), i();
      }, children: "초기화" }),
      /* @__PURE__ */ t(u, { size: "sm", onClick: n, children: "적용" })
    ] })
  ] });
}
export {
  q as DefaultDateRangeFilter,
  O as DefaultMultiSelectFilter,
  B as DefaultNumberRangeFilter,
  L as DefaultSelectFilter,
  I as DefaultTextFilter
};
//# sourceMappingURL=data-table-v2-default-filters.mjs.map
