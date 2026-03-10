import { arrayMove } from '@dnd-kit/sortable';
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
/** 탭 최대 너비 preset 값 */
export type TabMaxWidth = 60 | 80 | 100 | 120 | 140 | 160;
/** minWidth preset을 Tailwind 클래스로 매핑 */
export type TabMinWidth = 40 | 60 | 80;
declare const Tabs: React.ForwardRefExoticComponent<TabsPrimitive.TabsProps & React.RefAttributes<HTMLDivElement>>;
export interface TabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
    /** 탭 정렬 위치 */
    align?: "start" | "end";
}
declare const TabsList: React.ForwardRefExoticComponent<TabsListProps & React.RefAttributes<HTMLDivElement>>;
/** 드래그 가능한 탭 리스트 Props */
export interface SortableTabsListProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
    /** 탭 정렬 위치 */
    align?: "start" | "end";
    /** 탭 ID 배열 (순서대로) */
    items: string[];
    /** 순서 변경 핸들러 */
    onReorder: (items: string[]) => void;
}
/** 드래그 앤 드롭으로 순서 변경 가능한 탭 리스트 */
declare const SortableTabsList: React.ForwardRefExoticComponent<SortableTabsListProps & React.RefAttributes<HTMLDivElement>>;
export interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
    /** 닫기 버튼 표시 여부 */
    closable?: boolean;
    /** 닫기 버튼 클릭 핸들러 */
    onClose?: () => void;
    /** 탭 최대 너비 (비활성 탭에만 적용, 기본값: 120) */
    maxWidth?: TabMaxWidth;
    /** 탭 최소 너비 (기본값: 60) */
    minWidth?: TabMinWidth;
}
declare const TabsTrigger: React.ForwardRefExoticComponent<TabsTriggerProps & React.RefAttributes<HTMLButtonElement>>;
/** 드래그 가능한 탭 트리거 Props */
export interface SortableTabsTriggerProps extends TabsTriggerProps {
    /** 드래그용 고유 ID (보통 value와 동일) */
    id: string;
    /** 오른쪽 탭 닫기 핸들러 */
    onCloseTabsToRight?: () => void;
    /** 다른 탭 닫기 핸들러 */
    onCloseOtherTabs?: () => void;
}
/** 드래그 앤 드롭 가능한 탭 트리거 */
declare const SortableTabsTrigger: React.ForwardRefExoticComponent<SortableTabsTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const TabsContent: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { Tabs, TabsList, TabsTrigger, TabsContent, SortableTabsList, SortableTabsTrigger, arrayMove, };
