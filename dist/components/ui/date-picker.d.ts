import { InputSize } from './input';
export interface DatePickerProps {
    /** 선택된 날짜 */
    value?: Date;
    /** 날짜 변경 핸들러 */
    onChange?: (date: Date | undefined) => void;
    /** 라벨 텍스트 */
    label?: string;
    /** placeholder 텍스트 */
    placeholder?: string;
    /** 날짜 포맷 (기본: yyyy-MM-dd) */
    dateFormat?: string;
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
}
declare const DatePicker: ({ value, onChange, label, placeholder, dateFormat, error, errorMessage, size, disabled, className, reserveLabelSpace, }: DatePickerProps) => import("react/jsx-runtime").JSX.Element;
export { DatePicker };
