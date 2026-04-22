"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { inputSizeStyles } from "../input";
import { BasicSelect } from "./basic-select";
import { SearchableSelect } from "./searchable-select";
import { MultiSelect } from "./multi-select";
import { ComboboxSelect } from "./combobox-select";
import { ComboboxMultiSelect } from "./combobox-multi-select";
import type {
  SelectProps,
  SingleSelectProps,
  MultipleSelectProps,
} from "./types";

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (props, ref) => {
    const {
      label,
      size = "full",
      error,
      errorMessage,
      className,
      "aria-label": ariaLabel,
      reserveLabelSpace,
      required,
      searchable = false,
      multiple = false,
      combobox = false,
    } = props;

    const id = React.useId();

    // Render appropriate select variant
    const renderSelect = () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { "aria-label": _, ...restProps } = props;

      if (combobox && multiple) {
        return (
          <ComboboxMultiSelect
            ref={ref as React.Ref<HTMLInputElement>}
            id={id}
            ariaLabel={ariaLabel}
            {...(restProps as Omit<MultipleSelectProps, "aria-label">)}
          />
        );
      }

      if (combobox) {
        return (
          <ComboboxSelect
            ref={ref as React.Ref<HTMLInputElement>}
            id={id}
            ariaLabel={ariaLabel}
            {...(restProps as Omit<SingleSelectProps, "aria-label">)}
          />
        );
      }

      if (multiple) {
        return (
          <MultiSelect
            ref={ref}
            id={id}
            ariaLabel={ariaLabel}
            {...(restProps as Omit<MultipleSelectProps, "aria-label">)}
          />
        );
      }

      if (searchable) {
        return (
          <SearchableSelect
            ref={ref}
            id={id}
            ariaLabel={ariaLabel}
            {...(restProps as Omit<SingleSelectProps, "aria-label">)}
          />
        );
      }

      return (
        <BasicSelect
          ref={ref}
          id={id}
          ariaLabel={ariaLabel}
          {...(restProps as Omit<SingleSelectProps, "aria-label">)}
        />
      );
    };

    return (
      <div
        className={cn(
          "flex flex-col gap-1",
          inputSizeStyles[size],
          className,
        )}
      >
        {(label || reserveLabelSpace) && (
          <label
            htmlFor={id}
            className={cn(
              "flex items-center gap-1 text-xs text-slate-800 dark:text-slate-400",
              !label && "invisible",
            )}
          >
            {required && (
              <span className="size-2 rounded-full bg-red-400" aria-hidden="true" />
            )}
            {label || "\u00A0"}
          </label>
        )}
        {renderSelect()}
        {error && errorMessage && (
          <span className="text-xs text-destructive dark:text-red-400">
            {errorMessage}
          </span>
        )}
      </div>
    );
  },
);
Select.displayName = "Select";

export { Select, inputSizeStyles };
export type {
  SelectProps,
  SelectOption,
  SelectSize,
  ChipOverflowMode,
  SingleSelectProps,
  MultipleSelectProps,
  InternalSelectProps,
} from "./types";
