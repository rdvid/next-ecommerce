import Link from 'next/link';
import Head from 'next/head';
import { Product, ProductProps } from '@/types/product';
import { useState } from 'react';
import Card from '@/components/card';

export async function getStaticProps() {
  const dummyProductsUrl = `${process.env.API_URL}`;
  const data: Product[] = await fetch(dummyProductsUrl)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response.data;
      });
  
  return {
    props: {
      data
    },
  };
}

export default function Products({data}: ProductProps) {

  const [products, setProducts] = useState([1,1,1,11,1,1,1,1,1,11,1,1,1,11,1,1,1,1]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Head>
        <title>Products</title>
      </Head>
      <h1 className='text-red-600 font-bold'>Our Products</h1>
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {
          products.map(() => (
            <Card />
          ))
        }
        
      </section>
      <Link href={'/'} className='mt-8'>
        <button className="btn btn-primary">Back to home</button>
      </Link>
    </main>
  );
}
