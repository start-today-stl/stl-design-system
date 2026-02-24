import { jsxs as m, jsx as s } from "react/jsx-runtime";
import * as i from "react";
import * as e from "@radix-ui/react-dialog";
import { cn as l } from "../../lib/utils.mjs";
import { SplashScreen as c } from "./splash-screen.mjs";
const h = e.Root, v = e.Trigger, f = e.Portal, R = e.Close, d = i.forwardRef(({ className: a, ...t }, o) => /* @__PURE__ */ s(
  e.Overlay,
  {
    ref: o,
    className: l(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      a
    ),
    ...t
  }
));
d.displayName = e.Overlay.displayName;
const p = i.forwardRef(({ className: a, children: t, loading: o = !1, ...r }, n) => /* @__PURE__ */ m(f, { children: [
  /* @__PURE__ */ s(d, {}),
  /* @__PURE__ */ s(
    e.Content,
    {
      ref: n,
      className: l(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-card text-card-foreground p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        o && "min-h-[200px] items-center justify-center",
        a
      ),
      ...r,
      children: o ? /* @__PURE__ */ s(c, {}) : t
    }
  )
] }));
p.displayName = e.Content.displayName;
const g = ({
  className: a,
  ...t
}) => /* @__PURE__ */ s(
  "div",
  {
    className: l(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      a
    ),
    ...t
  }
);
g.displayName = "DialogHeader";
const x = ({
  className: a,
  ...t
}) => /* @__PURE__ */ s(
  "div",
  {
    className: l(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      a
    ),
    ...t
  }
);
x.displayName = "DialogFooter";
const y = i.forwardRef(({ className: a, ...t }, o) => /* @__PURE__ */ s(
  e.Title,
  {
    ref: o,
    className: l(
      "text-lg font-semibold leading-none tracking-tight",
      a
    ),
    ...t
  }
));
y.displayName = e.Title.displayName;
const N = i.forwardRef(({ className: a, ...t }, o) => /* @__PURE__ */ s(
  e.Description,
  {
    ref: o,
    className: l("text-sm text-muted-foreground", a),
    ...t
  }
));
N.displayName = e.Description.displayName;
export {
  h as Dialog,
  R as DialogClose,
  p as DialogContent,
  N as DialogDescription,
  x as DialogFooter,
  g as DialogHeader,
  d as DialogOverlay,
  f as DialogPortal,
  y as DialogTitle,
  v as DialogTrigger
};
//# sourceMappingURL=dialog.mjs.map
