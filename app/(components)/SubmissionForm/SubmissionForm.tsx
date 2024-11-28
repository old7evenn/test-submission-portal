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
import { FormTextareaWrapper } from '../FormTextareaWrapper/FormTextareaWrapper';

export const SubmissionForm = () => {
  const { form, functions, state } = useSubmissionForm();
  const { levels, error } = useRequestLevels();

  return (
    <div className="w-2/3 max-w-sm space-y-4">
      <h1 className="sm:text-xl text-center font-bold">
        Assignment Submission
      </h1>
      <FormProvider {...form}>
        <form onSubmit={functions.onSubmit}>
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
            <FormTextareaWrapper
              control={form.control}
              name="assignment_description"
              placeholder="Assignment Description"
              disabled={state.loading}
            />
          </div>
          <Button
            className="border mt-6 w-full"
            type="submit"
            disabled={state.loading}
          >
            {state.loading ? 'SENDING...' : 'SEND'}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
