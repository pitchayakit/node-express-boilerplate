import Service from './service.js'
import UserRepository from '../repositories/user.js'

class UserService extends Service {
  constructor() {
    super()
    this.repository = new UserRepository
  }
}

export default UserService
