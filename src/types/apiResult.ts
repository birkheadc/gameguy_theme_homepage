export interface IApiResult<T> {
  status: number,
  body: T | null,
  wasSuccess: boolean
}

export class ApiResult<T> implements IApiResult<T> {
  status: number;
  body: T | null;
  wasSuccess: boolean;

  constructor(status: number, data: any) {
    try {
      this.status = status;
      this.wasSuccess = status.toString().charAt(0) === '2';
      this.body = data as T;
    } catch {
      this.status = 422;
      this.wasSuccess = false;
      this.body = null;
    }
  }
}