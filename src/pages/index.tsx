import Link from 'next/link';

export default function Index() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='text-red-600'>Index Page</h1>
      <Link href={'/page'}>
        go to page
      </Link>
    </main>
  );
}
