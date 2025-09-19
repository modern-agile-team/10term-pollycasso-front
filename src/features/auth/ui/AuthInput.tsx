import { useState } from 'react';
import type { ReactNode } from 'react';
import { useFormContext, get } from 'react-hook-form';
import type { FieldValues, Path, RegisterOptions } from 'react-hook-form';
import { FormField } from '@/shared/ui/FormField';
import { Input } from '@/shared/ui/Input';
import { ValidationIcon } from '@/shared/ui/ValidationIcon';
import { ErrorMessage } from '@/shared/ui/ErrorMessage';
import clsx from 'clsx';

type AuthInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type?: string;
  validation?: RegisterOptions<T>;
  showValidationIcon?: boolean;
  rightAddon?: ReactNode;
};

export const AuthInput = <T extends FieldValues>({
  name,
  label,
  type = 'text',
  validation,
  showValidationIcon = false,
  rightAddon,
}: AuthInputProps<T>) => {
  const {
    register,
    formState: { errors, touchedFields },
    watch,
  } = useFormContext<T>();

  const [isFocused, setFocused] = useState(false);

  const fieldValue = watch(name);
  const error = errors[name];
  const isTouched = get(touchedFields, name);

  const { onBlur, ...restRegister } = register(name, validation);

  const hasIcons = showValidationIcon || rightAddon;

  return (
    <div className="w-full mt-3">
      <FormField isFocused={isFocused} isError={!!error}>
        {/* 아이콘 있으면 패딩 있어야함... */}
        <div className={clsx(hasIcons && 'pr-12')}>
          <Input
            id={name}
            label={label}
            type={type}
            isFocused={isFocused}
            hasValue={!!fieldValue}
            onFocus={() => setFocused(true)}
            onBlur={(e) => {
              onBlur(e);
              setFocused(false);
            }}
            {...restRegister}
          />
        </div>

        {fieldValue && (
          <>
            {rightAddon && (
              <div className="flex items-center absolute right-14 top-1/2 -translate-y-1/2">
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
