import { SingleSelectProps, InternalSelectProps } from './types';
import * as React from "react";
declare const BasicSelect: React.ForwardRefExoticComponent<Omit<SingleSelectProps, "aria-label"> & InternalSelectProps & React.RefAttributes<HTMLButtonElement>>;
export { BasicSelect };
