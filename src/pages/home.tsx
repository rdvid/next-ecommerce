import Link from "../components/link";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={'/products'}>
        <h1 className="text-red-600">back to home</h1>
      </Link>
    </main>
  );
}
