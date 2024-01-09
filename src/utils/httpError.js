export default function (status = 500, message = undefined, error = undefined) {

    if (!message) {
        switch (status) {
            case 404:
                message = `Resource not found. Status code: ${status}`;
                break;
            default:
                message = `Internal server error! Status code: ${status}`;
        }
    }
    
    const err = {
        status,
        code: status,
        message,
        errors: error
    }

    return err
}