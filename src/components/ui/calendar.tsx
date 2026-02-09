import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LeftIcon } from "@/icons"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        // 피그마: backdrop-blur, 흰색 배경, border gray-100, rounded-[5px], shadow
        // 너비 260px = Input md 사이즈와 동일
        "group/calendar w-[260px] rounded-[5px] border border-gray-100 bg-white/95 p-3 shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)] backdrop-blur-[12px] dark:border-dark-100 dark:bg-dark-500/95",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        // 요일을 한 글자로 표시 (S, M, T, W, T, F, S)
        formatWeekdayName: (date) =>
          date.toLocaleDateString("en-US", { weekday: "narrow" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-full", defaultClassNames.root),
        months: cn(
          "relative flex flex-col md:flex-row",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col", defaultClassNames.month),
        // 피그마: 화살표 위치, month_caption과 동일한 높이로 세로 정렬
        nav: cn(
          "absolute inset-x-0 top-0 flex h-[21px] w-full items-center justify-between px-[36px]",
          defaultClassNames.nav
        ),
        button_previous: cn(
          "flex cursor-pointer select-none items-center justify-center p-0 hover:text-gray-600 aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          "flex cursor-pointer select-none items-center justify-center p-0 hover:text-gray-600 aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        // 피그마: 21px 높이, 상단 9px
        month_caption: cn(
          "flex h-[21px] w-full items-center justify-center",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-[21px] w-full items-center justify-center gap-1.5 text-xs font-normal",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "bg-popover absolute inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        // 피그마: 12px, gray-700 (#4d4d4d)
        caption_label: cn(
          "select-none text-xs font-normal text-gray-700 tracking-[-0.18px] dark:text-gray-300",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse mt-1",
        weekdays: cn("flex gap-[2px]", defaultClassNames.weekdays),
        // 피그마: 12px, gray-200 (#ccc), 셀 32px × 34px
        weekday: cn(
          "h-[34px] w-[32px] select-none text-center text-xs font-normal text-gray-200 leading-[34px] tracking-[-0.18px]",
          defaultClassNames.weekday
        ),
        week: cn("flex gap-[2px]", defaultClassNames.week),
        week_number_header: cn(
          "w-[32px] select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-gray-200 select-none text-xs",
          defaultClassNames.week_number
        ),
        // 셀 32px × 34px, 내부 버튼(29px 원형) 가운데 정렬
        day: cn(
          "group/day relative flex h-[34px] w-[32px] select-none items-center justify-center p-0",
          defaultClassNames.day
        ),
        // 범위 선택 배경 (모두 버튼에서 원형으로 처리)
        range_start: cn("", defaultClassNames.range_start),
        range_middle: cn("", defaultClassNames.range_middle),
        range_end: cn("", defaultClassNames.range_end),
        // 오늘 날짜
        today: cn(
          "font-medium",
          defaultClassNames.today
        ),
        // 피그마: 다른 달 날짜 gray-200 (#ccc)
        outside: cn(
          "text-gray-200 aria-selected:text-gray-200",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-gray-200 opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <LeftIcon size={24} className={cn("text-gray-400", className)} />
            )
          }

          if (orientation === "right") {
            return (
              <LeftIcon size={24} className={cn("rotate-180 text-gray-400", className)} />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-[--cell-size] items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-today={modifiers.today}
      data-outside={modifiers.outside}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
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
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
