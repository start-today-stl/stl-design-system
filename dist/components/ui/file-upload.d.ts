import { InputSize } from './input';
import * as React from "react";
export interface FileUploadProps {
    /** 라벨 텍스트 */
    label?: string;
    /** 선택된 파일 배열 */
    files: File[];
    /** 파일 변경 콜백 */
    onChange: (files: File[]) => void;
    /** 최대 파일 개수 (기본 1) */
    maxFiles?: number;
    /** 최대 파일 크기 (bytes, 기본 10MB) */
    maxSize?: number;
    /** 허용 확장자 (예: "image/jpg,image/jpeg,image/png") */
    accept?: string;
    /** 커스텀 도움말 (없으면 자동 생성) */
    helperText?: string;
    /** 에러 상태 */
    error?: boolean;
    /** 에러 메시지 */
    errorMessage?: string;
    /** 너비 크기 */
    size?: InputSize;
    /** 비활성화 */
    disabled?: boolean;
    /** 필수 입력 표시 (라벨 앞에 점 표시) */
    required?: boolean;
    /** 추가 className */
    className?: string;
}
declare const FileUpload: React.ForwardRefExoticComponent<FileUploadProps & React.RefAttributes<HTMLDivElement>>;
export { FileUpload };
