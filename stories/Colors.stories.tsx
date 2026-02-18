import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Foundation/Colors",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ColorSwatch = ({
  name,
  color,
  textColor = "#fff",
}: {
  name: string;
  color: string;
  textColor?: string;
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    }}
  >
    <div
      style={{
        width: "80px",
        height: "48px",
        backgroundColor: color,
        borderRadius: "6px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        padding: "4px 6px",
        border: "1px solid rgba(0,0,0,0.1)",
      }}
    >
      <span style={{ fontSize: "10px", color: textColor }}>{name}</span>
    </div>
    <span style={{ fontSize: "10px", color: "#666" }}>{color}</span>
  </div>
);

const ColorRow = ({
  title,
  colors,
}: {
  title: string;
  colors: { name: string; color: string; textColor?: string }[];
}) => (
  <div style={{ marginBottom: "32px" }}>
    <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "12px", color: "#333" }}>
      {title}
    </h3>
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      {colors.map((c) => (
        <ColorSwatch key={c.name} {...c} />
      ))}
    </div>
  </div>
);

const blueColors = [
  { name: "50", color: "#e8f1ff", textColor: "#092f66" },
  { name: "100", color: "#d1e4ff", textColor: "#092f66" },
  { name: "200", color: "#a2c8ff", textColor: "#092f66" },
  { name: "300", color: "#74adff", textColor: "#092f66" },
  { name: "400", color: "#4591ff", textColor: "#fff" },
  { name: "500", color: "#1776ff", textColor: "#fff" },
  { name: "600", color: "#125ecc", textColor: "#fff" },
  { name: "700", color: "#0e4799", textColor: "#fff" },
  { name: "800", color: "#092f66", textColor: "#fff" },
  { name: "900", color: "#051833", textColor: "#fff" },
  { name: "950", color: "#020c1a", textColor: "#fff" },
];

const redColors = [
  { name: "50", color: "#fdecea", textColor: "#5e1911" },
  { name: "100", color: "#fbd8d4", textColor: "#5e1911" },
  { name: "200", color: "#f7b2aa", textColor: "#5e1911" },
  { name: "300", color: "#f38b7f", textColor: "#5e1911" },
  { name: "400", color: "#ef6555", textColor: "#fff" },
  { name: "500", color: "#eb3e2a", textColor: "#fff" },
  { name: "600", color: "#bc3222", textColor: "#fff" },
  { name: "700", color: "#8d2519", textColor: "#fff" },
  { name: "800", color: "#5e1911", textColor: "#fff" },
  { name: "900", color: "#2f0c08", textColor: "#fff" },
  { name: "950", color: "#180604", textColor: "#fff" },
];

const greenColors = [
  { name: "50", color: "#d2f8cf", textColor: "#064c00" },
  { name: "100", color: "#bdf2b8", textColor: "#064c00" },
  { name: "200", color: "#91e58a", textColor: "#064c00" },
  { name: "300", color: "#66d75c", textColor: "#064c00" },
  { name: "400", color: "#3aca2e", textColor: "#fff" },
  { name: "500", color: "#0fbd00", textColor: "#fff" },
  { name: "600", color: "#0c9700", textColor: "#fff" },
  { name: "700", color: "#097100", textColor: "#fff" },
  { name: "800", color: "#064c00", textColor: "#fff" },
  { name: "900", color: "#032600", textColor: "#fff" },
  { name: "950", color: "#021300", textColor: "#fff" },
];

const slateColors = [
  { name: "50", color: "#f4f6f8", textColor: "#292e36" },
  { name: "100", color: "#eaedf1", textColor: "#292e36" },
  { name: "200", color: "#d4dae3", textColor: "#292e36" },
  { name: "300", color: "#bfc8d4", textColor: "#292e36" },
  { name: "400", color: "#a9b5c6", textColor: "#292e36" },
  { name: "500", color: "#94a3b8", textColor: "#fff" },
  { name: "600", color: "#798698", textColor: "#fff" },
  { name: "700", color: "#5e6977", textColor: "#fff" },
  { name: "800", color: "#444b57", textColor: "#fff" },
  { name: "900", color: "#292e36", textColor: "#fff" },
  { name: "950", color: "#1b2026", textColor: "#fff" },
];

export const Palette: Story = {
  render: () => (
    <div>
      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>
        Color Palette
      </h2>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "32px" }}>
        STL Design System 컬러 팔레트
      </p>

      <ColorRow title="Blue (Primary, Brand, CTA)" colors={blueColors} />
      <ColorRow title="Red (Danger, Destructive)" colors={redColors} />
      <ColorRow title="Green (Success, Positive)" colors={greenColors} />
      <ColorRow title="Slate (Neutral, Text, Border)" colors={slateColors} />
    </div>
  ),
};

const semanticColors = [
  { name: "Primary", color: "#1776ff", variable: "--color-primary" },
  { name: "Destructive", color: "#eb3e2a", variable: "--color-destructive" },
  { name: "Success", color: "#0fbd00", variable: "--color-success" },
  { name: "Background", color: "#ffffff", variable: "--color-background", textColor: "#292e36" },
  { name: "Foreground", color: "#292e36", variable: "--color-foreground" },
  { name: "Card", color: "#ffffff", variable: "--color-card", textColor: "#292e36" },
  { name: "Border", color: "#d4dae3", variable: "--color-border", textColor: "#292e36" },
  { name: "Muted", color: "#eaedf1", variable: "--color-muted", textColor: "#292e36" },
  { name: "Accent", color: "#e8f1ff", variable: "--color-accent", textColor: "#092f66" },
];

const SemanticColorCard = ({
  name,
  color,
  variable,
  textColor = "#fff",
}: {
  name: string;
  color: string;
  variable: string;
  textColor?: string;
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "16px",
      padding: "12px",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
    }}
  >
    <div
      style={{
        width: "48px",
        height: "48px",
        backgroundColor: color,
        borderRadius: "6px",
        border: "1px solid rgba(0,0,0,0.1)",
      }}
    />
    <div style={{ flex: 1 }}>
      <p style={{ fontSize: "14px", fontWeight: 500, color: "#292e36", marginBottom: "2px" }}>
        {name}
      </p>
      <code style={{ fontSize: "11px", color: "#666" }}>{variable}</code>
    </div>
    <span style={{ fontSize: "12px", color: "#888" }}>{color}</span>
  </div>
);

export const SemanticColors: Story = {
  name: "Semantic",
  render: () => (
    <div>
      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>
        Semantic Colors
      </h2>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>
        의미 기반 컬러 토큰 (Light Mode)
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "12px",
        }}
      >
        {semanticColors.map((c) => (
          <SemanticColorCard key={c.name} {...c} />
        ))}
      </div>
    </div>
  ),
};

const textColors = [
  { name: "Primary", color: "#292e36", variable: "--color-text-primary", className: "text-text-primary" },
  { name: "Secondary", color: "#798698", variable: "--color-text-secondary", className: "text-text-secondary" },
  { name: "Disabled", color: "#bfc8d4", variable: "--color-text-disabled", className: "text-text-disabled" },
];

export const TextColors: Story = {
  name: "Text Colors",
  render: () => (
    <div>
      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>
        Text Colors
      </h2>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>
        텍스트에 사용되는 시맨틱 컬러
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {textColors.map((c) => (
          <div
            key={c.name}
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
                width: "32px",
                height: "32px",
                backgroundColor: c.color,
                borderRadius: "4px",
                border: "1px solid rgba(0,0,0,0.1)",
              }}
            />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "14px", fontWeight: 500, color: "#292e36" }}>
                {c.name}
              </p>
              <code style={{ fontSize: "11px", color: "#888" }}>{c.className}</code>
            </div>
            <p style={{ fontSize: "16px", color: c.color }}>
              가나다라마바사 ABCDEFG 1234567
            </p>
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
        컬러 토큰 사용 예시
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "12px" }}>
            Tailwind Classes
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <code style={{ fontSize: "12px", background: "#f3f4f6", padding: "8px 12px", borderRadius: "4px" }}>
              bg-blue-500, text-blue-500, border-blue-500
            </code>
            <code style={{ fontSize: "12px", background: "#f3f4f6", padding: "8px 12px", borderRadius: "4px" }}>
              bg-primary, text-primary, border-primary
            </code>
            <code style={{ fontSize: "12px", background: "#f3f4f6", padding: "8px 12px", borderRadius: "4px" }}>
              text-text-primary, text-text-secondary, text-text-disabled
            </code>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "12px" }}>
            CSS Variables
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <code style={{ fontSize: "12px", background: "#f3f4f6", padding: "8px 12px", borderRadius: "4px" }}>
              color: var(--color-blue-500);
            </code>
            <code style={{ fontSize: "12px", background: "#f3f4f6", padding: "8px 12px", borderRadius: "4px" }}>
              background-color: var(--color-primary);
            </code>
          </div>
        </div>
      </div>
    </div>
  ),
};
