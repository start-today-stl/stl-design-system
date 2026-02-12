import { jsx as l, jsxs as n } from "react/jsx-runtime";
import * as i from "react";
import * as e from "@radix-ui/react-alert-dialog";
import { cn as s } from "../../lib/utils.mjs";
import { buttonVariants as r } from "./button.mjs";
const w = e.Root, v = e.Trigger, m = e.Portal, d = i.forwardRef(({ className: a, ...t }, o) => /* @__PURE__ */ l(
  e.Overlay,
  {
    className: s(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      a
    ),
    ...t,
    ref: o
  }
));
d.displayName = e.Overlay.displayName;
const c = i.forwardRef(({ className: a, ...t }, o) => /* @__PURE__ */ n(m, { children: [
  /* @__PURE__ */ l(d, {}),
  /* @__PURE__ */ l(
    e.Content,
    {
      ref: o,
      className: s(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        a
      ),
      ...t
    }
  )
] }));
c.displayName = e.Content.displayName;
const f = ({
  className: a,
  ...t
}) => /* @__PURE__ */ l(
  "div",
  {
    className: s(
      "flex flex-col space-y-2 text-center sm:text-left",
      a
    ),
    ...t
  }
);
f.displayName = "AlertDialogHeader";
const p = ({
  className: a,
  ...t
}) => /* @__PURE__ */ l(
  "div",
  {
    className: s(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      a
    ),
    ...t
  }
);
p.displayName = "AlertDialogFooter";
const g = i.forwardRef(({ className: a, ...t }, o) => /* @__PURE__ */ l(
  e.Title,
  {
    ref: o,
    className: s("text-lg font-semibold", a),
    ...t
  }
));
g.displayName = e.Title.displayName;
const N = i.forwardRef(({ className: a, ...t }, o) => /* @__PURE__ */ l(
  e.Description,
  {
    ref: o,
    className: s("text-sm text-muted-foreground", a),
    ...t
  }
));
N.displayName = e.Description.displayName;
const y = i.forwardRef(({ className: a, ...t }, o) => /* @__PURE__ */ l(
  e.Action,
  {
    ref: o,
    className: s(r(), a),
    ...t
  }
));
y.displayName = e.Action.displayName;
const x = i.forwardRef(({ className: a, ...t }, o) => /* @__PURE__ */ l(
  e.Cancel,
  {
    ref: o,
    className: s(
      r({ variant: "ghost-outline" }),
      "mt-2 sm:mt-0",
      a
    ),
    ...t
  }
));
x.displayName = e.Cancel.displayName;
export {
  w as AlertDialog,
  y as AlertDialogAction,
  x as AlertDialogCancel,
  c as AlertDialogContent,
  N as AlertDialogDescription,
  p as AlertDialogFooter,
  f as AlertDialogHeader,
  d as AlertDialogOverlay,
  m as AlertDialogPortal,
  g as AlertDialogTitle,
  v as AlertDialogTrigger
};
//# sourceMappingURL=alert-dialog.mjs.map
