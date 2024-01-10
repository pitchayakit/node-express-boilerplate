
import { OK } from '../enum/httpCode.js'
import UserService from '../services/user.service.js'
import UserValidator from '../validators/user.validator.js'

const userService = new UserService()
const userValidator = new UserValidator()

export const findAll = async (req, res) => {
    //Validation process.
    const schema = userValidator.getBaseSchema()
    const validatedData = userValidator.validate(schema, req.query)

    //Query data process.
    const users = await userService.findAllWithPagination({
        filter : validatedData
    })

    return res.status(OK).json(users)
}


