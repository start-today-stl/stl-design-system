import { jsx as i } from "react/jsx-runtime";
import * as r from "react";
import * as t from "@radix-ui/react-tabs";
import { cn as o } from "../../lib/utils.mjs";
const b = t.Root, l = r.forwardRef(({ className: e, ...a }, s) => /* @__PURE__ */ i(
  t.List,
  {
    ref: s,
    className: o(
      "inline-flex w-full items-end",
      e
    ),
    ...a
  }
));
l.displayName = t.List.displayName;
const n = r.forwardRef(({ className: e, ...a }, s) => /* @__PURE__ */ i(
  t.Trigger,
  {
    ref: s,
    className: o(
      "relative inline-flex items-center justify-center px-2 pt-2 pb-[10px] cursor-pointer",
      "rounded-t border border-slate-200 dark:border-slate-700",
      "text-xs font-medium",
      // 비활성
      "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400",
      // hover
      "hover:bg-slate-100 dark:hover:bg-slate-700/60",
      // 활성: 흰 배경 + 검정 텍스트 + 하단 파란 인디케이터
      "data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900",
      "data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-50",
      "data-[state=active]:after:absolute data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:-bottom-px data-[state=active]:after:h-[3px] data-[state=active]:after:bg-[var(--color-primary)]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      e
    ),
    ...a
  }
));
n.displayName = t.Trigger.displayName;
const d = r.forwardRef(({ className: e, ...a }, s) => /* @__PURE__ */ i(
  t.Content,
  {
    ref: s,
    className: o(
      "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      e
    ),
    ...a
  }
));
d.displayName = t.Content.displayName;
export {
  b as Tabs,
  d as TabsContent,
  l as TabsList,
  n as TabsTrigger
};
//# sourceMappingURL=tabs.mjs.map
