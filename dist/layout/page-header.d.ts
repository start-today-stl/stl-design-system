import { PageTitleProps } from './page-title';
/**
 * PageHeader - 페이지 헤더 컴포넌트
 *
 * @description
 * PageTitle과 Tabs를 조합한 페이지 헤더 컴포넌트입니다.
 * 탭이 없는 경우 PageTitle만 표시됩니다.
 *
 * @example
 * // 탭 없이 사용
 * <PageHeader title="대시보드" subtitle="Dashboard" />
 *
 * @example
 * // 탭과 함께 사용
 * <PageHeader
 *   title="출고 내역"
 *   subtitle="Shipment History"
 *   bookmarked={bookmarked}
 *   onBookmark={() => setBookmarked(!bookmarked)}
 *   tabs={
 *     <Tabs defaultValue="b2c">
 *       <TabsList align="end">
 *         <TabsTrigger value="b2c">B2C 출고</TabsTrigger>
 *         <TabsTrigger value="b2b">B2B 출고</TabsTrigger>
 *       </TabsList>
 *     </Tabs>
 *   }
 * />
 */
import * as React from "react";
export interface PageHeaderProps extends Omit<PageTitleProps, "className">, Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    /** 탭 영역 (Tabs 컴포넌트) */
    tabs?: React.ReactNode;
    /** 스크롤 시 상단에 고정 */
    sticky?: boolean;
}
declare const PageHeader: React.ForwardRefExoticComponent<PageHeaderProps & React.RefAttributes<HTMLDivElement>>;
export { PageHeader };
