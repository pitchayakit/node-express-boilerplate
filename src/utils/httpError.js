export default function (status = 500, message = undefined, errors = undefined) {

    if (!message) {
        switch (status) {
            case 404:
                message = `Resource not found. Status code: ${status}`;
                break;
            default:
                message = `Internal server error! Status code: ${status}`;
        }
    }
    
    // Create new error with error stack trace
    let err = new Error(message)
    err.status = status
    err.code = status
    err.errors = errors

    return err
}