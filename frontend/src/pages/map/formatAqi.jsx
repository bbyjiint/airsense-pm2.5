// Utility เฉพาะสำหรับการคำนวณและแสดงผลในหน้า Map (US EPA 5-Tier Standard)
export function getAqiColor(aqi) {
  const value = Number(aqi);
  if (value <= 12.0) return '#2FBF71'; // Good
  if (value <= 35.4) return '#F5A623'; // Moderate
  if (value <= 55.4) return '#FF7B00'; // Unhealthy for Sensitive Groups
  if (value <= 150.4) return '#E5484D'; // Unhealthy
  return '#8F44FD'; // Very Unhealthy / Hazardous
}

export function getIndicatorPosition(pm25) {
  const value = Number(pm25);

  if (value <= 12.0) {
    return Math.max(5, (value / 12.0) * 20);
  }

  if (value <= 35.4) {
    return 20 + ((value - 12.0) / (35.4 - 12.0)) * 20;
  }

  if (value <= 55.4) {
    return 40 + ((value - 35.4) / (55.4 - 35.4)) * 20;
  }

  if (value <= 150.4) {
    return 60 + ((value - 55.4) / (150.4 - 55.4)) * 20;
  }

  return Math.min(95, 80 + ((value - 150.4) / (250.0 - 150.4)) * 20);
}
