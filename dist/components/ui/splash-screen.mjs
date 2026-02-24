import { jsxs as s, jsx as e } from "react/jsx-runtime";
import * as d from "react";
import { cn as F } from "../../lib/utils.mjs";
const u = {
  sm: { width: 45, height: 38 },
  default: { width: 90, height: 76 },
  lg: { width: 180, height: 152 }
}, m = d.forwardRef(
  ({ className: c, size: f = "default", ...p }, h) => {
    const n = d.useId(), { width: o, height: r } = u[f], t = "2.5s", i = "0; 0.2; 0.4; 0.6; 1", a = "0 0 0.58 1; 0 0 0.58 1; 0 0 1 1; 0 0 0.58 1", l = `${n}-dark`;
    return /* @__PURE__ */ s(
      "div",
      {
        ref: h,
        className: F(
          "flex items-center justify-center",
          c
        ),
        ...p,
        children: [
          /* @__PURE__ */ s(
            "svg",
            {
              width: o,
              height: r,
              viewBox: "0 0 90 76",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              className: "splash-logo dark:hidden",
              children: [
                /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ s(
                  "linearGradient",
                  {
                    id: n,
                    x1: "117.5",
                    y1: "3.5",
                    x2: "45",
                    y2: "76",
                    gradientUnits: "userSpaceOnUse",
                    children: [
                      /* @__PURE__ */ e("stop", { offset: "0%", children: /* @__PURE__ */ e(
                        "animate",
                        {
                          attributeName: "stop-color",
                          values: "#F4F6F8; #D1E4FF; #D1E4FF; #D1E4FF; #F4F6F8",
                          keyTimes: i,
                          keySplines: a,
                          calcMode: "spline",
                          dur: t,
                          repeatCount: "indefinite"
                        }
                      ) }),
                      /* @__PURE__ */ e("stop", { offset: "40.87%", children: /* @__PURE__ */ e(
                        "animate",
                        {
                          attributeName: "stop-color",
                          values: "#F4F6F8; #D1E4FF; #D1E4FF; #D1E4FF; #F4F6F8",
                          keyTimes: i,
                          keySplines: a,
                          calcMode: "spline",
                          dur: t,
                          repeatCount: "indefinite"
                        }
                      ) }),
                      /* @__PURE__ */ e("stop", { offset: "100%", children: /* @__PURE__ */ e(
                        "animate",
                        {
                          attributeName: "stop-color",
                          values: "#F4F6F8; #F4F6F8; #D1E4FF; #D1E4FF; #F4F6F8",
                          keyTimes: i,
                          keySplines: a,
                          calcMode: "spline",
                          dur: t,
                          repeatCount: "indefinite"
                        }
                      ) })
                    ]
                  }
                ) }),
                /* @__PURE__ */ e(
                  "path",
                  {
                    d: "M90 0L14.0448 76L35.1644 19.1365L0 0H90Z",
                    fill: `url(#${n})`
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ s(
            "svg",
            {
              width: o,
              height: r,
              viewBox: "0 0 90 76",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              className: "splash-logo hidden dark:block",
              children: [
                /* @__PURE__ */ e("defs", { children: /* @__PURE__ */ s(
                  "linearGradient",
                  {
                    id: l,
                    x1: "117.5",
                    y1: "3.5",
                    x2: "45",
                    y2: "76",
                    gradientUnits: "userSpaceOnUse",
                    children: [
                      /* @__PURE__ */ e("stop", { offset: "0%", children: /* @__PURE__ */ e(
                        "animate",
                        {
                          attributeName: "stop-color",
                          values: "#5e6977; #4591ff; #4591ff; #4591ff; #5e6977",
                          keyTimes: i,
                          keySplines: a,
                          calcMode: "spline",
                          dur: t,
                          repeatCount: "indefinite"
                        }
                      ) }),
                      /* @__PURE__ */ e("stop", { offset: "40.87%", children: /* @__PURE__ */ e(
                        "animate",
                        {
                          attributeName: "stop-color",
                          values: "#5e6977; #4591ff; #4591ff; #4591ff; #5e6977",
                          keyTimes: i,
                          keySplines: a,
                          calcMode: "spline",
                          dur: t,
                          repeatCount: "indefinite"
                        }
                      ) }),
                      /* @__PURE__ */ e("stop", { offset: "100%", children: /* @__PURE__ */ e(
                        "animate",
                        {
                          attributeName: "stop-color",
                          values: "#5e6977; #5e6977; #4591ff; #4591ff; #5e6977",
                          keyTimes: i,
                          keySplines: a,
                          calcMode: "spline",
                          dur: t,
                          repeatCount: "indefinite"
                        }
                      ) })
                    ]
                  }
                ) }),
                /* @__PURE__ */ e(
                  "path",
                  {
                    d: "M90 0L14.0448 76L35.1644 19.1365L0 0H90Z",
                    fill: `url(#${l})`
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ e("style", { children: `
          .splash-logo {
            filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.08));
          }
          .dark .splash-logo {
            filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.3));
          }
        ` })
        ]
      }
    );
  }
);
m.displayName = "SplashScreen";
export {
  m as SplashScreen
};
//# sourceMappingURL=splash-screen.mjs.map
