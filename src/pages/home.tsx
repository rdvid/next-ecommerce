import Link from "@/components/link";
import Head from "next/head";
import Image from "next/image";

//TODO: implement login and auth0 flow

export default function FaqPage() {

  return ( 
    <main className="flex min-h-screen flex-col items-center justify-center p-4"> 
      <Head>
        <title>Home</title>
      </Head>

      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <Image src="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg" 
            alt="Album"
            height={400}
            width={400}
            unoptimized={true}
          />
        </figure>
        <div className="card-body items-center">
          <h2 className="card-title">Welcome to next-ecommerce</h2>
          <p>Click the button to see our catalogue.</p>
          <div className="card-actions justify-end">
            <Link href='/products'><button className="btn btn-primary">See Products</button></Link>
          </div>
        </div>
      </div>  

    </main> 
  )
 }
