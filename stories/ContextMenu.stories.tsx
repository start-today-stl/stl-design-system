import type { Meta, StoryObj } from "@storybook/react"
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
} from "@/components/ui/context-menu"

const meta: Meta = {
  title: "Components/ContextMenu",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj

/** 기본 컨텍스트 메뉴 (우클릭) */
export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed border-slate-300 dark:border-slate-600 text-sm text-slate-500 dark:text-slate-400">
        우클릭하세요
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>뒤로</ContextMenuItem>
        <ContextMenuItem>앞으로</ContextMenuItem>
        <ContextMenuItem>새로고침</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>다른 이름으로 저장</ContextMenuItem>
        <ContextMenuItem>인쇄</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

/** 단축키 표시 */
export const WithShortcuts: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed border-slate-300 dark:border-slate-600 text-sm text-slate-500 dark:text-slate-400">
        우클릭하세요
      </ContextMenuTrigger>
      <ContextMenuContent className="w-[200px]">
        <ContextMenuItem>
          복사
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          붙여넣기
          <ContextMenuShortcut>⌘V</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          잘라내기
          <ContextMenuShortcut>⌘X</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          모두 선택
          <ContextMenuShortcut>⌘A</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

/** 파일 컨텍스트 메뉴 */
export const FileContextMenu: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[100px] w-[200px] flex-col items-center justify-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
        <div className="text-2xl">📄</div>
        <span className="text-sm text-slate-600 dark:text-slate-300">document.pdf</span>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>열기</ContextMenuItem>
        <ContextMenuItem>미리보기</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>이름 변경</ContextMenuItem>
        <ContextMenuItem>복사</ContextMenuItem>
        <ContextMenuItem>이동</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-destructive">삭제</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

/** 비활성화 아이템 */
export const WithDisabledItems: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed border-slate-300 dark:border-slate-600 text-sm text-slate-500 dark:text-slate-400">
        우클릭하세요
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>편집</ContextMenuItem>
        <ContextMenuItem disabled>복사 (권한 없음)</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem disabled>삭제 (권한 없음)</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}

/** 테이블 행 컨텍스트 메뉴 */
export const TableRowContextMenu: Story = {
  render: () => (
    <div className="space-y-1">
      {["상품 A", "상품 B", "상품 C"].map((item) => (
        <ContextMenu key={item}>
          <ContextMenuTrigger className="flex h-10 w-[400px] items-center px-4 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer">
            <span className="text-sm text-slate-700 dark:text-slate-200">{item}</span>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>상세 보기</ContextMenuItem>
            <ContextMenuItem>수정</ContextMenuItem>
            <ContextMenuItem>복제</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem className="text-destructive">삭제</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </div>
  ),
}
