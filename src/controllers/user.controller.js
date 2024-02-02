import { OK } from "../enum/httpCode.js";
import UserService from "../services/user.service.js";
import UserValidator from "../validators/user.validator.js";

const userService = new UserService();
const userValidator = new UserValidator();

export const index = async (req, res) => {
    // Example of using baseSchemaWithPaginationAndOrder
    // const schema = userValidator.baseSchemaWithPaginationAndOrder()
    // const validatedData = userValidator.validate(schema, req.query)

    //Get schema validation.
    const baseSchema = userValidator.base();
    const paginationSchema = userValidator.pagination();
    const orderSchema = userValidator.order();

    //Validation process
    const validatedQuery = userValidator.validate(
        [baseSchema, paginationSchema, orderSchema],
        req.query,
    );

    //Query data process.
    const users = await userService.findAllWithPagination(validatedQuery);

    return res.status(OK).json(users);
};

export const show = async (req, res) => {
    //Validation process.
    const schema = userValidator.base();
    const { id } = userValidator.validate(schema, req.params);

    //Query data process.
    const user = await userService.findByPk(id);

    return res.status(OK).json(user);
};

export const create = async (req, res) => {
    //Validation process.
    const schema = userValidator.create();
    const validatedBody = userValidator.validate(schema, req.body);

    //Query data process.
    const user = await userService.create(validatedBody);

    return res.status(OK).json(user);
};

export const update = async (req, res) => {
    //Validation params process.
    const paramSchema = userValidator.base();
    const { id } = userValidator.validate(paramSchema, req.params);

    //Validation body process.
    const updateSchema = userValidator.patch();
    const validatedBody = userValidator.validate(updateSchema, req.body);

    //Query data process.
    const user = await userService.update(id, validatedBody);

    return res.status(OK).json(user);
};

export const destroy = async (req, res) => {
    //Validation params process.
    const paramSchema = userValidator.base();
    const { id } = userValidator.validate(paramSchema, req.params);

    //Query data process.
    const result = await userService.destroy(id);

    return res.status(OK).json(result);
};

export const login = async (req, res) => {
    //Query data process.
    const result = await userService.login(req.body);

    return res.status(OK).json(result);
};
