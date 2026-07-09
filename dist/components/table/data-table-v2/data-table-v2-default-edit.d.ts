import { EditComponentProps } from './types';
/**
 * 기본 편집 컴포넌트 (Input 기반).
 * - 마운트 시 자동 focus + 전체 선택
 * - Enter: onComplete (검증 → 저장)
 * - Escape: onCancel (원래 값 복원)
 * - blur: onComplete
 */
export declare function DataTableV2DefaultEdit<T>({ value, onChange, onComplete, onCancel, error, }: EditComponentProps<T>): import("react/jsx-runtime").JSX.Element;
