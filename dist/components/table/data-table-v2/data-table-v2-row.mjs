import { jsxs as _, jsx as t } from "react/jsx-runtime";
import * as d from "react";
import { cn as i } from "../../../lib/utils.mjs";
import { Checkbox as le } from "../../ui/checkbox.mjs";
import { DownIcon as ce } from "../../../icons/DownIcon.mjs";
import { RightIcon as de } from "../../../icons/RightIcon.mjs";
import { RowDeleteIcon as fe } from "../../../icons/RowDeleteIcon.mjs";
import { DataTableV2DefaultEdit as he } from "./data-table-v2-default-edit.mjs";
const be = {
  left: "text-left justify-start",
  center: "text-center justify-center",
  right: "text-right justify-end"
};
function ue({
  row: r,
  rowIndex: K,
  columns: L,
  leftOffsets: P,
  rightOffsets: V,
  lastLeftPinnedIdx: w,
  firstRightPinnedIdx: f,
  showLeftShadow: I,
  showRightShadow: M,
  totalWidth: T,
  translateY: W,
  isHovered: B,
  onHover: p,
  onHeightChange: D,
  selectable: g,
  isSelected: x,
  onToggleSelect: E,
  checkboxColWidth: k,
  expandable: R,
  isExpanded: a,
  canExpand: $,
  onToggleExpand: F,
  expandedContent: y,
  expandColWidth: O,
  onRowClick: n,
  extraClassName: q,
  editingColumnKey: A,
  editingState: l,
  onStartEdit: G,
  onChangeEditValue: H,
  onCompleteEdit: J,
  onCancelEdit: Q,
  showRowDelete: U,
  onRowDelete: h,
  rowActionsColWidth: X
}) {
  const v = d.useRef(null);
  d.useLayoutEffect(() => {
    const e = v.current;
    if (!e) return;
    const s = () => D(r.id, e.offsetHeight);
    s();
    const c = new ResizeObserver(s);
    return c.observe(e), () => c.disconnect();
  }, [r.id, a]);
  const o = B ? "bg-slate-100 dark:bg-slate-800" : x ? "bg-blue-50 dark:bg-blue-900" : "bg-white dark:bg-slate-900", b = d.useRef(!1), Y = (e) => {
    e.target.closest("[data-no-row-click]") || n == null || n(r);
  };
  return /* @__PURE__ */ _(
    "div",
    {
      ref: v,
      role: "row",
      className: "absolute left-0 top-0 right-0 flex flex-col",
      style: {
        minWidth: T,
        transform: `translate3d(0, ${Math.round(W)}px, 0)`
      },
      children: [
        /* @__PURE__ */ _(
          "div",
          {
            className: i(
              "flex transition-colors",
              o,
              n && "cursor-pointer",
              q
            ),
            onMouseEnter: () => p(r.id),
            onMouseLeave: () => p(null),
            onClick: n ? Y : void 0,
            children: [
              g && /* @__PURE__ */ t(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: i(
                    "shrink-0 sticky z-10 flex items-center justify-center border-b border-slate-200 dark:border-slate-700 min-h-9 transition-colors",
                    o
                  ),
                  style: { width: k, left: 0 },
                  onClick: (e) => e.stopPropagation(),
                  children: /* @__PURE__ */ t(
                    le,
                    {
                      checked: x,
                      onClick: (e) => {
                        b.current = e.shiftKey;
                      },
                      onCheckedChange: () => {
                        E(r.id, K, b.current), b.current = !1;
                      },
                      "aria-label": `행 ${r.id} 선택`
                    }
                  )
                }
              ),
              R && /* @__PURE__ */ t(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: i(
                    "shrink-0 sticky z-10 flex items-center justify-center border-b border-slate-200 dark:border-slate-700 min-h-9 transition-colors",
                    o
                  ),
                  style: {
                    width: O,
                    left: g ? k : 0
                  },
                  onClick: (e) => e.stopPropagation(),
                  children: $ && /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      onClick: () => F(r.id),
                      className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                      "aria-label": a ? "행 접기" : "행 펼치기",
                      "aria-expanded": a,
                      children: a ? /* @__PURE__ */ t(ce, { size: 24 }) : /* @__PURE__ */ t(de, { size: 24 })
                    }
                  )
                }
              ),
              L.map((e, s) => {
                const c = e.id ?? String(e.accessorKey), C = r[e.accessorKey], Z = e.cell ? e.cell(C, r) : C, u = typeof e.width == "number" ? e.width : void 0, S = typeof e.minWidth == "number" ? e.minWidth : void 0, N = e.pinned === "left", j = e.pinned === "right", z = N || j, ee = s === w && I, te = s === f && M, re = s === f, m = !!l && A === e.accessorKey, se = i(
                  "flex min-h-9 border-b border-slate-200 dark:border-slate-700",
                  u !== void 0 && "shrink-0",
                  z && "sticky z-10 transition-colors",
                  z && o,
                  re && "ml-auto",
                  ee && "shadow-[2px_0_5px_-2px_rgba(0,0,0,0.15)]",
                  te && "shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.15)]"
                ), ie = i(
                  "flex-1 flex items-center px-3 py-1.5 text-xs text-slate-900 dark:text-slate-200",
                  be[e.align ?? "left"],
                  e.editable && !m && "cursor-text hover:bg-blue-50 dark:hover:bg-blue-900/30"
                ), ae = e.editComponent ?? he, ne = e.editable ? (oe) => {
                  oe.stopPropagation(), m || G(r, e);
                } : void 0;
                return /* @__PURE__ */ t(
                  "div",
                  {
                    role: "gridcell",
                    className: se,
                    style: {
                      width: u,
                      minWidth: S,
                      flex: u === void 0 ? "1 1 0" : void 0,
                      left: N ? P[s] : void 0,
                      right: j ? V[s] : void 0
                    },
                    ...e.editable ? { "data-no-row-click": !0 } : {},
                    children: m && l ? /* @__PURE__ */ t("div", { className: "flex-1 flex items-center px-1 py-1", children: /* @__PURE__ */ t(
                      ae,
                      {
                        value: l.editValue,
                        onChange: H,
                        onComplete: () => J(e, r),
                        onCancel: Q,
                        row: r,
                        error: l.error
                      }
                    ) }) : /* @__PURE__ */ t("div", { className: ie, onClick: ne, children: Z })
                  },
                  c
                );
              }),
              U && /* @__PURE__ */ t(
                "div",
                {
                  role: "gridcell",
                  "data-no-row-click": !0,
                  className: i(
                    "shrink-0 sticky right-0 z-10 flex items-center justify-center border-b border-slate-200 dark:border-slate-700 min-h-9 transition-colors",
                    // 우측 pinned 컬럼이 없으면 delete 셀이 자동으로 우측 밀림 (전체 fixed-width 케이스 대응)
                    f === -1 && "ml-auto",
                    o
                  ),
                  style: { width: X },
                  onClick: (e) => e.stopPropagation(),
                  children: /* @__PURE__ */ t(
                    "button",
                    {
                      type: "button",
                      onClick: () => h == null ? void 0 : h(r),
                      className: "flex h-9 w-10 items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors",
                      "aria-label": "행 삭제",
                      children: /* @__PURE__ */ t(fe, { size: 20 })
                    }
                  )
                }
              )
            ]
          }
        ),
        a && y && /* @__PURE__ */ t(
          "div",
          {
            "data-no-row-click": !0,
            className: "bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-700",
            children: y
          }
        )
      ]
    }
  );
}
const Ce = d.memo(ue);
export {
  Ce as DataTableV2Row
};
//# sourceMappingURL=data-table-v2-row.mjs.map
