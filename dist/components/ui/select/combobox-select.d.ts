import { SingleSelectProps, InternalSelectProps } from './types';
import * as React from "react";
declare const ComboboxSelect: React.ForwardRefExoticComponent<Omit<SingleSelectProps, "aria-label"> & InternalSelectProps & React.RefAttributes<HTMLInputElement>>;
export { ComboboxSelect };
