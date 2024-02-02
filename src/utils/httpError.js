import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../enum/httpCode.js";

export default function (
    status = INTERNAL_SERVER_ERROR,
    message = undefined,
    errors = undefined,
) {
    if (!message) {
        switch (status) {
            case NOT_FOUND:
                message = `Resource not found. Status code: ${status}`;
                break;
            default:
                message = `Internal server error! Status code: ${status}`;
        }
    }

    // Create new error with error stack trace
    let err = new Error(message);
    err.status = status;
    err.code = status;
    err.errors = errors;

    return err;
}
