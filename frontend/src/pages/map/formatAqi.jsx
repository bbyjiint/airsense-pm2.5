// Utility เฉพาะสำหรับการคำนวณและแสดงผลในหน้า Map
export function getAqiColor(aqi) {
  if (aqi <= 49) return '#2FBF71';
  if (aqi <= 99) return '#F5A623';
  return '#E5484D';
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
