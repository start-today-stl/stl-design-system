import { jsxs as c, jsx as n } from "react/jsx-runtime";
import * as s from "react";
import * as e from "@radix-ui/react-dropdown-menu";
import { Check as l, Circle as p, ChevronRight as m } from "lucide-react";
import { cn as d } from "../../lib/utils.mjs";
const M = e.Root, R = e.Trigger, I = e.Group, S = e.Portal, C = e.Sub, _ = e.RadioGroup, u = s.forwardRef(({ className: t, inset: o, children: a, ...r }, i) => /* @__PURE__ */ c(
  e.SubTrigger,
  {
    ref: i,
    className: d(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      o && "pl-8",
      t
    ),
    ...r,
    children: [
      a,
      /* @__PURE__ */ n(m, { className: "ml-auto" })
    ]
  }
));
u.displayName = e.SubTrigger.displayName;
const f = s.forwardRef(({ className: t, ...o }, a) => /* @__PURE__ */ n(
  e.SubContent,
  {
    ref: a,
    className: d(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      t
    ),
    ...o
  }
));
f.displayName = e.SubContent.displayName;
const g = s.forwardRef(({ className: t, sideOffset: o = 4, ...a }, r) => /* @__PURE__ */ n(e.Portal, { children: /* @__PURE__ */ n(
  e.Content,
  {
    ref: r,
    sideOffset: o,
    className: d(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden",
      "rounded-[5px] border border-gray-100 dark:border-dark-200",
      "bg-white/50 dark:bg-dark-400/50 backdrop-blur-[12px]",
      "p-[5px] text-popover-foreground",
      "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      t
    ),
    ...a
  }
) }));
g.displayName = e.Content.displayName;
const b = s.forwardRef(({ className: t, inset: o, ...a }, r) => /* @__PURE__ */ n(
  e.Item,
  {
    ref: r,
    className: d(
      "relative flex h-[29px] cursor-pointer select-none items-center gap-2 rounded-[2px] px-[5px] py-[5px]",
      "text-xs text-gray-500 dark:text-gray-300 outline-none transition-colors",
      "hover:bg-gray-100 dark:hover:bg-dark-300",
      "focus:bg-gray-100 dark:focus:bg-dark-300",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      o && "pl-8",
      t
    ),
    ...a
  }
));
b.displayName = e.Item.displayName;
const x = s.forwardRef(({ className: t, children: o, checked: a, ...r }, i) => /* @__PURE__ */ c(
  e.CheckboxItem,
  {
    ref: i,
    className: d(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      t
    ),
    checked: a,
    ...r,
    children: [
      /* @__PURE__ */ n("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ n(e.ItemIndicator, { children: /* @__PURE__ */ n(l, { className: "h-4 w-4" }) }) }),
      o
    ]
  }
));
x.displayName = e.CheckboxItem.displayName;
const h = s.forwardRef(({ className: t, children: o, ...a }, r) => /* @__PURE__ */ c(
  e.RadioItem,
  {
    ref: r,
    className: d(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      t
    ),
    ...a,
    children: [
      /* @__PURE__ */ n("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ n(e.ItemIndicator, { children: /* @__PURE__ */ n(p, { className: "h-2 w-2 fill-current" }) }) }),
      o
    ]
  }
));
h.displayName = e.RadioItem.displayName;
const w = s.forwardRef(({ className: t, inset: o, ...a }, r) => /* @__PURE__ */ n(
  e.Label,
  {
    ref: r,
    className: d(
      "px-2 py-1.5 text-sm font-semibold",
      o && "pl-8",
      t
    ),
    ...a
  }
));
w.displayName = e.Label.displayName;
const y = s.forwardRef(({ className: t, ...o }, a) => /* @__PURE__ */ n(
  e.Separator,
  {
    ref: a,
    className: d("-mx-1 my-1 h-px bg-muted", t),
    ...o
  }
));
y.displayName = e.Separator.displayName;
const N = ({
  className: t,
  ...o
}) => /* @__PURE__ */ n(
  "span",
  {
    className: d("ml-auto text-xs tracking-widest opacity-60", t),
    ...o
  }
);
N.displayName = "DropdownMenuShortcut";
export {
  M as DropdownMenu,
  x as DropdownMenuCheckboxItem,
  g as DropdownMenuContent,
  I as DropdownMenuGroup,
  b as DropdownMenuItem,
  w as DropdownMenuLabel,
  S as DropdownMenuPortal,
  _ as DropdownMenuRadioGroup,
  h as DropdownMenuRadioItem,
  y as DropdownMenuSeparator,
  N as DropdownMenuShortcut,
  C as DropdownMenuSub,
  f as DropdownMenuSubContent,
  u as DropdownMenuSubTrigger,
  R as DropdownMenuTrigger
};
//# sourceMappingURL=dropdown-menu.mjs.map
