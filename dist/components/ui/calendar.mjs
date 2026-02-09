import { jsx as n } from "react/jsx-runtime";
import * as c from "react";
import { ChevronDownIcon as f } from "lucide-react";
import { getDefaultClassNames as b, DayPicker as w } from "react-day-picker";
import { cn as e } from "../../lib/utils.mjs";
import { Button as h } from "./button.mjs";
import { LeftIcon as p } from "../../icons/LeftIcon.mjs";
function C({
  className: s,
  classNames: l,
  showOutsideDays: a = !0,
  captionLayout: u = "label",
  buttonVariant: i = "ghost",
  formatters: d,
  components: x,
  unstyled: y = !1,
  ...m
}) {
  const t = b();
  return /* @__PURE__ */ n(
    w,
    {
      showOutsideDays: a,
      className: e(
        "group/calendar",
        // 피그마: backdrop-blur, 흰색 배경, border gray-100, rounded-[5px], shadow
        // 너비 260px = Input md 사이즈와 동일
        !y && "w-[260px] rounded-[5px] border border-gray-100 bg-white/95 p-3 shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)] backdrop-blur-[12px] dark:border-dark-200 dark:bg-dark-500/95",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        s
      ),
      captionLayout: u,
      formatters: {
        formatMonthDropdown: (r) => r.toLocaleString("default", { month: "short" }),
        // 요일을 한 글자로 표시 (S, M, T, W, T, F, S)
        formatWeekdayName: (r) => r.toLocaleDateString("en-US", { weekday: "narrow" }),
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
        // 피그마: 12px, gray-700 (#4d4d4d), 다크모드: #f5f5f5 (gray-50)
        caption_label: e(
          "select-none text-xs font-normal text-gray-700 tracking-[-0.18px] dark:text-gray-50",
          t.caption_label
        ),
        table: "w-full border-collapse mt-1",
        weekdays: e("flex gap-[2px]", t.weekdays),
        // 피그마: 12px, gray-200 (#ccc), 셀 32px × 34px, 다크모드: #e6e6e6 (gray-100)
        weekday: e(
          "h-[34px] w-[32px] select-none text-center text-xs font-normal text-gray-200 leading-[34px] tracking-[-0.18px] dark:text-gray-100",
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
        Root: ({ className: r, rootRef: o, ...g }) => /* @__PURE__ */ n(
          "div",
          {
            "data-slot": "calendar",
            ref: o,
            className: e(r),
            ...g
          }
        ),
        Chevron: ({ className: r, orientation: o, ...g }) => o === "left" ? /* @__PURE__ */ n(p, { size: 24, className: e("text-gray-400 dark:text-gray-50", r) }) : o === "right" ? /* @__PURE__ */ n(p, { size: 24, className: e("rotate-180 text-gray-400 dark:text-gray-50", r) }) : /* @__PURE__ */ n(f, { className: e("size-4", r), ...g }),
        DayButton: _,
        WeekNumber: ({ children: r, ...o }) => /* @__PURE__ */ n("td", { ...o, children: /* @__PURE__ */ n("div", { className: "flex size-[--cell-size] items-center justify-center text-center", children: r }) }),
        ...x
      },
      ...m
    }
  );
}
function _({
  className: s,
  day: l,
  modifiers: a,
  ...u
}) {
  const i = c.useRef(null);
  return c.useEffect(() => {
    var d;
    a.focused && ((d = i.current) == null || d.focus());
  }, [a.focused]), /* @__PURE__ */ n(
    h,
    {
      ref: i,
      variant: "ghost",
      size: "icon",
      "data-day": l.date.toLocaleDateString(),
      "data-today": a.today,
      "data-outside": a.outside,
      "data-selected-single": a.selected && !a.range_start && !a.range_end && !a.range_middle,
      "data-range-start": a.range_start,
      "data-range-end": a.range_end,
      "data-range-middle": a.range_middle,
      className: e(
        // 정원형 선택: 29px × 29px, 12px 폰트, gray-500 (#808080), 다크모드: #9ba5bb (dark-100)
        "flex size-[29px] items-center justify-center rounded-full text-xs font-normal text-gray-500 tracking-[-0.18px] transition-colors dark:text-dark-100",
        // 호버
        "hover:bg-gray-50 dark:hover:bg-dark-400",
        // 다른 달 날짜 (연한 색상), 다크모드: opacity-50 + #f5f5f5
        "data-[outside=true]:text-gray-200 data-[outside=true]:opacity-50 data-[outside=true]:hover:bg-transparent dark:data-[outside=true]:text-gray-50",
        // 오늘 날짜 (선택되지 않은 상태)
        "data-[today=true]:font-medium data-[today=true]:text-primary",
        // 단일 선택 (원형)
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-white data-[selected-single=true]:hover:bg-primary-500",
        // 오늘 날짜가 선택된 경우 - 선택 스타일 우선
        "data-[today=true]:data-[selected-single=true]:text-white",
        "data-[today=true]:data-[range-start=true]:text-white",
        "data-[today=true]:data-[range-end=true]:text-white",
        "data-[today=true]:data-[range-middle=true]:text-primary",
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
      ...u
    }
  );
}
export {
  C as Calendar,
  _ as CalendarDayButton
};
//# sourceMappingURL=calendar.mjs.map
