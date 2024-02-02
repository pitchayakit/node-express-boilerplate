const pagination = (query = {}) => {
    const { page = 1, limit = 10 } = query;

    return {
        page: parseInt(page),
        limit: parseInt(limit),
        offset: (parseInt(page) - 1) * parseInt(limit),
    };
};

const order = (query = {}) => {
    const { order = "DESC", orderBy = "id" } = query;

    return {
        order: order,
        orderBy: orderBy,
    };
};

export default { pagination, order };
