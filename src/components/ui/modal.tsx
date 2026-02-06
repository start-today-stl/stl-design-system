"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface ModalProps {
  /** 모달 크기 */
  size?: "s" | "m" | "l" | "xl";
  /** 모달 열림 상태 */
  open?: boolean;
  /** 모달 열림/닫힘 상태 변경 핸들러 */
  onOpenChange?: (open: boolean) => void;
  /** 모달 제목 */
  title?: React.ReactNode;
  /** 모달 설명 */
  description?: React.ReactNode;
  /** 모달 본문 내용 */
  children?: React.ReactNode;
  /** 모달 하단 버튼 영역 */
  footer?: React.ReactNode;
  /** 추가 className */
  className?: string;
}

const Modal = ({
  size = "l",
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
}: ModalProps) => {
  // Size configuration
  const sizeConfig = {
    s: "max-w-[400px]",
    m: "max-w-[600px]",
    l: "max-w-[900px]",
    xl: "max-w-[1200px]",
  };

  // footer 자식 개수에 따른 정렬 (Fragment 내부 자식도 카운트)
  const getChildCount = (children: React.ReactNode): number => {
    if (!children) return 0;
    if (React.isValidElement(children) && children.type === React.Fragment) {
      return React.Children.count(children.props.children);
    }
    return React.Children.count(children);
  };
  const footerChildCount = getChildCount(footer);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(sizeConfig[size], className)}>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}

        {children && <div className="py-4">{children}</div>}

        {footer && (
          <div
            className={cn(
              "flex flex-col-reverse gap-2 sm:flex-row w-full",
              footerChildCount === 1 ? "sm:justify-end" : "sm:justify-between"
            )}
          >
            {footer}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export { Modal };
