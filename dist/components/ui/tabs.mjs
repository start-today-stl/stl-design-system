import { jsx as o } from "react/jsx-runtime";
import * as a from "react";
import * as e from "@radix-ui/react-tabs";
import { cn as n } from "../../lib/utils.mjs";
const l = e.Root, r = a.forwardRef(({ className: i, ...s }, t) => /* @__PURE__ */ o(
  e.List,
  {
    ref: t,
    className: n(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      i
    ),
    ...s
  }
));
r.displayName = e.List.displayName;
const f = a.forwardRef(({ className: i, ...s }, t) => /* @__PURE__ */ o(
  e.Trigger,
  {
    ref: t,
    className: n(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      i
    ),
    ...s
  }
));
f.displayName = e.Trigger.displayName;
const d = a.forwardRef(({ className: i, ...s }, t) => /* @__PURE__ */ o(
  e.Content,
  {
    ref: t,
    className: n(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      i
    ),
    ...s
  }
));
d.displayName = e.Content.displayName;
export {
  l as Tabs,
  d as TabsContent,
  r as TabsList,
  f as TabsTrigger
};
//# sourceMappingURL=tabs.mjs.map
