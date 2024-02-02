import _ from "underscore";
import formatQuery from "../utils/formatQuery.js";
class Repository {
    constructor(model) {
        this.model = model;
    }

    getFilter(query = {}) {
        const allKeys = _.allKeys(this.model.rawAttributes);

        return _.pick(query, allKeys);
    }

    async findAll(option = {}) {
        const query = option.query || {};

        const resources = await this.model.findAll({
            where: this.getFilter(query),
        });

        return JSON.parse(JSON.stringify(resources));
    }

    async findAllWithPagination(option = {}) {
        const query = option.query || {};

        const { limit, offset, page } = formatQuery.pagination(query);
        const { order, orderBy } = formatQuery.order(query);

        const { count, rows } = await this.model.findAndCountAll({
            where: this.getFilter(query),
            order: [[orderBy, order]],
            offset: offset,
            limit: limit,
        });

        return {
            data: JSON.parse(JSON.stringify(rows)),
            limit: limit,
            page: page,
            pages: Math.ceil(count / limit),
            total: count,
        };
    }

    async findOne(option = {}) {
        const query = option.query || {};

        const resource = await this.model.findOne({
            where: this.getFilter(query),
        });

        return JSON.parse(JSON.stringify(resource));
    }

    async findByPk(id, option = {}) {
        const resource = await this.model.findByPk(id, option);

        return JSON.parse(JSON.stringify(resource));
    }

    async create(data, option = {}) {
        const transaction = option.transaction || null;

        const resource = await this.model.create(data, {
            transaction: transaction,
        });

        return JSON.parse(JSON.stringify(resource));
    }

    async bulkCreate(data, option = {}) {
        const transaction = option.transaction || null;

        const rows = await this.model.bulkCreate(data, {
            transaction: transaction,
        });

        return JSON.parse(JSON.stringify(rows));
    }

    async update(id, body, option = {}) {
        const transaction = option.transaction || null;

        let resource = await this.model.findByPk(id);

        if (!resource) {
            return false;
        }

        body = _.omit(body, ["id"]);

        //Set date here in order to get the previous data value.
        resource.set(body);

        await resource.save({ transaction: transaction });

        return JSON.parse(JSON.stringify(resource));
    }

    async bulkUpdate(data, option = {}) {
        const transaction = option.transaction || null;
        const query = option.query || {};

        data = _.omit(data, ["id"]);

        const [count] = await this.model.update(data, {
            where: this.getFilter(query),
            transaction: transaction,
        });

        return count;
    }

    async destroy(id, option = {}) {
        const transaction = option.transaction || null;

        const resource = await this.model.findByPk(id);

        if (!resource) {
            return false;
        }

        return await this.model.destroy({
            where: {
                id: id,
            },
            transaction: transaction,
        });
    }
}

export default Repository;
