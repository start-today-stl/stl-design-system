import { jsxs as i, jsx as o } from "react/jsx-runtime";
import * as s from "react";
import { Root as w, Group as y, Portal as c, RadioGroup as N, Sub as v, Trigger as k, CheckboxItem as p, ItemIndicator as l, Content as m, Item as u, Label as f, RadioItem as g, Separator as b, SubContent as x, SubTrigger as h } from "../../node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs";
import { cn as n } from "../../lib/utils.mjs";
import R from "../../node_modules/lucide-react/dist/esm/icons/check.mjs";
import D from "../../node_modules/lucide-react/dist/esm/icons/circle.mjs";
import M from "../../node_modules/lucide-react/dist/esm/icons/chevron-right.mjs";
const H = w, J = k, K = y, O = c, Q = v, U = N, S = s.forwardRef(({ className: e, inset: t, children: a, ...r }, d) => /* @__PURE__ */ i(
  h,
  {
    ref: d,
    className: n(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      t && "pl-8",
      e
    ),
    ...r,
    children: [
      a,
      /* @__PURE__ */ o(M, { className: "ml-auto" })
    ]
  }
));
S.displayName = h.displayName;
const I = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ o(
  x,
  {
    ref: a,
    className: n(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      e
    ),
    ...t
  }
));
I.displayName = x.displayName;
const C = s.forwardRef(({ className: e, sideOffset: t = 4, ...a }, r) => /* @__PURE__ */ o(c, { children: /* @__PURE__ */ o(
  m,
  {
    ref: r,
    sideOffset: t,
    className: n(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden",
      "rounded-[5px] border border-gray-100 dark:border-dark-200",
      "bg-white/50 dark:bg-dark-400/50 backdrop-blur-[12px]",
      "p-[5px] text-popover-foreground",
      "shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      e
    ),
    ...a
  }
) }));
C.displayName = m.displayName;
const _ = s.forwardRef(({ className: e, inset: t, ...a }, r) => /* @__PURE__ */ o(
  u,
  {
    ref: r,
    className: n(
      "relative flex h-[29px] cursor-pointer select-none items-center gap-2 rounded-[2px] px-[5px] py-[5px]",
      "text-xs text-gray-500 dark:text-gray-300 outline-none transition-colors",
      "hover:bg-gray-100 dark:hover:bg-dark-300",
      "focus:bg-gray-100 dark:focus:bg-dark-300",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      t && "pl-8",
      e
    ),
    ...a
  }
));
_.displayName = u.displayName;
const z = s.forwardRef(({ className: e, children: t, checked: a, ...r }, d) => /* @__PURE__ */ i(
  p,
  {
    ref: d,
    className: n(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    checked: a,
    ...r,
    children: [
      /* @__PURE__ */ o("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ o(l, { children: /* @__PURE__ */ o(R, { className: "h-4 w-4" }) }) }),
      t
    ]
  }
));
z.displayName = p.displayName;
const G = s.forwardRef(({ className: e, children: t, ...a }, r) => /* @__PURE__ */ i(
  g,
  {
    ref: r,
    className: n(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      e
    ),
    ...a,
    children: [
      /* @__PURE__ */ o("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ o(l, { children: /* @__PURE__ */ o(D, { className: "h-2 w-2 fill-current" }) }) }),
      t
    ]
  }
));
G.displayName = g.displayName;
const T = s.forwardRef(({ className: e, inset: t, ...a }, r) => /* @__PURE__ */ o(
  f,
  {
    ref: r,
    className: n(
      "px-2 py-1.5 text-sm font-semibold",
      t && "pl-8",
      e
    ),
    ...a
  }
));
T.displayName = f.displayName;
const j = s.forwardRef(({ className: e, ...t }, a) => /* @__PURE__ */ o(
  b,
  {
    ref: a,
    className: n("-mx-1 my-1 h-px bg-muted", e),
    ...t
  }
));
j.displayName = b.displayName;
const L = ({
  className: e,
  ...t
}) => /* @__PURE__ */ o(
  "span",
  {
    className: n("ml-auto text-xs tracking-widest opacity-60", e),
    ...t
  }
);
L.displayName = "DropdownMenuShortcut";
export {
  H as DropdownMenu,
  z as DropdownMenuCheckboxItem,
  C as DropdownMenuContent,
  K as DropdownMenuGroup,
  _ as DropdownMenuItem,
  T as DropdownMenuLabel,
  O as DropdownMenuPortal,
  U as DropdownMenuRadioGroup,
  G as DropdownMenuRadioItem,
  j as DropdownMenuSeparator,
  L as DropdownMenuShortcut,
  Q as DropdownMenuSub,
  I as DropdownMenuSubContent,
  S as DropdownMenuSubTrigger,
  J as DropdownMenuTrigger
};
//# sourceMappingURL=dropdown-menu.mjs.map
