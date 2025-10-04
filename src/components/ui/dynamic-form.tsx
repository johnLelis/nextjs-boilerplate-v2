'use client';

import { UseFormReturn, FieldValues, Path } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

export type FormFieldConfig<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea';
  placeholder?: string;
  description?: string;
  rows?: number;
};

type DynamicFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  fields: FormFieldConfig<T>[];
  onSubmit: (data: T) => Promise<void> | void;
  submitLabel: string;
  className?: string;
  footer?: ReactNode;
  loadingComponent?: ReactNode;
};

export function DynamicForm<T extends FieldValues>({
  form,
  fields,
  onSubmit,
  submitLabel,
  className = 'space-y-4',
  footer,
  loadingComponent,
}: DynamicFormProps<T>) {
  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {fields.map(fieldConfig => (
          <FormField
            key={fieldConfig.name}
            control={form.control}
            name={fieldConfig.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldConfig.label}</FormLabel>
                <FormControl>
                  {fieldConfig.type === 'textarea' ? (
                    <Textarea
                      placeholder={fieldConfig.placeholder}
                      rows={fieldConfig.rows || 4}
                      {...field}
                    />
                  ) : (
                    <Input
                      type={fieldConfig.type || 'text'}
                      placeholder={fieldConfig.placeholder}
                      {...field}
                    />
                  )}
                </FormControl>
                {fieldConfig.description && (
                  <FormDescription>{fieldConfig.description}</FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && loadingComponent ? loadingComponent : submitLabel}
        </Button>

        {footer}
      </form>
    </Form>
  );
}
