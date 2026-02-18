import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Foundation/Border Radius",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const radiusTokens = [
  { name: "sm", value: "0.25rem (4px)", variable: "--radius-sm", px: 4 },
  { name: "md", value: "0.375rem (6px)", variable: "--radius-md", px: 6 },
  { name: "lg", value: "0.5rem (8px)", variable: "--radius-lg", px: 8 },
  { name: "xl", value: "0.75rem (12px)", variable: "--radius-xl", px: 12 },
  { name: "2xl", value: "1rem (16px)", variable: "--radius-2xl", px: 16 },
];

const RadiusCard = ({
  name,
  value,
  variable,
  px,
}: {
  name: string;
  value: string;
  variable: string;
  px: number;
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "12px",
      padding: "16px",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
    }}
  >
    <div
      style={{
        width: "80px",
        height: "80px",
        backgroundColor: "#1776ff",
        borderRadius: `${px}px`,
      }}
    />
    <div style={{ textAlign: "center" }}>
      <p style={{ fontSize: "14px", fontWeight: 500, color: "#292e36", marginBottom: "4px" }}>
        rounded-{name}
      </p>
      <code style={{ fontSize: "11px", color: "#888" }}>{value}</code>
    </div>
  </div>
);

export const Scale: Story = {
  render: () => (
    <div>
      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>
        Border Radius Scale
      </h2>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>
        모서리 둥글기 토큰
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "16px",
        }}
      >
        {radiusTokens.map((token) => (
          <RadiusCard key={token.name} {...token} />
        ))}
      </div>
    </div>
  ),
};

export const Comparison: Story = {
  name: "Use Cases",
  render: () => (
    <div>
      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>
        Use Cases
      </h2>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>
        컴포넌트별 Border Radius 사용 예시
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div
            style={{
              padding: "8px 16px",
              background: "#1776ff",
              color: "#fff",
              borderRadius: "4px",
              fontSize: "12px",
            }}
          >
            Button (rounded-sm)
          </div>
          <code style={{ fontSize: "11px", color: "#888" }}>4px</code>
        </div>

        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div
            style={{
              padding: "8px 12px",
              border: "1px solid #d4dae3",
              borderRadius: "5px",
              fontSize: "12px",
              width: "200px",
              color: "#94a3b8",
            }}
          >
            Input (5px)
          </div>
          <code style={{ fontSize: "11px", color: "#888" }}>5px (custom)</code>
        </div>

        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div
            style={{
              padding: "16px",
              border: "1px solid #d4dae3",
              borderRadius: "8px",
              fontSize: "12px",
              width: "200px",
            }}
          >
            Card (rounded-lg)
          </div>
          <code style={{ fontSize: "11px", color: "#888" }}>8px</code>
        </div>

        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div
            style={{
              padding: "24px",
              border: "1px solid #d4dae3",
              borderRadius: "16px",
              fontSize: "12px",
              width: "200px",
            }}
          >
            Modal (rounded-2xl)
          </div>
          <code style={{ fontSize: "11px", color: "#888" }}>16px</code>
        </div>
      </div>
    </div>
  ),
};
