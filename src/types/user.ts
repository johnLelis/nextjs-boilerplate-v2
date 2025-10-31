export type User = {
  name: string;
  email: string;
  image?: string | null;
};

export type UserGreetingProps = {
  user: User | undefined;
};
