import { jsxs as n, jsx as s } from "react/jsx-runtime";
import * as i from "react";
import * as a from "@radix-ui/react-dialog";
import { cn as l } from "../../lib/utils.mjs";
const D = a.Root, u = a.Trigger, m = a.Portal, w = a.Close, d = i.forwardRef(({ className: e, ...t }, o) => /* @__PURE__ */ s(
  a.Overlay,
  {
    ref: o,
    className: l(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      e
    ),
    ...t
  }
));
d.displayName = a.Overlay.displayName;
const c = i.forwardRef(({ className: e, children: t, ...o }, r) => /* @__PURE__ */ n(m, { children: [
  /* @__PURE__ */ s(d, {}),
  /* @__PURE__ */ s(
    a.Content,
    {
      ref: r,
      className: l(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-card text-card-foreground p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        e
      ),
      ...o,
      children: t
    }
  )
] }));
c.displayName = a.Content.displayName;
const f = ({
  className: e,
  ...t
}) => /* @__PURE__ */ s(
  "div",
  {
    className: l(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      e
    ),
    ...t
  }
);
f.displayName = "DialogHeader";
const p = ({
  className: e,
  ...t
}) => /* @__PURE__ */ s(
  "div",
  {
    className: l(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      e
    ),
    ...t
  }
);
p.displayName = "DialogFooter";
const g = i.forwardRef(({ className: e, ...t }, o) => /* @__PURE__ */ s(
  a.Title,
  {
    ref: o,
    className: l(
      "text-lg font-semibold leading-none tracking-tight",
      e
    ),
    ...t
  }
));
g.displayName = a.Title.displayName;
const x = i.forwardRef(({ className: e, ...t }, o) => /* @__PURE__ */ s(
  a.Description,
  {
    ref: o,
    className: l("text-sm text-muted-foreground", e),
    ...t
  }
));
x.displayName = a.Description.displayName;
export {
  D as Dialog,
  w as DialogClose,
  c as DialogContent,
  x as DialogDescription,
  p as DialogFooter,
  f as DialogHeader,
  d as DialogOverlay,
  m as DialogPortal,
  g as DialogTitle,
  u as DialogTrigger
};
//# sourceMappingURL=dialog.mjs.map
