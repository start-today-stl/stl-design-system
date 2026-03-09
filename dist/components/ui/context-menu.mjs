import { jsx as n } from "react/jsx-runtime";
import * as s from "react";
import * as t from "@radix-ui/react-context-menu";
import { cn as r } from "../../lib/utils.mjs";
const b = t.Root, C = t.Trigger, N = t.Group, h = t.Portal, y = t.Sub, M = t.RadioGroup, l = s.forwardRef(({ className: e, inset: o, children: a, ...d }, i) => /* @__PURE__ */ n(
  t.SubTrigger,
  {
    ref: i,
    className: r(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      o && "pl-8",
      e
    ),
    ...d,
    children: a
  }
));
l.displayName = t.SubTrigger.displayName;
const p = s.forwardRef(({ className: e, ...o }, a) => /* @__PURE__ */ n(
  t.SubContent,
  {
    ref: a,
    className: r(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...o
  }
));
p.displayName = t.SubContent.displayName;
const m = s.forwardRef(({ className: e, ...o }, a) => /* @__PURE__ */ n(t.Portal, { children: /* @__PURE__ */ n(
  t.Content,
  {
    ref: a,
    className: r(
      "z-50 min-w-[140px] overflow-hidden",
      "rounded-[5px] border border-slate-100 dark:border-slate-600",
      "bg-white/90 dark:bg-slate-800/90 backdrop-blur-[12px]",
      "p-[5px] text-popover-foreground",
      "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.1)]",
      "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...o
  }
) }));
m.displayName = t.Content.displayName;
const u = s.forwardRef(({ className: e, inset: o, ...a }, d) => /* @__PURE__ */ n(
  t.Item,
  {
    ref: d,
    className: r(
      "relative flex h-[29px] cursor-pointer select-none items-center gap-2 rounded-[2px] px-[8px]",
      "text-xs text-slate-600 dark:text-slate-300 outline-none transition-colors",
      "hover:bg-slate-100 dark:hover:bg-slate-700",
      "focus:bg-slate-100 dark:focus:bg-slate-700",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
      o && "pl-8",
      e
    ),
    ...a
  }
));
u.displayName = t.Item.displayName;
const c = s.forwardRef(({ className: e, ...o }, a) => /* @__PURE__ */ n(
  t.Separator,
  {
    ref: a,
    className: r("my-1 h-px bg-slate-100 dark:bg-slate-700", e),
    ...o
  }
));
c.displayName = t.Separator.displayName;
const x = ({
  className: e,
  ...o
}) => /* @__PURE__ */ n(
  "span",
  {
    className: r("ml-auto text-xs tracking-widest text-slate-400", e),
    ...o
  }
);
x.displayName = "ContextMenuShortcut";
export {
  b as ContextMenu,
  m as ContextMenuContent,
  N as ContextMenuGroup,
  u as ContextMenuItem,
  h as ContextMenuPortal,
  M as ContextMenuRadioGroup,
  c as ContextMenuSeparator,
  x as ContextMenuShortcut,
  y as ContextMenuSub,
  p as ContextMenuSubContent,
  l as ContextMenuSubTrigger,
  C as ContextMenuTrigger
};
//# sourceMappingURL=context-menu.mjs.map
