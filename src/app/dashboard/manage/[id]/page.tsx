'use client'
import BlogEditor from "@/app/dashboard/_features/BlogEditor";
import { useLazyQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GET_SINGLE_BLOG } from "../../_queries/getBlogsByUser.graphql";
import createApolloClient from "@/lib/apolloClient";

const client = createApolloClient();

export default function Page() {

    const params = useParams();

    const [loading, setLoading] = useState(false);

    const [getBlog] = useLazyQuery(GET_SINGLE_BLOG, { 
        client, 
        variables: { blogByIdId: Number(params.id) }, 
        fetchPolicy: 'no-cache'
    })

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [blogId, setBlogId] = useState(0);
    const [published, setPublished] = useState(false);

    useEffect(() => {
        if(Number(params.id) > 0) {
            setLoading(true);
            getBlog().then((res) => {
                setTitle(res.data.blogById.title);
                setContent(res.data.blogById.content);
                setBlogId(res.data.blogById.id);
                setPublished(res.data.blogById.published);
            }).catch(() => {
                throw new Error('Something went wrong');
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [params.id, getBlog])

    return (
        <div className="container mx-auto p-4 mt-10">
            <h1 className="text-2xl font-bold mb-4">Create/Edit Blog</h1>
            {
                loading 
                    ? <p>Please wait...</p>
                    : <BlogEditor 
                        title={title} 
                        content={content} 
                        id={blogId} 
                        published={published}
                    />
            }
        </div>
    );
}