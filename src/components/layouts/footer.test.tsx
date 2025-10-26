import { render, screen } from "@testing-library/react";
import dayjs from "dayjs";

import Footer from "./footer";

describe("Footer", () => {
  it("renders the brand name", () => {
    render(<Footer />);
    expect(screen.getByText("PenLelis", { exact: false })).toBeInTheDocument();
  });

  it("renders the current year", () => {
    const year = dayjs().year();
    render(<Footer />);
    expect(
      screen.getByText(`© ${year} All rights reserved`)
    ).toBeInTheDocument();
  });

  it("renders the 'Built with Next.js' badge", () => {
    render(<Footer />);
    expect(screen.getByText("Built with Next.js")).toBeInTheDocument();
  });

  it("applies default styles when no className is provided", () => {
    const { container } = render(<Footer />);
    expect(container.querySelector("footer")).toHaveClass(
      "border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm"
    );
  });

  it("applies custom className when provided", () => {
    const { container } = render(<Footer className="custom-class" />);
    expect(container.querySelector("footer")).toHaveClass("custom-class");
  });
});
