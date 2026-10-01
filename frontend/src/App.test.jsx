import { describe, expect, it } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route, NavLink } from "react-router-dom";
import { HomeScreen } from "./pages/home/HomeScreen.jsx";
import { SettingsScreen } from "./pages/settings/SettingsScreen.jsx";
import { NotFoundScreen } from "./pages/not-found/NotFoundScreen.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";

describe("React Router Navigation & 404 Tests", () => {
  it("renders HomeScreen at / and navigates to /settings", async () => {
    globalThis.fetch = () =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([])
      });

    render(
      <LanguageProvider initialLanguage="th">
        <MemoryRouter initialEntries={["/"]}>
          <nav>
            <NavLink to="/">My Air Link</NavLink>
            <NavLink to="/settings">ตั้งค่า Link</NavLink>
          </nav>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </MemoryRouter>
      </LanguageProvider>
    );

    // Verify Home Route Header
    expect(screen.getByRole("heading", { name: "My Air" })).toBeDefined();

    // Click navigation to /settings
    const settingsLink = screen.getByText("ตั้งค่า Link");
    fireEvent.click(settingsLink);

    // Verify Settings Route
    expect(screen.getByRole("heading", { name: "การตั้งค่า" })).toBeDefined();
    expect(screen.getByText("ภาษา (Language)")).toBeDefined();
  });

  it("renders NotFoundScreen when visiting an unknown path", () => {
    render(
      <LanguageProvider initialLanguage="th">
        <MemoryRouter initialEntries={["/unknown-invalid-route"]}>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Routes>
        </MemoryRouter>
      </LanguageProvider>
    );

    expect(screen.getByText("404 - Not Found")).toBeDefined();
    expect(screen.getByText("ไม่พบหน้าที่ต้องการ")).toBeDefined();
  });
});
