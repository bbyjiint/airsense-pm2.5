export const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function getAqiStatus(pm25) {
  const value = Number(pm25);

  if (value <= 12.0) {
    return {
      level: 'good',
      statusKey: 'status.good',
    };
  }

  if (value <= 35.4) {
    return {
      level: 'moderate',
      statusKey: 'status.moderate',
    };
  }

  if (value <= 55.4) {
    return {
      level: 'unhealthy-sensitive',
      statusKey: 'status.unhealthy-sensitive',
    };
  }

  if (value <= 150.4) {
    return {
      level: 'unhealthy',
      statusKey: 'status.unhealthy',
    };
  }

  return {
    level: 'very-unhealthy',
    statusKey: 'status.very-unhealthy',
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
