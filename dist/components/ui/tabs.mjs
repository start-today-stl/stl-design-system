import { jsx as s, jsxs as l } from "react/jsx-runtime";
import * as o from "react";
import * as t from "@radix-ui/react-tabs";
import { cn as n } from "../../lib/utils.mjs";
import { XIcon as f } from "../../icons/XIcon.mjs";
const v = t.Root, m = o.forwardRef(({ className: r, align: i = "start", ...e }, a) => /* @__PURE__ */ s(
  t.List,
  {
    ref: a,
    className: n(
      "flex h-9 items-end border-b border-border",
      i === "end" ? "justify-end" : "justify-start",
      r
    ),
    ...e
  }
));
m.displayName = t.List.displayName;
const p = o.forwardRef(({ className: r, closable: i, onClose: e, children: a, ...c }, d) => /* @__PURE__ */ l(
  t.Trigger,
  {
    ref: d,
    className: n(
      "inline-flex h-9 items-center justify-center gap-0.5 whitespace-nowrap px-3 py-2 text-xs font-bold cursor-pointer",
      "rounded-t border border-b-0 border-border",
      "text-text-secondary bg-slate-100 dark:bg-slate-800",
      "mb-[-1px]",
      // 하단 border와 연결
      "transition-colors",
      "data-[state=active]:bg-card data-[state=active]:text-primary",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      r
    ),
    ...c,
    children: [
      a,
      i && /* @__PURE__ */ s(
        "button",
        {
          type: "button",
          onClick: (b) => {
            b.stopPropagation(), e == null || e();
          },
          className: "ml-0.5 text-text-secondary hover:text-text-primary transition-colors",
          "aria-label": "탭 닫기",
          children: /* @__PURE__ */ s(f, { size: 20 })
        }
      )
    ]
  }
));
p.displayName = t.Trigger.displayName;
const g = o.forwardRef(({ className: r, ...i }, e) => /* @__PURE__ */ s(
  t.Content,
  {
    ref: e,
    className: n(
      "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      r
    ),
    ...i
  }
));
g.displayName = t.Content.displayName;
export {
  v as Tabs,
  g as TabsContent,
  m as TabsList,
  p as TabsTrigger
};
//# sourceMappingURL=tabs.mjs.map
