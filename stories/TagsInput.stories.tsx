import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TagsInput } from "../src/components/ui/tags-input";

const meta: Meta<typeof TagsInput> = {
  title: "Components/TagsInput",
  component: TagsInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
      description: "너비 크기",
    },
    label: {
      control: "text",
      description: "라벨 텍스트",
    },
    placeholder: {
      control: "text",
      description: "placeholder",
    },
    error: {
      control: "boolean",
      description: "에러 상태",
    },
    errorMessage: {
      control: "text",
      description: "에러 메시지",
    },
    required: {
      control: "boolean",
      description: "필수 입력 표시",
    },
    disabled: {
      control: "boolean",
      description: "비활성화",
    },
    maxTags: {
      control: "number",
      description: "최대 칩 개수",
    },
    allowDuplicates: {
      control: "boolean",
      description: "중복 허용 여부",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TagsInput>;

/** 기본 (uncontrolled) */
export const Default: Story = {
  args: {
    label: "태그",
    placeholder: "Enter 또는 쉼표로 추가",
    size: "md",
  },
};

/** 초기 값이 있는 경우 */
export const WithDefaultValue: Story = {
  args: {
    label: "판매페이지 번호",
    placeholder: "번호 입력 후 Enter",
    defaultValue: ["12345", "67890"],
    size: "md",
  },
};

/** Controlled */
export const Controlled: Story = {
  render: (args) => {
    const [tags, setTags] = useState<string[]>(["apple", "banana"]);
    return (
      <div className="flex flex-col gap-3">
        <TagsInput {...args} value={tags} onValueChange={setTags} />
        <div className="text-xs text-slate-600">
          현재 값: {JSON.stringify(tags)}
        </div>
      </div>
    );
  },
  args: {
    label: "과일",
    placeholder: "과일 이름 입력",
    size: "md",
  },
};

/** 필수 입력 표시 */
export const Required: Story = {
  args: {
    label: "판매페이지 번호",
    placeholder: "번호 입력",
    required: true,
    size: "md",
  },
};

/** 에러 상태 */
export const Error: Story = {
  args: {
    label: "판매페이지 번호",
    placeholder: "번호 입력",
    error: true,
    errorMessage: "최소 1개 이상 입력해주세요.",
    size: "md",
  },
};

/** 비활성화 */
export const Disabled: Story = {
  args: {
    label: "태그",
    defaultValue: ["read-only", "값", "수정 불가"],
    disabled: true,
    size: "md",
  },
};

/** 최대 개수 제한 */
export const MaxTags: Story = {
  args: {
    label: "최대 3개까지",
    placeholder: "3개까지 입력 가능",
    maxTags: 3,
    size: "md",
  },
};

/** 중복 허용 */
export const AllowDuplicates: Story = {
  args: {
    label: "중복 허용",
    placeholder: "같은 값 여러 번 입력 가능",
    allowDuplicates: true,
    size: "md",
  },
};

/** 최대 높이 + 내부 스크롤 */
export const MaxHeight: Story = {
  args: {
    label: "최대 높이 100px",
    placeholder: "많이 입력해보세요",
    defaultValue: [
      "12345",
      "67890",
      "11111",
      "22222",
      "33333",
      "44444",
      "55555",
      "66666",
      "77777",
      "88888",
    ],
    maxHeight: 100,
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "maxHeight 를 설정하면 칩이 많아져도 컨테이너가 무한정 늘어나지 않고 내부에서 세로 스크롤됩니다.",
      },
    },
  },
};

/** 줄바꿈/쉼표 포함 텍스트 붙여넣기 */
export const PasteDelimited: Story = {
  args: {
    label: "다건 붙여넣기",
    placeholder: "쉼표/줄바꿈 포함 텍스트 붙여넣기",
    size: "lg",
  },
  parameters: {
    docs: {
      description: {
        story:
          "쉼표(,) 또는 줄바꿈으로 구분된 텍스트를 붙여넣으면 자동으로 분리되어 칩으로 추가됩니다.",
      },
    },
  },
};

/** 크기 비교 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <TagsInput
        label="Small"
        size="sm"
        defaultValue={["S"]}
        placeholder="입력"
      />
      <TagsInput
        label="Medium"
        size="md"
        defaultValue={["M"]}
        placeholder="입력"
      />
      <TagsInput
        label="Large"
        size="lg"
        defaultValue={["L"]}
        placeholder="입력"
      />
      <TagsInput
        label="Full"
        size="full"
        defaultValue={["Full"]}
        placeholder="입력"
      />
    </div>
  ),
};
