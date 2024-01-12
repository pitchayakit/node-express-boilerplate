
import { OK } from '../enum/httpCode.js'
import UserService from '../services/user.service.js'
import UserValidator from '../validators/user.validator.js'

const userService = new UserService()
const userValidator = new UserValidator()

export const index = async (req, res) => {
    //Validation process.
    const schema = userValidator.getBaseSchemaWithPaginationQuery()
    const validatedData = userValidator.validate(schema, req.query)

    //Query data process.
    const users = await userService.findAllWithPagination({
        filter : validatedData
    })

    return res.status(OK).json(users)
}

export const show = async (req, res) => {
    //Validation process.
    const schema = userValidator.getBaseSchema()
    const { id } = userValidator.validate(schema, req.params)

    //Query data process.
    const user = await userService.findByPk(id)

    return res.status(OK).json(user)
}

export const create = async (req, res) => {
    //Validation process.
    const schema = userValidator.create()
    const validatedDate = userValidator.validate(schema, req.body)

    //Query data process.
    const user = await userService.create(validatedDate)

    return res.status(OK).json(user)
}

export const update = async (req, res) => {
    //Validation params process.
    const paramSchema = userValidator.getBaseSchema()
    const { id } = userValidator.validate(paramSchema, req.params)

    //Validation body process.
    const updateSchema = userValidator.patch()
    const validatedDate = userValidator.validate(updateSchema, req.body)

    //Query data process.
    const user = await userService.update(id, validatedDate)

    return res.status(OK).json(user)
}

export const destroy = async (req, res) => {
    //Validation params process.
    const paramSchema = userValidator.getBaseSchema()
    const { id } = userValidator.validate(paramSchema, req.params)

    //Query data process.
    const result = await userService.destroy(id)

    return res.status(OK).json(result)
}

export const login = async (req, res) => {
    //Query data process.
    const result = await userService.login(req.body)

    return res.status(OK).json(result)
}


