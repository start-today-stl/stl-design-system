import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface SearchFormProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** 폼 제목 */
  title?: React.ReactNode;
  /** 검색 필드 영역 */
  children?: React.ReactNode;
  /** 버튼 영역 */
  actions?: React.ReactNode;
}

export const SearchForm = React.forwardRef<HTMLDivElement, SearchFormProps>(
  ({ className, title, children, actions, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn("w-full bg-card", className)} {...props}>
        {title && (
          <CardHeader className="border-b px-6 py-4">
            <CardTitle className="text-lg">{title}</CardTitle>
          </CardHeader>
        )}
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            {children && (
              <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-4">
                {children}
              </div>
            )}
            {actions && (
              <div className="flex items-center gap-2 pl-4">{actions}</div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);
SearchForm.displayName = "SearchForm";
