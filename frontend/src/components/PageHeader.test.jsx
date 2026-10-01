import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { PageHeader } from "./PageHeader.jsx";

describe("PageHeader Shared Component Tests", () => {
  it("renders title and subtitle", () => {
    render(<PageHeader title="My Air" subtitle="จังหวัดสมุทรสาคร" />);

    expect(screen.getByRole("heading", { name: "My Air" })).toBeDefined();
    expect(screen.getByText("จังหวัดสมุทรสาคร")).toBeDefined();
  });
});
