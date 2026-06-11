import React, { useState, createContext, useContext, useMemo } from "react";
import { cn } from "@/lib/utils";
import { UpIcon, DownIcon } from "@/icons";

export type SearchFormLayout = "grid" | "flex";

/**
 * SearchForm 의 접힘 상태/토글을 자식 컴포넌트가 소비하도록 제공.
 * FilterChipSummary 등이 사용해 접힘 상태일 때 칩 클릭으로 펼치기.
 */
interface SearchFormContextValue {
  isCollapsed: boolean;
  collapsible: boolean;
  toggleCollapse: () => void;
}

const SearchFormContext = createContext<SearchFormContextValue | null>(null);

export const useSearchFormContext = () => useContext(SearchFormContext);

export interface SearchFormProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** 폼 제목 */
  title?: React.ReactNode;
  /** 검색 필드 영역 */
  children?: React.ReactNode;
  /** 버튼 영역 */
  actions?: React.ReactNode;
  /** 레이아웃 타입: grid(4컬럼 고정) | flex(자동 줄바꿈) */
  layout?: SearchFormLayout;
  /** 접기/펴기 가능 여부 */
  collapsible?: boolean;
  /** 접힘 상태 (controlled) */
  collapsed?: boolean;
  /** 초기 접힘 상태 (uncontrolled, collapsible이 true일 때만 동작) */
  defaultCollapsed?: boolean;
  /** 접힌 상태에서 표시할 콘텐츠 (필터 요약 등) */
  collapsedContent?: React.ReactNode;
  /** 접힘 상태 변경 콜백 */
  onCollapseChange?: (collapsed: boolean) => void;
}

export const SearchForm = React.forwardRef<HTMLDivElement, SearchFormProps>(
  ({ className, title, children, actions, layout = "grid", collapsible = false, collapsed, defaultCollapsed = false, collapsedContent, onCollapseChange, ...props }, ref) => {
    const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);

    // controlled vs uncontrolled
    const isControlled = collapsed !== undefined;
    const isCollapsed = isControlled ? collapsed : internalCollapsed;

    const toggleCollapse = () => {
      const newValue = !isCollapsed;
      if (!isControlled) {
        setInternalCollapsed(newValue);
      }
      onCollapseChange?.(newValue);
    };

    const collapseButton = collapsible && (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleCollapse();
        }}
        aria-label={isCollapsed ? "펼치기" : "접기"}
        className="flex items-center justify-center size-8 text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
      >
        {isCollapsed ? <DownIcon size={24} /> : <UpIcon size={24} />}
      </button>
    );

    const showCollapsedRow = collapsedContent || (!title && collapsible);

    const contextValue = useMemo<SearchFormContextValue>(
      () => ({ isCollapsed, collapsible, toggleCollapse }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [isCollapsed, collapsible]
    );

    return (
      <SearchFormContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={cn(
          "w-full bg-card border border-border rounded-2xl overflow-hidden shrink-0",
          className
        )}
        {...props}
      >
        {title && (
          <div
            className={cn(
              "px-6 py-4 flex items-center justify-between",
              !isCollapsed && "border-b border-border"
            )}
          >
            <h3 className="text-lg font-semibold">{title}</h3>
            {collapseButton}
          </div>
        )}
        {/* 접힌 상태에서 표시할 콘텐츠 (타이틀 없으면 화살표도 같은 row 끝에 배치) */}
        {showCollapsedRow && (
          <div
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-200 ease-in-out",
              isCollapsed ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <div className="px-4 py-3 flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">{collapsedContent}</div>
                {!title && collapseButton}
              </div>
            </div>
          </div>
        )}
        {/* 펼쳐진 상태의 메인 콘텐츠 */}
        <div
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-200 ease-in-out",
            isCollapsed ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
          )}
        >
          <div className="overflow-hidden">
            <div className="p-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                {children && (
                  <div
                    className={cn(
                      "flex-1 gap-4",
                      layout === "grid"
                        ? "grid grid-cols-1 md:grid-cols-4"
                        : "flex flex-wrap items-end"
                    )}
                  >
                    {children}
                  </div>
                )}
                {(actions || (!title && collapsible)) && (
                  <div className="flex items-center gap-2 pl-4 shrink-0">
                    {actions}
                    {!title && collapseButton}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      </SearchFormContext.Provider>
    );
  }
);
SearchForm.displayName = "SearchForm";
