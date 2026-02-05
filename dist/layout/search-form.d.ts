import { default as React } from 'react';
interface ProductSearchBarProps extends React.HTMLAttributes<HTMLDivElement> {
    onSearch?: (values: any) => void;
    onReset?: () => void;
}
export declare const SearchForm: React.ForwardRefExoticComponent<ProductSearchBarProps & React.RefAttributes<HTMLDivElement>>;
export {};
