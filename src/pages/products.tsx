import Link from 'next/link';
import Head from 'next/head';
import { Product, ProductProps } from '@/types/product';

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Head>
        <title>Products</title>
      </Head>
      <h1 className='text-red-600'>Index Page</h1>
      <ul>
        {data.map(({attributes}) => (
          <li key={attributes.slug}>{attributes.name}</li>
        ))}
      </ul>
      <Link href={'/page'}>
        go to page
      </Link>
    </main>
  );
}
