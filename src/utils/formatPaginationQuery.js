export default function formatPaginationQuery(query = {}) {
    const { page = 1, limit = 10, sort = 'DESC', orderBy = 'id' } = query;

    return {
        page: parseInt(page),
        limit: parseInt(limit),
        offset: (parseInt(page) - 1) * parseInt(limit),
        sortBy: sort,
        orderBy: orderBy
    }
}