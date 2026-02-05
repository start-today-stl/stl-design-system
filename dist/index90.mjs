import { jsx as t } from "react/jsx-runtime";
import * as o from "react";
import { Root as d, Content as n, List as r, Trigger as f } from "./index137.mjs";
import { cn as a } from "./index104.mjs";
const p = d, c = o.forwardRef(({ className: e, ...i }, s) => /* @__PURE__ */ t(
  r,
  {
    ref: s,
    className: a(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      e
    ),
    ...i
  }
));
c.displayName = r.displayName;
const m = o.forwardRef(({ className: e, ...i }, s) => /* @__PURE__ */ t(
  f,
  {
    ref: s,
    className: a(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      e
    ),
    ...i
  }
));
m.displayName = f.displayName;
const l = o.forwardRef(({ className: e, ...i }, s) => /* @__PURE__ */ t(
  n,
  {
    ref: s,
    className: a(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      e
    ),
    ...i
  }
));
l.displayName = n.displayName;
export {
  p as Tabs,
  l as TabsContent,
  c as TabsList,
  m as TabsTrigger
};
//# sourceMappingURL=index90.mjs.map
