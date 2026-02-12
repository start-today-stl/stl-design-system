import type { Meta, StoryObj } from "@storybook/react-vite"
import { SplitPanel } from "../src/components/ui/split-panel"
import { TreeList, TreeItem } from "../src/components/ui/tree-list"
import { Button } from "../src/components/ui/button"
import { BoxIcon, WriteIcon, DeleteIcon } from "@/icons"

const meta = {
  title: "Layout/SplitPanel",
  component: SplitPanel,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ height: "500px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SplitPanel>

export default meta
type Story = StoryObj<typeof meta>

/** 기본 SplitPanel */
export const Default: Story = {
  render: () => (
    <SplitPanel>
      <SplitPanel.Side>
        <div className="p-4">
          <h3 className="font-semibold mb-4">사이드 패널</h3>
          <p className="text-sm text-slate-500">
            여기에 TreeList, 메뉴, 필터 등을 배치합니다.
          </p>
        </div>
      </SplitPanel.Side>
      <SplitPanel.Main>
        <h2 className="text-xl font-semibold mb-4">메인 영역</h2>
        <p className="text-slate-600">
          여기에 테이블, 폼, 상세 내용 등을 배치합니다.
        </p>
      </SplitPanel.Main>
    </SplitPanel>
  ),
}

/** 커스텀 너비 */
export const CustomWidth: Story = {
  render: () => (
    <SplitPanel>
      <SplitPanel.Side width={360}>
        <div className="p-4">
          <h3 className="font-semibold mb-4">넓은 사이드 패널 (360px)</h3>
          <p className="text-sm text-slate-500">
            width prop으로 너비를 조절할 수 있습니다.
          </p>
        </div>
      </SplitPanel.Side>
      <SplitPanel.Main>
        <h2 className="text-xl font-semibold mb-4">메인 영역</h2>
      </SplitPanel.Main>
    </SplitPanel>
  ),
}

/** TreeList와 함께 사용 */
export const WithTreeList: Story = {
  render: () => (
    <SplitPanel>
      <SplitPanel.Side className="flex flex-col">
        <div className="flex-1 p-2 overflow-y-auto">
          <TreeList>
            <TreeItem
              icon={<BoxIcon size={18} />}
              label="TIRTIR"
              defaultExpanded
            >
              <TreeItem label="스킨케어" />
              <TreeItem label="메이크업" />
            </TreeItem>
            <TreeItem icon={<BoxIcon size={18} />} label="TRTR" />
            <TreeItem
              icon={<BoxIcon size={18} />}
              label="ANUA"
              selected
              actions={
                <>
                  <button className="p-1 hover:bg-slate-200 rounded" aria-label="수정">
                    <WriteIcon size={14} />
                  </button>
                  <button className="p-1 hover:bg-slate-200 rounded" aria-label="삭제">
                    <DeleteIcon size={14} />
                  </button>
                </>
              }
            />
            <TreeItem icon={<BoxIcon size={18} />} label="POST ESSAY" />
            <TreeItem icon={<BoxIcon size={18} />} label="SKIN 1004" />
          </TreeList>
        </div>
        <div className="p-4 border-t border-border">
          <Button className="w-full">+ 카테고리 추가</Button>
        </div>
      </SplitPanel.Side>
      <SplitPanel.Main>
        <h2 className="text-xl font-semibold mb-4">[A] ANUA</h2>
        <p className="text-slate-600 mb-4">
          선택된 카테고리의 상세 내용이 여기에 표시됩니다.
        </p>
        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-8 text-center text-slate-500">
          SearchForm + DataTable 영역
        </div>
      </SplitPanel.Main>
    </SplitPanel>
  ),
}

/** 패딩 없는 메인 영역 */
export const NoPadding: Story = {
  render: () => (
    <SplitPanel>
      <SplitPanel.Side>
        <div className="p-4">사이드 패널</div>
      </SplitPanel.Side>
      <SplitPanel.Main padded={false}>
        <div className="bg-slate-100 dark:bg-slate-800 h-full flex items-center justify-center">
          패딩 없는 메인 영역 (padded=false)
        </div>
      </SplitPanel.Main>
    </SplitPanel>
  ),
}
