import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { BottomNav } from "./BottomNav.jsx";
import { LanguageProvider } from "../context/LanguageContext.jsx";

describe("BottomNav Shared Component Tests", () => {
  it("renders all 3 navigation tabs in Thai", () => {
    render(
      <LanguageProvider initialLanguage="th">
        <MemoryRouter>
          <BottomNav />
        </MemoryRouter>
      </LanguageProvider>
    );

    expect(screen.getByText("My Air")).toBeDefined();
    expect(screen.getByText("แผนที่")).toBeDefined();
    expect(screen.getByText("ตั้งค่า")).toBeDefined();
  });

  it("renders all 3 navigation tabs in English", () => {
    render(
      <LanguageProvider initialLanguage="en">
        <MemoryRouter>
          <BottomNav />
        </MemoryRouter>
      </LanguageProvider>
    );

    expect(screen.getByText("My Air")).toBeDefined();
    expect(screen.getByText("Map")).toBeDefined();
    expect(screen.getByText("Settings")).toBeDefined();
  });
});
