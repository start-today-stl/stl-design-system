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
    type: {
      control: "select",
      options: ["text", "email", "phone", "money", "date"],
      description: "값 타입에 따른 자동 포맷팅",
    },
    textOverflow: {
      control: "select",
      options: ["wrap", "ellipsis", "truncate"],
      description: "텍스트 오버플로우 처리",
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
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
      <DisplayField label="메모" value="" />
      <DisplayField label="비고" value={null} emptyText="없음" />
      <DisplayField label="설명" value={undefined} emptyText="입력된 내용이 없습니다" />
    </div>
  ),
}

/** 타입별 포맷팅 */
export const TypeFormatting: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
      <DisplayField label="일반 텍스트" value="Hello World" type="text" />
      <DisplayField label="이메일" value="test@example.com" type="email" />
      <DisplayField label="전화번호" value="01012345678" type="phone" />
      <DisplayField label="금액" value={15000} type="money" />
      <DisplayField label="날짜" value="2024-03-15" type="date" />
    </div>
  ),
}

/** 복사 기능 */
export const Copyable: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
      <DisplayField
        label="주문번호"
        value="ORD-2024-001234"
        copyable
        onCopy={(value) => console.log("Copied:", value)}
      />
      <DisplayField label="이메일" value="customer@example.com" type="email" copyable />
      <DisplayField label="빈 값은 복사 불가" value="" copyable />
    </div>
  ),
}

/** 텍스트 오버플로우 */
export const TextOverflow: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "200px" }}>
      <div>
        <span style={{ fontSize: "12px", color: "#666", marginBottom: "4px", display: "block" }}>
          wrap (기본)
        </span>
        <DisplayField
          label="상품명"
          value="아주 긴 상품명이 들어가면 자동으로 줄바꿈이 됩니다. 여러 줄로 표시될 수 있습니다."
          textOverflow="wrap"
        />
      </div>
      <div>
        <span style={{ fontSize: "12px", color: "#666", marginBottom: "4px", display: "block" }}>
          ellipsis
        </span>
        <DisplayField
          label="상품명"
          value="아주 긴 상품명이 들어가면 말줄임표로 처리됩니다..."
          textOverflow="ellipsis"
        />
      </div>
      <div>
        <span style={{ fontSize: "12px", color: "#666", marginBottom: "4px", display: "block" }}>
          truncate
        </span>
        <DisplayField
          label="상품명"
          value="아주 긴 상품명이 들어가면 잘립니다."
          textOverflow="truncate"
        />
      </div>
    </div>
  ),
}

/** 도움말 텍스트 */
export const WithHelper: Story = {
  args: {
    label: "SKU",
    value: "SKU-12345",
    helper: "상품 고유 식별 코드입니다",
  },
}

/** 커스텀 렌더러 */
export const CustomRenderer: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", width: "300px" }}>
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
          <span style={{ color: "#1a73e8", fontWeight: "bold" }}>{value}원</span>
        )}
      />
    </div>
  ),
}

/** 너비 사이즈 - InputField와 비교 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
        <InputField label="Small (160px)" defaultValue="InputField" size="sm" />
        <DisplayField label="Small (160px)" value="DisplayField" size="sm" className="bg-slate-50 rounded px-2" />
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
        <InputField label="Medium (260px)" defaultValue="InputField" size="md" />
        <DisplayField label="Medium (260px)" value="DisplayField" size="md" className="bg-slate-50 rounded px-2" />
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
        <InputField label="Large (360px)" defaultValue="InputField" size="lg" />
        <DisplayField label="Large (360px)" value="DisplayField" size="lg" className="bg-slate-50 rounded px-2" />
      </div>
      <div style={{ width: "800px", display: "flex", gap: "16px" }}>
        <InputField label="Full (부모 너비)" defaultValue="InputField" size="full" />
        <DisplayField label="Full (부모 너비)" value="DisplayField" size="full" className="bg-slate-50 rounded px-2" />
      </div>
    </div>
  ),
}

/** Edit Mode vs View Mode 토글 예시 */
export const EditViewModeToggle: Story = {
  render: function EditViewModeExample() {
    const [isEditMode, setIsEditMode] = React.useState(false)
    const [formData, setFormData] = React.useState({
      productName: "테스트 상품 A",
      price: 15000,
      phone: "01012345678",
      description: "상품 설명입니다.",
    })

    return (
      <div style={{ width: "600px" }}>
        <div style={{ marginBottom: "16px", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
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
                      required
                      size="full"
                    />
                  ) : (
                    <DisplayField label="가격" value={formData.price} type="money" required />
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
                <FormRow>
                  {isEditMode ? (
                    <InputField
                      label="설명"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      size="full"
                    />
                  ) : (
                    <DisplayField label="설명" value={formData.description} />
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

/** 상세 화면 레이아웃 예시 */
export const DetailViewExample: Story = {
  render: () => (
    <div style={{ width: "800px" }}>
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
                <DisplayField label="바코드" value="8801234567890" copyable />
              </FormRow>
              <FormRow>
                <DisplayField label="판매가" value={89000} type="money" />
              </FormRow>
              <FormRow>
                <DisplayField label="등록일" value="2024-03-15T10:30:00" type="date" />
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
                <DisplayField label="이메일" value="seller@example.com" type="email" copyable />
              </FormRow>
              <FormRow>
                <DisplayField
                  label="상태"
                  value="active"
                  renderValue={() => <Badge variant="success-solid">판매중</Badge>}
                />
              </FormRow>
              <FormRow>
                <DisplayField label="비고" value="" emptyText="등록된 비고가 없습니다" />
              </FormRow>
            </FormSection>
          </FormColumn>
        </FormContent>
      </FormCard>
    </div>
  ),
}

/** InputField와 비교 */
export const CompareWithInputField: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "48px", width: "600px" }}>
      <div style={{ flex: 1 }}>
        <span style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "16px", display: "block" }}>
          Edit Mode (InputField)
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <InputField label="상품명" defaultValue="테스트 상품" required size="full" />
          <InputField label="가격" defaultValue="15000" size="full" />
          <InputField label="연락처" defaultValue="01012345678" size="full" />
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <span style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "16px", display: "block" }}>
          View Mode (DisplayField)
        </span>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <DisplayField label="상품명" value="테스트 상품" required />
          <DisplayField label="가격" value={15000} type="money" />
          <DisplayField label="연락처" value="01012345678" type="phone" copyable />
        </div>
      </div>
    </div>
  ),
}
