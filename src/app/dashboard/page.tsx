import createApolloClient from "@/lib/apolloClient";
import { Metadata } from "next"
import Link from "next/link"
import { GET_BLOGS_BY_USER } from "./_queries/getBlogsByUser.graphql";
import { headers } from "next/headers";
import { Preview } from "./_features/Preview";
import ReactMarkdown from "react-markdown";

export const metadata: Metadata = {
    title: 'User Dashboard',
    description: 'Manage your blogs'
}

const client = createApolloClient();

export default async function Dashboard() {
    const cookieHeader = (await headers()).get('cookie');
    let blogs: any[] = [];
    try {
        const { data } = await client.query({
            query: GET_BLOGS_BY_USER,
            context: {
                headers: {
                    cookie: cookieHeader || ''
                }
            }
        });
        blogs = data.blogBuUser;
    } catch(err) {
        throw new Error('Something went wrong)')
    }
    console.log(blogs);

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
                                    <p className="text-secondary mb-4">
                                        <ReactMarkdown>{blog.contents}</ReactMarkdown>
                                    </p>
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