import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { SplitPanel } from "../src/components/ui/split-panel"
import { TreeList, TreeItem } from "../src/components/ui/tree-list"
import { Button } from "../src/components/ui/button"
import { InputField } from "../src/components/ui/input"
import { Select } from "../src/components/ui/select"
import { SearchForm, DataTable, TableContainer } from "../src/components/table"
import { BoxIcon, WriteIcon, DeleteIcon, SearchIcon } from "@/icons"
import type { ColumnDef } from "@tanstack/react-table"

const meta = {
  title: "Patterns/PagePatterns",
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// 샘플 데이터
interface Product {
  id: string
  sku: string
  barcode: string
  name: string
  brand: string
  origin: string
}

const sampleProducts: Product[] = [
  { id: "G00002393", sku: "SKUCODE1_TEST4", barcode: "BARCODE1_TEST4", name: "TIRTIR MASK FIT AURA CUSHION 27C", brand: "TIRTIR", origin: "일본산" },
  { id: "G00002392", sku: "SKUCODE1_TEST3", barcode: "BARCODE1_TEST3", name: "TIRTIR MASK FIT AURA CUSHION 27C", brand: "TIRTIR", origin: "일본산" },
  { id: "G00002391", sku: "SKUCODE1_TEST2", barcode: "BARCODE1_TEST2", name: "TIRTIR MASK FIT AURA CUSHION 27C", brand: "TIRTIR", origin: "일본산" },
  { id: "G00002390", sku: "SKUCODE1_TEST", barcode: "BARCODE1_TEST", name: "TIRTIR MASK FIT AURA CUSHION 27C", brand: "TIRTIR", origin: "일본산" },
  { id: "G00001735", sku: "8809640737848_t", barcode: "8809640737848_t", name: "ANUA PDRN HYALURONIC ACID CAPSULE 100 SERUM TESTER", brand: "ANUA", origin: "일본산" },
]

const columns: ColumnDef<Product>[] = [
  { accessorKey: "id", header: "상품ID" },
  { accessorKey: "sku", header: "SKU 코드" },
  { accessorKey: "barcode", header: "바코드" },
  { accessorKey: "name", header: "상품명" },
  { accessorKey: "brand", header: "브랜드" },
  { accessorKey: "origin", header: "원산지" },
]

/** 카테고리 관리 페이지 패턴 */
export const CategoryManagement: Story = {
  render: function Render() {
    const [selected, setSelected] = useState("anua")

    const categories = [
      { id: "tirtir", label: "TIRTIR" },
      { id: "trtr", label: "TRTR" },
      { id: "anua", label: "ANUA" },
      { id: "postessay", label: "POST ESSAY" },
      { id: "skin1004", label: "SKIN 1004" },
      { id: "bbia", label: "BBIA" },
      { id: "abouttone", label: "ABOUT TONE" },
      { id: "etc", label: "ETC" },
    ]

    const selectedCategory = categories.find((c) => c.id === selected)

    return (
      <div style={{ height: "600px" }}>
        <SplitPanel>
          <SplitPanel.Side className="flex flex-col">
            {/* 트리 리스트 */}
            <div className="flex-1 p-2 overflow-y-auto">
              <TreeList>
                {categories.map((cat) => (
                  <TreeItem
                    key={cat.id}
                    icon={<BoxIcon size={18} />}
                    label={cat.label}
                    selected={selected === cat.id}
                    onSelect={() => setSelected(cat.id)}
                    actions={
                      <>
                        <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded" aria-label="수정">
                          <WriteIcon size={14} />
                        </button>
                        <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-red-500" aria-label="삭제">
                          <DeleteIcon size={14} />
                        </button>
                      </>
                    }
                  />
                ))}
              </TreeList>
            </div>

            {/* 하단 추가 버튼 */}
            <div className="p-4 border-t border-border">
              <Button className="w-full">+ 카테고리 추가</Button>
            </div>
          </SplitPanel.Side>

          <SplitPanel.Main>
            {/* 상세 헤더 */}
            <h2 className="text-xl font-semibold mb-6">
              [A] {selectedCategory?.label}
            </h2>

            {/* 검색폼 */}
            <SearchForm
              actions={
                <>
                  <Button variant="ghost-outline" className="w-24">
                    초기화
                  </Button>
                  <Button className="w-24">
                    <SearchIcon size={16} className="mr-2" />
                    검색
                  </Button>
                </>
              }
            >
              <InputField label="상품ID,상품명" placeholder="검색어 입력" />
              <Select
                label="브랜드"
                placeholder="브랜드 선택"
                options={[
                  { label: "전체", value: "all" },
                  { label: "TIRTIR", value: "tirtir" },
                  { label: "ANUA", value: "anua" },
                ]}
              />
            </SearchForm>

            {/* 테이블 */}
            <TableContainer className="mt-4">
              <DataTable columns={columns} data={sampleProducts} />
            </TableContainer>
          </SplitPanel.Main>
        </SplitPanel>
      </div>
    )
  },
}

/** 설정 페이지 패턴 (폼) */
export const SettingsPage: Story = {
  render: function Render() {
    const [selected, setSelected] = useState("general")

    const settings = [
      { id: "general", label: "기본 설정" },
      { id: "notification", label: "알림 설정" },
      { id: "security", label: "보안 설정" },
      { id: "account", label: "계정 설정" },
      { id: "display", label: "표시 설정" },
    ]

    return (
      <div style={{ height: "500px" }}>
        <SplitPanel>
          <SplitPanel.Side width={240} className="p-2">
            <TreeList>
              {settings.map((item) => (
                <TreeItem
                  key={item.id}
                  label={item.label}
                  selected={selected === item.id}
                  onSelect={() => setSelected(item.id)}
                />
              ))}
            </TreeList>
          </SplitPanel.Side>

          <SplitPanel.Main>
            <h2 className="text-xl font-semibold mb-6">
              {settings.find((s) => s.id === selected)?.label}
            </h2>

            <div className="max-w-xl space-y-4">
              <InputField label="사이트명" placeholder="사이트 이름을 입력하세요" />
              <InputField label="관리자 이메일" placeholder="admin@example.com" />
              <Select
                label="기본 언어"
                options={[
                  { label: "한국어", value: "ko" },
                  { label: "English", value: "en" },
                  { label: "日本語", value: "ja" },
                ]}
              />
              <Select
                label="타임존"
                options={[
                  { label: "Asia/Seoul (UTC+9)", value: "asia_seoul" },
                  { label: "Asia/Tokyo (UTC+9)", value: "asia_tokyo" },
                  { label: "America/New_York (UTC-5)", value: "america_ny" },
                ]}
              />
              <div className="pt-4">
                <Button>저장</Button>
              </div>
            </div>
          </SplitPanel.Main>
        </SplitPanel>
      </div>
    )
  },
}
