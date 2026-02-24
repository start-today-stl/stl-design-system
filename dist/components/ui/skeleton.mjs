import { jsxs as f, jsx as e } from "react/jsx-runtime";
import * as k from "react";
import { cn as d } from "../../lib/utils.mjs";
const c = k.forwardRef(
  ({ className: l, width: n, height: t = 18, circle: s = !1, disableAnimation: a = !1, style: o, ...r }, i) => /* @__PURE__ */ f(
    "div",
    {
      ref: i,
      className: d(
        "relative overflow-hidden",
        s ? "rounded-full" : "rounded",
        l
      ),
      style: {
        width: s ? t ?? 18 : n ?? "100%",
        height: t ?? 18,
        ...o
      },
      ...r,
      children: [
        /* @__PURE__ */ e(
          "div",
          {
            className: d(
              "absolute inset-0 dark:hidden",
              !a && "skeleton-default"
            ),
            style: {
              background: "linear-gradient(90deg, #ffffff 0%, #d4dae3 50%, #ffffff 100%)"
            }
          }
        ),
        /* @__PURE__ */ e(
          "div",
          {
            className: d(
              "absolute inset-0 hidden dark:block",
              !a && "skeleton-default"
            ),
            style: {
              background: "linear-gradient(90deg, #444b57 0%, #5e6977 50%, #444b57 100%)"
            }
          }
        ),
        !a && /* @__PURE__ */ e(
          "div",
          {
            className: "absolute inset-0 skeleton-variant dark:hidden",
            style: {
              background: "linear-gradient(90deg, #d4dae3 0%, #ffffff 50%, #d4dae3 100%)"
            }
          }
        ),
        !a && /* @__PURE__ */ e(
          "div",
          {
            className: "absolute inset-0 skeleton-variant hidden dark:block",
            style: {
              background: "linear-gradient(90deg, #5e6977 0%, #444b57 50%, #5e6977 100%)"
            }
          }
        ),
        /* @__PURE__ */ e("style", { children: `
          .skeleton-variant {
            animation: skeleton-dissolve 4s ease-out infinite;
          }
          @keyframes skeleton-dissolve {
            0% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
        ` })
      ]
    }
  )
);
c.displayName = "Skeleton";
export {
  c as Skeleton
};
//# sourceMappingURL=skeleton.mjs.map
