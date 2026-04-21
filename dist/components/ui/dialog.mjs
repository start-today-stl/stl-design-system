import { jsx as o, jsxs as r, Fragment as m } from "react/jsx-runtime";
import * as l from "react";
import * as e from "@radix-ui/react-dialog";
import * as f from "@radix-ui/react-visually-hidden";
import { cn as s } from "../../lib/utils.mjs";
import { SplashScreen as p } from "./splash-screen.mjs";
const R = e.Root, T = e.Trigger, g = e.Portal, b = e.Close, d = l.forwardRef(({ className: a, ...t }, i) => /* @__PURE__ */ o(
  e.Overlay,
  {
    ref: i,
    className: s(
      "fixed inset-0 z-50 flex items-center justify-center bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      a
    ),
    ...t
  }
));
d.displayName = e.Overlay.displayName;
const x = l.forwardRef(({ className: a, children: t, loading: i = !1, ...n }, c) => /* @__PURE__ */ o(g, { children: /* @__PURE__ */ o(d, { children: /* @__PURE__ */ o(
  e.Content,
  {
    ref: c,
    className: s(
      "relative z-50 grid w-full max-w-lg gap-4 border bg-card text-card-foreground p-6 shadow-lg duration-200 ease-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg overflow-hidden",
      i && "min-h-[200px] items-center justify-center",
      a
    ),
    ...n,
    children: i ? /* @__PURE__ */ r(m, { children: [
      /* @__PURE__ */ r(f.Root, { children: [
        /* @__PURE__ */ o(e.Title, { children: "로딩 중" }),
        /* @__PURE__ */ o(e.Description, { children: "콘텐츠를 불러오는 중입니다" })
      ] }),
      /* @__PURE__ */ o(p, {})
    ] }) : t
  }
) }) }));
x.displayName = e.Content.displayName;
const y = ({
  className: a,
  ...t
}) => /* @__PURE__ */ o(
  "div",
  {
    className: s(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      a
    ),
    ...t
  }
);
y.displayName = "DialogHeader";
const D = ({
  className: a,
  ...t
}) => /* @__PURE__ */ o(
  "div",
  {
    className: s(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      a
    ),
    ...t
  }
);
D.displayName = "DialogFooter";
const u = l.forwardRef(({ className: a, ...t }, i) => /* @__PURE__ */ o(
  e.Title,
  {
    ref: i,
    className: s(
      "text-lg font-semibold leading-none tracking-tight",
      a
    ),
    ...t
  }
));
u.displayName = e.Title.displayName;
const N = l.forwardRef(({ className: a, ...t }, i) => /* @__PURE__ */ o(
  e.Description,
  {
    ref: i,
    className: s("text-sm text-muted-foreground", a),
    ...t
  }
));
N.displayName = e.Description.displayName;
export {
  R as Dialog,
  b as DialogClose,
  x as DialogContent,
  N as DialogDescription,
  D as DialogFooter,
  y as DialogHeader,
  d as DialogOverlay,
  g as DialogPortal,
  u as DialogTitle,
  T as DialogTrigger
};
//# sourceMappingURL=dialog.mjs.map
