export type Product = {
    id: number;
    attributes: {
        name: string,
        description: string,
        category: string,
        slug: string,
        price: number,
        thumbnail: string,
        createdAt: Date,
        updatedAt: Date
    };
}


export type ProductProps = {
    data: Product[]
}