import Joi from "joi";
import _ from "underscore";
import httpError from "../utils/httpError.js";

class Validation {
    constructor(model) {
        this.model = model
    }

    getBaseSchema() {
        const schema = _.mapObject(this.model.rawAttributes, (val, rawKey) => {
            const key = val.type.key
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
                    throw new Error(`Unsupported type for ${key}`);
            }
        })
        
        return Joi.object(schema);
    }

    validate(schema, data) {
        const { error, value } = schema.validate(data);

        if(error) {
            throw httpError(400, 'Validation error', _.pluck(error.details, "message"))
        }

        return value
    }
}

export default Validation