import models from "../models/index.js";
import Validator from "./validator.js";

const { User } = models;

class UserValidator extends Validator {
    constructor() {
        super(User);
    }
}

export default UserValidator;
