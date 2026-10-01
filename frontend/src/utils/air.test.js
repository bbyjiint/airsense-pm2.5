import { describe, expect, it } from "bun:test";
import { getAqiStatus } from "./air.js";
import { getAqiColor, getIndicatorPosition } from "../pages/map/formatAqi.jsx";

describe("Air Quality Calculation & Indicator Logic (International 5-Tier Standard)", () => {
  it("Level 1: classifies PM2.5 <= 12.0 as Good (Green)", () => {
    const res = getAqiStatus(10);
    expect(res.level).toBe("good");
    expect(res.statusKey).toBe("status.good");
    expect(getAqiColor(10)).toBe("#2FBF71");
  });

  it("Level 2: classifies PM2.5 12.1-35.4 as Moderate (Yellow)", () => {
    const res19 = getAqiStatus(19);
    expect(res19.level).toBe("moderate");
    expect(res19.statusKey).toBe("status.moderate");
    expect(getAqiColor(19)).toBe("#F5A623");

    const res35 = getAqiStatus(35);
    expect(res35.level).toBe("moderate");
    expect(res35.statusKey).toBe("status.moderate");
    expect(getAqiColor(35)).toBe("#F5A623");
  });

  it("Level 3: classifies PM2.5 35.5-55.4 as Unhealthy for Sensitive Groups (Orange)", () => {
    const res = getAqiStatus(45);
    expect(res.level).toBe("unhealthy-sensitive");
    expect(res.statusKey).toBe("status.unhealthy-sensitive");
    expect(getAqiColor(45)).toBe("#FF7B00");
  });

  it("Level 4: classifies PM2.5 55.5-150.4 as Unhealthy (Red)", () => {
    const res = getAqiStatus(75);
    expect(res.level).toBe("unhealthy");
    expect(res.statusKey).toBe("status.unhealthy");
    expect(getAqiColor(75)).toBe("#E5484D");
  });

  it("Level 5: classifies PM2.5 > 150.4 as Very Unhealthy (Purple)", () => {
    const res = getAqiStatus(180);
    expect(res.level).toBe("very-unhealthy");
    expect(res.statusKey).toBe("status.very-unhealthy");
    expect(getAqiColor(180)).toBe("#8F44FD");
  });

  it("calculates indicator position correctly across 5 tiers", () => {
    expect(getIndicatorPosition(6)).toBeGreaterThanOrEqual(5);
    expect(getIndicatorPosition(6)).toBeLessThanOrEqual(20);

    expect(getIndicatorPosition(19)).toBeGreaterThan(20);
    expect(getIndicatorPosition(19)).toBeLessThan(40);

    expect(getIndicatorPosition(45)).toBeGreaterThan(40);
    expect(getIndicatorPosition(45)).toBeLessThan(60);

    expect(getIndicatorPosition(100)).toBeGreaterThan(60);
    expect(getIndicatorPosition(100)).toBeLessThan(80);

    expect(getIndicatorPosition(200)).toBeGreaterThan(80);
    expect(getIndicatorPosition(200)).toBeLessThanOrEqual(95);
  });
});
