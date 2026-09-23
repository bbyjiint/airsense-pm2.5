export function createAppError(message, statusCode = 500, details = null) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.name = "AppError";
  if (details) {
    error.details = details;
  }
  return error;
}

/**
 * Standard Production HTTP Errors Factory
 */
export const httpErrors = {
  // 400 Bad Request: ข้อมูลส่งมาไม่ครบหรือไม่ถูกต้องตาม format
  badRequest: (message = "Bad request", details = null) =>
    createAppError(message, 400, details),

  // 401 Unauthorized: ยังไม่ได้ Login หรือ Token หมดอายุ / ไม่ถูกต้อง
  unauthorized: (message = "Authentication required", details = null) =>
    createAppError(message, 401, details),

  // 403 Forbidden: Login แล้ว แต่ไม่มีสิทธิ์เข้าถึง resource นี้ (เช่น ไม่ใช่ Admin)
  forbidden: (message = "Access denied", details = null) =>
    createAppError(message, 403, details),

  // 404 Not Found: ไม่พบ Resource (เช่น ไม่พบ Device, ไม่พบ Reading)
  notFound: (message = "Resource not found", details = null) =>
    createAppError(message, 404, details),

  // 409 Conflict: ข้อมูลชนกับสิ่งที่มีอยู่แล้ว (เช่น device_code ซ้ำ, อีเมลซ้ำ)
  conflict: (message = "Resource already exists", details = null) =>
    createAppError(message, 409, details),

  // 422 Unprocessable Entity: Validation logic ผ่านระดับ syntax แต่ผิด business rule
  unprocessable: (message = "Unprocessable entity", details = null) =>
    createAppError(message, 422, details),

  // 429 Too Many Requests: ยิง API ถี่เกิน Rate limit (ป้องกัน DDoS / sensor flood)
  tooManyRequests: (message = "Too many requests, please try again later", details = null) =>
    createAppError(message, 429, details),

  // 500 Internal Server Error: Error ที่ฝั่ง Server เช่น Database หลุด, bug ที่ไม่ได้คาดคิด
  internal: (message = "Internal server error", details = null) =>
    createAppError(message, 500, details),

  // 502 Bad Gateway: Server ไปต่อกับ downstream service / external API อื่นแล้ว fail
  badGateway: (message = "Bad gateway", details = null) =>
    createAppError(message, 502, details),

  // 503 Service Unavailable: Server ปิดปรับปรุง หรือรับ load ไม่ไหวชั่วคราว
  serviceUnavailable: (message = "Service unavailable", details = null) =>
    createAppError(message, 503, details)
};

export function sendSuccess(res, { data = null, message = null, statusCode = 200 } = {}) {
  if (data !== null && !message) {
    return res.status(statusCode).json(data);
  }

  const response = {};
  if (message) response.message = message;
  if (data !== null) response.data = data;

  return res.status(statusCode).json(response);
}

export function sendError(res, error) {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";

  if (statusCode === 500) {
    console.error("Internal Server Error:", error);
  }

  const payload = { message };
  if (error.details) {
    payload.details = error.details;
  }

  return res.status(statusCode).json(payload);
}
