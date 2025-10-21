import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h1 className="text-4xl font-semibold">Page not found</h1>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">The page you’re looking for doesn’t exist.</p>
      <Link href="/" className="mt-6 inline-block rounded-2xl px-5 py-3 bg-gray-900 text-white dark:bg-white dark:text-black text-sm font-medium">Go home</Link>
    </main>
  );
}


