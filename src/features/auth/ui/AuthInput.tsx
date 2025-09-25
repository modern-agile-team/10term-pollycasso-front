import { useState } from 'react';
import type { ReactNode, FocusEvent } from 'react';
import { useFormContext, get } from 'react-hook-form';
import type { FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { FormField, Input, ValidationIcon, ErrorMessage } from '@/shared/ui';
import clsx from 'clsx';

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
        <div className={clsx(hasIcons && 'pr-12')}>
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

        {fieldValue && (
          <>
            {rightAddon && (
              <div className="absolute right-14 top-1/2 -translate-y-1/2 flex items-center">
                {rightAddon}
              </div>
            )}

            {showValidationIcon && (
              <ValidationIcon isTouched={!!isTouched} isError={!!error} />
            )}
          </>
        )}
      </FormField>
      <ErrorMessage message={error?.message as string} />
    </div>
  );
};
