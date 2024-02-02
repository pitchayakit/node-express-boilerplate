import httpError from "../utils/httpError.js";
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../enum/httpCode.js";
class Service {
    constructor(repository) {
        this.repository = repository;
    }

    async create(body, option = {}) {
        const data = await this.repository.create(body, option);

        if (!data) {
            throw httpError(INTERNAL_SERVER_ERROR);
        }

        return {
            data: data,
        };
    }

    async findAll(query = {}) {
        const data = await this.repository.findAll({
            query: query,
        });

        if (!data) {
            throw httpError(INTERNAL_SERVER_ERROR);
        }

        return {
            data: data,
        };
    }

    async findAllWithPagination(query = {}) {
        const data = await this.repository.findAllWithPagination({
            query: query,
        });

        if (!data) {
            throw httpError(INTERNAL_SERVER_ERROR);
        }

        return data;
    }

    async findOne(query = {}) {
        const data = await this.repository.findOne({
            query: query,
        });

        if (!data) {
            throw httpError(NOT_FOUND);
        }

        return {
            data: data,
        };
    }

    async findByPk(id) {
        const data = await this.repository.findByPk(id);

        if (!data) {
            throw httpError(NOT_FOUND);
        }

        return {
            data: data,
        };
    }

    async update(id, body, option = {}) {
        const resource = await this.repository.update(id, body, option);

        if (!resource) {
            throw httpError(NOT_FOUND);
        }

        return {
            data: resource,
        };
    }

    async bulkUpdate(body, option = {}) {
        const resource = await this.repository.bulkUpdate(body, option);

        if (!resource) {
            throw httpError(NOT_FOUND);
        }

        return {
            data: resource,
        };
    }

    async destroy(id) {
        const data = await this.repository.findByPk(id);

        if (!data) {
            throw httpError(NOT_FOUND);
        }

        await this.repository.destroy(id);

        return {
            data: `${id} is deleted successfully.`,
        };
    }
}

export default Service;
