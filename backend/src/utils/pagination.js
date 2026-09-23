/**
 * Pagination Calculation Utilities (Simple & Pure)
 */

/**
 * คำนวณ limit และ offset จาก page และ page_size
 * (หน้าบ้านส่ง page, page_size เข้ามา -> แปลงเป็น limit, offset ให้ repo/DB)
 */
export function getPaginationQuery({ page = 1, page_size = 10 } = {}) {
  const p = Number(page) || 1;
  const size = Number(page_size) || 10;

  const limit = size;
  const offset = (p - 1) * limit;

  return { limit, offset };
}

/**
 * คำนวณ pagination metadata ให้ service นำไป return ร่วมกับ data
 */
export function calculatePagination({ total = 0, page = 1, page_size = 10 } = {}) {
  const total_data = Number(total) || 0;
  const current_page = Number(page) || 1;
  const size = Number(page_size) || 10;

  const total_pages = total_data === 0 ? 0 : Math.ceil(total_data / size);
  const has_next_page = current_page < total_pages;
  const has_previous_page = current_page > 1 && total_pages > 0;

  return {
    page: current_page,
    page_size: size,
    total_data,
    total_pages,
    has_next_page,
    has_previous_page,
    next_page: has_next_page ? current_page + 1 : null,
    previous_page: has_previous_page ? current_page - 1 : null
  };
}
