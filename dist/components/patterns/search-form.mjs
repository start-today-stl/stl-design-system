import { jsxs as l, jsx as e } from "react/jsx-runtime";
import c from "react";
import { Button as o } from "../ui/button.mjs";
import { InputField as r } from "../ui/input.mjs";
import { cn as p } from "../../lib/utils.mjs";
import { Card as s, CardHeader as n, CardTitle as f, CardContent as u } from "../ui/card.mjs";
import { Dropdown as b } from "../ui/dropdown.mjs";
import h from "../../node_modules/lucide-react/dist/esm/icons/search.mjs";
const v = c.forwardRef(({ className: i, onSearch: a, onReset: t, ...d }, m) => /* @__PURE__ */ l(s, { ref: m, className: p("w-full bg-card", i), ...d, children: [
  /* @__PURE__ */ e(n, { className: "border-b px-6 py-4", children: /* @__PURE__ */ e(f, { className: "text-lg", children: "상품 관리" }) }),
  /* @__PURE__ */ e(u, { className: "p-6", children: /* @__PURE__ */ l("div", { className: "flex flex-col gap-6 md:flex-row md:items-end md:justify-between", children: [
    /* @__PURE__ */ l("div", { className: "grid flex-1 grid-cols-1 gap-4 md:grid-cols-4", children: [
      /* @__PURE__ */ e(r, { label: "상품명", placeholder: "상품명을 입력하세요." }),
      /* @__PURE__ */ e(
        r,
        {
          label: "SKU",
          placeholder: "SKU를 입력하세요.",
          type: "text",
          value: "ASD1231922"
        }
      ),
      /* @__PURE__ */ e(
        b,
        {
          label: "바코드",
          placeholder: "바코드를 입력하세요",
          value: "option1",
          options: [
            {
              label: "옵션1",
              value: "option1"
            },
            {
              label: "옵션2",
              value: "option2"
            },
            {
              label: "옵션3",
              value: "option3"
            },
            {
              label: "옵션4",
              value: "option4"
            },
            {
              label: "옵션5",
              value: "option5"
            }
          ]
        }
      ),
      /* @__PURE__ */ e(
        r,
        {
          label: "브랜드",
          placeholder: "브랜드를 입력하세요.",
          error: !0
        }
      )
    ] }),
    /* @__PURE__ */ l("div", { className: "flex items-center gap-2 pl-4", children: [
      /* @__PURE__ */ e(o, { variant: "action", className: "w-24", onClick: t, children: "초기화" }),
      /* @__PURE__ */ l(o, { className: "w-24", onClick: () => a == null ? void 0 : a({}), children: [
        /* @__PURE__ */ e(h, { className: "mr-2 h-4 w-4" }),
        "검색"
      ] })
    ] })
  ] }) })
] }));
v.displayName = "SearchForm";
export {
  v as SearchForm
};
//# sourceMappingURL=search-form.mjs.map
