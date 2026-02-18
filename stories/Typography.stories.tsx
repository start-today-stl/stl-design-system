import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Foundation/Typography",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Tailwind CSS 기본 Typography 토큰
 * 용도별로 구분하여 사용합니다.
 */
const typographyTokens = [
  // Display (큰 숫자, 타이틀)
  {
    category: "Display",
    name: "5xl",
    className: "text-5xl",
    size: "48px (3rem)",
    usage: "대시보드 숫자, 큰 타이틀",
  },
  {
    category: "Display",
    name: "4xl",
    className: "text-4xl",
    size: "36px (2.25rem)",
    usage: "서브 디스플레이",
  },
  // Headings
  {
    category: "Heading",
    name: "2xl",
    className: "text-2xl",
    size: "24px (1.5rem)",
    usage: "페이지 타이틀",
  },
  {
    category: "Heading",
    name: "xl",
    className: "text-xl",
    size: "20px (1.25rem)",
    usage: "섹션 타이틀",
  },
  {
    category: "Heading",
    name: "lg",
    className: "text-lg",
    size: "18px (1.125rem)",
    usage: "카드/모달 타이틀",
  },
  // Body
  {
    category: "Body",
    name: "base",
    className: "text-base",
    size: "16px (1rem)",
    usage: "본문 기본",
  },
  {
    category: "Body",
    name: "sm",
    className: "text-sm",
    size: "14px (0.875rem)",
    usage: "본문 텍스트",
  },
  {
    category: "Body",
    name: "xs",
    className: "text-xs",
    size: "12px (0.75rem)",
    usage: "라벨, 버튼, 입력필드",
  },
  // Caption
  {
    category: "Caption",
    name: "10px",
    className: "text-[10px]",
    size: "10px",
    usage: "작은 텍스트",
  },
  {
    category: "Caption",
    name: "8px",
    className: "text-[8px]",
    size: "8px",
    usage: "아주 작은 텍스트",
  },
];

const TypographyRow = ({
  name,
  className,
  size,
  usage,
}: {
  name: string;
  className: string;
  size: string;
  usage: string;
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "80px 120px 140px 1fr",
      alignItems: "center",
      padding: "16px 0",
      borderBottom: "1px solid #e5e7eb",
      gap: "16px",
    }}
  >
    <span style={{ fontSize: "12px", color: "#666" }}>{name}</span>
    <code
      style={{
        fontSize: "11px",
        background: "#f3f4f6",
        padding: "2px 6px",
        borderRadius: "4px",
        color: "#1776ff",
      }}
    >
      {className}
    </code>
    <span style={{ fontSize: "12px", color: "#666" }}>{size}</span>
    <span className={className} style={{ color: "#292e36" }}>
      {usage}
    </span>
  </div>
);

export const Tokens: Story = {
  render: () => {
    const categories = ["Display", "Heading", "Body", "Caption"];

    return (
      <div>
        <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>
          Typography (Tailwind CSS)
        </h2>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>
          Tailwind CSS 기본 font-size 유틸리티
        </p>

        {categories.map((category) => (
          <div key={category} style={{ marginBottom: "32px" }}>
            <h3
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#1776ff",
                marginBottom: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {category}
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "80px 120px 140px 1fr",
                padding: "12px 0",
                borderBottom: "2px solid #e5e7eb",
                gap: "16px",
                fontSize: "11px",
                fontWeight: 600,
                color: "#888",
                textTransform: "uppercase",
              }}
            >
              <span>Name</span>
              <span>Class</span>
              <span>Size</span>
              <span>Preview</span>
            </div>

            {typographyTokens
              .filter((token) => token.category === category)
              .map((token) => (
                <TypographyRow key={token.name} {...token} />
              ))}
          </div>
        ))}
      </div>
    );
  },
};

export const Display: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <p style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>
          text-5xl (48px) - 대시보드 숫자
        </p>
        <p className="text-5xl font-heading" style={{ color: "#292e36" }}>
          1,234,567
        </p>
      </div>
      <div>
        <p style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>
          text-4xl (36px) - 서브 디스플레이
        </p>
        <p className="text-4xl font-heading" style={{ color: "#292e36" }}>
          987,654
        </p>
      </div>
    </div>
  ),
};

export const Headings: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <p style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>
          text-2xl (24px) - 페이지 타이틀
        </p>
        <p className="text-2xl font-semibold" style={{ color: "#292e36" }}>
          페이지 타이틀
        </p>
      </div>
      <div>
        <p style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>
          text-xl (20px) - 섹션 타이틀
        </p>
        <p className="text-xl font-semibold" style={{ color: "#292e36" }}>
          섹션 타이틀
        </p>
      </div>
      <div>
        <p style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>
          text-lg (18px) - 카드/모달 타이틀
        </p>
        <p className="text-lg font-semibold" style={{ color: "#292e36" }}>
          카드/모달 타이틀
        </p>
      </div>
    </div>
  ),
};

export const Body: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <p style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>
          text-base (16px) - 본문 기본
        </p>
        <p className="text-base" style={{ color: "#292e36" }}>
          기본 본문 텍스트입니다.
        </p>
      </div>
      <div>
        <p style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>
          text-sm (14px) - 본문 텍스트
        </p>
        <p className="text-sm" style={{ color: "#292e36" }}>
          본문 텍스트입니다. 일반적인 설명이나 정보를 표시할 때 사용합니다.
        </p>
      </div>
      <div>
        <p style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>
          text-xs (12px) - 라벨, 버튼, 입력필드
        </p>
        <p className="text-xs" style={{ color: "#292e36" }}>
          라벨, 버튼, 입력 필드에 사용되는 텍스트입니다.
        </p>
      </div>
    </div>
  ),
};

export const Caption: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <p style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>
          text-[10px] - 작은 텍스트
        </p>
        <p className="text-[10px]" style={{ color: "#292e36" }}>
          작은 보조 텍스트입니다.
        </p>
      </div>
      <div>
        <p style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}>
          text-[8px] - 아주 작은 텍스트
        </p>
        <p className="text-[8px]" style={{ color: "#292e36" }}>
          아주 작은 텍스트입니다.
        </p>
      </div>
    </div>
  ),
};
