import { jsx as n } from "react/jsx-runtime";
import * as p from "react";
import { ChevronDownIcon as f } from "lucide-react";
import { getDefaultClassNames as y, DayPicker as b } from "react-day-picker";
import { cn as e } from "../../lib/utils.mjs";
import { Button as w } from "./button.mjs";
import { LeftIcon as g } from "../../icons/LeftIcon.mjs";
function D({
  className: s,
  classNames: l,
  showOutsideDays: r = !0,
  captionLayout: i = "label",
  buttonVariant: u = "ghost",
  formatters: d,
  components: x,
  ...m
}) {
  const t = y();
  return /* @__PURE__ */ n(
    b,
    {
      showOutsideDays: r,
      className: e(
        // 피그마: backdrop-blur, 흰색 배경, border gray-100, rounded-[5px], shadow
        // 너비 260px = Input md 사이즈와 동일
        "group/calendar w-[260px] rounded-[5px] border border-gray-100 bg-white/95 p-3 shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)] backdrop-blur-[12px] dark:border-dark-100 dark:bg-dark-500/95",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        s
      ),
      captionLayout: i,
      formatters: {
        formatMonthDropdown: (a) => a.toLocaleString("default", { month: "short" }),
        // 요일을 한 글자로 표시 (S, M, T, W, T, F, S)
        formatWeekdayName: (a) => a.toLocaleDateString("en-US", { weekday: "narrow" }),
        ...d
      },
      classNames: {
        root: e("w-full", t.root),
        months: e(
          "relative flex flex-col md:flex-row",
          t.months
        ),
        month: e("flex w-full flex-col", t.month),
        // 피그마: 화살표 위치, month_caption과 동일한 높이로 세로 정렬
        nav: e(
          "absolute inset-x-0 top-0 flex h-[21px] w-full items-center justify-between px-[36px]",
          t.nav
        ),
        button_previous: e(
          "flex cursor-pointer select-none items-center justify-center p-0 hover:text-gray-600 aria-disabled:opacity-50",
          t.button_previous
        ),
        button_next: e(
          "flex cursor-pointer select-none items-center justify-center p-0 hover:text-gray-600 aria-disabled:opacity-50",
          t.button_next
        ),
        // 피그마: 21px 높이, 상단 9px
        month_caption: e(
          "flex h-[21px] w-full items-center justify-center",
          t.month_caption
        ),
        dropdowns: e(
          "flex h-[21px] w-full items-center justify-center gap-1.5 text-xs font-normal",
          t.dropdowns
        ),
        dropdown_root: e(
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          t.dropdown_root
        ),
        dropdown: e(
          "bg-popover absolute inset-0 opacity-0",
          t.dropdown
        ),
        // 피그마: 12px, gray-700 (#4d4d4d)
        caption_label: e(
          "select-none text-xs font-normal text-gray-700 tracking-[-0.18px] dark:text-gray-300",
          t.caption_label
        ),
        table: "w-full border-collapse mt-1",
        weekdays: e("flex gap-[2px]", t.weekdays),
        // 피그마: 12px, gray-200 (#ccc), 셀 32px × 34px
        weekday: e(
          "h-[34px] w-[32px] select-none text-center text-xs font-normal text-gray-200 leading-[34px] tracking-[-0.18px]",
          t.weekday
        ),
        week: e("flex gap-[2px]", t.week),
        week_number_header: e(
          "w-[32px] select-none",
          t.week_number_header
        ),
        week_number: e(
          "text-gray-200 select-none text-xs",
          t.week_number
        ),
        // 셀 32px × 34px, 내부 버튼(29px 원형) 가운데 정렬
        day: e(
          "group/day relative flex h-[34px] w-[32px] select-none items-center justify-center p-0",
          t.day
        ),
        // 범위 선택 배경 (모두 버튼에서 원형으로 처리)
        range_start: e("", t.range_start),
        range_middle: e("", t.range_middle),
        range_end: e("", t.range_end),
        // 오늘 날짜
        today: e(
          "font-medium",
          t.today
        ),
        // 피그마: 다른 달 날짜 gray-200 (#ccc)
        outside: e(
          "text-gray-200 aria-selected:text-gray-200",
          t.outside
        ),
        disabled: e(
          "text-gray-200 opacity-50",
          t.disabled
        ),
        hidden: e("invisible", t.hidden),
        ...l
      },
      components: {
        Root: ({ className: a, rootRef: o, ...c }) => /* @__PURE__ */ n(
          "div",
          {
            "data-slot": "calendar",
            ref: o,
            className: e(a),
            ...c
          }
        ),
        Chevron: ({ className: a, orientation: o, ...c }) => o === "left" ? /* @__PURE__ */ n(g, { size: 24, className: e("text-gray-400", a) }) : o === "right" ? /* @__PURE__ */ n(g, { size: 24, className: e("rotate-180 text-gray-400", a) }) : /* @__PURE__ */ n(f, { className: e("size-4", a), ...c }),
        DayButton: h,
        WeekNumber: ({ children: a, ...o }) => /* @__PURE__ */ n("td", { ...o, children: /* @__PURE__ */ n("div", { className: "flex size-[--cell-size] items-center justify-center text-center", children: a }) }),
        ...x
      },
      ...m
    }
  );
}
function h({
  className: s,
  day: l,
  modifiers: r,
  ...i
}) {
  const u = p.useRef(null);
  return p.useEffect(() => {
    var d;
    r.focused && ((d = u.current) == null || d.focus());
  }, [r.focused]), /* @__PURE__ */ n(
    w,
    {
      ref: u,
      variant: "ghost",
      size: "icon",
      "data-day": l.date.toLocaleDateString(),
      "data-today": r.today,
      "data-outside": r.outside,
      "data-selected-single": r.selected && !r.range_start && !r.range_end && !r.range_middle,
      "data-range-start": r.range_start,
      "data-range-end": r.range_end,
      "data-range-middle": r.range_middle,
      className: e(
        // 정원형 선택: 29px × 29px, 12px 폰트, gray-500 (#808080)
        "flex size-[29px] items-center justify-center rounded-full text-xs font-normal text-gray-500 tracking-[-0.18px] transition-colors",
        // 호버
        "hover:bg-gray-50 dark:hover:bg-dark-400",
        // 다른 달 날짜 (연한 색상)
        "data-[outside=true]:text-gray-200 data-[outside=true]:hover:bg-transparent",
        // 오늘 날짜
        "data-[today=true]:font-medium data-[today=true]:text-primary",
        // 단일 선택 (원형)
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-white data-[selected-single=true]:hover:bg-primary-500",
        // 범위 시작 (원형)
        "data-[range-start=true]:bg-primary data-[range-start=true]:text-white",
        // 범위 끝 (원형)
        "data-[range-end=true]:bg-primary data-[range-end=true]:text-white",
        // 범위 중간 (원형 연한 배경)
        "data-[range-middle=true]:bg-primary-100 data-[range-middle=true]:text-primary",
        // 포커스
        "group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-2 group-data-[focused=true]/day:ring-primary/50",
        s
      ),
      ...i
    }
  );
}
export {
  D as Calendar,
  h as CalendarDayButton
};
//# sourceMappingURL=calendar.mjs.map
