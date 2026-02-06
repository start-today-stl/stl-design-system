# 컴포넌트 개발 가이드

## 핵심 원칙

**컴포넌트는 빈 껍데기(Shell)로 만들고, 콘텐츠는 props로 주입받는다.**

---

## 사례

### 1. Modal 컴포넌트

**Before:**

```tsx
const Modal = () => (
  <Dialog>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>입고 등록</DialogTitle>
        <DialogDescription>입고 정보를 입력해 주세요.</DialogDescription>
      </DialogHeader>
      <InputField label="입고번호" />
      <Dropdown label="센터" options={[...]} />
      <DatePicker />
      <DialogFooter>
        <Button>닫기</Button>
        <Button>등록</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)
```

**문제점:**

- 특정 화면("입고 등록")에 종속된 컴포넌트가 됨
- 다른 용도(상품 등록, 사용자 편집 등)로 재사용 불가
- 제목, 필드 구성, 버튼 텍스트가 모두 고정됨

**After:**

```tsx
interface ModalProps {
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode; // 본문 영역
  footer?: ReactNode; // 버튼 영역
}

const Modal = ({ title, description, children, footer }) => (
  <Dialog>
    <DialogContent>
      {(title || description) && (
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
      )}
      {children}
      {footer && <div className="...">{footer}</div>}
    </DialogContent>
  </Dialog>
);
```

---

### 2. SearchForm 컴포넌트

**Before:**

```tsx
const SearchForm = () => (
  <Card>
    <CardTitle>상품 관리</CardTitle>
    <InputField label="상품명" />
    <InputField label="SKU" />
    <Dropdown label="카테고리" options={[...]} />
    <Button>검색</Button>
  </Card>
)
```

**문제점:**

- "상품 관리" 화면에서만 사용 가능
- 검색 필드 개수, 종류를 바꿀 수 없음
- 다른 화면(주문 검색, 회원 검색 등)에서 재사용 불가

**After:**

```tsx
interface SearchFormProps {
  title?: ReactNode;
  children?: ReactNode; // 검색 필드 영역
  actions?: ReactNode; // 버튼 영역
}

const SearchForm = ({ title, children, actions }) => (
  <Card>
    {title && <CardTitle>{title}</CardTitle>}
    <div className="fields">{children}</div>
    <div className="actions">{actions}</div>
  </Card>
);
```

---

### 3. Tooltip 데모 함수

**Before:**

```tsx
// 컴포넌트 파일에 데모용 함수가 포함됨
export const TooltipSides = () => (
  <div className="flex gap-4">
    {["top", "right", "bottom", "left"].map((side) => (
      <Tooltip>
        <TooltipTrigger>
          <Button>{side}</Button>
        </TooltipTrigger>
        <TooltipContent side={side}>툴팁 내용</TooltipContent>
      </Tooltip>
    ))}
  </div>
);
```

**문제점:**

- 데모 코드가 프로덕션 번들에 포함됨
- 컴포넌트 파일의 역할이 불명확해짐
- "사이드별 툴팁 보여주기"는 Storybook에서 해야 할 일

**After:**

- 컴포넌트 파일: `TooltipArrowContent` 만 export
- 데모는 `stories/TooltipSide.stories.tsx`에서 구성

---

## 디자인 시스템에서 허용되는 것

### 상태 props

로딩, 에러 같은 **상태**는 props로 받아서 내부에서 처리해도 됨:

```tsx
// ✅ 상태를 props로 받음
<Button loading={isSubmitting}>저장</Button>
<Table loading={isFetching} />
```

- 디자인 시스템: `Spinner`, `Skeleton` 등 로딩 컴포넌트 제공 + `loading` prop 지원
- 소비자 시스템: 언제/어디서 로딩을 보여줄지 결정

### 레이아웃 구조

Sidebar, Header 같은 레이아웃 컴포넌트의 **구조**는 고정될 수 있음:

```tsx
// ✅ 구조는 고정, 콘텐츠는 props
const Sidebar = ({ logo, children }) => (
  <nav className="w-64 fixed left-0">
    {logo}
    {children}
  </nav>
);
```

- 고정: 너비, 위치, 기본 스타일
- props: 로고, 메뉴 항목

---

## 체크리스트

- [ ] 컴포넌트 내부에 특정 텍스트/라벨이 하드코딩되어 있지 않은가?
- [ ] 컴포넌트 내부에 다른 UI 컴포넌트(Input, Button 등)가 직접 렌더링되어 있지 않은가?
- [ ] 모든 콘텐츠가 props(title, children, actions 등)로 주입 가능한가?
- [ ] 데모 콘텐츠는 Stories에서만 구성되어 있는가?

---

## 요약

| 구분      | 컴포넌트 파일             | Stories 파일                 |
| --------- | ------------------------- | ---------------------------- |
| 역할      | 레이아웃/스타일 껍데기    | 데모 콘텐츠 구성             |
| 포함 내용 | props 정의, 조건부 렌더링 | 실제 텍스트, 폼 필드, 버튼   |
| 예시      | `<Card>{children}</Card>` | `<Card><InputField/></Card>` |
