import Head from 'next/head';
import { Product, ProductProps } from '@/types/product';
import Card from '@/components/card';
import { axiosInstance as axios } from '@/utils/axios';
import { ChangeEvent, useEffect, useState } from 'react';

// TODO: add pagination UI

export async function getStaticProps() {
  
  let axiosResponse = await axios.get('/products');
  const data = JSON.parse(axiosResponse.data);

  return {
    props: {
      data: data.products
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

    let url:string = `/products/search`;
    let params;
    
    if(filterByCategory){
      params = {
        params: {
          'q': query
        }
      }

      url = url.replace("/search", `/category/${query}`);

    }else{
      params = {
        params: {
          'q': query
        }
      };
    }
    
    if(!query){
      url = '/products'
    }

    try {
      console.log(url)
      let axiosResponse = await axios.get(url, query ? params : undefined);
      const data = JSON.parse(axiosResponse.data);
      console.log(data)
      if(data.products.length > 0){
        setProducts(data.products);
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

            {/* <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-primary ">
                  Search by {filterByCategory ? "Category" : "Name"}
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a onClick={() => setFilterByCategory(false)}>Name</a></li>
                    <li><a onClick={() => setFilterByCategory(true)}>Category</a></li>
                </ul>
            </div> */}

            <select className="select select-bordered select-info font-bold max-lg:my-4" onChange={(e) => (
                  setFilterByCategory(e.target.value === "1" ? true : false)
                )}>
              <option disabled defaultValue={"Filter by Name"}>Filter by Name</option>
              <option value={0}>Name</option>
              <option value={1}>Category</option>
            </select>

            <input type="text" 
                placeholder={`Type a ${filterByCategory ? "category":"product name"}`} 
                value={inputValue ?? ""} 
                onChange={handleChange}
                className="input input-bordered input-info min-w-[80%] input-md max-w-xs font-semibold" 
                />
            
        </div>
      
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {
          products.map(({id, thumbnail, title, category, price, description}) => (
            <Card key={id}
              id={id}
              title={title}
              price={price}
              category={category}
              thumbnail={thumbnail} 
              description={description} />
          ))
        }
      </section>
      
    </main>
  );
}


  