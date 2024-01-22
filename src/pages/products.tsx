import Link from 'next/link';
import Head from 'next/head';
import { Product, ProductProps } from '@/types/product';
import Card from '@/components/card';
import { axiosInstance as axios } from '@/utils/axios';
import { ChangeEvent, useEffect, useState } from 'react';

export async function getStaticProps() {
  
  let axiosResponse = await axios.get('/products');
  const {data} = JSON.parse(axiosResponse.data);
  
  return {
    props: {
      data
    },
  };
}

export default function Products({data}: ProductProps) {

  const [products, setProducts] = useState<Product[]>(data);
  const [inputValue, setValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{ 
    setValue(event.target.value); 
  } 

  const handleSearch = async (query: string, filter?: string) => {

    const params = filter 
    ? {
        params: {
          'filters[category][$eqi]': query
        }
      }
    : {
      params: {
        'filters[name][$contains]': query
      }
    };
  
    let axiosResponse = await axios.get('http://127.0.0.1:1337/api/products', params);
    const {data} = JSON.parse(axiosResponse.data);
    
    if(data.length > 0){
      setProducts(data);
    }
    
  }

  useEffect(()=> {
    
    const timeOutId = setTimeout(()=>{
      handleSearch(inputValue)
    }, 800);

    return () => clearTimeout(timeOutId)

  }, [inputValue]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <Head>
        <title>Products</title>
      </Head>
      
      <div className="flex w-full justify-center my-4 max-lg:flex-col-reverse items-center">

            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-primary ">Search by</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Name</a></li>
                    <li><a>Category</a></li>
                </ul>
            </div>

            <input type="text" 
                placeholder="Type product name" 
                value={inputValue ?? ""} 
                onChange={handleChange}
                className="input input-bordered min-w-[50%] input-md max-w-xs" 
                />
            {/* <button className="btn btn-secondary">asdsa</button> */}
        </div>
      
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {
          products.map((product) => (
            <Card key={product.id} attributes={product.attributes} id={product.id} />
          ))
        }
      </section>
      <Link href={'/home'} className='mt-8'>
        <button className="btn btn-primary">Back to home</button>
      </Link>
    </main>
  );
}


  