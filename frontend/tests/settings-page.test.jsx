import { describe, expect, it } from "bun:test";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SettingsScreen } from "../src/pages/settings/SettingsScreen.jsx";
import { LanguageProvider } from "../src/context/LanguageContext.jsx";

describe("SettingsScreen Component & i18n Tests", () => {
  it("renders settings screen in Thai by default", () => {
    render(
      <LanguageProvider initialLanguage="th">
        <SettingsScreen />
      </LanguageProvider>
    );

    expect(screen.getByText("การตั้งค่า")).toBeDefined();
    expect(screen.getByText("ภาษา (Language)")).toBeDefined();
    expect(screen.getByText("ธีม (Theme)")).toBeDefined();
    expect(screen.getByText("ในอนาคต")).toBeDefined();
    expect(screen.getByText("ฟังก์ชันเปลี่ยนธีมจะเปิดให้ใช้งานในอนาคต")).toBeDefined();
  });

  it("renders disabled theme buttons", () => {
    render(
      <LanguageProvider initialLanguage="th">
        <SettingsScreen />
      </LanguageProvider>
    );

    const lightBtn = screen.getByText("โหมดสว่าง").closest("button");
    const darkBtn = screen.getByText("โหมดมืด").closest("button");
    const systemBtn = screen.getByText("ตามระบบ").closest("button");

    expect(lightBtn?.disabled).toBe(true);
    expect(darkBtn?.disabled).toBe(true);
    expect(systemBtn?.disabled).toBe(true);
  });

  it("switches language from Thai to English on click", () => {
    render(
      <LanguageProvider initialLanguage="th">
        <SettingsScreen />
      </LanguageProvider>
    );

    expect(screen.getByText("การตั้งค่า")).toBeDefined();

    const enOption = screen.getByText("English").closest("button");
    if (enOption) {
      fireEvent.click(enOption);
    }

    expect(screen.getByText("Settings")).toBeDefined();
    expect(screen.getByText("Coming Soon")).toBeDefined();
    expect(screen.getByText("Theme switching will be available in a future update")).toBeDefined();
  });
});
