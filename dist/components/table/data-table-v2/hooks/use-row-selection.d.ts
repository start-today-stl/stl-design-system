interface UseRowSelectionOptions<T extends {
    id: string | number;
}> {
    data: T[];
    selectable: boolean;
    selectedIds?: (string | number)[];
    defaultSelectedIds?: (string | number)[];
    onSelectionChange?: (selectedIds: (string | number)[]) => void;
}
/**
 * 행 선택 hook (체크박스).
 * - controlled (selectedIds) 또는 uncontrolled (defaultSelectedIds) 지원
 * - shift+click 으로 범위 선택
 * - "전체 선택" 헤더 체크박스 지원
 */
export declare function useRowSelection<T extends {
    id: string | number;
}>({ data, selectable, selectedIds, defaultSelectedIds, onSelectionChange, }: UseRowSelectionOptions<T>): {
    selectedSet: Set<T["id"]>;
    isSelected: (id: T["id"]) => boolean;
    allSelected: boolean;
    someSelected: boolean;
    toggleRow: (id: T["id"], rowIndex: number, shiftKey: boolean) => void;
    toggleAll: () => void;
};
export {};
