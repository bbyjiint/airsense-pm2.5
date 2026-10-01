import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NotFoundScreen } from "./NotFoundScreen.jsx";
import { LanguageProvider } from "../../context/LanguageContext.jsx";

describe("NotFoundScreen Component Tests", () => {
  it("renders 404 screen in Thai by default", () => {
    render(
      <LanguageProvider initialLanguage="th">
        <MemoryRouter>
          <NotFoundScreen />
        </MemoryRouter>
      </LanguageProvider>
    );

    expect(screen.getByText("404 - Not Found")).toBeDefined();
    expect(screen.getByText("ไม่พบหน้าที่ต้องการ")).toBeDefined();
    expect(screen.getByText("กลับสู่หน้าหลัก")).toBeDefined();
  });

  it("renders 404 screen in English when language is en", () => {
    render(
      <LanguageProvider initialLanguage="en">
        <MemoryRouter>
          <NotFoundScreen />
        </MemoryRouter>
      </LanguageProvider>
    );

    expect(screen.getByText("404 - Not Found")).toBeDefined();
    expect(screen.getByText("Page Not Found")).toBeDefined();
    expect(screen.getByText("Back to Home")).toBeDefined();
  });
});
