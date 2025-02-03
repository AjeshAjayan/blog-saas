"use client"

import Link from "next/link";

export default function SignUpError() {
    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <div className="text-center text-secondary">
                <h1 className="text-6xl font-bold">500</h1>
                <p className="text-xl mt-2">Oops! Something went wrong.</p>
                <Link
                    href="/"
                    className="mt-6 inline-block rounded-lg border border-secondary px-6 py-2 text-secondary transition hover:bg-secondary hover:text-background"
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}
