import Head from "next/head";

export default function Home() { 
  return ( 
    <main className="flex min-h-screen flex-col items-center justify-between p-24"> 
      <Head>
        <title>Home</title>
      </Head>
      <button className="btn btn-primary">Hello daisyUI!</button> 
    </main> 
  )
 }
