import { jsx as l, jsxs as e } from "react/jsx-runtime";
import * as g from "react";
import { cn as t } from "../../lib/utils.mjs";
import { Button as s } from "./button.mjs";
import { Calendar as h } from "./calendar.mjs";
import { Dialog as f, DialogContent as u, DialogHeader as b, DialogTitle as v, DialogDescription as x, DialogFooter as C } from "./dialog.mjs";
import { Input as d } from "./input.mjs";
import { Label as a } from "./label.mjs";
import { Popover as w, PopoverTrigger as N, PopoverContent as D } from "./popover.mjs";
import { Dropdown as o } from "./dropdown.mjs";
import P from "../../node_modules/lucide-react/dist/esm/icons/calendar.mjs";
import { ko as y } from "../../node_modules/date-fns/locale/ko.mjs";
import { format as F } from "../../node_modules/date-fns/format.mjs";
const M = ({ size: m = "l", open: n, onOpenChange: r }) => {
  const [i, p] = g.useState(), c = {
    s: {
      maxWidth: "max-w-[400px]",
      gridCols: "grid-cols-1"
    },
    m: {
      maxWidth: "max-w-[600px]",
      gridCols: "grid-cols-1 sm:grid-cols-2"
    },
    l: {
      maxWidth: "max-w-[900px]",
      gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
    },
    xl: {
      maxWidth: "max-w-[1200px]",
      gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
    }
  }[m];
  return /* @__PURE__ */ l(f, { open: n, onOpenChange: r, children: /* @__PURE__ */ e(u, { className: t(c.maxWidth), children: [
    /* @__PURE__ */ e(b, { children: [
      /* @__PURE__ */ l(v, { children: "등록 모달" }),
      /* @__PURE__ */ l(x, { children: "입고 정보를 입력하여 등록해 주세요." })
    ] }),
    /* @__PURE__ */ e("div", { className: t("grid gap-4 py-4", c.gridCols), children: [
      /* @__PURE__ */ e("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ l(a, { htmlFor: "date", children: "입고일자" }),
        /* @__PURE__ */ e(w, { children: [
          /* @__PURE__ */ l(N, { asChild: !0, children: /* @__PURE__ */ e(
            s,
            {
              variant: "outline",
              className: t(
                "w-full justify-start text-left font-normal border-[#e6e6e6] bg-[#f5f5f5] hover:bg-[#f5f5f5] hover:text-foreground focus-visible:ring-1 focus-visible:ring-[#e6e6e6] focus-visible:ring-offset-0 transition-all duration-200",
                !i && "text-[#b3b3b3]"
              ),
              children: [
                /* @__PURE__ */ l(P, { className: "mr-2 h-4 w-4" }),
                i ? F(i, "PPP", { locale: y }) : /* @__PURE__ */ l("span", { children: "날짜 선택" })
              ]
            }
          ) }),
          /* @__PURE__ */ l(D, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ l(
            h,
            {
              mode: "single",
              selected: i,
              onSelect: p,
              initialFocus: !0
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ e("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ l(a, { htmlFor: "receipt-number", children: "입고번호" }),
        /* @__PURE__ */ l(d, { id: "receipt-number", placeholder: "입고번호 입력" })
      ] }),
      /* @__PURE__ */ l(
        o,
        {
          label: "센터",
          placeholder: "센터 선택",
          options: [
            { label: "A 센터", value: "center-a" },
            { label: "B 센터", value: "center-b" },
            { label: "C 센터", value: "center-c" }
          ]
        }
      ),
      /* @__PURE__ */ l(
        o,
        {
          label: "파트",
          placeholder: "파트 선택",
          options: [
            { label: "파트 1", value: "part-1" },
            { label: "파트 2", value: "part-2" }
          ]
        }
      ),
      /* @__PURE__ */ l(
        o,
        {
          label: "입고방법",
          placeholder: "입고방법 선택",
          options: [
            { label: "수동 입고", value: "manual" },
            { label: "스캐너 입고", value: "scanner" }
          ]
        }
      ),
      /* @__PURE__ */ l(
        o,
        {
          label: "입고단위",
          placeholder: "단위 선택",
          options: [
            { label: "EA", value: "ea" },
            { label: "BOX", value: "box" },
            { label: "PALLET", value: "pallet" }
          ]
        }
      ),
      /* @__PURE__ */ e("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ l(a, { htmlFor: "quantity", children: "입고수량" }),
        /* @__PURE__ */ l(d, { id: "quantity", type: "number", placeholder: "0" })
      ] }),
      /* @__PURE__ */ e("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ l(a, { htmlFor: "remarks", children: "비고" }),
        /* @__PURE__ */ l(d, { id: "remarks", placeholder: "비고 입력" })
      ] })
    ] }),
    /* @__PURE__ */ e(C, { className: "sm:justify-between w-full", children: [
      /* @__PURE__ */ l(s, { onClick: () => r == null ? void 0 : r(!1), children: "닫기" }),
      /* @__PURE__ */ l(s, { variant: "action", children: "등록" })
    ] })
  ] }) });
};
export {
  M as Modal
};
//# sourceMappingURL=modal.mjs.map
