import type { ComponentProps } from "react";

import { render, screen } from "@testing-library/react";

import Navbar from "./navbar";

vi.mock("next/link", () => {
  type LinkProps = ComponentProps<"a"> & { href: string };
  const Link = ({ href, children, ...props }: LinkProps) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
  return { default: Link };
});

vi.mock("../ui/mode-toggle", () => {
  return {
    default: () => <div data-testid="mode-toggle">ModeToggle</div>,
  };
});

describe("Navbar", () => {
  it("renders the brand link", () => {
    render(
      <Navbar greeting={<span>Hello</span>} logout={<button>Logout</button>} />
    );
    expect(screen.getByRole("link", { name: "NextJs" })).toHaveAttribute(
      "href",
      "/"
    );
  });

  it("renders navigation links", () => {
    render(
      <Navbar greeting={<span>Hello</span>} logout={<button>Logout</button>} />
    );
    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute(
      "href",
      "/dashboard"
    );
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/about"
    );
  });

  it("renders ModeToggle", () => {
    render(
      <Navbar
        greeting={<span>Hello</span>}
        logout={<button type="button">Logout</button>}
      />
    );
    expect(screen.getByTestId("mode-toggle")).toBeInTheDocument();
  });

  it("renders greeting and logout props", () => {
    render(
      <Navbar
        greeting={<span>Welcome John</span>}
        logout={<button type="button">Sign out</button>}
      />
    );
    expect(screen.getByText("Welcome John")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Sign out" })
    ).toBeInTheDocument();
  });
});
