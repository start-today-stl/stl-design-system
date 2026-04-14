import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { UpIcon, DownIcon } from "@/icons";

export type SearchFormLayout = "grid" | "flex";

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

    return (
      <div
        ref={ref}
        className={cn(
          "w-full bg-card border border-border rounded-2xl overflow-hidden",
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
            {collapsible && (
              <button
                type="button"
                onClick={toggleCollapse}
                aria-label={isCollapsed ? "펼치기" : "접기"}
                className="flex items-center justify-center size-8 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {isCollapsed ? <DownIcon size={24} /> : <UpIcon size={24} />}
              </button>
            )}
          </div>
        )}
        {/* 제목이 없을 때 collapsible 토글 버튼 */}
        {!title && collapsible && (
          <div className={cn("px-4 py-1 flex justify-end", !isCollapsed && "border-b border-border")}>
            <button
              type="button"
              onClick={toggleCollapse}
              aria-label={isCollapsed ? "펼치기" : "접기"}
              className="flex items-center justify-center size-8 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {isCollapsed ? <DownIcon size={24} /> : <UpIcon size={24} />}
            </button>
          </div>
        )}
        {/* 접힌 상태에서 표시할 콘텐츠 */}
        {collapsedContent && (
          <div
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-200 ease-in-out",
              isCollapsed ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <div className="px-4 py-3">{collapsedContent}</div>
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
                {actions && (
                  <div className="flex items-center gap-2 pl-4 shrink-0">{actions}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
SearchForm.displayName = "SearchForm";
