"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dropdown } from "@/components/ui/dropdown";

export interface ModalProps {
  size?: "s" | "m" | "l" | "xl";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Modal = ({ size = "l", open, onOpenChange }: ModalProps) => {
  const [date, setDate] = React.useState<Date>();

  // Size configuration
  const sizeConfig = {
    s: {
      maxWidth: "max-w-[400px]",
      gridCols: "grid-cols-1",
    },
    m: {
      maxWidth: "max-w-[600px]",
      gridCols: "grid-cols-1 sm:grid-cols-2",
    },
    l: {
      maxWidth: "max-w-[900px]",
      gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    },
    xl: {
      maxWidth: "max-w-[1200px]",
      gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    },
  };

  const currentConfig = sizeConfig[size];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(currentConfig.maxWidth)}>
        <DialogHeader>
          <DialogTitle>등록 모달</DialogTitle>
          <DialogDescription>
            입고 정보를 입력하여 등록해 주세요.
          </DialogDescription>
        </DialogHeader>

        {/* Form Body */}
        <div className={cn("grid gap-4 py-4", currentConfig.gridCols)}>
          {/* 1. 입고일자 (DatePicker) */}
          <div className="grid gap-2">
            <Label htmlFor="date">입고일자</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal border-[#e6e6e6] bg-[#f5f5f5] hover:bg-[#f5f5f5] hover:text-foreground focus-visible:ring-1 focus-visible:ring-[#e6e6e6] focus-visible:ring-offset-0 transition-all duration-200",
                    !date && "text-[#b3b3b3]",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? (
                    format(date, "PPP", { locale: ko })
                  ) : (
                    <span>날짜 선택</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* 2. 입고번호 (Text) */}
          <div className="grid gap-2">
            <Label htmlFor="receipt-number">입고번호</Label>
            <Input id="receipt-number" placeholder="입고번호 입력" />
          </div>

          {/* 3. 센터 (Dropdown) */}
          <Dropdown
            label="센터"
            placeholder="센터 선택"
            options={[
              { label: "A 센터", value: "center-a" },
              { label: "B 센터", value: "center-b" },
              { label: "C 센터", value: "center-c" },
            ]}
          />

          {/* 4. 파트 (Dropdown) */}
          <Dropdown
            label="파트"
            placeholder="파트 선택"
            options={[
              { label: "파트 1", value: "part-1" },
              { label: "파트 2", value: "part-2" },
            ]}
          />

          {/* 5. 입고방법 (Dropdown) */}
          <Dropdown
            label="입고방법"
            placeholder="입고방법 선택"
            options={[
              { label: "수동 입고", value: "manual" },
              { label: "스캐너 입고", value: "scanner" },
            ]}
          />

          {/* 6. 입고단위 (Dropdown) */}
          <Dropdown
            label="입고단위"
            placeholder="단위 선택"
            options={[
              { label: "EA", value: "ea" },
              { label: "BOX", value: "box" },
              { label: "PALLET", value: "pallet" },
            ]}
          />

          {/* 7. 입고수량 (Number Input) */}
          <div className="grid gap-2">
            <Label htmlFor="quantity">입고수량</Label>
            <Input id="quantity" type="number" placeholder="0" />
          </div>

          {/* 8. 비고 (Text Input) */}
          <div className="grid gap-2">
            <Label htmlFor="remarks">비고</Label>
            <Input id="remarks" placeholder="비고 입력" />
          </div>
        </div>

        <DialogFooter className="sm:justify-between w-full">
          <Button onClick={() => onOpenChange?.(false)}>닫기</Button>
          <Button variant="action">등록</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { Modal };
