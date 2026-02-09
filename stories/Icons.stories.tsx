import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  AdjustIcon,
  AlarmIcon,
  AttachIcon,
  BoardIcon,
  BoxIcon,
  CalenderIcon,
  CashIcon,
  ChatIcon,
  DeleteIcon,
  DownIcon,
  FilterIcon,
  GraphIcon,
  HomeIcon,
  InformationIcon,
  LabelIcon,
  LeftIcon,
  LocationIcon,
  LockIcon,
  MainCenterIcon,
  MainChatIcon,
  MainFinishedIcon,
  MainNonStoreIcon,
  MainReturnIcon,
  MainShippingIcon,
  MainStoreIcon,
  MainTotalIcon,
  NoticeIcon,
  OIcon,
  PageIcon,
  PhoneIcon,
  PhotoIcon,
  PostIcon,
  ProductIcon,
  ProfileIcon,
  RightIcon,
  SaveIcon,
  SearchIcon,
  SettingIcon,
  ShiftIcon,
  ShipIcon,
  StockIcon,
  Title1Icon,
  TitleIcon,
  UnreceivedIcon,
  UpIcon,
  UploadIcon,
  WriteIcon,
  XIcon,
} from '../src/icons'

// 일반 아이콘 (24x24 / 32x32)
const icons = [
  { name: 'AdjustIcon', component: AdjustIcon },
  { name: 'AlarmIcon', component: AlarmIcon },
  { name: 'AttachIcon', component: AttachIcon },
  { name: 'BoardIcon', component: BoardIcon },
  { name: 'BoxIcon', component: BoxIcon },
  { name: 'CalenderIcon', component: CalenderIcon },
  { name: 'CashIcon', component: CashIcon },
  { name: 'ChatIcon', component: ChatIcon },
  { name: 'DeleteIcon', component: DeleteIcon },
  { name: 'DownIcon', component: DownIcon },
  { name: 'FilterIcon', component: FilterIcon },
  { name: 'GraphIcon', component: GraphIcon },
  { name: 'HomeIcon', component: HomeIcon },
  { name: 'InformationIcon', component: InformationIcon },
  { name: 'LabelIcon', component: LabelIcon },
  { name: 'LeftIcon', component: LeftIcon },
  { name: 'LocationIcon', component: LocationIcon },
  { name: 'LockIcon', component: LockIcon },
  { name: 'NoticeIcon', component: NoticeIcon },
  { name: 'OIcon', component: OIcon },
  { name: 'PageIcon', component: PageIcon },
  { name: 'PhoneIcon', component: PhoneIcon },
  { name: 'PhotoIcon', component: PhotoIcon },
  { name: 'PostIcon', component: PostIcon },
  { name: 'ProductIcon', component: ProductIcon },
  { name: 'ProfileIcon', component: ProfileIcon },
  { name: 'RightIcon', component: RightIcon },
  { name: 'SaveIcon', component: SaveIcon },
  { name: 'SearchIcon', component: SearchIcon },
  { name: 'SettingIcon', component: SettingIcon },
  { name: 'ShiftIcon', component: ShiftIcon },
  { name: 'ShipIcon', component: ShipIcon },
  { name: 'StockIcon', component: StockIcon },
  { name: 'Title1Icon', component: Title1Icon },
  { name: 'TitleIcon', component: TitleIcon },
  { name: 'UnreceivedIcon', component: UnreceivedIcon },
  { name: 'UpIcon', component: UpIcon },
  { name: 'UploadIcon', component: UploadIcon },
  { name: 'WriteIcon', component: WriteIcon },
  { name: 'XIcon', component: XIcon },
]

// 메인 화면 전용 아이콘 (100x100 고정)
const mainIcons = [
  { name: 'MainCenterIcon', component: MainCenterIcon },
  { name: 'MainChatIcon', component: MainChatIcon },
  { name: 'MainFinishedIcon', component: MainFinishedIcon },
  { name: 'MainNonStoreIcon', component: MainNonStoreIcon },
  { name: 'MainReturnIcon', component: MainReturnIcon },
  { name: 'MainShippingIcon', component: MainShippingIcon },
  { name: 'MainStoreIcon', component: MainStoreIcon },
  { name: 'MainTotalIcon', component: MainTotalIcon },
]

const meta = {
  title: 'Foundation/Icons',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

// 전체 아이콘 갤러리
export const Gallery: Story = {
  render: () => (
    <div
      role="region"
      aria-label="아이콘 갤러리"
      tabIndex={0}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '16px',
      }}
    >
      {icons.map(({ name, component: Icon }) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '16px 8px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            gap: '8px',
          }}
        >
          <Icon size={24} />
          <span style={{ fontSize: '10px', color: '#666', textAlign: 'center', wordBreak: 'break-all' }}>
            {name.replace('Icon', '')}
          </span>
        </div>
      ))}
    </div>
  ),
}

// 크기 비교 (권장 사이즈: 24px, 32px)
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
        24px: 작은 버튼용 (24x24 SVG) / 32px: 기본 버튼용 (32x32 SVG)
      </p>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ width: '60px', fontSize: '12px', color: '#666' }}>24px</span>
        <SearchIcon size={24} />
        <DeleteIcon size={24} />
        <UploadIcon size={24} />
        <HomeIcon size={24} />
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ width: '60px', fontSize: '12px', color: '#666' }}>32px</span>
        <SearchIcon size={32} />
        <DeleteIcon size={32} />
        <UploadIcon size={32} />
        <HomeIcon size={32} />
      </div>
    </div>
  ),
}

// 색상 적용
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>Default</span>
        <SearchIcon size={24} />
        <DeleteIcon size={24} />
        <UploadIcon size={24} />
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', color: '#3b82f6' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>Primary</span>
        <SearchIcon size={24} />
        <DeleteIcon size={24} />
        <UploadIcon size={24} />
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', color: '#ef4444' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>Danger</span>
        <SearchIcon size={24} />
        <DeleteIcon size={24} />
        <UploadIcon size={24} />
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', color: '#22c55e' }}>
        <span style={{ width: '80px', fontSize: '12px', color: '#666' }}>Success</span>
        <SearchIcon size={24} />
        <DeleteIcon size={24} />
        <UploadIcon size={24} />
      </div>
    </div>
  ),
}

// 메인 화면 전용 아이콘 (100x100)
export const MainIcons: Story = {
  render: () => (
    <div>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
        메인 화면 전용 아이콘 (100x100 고정 크기)
      </p>
      <div
        role="region"
        aria-label="메인 아이콘 갤러리"
        tabIndex={0}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '16px',
        }}
      >
        {mainIcons.map(({ name, component: Icon }) => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              gap: '12px',
            }}
          >
            <Icon size={100} />
            <span style={{ fontSize: '11px', color: '#666', textAlign: 'center' }}>
              {name.replace('Icon', '').replace('Main', '')}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
}
