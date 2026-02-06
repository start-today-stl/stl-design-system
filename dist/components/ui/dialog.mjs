import { jsxs as f, jsx as o } from "react/jsx-runtime";
import * as l from "react";
import { Root as p, Close as g, Portal as x, Trigger as N, Content as d, Description as i, Overlay as r, Title as n } from "../../node_modules/@radix-ui/react-dialog/dist/index.mjs";
import { cn as s } from "../../lib/utils.mjs";
const T = p, h = N, y = x, j = g, m = l.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ o(
  r,
  {
    ref: t,
    className: s(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      a
    ),
    ...e
  }
));
m.displayName = r.displayName;
const u = l.forwardRef(({ className: a, children: e, ...t }, c) => /* @__PURE__ */ f(y, { children: [
  /* @__PURE__ */ o(m, {}),
  /* @__PURE__ */ o(
    d,
    {
      ref: c,
      className: s(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-card text-card-foreground p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        a
      ),
      ...t,
      children: e
    }
  )
] }));
u.displayName = d.displayName;
const D = ({
  className: a,
  ...e
}) => /* @__PURE__ */ o(
  "div",
  {
    className: s(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      a
    ),
    ...e
  }
);
D.displayName = "DialogHeader";
const w = ({
  className: a,
  ...e
}) => /* @__PURE__ */ o(
  "div",
  {
    className: s(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      a
    ),
    ...e
  }
);
w.displayName = "DialogFooter";
const R = l.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ o(
  n,
  {
    ref: t,
    className: s(
      "text-lg font-semibold leading-none tracking-tight",
      a
    ),
    ...e
  }
));
R.displayName = n.displayName;
const b = l.forwardRef(({ className: a, ...e }, t) => /* @__PURE__ */ o(
  i,
  {
    ref: t,
    className: s("text-sm text-muted-foreground", a),
    ...e
  }
));
b.displayName = i.displayName;
export {
  T as Dialog,
  j as DialogClose,
  u as DialogContent,
  b as DialogDescription,
  w as DialogFooter,
  D as DialogHeader,
  m as DialogOverlay,
  y as DialogPortal,
  R as DialogTitle,
  h as DialogTrigger
};
//# sourceMappingURL=dialog.mjs.map
