import type { Meta, StoryObj } from "@storybook/react-vite"

const style = {
  page: "sb-unstyled font-sans max-w-[980px] mx-auto px-8 py-12",
  title: "text-[42px] font-bold text-[#1a1a1a] dark:text-white mb-3 leading-tight",
  subtitle: "text-[18px] text-[#666] dark:text-[#999] mb-8 leading-relaxed",
  badge: "inline-block px-3 py-1 rounded-full text-[12px] font-semibold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 mb-6",
  section: "mb-14",
  sectionTitle: "text-[24px] font-bold text-[#1a1a1a] dark:text-white mb-6 pb-3 border-b-2 border-[#e5e5e5] dark:border-[#444]",
  h3: "text-[18px] font-semibold text-[#333] dark:text-[#ddd] mb-3",
  table: "w-full border-collapse mb-6",
  th: "text-left px-4 py-3 bg-[#f5f5f5] dark:bg-[#2a2a2a] text-[14px] font-semibold text-[#333] dark:text-[#ccc] border border-[#e5e5e5] dark:border-[#444]",
  td: "px-4 py-3 text-[14px] text-[#1a1a1a] dark:text-white border border-[#e5e5e5] dark:border-[#444]",
  code: "block bg-[#1e1e1e] text-[#d4d4d4] p-5 rounded-lg text-[13px] font-mono overflow-x-auto mb-6 leading-relaxed",
  card: "p-5 rounded-xl border border-[#e5e5e5] dark:border-[#444] bg-white dark:bg-[#1e1e1e] hover:border-[#ccc] dark:hover:border-[#555] transition-colors",
  cardTitle: "font-bold text-[16px] text-[#1a1a1a] dark:text-white mb-2",
  cardDesc: "text-[14px] text-[#666] dark:text-[#999] leading-relaxed",
  benefitCard: "p-6 rounded-xl bg-gradient-to-br from-[#f8f9fa] to-[#fff] dark:from-[#1e1e1e] dark:to-[#252525] border border-[#e5e5e5] dark:border-[#444]",
  benefitIcon: "w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white text-[20px] mb-4",
  benefitTitle: "font-bold text-[18px] text-[#1a1a1a] dark:text-white mb-2",
  benefitDesc: "text-[14px] text-[#666] dark:text-[#999] leading-[1.7]",
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
  grid2: "grid grid-cols-1 md:grid-cols-2 gap-6",
  p: "text-[15px] text-[#444] dark:text-[#bbb] leading-[1.8]",
  highlight: "bg-[#fff8e1] dark:bg-[#3d3520] border-l-4 border-[#ffc107] p-5 rounded-r-lg mb-6",
  highlightTitle: "font-bold text-[#b38600] dark:text-[#ffd54f] mb-2",
  highlightText: "text-[14px] text-[#5d4e00] dark:text-[#ffe082] leading-[1.7]",
  stat: "text-center p-6",
  statNumber: "text-[36px] font-bold text-blue-600 dark:text-blue-400 mb-1",
  statLabel: "text-[14px] text-[#666] dark:text-[#999]",
}

const IntroductionPage = () => (
  <article className={style.page}>
    {/* 헤더 */}
    <header className="mb-16">
      <span className={style.badge}>v0.0.1</span>
      <h1 className={style.title}>STL Design System</h1>
      <p className={style.subtitle}>
        STL 시스템의 일관된 사용자 경험을 위한 공통 UI 컴포넌트 라이브러리입니다.<br />
        React + TypeScript + Tailwind CSS 기반으로 제작되었습니다.
      </p>
    </header>

    {/* 도입 효과 */}
    <section className={style.section}>
      <h2 className={style.sectionTitle}>디자인 시스템 도입 효과</h2>
      <div className={style.grid2}>
        <div className={style.benefitCard}>
          <div className={style.benefitIcon}>⚡</div>
          <h3 className={style.benefitTitle}>개발 속도 향상</h3>
          <p className={style.benefitDesc}>
            미리 만들어진 컴포넌트를 조합하여 빠르게 화면을 구성할 수 있습니다.
            반복적인 UI 개발 시간을 줄이고 비즈니스 로직에 집중할 수 있습니다.
          </p>
        </div>
        <div className={style.benefitCard}>
          <div className={style.benefitIcon}>🎨</div>
          <h3 className={style.benefitTitle}>디자인 일관성</h3>
          <p className={style.benefitDesc}>
            모든 서비스에서 동일한 UI/UX를 제공합니다.
            사용자는 어떤 서비스를 이용하더라도 익숙한 경험을 할 수 있습니다.
          </p>
        </div>
        <div className={style.benefitCard}>
          <div className={style.benefitIcon}>🔧</div>
          <h3 className={style.benefitTitle}>유지보수 용이</h3>
          <p className={style.benefitDesc}>
            디자인 변경 시 한 곳만 수정하면 모든 서비스에 자동 반영됩니다.
            버그 수정도 한 번에 여러 서비스에 적용됩니다.
          </p>
        </div>
        <div className={style.benefitCard}>
          <div className={style.benefitIcon}>📱</div>
          <h3 className={style.benefitTitle}>반응형 & 다크모드</h3>
          <p className={style.benefitDesc}>
            모든 컴포넌트가 모바일/태블릿/데스크톱을 지원합니다.
            다크모드도 기본 제공되어 별도 작업이 필요 없습니다.
          </p>
        </div>
      </div>
    </section>

    {/* 통계 */}
    <section className={style.section}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#f8f9fa] dark:bg-[#1e1e1e] rounded-2xl p-4">
        <div className={style.stat}>
          <div className={style.statNumber}>50+</div>
          <div className={style.statLabel}>UI 컴포넌트</div>
        </div>
        <div className={style.stat}>
          <div className={style.statNumber}>100+</div>
          <div className={style.statLabel}>아이콘</div>
        </div>
        <div className={style.stat}>
          <div className={style.statNumber}>100%</div>
          <div className={style.statLabel}>TypeScript</div>
        </div>
        <div className={style.stat}>
          <div className={style.statNumber}>✓</div>
          <div className={style.statLabel}>다크모드 지원</div>
        </div>
      </div>
    </section>

    {/* 컴포넌트 카테고리 */}
    <section className={style.section}>
      <h2 className={style.sectionTitle}>컴포넌트 카테고리</h2>
      <p className={style.p + " mb-6"}>
        왼쪽 사이드바에서 각 카테고리를 클릭하여 컴포넌트를 확인할 수 있습니다.
      </p>
      <div className={style.grid}>
        <div className={style.card}>
          <h3 className={style.cardTitle}>🧩 Components</h3>
          <p className={style.cardDesc}>Button, Input, Select, Modal, Checkbox, Badge, Tabs 등 기본 UI 컴포넌트</p>
        </div>
        <div className={style.card}>
          <h3 className={style.cardTitle}>📝 Form</h3>
          <p className={style.cardDesc}>FormCard, FormSection, DisplayField 등 폼 구성에 필요한 컴포넌트</p>
        </div>
        <div className={style.card}>
          <h3 className={style.cardTitle}>📊 Table</h3>
          <p className={style.cardDesc}>DataTable, Pagination, SearchForm 등 데이터 표시용 컴포넌트</p>
        </div>
        <div className={style.card}>
          <h3 className={style.cardTitle}>🏗️ Layout</h3>
          <p className={style.cardDesc}>AppShell, Sidebar, Header, Nav 등 페이지 레이아웃 구성 컴포넌트</p>
        </div>
        <div className={style.card}>
          <h3 className={style.cardTitle}>📈 Dashboard</h3>
          <p className={style.cardDesc}>DashboardCard, StatCard 등 대시보드 전용 컴포넌트</p>
        </div>
      </div>
    </section>

    {/* 기술 스택 */}
    <section className={style.section}>
      <h2 className={style.sectionTitle}>기술 스택</h2>
      <table className={style.table}>
        <thead>
          <tr>
            <th className={style.th}>구분</th>
            <th className={style.th}>기술</th>
            <th className={style.th}>설명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={style.td}>Framework</td>
            <td className={style.td}>React 18</td>
            <td className={style.td}>가장 널리 사용되는 UI 라이브러리</td>
          </tr>
          <tr>
            <td className={style.td}>Language</td>
            <td className={style.td}>TypeScript</td>
            <td className={style.td}>타입 안정성과 자동완성 지원</td>
          </tr>
          <tr>
            <td className={style.td}>Styling</td>
            <td className={style.td}>Tailwind CSS 4</td>
            <td className={style.td}>유틸리티 기반 CSS 프레임워크</td>
          </tr>
          <tr>
            <td className={style.td}>UI Base</td>
            <td className={style.td}>Radix UI</td>
            <td className={style.td}>접근성을 고려한 헤드리스 컴포넌트</td>
          </tr>
        </tbody>
      </table>
    </section>

    {/* 개발자용 */}
    <section className={style.section}>
      <h2 className={style.sectionTitle}>개발자 가이드</h2>

      <div className={style.highlight}>
        <div className={style.highlightTitle}>💡 시작하기 전에</div>
        <div className={style.highlightText}>
          이 디자인 시스템을 사용하려면 프로젝트에 React 18과 Tailwind CSS 4가 설치되어 있어야 합니다.
        </div>
      </div>

      <h3 className={style.h3}>1. 설치</h3>
      <pre className={style.code}>
        <code>npm install git+https://github.com/user/stl-design-system.git</code>
      </pre>

      <h3 className={style.h3}>2. 사용 예시</h3>
      <pre className={style.code}>
        <code>{`// 컴포넌트 import
import { Button, Input, Select } from 'stl-design-system'

// 아이콘 import
import { SearchIcon, DeleteIcon } from 'stl-design-system'

// 스타일 import (필수 - 앱 진입점에서 한 번만)
import 'stl-design-system/styles'`}</code>
      </pre>
    </section>

    {/* 다크모드 & 테마 전환 */}
    <section className={style.section}>
      <h2 className={style.sectionTitle}>다크모드</h2>
      <p className={style.p}>
        모든 컴포넌트는 라이트/다크 테마를 지원합니다.<br />
        상단의 <strong>🌙 / ☀️ 아이콘</strong>을 클릭하여 테마를 전환해보세요.
      </p>
    </section>

    {/* 푸터 */}
    <footer className="pt-8 border-t border-[#e5e5e5] dark:border-[#444] text-center">
      <p className="text-[13px] text-[#999] dark:text-[#666]">
        Copyright © 2026 STL. All Rights Reserved.
      </p>
    </footer>
  </article>
)

const meta = {
  title: "Introduction",
  component: IntroductionPage,
  parameters: {
    layout: "fullscreen",
    docs: { disable: true },
    controls: { disable: true },
    actions: { disable: true },
    backgrounds: { disable: true },
  },
} satisfies Meta<typeof IntroductionPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
