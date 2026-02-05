import { IconProps } from './types';
interface STLSignatureIconProps extends Omit<IconProps, 'size'> {
    /** 로고 너비 (기본값: 186) */
    width?: number;
    /** 로고 높이 (기본값: 32) */
    height?: number;
}
export declare function STLSignatureIcon({ width, height, className, ...props }: STLSignatureIconProps): import("react/jsx-runtime").JSX.Element;
export {};
