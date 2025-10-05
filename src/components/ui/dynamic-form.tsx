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
import { ReactNode, ComponentProps } from 'react';

export type FormFieldConfig<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea';
  placeholder?: string;
  description?: string;
  rows?: number;
  inputProps?: Omit<ComponentProps<typeof Input>, 'type' | 'placeholder'>;
  textareaProps?: Omit<ComponentProps<typeof Textarea>, 'placeholder' | 'rows'>;
};

export type FormButton = {
  label: string;
  type?: 'submit' | 'button' | 'reset';
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  loadingComponent?: ReactNode;
};

type DynamicFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  fields: FormFieldConfig<T>[];
  onSubmit: (data: T) => Promise<void> | void;
  submitLabel?: string;
  className?: string;
  footer?: ReactNode;
  loadingComponent?: ReactNode;
  buttons?: FormButton[];
  buttonsClassName?: string;
};

export const DynamicForm = <T extends FieldValues>({
  form,
  fields,
  onSubmit,
  submitLabel = 'Submit',
  className = 'space-y-4',
  footer,
  loadingComponent,
  buttons,
  buttonsClassName,
}: DynamicFormProps<T>) => {
  const { isSubmitting } = form.formState;

  const formButtons: FormButton[] = buttons || [
    {
      label: submitLabel,
      type: 'submit',
      variant: 'default',
      disabled: isSubmitting,
      loadingComponent,
    },
  ];

  const getButtonClassName = (button: FormButton) => {
    if (button.className) return button.className;
    return formButtons.length === 1 ? 'w-full' : '';
  };

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
                      {...fieldConfig.textareaProps}
                    />
                  ) : (
                    <Input
                      type={fieldConfig.type || 'text'}
                      placeholder={fieldConfig.placeholder}
                      {...field}
                      {...fieldConfig.inputProps}
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

        <div className={buttonsClassName || 'flex justify-end gap-3'}>
          {formButtons.map((button, index) => (
            <Button
              key={`button-${index}`}
              type={button.type || 'button'}
              variant={button.variant || 'default'}
              disabled={
                button.disabled || (button.type === 'submit' && isSubmitting)
              }
              onClick={button.onClick}
              className={getButtonClassName(button)}
            >
              {button.type === 'submit' &&
              isSubmitting &&
              button.loadingComponent
                ? button.loadingComponent
                : button.label}
            </Button>
          ))}
        </div>

        {footer}
      </form>
    </Form>
  );
};
