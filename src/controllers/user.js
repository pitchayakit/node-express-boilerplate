
import { OK } from '../enum/httpCode.js'
import UserService from '../services/user.js'

const userService = new UserService()

const findAll = async (req, res) => {
    const users = await userService.findAllWithPagination()

    return res.status(OK).json(users)
}

export default {
    findAll
}

