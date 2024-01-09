import httpError from '../utils/httpError.js'
class Service {
    constructor(repository) {
        this.repository = repository
    }

    async create(body) {
        const data = await this.repository.create(body)

        if (!data) {
            throw httpError(500)
        }

        return data
    }

    async findAll(options = {}) {
        const data = await this.repository.findAll(options)

        if (!data) {
            throw httpError(500)
        }

        return data
    }

    async findOne(options) {
        const data = await this.repository.findOne(options)

        if (!data) {
            throw httpError(404)
        }

        return data
    }

    async findByPk(id) {
        const data = await this.repository.findByPk(id)

        if (!data) {
            throw httpError(404)
        }

        return data
    }

    async update(id, body) {
        const data = await this.repository.findByPk(id)

        if (!data) {
            throw httpError(404)
        }

        const payload = {
            ...data.dataValues,
            ...body
        }

        await this.repository.update(id, payload)

        return payload
    }

    async delete(id) {
        const data = await this.repository.findByPk(id)

        if (!data) {
            throw httpError(404)
        }

        await this.repository.remove(id)

        return null
    }
}

export default Service
