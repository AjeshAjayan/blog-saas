import { Metadata } from "next";
import BlogEditor from "../_features/BlogEditor";

export const metadata: Metadata = {
    title: 'Create post'
}

export default function Page() {
    return (
        <div className="container mx-auto p-4 mt-10">
            <h1 className="text-2xl font-bold mb-4">Create/Edit Blog</h1>
            <BlogEditor />
        </div>
    );
}