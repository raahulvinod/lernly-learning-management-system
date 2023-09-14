class ErrorHandler extends Error {
  statusCode: number;

  constructor(message: any, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    // Capture the stack trace by creating a new Error object
    const error = new Error();
    this.stack = error.stack;
  }
}

export default ErrorHandler;
