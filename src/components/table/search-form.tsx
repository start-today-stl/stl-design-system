import React from "react";
import { cn } from "@/lib/utils";

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
}

export const SearchForm = React.forwardRef<HTMLDivElement, SearchFormProps>(
  ({ className, title, children, actions, layout = "grid", ...props }, ref) => {
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
          <div className="border-b border-border px-6 py-4">
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        )}
        <div className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
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
    );
  }
);
SearchForm.displayName = "SearchForm";
