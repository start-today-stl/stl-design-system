/**
 * PageTitle - 페이지 타이틀 컴포넌트
 *
 * @description
 * 각 페이지 상단에 표시되는 타이틀 컴포넌트입니다.
 * 메인 타이틀, 보조 타이틀(선택), 북마크 기능(선택)을 제공합니다.
 * 각 페이지 컴포넌트에서 직접 사용합니다.
 *
 * @example
 * // 기본 사용 (타이틀만)
 * import { PageTitle } from "stl-design-system/layout"
 *
 * function DashboardPage() {
 *   return (
 *     <>
 *       <PageTitle title="대시보드" />
 *       {// 페이지 컨텐츠}
 *     </>
 *   )
 * }
 *
 * @example
 * // 타이틀 + 서브타이틀 + 북마크
 * function OrderListPage() {
 *   const [bookmarked, setBookmarked] = useState(false)
 *
 *   return (
 *     <>
 *       <Breadcrumb items={[...]} />
 *       <PageTitle
 *         title="B2C 주문관리"
 *         subtitle="B2C Order Management"
 *         bookmarked={bookmarked}
 *         onBookmark={() => setBookmarked(!bookmarked)}
 *       />
 *       {// 페이지 컨텐츠}
 *     </>
 *   )
 * }
 *
 * @example
 * // 북마크 없이 (onBookmark 미전달 시 버튼 숨김)
 * <PageTitle title="설정" subtitle="Settings" />
 */
import * as React from "react";
export interface PageTitleProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 메인 타이틀 */
    title: string;
    /** 보조 타이틀 (선택) */
    subtitle?: string;
    /** 북마크 상태 */
    bookmarked?: boolean;
    /** 북마크 클릭 핸들러 (없으면 북마크 버튼 숨김) */
    onBookmark?: () => void;
}
declare const PageTitle: React.ForwardRefExoticComponent<PageTitleProps & React.RefAttributes<HTMLDivElement>>;
export { PageTitle };
