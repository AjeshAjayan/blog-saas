import { Metadata } from "next";
import BlogEditor from "../features/BlogEditor";

export const metadata: Metadata = {
    title: 'Create post'
}

export default function Page() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
            <BlogEditor />
        </div>
    );
}