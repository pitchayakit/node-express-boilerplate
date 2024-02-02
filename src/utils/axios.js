import axios from "axios";

//More info at https://github.com/axios/axios#interceptors
axios.interceptors.request.use((config) => {
    config.errorContext = new Error("Thrown at:");
    return config;
});

axios.interceptors.response.use(undefined, async (error) => {
    const originalStackTrace = error.config?.errorContext?.stack;

    //Add error stack to the error response.
    if (originalStackTrace) {
        error.stack = `${error.stack}\n${originalStackTrace}`;
    }

    throw error;
});

export default axios;
