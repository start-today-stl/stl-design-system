import * as React from "react";
export interface TreeListProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare const TreeList: React.ForwardRefExoticComponent<TreeListProps & React.RefAttributes<HTMLDivElement>>;
export interface TreeItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 아이템 아이콘 */
    icon?: React.ReactNode;
    /** 아이템 라벨 */
    label: string;
    /** 선택 상태 */
    selected?: boolean;
    /** 펼침 상태 (controlled) */
    expanded?: boolean;
    /** 기본 펼침 상태 (uncontrolled) */
    defaultExpanded?: boolean;
    /** 선택 핸들러 */
    onSelect?: () => void;
    /** 펼침 상태 변경 핸들러 */
    onExpandedChange?: (expanded: boolean) => void;
    /** 호버/선택 시 표시될 액션 버튼 */
    actions?: React.ReactNode;
    /** 들여쓰기 깊이 (내부용) */
    depth?: number;
}
declare const TreeItem: React.ForwardRefExoticComponent<TreeItemProps & React.RefAttributes<HTMLDivElement>>;
export { TreeList, TreeItem };
