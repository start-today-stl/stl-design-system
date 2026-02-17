import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  AddIcon,
  AdjustIcon,
  BellIcon,
  BoxIcon,
  CalendarIcon,
  CashIcon,
  ChatIcon,
  DeleteIcon,
  DownIcon,
  DownloadIcon,
  DragHandleIcon,
  DuplicationIcon,
  EnglishIcon,
  EyeIcon,
  FilterIcon,
  GraphIcon,
  HomeAllIcon,
  HomeArchivingIcon,
  HomeChatIcon,
  HomeFinishedIcon,
  HomeIcon,
  HomeReturnIcon,
  HomeShipIcon,
  HomeWaitingIcon,
  InformationIcon,
  JapaneseIcon,
  KoreanIcon,
  LeftIcon,
  LocationIcon,
  LockIcon,
  MenuHorizontalIcon,
  MenuVerticalIcon,
  NaviHomeIcon,
  NaviOrderIcon,
  NaviSaleIcon,
  NaviShipIcon,
  NaviStockIcon,
  NoticeIcon,
  OIcon,
  OptionHorizontalIcon,
  OptionVerticalIcon,
  PageIcon,
  PenIcon,
  PhoneIcon,
  PhotoIcon,
  PostingIcon,
  ProcessingIcon,
  ProductArchive2Icon,
  ProductArchiveIcon,
  ProductDefaultIcon,
  ProductDownIcon,
  ProductReturnIcon,
  ProductStackIcon,
  ProductUpIcon,
  ProductWaitingIcon,
  ProfileIcon,
  RightIcon,
  SaveIcon,
  SearchIcon,
  SettingsIcon,
  ShipIcon,
  STLArrowIcon,
  SwitchIcon,
  TriangleIcon,
  UpIcon,
  UploadIcon,
  WriteIcon,
  XIcon,
} from "../src/icons";

// 기본 아이콘 (Figma Frame 1 - 50개)
const basicIcons = [
  { name: "OptionVerticalIcon", component: OptionVerticalIcon },
  { name: "OptionHorizontalIcon", component: OptionHorizontalIcon },
  { name: "MenuHorizontalIcon", component: MenuHorizontalIcon },
  { name: "MenuVerticalIcon", component: MenuVerticalIcon },
  { name: "UpIcon", component: UpIcon },
  { name: "DownIcon", component: DownIcon },
  { name: "LeftIcon", component: LeftIcon },
  { name: "RightIcon", component: RightIcon },
  { name: "FilterIcon", component: FilterIcon },
  { name: "LocationIcon", component: LocationIcon },
  { name: "InformationIcon", component: InformationIcon },
  { name: "DeleteIcon", component: DeleteIcon },
  { name: "PhoneIcon", component: PhoneIcon },
  { name: "DuplicationIcon", component: DuplicationIcon },
  { name: "SettingsIcon", component: SettingsIcon },
  { name: "SwitchIcon", component: SwitchIcon },
  { name: "SearchIcon", component: SearchIcon },
  { name: "PenIcon", component: PenIcon },
  { name: "GraphIcon", component: GraphIcon },
  { name: "CalendarIcon", component: CalendarIcon },
  { name: "ProductArchive2Icon", component: ProductArchive2Icon },
  { name: "AddIcon", component: AddIcon },
  { name: "ProductReturnIcon", component: ProductReturnIcon },
  { name: "ProductWaitingIcon", component: ProductWaitingIcon },
  { name: "ProductStackIcon", component: ProductStackIcon },
  { name: "ProductArchiveIcon", component: ProductArchiveIcon },
  { name: "ProductDownIcon", component: ProductDownIcon },
  { name: "ProductUpIcon", component: ProductUpIcon },
  { name: "ProductDefaultIcon", component: ProductDefaultIcon },
  { name: "HomeIcon", component: HomeIcon },
  { name: "NoticeIcon", component: NoticeIcon },
  { name: "ChatIcon", component: ChatIcon },
  { name: "ProfileIcon", component: ProfileIcon },
  { name: "BellIcon", component: BellIcon },
  { name: "PageIcon", component: PageIcon },
  { name: "CashIcon", component: CashIcon },
  { name: "AdjustIcon", component: AdjustIcon },
  { name: "PostingIcon", component: PostingIcon },
  { name: "ShipIcon", component: ShipIcon },
  { name: "LockIcon", component: LockIcon },
  { name: "PhotoIcon", component: PhotoIcon },
  { name: "UploadIcon", component: UploadIcon },
  { name: "DownloadIcon", component: DownloadIcon },
  { name: "SaveIcon", component: SaveIcon },
  { name: "BoxIcon", component: BoxIcon },
  { name: "OIcon", component: OIcon },
  { name: "XIcon", component: XIcon },
  { name: "TriangleIcon", component: TriangleIcon },
  { name: "ProcessingIcon", component: ProcessingIcon },
  { name: "EyeIcon", component: EyeIcon },
];

// 언어 아이콘 (Figma Frame 2)
const languageIcons = [
  { name: "KoreanIcon", component: KoreanIcon },
  { name: "EnglishIcon", component: EnglishIcon },
  { name: "JapaneseIcon", component: JapaneseIcon },
];

// 네비게이션 아이콘 (Figma Frame 3)
const navigationIcons = [
  { name: "NaviHomeIcon", component: NaviHomeIcon },
  { name: "NaviSaleIcon", component: NaviSaleIcon },
  { name: "NaviOrderIcon", component: NaviOrderIcon },
  { name: "NaviShipIcon", component: NaviShipIcon },
  { name: "NaviStockIcon", component: NaviStockIcon },
  { name: "STLArrowIcon", component: STLArrowIcon },
];

// Home 변형 아이콘 (Figma Frame 4)
const homeVariantIcons = [
  { name: "HomeShipIcon", component: HomeShipIcon },
  { name: "HomeArchivingIcon", component: HomeArchivingIcon },
  { name: "HomeWaitingIcon", component: HomeWaitingIcon },
  { name: "HomeFinishedIcon", component: HomeFinishedIcon },
  { name: "HomeReturnIcon", component: HomeReturnIcon },
  { name: "HomeChatIcon", component: HomeChatIcon },
  { name: "HomeAllIcon", component: HomeAllIcon },
];

// 기타 아이콘 (커스텀/복원된 아이콘)
const otherIcons = [
  { name: "DragHandleIcon", component: DragHandleIcon },
  { name: "WriteIcon", component: WriteIcon },
];

const meta = {
  title: "Foundation/Icons",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const IconGrid = ({
  icons,
  title,
}: {
  icons: { name: string; component: React.ComponentType<{ size?: number }> }[];
  title: string;
}) => (
  <div style={{ marginBottom: "32px" }}>
    <h3 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "16px", color: "#333" }}>
      {title} ({icons.length}개)
    </h3>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(10, 1fr)",
        gap: "8px",
      }}
    >
      {icons.map(({ name, component: Icon }) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "12px 4px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            gap: "8px",
          }}
        >
          <Icon size={24} />
          <span
            style={{
              fontSize: "9px",
              color: "#666",
              textAlign: "center",
              wordBreak: "break-all",
              lineHeight: 1.2,
            }}
          >
            {name.replace("Icon", "")}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// 전체 아이콘 갤러리
export const Gallery: Story = {
  render: () => (
    <div>
      <IconGrid icons={basicIcons} title="기본 아이콘 (Figma Frame 1)" />
      <IconGrid icons={languageIcons} title="언어 아이콘 (Figma Frame 2)" />
      <IconGrid icons={navigationIcons} title="네비게이션 아이콘 (Figma Frame 3)" />
      <IconGrid icons={homeVariantIcons} title="Home 변형 아이콘 (Figma Frame 4)" />
      <IconGrid icons={otherIcons} title="기타 아이콘 (커스텀/복원)" />
    </div>
  ),
};

// 크기 비교
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <span style={{ width: "60px", fontSize: "12px", color: "#666" }}>16px</span>
        <SearchIcon size={16} />
        <DeleteIcon size={16} />
        <UploadIcon size={16} />
        <HomeIcon size={16} />
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <span style={{ width: "60px", fontSize: "12px", color: "#666" }}>20px</span>
        <SearchIcon size={20} />
        <DeleteIcon size={20} />
        <UploadIcon size={20} />
        <HomeIcon size={20} />
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <span style={{ width: "60px", fontSize: "12px", color: "#666" }}>24px</span>
        <SearchIcon size={24} />
        <DeleteIcon size={24} />
        <UploadIcon size={24} />
        <HomeIcon size={24} />
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <span style={{ width: "60px", fontSize: "12px", color: "#666" }}>32px</span>
        <SearchIcon size={32} />
        <DeleteIcon size={32} />
        <UploadIcon size={32} />
        <HomeIcon size={32} />
      </div>
    </div>
  ),
};

// 색상 적용
export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <span style={{ width: "80px", fontSize: "12px", color: "#666" }}>Default</span>
        <SearchIcon size={24} />
        <DeleteIcon size={24} />
        <UploadIcon size={24} />
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "center", color: "#3b82f6" }}>
        <span style={{ width: "80px", fontSize: "12px", color: "#666" }}>Primary</span>
        <SearchIcon size={24} />
        <DeleteIcon size={24} />
        <UploadIcon size={24} />
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "center", color: "#ef4444" }}>
        <span style={{ width: "80px", fontSize: "12px", color: "#666" }}>Danger</span>
        <SearchIcon size={24} />
        <DeleteIcon size={24} />
        <UploadIcon size={24} />
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "center", color: "#22c55e" }}>
        <span style={{ width: "80px", fontSize: "12px", color: "#666" }}>Success</span>
        <SearchIcon size={24} />
        <DeleteIcon size={24} />
        <UploadIcon size={24} />
      </div>
    </div>
  ),
};
