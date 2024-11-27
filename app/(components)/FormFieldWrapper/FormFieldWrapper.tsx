import { VariantProps } from 'class-variance-authority';
import { HTMLInputTypeAttribute } from 'react';
import { Control } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  inputVariants,
} from '@/components/ui';

import type { SubmissionParams } from '@/utils/api/requests';

export interface FormFieldWrapperPops
  extends VariantProps<typeof inputVariants> {
  control?: Control<SubmissionParams>;
  name: keyof SubmissionParams;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  disabled?: boolean;
}

export const FormFieldWrapper = ({
  control,
  name,
  placeholder,
  type,
  className,
  variant,
  disabled,
}: FormFieldWrapperPops) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <Input
            {...field}
            id={name}
            type={type}
            className={className}
            placeholder={placeholder}
            variant={variant}
            disabled={disabled}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
