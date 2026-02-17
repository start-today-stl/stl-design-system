import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { PanelLayout } from "../src/layout/panel-layout"
import { AppShell, NavRenderer, PageTitle } from "../src/layout"
import { SearchBar } from "../src/layout/search-bar"
import { Tree, TreeItem } from "../src/components/ui/tree"
import { Input } from "../src/components/ui/input"
import { Button } from "../src/components/ui/button"
import {
  BoxIcon,
  SearchIcon,
  NaviHomeIcon,
  NaviSaleIcon,
  NaviOrderIcon,
  BellIcon,
  ProfileIcon,
} from "@/icons"
import type { NavigationConfig } from "../src/layout/types"

const meta = {
  title: "Layout/PanelLayout",
  component: PanelLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PanelLayout>

export default meta
type Story = StoryObj<typeof meta>

/** 기본 PanelLayout */
export const Default: Story = {
  render: () => (
    <div className="h-[500px]">
      <PanelLayout>
        <PanelLayout.Side>
          <div className="p-4">
            <Tree>
              <TreeItem icon={<BoxIcon size={18} />} label="카테고리 1" />
              <TreeItem icon={<BoxIcon size={18} />} label="카테고리 2" />
              <TreeItem icon={<BoxIcon size={18} />} label="카테고리 3" />
            </Tree>
          </div>
        </PanelLayout.Side>
        <PanelLayout.Main>
          <PanelLayout.Header title="카테고리 관리" />
          <PanelLayout.Body>
            <p className="text-muted-foreground">
              왼쪽 메뉴에서 카테고리를 선택하세요.
            </p>
          </PanelLayout.Body>
        </PanelLayout.Main>
      </PanelLayout>
    </div>
  ),
}

/** Tree + 테이블 리스트 (스크린샷 예시) */
export const WithTreeAndList: Story = {
  render: function Render() {
    const [selected, setSelected] = useState("anua")

    const categories = [
      {
        id: "all",
        label: "전체 브랜드",
        children: [
          { id: "tirtir", label: "TIRTIR" },
          { id: "trtr", label: "TRTR" },
          { id: "anua", label: "ANUA" },
          { id: "postessay", label: "POST ESSAY" },
          { id: "skin1004", label: "SKIN 1004" },
        ],
      },
      {
        id: "domestic",
        label: "국내 브랜드",
        children: [
          { id: "innisfree", label: "이니스프리" },
          { id: "etude", label: "에뛰드" },
        ],
      },
      {
        id: "overseas",
        label: "해외 브랜드",
        children: [
          { id: "loreal", label: "로레알" },
          { id: "maybelline", label: "메이블린" },
        ],
      },
    ]

    const selectedItem =
      categories
        .flatMap((c) => c.children)
        .find((item) => item.id === selected) || categories[0].children[0]

    return (
      <div className="h-[600px]">
        <PanelLayout>
          <PanelLayout.Side width={260}>
            <div className="p-4 space-y-4">
              {/* 검색 */}
              <div className="relative">
                <SearchIcon
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input placeholder="브랜드 검색" className="pl-9" />
              </div>

              {/* Tree */}
              <Tree>
                {categories.map((category) => (
                  <TreeItem
                    key={category.id}
                    icon={<BoxIcon size={18} />}
                    label={category.label}
                    defaultExpanded={category.id === "all"}
                  >
                    {category.children.map((item) => (
                      <TreeItem
                        key={item.id}
                        label={item.label}
                        selected={selected === item.id}
                        onSelect={() => setSelected(item.id)}
                      />
                    ))}
                  </TreeItem>
                ))}
              </Tree>
            </div>
          </PanelLayout.Side>

          <PanelLayout.Main>
            <PanelLayout.Header
              title={selectedItem.label}
              actions={<Button size="sm">상품 추가</Button>}
            />
            <PanelLayout.Body>
              {/* 검색 폼 영역 */}
              <div className="mb-6 p-4 bg-muted rounded-lg">
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">
                      상품명
                    </label>
                    <Input placeholder="상품명을 입력하세요" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">
                      상품코드
                    </label>
                    <Input placeholder="상품코드를 입력하세요" />
                  </div>
                  <Button>검색</Button>
                </div>
              </div>

              {/* 테이블 영역 (간단한 예시) */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium">
                        상품코드
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium">
                        상품명
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium">
                        가격
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium">
                        상태
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="hover:bg-muted/50">
                        <td className="px-4 py-3 text-sm">PRD-00{i}</td>
                        <td className="px-4 py-3 text-sm">
                          {selectedItem.label} 상품 {i}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {(10000 * i).toLocaleString()}원
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                            판매중
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </PanelLayout.Body>
          </PanelLayout.Main>
        </PanelLayout>
      </div>
    )
  },
}

/** 커스텀 너비 */
export const CustomWidth: Story = {
  render: () => (
    <div className="h-[400px]">
      <PanelLayout>
        <PanelLayout.Side width={320}>
          <div className="p-4">
            <p className="text-sm text-muted-foreground">너비 320px</p>
            <Tree className="mt-4">
              <TreeItem icon={<BoxIcon size={18} />} label="메뉴 1" />
              <TreeItem icon={<BoxIcon size={18} />} label="메뉴 2" />
              <TreeItem icon={<BoxIcon size={18} />} label="메뉴 3" />
            </Tree>
          </div>
        </PanelLayout.Side>
        <PanelLayout.Main>
          <PanelLayout.Header title="넓은 사이드 패널" />
          <PanelLayout.Body>
            <p className="text-muted-foreground">
              사이드 패널 너비를 320px로 설정한 예시입니다.
            </p>
          </PanelLayout.Body>
        </PanelLayout.Main>
      </PanelLayout>
    </div>
  ),
}

/** 헤더 커스텀 */
export const CustomHeader: Story = {
  render: () => (
    <div className="h-[400px]">
      <PanelLayout>
        <PanelLayout.Side>
          <div className="p-4">
            <Tree>
              <TreeItem icon={<BoxIcon size={18} />} label="설정 1" />
              <TreeItem icon={<BoxIcon size={18} />} label="설정 2" />
            </Tree>
          </div>
        </PanelLayout.Side>
        <PanelLayout.Main>
          <PanelLayout.Header>
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">시스템 설정</h2>
              <span className="text-sm text-muted-foreground">
                마지막 수정: 2024.01.15
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost-outline" size="sm">
                초기화
              </Button>
              <Button size="sm">저장</Button>
            </div>
          </PanelLayout.Header>
          <PanelLayout.Body>
            <p className="text-muted-foreground">
              헤더를 커스텀한 예시입니다. title prop 대신 children을 사용합니다.
            </p>
          </PanelLayout.Body>
        </PanelLayout.Main>
      </PanelLayout>
    </div>
  ),
}

/** 메인 레이아웃용 네비게이션 데이터 */
const sampleNavigation: NavigationConfig = [
  {
    id: "dashboard",
    label: "대시보드",
    icon: NaviHomeIcon,
    href: "/dashboard",
  },
  {
    id: "category",
    label: "카테고리 관리",
    icon: NaviSaleIcon,
    href: "/category",
    active: true,
  },
  {
    id: "orders",
    label: "주문 관리",
    icon: NaviOrderIcon,
    children: [
      { id: "b2c-orders", label: "B2C 주문", href: "/orders/b2c" },
      { id: "b2b-orders", label: "B2B 주문", href: "/orders/b2b" },
    ],
  },
]

/** AppShell 내부에서 사용 */
export const InsideAppShell: Story = {
  render: function Render() {
    const [selected, setSelected] = useState("category1")

    const categoryNames: Record<string, string> = {
      category1: "스마트폰",
      category2: "노트북",
      category3: "태블릿",
      category4: "상의",
      category5: "하의",
    }

    return (
      <div className="h-[700px] border rounded-lg overflow-hidden">
        <AppShell>
          <AppShell.Sidebar>
            <NavRenderer items={sampleNavigation} />
          </AppShell.Sidebar>

          <AppShell.Header
            search={
              <SearchBar
                placeholder="검색..."
                recentSearches={[]}
                className="w-full"
              />
            }
            actions={
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon-sm" aria-label="알림">
                  <BellIcon size={24} />
                </Button>
                <Button variant="ghost" size="icon-sm" aria-label="프로필">
                  <ProfileIcon size={24} />
                </Button>
              </div>
            }
          />

          <AppShell.Content>
            <div className="flex flex-col h-full">
              <PageTitle title="카테고리 관리" subtitle="Category Management" />
              <PanelLayout className="flex-1 mt-4">
                <PanelLayout.Side width={240}>
                  <div className="p-4">
                    <Tree>
                      <TreeItem
                        icon={<BoxIcon size={18} />}
                        label="전자제품"
                        defaultExpanded
                      >
                        <TreeItem
                          label="스마트폰"
                          selected={selected === "category1"}
                          onSelect={() => setSelected("category1")}
                        />
                        <TreeItem
                          label="노트북"
                          selected={selected === "category2"}
                          onSelect={() => setSelected("category2")}
                        />
                        <TreeItem
                          label="태블릿"
                          selected={selected === "category3"}
                          onSelect={() => setSelected("category3")}
                        />
                      </TreeItem>
                      <TreeItem icon={<BoxIcon size={18} />} label="의류">
                        <TreeItem
                          label="상의"
                          selected={selected === "category4"}
                          onSelect={() => setSelected("category4")}
                        />
                        <TreeItem
                          label="하의"
                          selected={selected === "category5"}
                          onSelect={() => setSelected("category5")}
                        />
                      </TreeItem>
                    </Tree>
                  </div>
                </PanelLayout.Side>

                <PanelLayout.Main>
                  <PanelLayout.Header
                    title={categoryNames[selected]}
                    actions={<Button size="sm">상품 추가</Button>}
                  />
                  <PanelLayout.Body>
                    <div className="p-4 bg-muted rounded-lg mb-4">
                      <p className="text-sm text-muted-foreground">
                        AppShell (메인 레이아웃) 내부의 Content 영역에 PanelLayout을
                        배치한 예시입니다.
                      </p>
                    </div>
                    <div className="border rounded-lg p-8 text-center text-muted-foreground">
                      선택된 카테고리의 상품 목록이 여기에 표시됩니다.
                    </div>
                  </PanelLayout.Body>
                </PanelLayout.Main>
              </PanelLayout>
            </div>
          </AppShell.Content>
        </AppShell>
      </div>
    )
  },
}
