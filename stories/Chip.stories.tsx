import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chip } from "../src/components/ui/chip";
import { SearchIcon } from "@/icons";

const meta = {
  title: "Components/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "selected", "outline", "outline-selected"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    removable: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본 칩 */
export const Default: Story = {
  args: {
    children: "필터",
  },
};

/** 삭제 가능한 칩 */
export const Removable: Story = {
  args: {
    children: "카테고리: 전자제품",
    removable: true,
  },
};

/** 선택된 칩 */
export const Selected: Story = {
  args: {
    children: "선택됨",
    variant: "selected",
  },
};

/** 아웃라인 칩 */
export const Outline: Story = {
  args: {
    children: "아웃라인",
    variant: "outline",
  },
};

/** 아웃라인 선택됨 */
export const OutlineSelected: Story = {
  args: {
    children: "아웃라인 선택됨",
    variant: "outline-selected",
  },
};

/** 크기 비교 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Chip size="sm">Small</Chip>
      <Chip size="md">Medium</Chip>
      <Chip size="lg">Large</Chip>
    </div>
  ),
};

/** 왼쪽 아이콘 */
export const WithIcon: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Chip leftElement={<SearchIcon size={14} />}>검색어</Chip>
      <Chip leftElement={<SearchIcon size={14} />} removable>
        검색어
      </Chip>
      <Chip variant="selected" leftElement={<SearchIcon size={14} />}>
        선택됨
      </Chip>
    </div>
  ),
};

/** 필터 칩 그룹 (삭제 가능) */
export const FilterChips: Story = {
  render: function FilterChipsExample() {
    const [filters, setFilters] = useState([
      { id: "1", label: "카테고리: 전자제품" },
      { id: "2", label: "상태: 판매중" },
      { id: "3", label: "가격: 10만원 이상" },
    ]);

    const removeFilter = (id: string) => {
      setFilters(filters.filter((f) => f.id !== id));
    };

    return (
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((filter) => (
          <Chip key={filter.id} removable onRemove={() => removeFilter(filter.id)}>
            {filter.label}
          </Chip>
        ))}
        {filters.length === 0 && (
          <span className="text-sm text-muted-foreground">필터가 없습니다</span>
        )}
      </div>
    );
  },
};

/** 선택형 칩 그룹 */
export const SelectableChips: Story = {
  render: function SelectableChipsExample() {
    const [selected, setSelected] = useState<string[]>(["react"]);

    const options = [
      { id: "react", label: "React" },
      { id: "vue", label: "Vue" },
      { id: "angular", label: "Angular" },
      { id: "svelte", label: "Svelte" },
    ];

    const toggleSelect = (id: string) => {
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
      );
    };

    return (
      <div className="flex flex-wrap items-center gap-2">
        {options.map((option) => (
          <Chip
            key={option.id}
            variant={selected.includes(option.id) ? "selected" : "default"}
            onClick={() => toggleSelect(option.id)}
          >
            {option.label}
          </Chip>
        ))}
      </div>
    );
  },
};

/** 아웃라인 선택형 칩 그룹 */
export const OutlineSelectableChips: Story = {
  render: function OutlineSelectableExample() {
    const [selected, setSelected] = useState<string>("all");

    const options = [
      { id: "all", label: "전체" },
      { id: "active", label: "판매중" },
      { id: "soldout", label: "품절" },
      { id: "discontinued", label: "단종" },
    ];

    return (
      <div className="flex flex-wrap items-center gap-2">
        {options.map((option) => (
          <Chip
            key={option.id}
            variant={selected === option.id ? "outline-selected" : "outline"}
            onClick={() => setSelected(option.id)}
          >
            {option.label}
          </Chip>
        ))}
      </div>
    );
  },
};

/** 비활성화 */
export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Chip disabled>비활성화</Chip>
      <Chip disabled removable>
        삭제 불가
      </Chip>
      <Chip disabled variant="selected">
        선택됨
      </Chip>
    </div>
  ),
};

/** 검색폼 필터 요약 예시 */
export const SearchFormFilterSummary: Story = {
  render: function SearchFormFilterSummaryExample() {
    const [filters, setFilters] = useState([
      { id: "category", label: "카테고리", value: "전자제품" },
      { id: "status", label: "상태", value: "판매중" },
      { id: "date", label: "등록일", value: "2024.01.01 ~ 2024.12.31" },
    ]);

    const removeFilter = (id: string) => {
      setFilters(filters.filter((f) => f.id !== id));
    };

    const clearAll = () => {
      setFilters([]);
    };

    return (
      <div className="w-[500px] p-4 bg-card border border-border rounded-xl">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 flex-1">
            {filters.length > 0 ? (
              filters.map((filter) => (
                <Chip
                  key={filter.id}
                  size="sm"
                  removable
                  onRemove={() => removeFilter(filter.id)}
                >
                  {filter.label}: {filter.value}
                </Chip>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">
                적용된 필터가 없습니다
              </span>
            )}
          </div>
          {filters.length > 0 && (
            <button
              onClick={clearAll}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              전체 초기화
            </button>
          )}
        </div>
      </div>
    );
  },
};
