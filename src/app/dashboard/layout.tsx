import Link from "next/link";
import React from "react";

export default function Layout({
    children
}: { children: React.ReactNode }) {
    return (
        <div>
            <nav className="
                flex
                justify-between
                items-center
                bg-secondary
                p-4
                text-white
                cursor-pointer
                fixed
                w-full
                z-10
            ">
                <div className="flex gap-4 items-center">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/dashboard">Dashboard</Link>
                    </li>
                </div>
                <li>
                    <Link href="/login">Login</Link>
                </li>
            </nav>
            <main className="pt-8">
                {children}
            </main>
        </div>
    )
}
