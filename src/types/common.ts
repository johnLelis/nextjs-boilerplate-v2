// types/common.ts
import { ReactNode } from "react";

/**
 * Adds children prop to a component type
 * @example
 * type LayoutProps = WithChildren<{ theme: 'light' | 'dark' }>
 */
export type WithChildren<
  T extends Record<string, unknown> = Record<string, never>,
> = T & {
  readonly children: ReactNode;
};

/**
 * Makes children prop optional
 * @example
 * type CardProps = WithOptionalChildren<{ title: string }>
 */
export type WithOptionalChildren<
  T extends Record<string, unknown> = Record<string, never>,
> = T & {
  readonly children?: ReactNode;
};

/**
 * Adds className prop to a component type
 * @example
 * type ButtonProps = WithClassName<{ variant: 'primary' | 'secondary' }>
 */
export type WithClassName<
  T extends Record<string, unknown> = Record<string, never>,
> = T & {
  className?: string;
};

/**
 * Next.js page component props with params and searchParams
 * @example
 * export default async function Page({ params, searchParams }: PageProps<{ id: string }>) {}
 */
export type PageProps<
  TParams extends Record<string, string | string[]> = Record<string, never>,
  TSearchParams extends Record<string, string | string[] | undefined> = Record<
    string,
    never
  >,
> = {
  params: Promise<TParams>;
  searchParams: Promise<TSearchParams>;
};

/**
 * API Response wrapper for consistent response types
 * @example
 * const response: ApiResponse<User> = { success: true, data: user }
 */
export type ApiResponse<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string; errors?: Record<string, string[]> };

/**
 * Server Action return type with form state
 * @example
 * const [state, formAction] = useFormState(createPost, initialState)
 */
export type ServerActionState = {
  message?: string;
  errors?: Record<string, string[]>;
  success?: boolean;
};
