export default class CustomError extends Error {
	code: string;
  constructor(code: string, ...params: any[]) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
    this.code = code;
  }
}
