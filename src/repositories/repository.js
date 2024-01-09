import _ from "underscore"
import formatPaginationQuery from "../utils/formatPaginationQuery.js"
class Repository {
    constructor(model) {
        this.model = model
    }

    getFilter(filter = {}) {
        const allKeys = _.allKeys(this.model.rawAttributes)
        
        return _.pick(filter, allKeys)
    };

    async findAll(option = {}) {
        const filter = option.filter || {}

        const resources = await this.model.findAll({
            where: this.getFilter(filter)
        })

        return JSON.parse(JSON.stringify(resources))
    }

    async findAllWithPagination(option = {}) {
        const filter = option.filter || {}

        const { limit, sortBy, offset, page } = formatPaginationQuery(filter);

        const { count, rows } = await this.model.findAndCountAll({
            where: this.getFilter(filter),
            order: [
                ["id", sortBy]
            ],
            offset: offset,
            limit: limit
        })

        return {
            data: JSON.parse(JSON.stringify(rows)),
            limit: limit,
            page: page,
            pages: Math.ceil(count / limit),
            total: count
        }
    }

    async findOne(option = {}) {
        const filter = option.filter || {}

        const resource = await this.model.findOne({
            where: this.getFilter(filter)
        })

        return JSON.parse(JSON.stringify(resource))
    }

    async findByPk(id, option = {}) {
        const resource = await this.model.findByPk(id, option)

        return JSON.parse(JSON.stringify(resource))
    }

    async create(data, option = {}) {
        const transaction = option.transaction || null;

        const resource = await this.model.create(
            data,
            {
                transaction: transaction
            }
        );

        return JSON.parse(JSON.stringify(resource))
    }

    async bulkCreate(data, option = {}) {
        const transaction = option.transaction || null;

        const rows = await this.model.bulkCreate(
            data,
            {
                transaction: transaction
            }
        )

        return JSON.parse(JSON.stringify(rows));
    }

    async update(id, body, option = {}) {
        const transaction = option.transaction || null

        let resource = await this.model.findByPk(id)

        if (!resource) {
            return false
        }
        
        body = _.omit(body, ["id"]);

        //Set date here in order to get the previous data value.
        resource.set(body)

        await resource.save({ transaction: transaction })

        return JSON.parse(JSON.stringify(resource));
    }

    async bulkUpdate(data, option = {}) {
        const transaction = option.transaction || null,
            filter = option.filter || {}

        data = _.omit(data, ["id"]);

        const [count] = await this.model.update(
            data,
            {
                where: this.getFilter(filter),
                transaction: transaction
            }
        )

        return count
    }


    async delete(id, option = {}) {
        const transaction = option.transaction || null;

        const resource = await this.model.findByPk(id)

        if (!resource) {
            return false
        }

        return await this.model.destroy({
            where: {
                id: id
            },
            transaction: transaction
        })
    }

    globalSearch(key, columns) {
        return columns.map(column => {
            return {
                [column]: {
                    [Op.substring]: key,
                },
            }
        })
    }

    getWhereDateBetween = (column, fromDate, toDate) => {
        let whereAttributes = []

        if (fromDate) {
            whereAttributes.push({
                [column]: {
                    [Op.gte]: dateTime.startOf(fromDate, "day"),
                }
            })
        }

        if (toDate) {
            whereAttributes.push({
                [column]: {
                    [Op.lte]: dateTime.endOf(toDate, "day"),
                }
            })
        }

        return whereAttributes
    }
}

export default Repository
