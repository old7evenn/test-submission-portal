'use client';

import { FormProvider } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { FormFieldWrapper } from '../FormFieldWrapper/FormFieldWrapper';

import { useRequestLevels } from '../../hooks/useRequestLevels';
import { useSubmissionForm } from './hooks/useSubmissionForm';

export const SubmissionForm = () => {
  const { form, functions, state } = useSubmissionForm();
  const { levels, error } = useRequestLevels();

  return (
    <FormProvider {...form}>
      <form onSubmit={functions.onSubmit} className="w-full max-w-sm">
        <div className="w-full">
          <div className="flex flex-col gap-2">
            <FormFieldWrapper
              control={form.control}
              name="name"
              type="text"
              placeholder="Name"
              disabled={state.loading}
            />
            <FormFieldWrapper
              control={form.control}
              name="email"
              type="email"
              placeholder="Email"
              disabled={state.loading}
            />
            <FormFieldWrapper
              control={form.control}
              name="assignment_description"
              type="text"
              placeholder="Assignment Description"
              disabled={state.loading}
            />
            <FormFieldWrapper
              control={form.control}
              name="github_repo_url"
              type="text"
              placeholder="Github Repo Url"
              disabled={state.loading}
            />
            <FormField
              control={form.control}
              name="candidate_level"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={state.loading || error !== null}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Candidate Level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {levels?.map(level => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage>{error}</FormMessage>
                </FormItem>
              )}
            />
          </div>
          <Button
            className="border mt-4 w-full"
            type="submit"
            disabled={state.loading}
          >
            {state.loading ? 'SENDING...' : 'SEND'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
