export const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function getAqiStatus(pm25) {
  const value = Number(pm25);

  if (value <= 49) {
    return {
      text: 'Good',
      textThai: 'ดี',
      level: 'good',
    };
  }

  if (value <= 99) {
    return {
      text: 'Moderate',
      textThai: 'ปานกลาง',
      level: 'moderate',
    };
  }

  return {
    text: 'Unhealthy',
    textThai: 'ไม่ดีต่อสุขภาพ',
    level: 'unhealthy',
  };
}

export function formatUpdatedTime(createdAt, locale = 'en-GB') {
  if (!createdAt) return '-';

  if (locale === 'th-TH') {
    return new Date(createdAt).toLocaleString('th-TH', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return new Date(createdAt).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}
