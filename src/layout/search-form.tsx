import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dropdown } from "@/components";

interface ProductSearchBarProps extends React.HTMLAttributes<HTMLDivElement> {
  onSearch?: (values: any) => void;
  onReset?: () => void;
}

export const SearchForm = React.forwardRef<
  HTMLDivElement,
  ProductSearchBarProps
>(({ className, onSearch, onReset, ...props }, ref) => {
  return (
    <Card ref={ref} className={cn("w-full bg-card", className)} {...props}>
      <CardHeader className="border-b px-6 py-4">
        <CardTitle className="text-lg">상품 관리</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-4">
            <InputField label="상품명" placeholder="상품명을 입력하세요." />
            <InputField
              label="SKU"
              placeholder="SKU를 입력하세요."
              type="text"
              value="ASD1231922"
            />
            <Dropdown
              label="바코드"
              placeholder="바코드를 입력하세요"
              value="option1"
              options={[
                {
                  label: "옵션1",
                  value: "option1",
                },
                {
                  label: "옵션2",
                  value: "option2",
                },
                {
                  label: "옵션3",
                  value: "option3",
                },
                {
                  label: "옵션4",
                  value: "option4",
                },
                {
                  label: "옵션5",
                  value: "option5",
                },
              ]}
            />
            <InputField
              label="브랜드"
              placeholder="브랜드를 입력하세요."
              error={true}
            />
          </div>
          <div className="flex items-center gap-2 pl-4">
            <Button variant="action" className="w-24" onClick={onReset}>
              초기화
            </Button>
            <Button className="w-24" onClick={() => onSearch?.({})}>
              <Search className="mr-2 h-4 w-4" />
              검색
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
SearchForm.displayName = "SearchForm";
