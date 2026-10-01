import { describe, expect, it } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ErrorScreen } from "./ErrorScreen.jsx";
import { LanguageProvider } from "../../context/LanguageContext.jsx";

describe("ErrorScreen Functional Component Tests", () => {
  it("renders error screen in Thai with functional handlers", () => {
    let retried = false;
    let wentHome = false;

    render(
      <LanguageProvider initialLanguage="th">
        <MemoryRouter>
          <ErrorScreen
            onRetry={() => {
              retried = true;
            }}
            onGoHome={() => {
              wentHome = true;
            }}
          />
        </MemoryRouter>
      </LanguageProvider>
    );

    expect(screen.getByText("Application Error")).toBeDefined();
    expect(screen.getByText("เกิดข้อผิดพลาดบางอย่าง")).toBeDefined();

    const retryBtn = screen.getByText("ลองใหม่อีกครั้ง");
    fireEvent.click(retryBtn);
    expect(retried).toBe(true);

    const homeBtn = screen.getByText("กลับสู่หน้าหลัก");
    fireEvent.click(homeBtn);
    expect(wentHome).toBe(true);
  });

  it("renders error screen in English when language is en", () => {
    render(
      <LanguageProvider initialLanguage="en">
        <MemoryRouter>
          <ErrorScreen />
        </MemoryRouter>
      </LanguageProvider>
    );

    expect(screen.getByText("Application Error")).toBeDefined();
    expect(screen.getByText("Something went wrong")).toBeDefined();
    expect(screen.getByText("Try Again")).toBeDefined();
    expect(screen.getByText("Back to Home")).toBeDefined();
  });
});
