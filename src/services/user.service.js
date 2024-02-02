import Service from "./service.js";
import UserRepository from "../repositories/user.repository.js";
import jwt from "jsonwebtoken";
import { jwtKey } from "../config/auth.js";
import httpError from "../utils/httpError.js";
import { FORBIDDEN } from "../enum/httpCode.js";
import bcrypt from "bcrypt";
import _ from "underscore";

class UserService extends Service {
    constructor(userRepository = new UserRepository()) {
        super();
        this.repository = userRepository;
    }

    async login(data) {
        const { email, password } = data;

        const user = await this.repository.findOne({
            query: {
                email: email,
            },
        });

        const isCorrect = bcrypt.compareSync(password, user.password);

        if (!isCorrect) {
            throw httpError(FORBIDDEN, "Username or password is incorrect.");
        }

        // create a jwt token
        const token = jwt.sign(_.pick(user, ["id", "email"]), jwtKey, {
            expiresIn: "1h",
        });

        return { token: token };
    }
}

export default UserService;
