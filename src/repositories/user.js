import Repository from './repository.js'
import models from '../models/index.js'
const { User } = models;

class UserRepository extends Repository {
    constructor() {
        super()
        this.model = User
    }
}

export default UserRepository
