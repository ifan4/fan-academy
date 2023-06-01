'use client';

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

 
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main>
      <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-emerald-700 dark:text-emerald-500">
            There was problem
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-light text-zinc-900 dark:text-zinc-400">
            { error.message || 'Something Wrong' }
          </h1>
          <p className="mt-6 text-base leading-7 text-zinc-600 dark:text-zinc-400 ">
            Please try again later or contact support if the problem persists.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button onClick={reset}>Try again</Button>
            <Link href={'/'} className={buttonVariants({variant:'outline'})}>
              Go back home
            </Link>

          </div>
        </div>
      </div>
    </main>
  );
}