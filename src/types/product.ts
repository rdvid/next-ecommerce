export type Product = {
    id: number;
    attributes: {
        name: string,
        description: string,
        category: string,
        slug: string,
        price: number,
        createdAt: Date,
        updatedAt: Date
    };
    meta: {
        pagination: {
            page: number,
            pageSize: number,
            pageCount: number,
            total: number
        }
    }
}


export type ProductProps = {
    data: Product[]
}