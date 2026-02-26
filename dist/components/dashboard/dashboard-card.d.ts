import * as React from "react";
export interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 헤더 아이콘 */
    icon?: React.ReactNode;
    /** 헤더 타이틀 */
    title?: string;
    /** 헤더 우측 액션 영역 (필터 탭, 버튼 등) */
    headerAction?: React.ReactNode;
    /** 카드 내용 */
    children?: React.ReactNode;
    /** 컨테이너 높이에 맞춤 (h-full) */
    stretch?: boolean;
    /** 로딩 상태 (스켈레톤 표시) */
    loading?: boolean;
}
declare const DashboardCard: React.ForwardRefExoticComponent<DashboardCardProps & React.RefAttributes<HTMLDivElement>>;
export { DashboardCard };
