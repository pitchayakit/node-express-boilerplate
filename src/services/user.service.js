import Service from './service.js'
import UserRepository from '../repositories/user.repository.js'

class UserService extends Service {
    constructor(userRepository = new UserRepository()) {
        super()
        this.repository = userRepository
    }
}

export default UserService
