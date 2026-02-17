import { InputSize } from './input';
export interface TimePickerProps {
    /** 선택된 시간 (HH:mm:ss 형식 문자열 또는 Date) */
    value?: string | Date;
    /** 시간 변경 핸들러 */
    onChange?: (time: string) => void;
    /** 라벨 텍스트 */
    label?: string;
    /** placeholder 텍스트 */
    placeholder?: string;
    /** 에러 상태 */
    error?: boolean;
    /** 에러 메시지 */
    errorMessage?: string;
    /** 너비 크기 */
    size?: InputSize;
    /** 비활성화 */
    disabled?: boolean;
    /** 추가 className */
    className?: string;
    /** 라벨이 없어도 라벨 공간 유지 */
    reserveLabelSpace?: boolean;
    /** 초 단위 표시 여부 */
    showSeconds?: boolean;
}
declare const TimePicker: ({ value, onChange, label, placeholder, error, errorMessage, size, disabled, className, reserveLabelSpace, showSeconds, }: TimePickerProps) => import("react/jsx-runtime").JSX.Element;
export { TimePicker };
