import Repository from "./repository.js";
import models from "../models/index.js";
const { User } = models;

class UserRepository extends Repository {
    constructor() {
        super(User);
    }
}

export default UserRepository;
