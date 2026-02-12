import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
declare const RadioGroup: React.ForwardRefExoticComponent<Omit<RadioGroupPrimitive.RadioGroupProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export interface RadioGroupItemProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
    /** 라벨 텍스트 */
    label?: string;
}
declare const RadioGroupItem: React.ForwardRefExoticComponent<RadioGroupItemProps & React.RefAttributes<HTMLButtonElement>>;
/** RadioGroupField - label을 포함한 RadioGroup 래퍼 */
export interface RadioGroupFieldProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
    /** 라벨 텍스트 */
    label?: string;
}
declare const RadioGroupField: React.ForwardRefExoticComponent<RadioGroupFieldProps & React.RefAttributes<HTMLDivElement>>;
export { RadioGroup, RadioGroupItem, RadioGroupField };
