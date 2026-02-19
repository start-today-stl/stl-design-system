import * as React from "react";
export interface ErrorContentProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 에러 코드 (404, 500, ERROR 등) */
    code: string;
    /** 에러 타이틀 (NOT FOUND :( 등) */
    title: string;
    /** 상세 설명 문구 */
    description: string;
    /** 이전 버튼 라벨 */
    backLabel?: string;
    /** 주요 버튼 라벨 */
    primaryLabel?: string;
    /** 주요 버튼 아이콘 (기본: HomeIcon) */
    primaryIcon?: React.ReactNode;
    /** 이전 버튼 클릭 핸들러 */
    onBack?: () => void;
    /** 주요 버튼 클릭 핸들러 */
    onPrimary?: () => void;
    /** 이전 버튼 숨기기 */
    hideBackButton?: boolean;
    /** 주요 버튼 숨기기 */
    hidePrimaryButton?: boolean;
}
/**
 * 에러 페이지에서 사용되는 콘텐츠 컴포넌트
 *
 * @example
 * ```tsx
 * // 404 Not Found
 * <ErrorContent
 *   code="404"
 *   title="NOT FOUND :("
 *   description="페이지가 응답하지 않습니다.\n이전 단계로 돌아가세요."
 *   onBack={() => navigate(-1)}
 *   onPrimary={() => navigate('/')}
 * />
 *
 * // Error Boundary (커스텀 아이콘)
 * <ErrorContent
 *   code="ERROR"
 *   title="오류가 발생했습니다 :("
 *   description="잠시 후 다시 시도해주세요."
 *   primaryLabel="새로고침"
 *   primaryIcon={<RefreshIcon size={24} />}
 *   onPrimary={() => window.location.reload()}
 *   hideBackButton
 * />
 * ```
 */
declare const ErrorContent: React.ForwardRefExoticComponent<ErrorContentProps & React.RefAttributes<HTMLDivElement>>;
export { ErrorContent };
