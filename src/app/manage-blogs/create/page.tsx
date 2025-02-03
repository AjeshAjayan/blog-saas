import BlogEditor from "../features/BlogEditor";

export default function Page() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
            <BlogEditor />
        </div>
    );
}