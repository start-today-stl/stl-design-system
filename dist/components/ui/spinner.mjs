import { jsxs as s, jsx as r, Fragment as i } from "react/jsx-runtime";
import * as n from "react";
import { cva as l } from "class-variance-authority";
import { cn as p } from "../../lib/utils.mjs";
const d = l(
  "animate-spin",
  {
    variants: {
      size: {
        sm: "size-[18px]",
        default: "size-8"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
), m = n.forwardRef(
  ({ className: a, size: t, ...f }, c) => {
    const e = t === "sm", o = n.useId();
    return /* @__PURE__ */ s(
      "svg",
      {
        ref: c,
        className: p(d({ size: t, className: a })),
        viewBox: e ? "0 0 18 18" : "0 0 32 32",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        ...f,
        children: [
          /* @__PURE__ */ r("defs", { children: /* @__PURE__ */ r(
            "linearGradient",
            {
              id: o,
              x1: "0%",
              y1: "0%",
              x2: "100%",
              y2: "100%",
              children: e ? /* @__PURE__ */ s(i, { children: [
                /* @__PURE__ */ r("stop", { offset: "0%", stopColor: "#a9b5c6" }),
                /* @__PURE__ */ r("stop", { offset: "100%", stopColor: "#eaedf1" })
              ] }) : /* @__PURE__ */ s(i, { children: [
                /* @__PURE__ */ r("stop", { offset: "0%", stopColor: "#1776ff" }),
                /* @__PURE__ */ r("stop", { offset: "100%", stopColor: "#e8f1ff" })
              ] })
            }
          ) }),
          e ? /* @__PURE__ */ r(
            "circle",
            {
              cx: "9",
              cy: "9",
              r: "7",
              stroke: `url(#${o})`,
              strokeWidth: "4",
              strokeLinecap: "round"
            }
          ) : /* @__PURE__ */ r(
            "circle",
            {
              cx: "16",
              cy: "16",
              r: "14",
              stroke: `url(#${o})`,
              strokeWidth: "4",
              strokeLinecap: "round"
            }
          )
        ]
      }
    );
  }
);
m.displayName = "Spinner";
export {
  m as Spinner,
  d as spinnerVariants
};
//# sourceMappingURL=spinner.mjs.map
