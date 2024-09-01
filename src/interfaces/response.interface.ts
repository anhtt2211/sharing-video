export interface IPaginateResponse<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface IResponse<T> {
  statusCode: number;
  message: string;
  data: T | T[] | IPaginateResponse<T>;
}
