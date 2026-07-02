import type { Meta, StoryObj } from "@storybook/react-vite"

import { DataTableV2, type DataTableV2Column } from "../src/components/table/data-table-v2"

/**
 * DataTable v2 스토리 — 코어 골격 확인용 (SDS-29).
 *
 * 현재 단계는 렌더링 골격만 있으므로 정렬/선택/편집/sticky 등은 아직 없습니다.
 * 후속 서브 티켓 (SDS-30 ~ SDS-38) 진행에 따라 기능이 추가됩니다.
 */
const meta = {
  title: "Table/DataTableV2",
  component: DataTableV2,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DataTableV2>

export default meta
type Story = StoryObj<typeof meta>

interface Row {
  id: number
  name: string
  role: string
  score: number
}

const columns: DataTableV2Column<Row>[] = [
  { accessorKey: "id", header: "ID", width: 60, align: "center" },
  { accessorKey: "name", header: "이름", minWidth: 120 },
  { accessorKey: "role", header: "역할", minWidth: 120 },
  {
    accessorKey: "score",
    header: "점수",
    width: 100,
    align: "right",
    cell: (v) => `${v}점`,
  },
]

const smallData: Row[] = [
  { id: 1, name: "김하나", role: "매니저", score: 92 },
  { id: 2, name: "이두리", role: "엔지니어", score: 88 },
  { id: 3, name: "박세리", role: "디자이너", score: 95 },
  { id: 4, name: "최네오", role: "PM", score: 76 },
]

export const Basic: Story = {
  args: {
    data: smallData,
    columns,
  },
}

/**
 * 다량 데이터 + maxHeight 지정 시 스크롤 컨테이너 동작 확인.
 * 절대좌표 배치가 정확한지 (겹치거나 빈 공간 없는지) 확인용.
 */
const manyData: Row[] = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  name: `사용자 ${i + 1}`,
  role: ["매니저", "엔지니어", "디자이너", "PM"][i % 4],
  score: 50 + Math.floor(Math.random() * 50),
}))

export const Scrollable: Story = {
  args: {
    data: manyData,
    columns,
    maxHeight: 400,
  },
}

/**
 * 셀 내용이 길어지는 경우 행 높이가 자동 늘어나고,
 * ResizeObserver 로 실측 후 다음 행 위치 재계산되는지 확인.
 */
const variableHeightData: Row[] = [
  { id: 1, name: "짧은 텍스트", role: "매니저", score: 90 },
  {
    id: 2,
    name: "여러 줄 이름 - 이 셀은 폭이 좁으면 두 줄, 세 줄까지 자연스럽게 늘어납니다. ResizeObserver 가 실제 높이를 부모에 보고하고, 다음 행 위치가 재계산되어야 겹치지 않습니다.",
    role: "엔지니어",
    score: 85,
  },
  { id: 3, name: "다시 짧은 행", role: "디자이너", score: 78 },
  {
    id: 4,
    name: "또 다른 긴 셀 내용. 이번엔 조금 다른 길이로 - 행별로 다른 높이를 가지는 상황을 재현합니다.",
    role: "PM",
    score: 82,
  },
  { id: 5, name: "마지막 짧은 행", role: "매니저", score: 91 },
]

export const VariableRowHeight: Story = {
  args: {
    data: variableHeightData,
    columns,
    maxHeight: 400,
  },
}
