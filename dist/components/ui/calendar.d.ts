import { DayButton, DayPicker } from 'react-day-picker';
import { Button } from './button';
import * as React from "react";
declare function Calendar({ className, classNames, showOutsideDays, captionLayout, buttonVariant, formatters, components, unstyled, ...props }: React.ComponentProps<typeof DayPicker> & {
    buttonVariant?: React.ComponentProps<typeof Button>["variant"];
    /** 배경/border/shadow 스타일 제거 (다른 컴포넌트에 embedded될 때 사용) */
    unstyled?: boolean;
}): import("react/jsx-runtime").JSX.Element;
declare function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>): import("react/jsx-runtime").JSX.Element;
export { Calendar, CalendarDayButton };
