import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchForm, FilterChipSummary } from "../src/components/table";
import { SearchIcon } from "@/icons";
import { Input, InputField } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input-group";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { Chip } from "@/components/ui/chip";

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

/** Flex 레이아웃 - 필드 너비에 맞게 자동 배치, 줄 초과 시 줄바꿈 */
export const FlexLayout: Story = {
  render: () => (
    <SearchForm
      layout="flex"
      actions={
        <Button variant="ghost-outline">초기화</Button>
      }
    >
      <Select
        label="조회 기준"
        size="sm"
        options={[
          { label: "등록일", value: "registered" },
          { label: "수정일", value: "modified" },
        ]}
      />
      <Select
        label="조회 기간"
        size="sm"
        options={[
          { label: "오늘", value: "today" },
          { label: "어제", value: "yesterday" },
          { label: "이번주", value: "week" },
          { label: "이번달", value: "month" },
        ]}
      />
      <Select
        label="상태"
        size="sm"
        options={[
          { label: "전체", value: "all" },
          { label: "활성", value: "active" },
          { label: "비활성", value: "inactive" },
        ]}
      />
      <Select
        label="결과"
        size="sm"
        options={[
          { label: "전체", value: "all" },
          { label: "성공", value: "success" },
          { label: "실패", value: "fail" },
        ]}
      />
      <InputGroup label="" size="lg" reserveLabelSpace>
        <Input placeholder="검색어를 입력하세요 (쉼표로 다중 검색)" className="flex-1" />
        <Button>검색</Button>
      </InputGroup>
    </SearchForm>
  ),
};

/** Flex 레이아웃 - 많은 필드 (자동 줄바꿈) */
export const FlexLayoutManyFields: Story = {
  render: () => (
    <SearchForm
      title="입고 검색"
      layout="flex"
      actions={
        <>
          <Button variant="ghost-outline">초기화</Button>
          <Button>검색</Button>
        </>
      }
    >
      <Select
        label="조회 기준"
        size="sm"
        options={[
          { label: "등록일", value: "registered" },
          { label: "입고 예정일", value: "expected" },
        ]}
      />
      <Select
        label="조회 기간"
        size="sm"
        options={[
          { label: "오늘", value: "today" },
          { label: "어제", value: "yesterday" },
          { label: "이번주", value: "week" },
          { label: "이번달", value: "month" },
        ]}
      />
      <Select
        label="메인 센터"
        size="sm"
        options={[
          { label: "전체", value: "all" },
          { label: "서울 센터", value: "seoul" },
          { label: "부산 센터", value: "busan" },
        ]}
      />
      <Select
        label="입고 상태"
        size="sm"
        options={[
          { label: "전체", value: "all" },
          { label: "등록", value: "registered" },
          { label: "입고 중", value: "inProgress" },
          { label: "완료", value: "completed" },
        ]}
      />
      <Select
        label="입고 결과"
        size="sm"
        options={[
          { label: "전체", value: "all" },
          { label: "정상", value: "normal" },
          { label: "부족", value: "shortage" },
          { label: "초과", value: "excess" },
        ]}
      />
      <InputField
        label="검색어"
        size="lg"
        placeholder="상품코드, SKU, 바코드, 상품명"
      />
    </SearchForm>
  ),
};

/** 접기/펴기 가능한 검색폼 */
export const Collapsible: Story = {
  render: () => (
    <div className="space-y-4">
      <SearchForm
        title="주문 검색"
        collapsible
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
      <p className="text-sm text-muted-foreground">
        ↑ 제목 옆 "접기/펼치기" 버튼을 클릭하여 검색 조건을 접거나 펼 수 있습니다.
      </p>
    </div>
  ),
};

/** 기본 접힌 상태로 시작 */
export const CollapsedByDefault: Story = {
  render: () => (
    <div className="space-y-4">
      <SearchForm
        title="상품 검색"
        collapsible
        defaultCollapsed
        actions={
          <>
            <Button variant="ghost-outline">초기화</Button>
            <Button>검색</Button>
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
      <p className="text-sm text-muted-foreground">
        ↑ defaultCollapsed=true로 설정하면 초기 상태가 접혀있습니다.
      </p>
    </div>
  ),
};

/** 제목 없이 접기/펴기 */
export const CollapsibleWithoutTitle: Story = {
  render: () => (
    <SearchForm
      collapsible
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

/** 접힌 상태에서 필터 칩 표시 (실제 연동) */
export const CollapsedWithFilterChips: Story = {
  render: function CollapsedWithFilterChipsExample() {
    const [category, setCategory] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [keyword, setKeyword] = useState("");

    const categoryOptions = [
      { label: "전자제품", value: "electronics" },
      { label: "의류", value: "clothing" },
      { label: "식품", value: "food" },
    ];

    const statusOptions = [
      { label: "판매중", value: "active" },
      { label: "품절", value: "soldout" },
      { label: "단종", value: "discontinued" },
    ];

    // 필터 배열 생성
    const filters = [
      category && {
        id: "category",
        label: "카테고리",
        value: categoryOptions.find((o) => o.value === category)?.label,
      },
      status && {
        id: "status",
        label: "상태",
        value: statusOptions.find((o) => o.value === status)?.label,
      },
      keyword && { id: "keyword", label: "검색어", value: keyword },
    ].filter(Boolean) as { id: string; label: string; value: string }[];

    const removeFilter = (id: string) => {
      if (id === "category") setCategory("");
      if (id === "status") setStatus("");
      if (id === "keyword") setKeyword("");
    };

    const resetAll = () => {
      setCategory("");
      setStatus("");
      setKeyword("");
    };

    return (
      <div className="space-y-4">
        <SearchForm
          collapsible
          collapsedContent={
            <div className="flex flex-wrap items-center gap-2">
              {filters.length > 0 ? (
                <>
                  {filters.map((filter) => (
                    <Chip
                      key={filter.id}
                      size="sm"
                      removable
                      onRemove={() => removeFilter(filter.id)}
                    >
                      {filter.label}: {filter.value}
                    </Chip>
                  ))}
                  <button
                    onClick={resetAll}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-2"
                  >
                    전체 초기화
                  </button>
                </>
              ) : (
                <span className="text-sm text-muted-foreground">
                  적용된 필터가 없습니다
                </span>
              )}
            </div>
          }
          actions={
            <>
              <Button variant="ghost-outline" onClick={resetAll}>
                초기화
              </Button>
              <Button>검색</Button>
            </>
          }
        >
          <Select
            label="카테고리"
            placeholder="카테고리 선택"
            value={category}
            onValueChange={setCategory}
            options={categoryOptions}
          />
          <Select
            label="상태"
            placeholder="상태 선택"
            value={status}
            onValueChange={setStatus}
            options={statusOptions}
          />
          <InputField
            label="검색어"
            placeholder="검색어 입력"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </SearchForm>
        <p className="text-sm text-muted-foreground">
          ↑ 검색 조건을 선택한 후 접으면 필터 칩이 표시됩니다.
        </p>
      </div>
    );
  },
};

/** 접힌 상태에서 많은 필터 칩 표시 (최대 3개 + 더보기) */
export const CollapsedWithManyFilters: Story = {
  render: function CollapsedWithManyFiltersExample() {
    const [category, setCategory] = useState<string>("electronics");
    const [status, setStatus] = useState<string>("active");
    const [center, setCenter] = useState<string>("seoul");
    const [payment, setPayment] = useState<string>("card");
    const [orderStatus, setOrderStatus] = useState<string>("delivered");
    const [dateRange, setDateRange] = useState<string>("month");
    const [keyword, setKeyword] = useState("갤럭시 S24");
    const [sku, setSku] = useState("SKU-2024-001234");
    const [collapsed, setCollapsed] = useState(true);

    const MAX_VISIBLE_CHIPS = 3;

    const categoryOptions = [
      { label: "전자제품", value: "electronics" },
      { label: "의류", value: "clothing" },
      { label: "식품", value: "food" },
    ];

    const statusOptions = [
      { label: "판매중", value: "active" },
      { label: "품절", value: "soldout" },
      { label: "단종", value: "discontinued" },
    ];

    const centerOptions = [
      { label: "서울 센터", value: "seoul" },
      { label: "부산 센터", value: "busan" },
      { label: "대구 센터", value: "daegu" },
    ];

    const paymentOptions = [
      { label: "신용카드", value: "card" },
      { label: "계좌이체", value: "bank" },
      { label: "간편결제", value: "easy" },
    ];

    const orderStatusOptions = [
      { label: "결제완료", value: "paid" },
      { label: "배송준비", value: "preparing" },
      { label: "배송중", value: "shipping" },
      { label: "배송완료", value: "delivered" },
    ];

    const dateRangeOptions = [
      { label: "오늘", value: "today" },
      { label: "이번주", value: "week" },
      { label: "이번달", value: "month" },
      { label: "최근 3개월", value: "quarter" },
    ];

    // 필터 배열 생성
    const filters = [
      category && {
        id: "category",
        label: "카테고리",
        value: categoryOptions.find((o) => o.value === category)?.label,
      },
      status && {
        id: "status",
        label: "상태",
        value: statusOptions.find((o) => o.value === status)?.label,
      },
      center && {
        id: "center",
        label: "센터",
        value: centerOptions.find((o) => o.value === center)?.label,
      },
      payment && {
        id: "payment",
        label: "결제수단",
        value: paymentOptions.find((o) => o.value === payment)?.label,
      },
      orderStatus && {
        id: "orderStatus",
        label: "주문상태",
        value: orderStatusOptions.find((o) => o.value === orderStatus)?.label,
      },
      dateRange && {
        id: "dateRange",
        label: "조회기간",
        value: dateRangeOptions.find((o) => o.value === dateRange)?.label,
      },
      keyword && { id: "keyword", label: "검색어", value: keyword },
      sku && { id: "sku", label: "SKU", value: sku },
    ].filter(Boolean) as { id: string; label: string; value: string }[];

    const visibleFilters = filters.slice(0, MAX_VISIBLE_CHIPS);
    const hiddenCount = filters.length - MAX_VISIBLE_CHIPS;

    const removeFilter = (id: string) => {
      if (id === "category") setCategory("");
      if (id === "status") setStatus("");
      if (id === "center") setCenter("");
      if (id === "payment") setPayment("");
      if (id === "orderStatus") setOrderStatus("");
      if (id === "dateRange") setDateRange("");
      if (id === "keyword") setKeyword("");
      if (id === "sku") setSku("");
    };

    const resetAll = () => {
      setCategory("");
      setStatus("");
      setCenter("");
      setPayment("");
      setOrderStatus("");
      setDateRange("");
      setKeyword("");
      setSku("");
    };

    return (
      <div className="space-y-4">
        <SearchForm
          collapsible
          collapsed={collapsed}
          onCollapseChange={setCollapsed}
          collapsedContent={
            <div className="flex items-center gap-2">
              {filters.length > 0 ? (
                <>
                  {visibleFilters.map((filter) => (
                    <Chip
                      key={filter.id}
                      size="sm"
                      removable
                      onRemove={() => removeFilter(filter.id)}
                    >
                      {filter.label}: {filter.value}
                    </Chip>
                  ))}
                  {hiddenCount > 0 && (
                    <Chip
                      size="sm"
                      variant="outline"
                      onClick={() => setCollapsed(false)}
                    >
                      +{hiddenCount}개
                    </Chip>
                  )}
                  <button
                    onClick={resetAll}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-2"
                  >
                    전체 초기화
                  </button>
                </>
              ) : (
                <span className="text-sm text-muted-foreground">
                  적용된 필터가 없습니다
                </span>
              )}
            </div>
          }
          actions={
            <>
              <Button variant="ghost-outline" onClick={resetAll}>
                초기화
              </Button>
              <Button>검색</Button>
            </>
          }
        >
          <Select
            label="카테고리"
            placeholder="카테고리 선택"
            value={category}
            onValueChange={setCategory}
            options={categoryOptions}
          />
          <Select
            label="상태"
            placeholder="상태 선택"
            value={status}
            onValueChange={setStatus}
            options={statusOptions}
          />
          <Select
            label="센터"
            placeholder="센터 선택"
            value={center}
            onValueChange={setCenter}
            options={centerOptions}
          />
          <Select
            label="결제수단"
            placeholder="결제수단 선택"
            value={payment}
            onValueChange={setPayment}
            options={paymentOptions}
          />
          <Select
            label="주문상태"
            placeholder="주문상태 선택"
            value={orderStatus}
            onValueChange={setOrderStatus}
            options={orderStatusOptions}
          />
          <Select
            label="조회기간"
            placeholder="조회기간 선택"
            value={dateRange}
            onValueChange={setDateRange}
            options={dateRangeOptions}
          />
          <InputField
            label="검색어"
            placeholder="검색어 입력"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <InputField
            label="SKU"
            placeholder="SKU 입력"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
        </SearchForm>
        <p className="text-sm text-muted-foreground">
          ↑ 8개 필터 중 3개만 표시, "+5개" 클릭 시 펼쳐집니다.
        </p>
      </div>
    );
  },
};

/** FilterChipSummary 컴포넌트 사용 (권장) */
export const WithFilterChipSummary: Story = {
  render: function WithFilterChipSummaryExample() {
    const [category, setCategory] = useState<string>("electronics");
    const [status, setStatus] = useState<string>("active");
    const [center, setCenter] = useState<string>("seoul");
    const [keyword, setKeyword] = useState("갤럭시");
    const [collapsed, setCollapsed] = useState(true);

    const categoryOptions = [
      { label: "전자제품", value: "electronics" },
      { label: "의류", value: "clothing" },
      { label: "식품", value: "food" },
    ];

    const statusOptions = [
      { label: "판매중", value: "active" },
      { label: "품절", value: "soldout" },
      { label: "단종", value: "discontinued" },
    ];

    const centerOptions = [
      { label: "서울 센터", value: "seoul" },
      { label: "부산 센터", value: "busan" },
      { label: "대구 센터", value: "daegu" },
    ];

    // 필터 배열 생성
    const filters = [
      category && {
        id: "category",
        label: "카테고리",
        value: categoryOptions.find((o) => o.value === category)?.label || "",
      },
      status && {
        id: "status",
        label: "상태",
        value: statusOptions.find((o) => o.value === status)?.label || "",
      },
      center && {
        id: "center",
        label: "센터",
        value: centerOptions.find((o) => o.value === center)?.label || "",
      },
      keyword && { id: "keyword", label: "검색어", value: keyword },
    ].filter(Boolean) as { id: string; label: string; value: string }[];

    const removeFilter = (id: string) => {
      if (id === "category") setCategory("");
      if (id === "status") setStatus("");
      if (id === "center") setCenter("");
      if (id === "keyword") setKeyword("");
    };

    const resetAll = () => {
      setCategory("");
      setStatus("");
      setCenter("");
      setKeyword("");
    };

    return (
      <div className="space-y-4">
        <SearchForm
          collapsible
          collapsed={collapsed}
          onCollapseChange={setCollapsed}
          collapsedContent={
            <FilterChipSummary
              filters={filters}
              maxVisible={3}
              onRemove={removeFilter}
              onClearAll={resetAll}
              onExpand={() => setCollapsed(false)}
            />
          }
          actions={
            <>
              <Button variant="ghost-outline" onClick={resetAll}>
                초기화
              </Button>
              <Button>검색</Button>
            </>
          }
        >
          <Select
            label="카테고리"
            placeholder="카테고리 선택"
            value={category}
            onValueChange={setCategory}
            options={categoryOptions}
          />
          <Select
            label="상태"
            placeholder="상태 선택"
            value={status}
            onValueChange={setStatus}
            options={statusOptions}
          />
          <Select
            label="센터"
            placeholder="센터 선택"
            value={center}
            onValueChange={setCenter}
            options={centerOptions}
          />
          <InputField
            label="검색어"
            placeholder="검색어 입력"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </SearchForm>
        <p className="text-sm text-muted-foreground">
          ↑ FilterChipSummary 컴포넌트를 사용하면 코드가 간결해집니다.
        </p>
      </div>
    );
  },
};

