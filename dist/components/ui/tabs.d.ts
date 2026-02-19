import { arrayMove } from '@dnd-kit/sortable';
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
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
    /** 탭 최대 너비 (기본값: 120px) */
    maxWidth?: number;
    /** 탭 최소 너비 (기본값: 60px) */
    minWidth?: number;
}
declare const TabsTrigger: React.ForwardRefExoticComponent<TabsTriggerProps & React.RefAttributes<HTMLButtonElement>>;
/** 드래그 가능한 탭 트리거 Props */
export interface SortableTabsTriggerProps extends TabsTriggerProps {
    /** 드래그용 고유 ID (보통 value와 동일) */
    id: string;
}
/** 드래그 앤 드롭 가능한 탭 트리거 */
declare const SortableTabsTrigger: React.ForwardRefExoticComponent<SortableTabsTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const TabsContent: React.ForwardRefExoticComponent<Omit<TabsPrimitive.TabsContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { Tabs, TabsList, TabsTrigger, TabsContent, SortableTabsList, SortableTabsTrigger, arrayMove, };
