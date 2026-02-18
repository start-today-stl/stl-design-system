import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Foundation/Fonts",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const FontFamilies: Story = {
  name: "Font Families",
  render: () => (
    <div>
      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>
        Font Families
      </h2>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "32px" }}>
        STL Design System에서 사용하는 폰트 패밀리
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        {/* STL Gothic R */}
        <div
          style={{
            padding: "24px",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "4px" }}>
              STL Gothic R
            </h3>
            <code style={{ fontSize: "11px", color: "#888" }}>
              --font-heading / font-heading
            </code>
          </div>
          <p style={{ fontSize: "12px", color: "#666", marginBottom: "16px" }}>
            숫자, 디스플레이 텍스트에 사용되는 커스텀 폰트
          </p>
          <div
            className="font-heading"
            style={{ fontSize: "48px", color: "#292e36", marginBottom: "8px" }}
          >
            1,234,567,890
          </div>
          <div
            className="font-heading"
            style={{ fontSize: "36px", color: "#292e36" }}
          >
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
          </div>
        </div>

        {/* Pretendard */}
        <div
          style={{
            padding: "24px",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "4px" }}>
              Pretendard Variable
            </h3>
            <code style={{ fontSize: "11px", color: "#888" }}>
              --font-sans (기본 폰트)
            </code>
          </div>
          <p style={{ fontSize: "12px", color: "#666", marginBottom: "16px" }}>
            본문, 라벨, 버튼 등 일반 UI 텍스트에 사용
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <span style={{ fontSize: "11px", color: "#888", display: "block", marginBottom: "4px" }}>
                SemiBold (600)
              </span>
              <p style={{ fontSize: "24px", fontWeight: 600, color: "#292e36" }}>
                가나다라마바사 아자차카타파하
              </p>
            </div>
            <div>
              <span style={{ fontSize: "11px", color: "#888", display: "block", marginBottom: "4px" }}>
                Medium (500)
              </span>
              <p style={{ fontSize: "14px", fontWeight: 500, color: "#292e36" }}>
                The quick brown fox jumps over the lazy dog. 다람쥐 헌 쳇바퀴에 타고파.
              </p>
            </div>
            <div>
              <span style={{ fontSize: "11px", color: "#888", display: "block", marginBottom: "4px" }}>
                Regular (400)
              </span>
              <p style={{ fontSize: "12px", fontWeight: 400, color: "#292e36" }}>
                0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Setup: Story = {
  render: () => (
    <div>
      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>
        Font Setup
      </h2>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>
        프로젝트에 폰트를 설정하는 방법
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "12px" }}>
            1. Pretendard 폰트 로드 (index.html)
          </h3>
          <pre
            style={{
              fontSize: "12px",
              background: "#1b2026",
              color: "#e5e7eb",
              padding: "16px",
              borderRadius: "8px",
              overflow: "auto",
            }}
          >
{`<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
/>`}
          </pre>
        </div>

        <div>
          <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "12px" }}>
            2. CSS 설정 (index.css)
          </h3>
          <pre
            style={{
              fontSize: "12px",
              background: "#1b2026",
              color: "#e5e7eb",
              padding: "16px",
              borderRadius: "8px",
              overflow: "auto",
            }}
          >
{`@import "tailwindcss";
@import "stl-design-system/tokens";

/* Tailwind v4: node_modules 내 디자인 시스템 스캔 */
@source "../node_modules/stl-design-system/dist";

/* ⚠️ Tailwind v4 @layer 이슈 해결 (아래 참고) */
body {
  font-family: var(--font-sans);
}

.font-heading {
  font-family: var(--font-heading);
}`}
          </pre>

          {/* Tailwind v4 이슈 설명 */}
          <div
            style={{
              marginTop: "16px",
              padding: "16px",
              background: "#fef3c7",
              border: "1px solid #f59e0b",
              borderRadius: "8px",
            }}
          >
            <h4 style={{ fontSize: "13px", fontWeight: 600, color: "#92400e", marginBottom: "8px" }}>
              ⚠️ Tailwind v4 @layer 이슈
            </h4>
            <p style={{ fontSize: "12px", color: "#78350f", marginBottom: "8px" }}>
              <strong>문제:</strong> Tailwind v4에서 외부 패키지(node_modules)의 <code>@layer base</code> 규칙이
              사용처 프로젝트에서 제대로 적용되지 않는 이슈가 있습니다.
            </p>
            <p style={{ fontSize: "12px", color: "#78350f", marginBottom: "8px" }}>
              <strong>증상:</strong> 폰트가 시스템 기본 폰트로 표시됨
            </p>
            <p style={{ fontSize: "12px", color: "#78350f" }}>
              <strong>해결:</strong> 위 코드처럼 <code>body</code>와 <code>.font-heading</code>을
              프로젝트 CSS에 직접 선언하면 됩니다. (디자인 시스템 토큰 변수 사용)
            </p>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "12px" }}>
            3. 사용
          </h3>
          <pre
            style={{
              fontSize: "12px",
              background: "#1b2026",
              color: "#e5e7eb",
              padding: "16px",
              borderRadius: "8px",
              overflow: "auto",
            }}
          >
{`{/* 기본 폰트 (Pretendard) - 자동 적용 */}
<p className="text-body-1">본문 텍스트</p>

{/* STL Gothic R - 숫자/디스플레이에 사용 */}
<p className="text-display-1 font-heading">1,234,567</p>`}
          </pre>
        </div>
      </div>
    </div>
  ),
};
