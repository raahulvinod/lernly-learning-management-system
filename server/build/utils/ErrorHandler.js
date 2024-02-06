"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        // Capture the stack trace by creating a new Error object
        const error = new Error();
        this.stack = error.stack;
    }
}
exports.default = ErrorHandler;
