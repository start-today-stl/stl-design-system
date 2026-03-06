import { jsxs as d, jsx as o, Fragment as c } from "react/jsx-runtime";
import * as l from "react";
import * as e from "@radix-ui/react-dialog";
import * as f from "@radix-ui/react-visually-hidden";
import { cn as i } from "../../lib/utils.mjs";
import { SplashScreen as p } from "./splash-screen.mjs";
const R = e.Root, T = e.Trigger, g = e.Portal, b = e.Close, r = l.forwardRef(({ className: a, ...t }, s) => /* @__PURE__ */ o(
  e.Overlay,
  {
    ref: s,
    className: i(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      a
    ),
    ...t
  }
));
r.displayName = e.Overlay.displayName;
const x = l.forwardRef(({ className: a, children: t, loading: s = !1, ...n }, m) => /* @__PURE__ */ d(g, { children: [
  /* @__PURE__ */ o(r, {}),
  /* @__PURE__ */ o(
    e.Content,
    {
      ref: m,
      className: i(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-card text-card-foreground p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        s && "min-h-[200px] items-center justify-center",
        a
      ),
      ...n,
      children: s ? /* @__PURE__ */ d(c, { children: [
        /* @__PURE__ */ d(f.Root, { children: [
          /* @__PURE__ */ o(e.Title, { children: "로딩 중" }),
          /* @__PURE__ */ o(e.Description, { children: "콘텐츠를 불러오는 중입니다" })
        ] }),
        /* @__PURE__ */ o(p, {})
      ] }) : t
    }
  )
] }));
x.displayName = e.Content.displayName;
const y = ({
  className: a,
  ...t
}) => /* @__PURE__ */ o(
  "div",
  {
    className: i(
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
    className: i(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      a
    ),
    ...t
  }
);
D.displayName = "DialogFooter";
const u = l.forwardRef(({ className: a, ...t }, s) => /* @__PURE__ */ o(
  e.Title,
  {
    ref: s,
    className: i(
      "text-lg font-semibold leading-none tracking-tight",
      a
    ),
    ...t
  }
));
u.displayName = e.Title.displayName;
const N = l.forwardRef(({ className: a, ...t }, s) => /* @__PURE__ */ o(
  e.Description,
  {
    ref: s,
    className: i("text-sm text-muted-foreground", a),
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
  r as DialogOverlay,
  g as DialogPortal,
  u as DialogTitle,
  T as DialogTrigger
};
//# sourceMappingURL=dialog.mjs.map
