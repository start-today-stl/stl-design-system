import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Foundation/Spacing",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const spacingTokens = [
  { name: "0", value: "0px", variable: "--spacing-0" },
  { name: "1", value: "4px", variable: "--spacing-1" },
  { name: "2", value: "8px", variable: "--spacing-2" },
  { name: "3", value: "12px", variable: "--spacing-3" },
  { name: "4", value: "16px", variable: "--spacing-4" },
  { name: "5", value: "20px", variable: "--spacing-5" },
  { name: "6", value: "24px", variable: "--spacing-6" },
  { name: "8", value: "32px", variable: "--spacing-8" },
  { name: "10", value: "40px", variable: "--spacing-10" },
  { name: "12", value: "48px", variable: "--spacing-12" },
  { name: "16", value: "64px", variable: "--spacing-16" },
];

const semanticSpacing = [
  { name: "gap-button", value: "8px", variable: "--gap-button", usage: "버튼 사이 간격" },
  { name: "gap-form-field", value: "16px", variable: "--gap-form-field", usage: "폼 필드 사이 간격" },
  { name: "gap-section", value: "24px", variable: "--gap-section", usage: "섹션 사이 간격" },
  { name: "padding-card", value: "16px", variable: "--padding-card", usage: "카드 내부 패딩" },
  { name: "padding-page", value: "20px", variable: "--padding-page", usage: "페이지 컨텐츠 패딩" },
];

const SpacingRow = ({
  name,
  value,
  variable,
}: {
  name: string;
  value: string;
  variable: string;
}) => {
  const numValue = parseInt(value);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "80px 120px 200px 1fr",
        alignItems: "center",
        padding: "12px 0",
        borderBottom: "1px solid #e5e7eb",
        gap: "16px",
      }}
    >
      <code
        style={{
          fontSize: "12px",
          background: "#e8f1ff",
          padding: "2px 8px",
          borderRadius: "4px",
          color: "#0d5ad4",
        }}
      >
        {name}
      </code>
      <span style={{ fontSize: "12px", color: "#666" }}>{value}</span>
      <code style={{ fontSize: "11px", color: "#666" }}>{variable}</code>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            width: `${numValue}px`,
            height: "24px",
            backgroundColor: "#1776ff",
            borderRadius: "2px",
            minWidth: numValue === 0 ? "2px" : undefined,
          }}
        />
        {numValue > 0 && (
          <span style={{ fontSize: "10px", color: "#666" }}>{numValue}px</span>
        )}
      </div>
    </div>
  );
};

export const Scale: Story = {
  render: () => (
    <div>
      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>
        Spacing Scale
      </h2>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>
        4px 기반 스페이싱 스케일 (Tailwind: p-1, m-2, gap-4 등)
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "80px 120px 200px 1fr",
          padding: "12px 0",
          borderBottom: "2px solid #e5e7eb",
          gap: "16px",
          fontSize: "11px",
          fontWeight: 600,
          color: "#666",
          textTransform: "uppercase",
        }}
      >
        <span>Token</span>
        <span>Value</span>
        <span>CSS Variable</span>
        <span>Preview</span>
      </div>

      {spacingTokens.map((token) => (
        <SpacingRow key={token.name} {...token} />
      ))}
    </div>
  ),
};

export const Semantic: Story = {
  render: () => (
    <div>
      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>
        Semantic Spacing
      </h2>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>
        용도별 시맨틱 스페이싱 토큰
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {semanticSpacing.map((token) => (
          <div
            key={token.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "16px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                width: `${parseInt(token.value)}px`,
                height: "32px",
                backgroundColor: "#1776ff",
                borderRadius: "4px",
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "14px", fontWeight: 500, color: "#292e36", marginBottom: "2px" }}>
                {token.name}
              </p>
              <code style={{ fontSize: "11px", color: "#666" }}>{token.variable}</code>
            </div>
            <span style={{ fontSize: "12px", color: "#666" }}>{token.value}</span>
            <span style={{ fontSize: "12px", color: "#666" }}>{token.usage}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Usage: Story = {
  render: () => (
    <div>
      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>
        Usage Examples
      </h2>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>
        스페이싱 토큰 사용 예시
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "12px" }}>
            Tailwind Classes
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <code style={{ fontSize: "12px", background: "#f3f4f6", padding: "8px 12px", borderRadius: "4px" }}>
              p-4 (padding: 16px)
            </code>
            <code style={{ fontSize: "12px", background: "#f3f4f6", padding: "8px 12px", borderRadius: "4px" }}>
              m-2 (margin: 8px)
            </code>
            <code style={{ fontSize: "12px", background: "#f3f4f6", padding: "8px 12px", borderRadius: "4px" }}>
              gap-6 (gap: 24px)
            </code>
            <code style={{ fontSize: "12px", background: "#f3f4f6", padding: "8px 12px", borderRadius: "4px" }}>
              px-5 py-3 (padding: 12px 20px)
            </code>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "12px" }}>
            예시: 카드 레이아웃
          </h3>
          <div
            style={{
              padding: "16px",
              border: "1px solid #d4dae3",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div style={{ fontSize: "14px", fontWeight: 500 }}>카드 타이틀</div>
            <div style={{ display: "flex", gap: "8px" }}>
              <div style={{ padding: "8px 12px", background: "#125ecc", color: "#fff", borderRadius: "4px", fontSize: "12px" }}>
                버튼 1
              </div>
              <div style={{ padding: "8px 12px", background: "#eaedf1", borderRadius: "4px", fontSize: "12px" }}>
                버튼 2
              </div>
            </div>
          </div>
          <code style={{ fontSize: "11px", color: "#666", marginTop: "8px", display: "block" }}>
            padding: padding-card (16px), gap: gap-form-field (16px), buttons: gap-button (8px)
          </code>
        </div>
      </div>
    </div>
  ),
};
