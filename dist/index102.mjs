import { SolidHomeIcon as r } from "./index81.mjs";
import { SolidProductIcon as i } from "./index83.mjs";
import { SolidPostIcon as o } from "./index82.mjs";
import { SolidShipIcon as d } from "./index84.mjs";
import { SolidStockIcon as l } from "./index85.mjs";
function p(e) {
  return "children" in e && Array.isArray(e.children);
}
const b = [
  {
    id: "dashboard",
    label: "대시보드",
    icon: r,
    href: "/dashboard",
    active: !0,
    hasIndicator: !0
  },
  {
    id: "sales",
    label: "판매 관리",
    icon: i,
    children: [
      { id: "products", label: "상품 관리", href: "/sales/products" },
      { id: "packages", label: "패키지 관리", href: "/sales/packages" }
    ]
  },
  {
    id: "orders",
    label: "주문 관리",
    icon: o,
    defaultExpanded: !0,
    children: [
      {
        id: "b2c-orders",
        label: "B2C 주문",
        defaultExpanded: !0,
        children: [
          { id: "b2c-order-management", label: "B2C 주문 관리", href: "/orders/b2c" },
          { id: "order-collection", label: "주문 수집", href: "/orders/collection" }
        ]
      }
    ]
  },
  {
    id: "shipping",
    label: "배송 관리",
    icon: d,
    children: [
      { id: "b2c-shipping", label: "B2C 배송 관리", href: "/shipping/b2c" }
    ]
  },
  {
    id: "inventory",
    label: "재고 관리",
    icon: l,
    defaultExpanded: !0,
    children: [
      { id: "inbound", label: "입고 관리", href: "/inventory/inbound" }
    ]
  }
];
export {
  p as isNavGroup,
  b as sampleNavigation
};
//# sourceMappingURL=index102.mjs.map
