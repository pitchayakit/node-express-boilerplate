class Repository {
  constructor (model) {
    this.model = model
  }

  async findAll (options = {}) {
    return await this.model.findAll(options)
  }

  async findOne (options = {}) {
    return await this.model.findOne(options)
  }

  async findByPk (id, options = {}) {
    return await this.model.findByPk(id, options)
  }

  async create (body) {
    return await this.model.create(body)
  }

  async update (id, body) {
    return await this.model.update(body, { where: { id }, returning: true })
  }

  async delete (id) {
    return await this.model.destroy({ where: { id } })
  }
}

export default Repository
