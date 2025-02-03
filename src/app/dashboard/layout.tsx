import Link from "next/link";
import React from "react";

export default function Layout({
    children
}: { children: React.ReactNode }) {
    return (
        <div className=" max-w-[1640px] m-auto">
            <nav className="
                flex
                justify-between
                items-center
                bg-secondary
                p-4
                text-white
                cursor-pointer
                fixed
                left-0
                top-0
                w-full
                z-10
                2xl:px-[10rem]
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
