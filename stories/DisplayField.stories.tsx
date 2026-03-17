import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import { DisplayField } from "../src/components/form/display-field"
import { InputField } from "../src/components/ui/input"
import { FormCard, FormContent, FormColumn, FormSection, FormRow } from "../src/components/form"
import { Button } from "../src/components/ui/button"
import { Badge } from "../src/components/ui/badge"

const meta = {
  title: "Form/DisplayField",
  component: DisplayField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    layout: {
      control: "select",
      options: ["vertical", "horizontal"],
      description: "레이아웃 방향",
    },
    labelWidth: {
      control: "number",
      description: "라벨 너비 (horizontal에서만 적용)",
    },
    type: {
      control: "select",
      options: ["text", "email", "phone", "number", "date"],
      description: "값 타입에 따른 자동 포맷팅",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "full"],
      description: "너비 크기",
    },
    copyable: {
      control: "boolean",
      description: "복사 버튼 표시",
    },
    required: {
      control: "boolean",
      description: "필수 필드 표시",
    },
  },
} satisfies Meta<typeof DisplayField>

export default meta
type Story = StoryObj<typeof meta>

// ============================================
// 기본 (Basic)
// ============================================

/** 기본 사용 */
export const Default: Story = {
  args: {
    label: "상품명",
    value: "테스트 상품 A",
  },
}

/** 필수 필드 표시 */
export const Required: Story = {
  args: {
    label: "상품명",
    value: "테스트 상품 A",
    required: true,
  },
}

/** 빈 값 처리 */
export const EmptyValue: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[300px]">
      <DisplayField label="메모" value="" />
      <DisplayField label="비고" value={null} emptyText="없음" />
      <DisplayField label="설명" value={undefined} emptyText="입력된 내용이 없습니다" />
    </div>
  ),
}

// ============================================
// 레이아웃 (Layout)
// ============================================

/** Horizontal 레이아웃 */
export const Horizontal: Story = {
  args: {
    label: "상품명",
    value: "테스트 상품 A",
    layout: "horizontal",
  },
}

/** Vertical vs Horizontal 비교 */
export const LayoutComparison: Story = {
  render: () => (
    <div className="flex gap-12">
      <div className="flex flex-col gap-3 w-[280px]">
        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Vertical (기본)</span>
        <DisplayField label="상품명" value="테스트 상품 A" />
        <DisplayField label="가격" value={15000} type="number" suffix="원" />
        <DisplayField label="등록일" value="2024-03-15" type="date" />
      </div>
      <div className="flex flex-col gap-3 w-[280px]">
        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Horizontal</span>
        <DisplayField label="상품명" value="테스트 상품 A" layout="horizontal" />
        <DisplayField label="가격" value={15000} type="number" suffix="원" layout="horizontal" />
        <DisplayField label="등록일" value="2024-03-15" type="date" layout="horizontal" />
      </div>
    </div>
  ),
}

/** Horizontal - 라벨 너비 조절 */
export const HorizontalLabelWidth: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[350px]">
      <div className="flex flex-col gap-2">
        <span className="text-xs text-slate-500">labelWidth=80</span>
        <DisplayField label="상품명" value="테스트 상품" layout="horizontal" labelWidth={80} />
        <DisplayField label="가격" value={15000} type="number" suffix="원" layout="horizontal" labelWidth={80} />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs text-slate-500">labelWidth=120</span>
        <DisplayField label="상품명" value="테스트 상품" layout="horizontal" labelWidth={120} />
        <DisplayField label="가격" value={15000} type="number" suffix="원" layout="horizontal" labelWidth={120} />
      </div>
    </div>
  ),
}

// ============================================
// 타입 & 포맷팅 (Type & Formatting)
// ============================================

/** 타입별 포맷팅 */
export const TypeFormatting: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[300px]">
      <DisplayField label="일반 텍스트" value="Hello World" type="text" />
      <DisplayField label="이메일" value="test@example.com" type="email" />
      <DisplayField label="전화번호" value="01012345678" type="phone" />
      <DisplayField label="숫자" value={1234567} type="number" />
      <DisplayField label="금액" value={15000} type="number" suffix="원" />
      <DisplayField label="날짜" value="2024-03-15" type="date" />
    </div>
  ),
}

/** prefix/suffix 사용 */
export const PrefixSuffix: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[300px]">
      <DisplayField label="원화" value={15000} type="number" prefix="₩" />
      <DisplayField label="달러" value={15000} type="number" prefix="$" />
      <DisplayField label="재고량" value={12500} type="number" suffix="개" />
      <DisplayField label="할인율" value={15} type="number" suffix="%" />
    </div>
  ),
}

/** 복사 기능 */
export const Copyable: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[300px]">
      <DisplayField label="주문번호" value="ORD-2024-001234" copyable />
      <DisplayField label="이메일" value="customer@example.com" type="email" copyable />
    </div>
  ),
}

/** 커스텀 렌더러 */
export const CustomRenderer: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-[300px]">
      <DisplayField
        label="상태"
        value="active"
        renderValue={(value) => (
          <Badge variant={value === "active" ? "success-solid" : "danger-light"}>
            {value === "active" ? "활성" : "비활성"}
          </Badge>
        )}
      />
      <DisplayField
        label="가격"
        value={15000}
        renderValue={(value) => (
          <span className="text-blue-600 font-bold">{value}원</span>
        )}
      />
    </div>
  ),
}

// ============================================
// FormCard 레이아웃 예시
// ============================================

/** FormCard - Vertical 레이아웃 (기본) */
export const FormCardVertical: Story = {
  render: () => (
    <div className="w-[700px]">
      <FormCard>
        <FormContent columns={2}>
          <FormColumn>
            <FormSection title="상품 정보">
              <FormRow>
                <DisplayField label="상품명" value="프리미엄 무선 이어폰" required />
              </FormRow>
              <FormRow>
                <DisplayField label="상품코드" value="SKU-2024-001234" copyable />
              </FormRow>
              <FormRow>
                <DisplayField label="판매가" value={89000} type="number" suffix="원" />
              </FormRow>
            </FormSection>
          </FormColumn>
          <FormColumn>
            <FormSection title="판매자 정보">
              <FormRow>
                <DisplayField label="판매자명" value="테스트 셀러" />
              </FormRow>
              <FormRow>
                <DisplayField label="연락처" value="01012345678" type="phone" copyable />
              </FormRow>
              <FormRow>
                <DisplayField
                  label="상태"
                  value="active"
                  renderValue={() => <Badge variant="success-solid">판매중</Badge>}
                />
              </FormRow>
            </FormSection>
          </FormColumn>
        </FormContent>
      </FormCard>
    </div>
  ),
}

/** FormCard - Horizontal 레이아웃 */
export const FormCardHorizontal: Story = {
  render: () => (
    <div className="w-[700px]">
      <FormCard>
        <FormContent columns={2}>
          <FormColumn>
            <FormSection title="상품 정보">
              <FormRow>
                <DisplayField label="상품명" value="프리미엄 무선 이어폰" layout="horizontal" labelWidth={80} required />
              </FormRow>
              <FormRow>
                <DisplayField label="상품코드" value="SKU-2024-001234" layout="horizontal" labelWidth={80} copyable />
              </FormRow>
              <FormRow>
                <DisplayField label="판매가" value={89000} type="number" suffix="원" layout="horizontal" labelWidth={80} />
              </FormRow>
              <FormRow>
                <DisplayField label="등록일" value="2024-03-15" type="date" layout="horizontal" labelWidth={80} />
              </FormRow>
            </FormSection>
          </FormColumn>
          <FormColumn>
            <FormSection title="판매자 정보">
              <FormRow>
                <DisplayField label="판매자명" value="테스트 셀러" layout="horizontal" labelWidth={80} />
              </FormRow>
              <FormRow>
                <DisplayField label="연락처" value="01012345678" type="phone" layout="horizontal" labelWidth={80} copyable />
              </FormRow>
              <FormRow>
                <DisplayField label="이메일" value="seller@example.com" type="email" layout="horizontal" labelWidth={80} />
              </FormRow>
              <FormRow>
                <DisplayField
                  label="상태"
                  value="active"
                  layout="horizontal"
                  labelWidth={80}
                  renderValue={() => <Badge variant="success-solid">판매중</Badge>}
                />
              </FormRow>
            </FormSection>
          </FormColumn>
        </FormContent>
      </FormCard>
    </div>
  ),
}

/** Edit Mode vs View Mode 토글 */
export const EditViewModeToggle: Story = {
  render: function EditViewModeExample() {
    const [isEditMode, setIsEditMode] = React.useState(false)
    const [formData, setFormData] = React.useState({
      productName: "테스트 상품 A",
      price: 15000,
      phone: "01012345678",
    })

    return (
      <div className="w-[500px]">
        <div className="mb-4 flex justify-end gap-2">
          <Button
            variant={isEditMode ? "ghost-outline" : "primary"}
            size="sm"
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? "취소" : "수정"}
          </Button>
          {isEditMode && (
            <Button variant="primary" size="sm" onClick={() => setIsEditMode(false)}>
              저장
            </Button>
          )}
        </div>

        <FormCard>
          <FormContent>
            <FormColumn>
              <FormSection title="기본 정보">
                <FormRow>
                  {isEditMode ? (
                    <InputField
                      label="상품명"
                      value={formData.productName}
                      onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                      required
                      size="full"
                    />
                  ) : (
                    <DisplayField label="상품명" value={formData.productName} required />
                  )}
                </FormRow>
                <FormRow>
                  {isEditMode ? (
                    <InputField
                      label="가격"
                      value={String(formData.price)}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      size="full"
                    />
                  ) : (
                    <DisplayField label="가격" value={formData.price} type="number" suffix="원" />
                  )}
                </FormRow>
                <FormRow>
                  {isEditMode ? (
                    <InputField
                      label="연락처"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      size="full"
                    />
                  ) : (
                    <DisplayField label="연락처" value={formData.phone} type="phone" copyable />
                  )}
                </FormRow>
              </FormSection>
            </FormColumn>
          </FormContent>
        </FormCard>
      </div>
    )
  },
}
