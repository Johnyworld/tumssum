export default class Err extends Error {
	code: string;
  constructor(code: string, ...params: any[]) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Err);
    }
    this.code = code;
  }
}
