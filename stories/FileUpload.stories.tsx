import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { FileUpload } from "@/components/ui/file-upload"

const meta: Meta<typeof FileUpload> = {
  title: "Components/FileUpload",
  component: FileUpload,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "라벨 텍스트",
    },
    maxFiles: {
      control: "number",
      description: "최대 파일 개수",
    },
    maxSize: {
      control: "number",
      description: "최대 파일 크기 (bytes)",
    },
    accept: {
      control: "text",
      description: "허용 확장자",
    },
    helperText: {
      control: "text",
      description: "커스텀 도움말",
    },
    error: {
      control: "boolean",
      description: "에러 상태",
    },
    errorMessage: {
      control: "text",
      description: "에러 메시지",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
      description: "너비 크기",
    },
  },
}

export default meta
type Story = StoryObj<typeof FileUpload>

/** 단일 파일 업로드 (기본) */
export const Single: Story = {
  render: (args) => {
    const [files, setFiles] = useState<File[]>([])
    return (
      <FileUpload
        {...args}
        files={files}
        onChange={setFiles}
        size="lg"
      />
    )
  },
  args: {
    label: "제품 이미지",
    maxFiles: 1,
    accept: "image/jpg,image/jpeg,image/png",
  },
}

/** 다중 파일 업로드 */
export const Multiple: Story = {
  render: (args) => {
    const [files, setFiles] = useState<File[]>([])
    return (
      <FileUpload
        {...args}
        files={files}
        onChange={setFiles}
        size="lg"
      />
    )
  },
  args: {
    label: "첨부파일",
    maxFiles: 3,
    accept: "image/jpg,image/jpeg,image/png,application/pdf",
  },
}

/** 커스텀 도움말 */
export const CustomHelperText: Story = {
  render: (args) => {
    const [files, setFiles] = useState<File[]>([])
    return (
      <FileUpload
        {...args}
        files={files}
        onChange={setFiles}
        size="lg"
      />
    )
  },
  args: {
    label: "문서 업로드",
    maxFiles: 5,
    accept: "application/pdf",
    helperText: "*PDF 파일만 업로드 가능합니다.\n*최대 5개까지 첨부 가능합니다.",
  },
}

/** 에러 상태 */
export const Error: Story = {
  render: (args) => {
    const [files, setFiles] = useState<File[]>([])
    return (
      <FileUpload
        {...args}
        files={files}
        onChange={setFiles}
        size="lg"
      />
    )
  },
  args: {
    label: "첨부파일",
    maxFiles: 1,
    error: true,
    errorMessage: "필수 항목입니다.",
  },
}

/** 비활성화 상태 */
export const Disabled: Story = {
  render: (args) => {
    const [files, setFiles] = useState<File[]>([])
    return (
      <FileUpload
        {...args}
        files={files}
        onChange={setFiles}
        size="lg"
      />
    )
  },
  args: {
    label: "첨부파일",
    maxFiles: 1,
    disabled: true,
  },
}

/** 사이즈 비교 */
export const Sizes: Story = {
  render: () => {
    const [smFiles, setSmFiles] = useState<File[]>([])
    const [mdFiles, setMdFiles] = useState<File[]>([])
    const [lgFiles, setLgFiles] = useState<File[]>([])
    const [fullFiles, setFullFiles] = useState<File[]>([])

    return (
      <div className="flex flex-col gap-6 w-[500px]">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">sm (160px)</span>
          <FileUpload
            label="첨부파일"
            files={smFiles}
            onChange={setSmFiles}
            size="sm"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">md (260px)</span>
          <FileUpload
            label="첨부파일"
            files={mdFiles}
            onChange={setMdFiles}
            size="md"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">lg (360px)</span>
          <FileUpload
            label="첨부파일"
            files={lgFiles}
            onChange={setLgFiles}
            size="lg"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">full (100%)</span>
          <FileUpload
            label="첨부파일"
            files={fullFiles}
            onChange={setFullFiles}
            size="full"
          />
        </div>
      </div>
    )
  },
}

/** 모든 상태 비교 */
export const AllStates: Story = {
  render: () => {
    const [singleFiles, setSingleFiles] = useState<File[]>([])
    const [multiFiles, setMultiFiles] = useState<File[]>([])

    return (
      <div className="flex flex-col gap-8 w-[360px]">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">단일 파일 업로드</span>
          <FileUpload
            label="제품 이미지"
            files={singleFiles}
            onChange={setSingleFiles}
            maxFiles={1}
            accept="image/jpg,image/jpeg,image/png"
            size="full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">다중 파일 업로드 (최대 3개)</span>
          <FileUpload
            label="첨부파일"
            files={multiFiles}
            onChange={setMultiFiles}
            maxFiles={3}
            accept="image/jpg,image/jpeg,image/png,application/pdf"
            size="full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">에러 상태</span>
          <FileUpload
            label="필수 첨부파일"
            files={[]}
            onChange={() => {}}
            error
            errorMessage="파일을 선택해주세요."
            size="full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700">비활성화 상태</span>
          <FileUpload
            label="첨부파일"
            files={[]}
            onChange={() => {}}
            disabled
            size="full"
          />
        </div>
      </div>
    )
  },
}
