import { describe, expect, it } from "bun:test";
import { getPaginationQuery, calculatePagination } from "./pagination.js";

describe("Simple Pagination Utils", () => {
  it("getPaginationQuery calculates limit and offset", () => {
    expect(getPaginationQuery({ page: 1, page_size: 10 })).toEqual({ limit: 10, offset: 0 });
    expect(getPaginationQuery({ page: 2, page_size: 10 })).toEqual({ limit: 10, offset: 10 });
    expect(getPaginationQuery({ page: 3, page_size: 20 })).toEqual({ limit: 20, offset: 40 });
  });

  it("calculatePagination returns accurate metadata", () => {
    const meta = calculatePagination({ total: 45, page: 1, page_size: 10 });
    expect(meta).toEqual({
      page: 1,
      page_size: 10,
      total_data: 45,
      total_pages: 5,
      has_next_page: true,
      has_previous_page: false,
      next_page: 2,
      previous_page: null
    });
  });

  it("calculatePagination handles last page correctly", () => {
    const meta = calculatePagination({ total: 30, page: 3, page_size: 10 });
    expect(meta.has_next_page).toBe(false);
    expect(meta.has_previous_page).toBe(true);
    expect(meta.next_page).toBe(null);
    expect(meta.previous_page).toBe(2);
  });
});
