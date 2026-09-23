# Project Guidelines & Patterns

## Backend Architecture & Folder Pattern

สถาปัตยกรรมของ `backend/src/` ยึดหลัก **Modular 3-Tier Layered Architecture** แยกตาม Resource Domain เพื่อให้แต่ละ Module ดูแลตัวเองได้ครบวงจร (Self-contained):

```text
backend/
├── scripts/                    # Scripts ใช้งาน dev/ops (เช่น migrate.js, seed.js)
├── tests/                      # Integration & Unit test suite
├── schema.sql                  # Database DDL schema (UUIDv7 primary keys)
└── src/
    ├── modules/                # Domain Modules แยกโฟลเดอร์ตาม Resource
    │   ├── devices/
    │   │   ├── devices.routes.js       # Route definition & HTTP mapping
    │   │   ├── devices.controller.js   # HTTP Request/Response handling & status codes
    │   │   ├── devices.dto.js          # Input validation, sanitization & schemas
    │   │   ├── devices.service.js      # Business logic & domain workflows
    │   │   └── devices.repository.js   # Database queries & SQL execution
    │   └── readings/
    │       ├── readings.routes.js
    │       ├── readings.controller.js
    │       ├── readings.dto.js
    │       ├── readings.service.js
    │       └── readings.repository.js
    │
    ├── utils/                  # Core & Shared Utilities
    │   ├── pagination.js       # Pure pagination calculations (getPaginationQuery, calculatePagination)
    │   ├── response.js         # Standard HTTP response & error factory (sendSuccess, sendError, httpErrors)
    │   └── uuid.js             # UUIDv7 Generator (RFC 9562 time-ordered IDs)
    │
    ├── db.js                   # MySQL Connection Pool (mysql2 with production pool tuning)
    └── index.js                # Express app entrypoint, middleware & route mounting
```

### หน้าที่ของแต่ละ Layer (Layer Responsibilities):
1. **Routes (`*.routes.js`)**: กำหนด HTTP Method, Path และผูกกับ Middleware / Controller เท่านั้น ห้ามใส่ Business Logic
2. **Controller (`*.controller.js`)**: รับ `req`, ส่ง input ให้ DTO validate, เรียก Service, และตอบกลับด้วย `sendSuccess` หรือ `sendError` จาก `utils/response.js`
3. **DTO (`*.dto.js`)**: ทำ Data Validation ตรวจสอบ Required fields, Type, Range และโยน `httpErrors.badRequest` ทันทีเมื่อ input ไม่ถูกต้อง
4. **Service (`*.service.js`)**: 
   - แกนกลางของ Business Logic ประสานงานระหว่างหลาย Repository หรือคำนวณค่าต่างๆ (เช่น pagination) โดย **ห้ามอ้างอิง `req` หรือ `res` ของ Express เด็ดขาด**
   - **Transaction Authority**: **Service Layer เป็นที่เดียวที่มีสิทธิ์เปิดและคุม Transaction** หากกระบวนการต้องทำงานหลาย queries ต่อเนื่อง (Atomic) ให้เรียก `withTransaction(async (conn) => { ... })` จาก `src/db.js` แล้วส่ง `conn` ตัวเดียวกันไปให้ Repo ต่างๆ
5. **Repository (`*.repository.js`)**: 
   - ติดต่อกับ Database โดยตรง เขียน Raw SQL และคืนค่าเป็น plain JavaScript objects/arrays
   - **ห้ามเปิด Transaction เองเด็ดขาด**: Repository มีหน้าที่ execute คำสั่ง SQL ตามที่ได้รับมอบหมายเท่านั้น ห้ามเรียก `beginTransaction`, `commit`, หรือ `rollback` ในตัว Repo เอง
   - **รองรับ Connection จาก Service**: ทุก method ที่แก้ไขข้อมูล (INSERT/UPDATE/DELETE) ต้องรับ parameter `conn = pool` เช่น `async create(data, conn = pool)` เพื่อให้รองรับทั้งแบบ standalone pool ปกติ หรือรับ `conn` ที่อยู่ใน transaction ส่งต่อมาจาก Service Layer

---

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

---

## Frontend Architecture & Folder Pattern

โครงสร้างของ `frontend/src/` ยึดหลัก **Colocation ต่อหน้า (Per-page Feature Colocation)** ควบคู่กับ **Global Shared**:

```text
frontend/src/
├── pages/                  # หน้าทั้งหมดของแอป แยก 1 โฟลเดอร์ต่อ 1 หน้า
│   ├── home/
│   │   ├── components/     # UI Components ที่ใช้เฉพาะหน้า home (เช่น AqiCard, LocationList)
│   │   ├── hooks/          # Custom Hooks ที่ใช้เฉพาะหน้า home (เช่น useHomeSensors)
│   │   └── HomeScreen.jsx  # Page Component หลักของหน้า home
│   └── map/
│       ├── components/     # UI Components ที่ใช้เฉพาะหน้า map (เช่น MapMarker, MapBounds)
│       ├── hooks/          # Custom Hooks ที่ใช้เฉพาะหน้า map (เช่น useMapSensors)
│       ├── utils/          # Helper/Formula ที่ใช้เฉพาะหน้า map (เช่น formatAqi)
│       └── MapScreen.jsx   # Page Component หลักของหน้า map
│
├── components/             # Global / Shared components ข้ามหน้า (เช่น Button, Modal, Nav)
├── hooks/                  # Global shared hooks
├── utils/                  # Global shared utils (เช่น air.js คำนวณ AQI & format เวลาสากล)
│
├── css/                    # Stylesheet ส่วนกลาง
├── App.jsx                 # Main layout & Screen routing
└── main.jsx
```

### กฎการจัดวางไฟล์ (Colocation Rules):
1. **อะไรที่ใช้เฉพาะหน้านั้น**: ให้วางในโฟลเดอร์ของหน้านั้นเสมอ (`pages/<page-name>/components`, `hooks`, `utils`) ห้ามเอาขึ้นไประดับ `src/` ส่วนกลาง
2. **อะไรที่ใช้ร่วมกันตั้งแต่ 2 หน้าขึ้นไป**: ถึงจะยกมาไว้ที่ `src/components/`, `src/hooks/`, หรือ `src/utils/`
3. **ห้ามกลับไปใช้ MVC Controller/View**: ตัวหน้าหลัก (`HomeScreen.jsx`, `MapScreen.jsx`) เป็นตัวประกอบ components และ hooks ของหน้านั้นๆ ในตัวเอง
