import { InputSize } from './input';
/** 시간 스피너 컴포넌트 */
interface TimeSpinnerProps {
    value: number;
    onChange: (value: number) => void;
    max: number;
    disabled?: boolean;
}
declare const TimeSpinner: ({ value, onChange, max, disabled }: TimeSpinnerProps) => import("react/jsx-runtime").JSX.Element;
export interface DateTimePickerProps {
    /** 선택된 날짜/시간 */
    value?: Date;
    /** 날짜/시간 변경 핸들러 */
    onChange?: (date: Date | undefined) => void;
    /** 라벨 텍스트 */
    label?: string;
    /** placeholder 텍스트 */
    placeholder?: string;
    /** 날짜/시간 포맷 (기본: yyyy-MM-dd HH:mm:ss) */
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
    /** 필수 입력 표시 (라벨 앞에 점 표시) */
    required?: boolean;
}
declare const DateTimePicker: ({ value, onChange, label, placeholder, dateFormat, error, errorMessage, size, disabled, className, reserveLabelSpace, required, }: DateTimePickerProps) => import("react/jsx-runtime").JSX.Element;
export { DateTimePicker, TimeSpinner };
