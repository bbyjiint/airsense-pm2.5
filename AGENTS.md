# Project Guidelines & Patterns

## Backend Pagination Pattern

ทุก Endpoint ที่มี Pagination ให้ยึดโครงสร้างและ Pattern ต่อไปนี้:

### 1. Request (Query Parameters)
Client ส่งเพียง:
- `page`: หน้าปัจจุบัน (default: 1)
- `page_size`: จำนวนข้อมูลต่อหน้า (default: 10)

DTO จะทำหน้าที่ validate / fallback ค่าเหล่านี้

### 2. Utils (`src/utils/pagination.js`)
ประกอบด้วย 2 pure functions สำหรับคำนวณ:
- `getPaginationQuery({ page, page_size })` -> คืนค่า `{ limit, offset }` สำหรับส่งเข้า Repository / Database Query
- `calculatePagination({ total, page, page_size })` -> คืนค่า pagination metadata

### 3. Response Envelope Structure
เมื่อ handler ตอบกลับ ต้องอยู่ในฟอร์แมต:
```json
{
  "code": 200,
  "message": "Success",
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "page_size": 10,
    "total_data": 45,
    "total_pages": 5,
    "has_next_page": true,
    "has_previous_page": false,
    "next_page": 2,
    "previous_page": null
  }
}
```

### 4. Layer Responsibility Workflow
- **Controller / Handler**:
  - รับ query และส่งเข้า DTO เพื่อ validate
  - เรียก Service
  - ตอบกลับ `{ code, message, data, pagination }`
- **Service**:
  - เรียก `getPaginationQuery({ page, page_size })` เพื่อได้ `{ limit, offset }`
  - ยิง Repository ขนานกัน (`Promise.all([findData({ limit, offset }), countTotal()])`)
  - นำ `total` มาคำนวณผ่าน `calculatePagination({ total, page, page_size })`
  - คืนค่า `{ data, pagination }` ให้ Handler
- **Repository**:
  - รับ `{ limit, offset }` ไปทำ `LIMIT ? OFFSET ?` ใน SQL
  - มีฟังก์ชัน count เพื่อคืนค่า total rows (`SELECT COUNT(*)`)
