import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Foundation/Shadows",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardShadow: Story = {
  render: () => (
    <div>
      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>
        Box Shadow
      </h2>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>
        STL Design System 그림자 토큰
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <div>
          <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "16px" }}>
            shadow-card
          </h3>
          <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            <div
              style={{
                width: "200px",
                height: "120px",
                backgroundColor: "#fff",
                borderRadius: "16px",
                boxShadow: "10px 10px 20px 0px rgba(234, 237, 241, 1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                color: "#666",
              }}
            >
              Card Shadow
            </div>
            <div>
              <code
                style={{
                  fontSize: "12px",
                  background: "#f3f4f6",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                shadow-card
              </code>
              <span style={{ fontSize: "12px", color: "#666" }}>
                10px 10px 20px 0px var(--color-shadow)
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "16px" }}>
            Focus Ring (Blue Glow)
          </h3>
          <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            <div
              style={{
                width: "200px",
                height: "36px",
                backgroundColor: "#fff",
                border: "1px solid #1776ff",
                borderRadius: "5px",
                boxShadow: "0px 0px 6px 0px rgba(23, 118, 255, 0.5)",
                display: "flex",
                alignItems: "center",
                padding: "0 12px",
                fontSize: "12px",
                color: "#666",
              }}
            >
              Focused Input
            </div>
            <div>
              <span style={{ fontSize: "12px", color: "#666" }}>
                0px 0px 6px 0px rgba(23, 118, 255, 0.5)
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "16px" }}>
            Error Focus (Red Glow)
          </h3>
          <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            <div
              style={{
                width: "200px",
                height: "36px",
                backgroundColor: "#fff",
                border: "1px solid #eb3e2a",
                borderRadius: "5px",
                boxShadow: "0px 0px 6px 0px rgba(239, 68, 68, 0.5)",
                display: "flex",
                alignItems: "center",
                padding: "0 12px",
                fontSize: "12px",
                color: "#8d2519",
              }}
            >
              Error Input
            </div>
            <div>
              <span style={{ fontSize: "12px", color: "#666" }}>
                0px 0px 6px 0px rgba(239, 68, 68, 0.5)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const DropdownShadow: Story = {
  name: "Dropdown Shadow",
  render: () => (
    <div>
      <h2 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>
        Dropdown / Popover Shadow
      </h2>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>
        드롭다운, 팝오버에 사용되는 그림자
      </p>

      <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>
        <div
          style={{
            width: "200px",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(12px)",
            border: "1px solid #eaedf1",
            borderRadius: "5px",
            boxShadow: "10px 10px 10px 0px rgba(0, 0, 0, 0.05)",
            padding: "5px",
          }}
        >
          <div
            style={{
              padding: "5px",
              fontSize: "12px",
              color: "#5e6977",
              borderRadius: "2px",
            }}
          >
            Option 1
          </div>
          <div
            style={{
              padding: "5px",
              fontSize: "12px",
              color: "#5e6977",
              borderRadius: "2px",
              backgroundColor: "#eaedf1",
            }}
          >
            Option 2
          </div>
          <div
            style={{
              padding: "5px",
              fontSize: "12px",
              color: "#5e6977",
              borderRadius: "2px",
            }}
          >
            Option 3
          </div>
        </div>
        <div>
          <p style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>
            Select/Dropdown Content
          </p>
          <code
            style={{
              fontSize: "11px",
              background: "#f3f4f6",
              padding: "4px 8px",
              borderRadius: "4px",
              display: "block",
            }}
          >
            shadow-[10px_10px_10px_0px_rgba(0,0,0,0.05)]
          </code>
          <p style={{ fontSize: "11px", color: "#666", marginTop: "8px" }}>
            backdrop-blur-[12px] + bg-white/50
          </p>
        </div>
      </div>
    </div>
  ),
};
