import { Toaster as Sonner } from 'sonner';
type ToasterProps = React.ComponentProps<typeof Sonner>;
declare const Toaster: ({ ...props }: ToasterProps) => import("react/jsx-runtime").JSX.Element;
declare const toast: {
    success: (title: string, options?: {
        description?: string;
    }) => string | number;
    error: (title: string, options?: {
        description?: string;
    }) => string | number;
    loading: (title: string, options?: {
        description?: string;
    }) => string | number;
    dismiss: (id?: string | number | undefined) => string | number;
};
export { Toaster, toast };
