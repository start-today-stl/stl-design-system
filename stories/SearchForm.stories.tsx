import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchForm } from "../src/components/table";
import { SearchIcon } from "@/icons";
import { InputField } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Table/SearchForm",
  component: SearchForm,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "폼 제목",
    },
  },
} satisfies Meta<typeof SearchForm>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본 검색폼 (필드 + 버튼 구성) */
export const Default: Story = {
  render: () => (
    <SearchForm
      title="상품 관리"
      actions={
        <>
          <Button variant="ghost-outline" className="w-24">초기화</Button>
          <Button className="w-24">
            <SearchIcon size={16} className="mr-2" />
            검색
          </Button>
        </>
      }
    >
      <InputField label="상품명" placeholder="상품명을 입력하세요" />
      <InputField label="SKU" placeholder="SKU를 입력하세요" />
      <Select
        label="카테고리"
        placeholder="카테고리 선택"
        options={[
          { label: "전자제품", value: "electronics" },
          { label: "의류", value: "clothing" },
          { label: "식품", value: "food" },
        ]}
      />
      <Select
        label="상태"
        placeholder="상태 선택"
        options={[
          { label: "판매중", value: "active" },
          { label: "품절", value: "soldout" },
          { label: "단종", value: "discontinued" },
        ]}
      />
    </SearchForm>
  ),
};

/** 제목 없는 검색폼 */
export const WithoutTitle: Story = {
  render: () => (
    <SearchForm
      actions={
        <>
          <Button variant="ghost-outline">초기화</Button>
          <Button>검색</Button>
        </>
      }
    >
      <InputField label="검색어" placeholder="검색어를 입력하세요" />
      <Select
        label="분류"
        placeholder="분류 선택"
        options={[
          { label: "옵션 1", value: "option1" },
          { label: "옵션 2", value: "option2" },
        ]}
      />
    </SearchForm>
  ),
};

