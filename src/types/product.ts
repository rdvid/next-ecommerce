export type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    thumbnail: string;
}


export type ProductProps = {
    data: Product[]
}