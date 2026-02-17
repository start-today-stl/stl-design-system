import { jsx as s, jsxs as l } from "react/jsx-runtime";
import * as d from "react";
import * as e from "@radix-ui/react-tabs";
import { cn as c } from "../../lib/utils.mjs";
import { XIcon as m } from "../../icons/XIcon.mjs";
const h = e.Root, g = d.forwardRef(({ className: r, align: a = "start", ...t }, n) => /* @__PURE__ */ s(
  e.List,
  {
    ref: n,
    className: c(
      "flex h-9 items-end border-b border-border",
      a === "end" ? "justify-end" : "justify-start",
      r
    ),
    ...t
  }
));
g.displayName = e.List.displayName;
const u = d.forwardRef(({ className: r, closable: a, onClose: t, children: n, onKeyDown: o, ...f }, b) => {
  const p = (i) => {
    a && (i.key === "Delete" || i.key === "Backspace") && (i.preventDefault(), t == null || t()), o == null || o(i);
  };
  return /* @__PURE__ */ l(
    e.Trigger,
    {
      ref: b,
      className: c(
        "inline-flex h-9 items-center justify-center gap-0.5 whitespace-nowrap px-3 py-2 text-xs font-bold cursor-pointer",
        "rounded-t bg-transparent",
        "text-text-secondary",
        "mb-[-1px]",
        // 하단 border와 연결
        "transition-colors",
        "data-[state=active]:border data-[state=active]:border-b-0 data-[state=active]:border-border",
        "data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-50",
        "data-[state=active]:bg-[linear-gradient(180deg,white_0%,#f4f6f8_30%)]",
        "dark:data-[state=active]:bg-[linear-gradient(180deg,#444b57_0%,#1b2026_30%)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        r
      ),
      onKeyDown: p,
      ...f,
      children: [
        n,
        a && /* @__PURE__ */ s(
          "span",
          {
            onClick: (i) => {
              i.stopPropagation(), t == null || t();
            },
            className: "ml-0.5 text-text-secondary hover:text-text-primary transition-colors cursor-pointer",
            "aria-hidden": "true",
            children: /* @__PURE__ */ s(m, { size: 20 })
          }
        )
      ]
    }
  );
});
u.displayName = e.Trigger.displayName;
const v = d.forwardRef(({ className: r, ...a }, t) => /* @__PURE__ */ s(
  e.Content,
  {
    ref: t,
    className: c(
      "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      r
    ),
    ...a
  }
));
v.displayName = e.Content.displayName;
export {
  h as Tabs,
  v as TabsContent,
  g as TabsList,
  u as TabsTrigger
};
//# sourceMappingURL=tabs.mjs.map
