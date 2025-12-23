import type { FocusEvent, ReactNode } from 'react';
import { useState } from 'react';
import type { FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { get, useFormContext } from 'react-hook-form';

import { cn } from '@/shared/lib/cn';
import { ErrorMessage, FormField, Input, ValidationIcon } from '@/shared/ui';

interface AuthInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  type?: string;
  validation?: RegisterOptions<T>;
  showValidationIcon?: boolean;
  rightAddon?: ReactNode;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export const AuthInput = <T extends FieldValues>({
  name,
  label,
  type = 'text',
  validation,
  showValidationIcon = false,
  rightAddon,
  onFocus,
  onBlur,
}: AuthInputProps<T>) => {
  const {
    register,
    formState: { errors, touchedFields },
    watch,
  } = useFormContext<T>();

  const [isFocused, setFocused] = useState(false);

  const fieldValue = watch(name);
  const error = get(errors, name);
  const isTouched = get(touchedFields, name);

  const { onBlur: rhfOnBlur, ...restRegister } = register(name, validation);

  const hasIcons = showValidationIcon || rightAddon;

  return (
    <div className="w-full mt-3">
      <FormField isFocused={isFocused} isError={!!error}>
        <div className={cn(hasIcons && 'pr-16')}>
          <Input
            id={name}
            label={label}
            type={type}
            isFocused={isFocused}
            hasValue={!!fieldValue}
            onFocus={(e) => {
              setFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              rhfOnBlur(e);
              setFocused(false);
              onBlur?.(e);
            }}
            {...restRegister}
          />
        </div>

        {fieldValue && hasIcons && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {rightAddon}
            {showValidationIcon && (
              <ValidationIcon isTouched={!!isTouched} isError={!!error} />
            )}
          </div>
        )}
      </FormField>
      <ErrorMessage message={error?.message as string} />
    </div>
  );
};
