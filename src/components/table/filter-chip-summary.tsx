import * as React from "react";
import { cn } from "@/lib/utils";
import { Chip } from "@/components/ui/chip";

export interface FilterItem {
  /** 필터 고유 ID */
  id: string;
  /** 필터 라벨 (예: "카테고리") */
  label: string;
  /** 필터 값 (예: "전자제품") */
  value: string;
}

export interface FilterChipSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 필터 목록 */
  filters: FilterItem[];
  /** 최대 표시 개수 (기본: 3) */
  maxVisible?: number;
  /** 필터 삭제 콜백 */
  onRemove?: (id: string) => void;
  /** 전체 초기화 콜백 */
  onClearAll?: () => void;
  /** 더보기 클릭 콜백 ("+N개" 클릭 시) */
  onExpand?: () => void;
  /** 필터 없을 때 텍스트 */
  emptyText?: string;
  /** 전체 초기화 버튼 텍스트 */
  clearAllText?: string;
  /** 칩 사이즈 */
  chipSize?: "sm" | "md" | "lg";
}

const FilterChipSummary = React.forwardRef<HTMLDivElement, FilterChipSummaryProps>(
  (
    {
      className,
      filters,
      maxVisible = 3,
      onRemove,
      onClearAll,
      onExpand,
      emptyText = "적용된 필터가 없습니다",
      clearAllText = "전체 초기화",
      chipSize = "sm",
      ...props
    },
    ref
  ) => {
    const visibleFilters = filters.slice(0, maxVisible);
    const hiddenCount = Math.max(0, filters.length - maxVisible);

    if (filters.length === 0) {
      return (
        <div
          ref={ref}
          className={cn("flex items-center gap-2", className)}
          {...props}
        >
          <span className="text-sm text-muted-foreground">{emptyText}</span>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        {visibleFilters.map((filter) => (
          <Chip
            key={filter.id}
            size={chipSize}
            removable={!!onRemove}
            onRemove={() => onRemove?.(filter.id)}
          >
            {filter.label}: {filter.value}
          </Chip>
        ))}
        {hiddenCount > 0 && (
          <Chip
            size={chipSize}
            variant="outline"
            onClick={onExpand}
          >
            +{hiddenCount}개
          </Chip>
        )}
        {onClearAll && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-2"
          >
            {clearAllText}
          </button>
        )}
      </div>
    );
  }
);
FilterChipSummary.displayName = "FilterChipSummary";

export { FilterChipSummary };
