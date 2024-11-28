import { Control } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Textarea,
} from '@/components/ui';

import type { SubmissionParams } from '@/utils/api/requests';

export interface FormTextareaWrapperPops {
  control?: Control<SubmissionParams>;
  name: keyof SubmissionParams;
  placeholder: string;
  className?: string;
  disabled?: boolean;
}

export const FormTextareaWrapper = ({
  control,
  name,
  placeholder,
  className,
  disabled,
}: FormTextareaWrapperPops) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <Textarea
            {...field}
            id={name}
            className={className}
            placeholder={placeholder}
            disabled={disabled}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
