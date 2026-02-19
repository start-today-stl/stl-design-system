import type { Meta, StoryObj } from "@storybook/react"
import {
  FormCard,
  FormHeader,
  FormContent,
  FormColumn,
  FormSection,
  FormRow,
  FormFooter,
  InputField,
  Select,
  Button,
  Switch,
} from "../src/components"

const meta: Meta<typeof FormCard> = {
  title: "Form/FormCard",
  component: FormCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof FormCard>

/** 기본 1열 레이아웃 */
export const SingleColumn: Story = {
  render: () => (
    <FormCard>
      <FormContent columns={1}>
        <FormColumn>
          <FormSection title="기본 정보">
            <FormRow>
              <InputField label="이름" placeholder="이름을 입력하세요" />
            </FormRow>
            <FormRow>
              <InputField label="이메일" type="email" placeholder="이메일을 입력하세요" />
            </FormRow>
          </FormSection>

          <FormSection title="추가 정보" divider>
            <FormRow columns={2}>
              <InputField label="연락처" placeholder="010-0000-0000" />
              <InputField label="부서" placeholder="부서명" />
            </FormRow>
          </FormSection>
        </FormColumn>
      </FormContent>
      <FormFooter>
        <Button variant="ghost">취소</Button>
        <Button variant="primary">저장</Button>
      </FormFooter>
    </FormCard>
  ),
}

/** 2열 레이아웃 (Figma 디자인 참고) */
export const TwoColumns: Story = {
  render: () => (
    <FormCard className="max-w-[1036px]">
      <FormContent columns={2}>
        {/* 왼쪽 열 */}
        <FormColumn>
          <FormSection title="식별 정보">
            <FormRow>
              <InputField label="SKU" placeholder="SKU 입력" />
            </FormRow>
            <FormRow columns={2}>
              <InputField label="바코드" placeholder="바코드 입력" />
              <InputField label="상품 참조 번호" placeholder="참조 번호 입력" />
            </FormRow>
          </FormSection>

          <FormSection title="상품 기본 정보" divider>
            <FormRow>
              <InputField label="상품명" placeholder="상품명 입력" />
            </FormRow>
            <FormRow columns={2}>
              <InputField label="상품명 (일문)" placeholder="일본어 상품명" />
              <InputField label="상품명 (영문)" placeholder="영어 상품명" />
            </FormRow>
            <FormRow>
              <InputField label="브랜드명" placeholder="브랜드명 입력" />
            </FormRow>
            <FormRow columns={3}>
              <Select
                label="카테고리"
                placeholder="대분류"
                options={[
                  { label: "의류", value: "clothing" },
                  { label: "잡화", value: "accessories" },
                ]}
              />
              <Select
                placeholder="중분류"
                reserveLabelSpace
                aria-label="중분류 선택"
                options={[
                  { label: "상의", value: "top" },
                  { label: "하의", value: "bottom" },
                ]}
              />
              <Select
                placeholder="소분류"
                reserveLabelSpace
                aria-label="소분류 선택"
                options={[
                  { label: "티셔츠", value: "tshirt" },
                  { label: "셔츠", value: "shirt" },
                ]}
              />
            </FormRow>
          </FormSection>

          <FormSection title="치수 및 무게 정보" divider>
            <FormRow columns={4}>
              <InputField label="제품 사이즈 (CM)" placeholder="가로" />
              <InputField placeholder="세로" reserveLabelSpace />
              <InputField placeholder="높이" reserveLabelSpace />
              <InputField label="제품 무게 (KG)" placeholder="무게" />
            </FormRow>
          </FormSection>
        </FormColumn>

        {/* 오른쪽 열 */}
        <FormColumn>
          <FormSection title="판매 정보">
            <FormRow>
              <Select
                label="상품 상태"
                placeholder="선택"
                options={[
                  { label: "판매중", value: "active" },
                  { label: "품절", value: "soldout" },
                  { label: "판매중지", value: "inactive" },
                ]}
              />
            </FormRow>
            <FormRow columns={2}>
              <InputField label="판매 가격" placeholder="가격 입력" />
              <Select
                label="통화단위"
                placeholder="Option"
                options={[
                  { label: "KRW", value: "krw" },
                  { label: "USD", value: "usd" },
                  { label: "JPY", value: "jpy" },
                ]}
              />
            </FormRow>
            <FormRow>
              <div className="flex items-center gap-3">
                <span className="text-xs text-text-secondary">유통일로부터</span>
                <InputField placeholder="30" className="w-[128px]" />
                <span className="text-xs text-text-secondary">일 전까지</span>
              </div>
            </FormRow>
            <FormRow>
              <div className="flex items-center gap-3">
                <Switch aria-label="해외 판매 상품" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-text-secondary">해외 판매 상품</span>
                  <span className="text-[10px] text-text-secondary">
                    해외로 판매하는 상품일 경우 활성화
                  </span>
                </div>
              </div>
            </FormRow>
          </FormSection>

          <FormSection title="옵션 및 포장 정보" divider>
            <FormRow columns={2}>
              <InputField label="색상 및 옵션" placeholder="옵션 입력" />
              <InputField label="소재 및 성분" placeholder="소재 입력" />
            </FormRow>
            <FormRow>
              <InputField label="내품 수량" placeholder="수량 입력" />
            </FormRow>
            <FormRow>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-text-secondary">입고 시 입수량</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-text-secondary">1 PLT</span>
                  <InputField placeholder="수량" className="w-[160px]" />
                  <span className="text-xs text-text-secondary">1 BOX</span>
                  <InputField placeholder="수량" className="w-[160px]" />
                </div>
              </div>
            </FormRow>
          </FormSection>
        </FormColumn>
      </FormContent>
      <FormFooter>
        <Button variant="ghost" className="w-[160px]">취소</Button>
        <Button variant="primary" className="w-[160px]">등록</Button>
      </FormFooter>
    </FormCard>
  ),
}

/** 헤더 포함 */
export const WithHeader: Story = {
  render: () => (
    <FormCard className="max-w-[600px]">
      <FormHeader title="상품 등록" />
      <FormContent hasHeader>
        <FormColumn>
          <FormSection title="기본 정보">
            <FormRow>
              <InputField label="상품명" placeholder="상품명을 입력하세요" />
            </FormRow>
            <FormRow columns={2}>
              <InputField label="가격" placeholder="0" />
              <InputField label="재고" placeholder="0" />
            </FormRow>
          </FormSection>
        </FormColumn>
      </FormContent>
      <FormFooter>
        <Button variant="ghost">취소</Button>
        <Button variant="primary">등록</Button>
      </FormFooter>
    </FormCard>
  ),
}

/** 접기/펼치기 섹션 */
export const CollapsibleSections: Story = {
  render: () => (
    <FormCard className="max-w-[600px]">
      <FormContent>
        <FormColumn>
          <FormSection title="필수 정보" collapsible>
            <FormRow>
              <InputField label="이름" placeholder="필수 입력" />
            </FormRow>
            <FormRow>
              <InputField label="이메일" placeholder="필수 입력" />
            </FormRow>
          </FormSection>

          <FormSection title="선택 정보" collapsible defaultCollapsed divider>
            <FormRow>
              <InputField label="별명" placeholder="선택 입력" />
            </FormRow>
            <FormRow>
              <InputField label="소개" placeholder="선택 입력" />
            </FormRow>
          </FormSection>
        </FormColumn>
      </FormContent>
      <FormFooter>
        <Button variant="ghost">취소</Button>
        <Button variant="primary">저장</Button>
      </FormFooter>
    </FormCard>
  ),
}

/** 푸터 없음 */
export const WithoutFooter: Story = {
  render: () => (
    <FormCard className="max-w-[600px]">
      <FormContent hasFooter={false}>
        <FormColumn>
          <FormSection title="읽기 전용 정보">
            <FormRow>
              <InputField label="등록일" value="2024-01-15" disabled />
            </FormRow>
            <FormRow>
              <InputField label="수정일" value="2024-01-20" disabled />
            </FormRow>
          </FormSection>
        </FormColumn>
      </FormContent>
    </FormCard>
  ),
}
