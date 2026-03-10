import { jsxs as f, jsx as n } from "react/jsx-runtime";
import * as c from "react";
import { cn as x } from "../../lib/utils.mjs";
import { DownIcon as m } from "../../icons/DownIcon.mjs";
import { UpIcon as b } from "../../icons/UpIcon.mjs";
const I = ({ value: e, onChange: s, max: a, disabled: l }) => {
  const [i, r] = c.useState(e.toString().padStart(2, "0")), u = c.useRef(null);
  c.useEffect(() => {
    r(e.toString().padStart(2, "0"));
  }, [e]);
  const p = () => {
    s(e >= a ? 0 : e + 1);
  }, d = () => {
    s(e <= 0 ? a : e - 1);
  };
  return /* @__PURE__ */ f("div", { className: "flex flex-col items-center gap-0.5", children: [
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        onClick: p,
        disabled: l,
        className: "flex size-5 cursor-pointer items-center justify-center text-slate-400 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:text-slate-200",
        children: /* @__PURE__ */ n(b, { size: 20 })
      }
    ),
    /* @__PURE__ */ n(
      "input",
      {
        ref: u,
        type: "text",
        inputMode: "numeric",
        value: i,
        onChange: (t) => {
          const o = t.target.value.replace(/\D/g, "").slice(0, 2);
          r(o);
        },
        onBlur: () => {
          const t = parseInt(i, 10);
          !isNaN(t) && t >= 0 && t <= a ? (s(t), r(t.toString().padStart(2, "0"))) : r(e.toString().padStart(2, "0"));
        },
        onKeyDown: (t) => {
          var o;
          t.key === "Enter" ? (o = u.current) == null || o.blur() : t.key === "ArrowUp" ? (t.preventDefault(), p()) : t.key === "ArrowDown" && (t.preventDefault(), d());
        },
        onFocus: (t) => t.target.select(),
        disabled: l,
        className: x(
          "h-[23px] w-[34px] rounded-[2px] border-0 bg-transparent p-[5px] text-center",
          "text-xs font-normal tabular-nums text-slate-500 tracking-[-0.18px] dark:text-slate-300",
          "focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-slate-50 dark:focus:bg-slate-700",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )
      }
    ),
    /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        onClick: d,
        disabled: l,
        className: "flex size-5 cursor-pointer items-center justify-center text-slate-400 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-400 dark:hover:text-slate-200",
        children: /* @__PURE__ */ n(m, { size: 20 })
      }
    )
  ] });
};
export {
  I as TimeSpinner
};
//# sourceMappingURL=time-spinner.mjs.map
