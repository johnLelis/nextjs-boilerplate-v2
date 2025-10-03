export type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export type UserGreetingProps = {
  user: User | null;
};
