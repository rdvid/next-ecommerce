import Link from 'next/link';
import Head from 'next/head';
import { Product, ProductProps } from '@/types/product';
import Card from '@/components/card';
import { axiosInstance as axios } from '@/utils/axios';
import { ChangeEvent, useEffect, useState } from 'react';

// TODO: add pagination UI

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
  const [inputValue, setValue] = useState<string>("");
  const [filterByCategory, setFilterByCategory] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{ 
    setValue(event.target.value); 
  } 

  const handleSearch = async (query: string) => {

    //TODO: develop new ways to filter (price range and ordering)
  
    let params = filterByCategory 
    ? {
        params: {
          'filters[category][name][$contains]': query
        }
      }
    : {
      params: {
        'filters[name][$contains]': query
      }
    };
    
    try {
      
      let axiosResponse = await axios.get(`http://127.0.0.1:1337/api/products`, query ? params : undefined);
      const {data} = JSON.parse(axiosResponse.data);
      
      if(data.length > 0){
        setProducts(data);
      }

    } catch (error) {
      console.error(error)
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
                <div tabIndex={0} role="button" className="btn btn-primary ">
                  Search by {filterByCategory ? "Category" : "Name"}
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a onClick={() => setFilterByCategory(false)}>Name</a></li>
                    <li><a onClick={() => setFilterByCategory(true)}>Category</a></li>
                </ul>
            </div>

            <input type="text" 
                placeholder={`Type a ${filterByCategory ? "category":"product name"}`} 
                value={inputValue ?? ""} 
                onChange={handleChange}
                className="input input-bordered min-w-[50%] input-md max-w-xs" 
                />
            
        </div>
      
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {
          products.map((product) => (
            <Card key={product.id} attributes={product.attributes} id={product.id} />
          ))
        }
      </section>
      
    </main>
  );
}


  