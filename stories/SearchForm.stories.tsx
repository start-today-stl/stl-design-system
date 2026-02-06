import type { Meta, StoryObj } from "@storybook/react";
import { Search } from "lucide-react";
import { SearchForm } from "@/components/patterns/search-form";
import { InputField } from "@/components/ui/input";
import { Dropdown } from "@/components/ui/dropdown";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Patterns/SearchForm",
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
          <Button variant="action" className="w-24">초기화</Button>
          <Button className="w-24">
            <Search className="mr-2 h-4 w-4" />
            검색
          </Button>
        </>
      }
    >
      <InputField label="상품명" placeholder="상품명을 입력하세요" />
      <InputField label="SKU" placeholder="SKU를 입력하세요" />
      <Dropdown
        label="카테고리"
        placeholder="카테고리 선택"
        options={[
          { label: "전자제품", value: "electronics" },
          { label: "의류", value: "clothing" },
          { label: "식품", value: "food" },
        ]}
      />
      <Dropdown
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
          <Button variant="action">초기화</Button>
          <Button>검색</Button>
        </>
      }
    >
      <InputField label="검색어" placeholder="검색어를 입력하세요" />
      <Dropdown
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

