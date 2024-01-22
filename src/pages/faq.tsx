import Head from "next/head";
import Link from "../components/link";
import { axiosInstance as axios } from "@/utils/axios";
import { CategoryProps } from "@/types/category";

let count = 1;

export async function getStaticProps() {
  
  let axiosResponse = await axios.get('/products/categories');
  const data = JSON.parse(axiosResponse.data);

  return {
    props: {
      data
    },
  };
}

export default function Page({data}: CategoryProps) {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Head>
        <title>FaQ</title>
      </Head>
     
      <h1>All Categories available to search at this moment</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((category) => (
                <tr>
                  <th>{count++}</th>
                  <td>{category}</td>
                </tr>
              ))
            }
            
          </tbody>
        </table>
      </div>
        {/* <ul>
          {
            data.map((category) => (
              <li>{category}</li>
            ))
          }
        </ul>
       */}
      <Link href={'/'}>
        <button className="btn btn-primary">Back to home</button>
      </Link>
    </main>
  );
}
