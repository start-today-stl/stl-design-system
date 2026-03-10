/** 시간 스피너 컴포넌트 */
export interface TimeSpinnerProps {
    value: number;
    onChange: (value: number) => void;
    max: number;
    disabled?: boolean;
}
declare const TimeSpinner: ({ value, onChange, max, disabled }: TimeSpinnerProps) => import("react/jsx-runtime").JSX.Element;
export { TimeSpinner };
