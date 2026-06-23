import * as React from "react";
declare const tagsInputSizeStyles: {
    readonly sm: "w-[180px]";
    readonly md: "w-[260px]";
    readonly lg: "w-[360px]";
    readonly full: "w-full";
};
export type TagsInputSize = keyof typeof tagsInputSizeStyles;
export interface TagsInputProps {
    /** 칩 배열 값 (controlled) */
    value?: string[];
    /** 초기 값 (uncontrolled) */
    defaultValue?: string[];
    /** 칩 배열 변경 콜백 */
    onValueChange?: (values: string[]) => void;
    /** 라벨 텍스트 */
    label?: string;
    /** placeholder (칩이 없을 때 표시) */
    placeholder?: string;
    /** 에러 상태 */
    error?: boolean;
    /** 에러 메시지 */
    errorMessage?: string;
    /** 너비 크기 */
    size?: TagsInputSize;
    /** 필수 입력 표시 */
    required?: boolean;
    /** 비활성화 */
    disabled?: boolean;
    /** 라벨이 없어도 라벨 공간 유지 */
    reserveLabelSpace?: boolean;
    /** 최대 칩 개수 (도달 시 input 비활성화) */
    maxTags?: number;
    /** 칩 분리 키 패턴 (기본: 쉼표/줄바꿈) */
    delimiterPattern?: RegExp;
    /** 입력값 정규화 (예: trim, toLower) — 기본 trim */
    normalize?: (raw: string) => string;
    /** 중복 허용 여부 (기본 false) */
    allowDuplicates?: boolean;
    /** 컨테이너 최대 높이 — 설정 시 초과하면 내부 세로 스크롤 (예: 120 / "8rem") */
    maxHeight?: number | string;
    /** input id */
    id?: string;
    /** form name */
    name?: string;
    /** 컨테이너 className override */
    className?: string;
}
/**
 * 다건 텍스트를 칩(Chip) 형태로 입력/관리하는 컴포넌트
 *
 * 동작:
 * - Enter / Tab / 쉼표 입력 → 현재 텍스트를 칩으로 추가
 * - 빈 입력 상태에서 Backspace → 마지막 칩 제거
 * - 칩 X 버튼 → 개별 칩 제거
 * - blur 시 남은 텍스트도 칩으로 등록
 * - 쉼표/줄바꿈이 포함된 텍스트 붙여넣기 → 자동 분리
 * - 빈 값/중복(allowDuplicates=false) 자동 제거
 */
declare const TagsInput: React.ForwardRefExoticComponent<TagsInputProps & React.RefAttributes<HTMLInputElement>>;
export { TagsInput, tagsInputSizeStyles };
