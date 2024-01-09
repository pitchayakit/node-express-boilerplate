
import { OK, INTERNAL_SERVER_ERROR, NOT_FOUND, NO_CONTENT, BAD_REQUEST } from '../enum/httpCode.js'
import UserService from '../services/user.js'

const findAll = async (req, res) => {
  try {
    const userService = new UserService()
    const user = await userService.findAll()

    return res.status(OK).json(user)

  } catch (error) {
    console.error(error)
    return res.status(NOT_FOUND).json(error)
  }
}

export default {
  findAll
}

