import Joi from "joi";
import _ from "underscore";
import httpError from "../utils/httpError.js";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../enum/httpCode.js";

class Validation {
    constructor(model) {
        this.model = model;
    }

    base() {
        const schema = _.mapObject(this.model.rawAttributes, (val) => {
            const key = val.type.key;
            switch (key) {
                case "STRING":
                    return Joi.string();
                case "INTEGER":
                    return Joi.number();
                case "DATE":
                    return Joi.date();
                case "BOOLEAN":
                    return Joi.boolean();
                // Add more cases as needed
                default:
                    throw httpError(
                        INTERNAL_SERVER_ERROR,
                        `Unsupported type for ${key}`,
                    );
            }
        });

        return Joi.object(schema);
    }

    baseSchemaWithPaginationAndOrder() {
        const baseSchema = this.base();
        const paginationSchema = this.pagination();
        const orderSchema = this.order();

        return baseSchema.concat(paginationSchema).concat(orderSchema);
    }

    pagination() {
        return Joi.object({
            limit: Joi.number().integer().min(1).default(10),
            page: Joi.number().integer().min(1).default(1),
        });
    }

    order() {
        return Joi.object({
            order_by: Joi.string().default("id"),
            order: Joi.string().valid("ASC", "DESC").default("ASC"),
        });
    }

    create() {
        const schema = this.base();

        // Add any additional validation rules for the create operation here.
        return schema.keys({
            first_name: schema.extract("first_name").required(),
            last_name: schema.extract("last_name").required(),
            email: schema.extract("email").required(),
            password: schema.extract("password").required(),
        });
    }

    patch() {
        const schema = this.base();

        // Exclude the primary key from the schema
        return schema.fork(["id"], (schema) => schema.strip());
    }

    validate(schema, data) {
        if (Array.isArray(schema)) {
            // Merge all objects in the array into one object
            schema = schema.reduce(
                (combined, currentSchema) => combined.concat(currentSchema),
                Joi.object(),
            );
        }

        const { error, value } = schema.validate(data);

        if (error) {
            throw httpError(
                BAD_REQUEST,
                "Validation error",
                _.pluck(error.details, "message"),
            );
        }

        return value;
    }
}

export default Validation;
