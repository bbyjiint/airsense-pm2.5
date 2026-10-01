import { describe, expect, it } from "bun:test";
import React from "react";
import { render, screen } from "@testing-library/react";
import { HomeScreen } from "../src/pages/home/HomeScreen.jsx";
import { LanguageProvider } from "../src/context/LanguageContext.jsx";

function renderWithLang(ui, lang = "th") {
  return render(
    <LanguageProvider initialLanguage={lang}>
      {ui}
    </LanguageProvider>
  );
}

describe("HomeScreen Component Tests", () => {
  it("renders loading state by default", () => {
    globalThis.fetch = () => new Promise(() => {}); // never resolves to test loading

    renderWithLang(<HomeScreen />);
    expect(screen.getByText("กำลังโหลดข้อมูลเซ็นเซอร์...")).toBeDefined();
    expect(screen.getByText("My Air")).toBeDefined();
  });

  it("renders error state when fetch fails", async () => {
    globalThis.fetch = () => Promise.reject(new Error("API Down"));

    renderWithLang(<HomeScreen />);
    // wait for state update
    await new Promise((r) => setTimeout(r, 50));

    expect(screen.getByText("ไม่สามารถเชื่อมต่อ AirSense API ได้")).toBeDefined();
  });

  it("renders locations and selected card when fetch succeeds", async () => {
    const mockData = [
      {
        device_id: "dev-1",
        device_code: "BKK-01",
        name: "Siam Station",
        location_name: "Siam Paragon",
        latitude: "13.746",
        longitude: "100.534",
        pm25: "35.00",
        temperature: "30.00",
        humidity: "60.00",
        created_at: new Date().toISOString()
      },
      {
        device_id: "dev-2",
        device_code: "BKK-02",
        name: "Ari Station",
        location_name: "Ari Soi 7",
        latitude: "13.779",
        longitude: "100.544",
        pm25: "75.00",
        temperature: "31.00",
        humidity: "58.00",
        created_at: new Date().toISOString()
      }
    ];

    globalThis.fetch = () =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData)
      });

    renderWithLang(<HomeScreen />);
    await new Promise((r) => setTimeout(r, 50));

    expect(screen.getByText("คุณภาพอากาศ")).toBeDefined();
    expect(screen.getAllByText("Siam Station").length).toBe(2);
    expect(screen.getByText("Ari Station")).toBeDefined();
    expect(screen.getByText("จุดตรวจวัดทั้งหมด")).toBeDefined();
  });
});
