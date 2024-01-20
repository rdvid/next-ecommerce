import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugHot } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Head>
        <title>404 :c</title>
      </Head>
      <div className="text-center text-red-600 align-center">
        <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
        <p className="mb-4 text-lg text-gray-600">Oops! Looks like you're lost.</p>
          <div className="animate-bounce">
            <FontAwesomeIcon icon={faMugHot}/>
          </div>
        <p className="mt-4 text-gray-600">Let's get you back <a href="/" className="text-blue-500">home</a>.</p>
      </div>
    </main>
  );
}
