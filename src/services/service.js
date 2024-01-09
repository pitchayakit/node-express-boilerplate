import httpError from '../utils/httpError.js'
class Service {
    constructor(repository) {
        this.repository = repository
    }

    async create(body, option = {}) {
        const data = await this.repository.create(body, option)

        if (!data) {
            throw httpError(500)
        }

        return {
            data: data
        }
    }

    async findAll(option = {}) {
        const data = await this.repository.findAll(option)

        if (!data) {
            throw httpError(500)
        }

        return {
            data: data
        }
    }

    async findAllWithPagination(option = {}) {
        const data = await this.repository.findAllWithPagination(option)

        if (!data) {
            throw httpError(500)
        }

        return data
    }

    async findOne(option) {
        const data = await this.repository.findOne(option)

        if (!data) {
            throw httpError(404)
        }

        return {
            data: data
        }
    }

    async findByPk(id) {
        const data = await this.repository.findByPk(id)

        if (!data) {
            throw httpError(404)
        }

        return {
            data: data
        }
    }

    async update(id, body, option = {}) {

        const resource = await this.repository.update(id, body, option)

        if (!resource) {
            throw httpError(404)
        }

        return {
            data: resource
        }
    }

    async bulkUpdate(body, option = {}) {

        const resource = await this.repository.bulkUpdate(body, option)

        if (!resource) {
            throw httpError(404)
        }

        return {
            data: resource
        }
    }

    async delete(id) {
        const data = await this.repository.findByPk(id)

        if (!data) {
            throw httpError(404)
        }

        await this.repository.delete(id)

        return {
            data: `${id} is deleted successfully.`
        }
    }

    async export(option) {
        const data = await this.repository.findAllWithPagination(option)

        const { total } = data
        const maxRow = 100000

        if (total >= maxRow) {
            throw httpError(400, `Your export data is excess. The data can't more then ${maxRow}.`)
        }

        let filter = option.filter || {}

        //Export process
        const chunkSize = 10000
        filter.limit = chunkSize
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

            filter.page = i + 1
            let rows = await this.repository.findAllWithPagination({
                filter: filter
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