import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: 'User Dashboard',
    description: 'Manage your blogs'
}

export default async function Dashboard() {
    const blogs: any[] = [{
        id: 1,
        title: 'Test',
        content: 'what is this',
        date: 'qdas'
    }]

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-black">Your Blog Posts</h1>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {blogs.map((blog) => (
                        <Link href={`/blog/${blog.id}`} key={blog.id} className="block">
                            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-2 text-black">{blog.title}</h2>
                                    <p className="text-secondary mb-4">{blog.content}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-secondary">{blog.date}</span>
                                        <span className="text-sm font-medium text-black">Read more →</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}