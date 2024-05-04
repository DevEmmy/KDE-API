import { Model, Query } from "mongoose";

export interface PaginatedResponse<T> {
  limit: number | string;
  currentPage: number | string;
  total: number;
  data: T[];
  totalPages: number;
}

export interface PaginationDTO {
  model: Query<any, any, any>;
  total: number;
  page?: number | string;
  limit?: number | string;
}

export default async function paginate<C = any>({
  model,
  total,
  page,
  limit,
}: PaginationDTO): Promise<PaginatedResponse<C>> {
  limit = parseInt((limit as string) ?? "10");
  page = parseInt((page as string) ?? "1");
  const data = await model.limit(limit).skip((page - 1) * limit);
  const totalPages = Math.ceil(total / limit);

  return { limit, currentPage: page, total, data, totalPages };
}
