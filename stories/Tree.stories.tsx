import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Tree, TreeItem } from "../src/components/ui/tree"
import { BoxIcon, WriteIcon, DeleteIcon } from "@/icons"

const meta = {
  title: "Components/Tree",
  component: Tree,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tree>

export default meta
type Story = StoryObj<typeof meta>

/** 기본 Tree */
export const Default: Story = {
  render: () => (
    <div className="w-[280px] border rounded-lg p-2">
      <Tree>
        <TreeItem icon={<BoxIcon size={18} />} label="카테고리 1" />
        <TreeItem icon={<BoxIcon size={18} />} label="카테고리 2" />
        <TreeItem icon={<BoxIcon size={18} />} label="카테고리 3" />
      </Tree>
    </div>
  ),
}

/** 중첩 아이템 */
export const Nested: Story = {
  render: () => (
    <div className="w-[280px] border rounded-lg p-2">
      <Tree>
        <TreeItem icon={<BoxIcon size={18} />} label="전자제품" defaultExpanded>
          <TreeItem label="스마트폰" />
          <TreeItem label="노트북" defaultExpanded>
            <TreeItem label="맥북" />
            <TreeItem label="윈도우" />
          </TreeItem>
          <TreeItem label="태블릿" />
        </TreeItem>
        <TreeItem icon={<BoxIcon size={18} />} label="의류">
          <TreeItem label="상의" />
          <TreeItem label="하의" />
        </TreeItem>
        <TreeItem icon={<BoxIcon size={18} />} label="식품" />
      </Tree>
    </div>
  ),
}

/** 선택 상태 */
export const WithSelection: Story = {
  render: function Render() {
    const [selected, setSelected] = useState("anua")

    const items = [
      { id: "tirtir", label: "TIRTIR" },
      { id: "trtr", label: "TRTR" },
      { id: "anua", label: "ANUA" },
      { id: "postessay", label: "POST ESSAY" },
      { id: "skin1004", label: "SKIN 1004" },
    ]

    return (
      <div className="w-[280px] border rounded-lg p-2">
        <Tree>
          {items.map((item) => (
            <TreeItem
              key={item.id}
              icon={<BoxIcon size={18} />}
              label={item.label}
              selected={selected === item.id}
              onSelect={() => setSelected(item.id)}
            />
          ))}
        </Tree>
      </div>
    )
  },
}

/** 액션 버튼 */
export const WithActions: Story = {
  render: function Render() {
    const [selected, setSelected] = useState("anua")

    const items = [
      { id: "tirtir", label: "TIRTIR" },
      { id: "trtr", label: "TRTR" },
      { id: "anua", label: "ANUA" },
      { id: "postessay", label: "POST ESSAY" },
    ]

    const handleEdit = (id: string) => {
      alert(`Edit: ${id}`)
    }

    const handleDelete = (id: string) => {
      alert(`Delete: ${id}`)
    }

    return (
      <div className="w-[280px] border rounded-lg p-2">
        <Tree>
          {items.map((item) => (
            <TreeItem
              key={item.id}
              icon={<BoxIcon size={18} />}
              label={item.label}
              selected={selected === item.id}
              onSelect={() => setSelected(item.id)}
              actions={
                <>
                  <button
                    className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                    onClick={() => handleEdit(item.id)}
                    aria-label="수정"
                  >
                    <WriteIcon size={20} />
                  </button>
                  <button
                    className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-red-500"
                    onClick={() => handleDelete(item.id)}
                    aria-label="삭제"
                  >
                    <DeleteIcon size={20} />
                  </button>
                </>
              }
            />
          ))}
        </Tree>
      </div>
    )
  },
}

/** Controlled 펼침 상태 */
export const Controlled: Story = {
  render: function Render() {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({
      electronics: true,
      clothing: false,
    })

    const toggleExpand = (key: string) => {
      setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))
    }

    return (
      <div className="w-[280px] border rounded-lg p-2">
        <Tree>
          <TreeItem
            icon={<BoxIcon size={18} />}
            label="전자제품"
            expanded={expanded.electronics}
            onExpandedChange={() => toggleExpand("electronics")}
          >
            <TreeItem label="스마트폰" />
            <TreeItem label="노트북" />
          </TreeItem>
          <TreeItem
            icon={<BoxIcon size={18} />}
            label="의류"
            expanded={expanded.clothing}
            onExpandedChange={() => toggleExpand("clothing")}
          >
            <TreeItem label="상의" />
            <TreeItem label="하의" />
          </TreeItem>
        </Tree>
        <div className="mt-4 text-xs text-slate-500">
          <p>전자제품: {expanded.electronics ? "펼침" : "접힘"}</p>
          <p>의류: {expanded.clothing ? "펼침" : "접힘"}</p>
        </div>
      </div>
    )
  },
}

/** 아이콘 없는 버전 */
export const WithoutIcons: Story = {
  render: () => (
    <div className="w-[280px] border rounded-lg p-2">
      <Tree>
        <TreeItem label="기본 설정" />
        <TreeItem label="알림 설정" />
        <TreeItem label="보안 설정" />
        <TreeItem label="계정 설정" />
      </Tree>
    </div>
  ),
}
