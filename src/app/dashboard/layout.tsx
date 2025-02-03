import React from "react";

export default function Layout({
    children
}: { children: React.ReactNode }) {
    return (
        <div>
            <nav></nav>
            <main>
                {children}
            </main>
        </div>
    )
}
