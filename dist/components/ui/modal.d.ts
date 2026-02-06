export interface ModalProps {
    size?: "s" | "m" | "l" | "xl";
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}
declare const Modal: ({ size, open, onOpenChange }: ModalProps) => import("react/jsx-runtime").JSX.Element;
export { Modal };
