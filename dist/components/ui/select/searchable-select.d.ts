import { SingleSelectProps, InternalSelectProps } from './types';
import * as React from "react";
declare const SearchableSelect: React.ForwardRefExoticComponent<Omit<SingleSelectProps, "aria-label"> & InternalSelectProps & React.RefAttributes<HTMLButtonElement>>;
export { SearchableSelect };
