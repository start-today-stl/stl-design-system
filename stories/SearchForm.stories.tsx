import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchForm } from "../src/components/table";
import { SearchIcon } from "@/icons";
import { Input, InputField } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input-group";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ToggleGroup } from "@/components/ui/toggle-group";

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

/** 필드 6개 이상 (2줄 레이아웃) */
export const ManyFields: Story = {
  render: () => (
    <SearchForm
      title="주문 검색"
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
      <InputField label="주문번호" placeholder="주문번호 입력" />
      <InputField label="주문자명" placeholder="주문자명 입력" />
      <InputField label="수령인" placeholder="수령인 입력" />
      <Select
        label="주문상태"
        placeholder="상태 선택"
        options={[
          { label: "전체", value: "all" },
          { label: "결제완료", value: "paid" },
          { label: "배송준비", value: "preparing" },
          { label: "배송중", value: "shipping" },
          { label: "배송완료", value: "delivered" },
        ]}
      />
      <Select
        label="결제수단"
        placeholder="결제수단 선택"
        options={[
          { label: "전체", value: "all" },
          { label: "신용카드", value: "card" },
          { label: "계좌이체", value: "bank" },
          { label: "간편결제", value: "easy" },
        ]}
      />
      <InputField label="연락처" placeholder="연락처 입력" />
    </SearchForm>
  ),
};

/** Select + ToggleGroup + InputGroup 조합 (검색 버튼 인풋에 붙임) */
export const WithToggleGroup: Story = {
  render: () => {
    const [status, setStatus] = useState("all")

    return (
      <SearchForm title="상품 검색">
        <Select
          label="카테고리"
          placeholder="카테고리 선택"
          options={[
            { label: "전체", value: "all" },
            { label: "전자제품", value: "electronics" },
            { label: "의류", value: "clothing" },
            { label: "식품", value: "food" },
          ]}
        />
        <ToggleGroup
          label="상태"
          value={status}
          onValueChange={setStatus}
          options={[
            { label: "전체", value: "all" },
            { label: "판매중", value: "active" },
            { label: "품절", value: "soldout" },
          ]}
        />
        <InputGroup label="검색어">
          <Input placeholder="상품명 또는 SKU" className="flex-1" />
          <Button aria-label="검색">
            <SearchIcon size={16} />
          </Button>
        </InputGroup>
      </SearchForm>
    )
  },
};

