import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode: number = 404;
  url: string = '';
  constructor(url: string) {
    super(`Resource ${url} was not found`);
    this.url = url;

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: `Resource ${this.url} was not found` }];
  }
}
