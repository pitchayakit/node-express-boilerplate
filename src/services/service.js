import httpError from '../utils/httpError.js'
import { INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST } from '../enum/httpCode.js'
class Service {
    constructor(repository) {
        this.repository = repository
    }

    async create(body, option = {}) {
        const data = await this.repository.create(body, option)

        if (!data) {
            throw httpError(INTERNAL_SERVER_ERROR)
        }

        return {
            data: data
        }
    }

    async findAll(query = {}) {
        const data = await this.repository.findAll({
            query: query
        })

        if (!data) {
            throw httpError(INTERNAL_SERVER_ERROR)
        }

        return {
            data: data
        }
    }

    async findAllWithPagination(query = {}) {
        const data = await this.repository.findAllWithPagination({
            query: query
        })

        if (!data) {
            throw httpError(INTERNAL_SERVER_ERROR)
        }

        return data
    }

    async findOne(query = {}) {
        const data = await this.repository.findOne({
            query: query
        })

        if (!data) {
            throw httpError(NOT_FOUND)
        }

        return {
            data: data
        }
    }

    async findByPk(id) {
        const data = await this.repository.findByPk(id)

        if (!data) {
            throw httpError(NOT_FOUND)
        }

        return {
            data: data
        }
    }

    async update(id, body, option = {}) {

        const resource = await this.repository.update(id, body, option)

        if (!resource) {
            throw httpError(NOT_FOUND)
        }

        return {
            data: resource
        }
    }

    async bulkUpdate(body, option = {}) {

        const resource = await this.repository.bulkUpdate(body, option)

        if (!resource) {
            throw httpError(NOT_FOUND)
        }

        return {
            data: resource
        }
    }

    async destroy(id) {
        const data = await this.repository.findByPk(id)

        if (!data) {
            throw httpError(NOT_FOUND)
        }

        await this.repository.destroy(id)

        return {
            data: `${id} is deleted successfully.`
        }
    }

    async export(query = {}) {
        const data = await this.repository.findAllWithPagination({
            query: query
        })

        const { total } = data
        const maxRow = 100000

        if (total >= maxRow) {
            throw httpError(BAD_REQUEST, `Your export data is excess. The data can't more then ${maxRow}.`)
        }

        query = option.query || {}

        //Export process
        const chunkSize = 10000
        query.limit = chunkSize
        const pages = Math.ceil(total / chunkSize)

        const now = Date.now();
        const folderPath = "storage/temp"
        //Create folder if not exist
        if (!fs.existsSync(folderPath))
            fs.mkdirSync(folderPath, { recursive: true });

        //Set the csv file name
        const path = `${folderPath}/export_${now}.csv`;
        fs.appendFileSync(path, "\ufeff"); //TO support UTF8

        //Write CSV with chunk
        for (let i = 0; i < pages; i++) {
            const ws = fs.createWriteStream(path, { flags: 'a' });

            query.page = i + 1
            let rows = await this.repository.findAllWithPagination({
                query: query
            })

            await new Promise(resolve => {
                fastcsv.writeToStream(ws, rows.data, { headers: !i })
                    .on("finish", function () {
                        fs.appendFileSync(path, '\n');
                        console.log(`Exported order at page ${i}`);
                        resolve(true)
                    })
            })
        }

        return path
    }
}

export default Service
