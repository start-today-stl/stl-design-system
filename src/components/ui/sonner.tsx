import { Toaster as Sonner, toast as sonnerToast } from "sonner"
import { ToastOIcon, ToastXIcon } from "@/icons"
import { Spinner } from "./spinner"
import { cn } from "@/lib/utils"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        unstyled: true,
      }}
      {...props}
    />
  )
}

// 커스텀 토스트 컴포넌트
interface CustomToastProps {
  type: "success" | "error" | "loading"
  title: string
  description?: string
}

const CustomToast = ({ type, title, description }: CustomToastProps) => {
  const isLarge = !!description

  const Icon = () => {
    switch (type) {
      case "success":
        return <ToastOIcon size={26} />
      case "error":
        return <ToastXIcon size={26} />
      case "loading":
        return <Spinner className="size-[26px]" />
    }
  }

  return (
    <div
      className={cn(
        "bg-white border border-slate-200 rounded-xl w-[368px]",
        isLarge
          ? "flex flex-col items-start p-3 gap-8 mt-1"
          : "flex flex-row items-center justify-between h-12 py-3 pl-3 pr-4"
      )}
    >
      {isLarge ? (
        <>
          <Icon />
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-slate-900">{title}</p>
            <p className="text-[10px] text-slate-600">{description}</p>
          </div>
        </>
      ) : (
        <>
          <Icon />
          <p className="text-sm font-medium text-slate-900">{title}</p>
        </>
      )}
    </div>
  )
}

// 커스텀 toast 함수
const toast = {
  success: (title: string, options?: { description?: string }) => {
    return sonnerToast.custom(() => (
      <CustomToast type="success" title={title} description={options?.description} />
    ))
  },
  error: (title: string, options?: { description?: string }) => {
    return sonnerToast.custom(() => (
      <CustomToast type="error" title={title} description={options?.description} />
    ))
  },
  loading: (title: string, options?: { description?: string }) => {
    return sonnerToast.custom(() => (
      <CustomToast type="loading" title={title} description={options?.description} />
    ))
  },
  dismiss: sonnerToast.dismiss,
}

export { Toaster, toast }
