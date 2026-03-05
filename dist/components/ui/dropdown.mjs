import { jsxs as l, jsx as n } from "react/jsx-runtime";
import * as d from "react";
import * as e from "@radix-ui/react-dropdown-menu";
import * as c from "@radix-ui/react-collapsible";
import { ChevronDown as m, Check as f, Circle as u, ChevronRight as x } from "lucide-react";
import { cn as s } from "../../lib/utils.mjs";
const _ = e.Root, z = e.Trigger, T = e.Group, j = e.Portal, P = e.Sub, G = e.RadioGroup, g = d.forwardRef(({ className: t, inset: o, children: a, ...r }, i) => /* @__PURE__ */ l(
  e.SubTrigger,
  {
    ref: i,
    className: s(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      o && "pl-8",
      t
    ),
    ...r,
    children: [
      a,
      /* @__PURE__ */ n(x, { className: "ml-auto" })
    ]
  }
));
g.displayName = e.SubTrigger.displayName;
const b = d.forwardRef(({ className: t, ...o }, a) => /* @__PURE__ */ n(
  e.SubContent,
  {
    ref: a,
    className: s(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      t
    ),
    ...o
  }
));
b.displayName = e.SubContent.displayName;
const h = d.forwardRef(({ className: t, sideOffset: o = 4, ...a }, r) => /* @__PURE__ */ n(e.Portal, { children: /* @__PURE__ */ n(
  e.Content,
  {
    ref: r,
    sideOffset: o,
    className: s(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden",
      "rounded-[5px] border border-slate-100 dark:border-slate-600",
      "bg-white/50 dark:bg-slate-800/50 backdrop-blur-[12px]",
      "p-[5px] text-popover-foreground",
      "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      t
    ),
    ...a
  }
) }));
h.displayName = e.Content.displayName;
const w = d.forwardRef(({ className: t, inset: o, ...a }, r) => /* @__PURE__ */ n(
  e.Item,
  {
    ref: r,
    className: s(
      "relative flex h-[29px] cursor-pointer select-none items-center gap-2 rounded-[2px] px-[5px] py-[5px]",
      "text-xs text-slate-500 dark:text-slate-300 outline-none transition-colors",
      "hover:bg-slate-100 dark:hover:bg-slate-700",
      "focus:bg-slate-100 dark:focus:bg-slate-700",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      o && "pl-8",
      t
    ),
    ...a
  }
));
w.displayName = e.Item.displayName;
const N = d.forwardRef(({ className: t, children: o, checked: a, ...r }, i) => /* @__PURE__ */ l(
  e.CheckboxItem,
  {
    ref: i,
    className: s(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      t
    ),
    checked: a,
    ...r,
    children: [
      /* @__PURE__ */ n("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ n(e.ItemIndicator, { children: /* @__PURE__ */ n(f, { className: "h-4 w-4" }) }) }),
      o
    ]
  }
));
N.displayName = e.CheckboxItem.displayName;
const v = d.forwardRef(({ className: t, children: o, ...a }, r) => /* @__PURE__ */ l(
  e.RadioItem,
  {
    ref: r,
    className: s(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      t
    ),
    ...a,
    children: [
      /* @__PURE__ */ n("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ n(e.ItemIndicator, { children: /* @__PURE__ */ n(u, { className: "h-2 w-2 fill-current" }) }) }),
      o
    ]
  }
));
v.displayName = e.RadioItem.displayName;
const y = d.forwardRef(({ className: t, inset: o, ...a }, r) => /* @__PURE__ */ n(
  e.Label,
  {
    ref: r,
    className: s(
      "px-2 py-1.5 text-sm font-semibold",
      o && "pl-8",
      t
    ),
    ...a
  }
));
y.displayName = e.Label.displayName;
const k = d.forwardRef(({ className: t, ...o }, a) => /* @__PURE__ */ n(
  e.Separator,
  {
    ref: a,
    className: s("-mx-1 my-1 h-px bg-muted", t),
    ...o
  }
));
k.displayName = e.Separator.displayName;
const D = ({
  className: t,
  ...o
}) => /* @__PURE__ */ n(
  "span",
  {
    className: s("ml-auto text-xs tracking-widest opacity-60", t),
    ...o
  }
);
D.displayName = "DropdownShortcut";
const R = ({
  trigger: t,
  children: o,
  defaultOpen: a = !1,
  className: r
}) => {
  const [i, p] = d.useState(a);
  return /* @__PURE__ */ l(c.Root, { open: i, onOpenChange: p, className: "px-[5px] first:pt-[5px] last:pb-[5px]", children: [
    /* @__PURE__ */ l(
      c.Trigger,
      {
        className: s(
          "flex w-full h-[29px] cursor-pointer select-none items-center justify-between gap-2 rounded-[2px] px-[5px]",
          "text-xs text-slate-500 dark:text-slate-300 outline-none transition-colors",
          "hover:bg-slate-100 dark:hover:bg-slate-700",
          "focus:bg-slate-100 dark:focus:bg-slate-700",
          r
        ),
        children: [
          t,
          /* @__PURE__ */ n(
            m,
            {
              className: s(
                "h-4 w-4 shrink-0 transition-transform duration-200",
                i && "rotate-180"
              )
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ n(
      c.Content,
      {
        className: s(
          "overflow-hidden",
          "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        ),
        children: /* @__PURE__ */ n("div", { className: "pl-2", children: o })
      }
    )
  ] });
};
R.displayName = "DropdownAccordionItem";
export {
  _ as Dropdown,
  R as DropdownAccordionItem,
  N as DropdownCheckboxItem,
  h as DropdownContent,
  T as DropdownGroup,
  w as DropdownItem,
  y as DropdownLabel,
  j as DropdownPortal,
  G as DropdownRadioGroup,
  v as DropdownRadioItem,
  k as DropdownSeparator,
  D as DropdownShortcut,
  P as DropdownSub,
  b as DropdownSubContent,
  g as DropdownSubTrigger,
  z as DropdownTrigger
};
//# sourceMappingURL=dropdown.mjs.map
