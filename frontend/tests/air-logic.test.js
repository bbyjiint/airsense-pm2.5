import { describe, expect, it } from "bun:test";

// Test business logic formatters used in AirSense
export function getAqiStatus(pm25) {
  const value = Number(pm25);

  if (value <= 49) {
    return {
      text: "Good",
      textThai: "ดี",
      level: "good"
    };
  }

  if (value <= 99) {
    return {
      text: "Moderate",
      textThai: "ปานกลาง",
      level: "moderate"
    };
  }

  return {
    text: "Unhealthy",
    textThai: "ไม่ดีต่อสุขภาพ",
    level: "unhealthy"
  };
}

export function getIndicatorPosition(pm25) {
  const value = Number(pm25);

  if (value <= 49) {
    return Math.max(8, (value / 49) * 33);
  }

  if (value <= 99) {
    return 33 + ((value - 50) / 49) * 33;
  }

  return Math.min(92, 66 + ((value - 100) / 100) * 34);
}

export function getAqiColor(aqi) {
  if (aqi <= 49) return "#2FBF71";
  if (aqi <= 99) return "#F5A623";
  return "#E5484D";
}

describe("Air Quality Calculation & Indicator Logic", () => {
  it("classifies PM2.5 <= 49 as Good", () => {
    const res = getAqiStatus(25);
    expect(res.text).toBe("Good");
    expect(res.textThai).toBe("ดี");
    expect(res.level).toBe("good");
    expect(getAqiColor(25)).toBe("#2FBF71");
  });

  it("classifies PM2.5 50-99 as Moderate", () => {
    const res = getAqiStatus(60);
    expect(res.text).toBe("Moderate");
    expect(res.textThai).toBe("ปานกลาง");
    expect(res.level).toBe("moderate");
    expect(getAqiColor(60)).toBe("#F5A623");
  });

  it("classifies PM2.5 >= 100 as Unhealthy", () => {
    const res = getAqiStatus(120);
    expect(res.text).toBe("Unhealthy");
    expect(res.textThai).toBe("ไม่ดีต่อสุขภาพ");
    expect(res.level).toBe("unhealthy");
    expect(getAqiColor(120)).toBe("#E5484D");
  });

  it("calculates indicator position correctly within bounds", () => {
    expect(getIndicatorPosition(10)).toBeGreaterThanOrEqual(8);
    expect(getIndicatorPosition(70)).toBeGreaterThan(33);
    expect(getIndicatorPosition(150)).toBeLessThanOrEqual(92);
  });
});
